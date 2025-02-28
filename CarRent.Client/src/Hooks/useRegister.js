import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import api from "../Services/Api"
import toast from "react-hot-toast"

const useRegister = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    return useMutation({
        mutationFn: async (credentials) => {
            try{
                const { data } = await api.post("/authentication/register",credentials)
                return data
            }catch(error){
                // Get the most relevant error message
                const errorData = error.response?.data
                let errorMessage = 'Registration failed. Please try again.'

                if (typeof errorData === 'string') {
                    // Simple string error
                    errorMessage = errorData
                } else if (errorData?.errors) {
                    // First validation error from any field
                    const firstErrorField = Object.keys(errorData.errors)[0]
                    errorMessage = errorData.errors[firstErrorField][0]
                } else if (Array.isArray(errorData) && errorData.length > 0) {
                    // First error from identity errors array
                    errorMessage = errorData[0].description || errorData[0].message || errorData[0]
                }

                throw new Error(errorMessage)
            }
        },
        onSuccess: async (data) => {
            toast.success("Registration successful!")
            await login(data.token)
            navigate("/")
        },
        onError: (error) => {
            toast.error(error.message || "Failed to register")
            return error.message
        }
    })
}

export default useRegister;