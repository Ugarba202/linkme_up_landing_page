"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { GradientText } from "@/components/ui/GradientText";
import { MagneticButton } from "@/components/ui/MagneticButton";

const NAV_LINKS = [
  { name: "Product", href: "#product" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

export function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border/50 shadow-sm" : "py-4 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <GradientText className="text-2xl font-black tracking-tight" as="span">LinkQR</GradientText>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full origin-center"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <MagneticButton>
            <Button className="rounded-full px-6 shadow-glow hover:shadow-glow-lg transition-all">
              Download App
            </Button>
          </MagneticButton>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0 border-l border-border/50 bg-background/95 backdrop-blur-xl">
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <GradientText className="text-2xl font-black tracking-tight">LinkQR</GradientText>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X size={24} />
                    </Button>
                  </SheetClose>
                </div>
                
                <nav className="flex flex-col gap-6 mt-8">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <a
                        href={link.href}
                        className="text-2xl font-medium tracking-tight text-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto pb-8">
                  <Button className="w-full rounded-full py-6 text-lg shadow-glow">
                    Download App
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
