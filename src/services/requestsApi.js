import axiosInstance from './axiosInstance' // Import your new axios instance
import { toast } from 'react-hot-toast'

export async function setRequestStatus(requestId, newStatus, notes) {
    try {
        const response = await axiosInstance({
            url: `/request/set-status`,
            method: 'POST',
            data: { requestId, newStatus, notes },
            headers: { 'Content-Type': 'application/json' },
        })
        return response
    } catch (err) {
        if (err.response && err.response.data) {
            toast.error(
                err.response?.data?.message || 'Changing Status failed',
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

export async function getPendingRequests() {
    try {
        const response = await axiosInstance({
            url: `/requests/pending`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        return response
    } catch (err) {
        if (err.response && err.response.data) {
            toast.error(
                err.response?.data?.message || 'Failed to get pending requests',
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

export async function getFilteredRequests(days) {
    try {
        const response = await axiosInstance({
            url: `/requests/filtered?daysAgo=${days}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        return response
    } catch (err) {
        if (err.response && err.response.data) {
            toast.error(
                err.response?.data?.message ||
                    'Failed to get filtered requests',
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

export async function deleteRequestsTable(adminPassword, dbKey) {
    try {
        const response = await axiosInstance({
            url: `/requests/delete-all-requests`,
            method: 'POST',
            data: { adminPassword, dbKey },
            headers: { 'Content-Type': 'application/json' },
        })
        return response
    } catch (err) {
        if (err.response && err.response.data) {
            toast.error(
                err.response?.data?.message || 'Deleting requests failed',
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
