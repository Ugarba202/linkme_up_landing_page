"use client";

import { useState, useCallback, useEffect } from "react";
import { 
  Copy, 
  Plus, 
  Trash2, 
  GripVertical, 
  Check, 
  Eye, 
  EyeOff,
  Link as LinkIcon,
  Sparkles,
  ArrowRight,
  Search,
  AtSign,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/lib/stores/auth-store";
import { PLATFORMS, constructUrl } from "@/lib/constants";
import type { SocialPlatform, SocialLink } from "@/types/profile";
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
  other: Globe
};

export default function SocialLinksManager() {
  const { profile, user, initialized } = useAuth();
  const { updateSocialLinks } = useAuthStore();
  const [links, setLinks] = useState<SocialLink[]>(profile?.socialLinks || []);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | "other" | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [customName, setCustomName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Sync internal state when profile loads
  useEffect(() => {
    if (profile?.socialLinks) {
      setLinks(profile.socialLinks);
    }
  }, [profile]);

  if (!initialized || !profile || !user) return null;

  // ─── Platform Detection ───
  const detectPlatformFromUrl = (input: string) => {
    if (!input.includes(".")) return null;
    for (const [key, config] of Object.entries(PLATFORMS)) {
      if (config.baseUrl && input.toLowerCase().includes(config.baseUrl.split("//")[1].split("/")[0])) {
        return key as SocialPlatform;
      }
    }
    return null;
  };

  const handleInputUpdate = (val: string) => {
    setNewUsername(val);
    if (selectedPlatform === "other" || !selectedPlatform) {
      const detected = detectPlatformFromUrl(val);
      if (detected) setSelectedPlatform(detected);
    }
  };

  // ─── Actions ───
  const handleToggleVisibility = async (link: SocialLink) => {
    const updatedLinks = links.map(l => l.id === link.id ? { ...l, isVisible: !l.isVisible } : l);
    setLinks(updatedLinks);
    updateSocialLinks(updatedLinks);
  };

  const handleDelete = async (id: string) => {
    const updatedLinks = links.filter(l => l.id !== id);
    setLinks(updatedLinks);
    updateSocialLinks(updatedLinks);
  };

  const handleAddLink = async () => {
    if (!selectedPlatform || !newUsername.trim()) return;
    setIsAdding(true);

    const isOther = selectedPlatform === "other";
    const mapped: SocialLink = {
      id: Math.random().toString(36).substring(7),
      userId: user.id,
      platform: isOther ? "other" : selectedPlatform,
      username: isOther ? (customName || "Custom") : newUsername.trim(),
      url: isOther ? newUsername.trim() : constructUrl(selectedPlatform as SocialPlatform, newUsername.trim()),
      isVisible: true,
      sortOrder: links.length,
      createdAt: new Date()
    };

    const updatedLinks = [...links, mapped];
    setLinks(updatedLinks);
    updateSocialLinks(updatedLinks);
    
    setAddDialogOpen(false);
    setNewUsername("");
    setCustomName("");
    setSelectedPlatform(null);
    setIsAdding(false);
  };

  const availablePlatforms = Object.values(PLATFORMS);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      
      {/* ─── Header Section ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <h1 className="text-4xl md:text-5xl font-black tracking-tight">
             Active <span className="text-gradient">Connects</span>
           </h1>
           <p className="text-white/40 text-lg font-medium">
             Manage and reorder your digital signatures.
           </p>
        </div>

        <Button 
          onClick={() => setAddDialogOpen(true)}
          className="h-14 bg-white text-black hover:bg-white/90 font-black rounded-2xl px-8 shadow-xl transition-all"
        >
          <Plus className="w-5 h-5 mr-3" /> Add Link
        </Button>
      </div>

      {/* ─── Links List ─── */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {links.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0F1021]/50 backdrop-blur-xl border border-white/5 border-dashed rounded-[40px] p-20 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                 <LinkIcon className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-2xl font-black mb-2">No active connections</h3>
              <p className="text-white/30 text-sm max-w-[280px] font-medium leading-relaxed">
                Your profile is looking a bit quiet. Connect your socials to start growing your network.
              </p>
            </motion.div>
          ) : (
            links.sort((a, b) => a.sortOrder - b.sortOrder).map((link, i) => {
              const platformKey = link.platform as keyof typeof PLATFORMS | "other";
              const config = PLATFORMS[platformKey as keyof typeof PLATFORMS] || { displayName: link.username, color: "#6366f1" };
              const Icon = ICON_MAP[platformKey] || Globe;
              
              return (
                <motion.div
                  key={link.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`group relative overflow-hidden rounded-[28px] border transition-all ${
                    link.isVisible 
                      ? "bg-[#0F1021]/80 backdrop-blur-xl border-white/5 hover:border-white/10" 
                      : "bg-[#0F1021]/30 border-white/5 opacity-50 grayscale"
                  }`}
                >
                  {/* Status Glow */}
                  <div 
                    className="absolute -left-2 top-0 bottom-0 w-1 transition-all group-hover:w-2"
                    style={{ backgroundColor: config.color }} 
                  />
                  
                  <div className="p-5 flex items-center gap-5">
                    <div className="cursor-grab text-white/10 hover:text-white/30 active:cursor-grabbing p-1 transition-colors">
                      <GripVertical className="w-6 h-6" />
                    </div>
                    
                    <div 
                      className="w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 relative overflow-hidden"
                      style={{ backgroundColor: `${config.color}15`, border: `1px solid ${config.color}30` }}
                    >
                      <Icon className="w-7 h-7 relative z-10" style={{ color: config.color }} />
                      <div className="absolute inset-0 bg-inherit blur-lg opacity-40" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-lg tracking-tight mb-0.5">
                        {link.platform === "other" ? link.username : config.displayName}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 truncate">
                        {link.url.replace("https://", "")}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                       <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleVisibility(link)}
                        className={`w-12 h-12 rounded-xl transition-all ${
                          link.isVisible 
                            ? "text-primary bg-primary/10 hover:bg-primary/20" 
                            : "text-white/20 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        {link.isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(link.id)}
                        className="w-12 h-12 rounded-xl text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* ─── Promotion Section ─── */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent border-white/5 rounded-[40px] overflow-hidden relative">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-[24px] bg-primary/20 flex items-center justify-center shrink-0 shadow-glow">
               <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h4 className="text-xl font-black mb-1">Amplify Your Reach</h4>
               <p className="text-white/40 text-sm font-medium">
                 Profiles with 5 or more active links see a 40% higher engagement rate. Add your portfolio or latest project now.
               </p>
            </div>
            <Button variant="outline" className="h-14 px-8 border-white/10 bg-white/5 rounded-2xl font-black uppercase tracking-widest text-xs">
               Review Stats <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
         </div>
      </Card>

      {/* ─── Add Link Dialog ─── */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="bg-[#0A0B1E] border-white/5 sm:max-w-md p-8 rounded-[40px] shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tight mb-2">
              {selectedPlatform ? "Link Connection" : "Select Platform"}
            </DialogTitle>
          </DialogHeader>
          
          <AnimatePresence mode="wait">
            {!selectedPlatform ? (
              <motion.div 
                key="platform-select"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-2 gap-3 pt-4"
              >
                {availablePlatforms.map((p) => {
                  const Icon = ICON_MAP[p.key] || Globe;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPlatform(p.key)}
                      className="group flex flex-col items-center justify-center p-5 rounded-[24px] border border-white/5 bg-white/[0.02] hover:border-primary/50 hover:bg-primary/5 transition-all gap-3"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" style={{ color: p.color || "#fff" }} />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{p.displayName}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => setSelectedPlatform("other")}
                  className="group flex flex-col items-center justify-center p-5 rounded-[24px] border border-dashed border-white/10 bg-transparent hover:border-primary/50 hover:bg-primary/10 transition-all gap-3"
                >
                  <Plus className="w-6 h-6 text-white/20 group-hover:text-primary transition-colors" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/20 group-hover:text-primary transition-colors">Custom Link</span>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="config-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 pt-4"
              >
                <div className="flex items-center gap-4 p-4 rounded-[22px] bg-white/5 border border-white/10 relative overflow-hidden">
                  {(() => {
                    const Icon = ICON_MAP[selectedPlatform] || Globe;
                    const color = selectedPlatform === "other" ? "#6366f1" : (PLATFORMS[selectedPlatform as keyof typeof PLATFORMS]?.color || "#fff");
                    return (
                      <>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 z-10" style={{ backgroundColor: `${color}15` }}>
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-sm">{selectedPlatform === "other" ? "Custom URL" : PLATFORMS[selectedPlatform as keyof typeof PLATFORMS]?.displayName}</p>
                          <button 
                            className="text-[10px] font-black uppercase tracking-wider text-primary hover:text-primary-light"
                            onClick={() => setSelectedPlatform(null)}
                          >
                            Switch Platform
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {selectedPlatform === "other" && (
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Platform Label</label>
                     <Input
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. My Website"
                        className="h-14 bg-white/5 border-white/10 focus-visible:ring-primary rounded-2xl"
                     />
                   </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                    {selectedPlatform === "other" ? "Full Link" : (PLATFORMS[selectedPlatform as keyof typeof PLATFORMS]?.handleHint || "Username or URL")}
                  </label>
                  <div className="relative">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary opacity-50">
                        {selectedPlatform === "other" ? <Globe className="w-4 h-4" /> : <AtSign className="w-4 h-4" />}
                     </div>
                     <Input
                        autoFocus
                        value={newUsername}
                        onChange={(e) => handleInputUpdate(e.target.value)}
                        placeholder={selectedPlatform === "other" ? "https://..." : "your_username"}
                        className="pl-12 h-14 bg-white/5 border-white/10 focus-visible:ring-primary rounded-2xl"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                      />
                  </div>
                </div>

                <Button
                  onClick={handleAddLink}
                  disabled={!newUsername.trim() || isAdding}
                  className="w-full h-16 bg-primary hover:brightness-110 font-black uppercase tracking-widest rounded-2xl shadow-glow"
                >
                  {isAdding ? "Saving..." : "Connect Profile"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
