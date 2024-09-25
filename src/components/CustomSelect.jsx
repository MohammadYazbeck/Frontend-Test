/* eslint-disable react/prop-types */
import { useState } from 'react'

export default function CustomSelect({
    state,
    setState,
    options,
    textDefaultOption,
    children,
    hidden,
}) {
    const [showOptions, setShowOptions] = useState(false)

    const handleOptionClick = (value) => {
        setState(value)
        setShowOptions(false)
    }

    return (
        <div
            className={`relative w-44 lg:w-48 ${hidden ? 'blur-sm hover:cursor-default' : 'hover:cursor-pointer'}`}
        >
            <div
                className="flex h-10 w-44 items-center justify-center rounded-xl border border-gray-400 px-4 py-2 lg:w-48"
                onClick={() => (!hidden ? setShowOptions(!showOptions) : null)}
            >
                <button className="text-center hover:cursor-pointer">
                    {state ? state : textDefaultOption}
                </button>
                <svg
                    className={`ml-2 h-4 w-4 transform ${showOptions ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </div>

            {showOptions && (
                <div className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-xl border border-purple-200 bg-white">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`flex cursor-pointer items-center justify-start px-4 py-2 hover:bg-gray-200 ${state === option ? 'bg-purple-100 font-semibold' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {children}
                            {''}
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
