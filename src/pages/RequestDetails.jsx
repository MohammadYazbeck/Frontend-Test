import ApproveButton from '../components/buttons/ApproveButton'
import DeclineButton from '../components/buttons/DeclineButton'
import RequestDetailsImage from '../components/RequestDetailsImage'
import DeclineModal from '../components/DeclineModal'
import useRequestDetails from './useRequestDetails'
import Loader from '../ui/Loader'
import SaveButton from '../components/buttons/SaveButton'

export default function RequestDetails() {
    const {
        showDeclineModal,
        setShowDeclineModal,
        photoDownloaded,
        handleSavePhoto,
        handleSetStatus,
        navigate,
        request,
        notes,
        setNotes,
        isLoading,
        location,
    } = useRequestDetails()

    const date = request.requestDate.split('T')[0]

    return (
        <>
            <div className="flex h-[calc(100vh-6rem)] flex-col items-end justify-start bg-white sm:h-[calc(100vh-6.5rem)] lg:ml-[calc(100vw-70%)] 2xl:ml-[calc(100vw-80%)]">
                <div className="fixed z-10 flex w-full justify-between bg-gray-50 pb-3 pt-4 shadow-sm lg:w-[calc(100vw-30%)] 2xl:w-[calc(100vw-20%)]">
                    <div
                        className="ml-5 flex items-center justify-center sm:ml-10"
                        onClick={() => {
                            location.pathname.includes('admin/pending-requests')
                                ? navigate('/admin/pending-requests', {
                                      replace: true,
                                  })
                                : navigate('/admin/archive', { replace: true })
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="size-5 text-purple-900/90 hover:animate-pulse hover:cursor-pointer sm:size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                            />
                        </svg>
                    </div>
                    <div className="mr-7 flex justify-end hover:cursor-default lg:mr-10">
                        <div className="flex items-center border-b-2 border-purple-900/90 pl-5">
                            <h1 className="pb-2 text-right text-xl font-semibold text-gray-600 sm:text-2xl">
                                مراجعة الطلب
                            </h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="ml-4 mr-2 size-6 text-gray-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="my-scrollbar flex w-full items-start justify-center overflow-y-scroll px-4 pt-32 hover:cursor-default sm:px-0">
                    <div className="mb-28 w-[90%] space-y-4 text-lg font-semibold sm:w-[80%] sm:text-xl lg:w-[75%] xl:w-[70%] 2xl:w-[60%]">
                        <div className="flex justify-between border-b-2 border-b-gray-50 pb-4">
                            <span className="font-semibold text-gray-500">
                                {request.username || 'غير محدد'}
                            </span>
                            <span className="ml-2 font-bold text-purple-900/90">
                                :اسم المستخدم
                            </span>
                        </div>
                        <div className="flex justify-between border-b-2 border-b-gray-50 pb-4">
                            <span className="font-semibold text-gray-500">
                                {request.deviceNumber || 'غير محدد'}
                            </span>
                            <span className="ml-2 font-bold text-purple-900/90">
                                :رقم الجهاز
                            </span>
                        </div>
                        <div className="flex justify-between border-b-2 border-b-gray-50 pb-4">
                            <span className="flex items-center font-semibold text-gray-500">
                                <span className="text-sm">{'ل.س'}</span>
                                <span className="ml-2"></span>
                                {request.credit.toLocaleString() || 'غير محدد'}
                            </span>
                            <span className="ml-2 font-bold text-purple-900/90">
                                :الرصيد
                            </span>
                        </div>
                        <div className="flex justify-between border-b-2 border-b-gray-50 pb-4">
                            <span className="flex items-center font-semibold text-gray-500">
                                <span className="text-sm">{'ل.س'}</span>
                                <span className="ml-2"></span>
                                {request.calculatedCredit.toLocaleString() ||
                                    'غير محدد'}
                            </span>
                            <span className="ml-2 font-bold text-purple-900/90">
                                :قيمة الرصيد
                            </span>
                        </div>
                        <div className="flex justify-between border-b-2 border-b-gray-50 pb-4">
                            <span className="text-center font-semibold text-gray-500">
                                {request.destinationOrg || 'غير محدد'}
                            </span>
                            <span className="ml-2 text-right font-bold text-purple-900/90">
                                :الجهة المحول لها
                            </span>
                        </div>

                        <div className="flex justify-between border-b-2 border-b-gray-50 pb-4">
                            <span
                                className={`text-center font-semibold capitalize ${request.status === 'pending' ? 'text-orange-500' : request.status === 'approved' ? 'text-green-500' : request.status === 'declined' ? 'text-red-500' : 'text-gray-500'}`}
                            >
                                {request.status || 'غير محدد'}
                            </span>
                            <span className="ml-2 text-right font-bold text-purple-900/90">
                                :حالة الطلب
                            </span>
                        </div>
                        <div className="flex justify-between border-b-2 border-b-gray-50 pb-4">
                            <span
                                className={`text-center font-semibold capitalize text-gray-500`}
                            >
                                {date}
                            </span>
                            <span className="ml-2 text-right font-bold text-purple-900/90">
                                :تاريخ الطلب
                            </span>
                        </div>

                        <div className="flex justify-between border-b-2 border-b-gray-50 pb-4">
                            <span className="text-center font-semibold text-gray-500">
                                {request.noticeOfTransfer || 'غير محدد'}
                            </span>
                            <span className="ml-2 text-right font-bold text-purple-900/90">
                                :رقم الاشعار
                            </span>
                        </div>

                        {location.pathname.includes(
                            'admin/pending-requests'
                        ) ? (
                            <>
                                <div className="mx-auto max-w-[100%]">
                                    <span className="mb-8 ml-2 mt-6 flex justify-end font-bold text-purple-900/90">
                                        :صورة الاشعار
                                    </span>
                                    <RequestDetailsImage
                                        photo={request.noticeOfTransferPhoto}
                                    />
                                </div>

                                <div className="flex w-full items-center justify-center gap-5 sm:gap-10 lg:gap-20">
                                    {photoDownloaded ? (
                                        <ApproveButton
                                            title="قبول الطلب"
                                            onClick={() =>
                                                handleSetStatus('accepted')
                                            }
                                        />
                                    ) : null}
                                    <SaveButton
                                        title="تحميل الصورة"
                                        onClick={handleSavePhoto}
                                    />
                                    <DeclineButton
                                        title="رفض الطلب"
                                        onClick={() =>
                                            setShowDeclineModal(true)
                                        }
                                    />
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
                <DeclineModal
                    show={showDeclineModal}
                    viewBox="0 0 24 24"
                    onSumbit={() => handleSetStatus('declined')}
                    message={notes}
                    setMessage={setNotes}
                    onClickReturn={() => setShowDeclineModal(false)}
                />
            </div>
            {isLoading ? <Loader /> : null}
        </>
    )
}
