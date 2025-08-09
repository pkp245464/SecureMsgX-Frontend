// app/components/ui/Container.tsx

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};