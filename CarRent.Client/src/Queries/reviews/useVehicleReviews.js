import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useVehicleReviews = (vehicleId) => {
    return useQuery({
        queryKey: ["vehicleReviews", vehicleId],
        queryFn: async () => {
            const { data } = await api.get(`Reviews/${vehicleId}`)
            return data;
        },
        enabled: !!vehicleId,
    })
}