import { TailSpin } from 'react-loader-spinner'

export default function PageLoader() {
    return (
        <div
            className={`lex z-30 flex h-screen w-full items-center justify-center`}
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
