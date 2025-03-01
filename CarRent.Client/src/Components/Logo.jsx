import React from 'react'
import { Link } from 'react-router-dom'
import { Car } from 'lucide-react'

export default function Logo({ className, variant = "default" }) {
  const styles = {
    default: " text-blue-500",
    light: "text-white",
    gradient: "bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent"
  }

  return (
    <Link 
      to="/" 
      className={`group flex items-center gap-2 transition-all duration-300 ${className}`}
    >
      <span className={`text-blue-500  text-xl md:text-2xl font-bold tracking-tight ${styles[variant]}`}>
        Elite
        <span className={`text-blue-500 inline-block transition-transform group-hover:scale-110 ${styles[variant]}`}>
          Drive
        </span>
      </span>
    </Link>
  )
}
