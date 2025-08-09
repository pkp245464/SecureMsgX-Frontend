// components/ui/button.tsx

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all";
  
  const variantClasses = variant === "primary" 
    ? "bg-blue-600 hover:bg-blue-700 text-white" 
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
    >
      {children}
    </button>
  );
};