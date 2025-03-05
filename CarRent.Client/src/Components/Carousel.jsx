import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Carousel({ vehicle }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const images = vehicle.images

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    if (!images || images.length === 0) {
        return (
            <div className='md:w-1/2 h-[400px] w-full relative group bg-white rounded-xl flex items-center justify-center'>
                <img 
                    src="/placeholder-car.jpg" 
                    alt="Placeholder" 
                    className='w-full h-full object-contain rounded-xl'
                />
            </div>
        )
    }

    return (
        <div className='md:w-1/2 h-[400px] w-full relative group bg-white rounded-xl p-20'>
            <div
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
                className='w-full h-full rounded-xl bg-center bg-contain bg-no-repeat duration-500 flex items-center justify-center'
            >
                {/* Left Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronLeft onClick={prevSlide} size={30} />
                </div>
                {/* Right Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronRight onClick={nextSlide} size={30} />
                </div>
            </div>
            <div className='flex justify-center py-2'>
                {images.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`text-2xl cursor-pointer mx-1 w-3 h-3 rounded-full ${
                            currentIndex === slideIndex ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    >
                    </div>
                ))}
            </div>
        </div>
    )
}
