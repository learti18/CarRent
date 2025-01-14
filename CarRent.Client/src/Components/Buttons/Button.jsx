import React from 'react'

export default function Button({children,className}) {
  return (
    <button className={`bg-blue-500 text-white  lg:text-lg px-5 py-2 rounded-md  transition-colors duration-300 hover:bg-blue-600 ${className}`}>
      {children}
    </button>
  )
}
