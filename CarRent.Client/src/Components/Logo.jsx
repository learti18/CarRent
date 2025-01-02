import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link className='lg:text-3xl text-2xl font-bold text-blue-500' to="/">
        Rent<span className='text-blue-500'>Car</span>
    </Link>
  )
}
