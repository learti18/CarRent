import React, { createContext, useEffect, useState } from 'react'
import { useQueryClient } from "@tanstack/react-query"
import api, { setAuthtoken } from './../Services/Api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [token,setToken] = useState(() => sessionStorage.getItem("token"))
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
        }
    },[token])

    const fetchUser = async () => {
        if(!token) return null

        try{
            const { data } = await api.get("/authentication/user")
            setUser(data)
            queryClient.setQueryData(["user"],data)
            

            return data
        }catch(e){
            console.log(e)
            handleLogout()
            return null;
        }
    }

    const handleLogin = async (newToken) => {
        setToken(newToken)
        sessionStorage.setItem("token",newToken)

        return await fetchUser()
    }
    const handleLogout = () => {
        setToken(null)
        setUser(null)
        setIsAdmin(false)
        sessionStorage.removeItem("token")
        queryClient.clear()
        navigate("sign-in")
    }

    useEffect(() => {
        if(user && user.roles){
            setIsAdmin(user.roles.includes("Admin"))
        }else{
            setIsAdmin(false)
        }
    },[user])
    
    useEffect(() => {
        const initializeAuth = async () => {
            if(token){
                await fetchUser()
            }
            setIsLoading(false)
        }
        initializeAuth()
    },[token])

    return (
        <AuthContext.Provider value={{
            token,
            user,
            login: handleLogin,
            logout: handleLogout,
            isLoading,
            isAdmin,
            isAuthenticated: !!token
        }}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}
