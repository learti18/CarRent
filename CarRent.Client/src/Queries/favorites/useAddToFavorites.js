import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './../../Services/Api';
import { toast } from 'sonner';
export const useAddToFavorites = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (vehicleId) => {
            const { data } = await api.post('/favorite', {vehicleId})
            return data;
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(['availableVehicles'])
          queryClient.invalidateQueries(['vehicle'])

          toast.success("Successfully added to favorite", {
                duration: 2000,
                description: "You can remove it later.",
                icon: false,
                style: {
                  backgroundColor: "#d4edda",
                  color: "#155724",
                },
                iconTheme: {
                  primary: "#155724",
                  secondary: "#d4edda",
                },
              });
        },
        onError: (error) => {
            toast.error('Error adding to favorites')
            console.log(error.message)
        }
    })

}
