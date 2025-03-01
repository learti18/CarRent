import React from 'react'
import { useAuth } from '../Hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth()
    
    return isAuthenticated ? <Outlet/> : <Navigate to="/sign-in" replace/>
}
