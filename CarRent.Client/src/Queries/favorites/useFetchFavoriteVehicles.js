import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";

export const useFetchFavoriteVehicles = () => {
  return useQuery({
    queryKey: ["favoriteVehicles"],
    queryFn: async () => {
      const response = await api.get("/favorite");

      return response.data;
    },
  });
}