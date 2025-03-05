import { useQuery } from '@tanstack/react-query';
import api from '../Services/Api';

export const usePopularRentals = () => {
  return useQuery({
    queryKey: ['popularRentals'],
    queryFn: async () => {
      const { data } = await api.get('/vehicle');

      return data.slice(0, 3);
    }
  });
}; 