import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  HiOutlineDeviceMobile, 
  HiOutlineGlobe, 
  HiOutlineShieldCheck, 
  HiOutlineLightningBolt,
  HiOutlineSparkles,
  HiOutlineChartBar
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineDeviceMobile,
    title: "No Hardware Required",
    description: "Forget expensive NFC cards. Your phone is all you need to share your profiles.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: HiOutlineGlobe,
    title: "Works Everywhere",
    description: "Anyone with a camera phone can scan your code. No app download required for viewers.",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Privacy Focused",
    description: "Choose exactly which profiles to share. Update or disable anytime with full control.",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Lightning Fast",
    description: "Scan takes under 1 second. No loading screens, no waiting. Instant connections.",
    gradient: "from-yellow-500 to-orange-400",
  },
  {
    icon: HiOutlineSparkles,
    title: "Free Forever",
    description: "Core features are 100% free. No hidden costs, no credit card required to start.",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    icon: HiOutlineChartBar,
    title: "Premium Analytics",
    description: "See who scanned your code, when, and where. Track your networking success.",
    gradient: "from-indigo-500 to-purple-400",
  },
];

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Everything You Need,
            <span className="gradient-text"> Nothing You Don't</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for the way you actually network. Simple, fast, and completely free to start.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 card-hover ${
                index === 0 || index === 5 ? "lg:col-span-1" : ""
              }`}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-bg-subtle" />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>

              {/* Hover Glow */}
              <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-sm -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
