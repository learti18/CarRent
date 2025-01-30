import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function DropDown({ label, options, placeholder, onSelect, value, onChange, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - buttonRect.bottom;
      const spaceNeeded = 200; // approximate height of dropdown

      setShowAbove(spaceBelow < spaceNeeded);
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    if (onChange && name) {
      // Handle form-style onChange
      onChange({ target: { name, value: option } });
    } else if (onSelect) {
      // Handle direct onSelect callback
      onSelect(option);
    }
    setIsOpen(false);
  };

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
          <span>{value || placeholder || "Select an option"}</span>
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
    </div>
  );
}
