/* eslint-disable react/prop-types */
export default function CustomCheckbox({ checked, setChecked, text }) {
    return (
        <div className="flex items-center justify-center gap-2">
            <button
                className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-purple-900 peer-checked:bg-purple-900"
                onClick={() => {
                    setChecked(!checked)
                }}
            >
                {
                    <svg
                        className={`h-4 w-4 ${checked ? 'text-purple-800' : 'hidden'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="5"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                }
            </button>
            <span className="text-right font-semibold text-gray-600 hover:cursor-default">
                {text}
            </span>
        </div>
    )
}
