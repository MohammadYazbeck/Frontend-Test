import { TailSpin } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div
            className={`fixed right-0 top-0 z-30 flex h-screen w-screen flex-col items-center justify-center bg-black/45`}
        >
            <TailSpin
                height="50"
                width="70"
                color="#6D28D9"
                radius="0"
                ariaLabel="tail-spin-loading"
                wrapperClass=""
            />
        </div>
    )
}
