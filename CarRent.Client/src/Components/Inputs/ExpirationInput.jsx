import React from 'react'
import DefaultInput from './DefaultInput'

export default function ExpirationInput({ value, name, onChange, ...props }) {
    const handleChange = (e) => {
        const cleaned = e.target.value.replace(/[^\d]/g, '')
        let formatted = cleaned
        if (cleaned.length >= 2) {
          formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
        }
        
        // Create synthetic event
        const syntheticEvent = {
          target: {
            name: name,
            value: formatted
          }
        }
        
        onChange(syntheticEvent)
    }

  return (
    <DefaultInput
      type="text"
      maxLength={5}
      inputMode="numeric"
      placeholder="MM/YY"
      pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
      value={value}
      onChange={handleChange}
      {...props}
    />
  )
}