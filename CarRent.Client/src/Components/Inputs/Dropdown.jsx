import React, { useRef } from "react";
import Select from "react-select";
import { ChevronDown } from "lucide-react";
import { Controller } from "react-hook-form";

export default function DropDown({ 
  label, 
  options, 
  placeholder, 
  control,
  name, 
  error, 
  className = "",
  defaultValue,
  variant = "default",
  disabled = false
}) {
  const selectOptions = options.map(option => ({
    value: option,
    label: option
  }));
  const dropdownRef = useRef(null);

  const DropdownIndicator = props => {
    return (
      <div {...props.innerProps} className="dropdown-indicator">
        <ChevronDown
          className={`dropdown-chevron ${error ? 'text-red-500' : variant === 'clean' ? 'text-slate-400' : 'text-slate-500'} ${
            props.selectProps.menuIsOpen ? "rotate-180" : ""
          } ${disabled ? 'opacity-50' : ''}`}
        />
      </div>
    );
  };

  const getCustomStyles = () => {
    if (variant === 'clean') {
      return {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: disabled ? '#e5e7eb' : '#fff', // Using neutral-200 equivalent
          border: 'none',
          boxShadow: state.isFocused && !disabled ? '0 0 0 2px rgb(107 114 128)' : 'none',
          borderRadius: '0.5rem',
          padding: '0.125rem 0.125rem',
          minHeight: '38px',
          opacity: disabled ? 0.8 : 1,
          cursor: disabled ? 'not-allowed' : 'default',
          '&:hover': {
            borderColor: 'none'
          }
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '0.125rem 0.75rem'
        }),
        placeholder: (provided) => ({
          ...provided,
          color: disabled ? '#9ca3af' : '#9ca3af',
          fontSize: '0.875rem'
        }),
        singleValue: (provided) => ({
          ...provided,
          color: disabled ? '#6b7280' : '#000000',
          fontSize: '0.875rem'
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '0.5rem',
          minWidth: '100%',
          width: 'auto',
          maxWidth: '300px',
          overflow: 'visible'
        }),
        menuList: (provided) => ({
          ...provided,
          padding: '0.25rem 0',
          maxHeight: '15rem',
          minWidth: '100%',
          overflowX: 'visible',
          overflowY: 'auto',
          width: 'auto'
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected 
            ? '#dbeafe' 
            : state.isFocused 
              ? 'rgba(219, 234, 254, 0.5)' 
              : null,
          color: '#000000',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          '&:hover': {
            backgroundColor: 'rgba(219, 234, 254, 0.5)'
          }
        }),
        indicatorSeparator: () => ({
          display: 'none'
        })
      };
    }
    
    // Default styles with disabled overrides
    return {
      control: (provided, state) => ({
        ...provided,
        backgroundColor: disabled ? '#e5e7eb' : '#fff', // Using neutral-200 equivalent
        borderColor: disabled ? '#e5e7eb' : state.isFocused ? '#60a5fa' : '#e5e7eb',
        boxShadow: state.isFocused && !disabled ? '0 0 0 1px #60a5fa' : 'none',
        opacity: disabled ? 0.8 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
        '&:hover': {
          borderColor: disabled ? '#e5e7eb' : '#60a5fa',
        }
      }),
      singleValue: (provided) => ({
        ...provided,
        color: disabled ? '#6b7280' : '#000000',
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#9ca3af',
      }),
      indicatorSeparator: () => ({
        display: 'none'
      })
    };
  };

  return (
    <div className="custom-select-container relative" style={{ position: 'relative', zIndex: 50 }}>
      {label && (
        <label className={`block font-medium mb-3 ${disabled ? 'text-gray-500' : 'text-black'}`}>{label}</label>
      )}
      <div className={`relative ${error ? 'has-error' : ''}`}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            variant === 'clean' ? (
              <Select
                {...field}
                value={field.value ? { value: field.value, label: field.value } : null}
                onChange={(option) => field.onChange(option ? option.value : '')}
                options={selectOptions}
                placeholder={placeholder || "Select an option"}
                components={{ 
                  DropdownIndicator,
                  IndicatorSeparator: () => null 
                }}
                styles={getCustomStyles()}
                className={`${className} ${disabled ? 'disabled-select' : ''}`}
                classNamePrefix="clean-select"
                menuPlacement="auto"
                isSearchable={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                menuShouldBlockScroll={true}
                menuShouldScrollIntoView={false}
                blurInputOnSelect={true}
                closeMenuOnSelect={true}
                isDisabled={disabled}
              />
            ) : (
              <Select
                {...field}
                value={field.value ? { value: field.value, label: field.value } : null}
                onChange={(option) => field.onChange(option ? option.value : '')}
                options={selectOptions}
                placeholder={placeholder || "Select an option"}
                components={{ 
                  DropdownIndicator,
                  IndicatorSeparator: () => null 
                }}
                styles={getCustomStyles()}
                className={`${className || ''} ${disabled ? 'disabled-select' : ''}`}
                classNamePrefix="react-select"
                menuPlacement="auto"
                isSearchable={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                menuShouldBlockScroll={true}
                menuShouldScrollIntoView={false}
                blurInputOnSelect={true}
                closeMenuOnSelect={true}
                isDisabled={disabled}
              />
            )
          )}
        />
      </div>
      {error && (
        <span className="select-error-message">{error.message}</span>
      )}
    </div>
  );
}