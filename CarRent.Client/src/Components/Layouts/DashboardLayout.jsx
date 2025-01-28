import { LayoutDashboard, Car, Inbox, Calendar, Receipt, Settings, UserCircle, ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function DashboardLayout() {
    const [toggledSidebar,setToggledSidebar] = useState(true)
    const toggleSidebar = () => setToggledSidebar(prevState => !prevState)
    const location = useLocation()

    const links = [
        { name: "Dashboard", to: "/dashboard", icon: <LayoutDashboard size={22} /> },
        { name: "Rentals", to: "/dashboard/rentals", icon: <Car size={22} /> },
        { name: "Inbox", to: "/dashboard/inbox", icon: <Inbox size={22} /> },
        { name: "Calendar", to: "/dashboard/calendar", icon: <Calendar size={22} /> },
        { name: "Reimbursements", to: "/dashboard/reimbursements", icon: <Receipt size={20} /> },
        { name: "Accounts", to: "/dashboard/accounts", icon: <UserCircle size={22} /> },
        { name: "Settings", to: "/dashboard/settings", icon: <Settings size={22} /> },    
    ]
    const isActive = (path) => {
        return location.pathname === path
    }

  return (
    <div className='flex flex-row bg-gray-50'>
        <div className={`bg-white min-h-screen transition-all duration-500 shadow-lg border-r ${toggledSidebar ? 'w-64':'w-20'}`}>
            <div className='w-full h-full flex flex-col'>
                {/* Header */}
                <div className='p-4 border-b'>
                    <button 
                        onClick={toggleSidebar}
                        className='flex ml-auto text-gray-400 hover:text-blue-500 transition-colors'>
                        <div className={`transform transition-transform duration-500 ${toggledSidebar ? 'rotate-0' : 'rotate-180'}`}>
                            <ChevronLeft size={28} strokeWidth={2.5} />
                        </div>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className='flex flex-col gap-2 p-3 flex-grow'>
                    {/* Main Navigation */}
                    <div className='space-y-1'>
                        {links.slice(0, 4).map(link => (
                            <Link 
                                key={link.to}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg duration-200 transition-all
                                    ${isActive(link.to) 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'} 
                                    ${toggledSidebar ? '':'justify-center'}`}
                                to={link.to}>
                                <span className='flex-shrink-0'>{link.icon}</span>
                                {toggledSidebar && <span className='truncate'>{link.name}</span>}
                            </Link>
                        ))}
                    </div>

                    {/* Settings Group - with separator */}
                    <div className='mt-8 pt-4 border-t space-y-1'>
                        {links.slice(4).map(link => (
                            <Link 
                                key={link.to}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg duration-200 transition-all
                                    ${isActive(link.to) 
                                        ? 'bg-blue-50 text-blue-600 font-medium' 
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'} 
                                    ${toggledSidebar ? '':'justify-center'}`}
                                to={link.to}>
                                <span className='flex-shrink-0'>{link.icon}</span>
                                {toggledSidebar && <span className='truncate'>{link.name}</span>}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>            
        </div>

        {/* Main Content */}
        <div className='flex-1 p-6'>
            <Outlet/>
        </div>
    </div>
  )
}
