import React, { useEffect, useState } from 'react'
import { useAuth } from '../Hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoaderBarsSpinner } from '../Components/LoaderBarsSpinner'
import { STATUS } from '../Utils/AuthStatus'

export default function AdminRoute() {
    const { isAuthenticated, status } = useAuth()
    
    const location = useLocation()

    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        if(status !== STATUS.PENDING){
            setAuthChecked(true)
        }
    }, [status])

    if(status === STATUS.PENDING || !authChecked){
        return (
            <LoaderBarsSpinner fullscreen />
        )
    }


    return  <Outlet/> 
    
}
