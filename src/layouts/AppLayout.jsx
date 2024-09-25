import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <NavBar />
                <div className="mt-14 flex-grow p-3 sm:mt-16">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}
