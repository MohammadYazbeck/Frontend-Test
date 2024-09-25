import axiosInstance from './axiosInstance' // Use your interceptor instance
import { toast } from 'react-hot-toast'
import axios from 'axios'

const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT

// Login function using axiosInstance
export async function login(loginData) {
    try {
        const response = await axios({
            url: `${API_ENDPOINT}/login`,
            method: 'POST',
            data: loginData,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (err) {
        console.log(err)
        if (err.response && err.response.data) {
            toast.error(err.response?.data?.message || 'Login failed', {
                style: {
                    fontSize: 16,
                    color: 'white',
                    background: 'rgb(88 28 135 / 0.9)',
                    borderRadius: 25,
                    fontWeight: 500,
                },
                iconTheme: {
                    primary: '#FFFAEE',
                    secondary: 'rgb(88 28 135 / 0.9)',
                },
                duration: 5000,
                position: 'bottom-right',
            })
        } else {
            toast.error('Unexpected Error', {
                style: {
                    fontSize: 16,
                    color: 'white',
                    background: 'rgb(88 28 135 / 0.9)',
                    borderRadius: 25,
                    fontWeight: 500,
                },
                iconTheme: {
                    primary: '#FFFAEE',
                    secondary: 'rgb(88 28 135 / 0.9)',
                },
                duration: 5000,
                position: 'bottom-right',
            })
        }
        return null
    }
}

export async function resetUserPassword(username, newPassword) {
    try {
        const response = await axiosInstance({
            url: '/reset-password',
            method: 'POST',
            data: {
                username,
                newPassword,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (err) {
        if (err.response.data) {
            toast.error(
                err.response?.data?.message || 'Reset Password failed',
                {
                    style: {
                        fontSize: 16,
                        color: 'white',
                        background: 'rgb(88 28 135 / 0.9)',
                        borderRadius: 25,
                        fontWeight: 500,
                    },
                    iconTheme: {
                        primary: '#FFFAEE',
                        secondary: 'rgb(88 28 135 / 0.9)',
                    },
                    duration: 5000,
                    position: 'bottom-right',
                }
            )
        } else {
            toast.error('Unexpected Error', {
                style: {
                    fontSize: 16,
                    color: 'white',
                    background: 'rgb(88 28 135 / 0.9)',
                    borderRadius: 25,
                    fontWeight: 500,
                },
                iconTheme: {
                    primary: '#FFFAEE',
                    secondary: 'rgb(88 28 135 / 0.9)',
                },
                duration: 5000,
                position: 'bottom-right',
            })
        }
        return null
    }
}
