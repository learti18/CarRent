import React from 'react'

export default function Button({ children, className = '', variant = 'primary', type = 'button', onClick}) {
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'bg-transparent border hover:bg-opacity-10',
  };

  return (
    <button 
      className={`px-5 py-2 rounded-md transition-all duration-200 ${variants[variant]} ${className}`}
      type={type}
      onClick={onClick}
   >
      {children}
    </button>
  );
}
