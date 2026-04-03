"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedMeshBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedMeshBackground({ className, children }: AnimatedMeshBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden w-full h-full min-h-screen bg-background", className)}>
      {/* Base animated mesh logic */}
      <div className="absolute inset-0 z-0 bg-mesh opacity-50 block mix-blend-normal"></div>
      
      {/* Decorative blobs */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply animate-float"></div>
      <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-primary-light/20 blur-[120px] rounded-full mix-blend-multiply animate-float-delayed"></div>
      <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] bg-accent/10 blur-[150px] rounded-full mix-blend-multiply animate-float"></div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-40"></div>

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
