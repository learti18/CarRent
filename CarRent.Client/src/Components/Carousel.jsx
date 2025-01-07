import React from 'react'

const images = [
    '/nissangtr.svg','/nissangtr2.jpg','/interior.jpg','/crv.svg'
]

export default function Carousel({car}) {
  return (
    <div className='flex flex-col gap-2 md:w-1/2 h-full'>
        <div className='h-3/4 relative bg-blue-600 p-7 rounded-xl text-white'>
            <h2 className='text-2xl font-bold'>Sports car with the best design and acceleration</h2>
            <p>Safety and comfort while driving a 
            futuristic and elegant sports car</p>
            <img 
              src='/tracks.svg' 
              className='absolute inset-0 w-full h-full object-cover'
              alt="background"
            />
            <img 
              src={`/nissangtr.svg`} 
              alt={car.brand}  
              className='relative w-full h-full object-contain pt-6'
            />
      </div>
        <div className='grid grid-cols-3 gap-2 h-1/4'>
            {
                images.slice(0,3).map(image => (
                    <div className='rounded-lg aspect-video bg-blue-600'>
                        <img src={image} alt='' className='w-full h-full object-cover rounded-lg'/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
