"use client";

import React from "react";
import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/GradientText";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is the QR code really permanent?",
    answer:
      "Yes! Your QR code is tied to your unique LinkQR profile URL, not your social handles. You can change any of your connected links at any time and the same QR code will always point to the latest version.",
  },
  {
    question: "Which platforms can I connect?",
    answer:
      "We support 50+ platforms including Instagram, TikTok, X (Twitter), LinkedIn, YouTube, Spotify, Snapchat, GitHub, Discord, Telegram, WhatsApp, and many more. You can also add any custom URL.",
  },
  {
    question: "Can I change my username later?",
    answer:
      "Absolutely. You can update your LinkQR username once every 30 days on the free plan, unlimited changes with Pro. Your QR code will automatically redirect to the new username.",
  },
  {
    question: "Do people need the app to scan my QR?",
    answer:
      "No app is needed. Anyone can scan your QR with their phone's native camera and they'll be taken directly to your profile in their browser. It works on every modern smartphone.",
  },
  {
    question: "How is this different from Linktree?",
    answer:
      "LinkQR is mobile-first with a permanent QR code as the core feature. Unlike Linktree, your QR never changes even when your links do. We also offer deep linking (opens apps directly), richer analytics, and a more modern interface designed for Gen Z.",
  },
  {
    question: "Is there a free version?",
    answer:
      "Yes! The free tier includes up to 3 social links, a basic QR code, 7-day analytics history, and a standard profile page. No credit card required to sign up.",
  },
  {
    question: "Can I use LinkQR for my business or team?",
    answer:
      "Yes. Teams and businesses can reach out to us for custom enterprise plans that include branded QR codes, team analytics dashboards, and centralized management of multiple profiles.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 text-balance">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Frequently asked <GradientText>questions</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about LinkQR.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="bg-background border border-border/50 rounded-2xl px-6 overflow-hidden shadow-sm data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
