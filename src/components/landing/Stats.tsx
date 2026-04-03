import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Downloads" },
  { value: 50, suffix: "+", label: "Universities" },
  { value: 100000, suffix: "+", label: "Connections Made" },
  { value: 4.9, suffix: "★", label: "App Rating", decimals: 1 },
];

function AnimatedCounter({ 
  value, 
  suffix, 
  decimals = 0, 
  isInView 
}: { 
  value: number; 
  suffix: string; 
  decimals?: number; 
  isInView: boolean 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-95" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground">
            Trusted by Students & Professionals Worldwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals}
                  isInView={isInView} 
                />
              </div>
              <div className="text-primary-foreground/70 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
