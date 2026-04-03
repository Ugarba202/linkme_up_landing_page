"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";
import { Switch } from "@/components/ui/switch";

const plans = {
  free: {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for getting started",
    features: [
      "3 social links",
      "Basic QR code",
      "7-day analytics",
      "Standard profile page",
      "Community support",
    ],
    cta: "Download Free",
    featured: false,
  },
  proMonthly: {
    name: "Pro",
    monthlyPrice: 2.99,
    yearlyPrice: 23.99,
    description: "Everything you need to grow",
    features: [
      "Unlimited social links",
      "Custom QR colors & branding",
      "1-year analytics history",
      "Remove LinkQR watermark",
      "Deep linking support",
      "Priority support",
      "Custom profile themes",
    ],
    cta: "Start Free Trial",
    featured: true,
    badge: null as string | null,
  },
};

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 bg-background relative" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 text-balance">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Simple, <GradientText>transparent</GradientText> pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`text-sm font-semibold ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly
          </span>
          {isYearly && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full"
            >
              Save 33%
            </motion.span>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free */}
          <motion.div
            className="relative rounded-3xl bg-surface border border-border/50 p-8 shadow-sm flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-2">{plans.free.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{plans.free.description}</p>

            <div className="mb-8">
              <span className="text-5xl font-black">$0</span>
              <span className="text-muted-foreground ml-1">/forever</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plans.free.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" size="lg" className="w-full rounded-full h-12">
              {plans.free.cta}
            </Button>
          </motion.div>

          {/* Pro */}
          <motion.div
            className="relative rounded-3xl bg-background border-2 border-primary/30 p-8 shadow-glow flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {isYearly && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow">
                Best Value
              </div>
            )}

            <h3 className="text-xl font-bold mb-2">{plans.proMonthly.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{plans.proMonthly.description}</p>

            <div className="mb-8">
              <span className="text-5xl font-black">
                ${isYearly ? plans.proMonthly.yearlyPrice : plans.proMonthly.monthlyPrice}
              </span>
              <span className="text-muted-foreground ml-1">/{isYearly ? "year" : "month"}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plans.proMonthly.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="w-full rounded-full h-12 shadow-glow">
              {plans.proMonthly.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
