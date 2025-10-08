import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export function Button({ variant = 'default', className = '', ...props }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900",
    ghost: "hover:bg-gray-100 text-gray-900"
  };
  
  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;
  
  return <button className={combinedClasses} {...props} />;
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    const baseClasses = "w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";
    const borderClass = className.includes('border-red-500') ? 'border-red-500' : 'border-gray-300';
    const inputClasses = `${baseClasses} ${borderClass} ${className.replace('border-red-500', '')}`;
    return <input ref={ref} className={inputClasses} {...props} />;
  }
);

Input.displayName = "Input";

export function Label({ className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const labelClasses = `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`;
  return <label className={labelClasses} {...props} />;
}

export function Card({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const cardClasses = `rounded-lg border bg-white text-gray-900 shadow-sm ${className}`;
  return <div className={cardClasses} {...props}>{children}</div>;
}