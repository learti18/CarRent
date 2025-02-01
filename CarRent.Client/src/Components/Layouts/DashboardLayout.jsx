import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar'

export default function DashboardLayout() {
    

  return (
    <div className='flex flex-row bg-gray-100'>
        <div>
           <Sidebar/>   
        </div>

        {/* Main Content */}
        <div className='flex-1 py-8 px-8 md:px-10'>
            <Outlet/>
        </div>
    </div>
  )
}
