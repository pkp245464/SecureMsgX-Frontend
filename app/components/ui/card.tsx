// app/components/ui/card.tsx

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  title,
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-card p-8 border border-gray-100 ${className}`}>
      <h2 className="text-2xl font-bold text-dark-900 mb-6 pb-4 border-b border-gray-100">
        {title}
      </h2>
      {children}
    </div>
  );
};