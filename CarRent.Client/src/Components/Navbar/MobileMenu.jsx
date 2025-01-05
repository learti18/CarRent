import React from 'react'
import { Link } from "react-router-dom"

export default function MobileMenu({isOpen, links}) {
  return (
    <div className={`fixed inset-0 transition-all duration-300 ease-in-out ${
      isOpen ? 'visible bg-black/60' : 'invisible'
    }`}>
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-12">
          <Link to="/signup" className='text-black text-md relative group py-4 pl-4 w-full ease-in-out'>
            Sign up
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full'></span>
          </Link>
          <Link to="/signin" className='text-black text-md relative group py-4 pl-4 w-full'>
            Sign in
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full'></span>
          </Link>
          {links.map(link => (
            <Link 
              key={link.name} 
              to={link.to} 
              className='text-black relative group text-md py-4 pl-4 w-full'
            >
              {link.name}
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full'></span>  
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
