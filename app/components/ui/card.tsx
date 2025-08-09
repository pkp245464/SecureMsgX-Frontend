// app/components/ui/card.tsx

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title: string;
}

export const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      {children}
    </div>
  );
};