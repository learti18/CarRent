import React from 'react';

export const LoaderBarsSpinner = ({
  fullscreen = false,
  size = 'md',
  className = ''
}) => {
  // Size mappings
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  // Base spinner classes
  const spinnerClasses = `
    inline-block ${sizeClasses[size] || sizeClasses.md} 
    animate-spin rounded-full border-4 border-solid 
    border-current border-r-transparent 
    align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]
    ${className}
  `;

  // If fullscreen, wrap in a fixed positioned container
  if (fullscreen) {
    return (
      <div 
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-50 flex flex-col items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        <div className={spinnerClasses} role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <h2 className="text-center text-slate-700 mt-4">Loading...</h2>
      </div>
    );
  }

  // For inline usage
  return (
    <div className="flex justify-center items-center">
      <div className={spinnerClasses} role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};