/* eslint-disable react/prop-types */
export default function DeleteDatabaseButton({ onClick, title }) {
    return (
        <button
            onClick={onClick}
            className="mt-10 h-12 w-40 transform rounded-full bg-gray-50 text-base font-semibold text-red-700 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-red-600 hover:text-white sm:h-14 sm:w-44 sm:text-lg"
        >
            {title}
        </button>
    )
}
