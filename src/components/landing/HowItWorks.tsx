import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaInstagram, FaTiktok, FaLinkedin, FaTwitter, FaSnapchat, FaYoutube } from "react-icons/fa";
import { HiOutlineQrcode, HiOutlineDeviceMobile, HiOutlineUserAdd } from "react-icons/hi";

const steps = [
  {
    number: "01",
    title: "Connect Your Socials",
    description: "Link all your social media profiles in seconds. We support Instagram, TikTok, LinkedIn, Twitter, and 20+ more platforms.",
    icon: HiOutlineDeviceMobile,
    socials: [FaInstagram, FaTiktok, FaLinkedin, FaTwitter, FaSnapchat, FaYoutube],
  },
  {
    number: "02",
    title: "Get Your QR Code",
    description: "We generate a unique, beautiful QR code that contains all your profiles. Customize colors to match your personal brand.",
    icon: HiOutlineQrcode,
  },
  {
    number: "03",
    title: "Share Instantly",
    description: "Just show your QR code and let others scan. They'll see all your profiles and follow with one tap. No app needed to scan!",
    icon: HiOutlineUserAdd,
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 section-gradient" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Three Steps to
            <span className="gradient-text"> Effortless Networking</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Set up once, share forever. It takes less than 2 minutes to create your LinkMeUp profile.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="glass-card p-8 h-full card-hover group">
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-5xl font-bold gradient-text opacity-50 group-hover:opacity-100 transition-opacity">
                    {step.number}
                  </span>
                  <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center glow-sm">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Social Icons for Step 1 */}
                {step.socials && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="flex gap-3 mt-6 flex-wrap"
                  >
                    {step.socials.map((Social, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 300 }}
                        className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        <Social size={20} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* QR Animation for Step 2 */}
                {step.number === "02" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                    className="mt-6 flex justify-center"
                  >
                    <div className="w-24 h-24 gradient-bg-subtle rounded-2xl border-2 border-primary/20 flex items-center justify-center animate-pulse-glow">
                      <div className="grid grid-cols-4 gap-1">
                        {[...Array(16)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-sm ${
                              Math.random() > 0.4 ? "bg-primary" : "bg-transparent"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
