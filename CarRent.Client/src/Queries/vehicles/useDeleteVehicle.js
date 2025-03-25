import { useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (id) => {
        await api.delete(`/vehicles/${id}`);
        return id;
      },
      onSuccess: (id) => {
        toast.success('Vehicle deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      },
      onError: (error) => {
        toast.error(`Error deleting vehicle: ${error.response?.data || error.message}`);
      }
    });
}