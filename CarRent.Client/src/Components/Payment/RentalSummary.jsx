import React from 'react'
import RatingStars from './../RatingStars';

export default function RentalSummary({car}) {
    
  return (
    <div className='h-fit bg-white rounded-lg'>
        <div className='flex flex-col gap-5 py-8 px-5'>
            <div>
                <h1 className='text-lg font-bold'>Rental Summary</h1>
                <p className='text-sm text-slate-400'>Prices may change depending on the length of the rental and the price of your rental car.</p>
            </div>
            <div className='flex flex-row items-center gap-5'>
                <div className='relative w-44 px-4 py-10 bg-blue-600 rounded-md'>
                    <img 
                        src="/tracks.svg" 
                        alt="" 
                        className='absolute inset-0  z-0'/>
                    <img 
                        src={`/${car.image}`} 
                        alt={car.name+car.image} 
                        className='relative z-10'/>
                </div>
                <div className='space-y-4'>
                    <h1 className='text-3xl font-bold'>NissanGT-R</h1>
                    <div className='flex flex-row gap-2'>
                        <RatingStars rating={car.rating}/>
                        <p className='text-sm text-slate-500'>440+ Reviewer</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='border-t-2 border-gray-100 mx-5'></div>
        <div className='flex flex-col gap-5 py-8 px-5'>
            <div className='flex flex-row justify-between'>
                <p className='text-slate-400'>Subtotal</p>
                <p className='font-bold'>${car.pricePerDay}</p>
            </div>
            <div className='flex flex-row justify-between'>
                <p className='text-slate-400'>Tax</p>
                <p className='font-bold'>${0}</p>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold'>Total Rental Price</h1>
                    <p className='text-slate-400'>Overall price and includes rental discount</p>
                </div>
                <h1 className='text-4xl font-bold'>${car.pricePerDay}.00</h1>
            </div>
        </div>
    </div>
  )
}
