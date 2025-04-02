import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200 w-full"></div>
      
      {/* Content area */}
      <div className="p-5">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        
        {/* Car specs */}
        <div className="flex justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        
        {/* Features */}
        <div className="flex gap-2 my-4">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
        
        {/* Price and button */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <div className="h-5 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;