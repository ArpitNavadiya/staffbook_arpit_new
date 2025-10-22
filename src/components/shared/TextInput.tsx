'use client';
import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  className?: string;
  inputClassName?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  helperText,
  className = '',
  inputClassName = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block  text-base text-gray-500 mb-1">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-5 py-4 text-gray-500 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-base font-medium placeholder:text-gray-300 text-gray-800${inputClassName}`}
      />
      {helperText && <p className="text-xs text-gray-600 mt-1">{helperText}</p>}
    </div>
  );
};

export default TextInput; 