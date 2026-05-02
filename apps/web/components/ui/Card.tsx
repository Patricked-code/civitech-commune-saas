"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({
  children,
  className = "",
  elevated = false,
  interactive = false,
  onClick,
}: CardProps) {
  const baseClasses = `card ${elevated ? "card-elevated" : ""} ${interactive ? "card-interactive" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`;

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`card-header ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`card-body ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return <div className={`card-footer ${className}`}>{children}</div>;
}
