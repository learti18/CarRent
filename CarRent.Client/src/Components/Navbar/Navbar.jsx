import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Menu, XIcon, Car, Info, LogIn, LogOut, UserPlus, LayoutDashboard } from "lucide-react"
import MobileMenu from './MobileMenu'
import { IMGURL } from '../../common/constants'
import Logo from '../Logo'
import { useAuth } from './../../Hooks/useAuth';
import useLogout from './../../Queries/useLogout';
import { getCurrentUser } from '../../Utils/UserStore'

export default function Navbar() {
  const { isAuthenticated, isAdmin } = useAuth()
  const [dropdownMenu, setDropdownMenu] = useState(false)
  const logoutMutation = useLogout()

  const links = [
    {name: "Profile", to: "/profile", icon: <UserPlus size={16} />},
    {name: "Rent now", to: "/cars", icon: <Car size={16} />},
    ...(isAuthenticated 
      ? [{name: "Logout", to: "#", icon: <LogOut size={16} />, onClick: handleLogout}]
      : [
          {name: "Sign in", to: "/sign-in", icon: <LogIn size={16} />},
          {name: "Sign up", to: "/sign-up", icon: <UserPlus size={16} />}
        ]
    ),
    ...(isAdmin ? [{name: "Dashboard", to: "/dashboard", icon: <LayoutDashboard size={16} />}] : [])
  ].filter(Boolean)

  function handleLogout() {
    logoutMutation.mutateAsync()
    setDropdownMenu(false)
  } 

  return (
    <header className='fixed top-0 w-full bg-white border-b z-[100]'>
      <nav className='py-2 px-6 max-w-7xl mx-auto flex flex-row justify-between items-center relative'>
        <Logo/>
        <div className='ml-auto relative'>
          <button 
            className={`relative cursor-pointer flex items-center justify-center p-1 rounded-full
                       transition-all duration-200 ${dropdownMenu ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            onClick={() => setDropdownMenu(!dropdownMenu)}
            aria-expanded={dropdownMenu}
            aria-haspopup="true"
          >
            <div className="relative">
              <img 
                src={getCurrentUser()?.profileImageUrl ? IMGURL + getCurrentUser().profileImageUrl : "user.png"} 
                alt="User avatar" 
                lazy="true"
                className={`w-12 h-12 rounded-full object-cover transition-all duration-200
                           border-2 border-gray-200
                           ${dropdownMenu ? 'shadow-inner' : 'hover:shadow-inner'}`}
                style={{ boxShadow: dropdownMenu ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '' }}
              />
            </div>
          </button>
          
          {dropdownMenu && (
            <div 
              className='flex flex-col absolute right-0 top-16 bg-white shadow-xl rounded-xl overflow-hidden w-52 py-2 border border-gray-100 animate-fadeIn'
              style={{animationDuration: '150ms'}}
            >
              {links.map((link, index) => 
                link.onClick ? (
                  <button
                    key={index}
                    onClick={link.onClick}
                    className='flex items-center gap-3 px-4 py-2.5 w-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 text-left'
                  >
                    <span className={`text-gray-500 ${link.name === "Logout" ? "text-red-500" : ""}`}>{link.icon}</span>
                    <span className={`font-medium ${link.name === "Logout" ? "text-red-500" : ""}`}>{link.name}</span>
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={link.to}
                    className='flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150'
                    onClick={() => setDropdownMenu(false)}
                  >
                    <span className="text-gray-500">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                )
              )}
            </div>
          )}   
        </div>
      </nav>
    </header>
  )
}
