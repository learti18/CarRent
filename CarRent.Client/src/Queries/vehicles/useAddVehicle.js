import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import api from "../../Services/Api"


export const useAddVehicle = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData) => {
            try{
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                }
                const { data } = await api.post("/vehicles", formData, config)
                return data
            }catch(error){
                console.error("Error in addVehicle mutation:", error)
                if(error.response){
                    console.error("Response status:", error.response.status)
                    console.error("Response headers:", error.response.headers)
                    console.error("Response data:", error.response.data)
                }
                throw error
            }
        },
        onSuccess: () => {
            toast.success("Vehicle added successfully!")
            queryClient.invalidateQueries({ queryKey: ["vehicles"] })
        },
        onError: (error) => {
            console.error("Mutation error details:", error)
            let errorMessage = "Failed to add vehicle"
            if(error.response?.data){
                errorMessage = typeof error.response.data === "string" 
                    ? error.response.data 
                    : JSON.stringify(error.response.data)
            }else if(error.message){
                errorMessage = error.message
            }
            toast.error(errorMessage)
        }
    })
}