import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api";

export const useAvailableVehicles = (locationData) => {

    return useQuery({
        queryKey: ['availableVehicles', locationData],
        queryFn: async () => {
            const { data } = await api.get('/vehicles/available',{
                params: {
                    pickupLocation: locationData.pickup.location,
                    pickupDate: locationData.pickup.date,
                    pickupTime: locationData.pickup.time,
                    dropoffLocation: locationData.dropoff.location,
                    dropoffDate: locationData.dropoff.date,
                    dropoffTime: locationData.dropoff.time
                }
            })
            return data;
        },
    })
   
}