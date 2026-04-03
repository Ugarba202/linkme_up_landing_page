"use client";

import React from "react";
import { motion } from "framer-motion";
import { QrCode, Smartphone, BarChart3, ShieldCheck, Zap, Globe2 } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";

export function Features() {
  return (
    <section className="py-24 bg-surface" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 text-balance">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Everything you need to <GradientText>share your world</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect better with a suite of tools designed to put all your social footprint into one scan.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Large Left */}
          <motion.div 
            className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-background border border-border/50 shadow-sm p-8 md:p-10 card-hover flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex-1 z-10">
              <QrCode className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Permanent QR Code</h3>
              <p className="text-muted-foreground leading-relaxed">
                Print it on your business card. Tattoo it. It works forever, even when your handles change or you update your profile.
              </p>
            </div>
            <div className="w-full md:w-64 h-64 bg-surface rounded-2xl border border-border/50 relative flex-shrink-0 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-mesh opacity-30 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 bg-white p-4 rounded-xl shadow-lg rotate-[-5deg] group-hover:rotate-0 transition-all duration-500">
                <div className="w-32 h-32 bg-slate-900 rounded-lg"></div>
              </div>
              <div className="absolute -bottom-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-glow-sm rotate-12">
                NEVER EXPIRES
              </div>
            </div>
          </motion.div>

          {/* Small 1 */}
          <motion.div 
            className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 shadow-sm p-8 card-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
          >
            <Zap className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-bold mb-3 tracking-tight">Real-Time Updates</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Change your Instagram? Your QR updates instantly everywhere.
            </p>
          </motion.div>

          {/* Small 2 */}
          <motion.div 
            className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 shadow-sm p-8 card-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <Globe2 className="w-10 h-10 text-success mb-6" />
            <h3 className="text-xl font-bold mb-3 tracking-tight">All Platforms</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Support for over 50 social networks, websites, and payment links.
            </p>
          </motion.div>

          {/* Small 3 */}
          <motion.div 
            className="group relative overflow-hidden rounded-3xl bg-background border border-border/50 shadow-sm p-8 card-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
          >
            <Smartphone className="w-10 h-10 text-primary-light mb-6" />
            <h3 className="text-xl font-bold mb-3 tracking-tight">Deep Linking</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Opens links directly in native apps when possible, not internal browsers.
            </p>
          </motion.div>

          {/* Large Right */}
          <motion.div 
            className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-background border border-border/50 shadow-sm p-8 card-hover grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col justify-center z-10">
              <BarChart3 className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Premium Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                See exactly how many people scanned your code, clicked your links, and where they came from. Data that empowers growth.
              </p>
            </div>
            <div className="h-48 md:h-auto bg-surface rounded-2xl p-6 border border-border/50 relative overflow-hidden flex items-end justify-between gap-2">
               {/* Abstract Chart bars */}
               {[40, 70, 45, 90, 60, 110, 80].map((h, i) => (
                 <motion.div 
                   key={i}
                   className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-sm opacity-80"
                   style={{ height: `${h}%`, transformOrigin: "bottom" }}
                   initial={{ scaleY: 0 }}
                   whileInView={{ scaleY: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, delay: 0.5 + i * 0.1, type: "spring" }}
                  />
               ))}
               <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent flex items-end pb-2 px-2">
                  <span className="text-xs font-semibold text-primary drop-shadow">+340 Scans Today</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
