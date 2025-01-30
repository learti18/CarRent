import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function YearPicker({ label, value, onChange, name, required }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showAbove, setShowAbove] = useState(false)
    const dropdownRef = useRef(null)
    const buttonRef = useRef(null)
    
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const spaceBelow = windowHeight - buttonRect.bottom
            const spaceNeeded = 200 // approximate height of dropdown

            setShowAbove(spaceBelow < spaceNeeded)
        }
    }, [isOpen])

    const handleSelect = (year) => {
        onChange({ target: { name, value: year } })
        setIsOpen(false)
    }

    return (
        <div className="w-full">
            {label && (
                <label className="block font-medium text-black mb-3">{label}</label>
            )}
            <div className="relative">
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between px-5 py-3 bg-gray-100 rounded-lg
                        ${value ? 'text-black':'text-slate-400'} focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500`}
                >
                    <span>{value || "Select Year"}</span>
                    <ChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>
                {isOpen && (
                    <ul 
                        ref={dropdownRef}
                        className={`absolute ${
                            showAbove ? 'bottom-full mb-1' : 'top-full mt-1'
                        } z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-auto`}
                    >
                        {years.map(year => (
                            <li
                                key={year}
                                onClick={() => handleSelect(year)}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            >
                                {year}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
