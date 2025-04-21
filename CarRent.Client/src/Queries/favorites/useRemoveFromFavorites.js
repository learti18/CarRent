import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../Services/Api"
import { toast } from "sonner"

export const useRemoveFromFavorites = () => { 
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (carId) => {
            const { data } = await api.delete(`/favorite/${carId}`)
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['availableVehicles'])
            queryClient.invalidateQueries(['vehicle'])

            toast.error("Successfully removed from favorites", {
                duration: 2000,
                description: "You can add it again later.",
                icon: false,
                style: {
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                },
                iconTheme: {
                    primary: "#721c24",
                    secondary: "#f8d7da",
                },
              });
        },
        onError: (error) => {
            toast.error('Error removing from favorites')
        }
    })
}