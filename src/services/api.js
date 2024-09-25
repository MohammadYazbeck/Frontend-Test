import axios from 'axios'
import { toast } from 'react-hot-toast'
import axiosInstance from './axiosInstance'

export async function getPhoto(url) {
    try {
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'blob',
        })
        return response
    } catch (err) {
        toast.error(`Unexpected Error: ${err}`, {
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
        return null
    }
}

export async function getNotifications(id) {
    try {
        const response = await axiosInstance({
            url: `/notifications?id=${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (err) {
        if (err.response && err.response.data) {
            toast.error(
                err.response?.data?.message || 'Failed to get notificaitons',
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
                        secondary: 'rgb(88 28 135 / 0.9) ',
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
