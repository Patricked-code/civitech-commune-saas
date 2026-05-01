import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
      ghost: 'text-primary-600 hover:bg-primary-50',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? '...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
