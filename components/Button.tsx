import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aura-dark disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-aura-dark text-white hover:bg-aura-light hover:shadow-lg hover:shadow-aura-dark/20",
    outline: "border border-aura-dark text-aura-dark hover:bg-aura-dark hover:text-white",
    ghost: "text-aura-dark hover:bg-aura-dark/5"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};