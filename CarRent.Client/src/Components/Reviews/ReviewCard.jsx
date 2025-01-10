import React from 'react'
import RatingStars from '../RatingStars'

export default function ReviewCard({avatar,userName,userTitle,description,rating,createdAt}) {
  return (
    <div className='flex flex-row gap-x-5'>
        <img src="/interior.jpg" alt="" className='flex-shrink-0 w-16 h-16 object-cover rounded-full'/>
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-xl font-bold'>{userName}</h1>
                <span className='text-slate-400'>{createdAt}</span>
            </div>
            <div className='flex flex-row justify-between'>
                <span className='text-slate-400'>{userTitle}</span>
                <RatingStars rating={rating}/> 
            </div>  
            <p className='leading-7 tracking-wide line-clamp-2 overflow-hidden text-ellipsis text-slate-500'>{description}</p>
        </div>
    </div>
  )
}
