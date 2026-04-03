"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { SiInstagram, SiX, SiLinkedin, SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GradientText } from "@/components/ui/GradientText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedMeshBackground } from "@/components/ui/AnimatedMeshBackground";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Demo", href: "#demo" },
    { name: "Changelog", href: "#" },
  ],
  Company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "API", href: "#" },
    { name: "Status", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { name: "X (Twitter)", icon: SiX, href: "#" },
  { name: "Instagram", icon: SiInstagram, href: "#" },
  { name: "LinkedIn", icon: SiLinkedin, href: "#" },
  { name: "GitHub", icon: SiGithub, href: "#" },
];

export function Footer() {
  return (
    <>
      {/* CTA Section */}
      <AnimatedMeshBackground className="!min-h-0 py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-balance">
              Ready to simplify your{" "}
              <GradientText>social presence</GradientText>?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-balance">
              Join 50,000+ creators sharing smarter. Get your permanent QR code in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold group shadow-glow w-full sm:w-auto"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 text-base font-semibold bg-transparent backdrop-blur-md border-border/50 hover:bg-muted/50 w-full sm:w-auto"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatedMeshBackground>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
              <GradientText className="text-2xl font-black tracking-tight mb-4 block">
                LinkQR
              </GradientText>
              <p className="text-sm text-background/60 leading-relaxed max-w-xs">
                One QR code for all your social links. Share smarter.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-background/40 mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-background/60 hover:text-background transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="border-t border-background/10 pt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-semibold mb-1">Stay in the loop</h4>
                <p className="text-sm text-background/60">Get product updates and tips. No spam.</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  placeholder="you@email.com"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/40 h-12 rounded-full px-5 md:w-64"
                />
                <Button className="rounded-full h-12 px-6">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/40 flex items-center gap-1">
              &copy; {new Date().getFullYear()} LinkQR. Made with{" "}
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" /> 
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-background/40 hover:text-background transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
