/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY

const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
const clearAllCookies = () => {
    const cookies = Cookies.get()
    Object.keys(cookies).forEach((cookieName) => {
        Cookies.remove(cookieName)
    })
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

const saveStateToCookies = (state) => {
    Cookies.set('userState', encryptData(state), { expires: 30 })
}

const initialState = loadStateFromCookies()
const actionTypes = {
    SET_USER: 'SET_USER',
    SET_TOKENS: 'SET_TOKENS',
    LOGOUT: 'LOGOUT',
    SET_PUSH_TOKEN: 'SET_PUSH_TOKEN',
}
const userReducer = (state, action) => {
    let newState
    switch (action.type) {
        case actionTypes.SET_USER:
            newState = {
                ...state,
                Authenticated: true,
                username: action.payload.username,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                pushToken: action.payload.pushToken,
                id: action.payload.id,
            }
            break
        case actionTypes.SET_TOKENS:
            newState = {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            }
            break
        case actionTypes.LOGOUT:
            newState = {
                ...state,
                Authenticated: false,
                accessToken: '',
                refreshToken: '',
                pushToken: '',
                username: '',
            }
            clearAllCookies()
            break
        case actionTypes.SET_PUSH_TOKEN:
            newState = {
                ...state,
                pushToken: action.payload,
            }
            break
        default:
            return state
    }
    saveStateToCookies(newState)
    return newState
}

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined)
        throw new Error('UserContext was used outside of the UserProvider')
    return context
}

export { actionTypes }
