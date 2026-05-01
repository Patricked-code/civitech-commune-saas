"use client";

export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 bg-slate-200 rounded animate-pulse"></div>
      ))}
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
      <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
      <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
      <div className="h-10 bg-slate-200 rounded animate-pulse w-1/3"></div>
    </div>
  );
}
