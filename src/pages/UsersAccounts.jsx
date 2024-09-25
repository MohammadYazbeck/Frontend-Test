import ChangePasswordButton from '../components/buttons/ChangePasswordButton'
import users from '../data/users.json'
import { useNavigate } from 'react-router-dom'

export default function UsersAccounts() {
    const navigate = useNavigate()
    return (
        <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-start bg-white sm:h-[calc(100vh-6.5rem)] lg:ml-[calc(100vw-70%)] 2xl:ml-[calc(100vw-80%)]">
            <div className="fixed z-10 hidden w-full justify-end bg-gray-50 pb-3 pr-7 pt-4 shadow-sm sm:flex lg:w-[calc(100vw-30%)] lg:pr-10 2xl:w-[calc(100vw-20%)]">
                <h1 className="flex items-center border-b-2 border-purple-900/90 pb-2 pl-5 text-xl font-semibold text-gray-600 sm:text-2xl">
                    حسابات المستخدمين
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
                            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                    </svg>
                </h1>
            </div>
            <div className="my-scrollbar flex h-full w-full items-start justify-center overflow-y-scroll">
                <div className="w-[90%] flex-col items-center justify-center pt-5 sm:w-[80%] sm:flex-row sm:pt-20 lg:w-[75%] xl:w-[70%] 2xl:w-[60%]">
                    {users.map((user) => (
                        <div
                            key={user.username}
                            className="my-8 rounded-3xl border px-3 py-4 shadow-sm shadow-purple-900/60"
                        >
                            <div className="flex w-full flex-col items-end px-4 text-lg sm:text-xl">
                                <div className="flex w-full justify-between border-b-2 border-b-purple-50 py-2">
                                    <p className="font-semibold capitalize text-gray-600">
                                        {user.governorate}
                                    </p>
                                    <p className="ml-2 font-bold text-purple-900/90">
                                        :المحافظة
                                    </p>
                                </div>
                                <div className="flex w-full justify-between border-b-2 border-b-purple-50 py-2">
                                    <p className="font-semibold capitalize text-gray-600">
                                        {user.username}
                                    </p>
                                    <p className="ml-2 font-bold text-purple-900/90">
                                        :اسم المستخدم
                                    </p>
                                </div>
                                <div className="mb-4 mt-5 flex w-full items-center justify-center">
                                    <ChangePasswordButton
                                        title="تغيير كلمة المرور"
                                        onClick={() =>
                                            navigate(
                                                `change-password/${user.username}`,
                                                {
                                                    replace: true,
                                                }
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
