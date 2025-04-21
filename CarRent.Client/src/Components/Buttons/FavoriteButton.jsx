import { HeartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAddToFavorites } from "../../Queries/favorites/useAddToFavorites";
import { useRemoveFromFavorites } from "../../Queries/favorites/useRemoveFromFavorites";

export default function FavoriteButton({ className, isFavorite, id }) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { mutate: addToFavorites } = useAddToFavorites();
  const { mutate: removeFromFavorites } = useRemoveFromFavorites();

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const toggleFavorite = async () => {
    try {
      setFavorite((prev) => !prev);
      if (!favorite) {
        addToFavorites(id);
      } else {
        removeFromFavorites(id);
      }
    } catch (error) {
      setFavorite((prev) => !prev);
      toast.error("Error adding to favorites", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <HeartIcon
      className={`size-7 hover:scale-110 cursor-pointer transition-all text-gray-400 select-none
                  ${favorite && "fill-red-500 text-red-500"} ${className}`}
      onClick={toggleFavorite}
    />
  );
}
