import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Carousel({vehicle}) {
    // Add fallback for when vehicle or vehicle.images is undefined
    const images = vehicle?.images || [];
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    
    // Safely check if the image is an SVG
    const isSvg = (imagePath) => {
        if (!imagePath || typeof imagePath !== 'string') return false;
        return imagePath.endsWith('.svg');
    }
    
    const getImageClassName = (imagePath) => {
        return `w-full h-full ${
            isSvg(imagePath) 
            ? 'bg-blue-600 p-20 rounded-xl' 
            : 'object-cover'
        }`
    }
    
    const getVisibleThumbnails = () => {
        // Guard against empty images array
        if (!images || images.length === 0) return [];
        
        if(activeImageIndex === images.length - 1){
            return images.slice(-3);
        }
        if(activeImageIndex === 0){
            return images.slice(0, 3);
        }
        return images.slice(activeImageIndex - 1, activeImageIndex + 2);
    }

    function nextImage(){
        // Guard against empty images array
        if (!images || images.length === 0) return;
        
        setActiveImageIndex(prevIndex => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }
    
    function prevImage(){
        // Guard against empty images array
        if (!images || images.length === 0) return;
        
        setActiveImageIndex(prevIndex => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    // Guard against missing vehicle data
    if (!vehicle || !images || images.length === 0) {
        return (
            <div className="flex flex-col gap-6 md:w-1/2 h-full items-center justify-center bg-gray-100 rounded-xl p-8">
                <p className="text-gray-500">No images available</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-6 md:w-1/2 h-full'>
            <div className='overflow-hidden aspect-[16/12] relative rounded-xl text-white'>
                <ChevronLeft 
                    className='absolute left-3 top-0 bottom-0 my-auto p-1 select-none 
                        text-white bg-white bg-opacity-30 rounded-full size-8 lg:size-10 cursor-pointer z-50
                        hover:bg-white hover:text-blue-500 hover:shadow-md transition-all duration-200'
                    onClick={prevImage}    
                />
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className='relative h-full w-full flex items-center justify-center'
                    >
                        <img 
                            src={images[activeImageIndex]} 
                            alt="car view"
                            className={getImageClassName(images[activeImageIndex])}
                        />
                    </motion.div>
                </AnimatePresence>
                <ChevronRight 
                    className='absolute right-3 top-0 bottom-0 my-auto p-1 select-none
                        text-white bg-white bg-opacity-30 rounded-full size-8 lg:size-10 cursor-pointer z-50
                        hover:bg-white hover:text-blue-500 hover:shadow-md transition-all duration-200'
                    onClick={nextImage}    
                />
            </div>
            <div className='grid grid-cols-3 gap-7'>
                {getVisibleThumbnails().map((image, index) => (
                    <motion.div
                        key={index} // Use index as fallback key if image is undefined
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveImageIndex(images.indexOf(image))}
                        className={`aspect-[4/3] rounded-xl bg-gray-200 cursor-pointer overflow-hidden
                            ${images.indexOf(image) === activeImageIndex ? 'outline outline-gray-400 outline-offset-4' : ''}`}
                    >
                        {image && (
                            <img 
                                src={image}
                                alt={`Thumbnail ${index}`}
                                className={getImageClassName(image)}
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}