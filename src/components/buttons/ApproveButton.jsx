/* eslint-disable react/prop-types */
export default function ApproveButton({ onClick, title }) {
    return (
        <button
            onClick={onClick}
            className="h-12 w-32 transform rounded-full bg-gray-50 text-base font-semibold text-green-700 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-green-600 hover:text-white sm:h-14 sm:w-36 sm:text-lg"
        >
            {title}
        </button>
    )
}
