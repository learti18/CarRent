import { HeartIcon } from 'lucide-react'
import React, { useState } from 'react'

export default function FavoriteButton({toggleFavorite,className}) {
  const [favorite,setFavorite] = useState()
  function toggleFavorite(){
      setFavorite(prevState => !prevState)
  }

  return (
    <HeartIcon 
        className={`hover:scale-110 cursor-pointer transition-all text-gray-400 select-none
                  ${favorite && "fill-red-500 text-red-500"} ${className}`} 
        onClick={toggleFavorite}
      />
  )
}
