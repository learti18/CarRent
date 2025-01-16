import React from 'react'
import DefaultInput from './DefaultInput'

export default function CardNumberInput({ value, onChange,name, ...props }) {
    const handleChange = (e) => {
        const numericValue = e.target.value.replace(/[^\d]/g, '')
        const formattedValue = numericValue.replace(/(\d{4})/g, '$1 ').trim()

        const syntheticEvent = {
          target: {
            name: name,
            value: formattedValue
          }
        }

        onChange(syntheticEvent)
    }

  return (
    <DefaultInput
      type="text"
      maxLength={19}
      value={value}
      onChange={handleChange}
      {...props}
    />
  )
}