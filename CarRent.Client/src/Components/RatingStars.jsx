import { Star } from 'lucide-react'
import React from 'react'

export default function RatingStars({rating}) {

  return (
    <div className='flex gap-[3px]'>
        {
            [...Array(5)].map((_,index) => (
                <Star
                  key={index} 
                  className={`size-4 md:size-5 ${index < rating ? 
                                        'fill-amber-400 text-amber-400'
                                        :'text-gray-400'}`}/>
            ))
        }
    </div>
  )
}
