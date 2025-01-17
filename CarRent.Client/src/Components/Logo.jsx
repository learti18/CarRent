import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo({className}) {
  return (
    <Link className={`lg:text-3xl text-2xl font-bold text-blue-500 ${className}`} to="/">
        Rent<span className='text-black'>Car</span>
    </Link>
  )
}
