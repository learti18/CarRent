import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SortDropdown({ onSort }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Default');
  const dropdownRef = useRef(null);

  const sortOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' }
  ];

  const handleSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);
    onSort(option.value);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <span>Sort by: {selected}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out origin-top z-50 ${
        isOpen 
          ? 'opacity-100 transform scale-100 translate-y-0' 
          : 'opacity-0 transform scale-95 -translate-y-2 pointer-events-none'
      }`}>
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option)}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
