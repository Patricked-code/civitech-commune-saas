"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  badge?: string;
  backgroundGradient?: string;
}

export function PageHeader({
  title,
  subtitle,
  description,
  actions,
  badge,
  backgroundGradient = "from-primary-600 to-primary-700",
}: PageHeaderProps) {
  return (
    <div className={`bg-gradient-to-r ${backgroundGradient} text-white py-12 md:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            {badge && (
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-3 animate-fade-in">
                {badge}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 animate-slide-up">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-white/90 mb-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-white/80 max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex gap-3 flex-wrap animate-slide-up" style={{ animationDelay: "0.3s" }}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
