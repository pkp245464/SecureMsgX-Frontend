//app/components/ui/LoadingSpinner.tsx

import React from 'react';

export const LoadingSpinner = ({ size = 8 }: { size?: number }) => {
  return (
    <div className="flex justify-center">
      <div 
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-blue-500`}
      ></div>
    </div>
  );
};