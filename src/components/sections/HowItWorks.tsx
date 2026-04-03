"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Share2, QrCode } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Profile", desc: "Sign up in seconds and claim your unique username. No complicated setup required.", num: "01" },
  { icon: Share2, title: "Connect Socials", desc: "Add your Instagram, LinkedIn, TikTok and more. Arrange them however you like.", num: "02" },
  { icon: QrCode, title: "Share QR", desc: "Get your permanent QR code instantly. Anyone can scan it — no app needed.", num: "03" },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background relative" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-20" ref={ref}>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Get your QR in <span className="text-gradient">60 seconds</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Three steps between you and effortless networking.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connector line (desktop) */}
          <div className="absolute top-14 left-[16%] right-[16%] h-px bg-white/5 hidden md:block">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary-light origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="text-center relative bg-card rounded-2xl p-8 border border-white/5 card-hover group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              >
                {/* Icon circle */}
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Number watermark */}
                <div className="absolute top-4 right-6 text-4xl font-black text-white/[0.03] select-none">
                  {step.num}
                </div>

                <h3 className="text-lg font-bold mb-2 tracking-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
