import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import api from "../../Services/Api";

export const useUpdateVehicle = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ id, updateData }) => {
            const { data } = await api.put(`/vehicle/${id}`, updateData);
            return data;
        },
        onSuccess: (data) => {
            toast.success('Vehicle updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
            queryClient.invalidateQueries({ queryKey: ['vehicle', data.id] });
        },
        onError: (error) => {
            toast.error(`Error updating vehicle: ${error.response?.data || error.message}`);
        }
    })
}