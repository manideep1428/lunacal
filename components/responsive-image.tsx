'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ResponsiveImage({ src, alt, className = '' }: ResponsiveImageProps) {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setDimensions({
        width: img.width,
        height: img.height,
      });
    };
    img.src = src;
  }, [src]);

  return (
    <div className={`relative ${className}`} style={{ paddingTop: `${(dimensions.height / dimensions.width) * 100}%` }}>
      <Image
        src={src}
        alt={alt}
        layout='fill'
        objectFit="cover"
        className="rounded-2xl img-hover"
      />
    </div>
  );
}