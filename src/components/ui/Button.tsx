import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  as?: React.ElementType;
  [key: string]: any;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, className, as: Component, ...props }, ref) => {
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: "#FF6F3F",
        color: "white",
      },
      secondary: {
        backgroundColor: "#1A2E33",
        color: "white",
      },
      ghost: {
        border: "2px solid #FF6F3F",
        color: "#FF6F3F",
        backgroundColor: "transparent",
      },
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
      md: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
      lg: { padding: "1rem 2rem", fontSize: "1.125rem" },
    };

    const baseStyle: React.CSSProperties = {
      borderRadius: "9999px",
      fontWeight: 600,
      transition: "all 0.3s",
      cursor: "pointer",
      border: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: isLoading || props.disabled ? 0.5 : 1,
      ...variantStyles[variant],
      ...sizeStyles[size],
    };

    if (Component) {
      return (
        <Component ref={ref} style={baseStyle} className={className} {...props}>
          {isLoading ? "..." : props.children}
        </Component>
      );
    }

    return (
      <button
        ref={ref}
        style={baseStyle}
        className={className}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? "..." : props.children}
      </button>
    );
  },
);

Button.displayName = "Button";
