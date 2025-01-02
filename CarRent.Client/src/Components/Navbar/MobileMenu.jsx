import React from 'react'
import { Link } from "react-router-dom"

export default function MobileMenu({isOpen,links}) {
  return (
    <div>
        {isOpen && (
            <div className='fixed md:hidden top-0 right-0  w-[280px] min-h-screen bg-white z-50 flex flex-col pt-12 shadow-md'>
                <Link to="/signup" className='text-black text-md relative group py-4 pl-4 w-full'>
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
        )}
    </div>
  )
}
