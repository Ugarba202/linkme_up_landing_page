import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function GradientText({ children, className, as: Component = "span", ...props }: GradientTextProps) {
  return (
    <Component
      className={cn("text-gradient", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
