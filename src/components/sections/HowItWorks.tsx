"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Share2, QrCode } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: UserPlus,
      title: "Create Profile",
      description: "Sign up in seconds and claim your unique username. No complicated setup required.",
      num: "01"
    },
    {
      icon: Share2,
      title: "Connect Socials",
      description: "Paste links to your Instagram, LinkedIn, TikTok, and more. Arrange them how you like.",
      num: "02"
    },
    {
      icon: QrCode,
      title: "Share QR",
      description: "Get your permanent QR code instantly. Anyone can scan it—no app needed.",
      num: "03"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="product">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 text-balance" ref={containerRef}>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Get your QR in <GradientText>60 seconds</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            A frictionless process designed to get you connected faster. No technical skills necessary.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connector Line */}
          <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-border hidden md:block z-0">
            <motion.div 
              className="h-full bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative bg-surface rounded-3xl p-8 border border-border/50 shadow-md card-hover group text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
              >
                <div className="mx-auto w-20 h-20 bg-background rounded-full flex items-center justify-center border-4 border-surface shadow-sm mb-6 relative group-hover:-translate-y-2 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                  <div className="absolute -top-3 -right-3 text-5xl font-black text-muted/30 select-none pointer-events-none">
                    {step.num}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
