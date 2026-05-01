"use client";

import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
  errors?: Record<string, string[]>;
}

export function FormError({ message, errors }: FormErrorProps) {
  if (!message && (!errors || Object.keys(errors).length === 0)) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0 w-5 h-5 mt-0.5" />
        <div className="flex-1">
          {message && <p className="text-red-800 font-medium text-sm mb-2">{message}</p>}
          {errors && Object.keys(errors).length > 0 && (
            <ul className="space-y-1">
              {Object.entries(errors).map(([field, fieldErrors]) => (
                <li key={field} className="text-red-700 text-sm">
                  <strong>{field}:</strong> {fieldErrors.join(", ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
