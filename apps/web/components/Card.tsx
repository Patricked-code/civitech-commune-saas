import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hoverable = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-white border border-slate-200 rounded-xl shadow-sm',
          hoverable && 'hover:shadow-md transition-shadow duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
