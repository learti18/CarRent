import React from 'react'
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import SortDropdown from './SortDropdown'

export default function FilterSortBar({ toggleExpanded, onSort }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={toggleExpanded}
        className="lg:hidden flex items-center gap-2 px-5 py-2 bg-white rounded-lg hover:bg-gray-50"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span>Filters</span>
      </button>
      <SortDropdown onSort={onSort} />
    </div>
  )
}
