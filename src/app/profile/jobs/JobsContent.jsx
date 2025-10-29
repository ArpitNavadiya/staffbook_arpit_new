'use client';

import { useSearchParams } from "next/navigation";

export default function JobsContent({ children }) {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  
  return (
    <div>
      {/* Optional: Display filter info if needed */}
      {filter && <div>Filter: {filter}</div>}
      {children}
    </div>
  );
}
