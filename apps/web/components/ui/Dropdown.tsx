"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  divider?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  onSelect: (value: string) => void;
  trigger: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({
  items,
  onSelect,
  trigger,
  align = "left",
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2"
      >
        {trigger}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50 animate-slide-down ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? (
                <div className="h-px bg-slate-200 my-1" />
              ) : (
                <button
                  onClick={() => handleSelect(item.value)}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm"
                >
                  {item.icon && <span className="text-slate-500">{item.icon}</span>}
                  {item.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
