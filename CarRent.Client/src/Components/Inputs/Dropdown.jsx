import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { ChevronDown } from "lucide-react";

export default function DropDown({ 
  label, 
  options, 
  placeholder, 
  register, 
  name, 
  error, 
  className = "",
  defaultValue,
  variant = "default"
}) {
  const [selectedOption, setSelectedOption] = useState(() => {
    if (defaultValue) {
      return { value: defaultValue, label: defaultValue };
    }
    return null;
  });
  const { onChange, value } = register(name);
  const dropdownRef = useRef(null);
  
  const selectOptions = options.map(option => ({
    value: option,
    label: option
  }));

  useEffect(() => {
    if (value) {
      setSelectedOption({ value, label: value });
    } else if (defaultValue && !value) {
      // If there's a defaultValue but no value yet, set it
      setSelectedOption({ value: defaultValue, label: defaultValue });
      // Also update the form value
      onChange({ target: { value: defaultValue, name } });
    }
  }, [value, defaultValue, onChange, name]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onChange({ target: { value: selected?.value || '', name } });
  };

  const DropdownIndicator = props => {
    return (
      <div {...props.innerProps} className="dropdown-indicator">
        <ChevronDown
          className={`dropdown-chevron ${error ? 'text-red-500' : variant === 'clean' ? 'text-slate-400' : 'text-slate-500'} ${
            props.selectProps.menuIsOpen ? "rotate-180" : ""
          }`}
        />
      </div>
    );
  };

  const getCustomStyles = () => {
    if (variant === 'clean') {
      return {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: '#fff',
          border: 'none',
          boxShadow: state.isFocused ? '0 0 0 2px rgb(107 114 128)' : 'none',
          borderRadius: '0.5rem',
          padding: '0.125rem 0.125rem',
          minHeight: '38px',
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
          color: '#9ca3af',
          fontSize: '0.875rem'
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#000000',
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
    
    return {};
  };

  return (
    <div className="custom-select-container relative" ref={dropdownRef} style={{ position: 'relative', zIndex: 50 }}>
      {label && (
        <label className="block font-medium text-black mb-3">{label}</label>
      )}
      <div className={`relative ${error ? 'has-error' : ''}`}>
        {variant === 'clean' ? (
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={selectOptions}
            placeholder={placeholder || "Select an option"}
            components={{ 
              DropdownIndicator,
              IndicatorSeparator: () => null 
            }}
            styles={getCustomStyles()}
            className={className}
            classNamePrefix="clean-select"
            menuPlacement="auto"
            isSearchable={false}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            menuShouldBlockScroll={true}
            menuShouldScrollIntoView={false}
            blurInputOnSelect={true}
            closeMenuOnSelect={true}
          />
        ) : (
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={selectOptions}
            placeholder={placeholder || "Select an option"}
            components={{ 
              DropdownIndicator,
              IndicatorSeparator: () => null 
            }}
            className={`${className || ''}`}
            classNamePrefix="react-select"
            menuPlacement="auto"
            isSearchable={false}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            menuShouldBlockScroll={true}
            menuShouldScrollIntoView={false}
            blurInputOnSelect={true}
            closeMenuOnSelect={true}
          />
        )}
      </div>
      {error && (
        <span className="select-error-message">{error.message}</span>
      )}
    </div>
  );
}