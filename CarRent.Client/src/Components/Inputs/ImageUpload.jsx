import React, { useState } from 'react'
import { Upload, X } from 'lucide-react'

export default function ImageUpload({ 
  multiple = false,
  value = [],
  onChange,
  className
}) {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file
    }))
    onChange(multiple ? [...value, ...newImages] : [newImages[0]])
  }

  const removeImage = (index) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className={`bg-white rounded-lg p-8 ${className}`}>
      {value.length === 0 ? (
        <label className='flex flex-col items-center gap-4 cursor-pointer'>
          <Upload size={48} className='text-gray-400' />
          <p className='text-gray-600 font-medium'>Click to upload images</p>
          <input
            type='file'
            multiple={multiple}
            accept='image/*'
            className='hidden'
            onChange={handleImageChange}
          />
        </label>
      ) : (
        <div className='space-y-4'>
          <div className='grid grid-cols-3 gap-4'>
            {value.map((image, index) => (
              <div key={index} className='relative group'>
                <img
                  src={image.url}
                  alt={`preview ${index}`}
                  className='w-full h-40 object-cover rounded-lg'
                />
                <button
                  onClick={() => removeImage(index)}
                  className='absolute top-2 right-2 p-1 bg-white rounded-full shadow-md'
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {multiple && (
              <label className='border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors'>
                <Upload size={24} className='text-gray-400' />
                <span className='text-sm text-gray-500'>Add More</span>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>
      )}
    </div>
  )
}