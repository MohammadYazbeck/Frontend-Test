import axios from 'axios'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY

const clearAllCookies = () => {
    const cookies = Cookies.get()
    Object.keys(cookies).forEach((cookieName) => {
        Cookies.remove(cookieName)
    })
}

const encryptData = (data) => {
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        SECRET_KEY
    ).toString()
    return encrypted
}

const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY)
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decrypted
}

const saveStateToCookies = (state) => {
    Cookies.set('userState', encryptData(state), { expires: 7 }) // Expires in 7 days
}

const loadStateFromCookies = () => {
    const savedState = Cookies.get('userState')
    return savedState
        ? decryptData(savedState)
        : {
              Authenticated: false,
              accessToken: '',
              refreshToken: '',
              pushToken: '',
              username: '',
              id: '',
          }
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
})

// Request interceptor for refreshing token
axiosInstance.interceptors.request.use(
    async (config) => {
        const state = loadStateFromCookies()
        let accessToken = state.accessToken
        let refreshToken = state.refreshToken

        if (config.url === '/refresh-token') {
            return config
        }

        if (isTokenExpired(accessToken)) {
            if (isTokenExpired(refreshToken)) {
                toast.error('Session expired. Please log in again.')
                clearAllCookies()
                return Promise.reject(new Error('Refresh token expired'))
            }

            try {
                const response = await refreshAccessToken(refreshToken)
                const newAccessToken = response.data.accessToken
                const newRefreshToken = response.data.refreshToken

                const newState = {
                    ...state,
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                }
                saveStateToCookies(newState)
                accessToken = newAccessToken
            } catch (error) {
                toast.error('Session expired. Please log in again.')
                clearAllCookies()

                return Promise.reject(error)
            }
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
    }
)

// Function to check if token is expired
const isTokenExpired = (token) => {
    if (!token) {
        return true
    }
    try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]))
        const expirationTime = tokenPayload.exp * 1000
        const isExpired = Date.now() > expirationTime
        return isExpired
    } catch (e) {
        console.error('Error parsing token:', e)
        return true
    }
}

// Function to refresh the access token
const refreshAccessToken = async (refreshToken) => {
    try {
        return await axiosInstance.post('/refresh-token', { refreshToken })
    } catch (error) {
        console.error('Failed to refresh token:', error)
        throw error
    }
}

export default axiosInstance
