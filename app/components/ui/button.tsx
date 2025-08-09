// components/ui/button.tsx

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = ""
}) => {
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center";
  
  const variantClasses = variant === "primary" 
    ? "bg-primary-600 hover:bg-primary-700 text-white shadow-button" 
    : "bg-white border border-gray-300 hover:border-primary-300 text-gray-700 hover:text-primary-600";
  
  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "transform hover:-translate-y-0.5";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};