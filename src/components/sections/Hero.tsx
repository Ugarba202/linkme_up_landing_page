"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedMeshBackground } from "@/components/ui/AnimatedMeshBackground";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 30, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <AnimatedMeshBackground className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden flex items-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Content */}
          <motion.div 
            className="w-full lg:w-3/5 text-center lg:text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <span className="text-sm font-medium tracking-tight text-accent-foreground dark:text-accent">Introducing LinkQR</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[80px] leading-[1.1] font-black tracking-tight mb-6">
              One QR Code.<br />
              <GradientText>All Your Links.</GradientText><br />
              Forever.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 text-balance">
              Connect your social media. Generate a permanent QR. Share it anywhere. Update anytime—your QR never changes.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <MagneticButton>
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold group w-full sm:w-auto shadow-glow">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold w-full sm:w-auto bg-transparent backdrop-blur-md border border-border/50 hover:bg-muted/50">
                <PlayCircle className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>Free forever tier</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual - 3D Phone with QR */}
          <motion.div 
            className="w-full lg:w-2/5 flex justify-center perspective-[1000px] z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full scale-150 -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div 
                className="relative animate-float"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative shadow-2xl rounded-[40px]">
                  <PhoneMockup theme="light">
                    <div className="w-full h-full bg-slate-50 flex flex-col items-center pt-20 px-6 relative mt-16 scale-90">
                       <GradientText className="text-3xl font-bold mb-4">@alexdesign</GradientText>
                       <p className="text-slate-500 mb-8 max-w-[200px] text-center text-sm">Product Designer & Digital Creator</p>
                       
                       <div className="bg-white p-4 rounded-3xl shadow-xl w-48 h-48 flex items-center justify-center mb-8 border border-slate-100 relative">
                         {/* Abstract QR visual */}
                         <div className="w-full h-full bg-grid-pattern opacity-60 rounded-xl relative overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mix-blend-multiply"></div>
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                              <div className="w-8 h-8 rounded shrink-0 bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                           </div>
                         </div>
                       </div>
                       
                       <Button className="w-full rounded-full animate-pulse-glow" variant="default">
                         Save Contact
                       </Button>
                    </div>
                  </PhoneMockup>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedMeshBackground>
  );
}
