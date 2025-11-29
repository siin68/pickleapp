import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm',
    secondary: 'bg-gray-100 text-gray-700',
    success: 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-sm',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm',
    danger: 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-sm',
  };

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
