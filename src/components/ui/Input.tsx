import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-semibold text-cream mb-3">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-card bg-space border-2 border-orange text-cream placeholder-muted focus:outline-none focus:border-white transition-colors ${className || ""}`}
          {...props}
        />
        {error && <p className="text-orange text-sm mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
