import React from 'react'

export default function RentalTableRow({rental}) {
    const getStatusStyle = (status) => {
        const styles = {
          active: 'bg-green-100 text-green-700',
          pending: 'bg-yellow-100 text-yellow-700',
          completed: 'bg-gray-100 text-gray-700',
        }
        return styles[status.toLowerCase()] || styles.pending
    }


  return (
    <tr className='hover:bg-gray-50'>
        <td className='p-3'>
            <div className='flex items-center gap-3'>
              <img src={rental.car.image} className='w-16 h-16 rounded-lg object-contain'/>
              <div>
                <p className='font-medium'>{rental.brand}</p>
                {/* <p className='text-sm text-gray-500'>NISMO</p> */}
              </div>
            </div>
        </td>
        <td className='p-4'>{rental.customer}</td>
        <td className='p-4'>
          <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(rental.status)}`}>
            {rental.status}
          </span>
        </td>
        <td className='p-4'>{rental.startDate}</td>
        <td className='p-4'>{rental.endDate}</td>
        <td className='p-4'>${rental.totalPrice}</td>
        <td className='p-4'>
          <button className='text-blue-600 hover:text-blue-800'>View Details</button>
        </td>
    </tr>
  )
}
