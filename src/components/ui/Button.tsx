import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          relative
          bg-slate-400
          border
          border-slate-500
          rounded
          cursor-pointer
          shadow-[0_4px_0_#314158]
          transition-all
          duration-100
          active:shadow-[0_2px_0_#314158]
          active:translate-y-0.5
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;