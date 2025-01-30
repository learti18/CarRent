import React from 'react'

export default function VehicleTableRow({ vehicle }) {
  const getStatusStyle = (status) => {
    const styles = {
      available: 'bg-green-100 text-green-700',
      rented: 'bg-blue-100 text-blue-700',
      maintenance: 'bg-yellow-100 text-yellow-700',
    }
    return styles[status?.toLowerCase()] || styles.available
  }

  return (
    <tr className='hover:bg-gray-50'>
      <td className='p-3'>
        <div className='flex items-center gap-3'>
          <img src={`/${vehicle.image}`} className='w-16 h-16 rounded-lg object-contain'/>
          <div>
            <p className='font-medium'>{vehicle.brand}</p>
          </div>
        </div>
      </td>
      <td className='p-4'>{vehicle.type}</td>
      <td className='p-4'>{vehicle.seatingCapacity} Persons</td>
      <td className='p-4'>{vehicle.transmission}</td>
      <td className='p-4'>${vehicle.pricePerDay}/<span className='text-sm text-gray-500'>day</span></td>
      <td className='p-4'>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle('available')}`}>
          Available
        </span>
      </td>
      <td className='p-4'>
        <button className='text-blue-600 hover:text-blue-800'>View Details</button>
      </td>
    </tr>
  )
}
