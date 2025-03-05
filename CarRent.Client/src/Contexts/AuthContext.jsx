import React, { createContext, useEffect, useState } from 'react'
import { useQueryClient } from "@tanstack/react-query"
import api, { setAuthtoken } from './../Services/Api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [token,setToken] = useState(() => localStorage.getItem("token"))
    const [user,setUser] = useState(null)
    const [isAdmin,setIsAdmin] = useState(false)
    const queryClient = useQueryClient()
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(token){
            setAuthtoken(token)
        }else{
            setAuthtoken(null)
            setIsLoading(false)
        }
    },[token])

    const fetchUser = async () => {
        if(!token) return null

        try{
            const { data } = await api.get("/authentication/user")
            if (data.token) {
                setToken(data.token)
                localStorage.setItem("token", data.token)
            }
            setUser(data)
            setIsAdmin(data.roles?.includes("Admin") || false)
            queryClient.setQueryData(["user"],data)
            setIsLoading(false)
            return data
        }catch(e){
            console.error("Error fetching user:", e)
            if (e.response?.status === 401) {
                handleLogout()
            }
            setIsLoading(false)
            return null;
        }
    }

    const handleLogin = async (newToken) => {
        setToken(newToken)
        localStorage.setItem("token",newToken)
        return await fetchUser()
    }

    const handleLogout = () => {
        setToken(null)
        setUser(null)
        setIsAdmin(false)
        localStorage.removeItem("token")
        queryClient.clear()
        navigate("/sign-in", { replace: true })
    }
    
    useEffect(() => {
        const initializeAuth = async () => {
            if(token){
                await fetchUser()
            } else {
                setIsLoading(false)
            }
        }
        initializeAuth()
    },[])

    useEffect(() => {
        if (!token) return

        const refreshInterval = setInterval(() => {
            fetchUser()
        }, 4 * 60 * 1000)

        return () => clearInterval(refreshInterval)
    }, [token])

    return (
        <AuthContext.Provider value={{
            token,
            user,
            login: handleLogin,
            logout: handleLogout,
            isLoading,
            isAdmin,
            isAuthenticated: !!token && !!user
        }}>
            {children}
        </AuthContext.Provider>
    )
}
