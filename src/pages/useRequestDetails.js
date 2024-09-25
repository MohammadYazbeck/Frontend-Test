import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { setRequestStatus } from '../services/requestsApi'
import { getPhoto } from '../services/api'

import { useUser } from '../contexts/UserContext'
import Cookies from 'js-cookie'
import { queryClient } from '../main'

export default function useRequestDetails() {
    const location = useLocation()
    const navigate = useNavigate()
    const [photoDownloaded, setPhotoDownloades] = useState(false)
    const [showDeclineModal, setShowDeclineModal] = useState(false)
    const [notes, setNotes] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { state: request } = useLocation()
    const { state: user } = useUser()

    async function handleSavePhoto() {
        // Assuming the photo URL is stored in the `request.photoUrl`
        const photoUrl = request?.noticeOfTransferPhoto
        if (!photoUrl) {
            toast.error('Photo URL is not available.')
            return
        }
        const response = await getPhoto(photoUrl)

        if (response && response.status === 200) {
            const blob = response.data

            // Create a temporary URL for the Blob object
            const blobUrl = URL.createObjectURL(blob)
            // Create a link element
            const link = document.createElement('a')
            link.href = blobUrl
            // Optional: Get the image type (e.g., 'image/jpeg') and default filename
            const fileType = blob.type.split('/')[1] // Extract file type (e.g., 'jpeg')
            link.download = `photo_${request.id}.${fileType || 'jpg'}` // Use dynamic file extension

            // Append the link to the body, trigger the download, and remove the link
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            // Revoke the Blob URL after use
            URL.revokeObjectURL(blobUrl)
            // Mark photo as downloaded
            setPhotoDownloades(true)
        } else {
            toast.error('Error Fetching Photo', {
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
            })
        }
    }

    async function handleSetStatus(status) {
        if (request.id) {
            try {
                setIsLoading(true)
                const response = await setRequestStatus(
                    request.id,
                    status,
                    notes
                )
                if (response.status === 200) {
                    toast.success(
                        `${'بنجاح'}  ${` ${request.username}`}  ${` لقد تمت معالجة طلب  `}`,
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
                    const dateValue = Cookies.get('dateValue')
                    if (dateValue) {
                        queryClient.invalidateQueries({
                            queryKey: [`filtered-request-${dateValue}-days`],
                        })
                    }
                    queryClient.invalidateQueries({
                        queryKey: [`pending-requests-${user.accessToken}`],
                    })
                    setIsLoading(false)
                    if (status === 'declined') {
                        setShowDeclineModal(false)
                    }
                    navigate('/admin/pending-requests', { replace: true })
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        } else {
            toast.error('No Access Token Provided, Try Login Again', {
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
            })
        }
    }

    return {
        showDeclineModal,
        setShowDeclineModal,
        location,
        navigate,
        request,
        handleSavePhoto,
        handleSetStatus,
        photoDownloaded,
        isLoading,
        notes,
        setNotes,
    }
}
