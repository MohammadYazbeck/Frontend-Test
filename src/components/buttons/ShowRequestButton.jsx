/* eslint-disable react/prop-types */
export default function ShowRequestButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="h-12 w-36 rounded-full bg-gray-50 text-lg font-semibold text-purple-900/90 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-gray-100 sm:h-[3.2rem] sm:w-40 sm:text-xl"
        >
            عرض الطلب
        </button>
    )
}
