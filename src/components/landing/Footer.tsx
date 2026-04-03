import { FaInstagram, FaTiktok, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Download", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTiktok, href: "#", label: "TikTok" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">L</span>
              </div>
              <span className="font-display font-bold text-xl">LinkMeUp</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-xs">
              One QR code for all your socials. The simplest way to connect in the digital age.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} LinkMeUp. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with 💜 for networkers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};
