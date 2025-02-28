import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"

export default function MobileMenu({isOpen, links, toggleMobileMenu}) {
  const {pathname} = useLocation()
  
  useEffect(() => {
    if(isOpen){
      toggleMobileMenu()
    }
  } ,[pathname])
  
  return (
    <div className={`fixed inset-0 transition-all z-50 duration-300 ease-in-out ${
      isOpen ? 'visible bg-black/60' : 'invisible'
    }`}>
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-12">
          <Link to="/sign-up" className='text-black text-md relative group py-3 pl-4 w-full hover:text-blue-500 transition-colors duration-200'>
            Sign up
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full'></span>
          </Link>
          <Link to="/sign-in" className='text-black text-md relative group py-3 pl-4 w-full hover:text-blue-500 transition-colors duration-200'>
            Sign in
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full'></span>
          </Link>
          {links.map(link => (
            <Link 
              key={link.name} 
              to={link.to} 
              className='text-gray-900 py-3 relative group text-md pl-4 w-full hover:text-blue-500 transition-colors duration-200'
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
