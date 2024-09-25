import { NavLink } from 'react-router-dom'
import { actionTypes, useUser } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

export default function AdminSideBar() {
    const { dispatch } = useUser()
    const navigate = useNavigate()
    return (
        <>
            <div className="fixed z-20 hidden h-[calc(100vh-4rem)] bg-white lg:flex lg:w-[calc(100vw-70%)] lg:justify-center 2xl:w-[calc(100vw-80%)]"></div>
            <div className="fixed z-30 hidden h-[calc(100vh-4rem)] bg-purple-900/90 p-10 shadow-lg shadow-purple-500 lg:flex lg:w-[calc(100vw-70%)] lg:justify-center 2xl:w-[calc(100vw-80%)]">
                <div className="flex w-full flex-col items-center border-b border-b-gray-50/25">
                    <div className="mt-10 flex w-full flex-col items-center gap-5">
                        <NavLink
                            to="/admin/pending-requests"
                            onClick={() => {}}
                            replace
                            preventScrollReset
                            className="flex w-[75%] items-center justify-between border-b border-b-gray-100/30 pb-3 text-center text-xl text-white hover:animate-pulse hover:border-b-gray-100/50 hover:font-bold"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                                />
                            </svg>
                            <p>الطلبات المعلقة</p>
                        </NavLink>
                        <NavLink
                            to="/admin/users"
                            onClick={() => {}}
                            replace
                            className="flex w-[75%] items-center justify-between border-b border-b-gray-100/30 pb-3 text-center text-xl text-white hover:animate-pulse hover:border-b-gray-100/50 hover:font-bold"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                />
                            </svg>
                            <p>حسابات المستخدمين</p>
                        </NavLink>{' '}
                        <NavLink
                            to="/admin/archive"
                            onClick={() => {}}
                            replace
                            className="flex w-[75%] items-center justify-between border-b border-b-gray-100/30 pb-3 text-center text-xl text-white hover:animate-pulse hover:border-b-gray-100/50 hover:font-bold"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                />
                            </svg>
                            <p>الأرشيف</p>
                        </NavLink>
                        <NavLink
                            to="/admin/delete-all-requests"
                            onClick={() => {}}
                            replace
                            className="flex w-[75%] items-center justify-between border-b border-b-gray-100/30 pb-3 text-center text-xl text-white hover:animate-pulse hover:border-b-gray-100/50 hover:font-bold"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>

                            <p>حذف قاعدة البيانات</p>
                        </NavLink>
                        <button
                            className="flex w-[75%] items-center justify-between border-b border-b-gray-100/30 pb-3 text-center text-xl text-white hover:animate-pulse hover:border-b-gray-100/50 hover:font-bold"
                            onClick={() => {
                                dispatch({ type: actionTypes.LOGOUT }),
                                    navigate('/login', { replace: true })
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                />
                            </svg>

                            <p>تسجيل الخروج</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
