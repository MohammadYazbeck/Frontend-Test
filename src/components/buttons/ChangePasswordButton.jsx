/* eslint-disable react/prop-types */
export default function ChangePasswordButton({ onClick, title }) {
    return (
        <button
            onClick={onClick}
            className="h-12 w-36 transform rounded-full bg-gray-50 text-base font-semibold text-red-700 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 sm:w-44 sm:text-lg"
        >
            {title}
        </button>
    )
}
