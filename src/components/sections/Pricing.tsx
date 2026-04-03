"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const free = {
  name: "Free",
  desc: "Perfect for getting started",
  monthlyPrice: 0,
  yearlyPrice: 0,
  features: ["3 social links", "Basic QR code", "7-day analytics", "Standard profile", "Community support"],
  cta: "Download Free",
};

const pro = {
  name: "Pro",
  desc: "Everything you need to grow",
  monthlyPrice: 2.99,
  yearlyPrice: 23.99,
  features: [
    "Unlimited social links",
    "Custom QR colors & branding",
    "1-year analytics history",
    "Remove LinkMeUp watermark",
    "Deep linking support",
    "Priority support",
    "Custom profile themes",
  ],
  cta: "Start Free Trial",
};

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h2>
          <p className="text-muted-foreground text-lg">Start free. Upgrade when you need more.</p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <span className={`text-sm font-semibold ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} />
          <span className={`text-sm font-semibold ${yearly ? "text-foreground" : "text-muted-foreground"}`}>Yearly</span>
          {yearly && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-[11px] font-bold text-success bg-success/10 px-2.5 py-1 rounded-full">
              Save 33%
            </motion.span>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <motion.div
            className="bg-card rounded-2xl p-8 border border-white/5 flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-1">{free.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{free.desc}</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold">$0</span>
              <span className="text-muted-foreground text-sm ml-1">/forever</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {free.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" size="lg" className="w-full rounded-full h-12 border-white/10 bg-white/5 hover:bg-white/10">
              {free.cta}
            </Button>
          </motion.div>

          {/* Pro */}
          <motion.div
            className="bg-card rounded-2xl p-8 border border-primary/30 flex flex-col relative shadow-glow"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {yearly && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-glow-sm">
                Best Value
              </div>
            )}
            <h3 className="text-lg font-bold mb-1">{pro.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{pro.desc}</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold">${yearly ? pro.yearlyPrice : pro.monthlyPrice}</span>
              <span className="text-muted-foreground text-sm ml-1">/{yearly ? "year" : "month"}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {pro.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="w-full rounded-full h-12 bg-primary hover:bg-primary-dark shadow-glow">
              {pro.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
