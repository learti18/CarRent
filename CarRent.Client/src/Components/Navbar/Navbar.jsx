import { useState } from 'react'
import { Link } from "react-router-dom"
import { Menu, XIcon } from "lucide-react"
import MobileMenu from './MobileMenu'
import Logo from '../Logo'

export default function Navbar() {

  const [mobileMenu,setMobileMenu] = useState(false)

  function toggleMobileMenu(){
    setMobileMenu(prevstate => !prevstate)
  }


  const links = [
    {name:"Rent now", to:"/cars"},
    {name:"About", to:"/about"},
    {name:"Contact us", to:"/contactus"},
    {name:"Dashboard", to:"/dashboard"}
  ]

  return (
    <header className='fixed top-0 w-full bg-white border-b z-[100]'>
      <nav className='py-4 px-6 max-w-7xl mx-auto flex flex-row justify-between items-center relative'>
        <Logo/>
        
        {/* Desktop navbar */}
        <div className='hidden md:flex gap-16'>
          {
            links.map(link => (
              <Link
                key={link.name}
                to={link.to}
                className='text-gray-900 py-1 relative group text-sm hover:text-blue-500 transition-colors duration-200'
              >
                {link.name}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full'></span>
              </Link>
            ))
          }
        </div>
        <div className='space-x-8 hidden md:flex items-center'>
            <Link to="/signin" className='text-gray-900 py-1 relative group text-sm hover:text-blue-500 transition-colors duration-200'>
              Sign in
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full'></span>
            </Link>
            <Link to="/signup" className='text-sm px-6 py-1.5 rounded-md bg-blue-500 text-white duration-200 hover:bg-blue-600'>Sign up</Link>
        </div>
      </nav>
        {/* Mobile menu*/}
        <button onClick={toggleMobileMenu} className='md:hidden fixed right-5 top-4 z-[60]'>
          {mobileMenu ? 
            <XIcon className='transition-all duration-300'/> 
            : 
            <Menu className=' transition-all duration-300'/>
          }
        </button>
        <MobileMenu isOpen={mobileMenu} links={links} toggleMobileMenu={toggleMobileMenu}/>

    </header>
  )
}
