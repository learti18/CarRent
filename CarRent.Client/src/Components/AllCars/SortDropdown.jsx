import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SortDropdown({ onSort }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Default');

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

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <span>Sort by: {selected}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 overflow-hidden transition-all duration-200 ease-in-out origin-top ${
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
