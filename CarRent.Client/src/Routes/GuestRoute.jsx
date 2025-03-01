import React from 'react'
import { LoaderBarsSpinner } from '../Components/LoaderBarsSpinner'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'

export default function GuestRoute() {
    const { isAuthenticated, isLoading } = useAuth()

    if(isLoading){
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoaderBarsSpinner/>
            </div>
        )
    }

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet/>
}
