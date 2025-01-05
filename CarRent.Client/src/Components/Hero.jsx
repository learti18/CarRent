import React from 'react'

export default function () {
  return (
    <div className='h-screen'>
        <div className='flex justify-between items-center mx-auto'>
            <div className='w-2/5 px-10 flex flex-col justify-center h-screen'>
                <h1 className='text-black max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl'>
                  Find, book and rent a car 
                  <span className='text-blue-500 border-b-4 border-black'> Easily</span>
                </h1>
                <p className='max-w-2xl mb-6 font-light text-black lg:mb-8 md:text-lg lg:text-xl'>Get a car wherever and whenever you need it with your IOS and Android device.</p>
            </div>
            <div className='w-3/5'>
              <img src="car.svg" alt="" className='w-full'/>
            </div>
        </div>
    </div> 
  )
}
