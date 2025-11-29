import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Avatar({ src, alt, size = 'md' }: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  if (!src) {
    return (
      <div className={`${sizeStyles[size]} rounded-full bg-gray-300 flex items-center justify-center`}>
        <span className="text-gray-600 font-bold">
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className={`${sizeStyles[size]} rounded-full overflow-hidden relative`}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
