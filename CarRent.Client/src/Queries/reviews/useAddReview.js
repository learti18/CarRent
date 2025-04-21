import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../Services/Api"
import { toast } from "sonner"

export const useAddReview = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (review) => {
            const { data } = await api.post('/reviews', review)
            return data;
        },
        onSuccess: (data) => {
            toast.success("Review added successfully")
        },
        onError: (error) => {
            toast.error("Failed to add review")
        },
        onSettled: () => {
            queryClient.invalidateQueries(['vehicleReviews'])        
        },

    })
}