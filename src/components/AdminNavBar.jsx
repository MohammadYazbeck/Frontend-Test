import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useSound from 'use-sound'
import notificationSound from '../assets/notification.mp3'
import DropListNavBar from './DropListNavBar.jsx'
import Notifications from './Notifications'
import { toast } from 'react-hot-toast'
import { onMessage } from 'firebase/messaging'
import { messaging } from '../firebase/firebaseConfig.js'
import { queryClient } from '../main.jsx'
import { useUser } from '../contexts/UserContext.jsx'

export default function AdminNavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isNotification, setIsNotification] = useState(false)
    const [isNotificationListOpen, setIsNotificationListOpen] = useState(false)
    const navigate = useNavigate()
    const { state } = useUser()
    const [playNotificationSound] = useSound(notificationSound)

    onMessage(messaging, (payload) => {
        setIsNotification(true)
        playNotificationSound()
        queryClient.invalidateQueries({
            queryKey: [`pending-requests-${state.accessToken}`],
        })
        toast.success(payload.data.body, {
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
            duration: 15000,
            position: 'bottom-right',
        })
    })

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (
                    event.data &&
                    event.data.type === 'BACKGROUND_NOTIFICATION'
                ) {
                    setIsNotification(event.data.hasNotification)
                    queryClient.invalidateQueries({
                        queryKey: [`pending-requests-${state.accessToken}`],
                    })
                }
            })
        }
    }, [state.accessToken])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const toggleNotificationList = () => {
        setIsNotificationListOpen(!isNotificationListOpen)
        setIsNotification(false)
    }

    return (
        <>
            <nav className="fixed left-0 top-0 z-20 flex h-14 w-full items-center justify-between bg-purple-900/90 px-5 py-4 text-white shadow-sm sm:h-16">
                <div className="flex items-center justify-center gap-3">
                    <button
                        className="focus:outline-none lg:hidden"
                        onClick={toggleDropdown}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`h-7 w-7 ${isDropdownOpen ? 'rotate-180 transition-transform' : ''}`}
                            color="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>

                    <div
                        className="flex items-end gap-1 hover:cursor-pointer lg:ml-20"
                        onClick={() => navigate('/admin', { replace: true })}
                    >
                        <h1 className="text-2xl font-semibold text-gray-200 xl:text-3xl">
                            <span className="font-bold">Digi</span>com
                        </h1>
                        <p className="w-16 rounded-xl bg-gray-200 text-center text-sm font-bold text-purple-900/90 xl:text-base">
                            Admin
                        </p>
                    </div>
                </div>

                <div>
                    {isDropdownOpen && (
                        <div
                            onClick={toggleDropdown}
                            className="absolute left-0 top-14 z-20 h-screen w-full backdrop-blur-sm lg:hidden"
                        >
                            <DropListNavBar
                                isDropdownOpen={isDropdownOpen}
                                toggleDropdown={toggleDropdown}
                            />
                        </div>
                    )}
                </div>
                <Notifications
                    isNotificationListOpen={isNotificationListOpen}
                    isNotification={isNotification}
                    setIsNotification={setIsNotification}
                    onClick={toggleNotificationList}
                />
            </nav>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    )
}
