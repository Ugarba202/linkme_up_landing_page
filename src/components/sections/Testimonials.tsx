"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "LinkQR completely changed how I network at conferences. One scan and people have all my socials — no more awkward 'follow me on...' moments.",
    name: "Amara Johnson",
    role: "Product Designer at Meta",
    rating: 5,
    avatar: "AJ",
  },
  {
    quote: "I put my LinkQR on my business card and it's been a game changer. Even when I changed my TikTok handle, everything still worked perfectly.",
    name: "Kofi Mensah",
    role: "Content Creator — 200K followers",
    rating: 5,
    avatar: "KM",
  },
  {
    quote: "As a university career services director, we rolled this out to 3,000 students. The analytics alone justify it — we can see engagement like never before.",
    name: "Sarah Chen",
    role: "Director of Career Services, NYU",
    rating: 5,
    avatar: "SC",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const t = testimonials[current];

  return (
    <section className="py-24 bg-surface relative overflow-hidden" id="about">
      <div className="container mx-auto px-4 md:px-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
          {[
            { value: "50,000+", label: "Downloads" },
            { value: "120+", label: "Universities" },
            { value: "500K+", label: "Connections Made" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="text-4xl md:text-5xl font-black mb-2">
                <GradientText>{stat.value}</GradientText>
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div
          className="max-w-3xl mx-auto text-center relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="text-7xl font-black text-primary/10 select-none mb-4">&ldquo;</div>

          <div className="min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl md:text-2xl leading-relaxed italic text-foreground mb-8 text-balance">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-lg ring-4 ring-primary/10">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mt-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prev}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" className="rounded-full" onClick={next}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full max-w-xs mx-auto h-1 bg-border/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              key={`progress-${current}-${isPaused}`}
              initial={{ width: "0%" }}
              animate={isPaused ? {} : { width: "100%" }}
              transition={isPaused ? {} : { duration: 5, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
