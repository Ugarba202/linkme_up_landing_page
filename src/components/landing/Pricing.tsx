import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: "Unlimited social links", included: true },
      { text: "Basic QR code", included: true },
      { text: "Share via link", included: true },
      { text: "5 profile views/month analytics", included: true },
      { text: "Custom QR colors", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Premium",
    description: "For power networkers",
    monthlyPrice: 2.99,
    yearlyPrice: 24.99,
    features: [
      { text: "Unlimited social links", included: true },
      { text: "Custom branded QR code", included: true },
      { text: "Share via link", included: true },
      { text: "Unlimited analytics", included: true },
      { text: "Custom QR colors & logo", included: true },
      { text: "Scan location tracking", included: true },
      { text: "Priority 24/7 support", included: true },
    ],
    cta: "Go Premium",
    popular: true,
  },
];

export const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 section-gradient" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Start free forever. Upgrade when you need more.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
              <span className="ml-2 text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full">
                Save 30%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? "gradient-bg text-primary-foreground glow"
                  : "bg-card border border-border"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-background text-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                  {plan.description}
                </p>
                <div className="mt-6">
                  <span className="font-display text-5xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                      }`}>
                        <HiCheck className={plan.popular ? "text-primary-foreground" : "text-primary"} size={14} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                        <HiX className="text-muted-foreground" size={14} />
                      </div>
                    )}
                    <span className={`${
                      feature.included 
                        ? "" 
                        : plan.popular 
                          ? "text-primary-foreground/50" 
                          : "text-muted-foreground"
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full py-6 text-lg font-semibold rounded-2xl ${
                  plan.popular
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "gradient-bg text-primary-foreground hover:opacity-90"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
