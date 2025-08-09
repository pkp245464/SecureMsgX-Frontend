// app/components/ui/Section.tsx

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  title, 
  description 
}) => {
  return (
    <section className="py-8">
      {(title || description) && (
        <div className="mb-8">
          {title && <h2 className="text-2xl font-bold text-dark-900">{title}</h2>}
          {description && <p className="text-gray-600 mt-2">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
};