import React from 'react'

interface SparkleProps {
  size?: number
  className?: string
}

export const Sparkle: React.FC<SparkleProps> = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={`text-star ${className}`}
    >
      <path d="M12 2 L15 10 L23 12 L15 14 L12 22 L9 14 L1 12 L9 10 Z" fill="currentColor" />
    </svg>
  )
}
