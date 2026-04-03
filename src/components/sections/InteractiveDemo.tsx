"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { GradientText } from "@/components/ui/GradientText";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { SiSpotify, SiTiktok, SiX, SiInstagram } from "react-icons/si";

export function InteractiveDemo() {
  const [username, setUsername] = useState("creative_dev");
  const [platforms, setPlatforms] = useState({
    ig: true,
    tt: true,
    tw: false,
    sp: true,
  });
  const [theme, setTheme] = useState(0); // 0: indigo, 1: emerald, 2: amber

  const themes = [
    { name: "Indigo", bg: "bg-indigo-500", text: "text-indigo-500" },
    { name: "Emerald", bg: "bg-emerald-500", text: "text-emerald-500" },
    { name: "Amber", bg: "bg-amber-500", text: "text-amber-500" },
  ];

  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 text-balance">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Try it <GradientText>yourself</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            Customize your simulated profile and watch the interface update in real-time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto items-center lg:items-start">
          
          {/* Controls */}
          <div className="w-full lg:w-1/2 bg-surface p-8 rounded-3xl border border-border/50 shadow-sm order-2 lg:order-1">
            <div className="space-y-8">
              
              {/* Username Control */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">linkqr.com/</span>
                  <Input 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="pl-[100px] h-12 bg-background border-border/50 focus-visible:ring-primary"
                    placeholder="username"
                  />
                </div>
              </div>

              {/* Platform Toggles */}
              <div className="space-y-4">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connected Platforms</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-border/50">
                    <div className="flex items-center gap-3"><SiInstagram className="w-5 h-5 text-pink-600" /><span className="font-medium">Instagram</span></div>
                    <Switch checked={platforms.ig} onCheckedChange={(v) => setPlatforms({ ...platforms, ig: v })} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-border/50">
                    <div className="flex items-center gap-3"><SiTiktok className="w-5 h-5 text-black dark:text-white" /><span className="font-medium">TikTok</span></div>
                    <Switch checked={platforms.tt} onCheckedChange={(v) => setPlatforms({ ...platforms, tt: v })} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-border/50">
                    <div className="flex items-center gap-3"><SiX className="w-5 h-5 text-black dark:text-white" /><span className="font-medium">X (Twitter)</span></div>
                    <Switch checked={platforms.tw} onCheckedChange={(v) => setPlatforms({ ...platforms, tw: v })} />
                  </div>
                </div>
              </div>

              {/* Themes */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Brand Color</label>
                <div className="flex gap-4">
                  {themes.map((t, index) => (
                     <button
                       key={t.name}
                       onClick={() => setTheme(index)}
                       className={`w-12 h-12 rounded-full ${t.bg} transition-all duration-300 flex items-center justify-center`}
                       style={{ transform: theme === index ? "scale(1.1)" : "scale(1)", outline: theme === index ? "2px solid currentcolor" : "none", outlineOffset: "2px" }}
                     />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Preview */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
            <PhoneMockup theme="light">
               <div className="w-full h-full bg-slate-50 flex flex-col pt-16 relative">
                 {/* Header */}
                 <div className={`w-full py-8 text-center flex flex-col items-center justify-center border-b border-border/10 ${themes[theme].bg} bg-opacity-10 transition-colors duration-500`}>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border-4 border-white shadow-sm mb-4"></div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">@{username || "username"}</h3>
                    <p className="text-sm text-slate-500">Your custom link-in-bio</p>
                 </div>
                 
                 {/* Links */}
                 <div className="flex-1 p-6 space-y-4">
                   {platforms.ig && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full p-4 rounded-2xl bg-white border border-border/50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer ${themes[theme].text}`}>
                        <SiInstagram className="w-6 h-6" />
                        <span className="font-semibold text-slate-900">Follow on Instagram</span>
                      </motion.div>
                   )}
                   {platforms.tt && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full p-4 rounded-2xl bg-white border border-border/50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer ${themes[theme].text}`}>
                        <SiTiktok className="w-6 h-6" />
                        <span className="font-semibold text-slate-900">Watch on TikTok</span>
                      </motion.div>
                   )}
                   {platforms.tw && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full p-4 rounded-2xl bg-white border border-border/50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer ${themes[theme].text}`}>
                        <SiX className="w-6 h-6" />
                        <span className="font-semibold text-slate-900">Follow on X</span>
                      </motion.div>
                   )}
                   {platforms.sp && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full p-4 rounded-2xl bg-white border border-border/50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer ${themes[theme].text}`}>
                        <SiSpotify className="w-6 h-6" />
                        <span className="font-semibold text-slate-900">Listen on Spotify</span>
                      </motion.div>
                   )}
                 </div>
               </div>
            </PhoneMockup>
          </div>

        </div>
      </div>
    </section>
  );
}
