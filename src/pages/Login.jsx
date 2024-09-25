import LoginButton from '../components/buttons/LoginButton'
import Loader from '../ui/Loader'
import useLogin from './useLogin'
import { Navigate } from 'react-router-dom'

export default function Login() {
    const {
        username,
        password,
        handlePasswordChange,
        handleUsernameChange,
        errors,
        handleSubmit,
        isLoading,
        isloggedin,
    } = useLogin()

    if (isloggedin) return <Navigate to="/admin" replace={true} />

    return (
        <>
            <div className="flex flex-col items-center justify-center px-4 lg:px-0">
                <form
                    className="mt-10 flex w-full max-w-md flex-col items-center gap-5 rounded-xl border px-10 py-20 sm:mt-40 lg:max-w-lg"
                    onSubmit={handleSubmit}
                >
                    <div className="flex w-full flex-col items-end justify-center gap-2">
                        <label className="mb-1 w-full text-right font-bold text-purple-900 lg:text-lg">
                            : اسم المستخدم
                        </label>
                        <input
                            type="text"
                            autoFocus
                            value={username}
                            autoComplete="username"
                            onChange={handleUsernameChange}
                            className="h-12 w-full rounded-2xl border border-gray-400/50 px-4 font-semibold text-gray-500 shadow-inner focus:border-purple-700 focus:bg-purple-50/50 focus:shadow-md focus:outline-none lg:text-lg"
                        />
                        {errors.username && (
                            <span className="text-sm font-semibold text-red-600">
                                {errors.username}
                            </span>
                        )}
                    </div>
                    <div className="flex w-full flex-col items-end justify-center gap-2">
                        <label className="mb-1 w-full text-right font-bold text-purple-900 lg:text-lg">
                            :كلمة المرور
                        </label>
                        <input
                            type="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                            className="h-12 w-full rounded-2xl border border-gray-400/50 px-4 text-gray-500 shadow-inner focus:border-purple-700 focus:bg-purple-50/50 focus:shadow-inner focus:outline-none lg:text-lg"
                        />
                        {errors.password && (
                            <span className="text-sm font-semibold text-red-600">
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <div className="mt-10">
                        <LoginButton onClick={handleSubmit} />
                    </div>
                </form>
                {isLoading && <Loader />}
            </div>
        </>
    )
}
