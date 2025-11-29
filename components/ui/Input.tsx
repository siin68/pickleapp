import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`input-tinder ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
}
