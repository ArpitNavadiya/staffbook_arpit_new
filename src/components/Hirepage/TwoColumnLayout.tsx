import React from "react";

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

// src/components/Hirepage/TwoColumnLayout.tsx
export default function TwoColumnLayout({ left, right }: TwoColumnLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-[#F7F7F8] flex justify-center items-start px-4">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-[1413px] items-start">
        <aside className="w-[273px] flex-shrink-0 bg-white md:rounded-r-2xl shadow md:h-[calc(100vh-70px)]">
          {left}
        </aside>
        <main className="flex-grow w-full max-w-full md:max-w-[calc(100%-273px-1rem)] px-2 sm:px-4 md:px-0">
          {right}
        </main>
      </div>
    </div>
  );
}