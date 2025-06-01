import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api";

export const useAvailableVehicles = (queryParams) => {
    // Create a specific key for date tracking
    const dateKey = `${queryParams?.pickupDate || ''}_${queryParams?.dropoffDate || ''}`;
    
    // Create a stable queryKey with specific keys separated to improve change detection
    const queryKey = [
      'availableVehicles',
      dateKey, // Specific key for dates
      queryParams?.bodyType,
      queryParams?.capacity,
      queryParams?.minPrice,
      queryParams?.maxPrice,
      queryParams?.sortBy,
      queryParams?.sortOrder,
      queryParams?.pageNumber,
      queryParams?.pageSize,
      queryParams?.location
    ];

    return useQuery({
      queryKey,
      queryFn: async () => {
        console.log('Fetching vehicles with params:', queryParams);
        const { data } = await api.get('/vehicles/available', {
          params: queryParams
        });
        return data;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 10*60*1000,
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    });
};