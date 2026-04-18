"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Share2, 
  ChevronRight, 
  QrCode, 
  User, 
  ExternalLink,
  ArrowUpRight,
  Triangle,
  Link2,
  Download,
  Copy
} from "lucide-react";
import { 
  SiInstagram, 
  SiTiktok, 
  SiX, 
  SiYoutube, 
  SiLinkedin, 
  SiSnapchat, 
  SiWhatsapp, 
  SiGithub, 
  SiDiscord, 
  SiFacebook 
} from "react-icons/si";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { PLATFORMS } from "@/lib/constants";
import type { SocialLink, Profile, SocialPlatform } from "@/types/profile";

// Mock data for sample profile when testing
const SAMPLE_PROFILE: Profile = {
  id: "sample-id",
  username: "johndoe",
  fullName: "John Doe",
  bio: "Digital Creator | UI/UX Designer | Building the future of social networking. Let's connect and build something amazing together!",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop",
  profileCompleted: true,
  socialLinks: [
    { id: "1", userId: "sample", platform: "instagram", username: "johndoe", url: "https://instagram.com/johndoe", isVisible: true, sortOrder: 0, createdAt: new Date() },
    { id: "2", userId: "sample", platform: "tiktok", username: "johndoe", url: "https://tiktok.com/@johndoe", isVisible: true, sortOrder: 1, createdAt: new Date() },
    { id: "3", userId: "sample", platform: "twitter", username: "johndoe", url: "https://x.com/johndoe", isVisible: true, sortOrder: 2, createdAt: new Date() },
    { id: "4", userId: "sample", platform: "youtube", username: "@johndoe", url: "https://youtube.com/@johndoe", isVisible: true, sortOrder: 3, createdAt: new Date() },
  ],
  views: 1250,
  clicks: 432,
  createdAt: new Date(),
  country: "US",
  bannerUrl: null,
  publicUrl: "https://linkmeup.app/u/johndoe",
  email: "john@example.com",
  phoneNumber: "+1234567890",
  isQrGenerated: true,
  qrGeneratedAt: new Date()
};

const ICON_MAP: Record<string, any> = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  twitter: SiX,
  youtube: SiYoutube,
  linkedin: SiLinkedin,
  snapchat: SiSnapchat,
  whatsapp: SiWhatsapp,
  github: SiGithub,
  discord: SiDiscord,
  facebook: SiFacebook,
  other: Link2
};

