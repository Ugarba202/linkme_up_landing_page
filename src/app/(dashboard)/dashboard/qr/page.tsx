"use client";

import { useRef, useState } from "react";
import { 
  Download, 
  Copy, 
  Check, 
  QrCode as QrIcon, 
  Share2, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Info
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function QRPage() {
  const { profile, user, initialized } = useAuth();
  const [copied, setCopied] = useState(false);
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
    <div className="max-w-5xl mx-auto space-y-12 pb-20 relative">
      
      {/* ─── AI-Premium Background Elements ─── */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* ─── Header ─── */}
      <div className="flex flex-col gap-2">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-secondary font-black uppercase tracking-[0.3em] text-[10px]"
        >
          <QrIcon className="w-3 h-3" /> Permanent Pass Token
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
           Your <span className="text-secondary">Digital</span> Identity Pass.
        </h1>
      </div>

      <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start">
        
        {/* ─── Left: High-Fidelity Preview ─── */}
        <div className="space-y-8">
           <Card className="p-10 md:p-16 bg-white/[0.03] backdrop-blur-3xl border-white/5 shadow-2xl rounded-[48px] relative overflow-hidden flex flex-col items-center group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-secondary/20 transition-all duration-700" />
              
              <motion.div 
                ref={qrRef}
                whileHover={{ scale: 1.02 }}
                className="p-8 bg-white rounded-[40px] shadow-[0_15px_60px_-15px_rgba(255,255,255,0.1)] mb-8 cursor-pointer relative"
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
              </motion.div>
              
              <div className="text-center relative z-10 w-full flex flex-col items-center">
                <h3 className="text-2xl font-black mb-1">{profile.fullName}</h3>
                <p className="text-secondary font-black tracking-[0.2em] uppercase text-[10px] mb-8 opacity-60">
                  Verified Digital ID
                </p>
                
                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md max-w-full">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] truncate">
                    {publicUrl.replace("https://", "")}
                  </span>
                  <button 
                    onClick={handleCopy}
                    className="ml-2 p-1 rounded-lg hover:bg-white/10 transition-all active:scale-95 text-white/40"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
           </Card>

           {/* Mobile Awareness Card */}
           <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                 <ShieldCheck className="w-5 h-5 text-secondary" />
              </div>
              <div>
                 <h4 className="font-black text-sm mb-1 uppercase tracking-widest">Permanent Token Technology</h4>
                 <p className="text-xs text-white/30 font-medium leading-relaxed">
                   This QR code encodes your permanent user ID. You can add, remove, or change your social links anytime—your printed QR will **never** need to be updated.
                 </p>
              </div>
           </div>
        </div>

        {/* ─── Right: Export & Distribution ─── */}
        <div className="space-y-10">
          
          <div className="space-y-6">
            <h3 className="text-lg font-black tracking-tight px-2 flex items-center gap-2">
              <Download className="w-4 h-4 text-secondary" /> Export Connection
            </h3>
            <div className="flex flex-col gap-3">
               <button 
                 onClick={() => downloadQR("png")}
                 className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-[28px] hover:bg-white/[0.04] hover:border-white/10 transition-all group active:scale-[0.98] text-left"
               >
                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                 </div>
                 <div>
                    <p className="font-black text-xs uppercase tracking-widest leading-none mb-1">Download Image</p>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest truncate">High-Resolution PNG</p>
                 </div>
                 <ChevronRight className="ml-auto w-4 h-4 text-white/10" />
               </button>

               <button 
                 onClick={() => downloadQR("svg")}
                 className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-[28px] hover:bg-white/[0.04] hover:border-white/10 transition-all group active:scale-[0.98] text-left"
               >
                 <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/10 flex items-center justify-center shrink-0">
                    <QrIcon className="w-4 h-4 text-secondary" />
                 </div>
                 <div>
                    <p className="font-black text-xs uppercase tracking-widest leading-none mb-1">Export Vector</p>
                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest truncate">Lossless SVG Format</p>
                 </div>
                 <ChevronRight className="ml-auto w-4 h-4 text-white/10" />
               </button>
            </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-lg font-black tracking-tight px-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-secondary" /> Distribution
             </h3>
             <div className="flex gap-3">
               <Button 
                 onClick={handleCopy}
                 className="flex-1 h-16 rounded-2xl bg-secondary hover:brightness-110 font-black uppercase tracking-widest text-xs shadow-glow-sm"
               >
                 {copied ? "Link Copied!" : "Copy URL"}
               </Button>
               <Button 
                 variant="outline"
                 className="h-16 w-16 rounded-2xl border-white/10 bg-white/5 text-white flex items-center justify-center active:scale-95 transition-all"
               >
                 <Share2 className="w-5 h-5" />
               </Button>
             </div>
          </div>

          {/* Tips Card */}
          <div className="p-8 rounded-[40px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group">
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-secondary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Pro Tip</span>
               </div>
               <p className="text-xs text-white/40 font-bold leading-relaxed">
                 Place this QR code on your LinkedIn banner, business cards, or event lanyard to instantly bridge your physical and digital presence.
               </p>
             </div>
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-secondary/20 transition-all duration-1000" />
          </div>

        </div>
      </div>
    </div>
  );
}

