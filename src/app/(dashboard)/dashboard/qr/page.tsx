"use client";

import { useRef, useState } from "react";
import { 
  Download, 
  Copy, 
  Check, 
  QrCode as QrIcon, 
  Share2, 
  Printer, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function QRPage() {
  const { profile, user, initialized } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"standard" | "business">("standard");
  const qrRef = useRef<HTMLDivElement>(null);

  if (!initialized || !profile || !user) return null;

  const publicUrl = `https://linkmeup.app/u/${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = (format: "svg" | "png") => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    if (format === "svg") {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `linkmeup-${profile.username}-qr.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = 1024;
        canvas.height = 1024;
        ctx?.drawImage(img, 0, 0, 1024, 1024);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `linkmeup-${profile.username}-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* ─── Header ─── */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
           Your <span className="text-secondary">Digital</span> Pass
        </h1>
        <p className="text-white/40 text-lg max-w-2xl font-medium">
          Generate, customize, and download your unique signature link. Let the world scan into your universe.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start">
        
        {/* ─── Left: High-Fidelity Preview ─── */}
        <div className="space-y-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="relative"
             >
                <Card className="p-10 md:p-16 bg-[#0F1021] border-white/5 shadow-2xl rounded-[48px] relative overflow-hidden flex flex-col items-center group">
                  {/* Decorative Radial Radiance */}
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
                  
                  {/* QR Paper Container */}
                  <div 
                    ref={qrRef}
                    className="p-8 bg-white rounded-[40px] shadow-[0_15px_60px_-15px_rgba(255,255,255,0.1)] mb-8 transition-transform duration-500 hover:scale-[1.03] group cursor-pointer"
                  >
                    <QRCodeSVG
                      value={publicUrl}
                      size={240}
                      level="H"
                      includeMargin={false}
                      imageSettings={{
                        src: "/images/logo.png",
                        x: undefined,
                        y: undefined,
                        height: 52,
                        width: 52,
                        excavate: true,
                      }}
                    />
                  </div>
                  
                  <div className="text-center relative z-10">
                    <h3 className="text-3xl font-black mb-2 tracking-tight">{profile.fullName}</h3>
                    <p className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-8 opacity-80">
                      @{profile.username}
                    </p>
                    
                    <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest truncate max-w-[200px]">
                        {publicUrl.replace("https://", "")}
                      </span>
                      <button 
                        onClick={handleCopy}
                        className="ml-2 p-1.5 rounded-lg hover:bg-white/10 transition-all active:scale-95"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-white/60" />}
                      </button>
                    </div>
                  </div>

                  {/* Trust Badge Overlay */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 opacity-30">
                     <ShieldCheck className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Verified Pass</span>
                  </div>
                </Card>
             </motion.div>
           </AnimatePresence>

           {/* Features Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureItem 
                icon={Smartphone} 
                title="Mobile Optimized" 
                desc="Perfectly sized for phone screens and social stories."
              />
              <FeatureItem 
                icon={Sparkles} 
                title="Vector Quality" 
                desc="Scale to any size without losing crisp sharpness."
              />
           </div>
        </div>

        {/* ─── Right: Controls ─── */}
        <div className="space-y-10">
          
          <div className="space-y-6">
            <h3 className="text-xl font-black tracking-tight">Export Connection</h3>
            <div className="flex flex-col gap-3">
               <Button 
                 onClick={() => downloadQR("png")}
                 className="h-16 w-full rounded-2xl bg-[#0F1021] border border-white/5 hover:bg-white/5 hover:border-primary/50 text-white flex items-center px-6 transition-all group"
               >
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4">
                    <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                 </div>
                 <div className="text-left">
                    <span className="block font-black text-sm uppercase tracking-widest leading-none mb-1">Download PNG</span>
                    <span className="block text-[10px] text-white/30 font-bold uppercase tracking-widest">High-Res Image</span>
                 </div>
                 <ChevronRight className="ml-auto w-4 h-4 opacity-20" />
               </Button>

               <Button 
                 onClick={() => downloadQR("svg")}
                 className="h-16 w-full rounded-2xl bg-[#0F1021] border border-white/5 hover:bg-white/5 hover:border-primary/50 text-white flex items-center px-6 transition-all group"
               >
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <QrIcon className="w-5 h-5 text-primary group-hover:-translate-y-0.5 transition-transform" />
                 </div>
                 <div className="text-left">
                    <span className="block font-black text-sm uppercase tracking-widest leading-none mb-1">Export SVG</span>
                    <span className="block text-[10px] text-white/30 font-bold uppercase tracking-widest">Lossless Vector</span>
                 </div>
                 <ChevronRight className="ml-auto w-4 h-4 opacity-20" />
               </Button>
            </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-xl font-black tracking-tight">Digital Distribution</h3>
             <div className="flex gap-3">
               <Button 
                 onClick={handleCopy}
                 className="flex-1 h-16 rounded-2xl bg-primary hover:brightness-110 font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_-5px_rgba(99,102,241,0.5)]"
               >
                 {copied ? "Link Copied!" : "Copy Active Link"}
               </Button>
               <Button 
                 variant="outline"
                 className="h-16 w-16 rounded-2xl border-white/10 bg-white/5 text-white flex items-center justify-center"
               >
                 <Share2 className="w-6 h-6" />
               </Button>
             </div>
          </div>

          {/* Upsell Card */}
          <div className="relative p-8 rounded-[32px] bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20 overflow-hidden">
             <div className="relative z-10">
               <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  Custom Branding
               </h4>
               <p className="text-sm text-white/40 font-bold leading-relaxed mb-6">
                 Unlock custom colors, edge-styles, and multi-logo center support for your brand.
               </p>
               <Button className="w-full h-12 rounded-xl bg-secondary text-white font-black uppercase tracking-widest text-xs">
                 Upgrade to Creator Pro
               </Button>
             </div>
             {/* Background glow for upsell */}
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/30 blur-[60px] rounded-full pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-start gap-4 transition-all hover:bg-white/[0.04]">
       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
          <Icon className="w-5 h-5 text-white/40" />
       </div>
       <div>
          <h4 className="font-black text-sm mb-1">{title}</h4>
          <p className="text-xs text-white/30 font-medium leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}
