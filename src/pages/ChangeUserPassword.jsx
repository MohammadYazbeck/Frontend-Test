import ChangePasswordButton from '../components/buttons/ChangePasswordButton'
import Loader from '../ui/Loader'
import useChangeUserPassword from './useChangeUserPassword'

export default function ChangeUserPassword() {
    const {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        username,
        navigate,
        handleSubmit,
        isLoading,
    } = useChangeUserPassword()
    return (
        <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-start bg-white sm:h-[calc(100vh-6.5rem)] lg:ml-[calc(100vw-70%)] 2xl:ml-[calc(100vw-80%)]">
            <div className="fixed flex w-full justify-between bg-gray-50 pb-3 pt-4 shadow-sm lg:w-[calc(100vw-30%)] 2xl:w-[calc(100vw-20%)]">
                <div
                    className="ml-5 flex items-center justify-center sm:ml-10"
                    onClick={() => {
                        navigate('/admin/users', {
                            replace: true,
                        })
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
                        <h1 className="flex pb-2 text-right text-xl font-semibold text-gray-600 sm:text-2xl">
                            <p className="mr-2">{username}</p>
                            تغيير كلمة مرور المستخدم
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
                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="my-scrollbar flex w-full items-start justify-center overflow-y-scroll">
                <div className="w-[85%] flex-col items-center justify-center pt-48 sm:w-[35rem] sm:flex-row">
                    <form className="flex w-full flex-col items-center gap-5 rounded-xl border px-10 py-24 sm:px-14">
                        <div className="flex w-full flex-col items-end justify-center gap-2">
                            <label className="mb-1 w-full text-right text-base font-bold text-purple-900 sm:text-lg">
                                :كلمة المرور الجديدة
                            </label>
                            <input
                                type="password"
                                value={password}
                                autoFocus
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-11 w-full rounded-xl border border-gray-400/50 px-4 text-gray-500 shadow-inner focus:-translate-y-1 focus:border-purple-700 focus:bg-purple-50/50 focus:shadow-inner focus:outline-none"
                            />
                            {errors && errors.password && (
                                <span className="text-right text-sm font-semibold text-red-600">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className="flex w-full flex-col items-end justify-center gap-2">
                            <label className="mb-1 w-full text-right text-base font-bold text-purple-900 sm:text-lg">
                                : تأكيد كلمة المرور
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="h-11 w-full rounded-xl border border-gray-400/50 px-4 text-gray-500 shadow-inner focus:-translate-y-1 focus:border-purple-700 focus:bg-purple-50/50 focus:shadow-inner focus:outline-none"
                            />
                            {errors && errors.confirmPassword && (
                                <span className="text-right text-sm font-semibold text-red-600">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                        <div className="mt-5">
                            <ChangePasswordButton
                                title="تغيير كلمة المرور"
                                onClick={handleSubmit}
                            />
                        </div>
                    </form>
                    {isLoading ? <Loader /> : null}
                </div>
            </div>
        </div>
    )
}
