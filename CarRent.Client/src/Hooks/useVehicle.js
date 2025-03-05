import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../Services/Api';
import { toast } from 'sonner';

export const useVehicle = () => {
  const queryClient = useQueryClient();

  // Get all vehicles
  const getAllVehicles = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data } = await api.get('/vehicle');
      return data;
    }
  });

  // Get vehicle by id
  const getVehicleById = (id) => {
    return useQuery({
      queryKey: ['vehicle', id],
      queryFn: async () => {
        const { data } = await api.get(`/vehicle/${id}`);
        return data;
      },
      enabled: !!id
    });
  };

  // Add new vehicle
  const addVehicle = useMutation({
    mutationFn: async (formData) => {
      try {
        console.log('Starting vehicle creation request');
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        const { data } = await api.post('/vehicle', formData, config);
        return data;
      } catch (error) {
        console.error('Error in addVehicle mutation:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          console.error('Response data:', error.response.data);
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Vehicle added successfully!');
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (error) => {
      console.error('Mutation error details:', error);
      let errorMessage = 'Failed to add vehicle';
      if (error.response?.data) {
        errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  });

  // Update vehicle
  const updateVehicle = useMutation({
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
  });

  // Delete vehicle
  const deleteVehicle = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/vehicle/${id}`);
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

  return {
    getAllVehicles,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle
  };
};
