import CustomSelect from '../components/CustomSelect'
import Request from '../components/Request'
import CustomCheckbox from '../components/CustomCheckbox'
import useArchive from './useArchive'
import PageLoader from '../ui/PageLoader'

export default function Archive() {
    const {
        sortbyUser,
        setSortByUser,
        sortbyDate,
        setSortByDate,
        approvedChecked,
        setApprovedChecked,
        declinedChecked,
        setDeclinedChecked,
        archiveRequests,
        handleSaveArchive,
        isLoading,
        isRefetching,
        error,
        handleRefresh,
    } = useArchive()

    return (
        <div className="flex h-[calc(100vh-6rem)] flex-col items-end justify-start bg-white sm:h-[calc(100vh-6.5rem)] lg:ml-[calc(100vw-70%)] 2xl:ml-[calc(100vw-80%)]">
            <div className="fixed z-10 flex w-full bg-gray-50 pb-3 pt-4 shadow-sm lg:w-[calc(100vw-30%)] 2xl:w-[calc(100vw-20%)]">
                <div className="flex w-[100%] items-center justify-center gap-5">
                    <h1 className="hidden text-lg font-semibold text-gray-500 xl:block">
                        Filters:
                    </h1>
                    <div className="sm:flex">
                        <div className="mt-2 flex gap-4 sm:mt-0">
                            <CustomSelect
                                state={sortbyUser}
                                setState={setSortByUser}
                                textDefaultOption="جميع المحافظات"
                                options={[
                                    'جميع المحافظات',
                                    'Latakia',
                                    'Tartus',
                                    'Assuwayda',
                                    'Hama',
                                    'Homs',
                                    'Aleppo',
                                    'Damaswomen',
                                    'Damasdaraa',
                                    'Damasqatna',
                                    'Damasquneitra',
                                    'Damasmen',
                                ]}
                            />
                            <CustomSelect
                                state={sortbyDate}
                                setState={setSortByDate}
                                textDefaultOption="منذ يومين"
                                options={[
                                    'منذ يومين',
                                    'منذ أسبوع',
                                    'منذ أسبوعين',
                                    'منذ شهر',
                                    'منذ شهرين',
                                    'منذ ثلاثة أشهر',
                                    'منذ ستة أشهر',
                                    'منذ سنة',
                                ]}
                            />
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-4 sm:mx-4 sm:mt-0">
                            <CustomCheckbox
                                checked={approvedChecked}
                                setChecked={setApprovedChecked}
                                text="الطلبات المقبولة"
                            />
                            <CustomCheckbox
                                checked={declinedChecked}
                                setChecked={setDeclinedChecked}
                                text="الطلبات المرفوضة"
                            />
                        </div>
                    </div>
                </div>
                <div className="mr-7 flex justify-end hover:cursor-default lg:mr-10">
                    <div className="hidden items-center border-b-2 border-purple-900/90 pl-5 sm:flex">
                        <h1 className="pb-2 text-right text-xl font-semibold text-gray-600 sm:text-2xl">
                            الأرشيف
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
                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div
                className="fixed bottom-12 right-9 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900/80 shadow-md shadow-purple-300/90 hover:cursor-pointer"
                onClick={handleRefresh}
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
                    خطأ في تحميل الارشيف
                </div>
            ) : isLoading || isRefetching ? (
                <PageLoader />
            ) : archiveRequests && archiveRequests.length > 0 ? (
                <>
                    <div
                        className="fixed bottom-[7.5rem] right-9 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900/80 shadow-md shadow-purple-300/90 hover:cursor-pointer"
                        onClick={handleSaveArchive}
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
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                        </svg>
                    </div>
                    <div className="my-scrollbar flex h-full w-full items-start justify-center overflow-y-scroll pt-10 sm:pt-0">
                        <div className="grid w-[90%] grid-cols-1 gap-12 pt-28 sm:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[60%]">
                            {archiveRequests.map((request) => (
                                <Request request={request} key={request.id} />
                            ))}
                        </div>
                    </div>
                </>
            ) : archiveRequests && archiveRequests.length === 0 ? (
                <div className="flex h-screen w-full cursor-default items-center justify-center text-xl font-bold text-gray-400">
                    لايوجد طلبات لعرضها
                </div>
            ) : null}
        </div>
    )
}
