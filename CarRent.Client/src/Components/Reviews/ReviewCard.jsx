import React from 'react'
import RatingStars from '../RatingStars'

export default function ReviewCard({userName,description,rating,createdAt}) {
  return (
    <div className='flex flex-row gap-x-5'>
        <div className='flex-shrink-0 w-16 h-16 rounded-full overflow-hidden'>
            <img 
                src="/user.jpg" 
                alt="user image" 
                className='w-full h-full object-cover object-center'
                loading='lazy'
                style={{ imageRendering: 'auto' }}
                />
        </div>
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-xl font-semibold'>{userName}</h1>
                
            </div>
            <div className='flex flex-row justify-between'>
                <span className='text-slate-400'>{new Date(createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                <RatingStars rating={rating}/> 
            </div>  
            <p className='leading-7 tracking-wide line-clamp-2 overflow-hidden text-ellipsis text-slate-500'>{description}</p>
        </div>
    </div>
  )
}
