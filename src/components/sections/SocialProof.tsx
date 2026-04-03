"use client";

import React from "react";
import { SiSpotify, SiTiktok, SiX, SiInstagram, SiYoutube, SiTwitch, SiLinkedin, SiSnapchat } from "react-icons/si";

export function SocialProof() {
  const platforms = [
    { name: "Instagram", icon: SiInstagram },
    { name: "TikTok", icon: SiTiktok },
    { name: "Twitter/X", icon: SiX },
    { name: "LinkedIn", icon: SiLinkedin },
    { name: "YouTube", icon: SiYoutube },
    { name: "Spotify", icon: SiSpotify },
    { name: "Twitch", icon: SiTwitch },
    { name: "Snapchat", icon: SiSnapchat },
  ];

  return (
    <section className="py-16 bg-surface overflow-hidden border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Trusted by 50,000+ creators and professionals across all platforms
        </p>
      </div>

      <div className="relative flex w-full">
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-surface to-transparent"></div>
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-surface to-transparent"></div>

        {/* Marquee Track container */}
        <div className="flex w-fit animate-marquee md:animate-marquee-slow hover:[animation-play-state:paused]">
          {/* Base loop */}
          <div className="flex items-center gap-16 px-8 min-w-full">
            {platforms.map((Platform, index) => (
              <div 
                key={`platform-a-${index}`} 
                className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <Platform.icon className="w-8 h-8" />
                <span className="font-semibold text-lg">{Platform.name}</span>
              </div>
            ))}
          </div>
          {/* Duplicate loop */}
          <div className="flex items-center gap-16 px-8 min-w-full">
            {platforms.map((Platform, index) => (
              <div 
                key={`platform-b-${index}`} 
                className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <Platform.icon className="w-8 h-8" />
                <span className="font-semibold text-lg">{Platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
