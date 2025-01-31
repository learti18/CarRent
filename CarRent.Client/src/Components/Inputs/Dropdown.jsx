import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function DropDown({ label, options, placeholder, register, name, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const { onChange } = register(name);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - buttonRect.bottom;
      const spaceNeeded = 200;

      setShowAbove(spaceBelow < spaceNeeded);
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange({ target: { value: option, name } });
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block font-medium text-black mb-3">{label}</label>
      )}
      <div className="relative">
        <input 
          type="hidden" 
          {...register(name)}
          value={selectedOption}
        />
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-5 py-3 bg-gray-100 rounded-lg 
            ${selectedOption ? 'text-black':'text-gray-400'} 
            ${error ? 'border-2 border-red-500' : ''} 
            focus:outline-none focus:ring-2 
            ${error ? 'focus:ring-red-200' : 'focus:ring-gray-500'} 
            focus:border-gray-500`}
        >
          <span>{selectedOption || placeholder || "Select an option"}</span>
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
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
}
