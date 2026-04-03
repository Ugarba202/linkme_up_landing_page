import React from "react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
}

export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative rounded-[44px] border-[6px] border-[#2a2a3e] bg-[#1a1a2e] shadow-2xl overflow-hidden",
        "w-[280px] h-[580px] flex-shrink-0",
        className
      )}
    >
      {/* Dynamic Island */}
      <div className="absolute top-0 inset-x-0 flex justify-center z-50">
        <div className="w-[100px] h-[28px] bg-[#1a1a2e] rounded-b-2xl flex items-center justify-center">
          <div className="w-[60px] h-[14px] bg-[#0a0a12] rounded-full" />
        </div>
      </div>

      {/* Screen */}
      <div className="relative w-full h-full overflow-hidden bg-[#0a0a12] rounded-[38px]">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/15 rounded-full z-50" />
    </div>
  );
}
