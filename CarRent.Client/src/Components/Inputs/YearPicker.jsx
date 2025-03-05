import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function YearPicker({ label, register, name, required, error }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showAbove, setShowAbove] = useState(false)
    const [selectedYear, setSelectedYear] = useState('')
    const dropdownRef = useRef(null)
    const buttonRef = useRef(null)
    
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 34 }, (_, i) => currentYear - i)

    // Get the register props
    const { onChange, value } = register(name)

    // Update selected year when form value changes
    useEffect(() => {
        if (value) {
            console.log(`YearPicker ${name} value changed:`, value);
            // Convert value to number if it's a string
            const yearValue = typeof value === 'string' ? parseInt(value) : value;
            setSelectedYear(yearValue);
        }
    }, [value, name])

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
        console.log(`YearPicker ${name} selected:`, year);
        setSelectedYear(year)
        // Trigger the onChange event for react-hook-form
        onChange({ target: { value: year, name } })
        setIsOpen(false)
    }

    return (
        <div className="w-full">
            {label && (
                <label className="block font-medium text-black mb-3">{label}</label>
            )}
            <div className="relative">
                <button
                    type="button" // Important to prevent form submission
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between px-5 py-3 bg-gray-100 rounded-lg 
                        ${selectedYear ? 'text-black':'text-gray-400'} 
                        ${error ? 'border-2 border-red-500' : ''} 
                        focus:outline-none focus:ring-2 
                        ${error ? 'focus:ring-red-200' : 'focus:ring-gray-500'} 
                        focus:border-gray-500`}
                    >
                    <span>{selectedYear || "Select Year"}</span>
                    <ChevronDown
                        className={`h-5 w-5 ${error ? 'text-red-500' : 'text-slate-400'} transition-transform duration-200 ${
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
                                className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                                    year === selectedYear ? 'bg-blue-50' : ''
                                }`}
                            >
                                {year}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {error && (
                <span className="text-red-500 text-sm mt-1">{error.message}</span>
            )}
        </div>
    )
}
