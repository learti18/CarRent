import { HeartIcon } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

export default function FavoriteButton({ className, isFavorite}) {
  const [favorite,setFavorite] = useState(isFavorite)

  const toggleFavorite = () => {
    setFavorite(prev => !prev)
    if(favorite){
      toast.error("Removed from favorite!",{

      })
    }else{
      toast.success("Successfully added to favorite")
    }
  }

  return (
    <HeartIcon 
        className={`size-7 hover:scale-110 cursor-pointer transition-all text-gray-400 select-none
                  ${favorite && "fill-red-500 text-red-500"} ${className}`} 
        onClick={toggleFavorite}
      />
  )
}
