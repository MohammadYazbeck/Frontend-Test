import { Toaster } from 'react-hot-toast'
export default function NavBar() {
    return (
        <>
            <nav className="fixed left-0 top-0 z-10 flex h-14 w-full items-center justify-between bg-purple-900/90 px-5 py-4 text-white sm:h-16 md:justify-around">
                <div className="flex w-[60%] items-end justify-start gap-1 hover:cursor-default">
                    <h1 className="text-2xl font-semibold text-gray-200 xl:text-3xl">
                        <span className="font-bold">Digi</span>com
                    </h1>
                    <p className="text-sm xl:text-base">Admin</p>
                </div>
            </nav>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    )
}
