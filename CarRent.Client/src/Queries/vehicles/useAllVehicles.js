import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useAllVehicles = () => {
    return useQuery({
        queryKey: ["vehicles"],
        queryFn: async () => {
            const { data } = await api.get("/vehicles")
            return data
        },
    })
}