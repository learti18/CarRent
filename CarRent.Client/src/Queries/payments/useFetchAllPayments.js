import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useFetchAllPayments = () => {
    return useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const response = await api.get("/payments")
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    })
}