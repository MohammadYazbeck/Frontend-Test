import { Outlet } from 'react-router-dom'
import AdminNavBar from '../components/AdminNavBar'
import AdminSideBar from '../components/AdminSideBar'

export default function AdminAppLayout() {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <AdminNavBar />
                <div className="mt-14 flex-grow sm:mt-16">
                    <AdminSideBar />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
