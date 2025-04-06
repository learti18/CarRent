import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../Services/Api"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"


export const useAddRental = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (rentalData) => {
            return await api.post('/rentals', rentalData)
        },
        onSuccess: (data) => {
            navigate('/profile')
            toast.success('Rental added successfully')
            queryClient.invalidateQueries({ queryKey: ['rentals'] })
            queryClient.invalidateQueries({ queryKey: ['vehicles'] })
        },
        onError: (error) => {
            toast.error('Error adding rental')
        }
    })
}