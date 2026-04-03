import React from "react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function PhoneMockup({ children, className, theme = "light" }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative rounded-[40px] border-[8px] border-slate-900 bg-black shadow-xl overflow-hidden ring-4 ring-slate-800/10",
        "w-[300px] h-[600px] flex-shrink-0",
        className
      )}
    >
      {/* Dynamic Island / Notch */}
      <div className="absolute top-0 inset-x-0 mx-auto w-[120px] h-[30px] bg-black rounded-b-3xl z-50 flex items-center justify-center">
        <div className="w-[80%] h-1/2 bg-slate-900 rounded-full opacity-50" />
      </div>

      {/* Screen Frame */}
      <div
        className={cn(
          "relative w-full h-full overflow-hidden bg-background outline-none font-sans",
          theme === "dark" && "dark"
        )}
      >
        {children}
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full z-50" />
    </div>
  );
}
