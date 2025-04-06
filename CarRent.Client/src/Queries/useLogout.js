import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { useAuth } from "../Hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { getOrGenerateDeviceId } from "../Utils/GenerateDeviceId"
import { clearCurrentUser, clearCurrentUsername } from "../Utils/UserStore"
import api, { resetInterceptorStatus } from "../Services/Api"

const useLogout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async () => {
            const deviceId = getOrGenerateDeviceId()

            try{
                await api.post("/auth/logout", { deviceId })
                clearCurrentUsername()
                clearCurrentUser()
                resetInterceptorStatus()
            }catch (error) {
                console.error("Logout failed", error)
                throw error
            }
        },
        onSuccess: () => {
            logout()
            navigate("/sign-in")
        },
        onError: (error) => {
            console.error("Logout failed: ", error)

            logout()
            navigate("login")
        }
    })
}

export default useLogout;