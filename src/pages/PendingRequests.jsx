import { useQuery } from '@tanstack/react-query'
import Request from '../components/Request'
import { useUser } from '../contexts/UserContext'
import { getPendingRequests } from '../services/requestsApi'
import { toast } from 'react-hot-toast'
import PageLoader from '../ui/pageLoader'
import { queryClient } from '../main'

export default function PendingRequests() {
    const { state } = useUser()

    const {
        data: responseData,
        isPending: isLoading,
        isRefetching,
        error,
    } = useQuery({
        queryKey: [`pending-requests-${state.accessToken}`],
        queryFn: () => getPendingRequests(),
        onError: (err) => {
            toast.err('ERROR Fetching Data', err)
        },
    })

    const pendingRequests = responseData?.data?.data

    return (
        <div className="flex h-[calc(100vh-6rem)] flex-col items-end justify-start bg-white sm:h-[calc(100vh-6.5rem)] lg:ml-[calc(100vw-70%)] 2xl:ml-[calc(100vw-80%)]">
            <div className="fixed z-10 hidden w-full justify-end bg-gray-50 pb-3 pt-4 shadow-sm hover:cursor-default sm:flex lg:w-[calc(100vw-30%)] 2xl:w-[calc(100vw-20%)]">
                <div className="mr-7 flex items-center border-b-2 border-purple-900/90 pl-5 lg:mr-10">
                    <h1 className="pb-2 text-right text-xl font-semibold text-gray-600 sm:text-2xl">
                        الطلبات المعلقة
                    </h1>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-4 mr-2 size-6 text-gray-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                        />
                    </svg>
                </div>
            </div>

            <div
                className="fixed bottom-12 right-9 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900/80 shadow-md shadow-purple-300/90 hover:cursor-pointer"
                onClick={() =>
                    queryClient.invalidateQueries({
                        queryKey: [`pending-requests-${state.accessToken}`],
                    })
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="size-7 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                </svg>
            </div>
            {error ? (
                <div className="flex h-screen w-full cursor-default items-center justify-center text-xl font-bold text-gray-400">
                    خطأ في تحميل الطلبات المعلقة
                </div>
            ) : isLoading || isRefetching ? (
                <PageLoader />
            ) : pendingRequests && pendingRequests.length > 0 ? (
                <>
                    <div className="my-scrollbar flex h-full w-full items-start justify-center overflow-y-scroll">
                        <div className="grid w-[90%] grid-cols-1 gap-12 pt-10 sm:w-[80%] sm:pt-28 lg:w-[75%] xl:w-[70%] 2xl:w-[60%]">
                            {pendingRequests.map((request) => (
                                <Request request={request} key={request.id} />
                            ))}
                        </div>
                    </div>
                </>
            ) : pendingRequests && pendingRequests.length === 0 ? (
                <div className="flex h-screen w-full cursor-default items-center justify-center text-xl font-bold text-gray-400">
                    لايوجد طلبات لعرضها
                </div>
            ) : null}
        </div>
    )
}
