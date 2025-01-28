import React from 'react'
import { Link } from 'react-router-dom'
import { Car } from 'lucide-react'

export default function Logo({ className, variant = "default" }) {
  const styles = {
    default: "bg-white text-gray-900",
    light: "text-white",
    gradient: "bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent"
  }

  return (
    <Link 
      to="/" 
      className={`group flex items-center gap-2 transition-all duration-300 ${className}`}
    >
      <div className="relative">
        <Car 
          size={24} 
          className={`transform transition-transform group-hover:scale-110 group-hover:-rotate-12 
          ${variant === 'light' ? 'text-white' : 'text-blue-500'}`}
        />
      </div>
      <span className={`text-2xl font-bold tracking-tight ${styles[variant]}`}>
        Car
        <span className="text-blue-500 inline-block transition-transform group-hover:scale-110">
          Rent
        </span>
      </span>
    </Link>
  )
}
