import React, { useState } from 'react'
import { useAuth } from '../Hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
    const { isAuthenticated, isAdmin, isLoading } = useAuth()
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoaderBarsSpinner />
            </div>
        )
    
    }
    if(!isAuthenticated){
        return <Navigate to="/sign-in" replace/>
    }

    if(!isAdmin){
        return <Navigate to="/unauthorized" replace/>     
    }

    return <Outlet/>
    
}
