import React from 'react';
import clsx from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variantStyles = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      default: 'bg-slate-100 text-slate-800',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-block px-3 py-1 rounded-full text-sm font-medium',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
