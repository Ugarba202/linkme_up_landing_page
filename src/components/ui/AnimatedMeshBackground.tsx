"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedMeshBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedMeshBackground({ className, children }: AnimatedMeshBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden w-full bg-background", className)}>
      {/* Animated gradient blobs */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/15 blur-[120px] rounded-full animate-float pointer-events-none" />
      <div className="absolute top-[30%] -right-[15%] w-[40%] h-[40%] bg-primary-light/10 blur-[130px] rounded-full animate-float-delayed pointer-events-none" />
      <div className="absolute -bottom-[10%] left-[30%] w-[40%] h-[30%] bg-primary-dark/10 blur-[100px] rounded-full animate-float pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
