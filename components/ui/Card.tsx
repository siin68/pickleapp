import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`card-tinder p-6 ${onClick ? 'cursor-pointer hover:scale-[1.02] transform' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
