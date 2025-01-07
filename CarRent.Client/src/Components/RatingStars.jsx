import { Star } from 'lucide-react'
import React from 'react'

export default function RatingStars({filledStars}) {

  return (
    <div className='flex gap-[3px]'>
        {
            [...Array(5)].map((_,index) => (
                <Star size={18}  className={index < filledStars ? 
                                        'fill-amber-400 text-amber-400'
                                        :'text-gray-400'}/>
            ))
        }
    </div>
  )
}
