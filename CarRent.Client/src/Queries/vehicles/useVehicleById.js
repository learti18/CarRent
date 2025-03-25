import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useVehicleById =  (id) => {
    return useQuery({
        queryKey:["vehicle",id],
        queryFn: async () => {
            const { data } = await api.get(`/vehicles/${id}`)
            return data
        }
    })
}