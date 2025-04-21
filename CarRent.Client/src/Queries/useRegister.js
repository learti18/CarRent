import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"
import api from "../Services/Api"
import { getOrGenerateDeviceId } from "../Utils/GenerateDeviceId"
import { setCurrentUsername, setCurrentUser } from "../Utils/UserStore"
import { STATUS } from "../Utils/AuthStatus"
import { formatUserData } from "../Services/AuthService"

const useRegister = () => {
    const { login, setAuthenticationStatus } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (credentials) => {
            const registerData = {
                ...credentials,
                deviceId: getOrGenerateDeviceId()
            }

            const { data } = await api.post("/auth/register", registerData)
            return data
        },
        onSuccess: (data) => {
            if(!data.token || !data.expiresAt) {
                throw new Error("Missing token or expiration time")
            }

            setCurrentUsername(data.userName)
            setCurrentUser(data)

            const formattedUser = formatUserData(data)
            login(formattedUser, data.token, data.expiresAt)
            setAuthenticationStatus(STATUS.SUCCEEDED)
            navigate("/")
        },
        onError: (error) => {
            setAuthenticationStatus(STATUS.FAILED)
            console.error("Registration failed: ", error.response?.data || error)
        }
    })
}

export default useRegister;