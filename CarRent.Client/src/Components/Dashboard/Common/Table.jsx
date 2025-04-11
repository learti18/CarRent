import React from 'react'
import { LoaderBarsSpinner } from '../../../Components/LoaderBarsSpinner'

export default function Table({ 
  columns, 
  children, 
  isLoading = false, 
  emptyMessage = "No data available"
}) {
  return (
    <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50 border-b'>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className='text-left p-4 whitespace-nowrap'
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y'>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="flex justify-center">
                    <LoaderBarsSpinner />
                  </div>
                </td>
              </tr>
            ) : React.Children.count(children) > 0 ? (
              children
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
