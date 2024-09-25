/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import { actionTypes, useUser } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import Slide from '@mui/material/Slide'

export default function DropListNavBar({ isDropdownOpen, toggleDropdown }) {
    const { dispatch } = useUser()
    const navigate = useNavigate()

    return (
        <Slide
            direction="right"
            in={isDropdownOpen}
            unmountOnExit
            className="absolute left-0 top-0 z-40 h-[calc(100vh-3.5rem)] w-[85%] bg-gray-100/65 px-16 pb-1 text-center sm:h-[calc(100vh-4rem)] sm:w-[60%] md:w-[50%] lg:hidden"
        >
            <div className="flex flex-col items-center justify-center">
                <NavLink
                    onClick={toggleDropdown}
                    to="/admin/pending-requests"
                    className="mx-2 my-3 mt-10 flex w-full items-center justify-center border-b border-b-purple-900/20 px-2 py-2 text-lg font-semibold text-purple-900"
                    replace
                >
                    <p>الطلبات المعلقة</p>
                </NavLink>

                <NavLink
                    onClick={toggleDropdown}
                    to="/admin/users"
                    className="mx-2 my-3 flex w-full items-center justify-center border-b border-b-purple-900/20 px-2 py-2 text-lg font-semibold text-purple-900"
                    replace
                >
                    <p>حسابات المستخدمين</p>
                </NavLink>
                <NavLink
                    onClick={toggleDropdown}
                    to="/admin/archive"
                    className="mx-2 my-3 flex w-full items-center justify-center border-b border-b-purple-900/20 px-2 py-2 text-lg font-semibold text-purple-900"
                    replace
                >
                    <p>الأرشيف</p>
                </NavLink>
                <NavLink
                    onClick={toggleDropdown}
                    to="/admin/delete-all-requests"
                    className="mx-2 my-3 flex w-full items-center justify-center border-b border-b-purple-900/20 px-2 py-2 text-lg font-semibold text-purple-900"
                    replace
                >
                    <p>حذف قاعدة البيانات</p>
                </NavLink>

                <button
                    className="mx-2 my-3 flex w-full items-center justify-center border-b border-b-purple-900/20 px-2 py-2 text-lg font-semibold text-purple-900"
                    onClick={() => {
                        dispatch({ type: actionTypes.LOGOUT }),
                            navigate('/login', { replace: true })
                    }}
                >
                    <p>تسجيل الخروج</p>
                </button>
            </div>
        </Slide>
    )
}
