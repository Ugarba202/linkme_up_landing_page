import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is LinkMeUp really free?",
    answer: "Yes! Our core features are 100% free forever. You can create your profile, add unlimited social links, generate your QR code, and share it with anyone at no cost. Premium features like advanced analytics and custom branding are optional.",
  },
  {
    question: "Do people need the app to scan my QR code?",
    answer: "No! Anyone with a smartphone camera can scan your QR code. It works just like scanning any QR code - open the camera, point it at the code, and tap the link. No app installation required for viewers.",
  },
  {
    question: "Which social media platforms are supported?",
    answer: "We support 25+ platforms including Instagram, TikTok, Twitter/X, LinkedIn, Snapchat, YouTube, Discord, Spotify, Apple Music, GitHub, Behance, Pinterest, WhatsApp, Telegram, and many more. We're constantly adding new platforms!",
  },
  {
    question: "Can I customize my QR code?",
    answer: "Free users get a standard QR code with our branding. Premium users can fully customize their QR code colors, add their own logo in the center, and remove our branding for a completely personal touch.",
  },
  {
    question: "How do I update my links?",
    answer: "Simply open the app, tap on any link you want to change, and update it. Changes are instant - your QR code stays the same, but it will now show the updated information when scanned.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We only collect the information you choose to share. You have full control over what's visible on your profile. We never sell your data, and you can delete your account and all data at any time.",
  },
  {
    question: "Can I track who scans my QR code?",
    answer: "Free users can see total scan counts. Premium users get detailed analytics including scan timestamps, approximate locations (city-level), and which links get the most clicks.",
  },
  {
    question: "What if I want to cancel Premium?",
    answer: "You can cancel anytime from your account settings. You'll continue to have Premium access until the end of your billing period, then automatically switch back to the free plan with no penalties.",
  },
];

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Got Questions?
            <span className="gradient-text"> We've Got Answers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about LinkMeUp.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 border-none"
              >
                <AccordionTrigger className="text-left font-display text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
