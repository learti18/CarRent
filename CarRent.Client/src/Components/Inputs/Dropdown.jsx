import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DropDown({ label, options, placeholder, onSelect }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block font-medium text-black mb-3">{label}</label>
      )}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-3 text-slate-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        >
          <span>{selectedOption || placeholder || "Select an option"}</span>
          <ChevronDown
            className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-auto">
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
