import React from 'react'

export default function AuthLayout({ formSection, heroSection }) {
  return (
    <div className="min-h-screen w-full py-6 px-6 md:px-14 mx-auto max-w-7xl
                    flex flex-col md:flex-row md:gap-12 lg:gap-20 bg-white">
      {/* Form Section */}
      <div className="w-full md:w-1/2 lg:w-2/5 order-2 md:order-1 flex flex-col justify-center gap-7">
        {formSection}
      </div>

      {/* Hero Section */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 order-1 md:order-2">
        {heroSection}
      </div>
    </div>
  )
}
