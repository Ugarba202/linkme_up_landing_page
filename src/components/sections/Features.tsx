"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    id: "qr",
    title: "One scan. Every platform. Forever.",
    description:
      "Print it on your business card, your resume, your poster. Your QR code never changes — even when your handles do. Update your links anytime, and every existing QR instantly reflects the change.",
    image: "/images/feature-qr.png",
    imageAlt: "iPhone showing LinkMeUp profile with social links for Alex Rivera",
    badge: "Never expires",
    badgeColor: "bg-primary text-white",
  },
  {
    id: "share",
    title: "Network smarter. Connect faster.",
    description:
      "At events, conferences, or just meeting someone new — show your QR and let them instantly access all your socials, portfolio, and contact info. No more typing usernames or swapping business cards.",
    image: "/images/feature-sharing.png",
    imageAlt: "Two professionals networking by scanning a QR code at an event",
    badge: "No app needed",
    badgeColor: "bg-amber-accent text-black",
    reversed: true,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="features">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5 leading-[0.95]">
              Everything you need to{" "}
              <span className="text-gradient">share your world</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A powerful toolkit designed to put your entire social footprint into one scan.
            </p>
          </motion.div>
        </div>

        {/* Feature Blocks (Alternating Layout) */}
        <div className="space-y-24 max-w-6xl mx-auto">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${
                feature.reversed ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-12 lg:gap-16`}
            >
              {/* Image Side */}
              <div className="flex-1 w-full flex justify-center">
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="w-auto max-w-full h-auto max-h-[700px] object-contain"
                  style={{
                    maskImage: "radial-gradient(ellipse 70% 80% at center, black 50%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 80% at center, black 50%, transparent 100%)",
                  }}
                />
              </div>

              {/* Text Side */}
              <div className="flex-1 w-full">
                <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg">
                  {feature.description}
                </p>

                <Link href="/signup">
                  <Button
                    variant="ghost"
                    className="group/btn rounded-full px-6 h-11 text-sm font-semibold hover:bg-white/5 border border-white/10"
                  >
                    Get started free
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
