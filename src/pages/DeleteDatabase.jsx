import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteDatabaseButton from '../components/buttons/DeleteDatabaseButton'
import { validateDeleteDb } from '../hooks/formValidation'
import { deleteRequestsTable } from '../services/requestsApi'
import { toast } from 'react-hot-toast'
import Loader from '../ui/Loader'
import { queryClient } from '../main'

export default function DeleteDatabase() {
    const [adminPassword, setAdminPassword] = useState('')
    const [dbKey, setDbKey] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [errors, setErrors] = useState({})

    async function handleDeleteDatabase(e) {
        e.preventDefault()
        const validationErrors = validateDeleteDb({
            adminPassword,
            dbKey,
        })

        if (Object.keys(validationErrors).length === 0) {
            setisLoading(true)
            const response = await deleteRequestsTable(adminPassword, dbKey)

            if (response && response.status === 200) {
                toast.success('لقد تم حدف قاعدة البيانات بنجاح', {
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
                queryClient.invalidateQueries()
                setisLoading(false)
                navigate('/admin/pending-requests', { replace: true })
            } else {
                setisLoading(false)
            }
        } else {
            setErrors(validationErrors)
        }
    }

    const navigate = useNavigate()
    return (
        <>
            <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-start bg-white sm:h-[calc(100vh-6.5rem)] lg:ml-[calc(100vw-70%)] 2xl:ml-[calc(100vw-80%)]">
                <div className="fixed z-10 hidden w-full justify-end bg-gray-50 pb-3 pr-7 pt-4 shadow-sm sm:flex lg:w-[calc(100vw-30%)] lg:pr-10 2xl:w-[calc(100vw-20%)]">
                    <h1 className="flex items-center border-b-2 border-purple-900/90 pb-2 pl-5 text-xl font-semibold text-gray-600 sm:text-2xl">
                        حذف قاعدة البيانات
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
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                        </svg>
                    </h1>
                </div>
                <div className="flex h-full w-full items-start justify-center">
                    <div className="w-full flex-col items-center justify-center pt-10 sm:pt-32">
                        <div className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-32 text-red-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                />
                            </svg>
                        </div>
                        <div className="mt-10 flex items-center justify-center text-xl font-semibold lg:text-2xl">
                            <h1 className="w-[70%] text-pretty text-center leading-relaxed text-red-950">
                                عند حذف قاعدة البيانات, سيتم حذف جميع الطلبات
                                المخزنة في قاعدة البيانات مهما كانت حالة الطلب.
                                لذلك يرجى التأكد من عدم وجود أي طلبات معلقة,
                                والتأكد من تحميل الأرشيف بعد تحديث الصفحة وتفعيل
                                الخيارات المطلوبة
                            </h1>
                        </div>
                        <form className="mx-auto mt-20 flex w-full max-w-lg flex-col items-center gap-6 px-10 pb-24 lg:mt-28 lg:max-w-lg">
                            <div className="flex w-full flex-col items-end justify-center">
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="مفتاح قاعدة البيانات"
                                    value={dbKey}
                                    autoComplete="databaseDeleteKey"
                                    onChange={(e) => setDbKey(e.target.value)}
                                    className="h-12 w-full rounded-2xl border border-gray-400/50 px-4 text-gray-500 shadow-inner placeholder:text-center placeholder:font-bold placeholder:text-gray-400/80 focus:border-purple-700 focus:bg-purple-50/50 focus:shadow-inner focus:outline-none lg:h-14 lg:border-2 lg:text-lg"
                                />
                                {errors.dbKey && (
                                    <span className="text-sm font-semibold text-red-600">
                                        {errors.dbKey}
                                    </span>
                                )}
                            </div>

                            <div className="flex w-full flex-col items-end justify-center gap-2">
                                <input
                                    type="password"
                                    value={adminPassword}
                                    placeholder="كلمة مرور المستخدم"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setAdminPassword(e.target.value)
                                    }
                                    className="h-12 w-full rounded-2xl border border-gray-400/50 px-4 text-gray-500 shadow-inner placeholder:text-center placeholder:font-bold placeholder:text-gray-400/80 focus:border-purple-700 focus:bg-purple-50/50 focus:shadow-inner focus:outline-none lg:h-14 lg:border-2 lg:text-lg"
                                />
                                {errors.adminPassword && (
                                    <span className="text-sm font-semibold text-red-600">
                                        {errors.adminPassword}
                                    </span>
                                )}
                            </div>
                            <DeleteDatabaseButton
                                title="حذف قاعدة البيانات"
                                onClick={(e) => handleDeleteDatabase(e)}
                            />
                        </form>
                    </div>
                </div>
            </div>
            {isLoading ? <Loader /> : null}
        </>
    )
}
