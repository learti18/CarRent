import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { useAuth } from "../Hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { getOrGenerateDeviceId } from "../Utils/GenerateDeviceId"
import { clearCurrentUsername } from "../Utils/UserStore"
import { resetInterceptorStatus } from "../Services/Api"

const useLogout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async () => {
            const deviceId = getOrGenerateDeviceId()

            try{
                await api.post("/auth/logout", { deviceId })
                clearCurrentUsername()

                resetInterceptorStatus()
            }catch (error) {
                console.error("Logout failed", error)
                throw error
            }
        },
        onSuccess: () => {
            logout()
            navigate("/login")
        },
        onError: (error) => {
            console.error("Logout failed: ", error)

            logout()
            navigate("login")
        }
    })
}

export default useLogout;