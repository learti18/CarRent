import React from 'react'

export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'bg-transparent border hover:bg-opacity-10',
  };

  return (
    <button 
      className={`px-6 py-3 rounded-lg transition-all duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
