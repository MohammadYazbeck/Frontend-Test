import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { actionTypes, useUser } from '../contexts/UserContext'
import { validateLogin } from '../hooks/formValidation'
import { login } from '../services/authApi'
import { getToken } from 'firebase/messaging'
import { messaging } from '../firebase/firebaseConfig'

export default function useLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()
    const { dispatch, state } = useUser()
    const [pushToken, setPushToken] = useState('')

    const { VITE_APP_VAPID_KEY } = import.meta.env
    const getPushToken = async () => {
        try {
            const permission = await Notification.requestPermission()
            if (permission === 'granted') {
                const currentToken = await getToken(messaging, {
                    VITE_APP_VAPID_KEY,
                })

                if (currentToken) {
                    setPushToken(currentToken)
                    return currentToken
                } else {
                    console.log(
                        'No registration token available. Request permission to generate one.'
                    )
                    return null
                }
            } else if (permission === 'denied') {
                alert('You denied for the notification')
            }
        } catch (error) {
            console.log('An error occurred while retrieving token. ', error)
            return null
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validateLogin({ username, password })

        if (Object.keys(validationErrors).length === 0) {
            setisLoading(true)

            // Get the push token before submitting the login form
            const token = await getPushToken()
            const loginData = { username, password, pushToken: token }
            const response = await login(loginData)

            if (response && response.status === 200) {
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: {
                        username,
                        pushToken: response.data.pushToken, // Save the token to the user context
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken,
                        id: response.data.userId,
                    },
                })
                navigate('/admin/pending-requests', { replace: true })
            }
            setisLoading(false)
        } else {
            setisLoading(false)
            setErrors(validationErrors)
        }
    }

    return {
        username,
        password,
        errors,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit,
        isLoading,
        isloggedin: state.Authenticated,
    }
}