export default function PublicProfilePage() {
  const params = useParams();
  const { profile: activeProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"links" | "qr">("links");

  const username = params.username as string;

  // Decision logic for which profile to show
  const displayProfile = useMemo(() => {
    if (activeProfile && activeProfile.username?.toLowerCase() === username.toLowerCase()) {
      return activeProfile;
    }
    return SAMPLE_PROFILE;
  }, [activeProfile, username]);

  if (!displayProfile) return null;

  return (
    <div className="min-h-screen bg-[#050510] text-white selection:bg-primary/30 pb-20 overflow-x-hidden relative">
      
      {/* ─── Background Aesthetic ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[80%] h-[60%] bg-primary/20 blur-[150px] rounded-full opacity-60" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 60, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full opacity-50" 
        />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <main className="relative z-10 max-w-[440px] mx-auto px-6 pt-12 md:pt-20">
        
        {/* ─── Profile Section ─── */}
        <section className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="relative mb-6"
          >
            {/* Avatar Ring */}
            <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-primary via-indigo-400 to-purple-500 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
              <div className="w-full h-full rounded-full bg-[#050510] p-1.5 overflow-hidden">
                {displayProfile.avatarUrl ? (
                  <img 
                    src={displayProfile.avatarUrl} 
                    alt={displayProfile.fullName} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
                    <User className="w-12 h-12 text-white/20" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Pulsing Dot */}
            <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-[#050510] shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
          </motion.div>

          <div className="space-y-1">
            <motion.h1 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-black tracking-tight"
            >
              {displayProfile.fullName}
            </motion.h1>
            
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2"
            >
              <span className="text-secondary font-black tracking-wider text-sm bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                @{displayProfile.username}
              </span>
            </motion.div>
          </div>

          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-white/50 text-sm md:text-base leading-relaxed font-medium"
          >
            {displayProfile.bio}
          </motion.p>
        </section>

        {/* ─── Tab Switcher ─── */}
        <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-[24px] border border-white/5 mb-8">
          <button 
            onClick={() => setActiveTab("links")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[18px] text-sm font-bold transition-all ${
              activeTab === "links" ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
            }`}
          >
            <Link2 className="w-4 h-4" /> Links
          </button>
          <button 
            onClick={() => setActiveTab("qr")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[18px] text-sm font-bold transition-all ${
              activeTab === "qr" ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
            }`}
          >
            <QrCode className="w-4 h-4" /> Digital Pass
          </button>
        </div>

        {/* ─── Dynamic Content ─── */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "links" ? (
              <motion.div 
                key="links"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {displayProfile.socialLinks
                  .filter(l => l.isVisible)
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((link, index) => {
                    const platformKey = link.platform as SocialPlatform;
                    const config = PLATFORMS[platformKey] || PLATFORMS.other;
                    const Icon = ICON_MAP[platformKey] || ICON_MAP.other;
                    
                    return (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex items-center p-4 bg-white/[0.04] backdrop-blur-xl border border-white/5 rounded-[24px] transition-all overflow-hidden h-20"
                      >
                        {/* Status Glow (Platform Specific) */}
                        <div 
                          className="absolute -left-2 top-0 bottom-0 w-1 opacity-60 transition-all group-hover:w-2"
                          style={{ backgroundColor: config.color }} 
                        />
                        
                        <div 
                          className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 relative z-10"
                          style={{ backgroundColor: `${config.color}20`, border: `1px solid ${config.color}30` }}
                        >
                          <Icon className="w-6 h-6 transition-transform group-hover:scale-110" style={{ color: config.color }} />
                          {/* Inner soft glow */}
                          <div className="absolute inset-0 bg-inherit blur-md opacity-40 rounded-full" />
                        </div>
                        
                        <div className="flex-1 ml-4 overflow-hidden">
                          <h4 className="font-black text-[17px] tracking-tight group-hover:translate-x-1 transition-transform">
                            {config.displayName}
                          </h4>
                          <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest truncate">
                            {link.username}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pr-2">
                           <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <ArrowUpRight className="w-4 h-4 text-white/50" />
                           </div>
                        </div>
                      </motion.a>
                    );
                  })}
                  
                {displayProfile.socialLinks.length === 0 && (
                  <div className="text-center py-20 bg-white/[0.02] rounded-[32px] border border-dashed border-white/10">
                    <p className="text-white/20 font-bold uppercase tracking-widest text-xs">No links shared yet</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="qr"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center bg-white/[0.04] backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-10 text-center relative overflow-hidden"
              >
                {/* QR Decorative Blobs */}
                <div className="absolute -top-[20%] -right-[20%] w-40 h-40 bg-primary/20 blur-[60px] rounded-full" />
                
                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="bg-white p-6 rounded-[32px] shadow-2xl mb-8 relative group cursor-pointer">
                    <QrCode className="w-48 h-48 text-black" />
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]">
                       <span className="bg-black text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">Preview Only</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-2 leading-tight">Your Digital Pass</h3>
                  <p className="text-white/40 text-sm font-medium mb-8 max-w-[240px]">
                    Let anyone scan this code to instantly see all your social media profiles.
                  </p>
                  
                  <div className="flex gap-4 w-full">
                    <Button className="flex-1 h-14 bg-white text-black hover:bg-white/90 rounded-[20px] font-black text-sm uppercase tracking-widest">
                      <Download className="mr-2 w-4 h-4" /> Save Pass
                    </Button>
                    <Button variant="outline" className="h-14 w-14 border-white/10 bg-white/5 rounded-[20px] p-0 flex items-center justify-center">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Shared Controls ─── */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="flex items-center justify-center gap-2 h-14 bg-white/[0.04] border border-white/5 rounded-[22px] font-bold text-sm hover:bg-white/10 transition-all"
          >
            <Copy className="w-4 h-4" /> Copy Link
          </button>
          <button 
            className="flex items-center justify-center gap-2 h-14 bg-primary text-white rounded-[22px] font-black text-sm uppercase tracking-widest hover:brightness-110 shadow-[0_8px_20px_-5px_rgba(99,102,241,0.5)] transition-all"
          >
            Share <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* ─── Branding ─── */}
        <footer className="mt-20 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 opacity-30">
            <Triangle className="w-3 h-3 text-secondary fill-secondary rotate-180" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Integrated by LinkMeUp</span>
            <Triangle className="w-3 h-3 text-secondary fill-secondary rotate-180" />
          </div>
          
          <Link href="/" className="inline-block p-1 rounded-[20px] bg-gradient-to-tr from-primary/20 to-secondary/20 hover:from-primary/40 hover:to-secondary/40 transition-all group">
            <div className="px-6 py-3 rounded-[18px] bg-[#050510] flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0">
                <img src="/images/logo.png" className="w-full h-full object-cover scale-150" alt="Logo" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-white/50 group-hover:text-white">Create Your Own Pass</span>
            </div>
          </Link>
        </footer>

      </main>
    </div>
  );
}
