import React, { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'

export default function ImageUpload({ 
  register,
  name,
  control,
  error,
  className,
  multiple = false
}) {
  // Keep track of preview URLs separately from form data
  const [previews, setPreviews] = useState([]);
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
    rules: { required: 'At least one image is required' }
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    
    // Update both previews and form data
    files.forEach(file => {
      const previewUrl = URL.createObjectURL(file)
      setPreviews(prev => [...prev, previewUrl])
      append(file.name) // Store just the filename
    })

    // Clear input value to allow selecting the same file again
    e.target.value = ''
  }

  const handleRemove = (index) => {
    remove(index)
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={`bg-white rounded-lg p-8 ${className}`}>
      <div className={error ? 'border-2 border-red-500 rounded-lg p-4' : ''}>
        {fields.length === 0 ? (
          <label className='flex flex-col items-center gap-4 cursor-pointer'>
            <Upload size={48} className={error ? 'text-red-500' : 'text-gray-400'} />
            <p className={`font-medium ${error ? 'text-red-500' : 'text-gray-600'}`}>
              Click to upload images
            </p>
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
              {fields.map((field, index) => (
                <div key={field.id} className='relative group'>
                  <img
                    src={previews[index]}
                    alt={`preview ${index}`}
                    className='w-full h-40 object-cover rounded-lg'
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className='absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100'
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
      {error && (
        <p className="text-red-500 text-sm mt-2">{error.message}</p>
      )}
    </div>
  )
}