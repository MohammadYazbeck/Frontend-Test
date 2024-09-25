import DeclineButton from './buttons/DeclineButton'
import ReturnButton from './buttons/ReturnButton'

/* eslint-disable react/prop-types */
export default function DeclineModal({
    show,
    onClickReturn,
    onSumbit,
    message,
    setMessage,
}) {
    return (
        <>
            {show ? (
                <div className="fixed z-30 flex h-screen w-screen bg-black/20 backdrop-blur-sm">
                    <div className="flex h-[calc(100vh-6rem)] w-full items-center justify-center sm:h-[calc(100vh-6.5rem)] lg:ml-[calc(100vw-70%)] 2xl:ml-[calc(100vw-80%)]">
                        <div className="flex h-[60%] w-[80%] flex-col items-center justify-start rounded-xl border border-purple-900/90 bg-white p-8 hover:cursor-default sm:w-[35rem]">
                            <h1 className="mt-4 border-b-2 border-b-purple-900/90 pb-2 text-xl font-bold text-purple-900/90 sm:text-2xl">
                                تأكيد رفض الطلب
                            </h1>
                            <p className="ml-auto mt-10 w-full text-right text-lg font-bold text-red-900/90 sm:text-xl">
                                : سبب رفض الطلب (اختياري)
                            </p>
                            <textarea
                                rows={5}
                                maxLength={200}
                                autoFocus
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="shaodw-md mt-10 h-[40%] max-h-[40%] w-[80%] cursor-text text-balance rounded-lg border border-purple-900/50 bg-gray-100/35 p-5 text-right focus:border-purple-900/90 focus:outline-none lg:text-lg"
                            />
                            <div className="mt-10 gap-5 sm:flex">
                                <ReturnButton
                                    title="تراجع"
                                    onClick={onClickReturn}
                                />
                                <DeclineButton
                                    title="رفض الطلب"
                                    onClick={onSumbit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
