import React from 'react'

export default function Table({ columns, data, renderRow }) {
  return (
    <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
      <table className='w-full'>
        <thead className='bg-gray-50 border-b'>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className='text-left p-4'>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y'>
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  )
}
