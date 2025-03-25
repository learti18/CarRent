import React from 'react'
import { Link } from 'react-router-dom'
import { UserCircle, LogOut } from 'lucide-react'

export default function MobileMenu({ isOpen, links, toggleMobileMenu, isAuthenticated, user, logout }) {
  return (
    <div className={`fixed inset-0 bg-white z-50 transition-transform duration-300 md:hidden
      ${isOpen ? 'transform-none' : 'translate-x-full'}
    `}>
      <div className="flex flex-col h-full p-8">
        <div className="space-y-6 flex-1">
          {links.map((link,index) => (
            <Link
              key={index}
              to={link.to}
              className="block py-2 text-gray-800 text-lg font-medium hover:text-blue-500"
              onClick={toggleMobileMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Auth Actions */}
        <div className="pt-6 border-t border-gray-200">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-100 p-2 rounded-full">
                  <UserCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">{user?.username || 'User'}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button 
                className="flex items-center gap-2 w-full py-3 px-4 text-left rounded-lg bg-gray-100 text-gray-800"
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <Link 
                to="/sign-in" 
                className="block w-full py-3 text-center font-medium text-gray-800 border border-gray-300 rounded-lg"
                onClick={toggleMobileMenu}
              >
                Sign in
              </Link>
              <Link 
                to="/sign-up" 
                className="block w-full py-3 text-center font-medium text-white bg-blue-500 rounded-lg"
                onClick={toggleMobileMenu}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
