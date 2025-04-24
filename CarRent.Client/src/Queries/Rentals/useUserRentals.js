import { useQuery } from '@tanstack/react-query';
import api from '../../Services/Api';

export const useAllRentals = () => {

    return useQuery({
        queryKey: ['rentals'],
        queryFn: async () => {
            const { data } = await api.get('/rentals/user');
            return data;
        }
    })
}