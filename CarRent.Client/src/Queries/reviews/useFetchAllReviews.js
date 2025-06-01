import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api";


export const useFetchAllReviews = () => {
    return useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const response = await api.get("/reviews");
           
            return response.data;
        },
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    })
}