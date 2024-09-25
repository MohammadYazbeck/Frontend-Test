/* eslint-disable react/prop-types */
import Slide from '@mui/material/Slide'
import { useUser } from '../contexts/UserContext'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getNotifications } from '../services/api'
import { TailSpin } from 'react-loader-spinner'

export default function Notifications({
    isNotificationListOpen,
    onClick,
    isNotification,
}) {
    const { state } = useUser()

    const {
        data: responseData,
        isPending: isLoading,
        isRefetching,
    } = useQuery({
        queryKey: [`notifications-${state.accessToken}`],
        queryFn: () => getNotifications(state.id),
        enabled: !!isNotificationListOpen,
        staleTime: 5 * 60 * 1000,
        cahceTime: 10 * 60 * 1000,
        onError: (err) => {
            toast.err('ERROR Fetching Data', err)
        },
    })

    const notificaitons = responseData?.data?.data
    return (
        <>
            <button className="relative focus:outline-none" onClick={onClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isNotification ? 'white' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`h-[2rem] w-[2rem] lg:h-[2.3rem] lg:w-[2.3rem] ${isNotification ? 'animate-pulse' : ''} hover:animate-none`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                </svg>

                {isNotification && (
                    <div className="absolute right-[0.3rem] top-[0.1rem] z-10 h-3 w-3 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-red-600 lg:right-[0.4rem] lg:h-[0.85rem] lg:w-[0.85rem]"></div>
                )}
            </button>
            <Slide
                direction="down"
                in={isNotificationListOpen}
                mountOnEnter
                unmountOnExit
            >
                <div className="absolute right-2 top-[5rem] z-30 h-[21rem] w-[25.5rem] rounded-3xl bg-white opacity-95 shadow-2xl sm:right-4 sm:w-[30rem] lg:h-[22rem] lg:w-[34rem]">
                    <h2 className="rounded-t-3xl bg-purple-900/90 p-3 px-8 text-right text-lg font-semibold lg:text-xl">
                        الاشعارات
                    </h2>
                    {isLoading || isRefetching ? (
                        <div className="mt-28 flex h-full w-full items-start justify-center">
                            <TailSpin
                                height="30"
                                width="30"
                                color="#6D28D9"
                                radius="0"
                                ariaLabel="tail-spin-loading"
                                wrapperClass=""
                            />
                        </div>
                    ) : notificaitons && notificaitons?.length > 0 ? (
                        <ul className="mt-2 px-5 py-2 text-right font-semibold text-gray-600 sm:px-9 lg:text-lg">
                            {notificaitons.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="flex w-full items-center justify-end py-2"
                                >
                                    <p className="mr-2 flex w-full items-center justify-between border-b-2 border-b-purple-50 pb-2">
                                        <span className="text-sm font-bold italic text-gray-400 lg:text-base">
                                            {
                                                notification.timestamp.split(
                                                    'T'
                                                )[0]
                                            }
                                        </span>
                                        <span>{notification.message}</span>
                                    </p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="mb-2 size-5 text-purple-900/90 lg:size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                                        />
                                    </svg>
                                </div>
                            ))}
                        </ul>
                    ) : notificaitons?.length === 0 ? (
                        <div className="flex h-full w-full items-center justify-center font-semibold text-gray-400">
                            لايوجد اشعارات
                        </div>
                    ) : null}
                </div>
            </Slide>
        </>
    )
}
