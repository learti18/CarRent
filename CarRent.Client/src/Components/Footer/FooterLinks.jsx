import React from 'react'

export default function FooterLinks({title,links}) {
  return (
    <div className=''>
        <h2 className='text-lg md:text-xl mb-6'>{title}</h2>
        <ul className='text-gray-400 space-y-4 text-md'>
            {
                links.map(link => (
                    <li key={link}>{link}</li>
                ))
            }
        </ul>
    </div>
  )
}
