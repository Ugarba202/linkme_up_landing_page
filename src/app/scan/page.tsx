"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Zap, 
  ZapOff, 
  Camera, 
  AlertCircle, 
  X,
  Scan,
  Maximize2
} from "lucide-react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Button } from "@/components/ui/button";

export default function ScanPage() {
  const router = useRouter();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionState, setPermissionState] = useState<"prompt" | "granted" | "denied">("prompt");
  const [isFlashOn, setIsFlashOn] = useState(false);

  // ─── Initialization ────────────────────────────────────────────────────────

  const startScanner = useCallback(async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
      }

      const scanner = new Html5Qrcode("scanner-region");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        () => {
          // Failure callback - usually fine to ignore as it fires per frame
        }
      );

      setIsScanning(true);
      setPermissionState("granted");
      setError(null);
    } catch (err: any) {
      console.error("Scanner Error:", err);
      if (err.toString().includes("Permission denied")) {
        setPermissionState("denied");
      } else {
        setError("Unable to access camera. Please ensure it's not being used by another app.");
      }
    }
  }, []);

  const handleScanSuccess = useCallback((text: string) => {
    // Only handle LinkMeUp URLs
    // Example: https://linkmeup.app/u/johndoe or just /u/johndoe
    if (text.includes("/u/")) {
      const username = text.split("/u/")[1].split("?")[0];
      if (username) {
        // Vibrate for success if supported
        if ("vibrate" in navigator) navigator.vibrate(200);
        
        // Stop scanner before navigating
        scannerRef.current?.stop().then(() => {
          router.push(`/u/${username}`);
        });
      }
    } else {
      // Toast or fallback for non-linkmeup codes
      console.log("Not a LinkMeUp code:", text);
    }
  }, [router]);

  useEffect(() => {
    startScanner();
    return () => {
      scannerRef.current?.stop().catch(console.error);
    };
  }, [startScanner]);

  // ─── UI Components ───────────────────────────────────────────────────────

  if (permissionState === "denied") {
    return <PermissionErrorView onRetry={startScanner} />;
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col">
      
      {/* ─── Scanner Feed ─── */}
      <div className="absolute inset-0 z-0 bg-neutral-900 flex items-center justify-center">
        <div id="scanner-region" className="w-full h-full object-cover" />
      </div>

      {/* ─── UI Overlay ─── */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between px-6 pt-12 pointer-events-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white"
          >
            <X className="w-6 h-6" />
          </Button>
          
          <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
            <Scan className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-white/50">Live Scan</span>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsFlashOn(!isFlashOn)}
            className={`w-12 h-12 rounded-2xl backdrop-blur-md border border-white/10 transition-all ${
              isFlashOn ? "bg-primary text-white" : "bg-black/40 text-white"
            }`}
          >
            {isFlashOn ? <Zap className="w-6 h-6" /> : <ZapOff className="w-6 h-6" />}
          </Button>
        </div>

        {/* Scanning Target */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />
            
            {/* Animated Scan Line */}
            <motion.div 
               animate={{ top: ["10%", "90%", "10%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute left-4 right-4 h-1 bg-primary/50 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-20"
            />
          </div>

          <p className="mt-12 text-white/60 text-sm font-bold uppercase tracking-[3px] text-center max-w-[200px]">
            Place QR code inside the frame
          </p>
        </div>

        {/* Footer info */}
        <div className="px-6 pb-12 flex flex-col items-center">
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-500 font-bold text-sm">
               <AlertCircle className="w-5 h-5" />
               {error}
            </div>
          )}
          
          <div className="w-full max-w-[300px] p-6 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[32px] text-center">
             <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Maximize2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Digital Recognition</span>
             </div>
             <p className="text-white font-black text-lg">Instant Pass Discovery</p>
          </div>
        </div>

      </div>

      {/* ─── Background Gradients (Aesthetic) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

    </div>
  );
}

function PermissionErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 rounded-[32px] bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
        <Camera className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-2xl font-black mb-4">Camera Access Denied</h1>
      <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xs">
        We need camera permissions to scan LinkMeUp passes. Please enable access in your browser settings.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button 
          onClick={onRetry}
          className="h-16 bg-white text-black hover:bg-white/90 rounded-2xl font-black uppercase tracking-widest"
        >
          Try Again
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.history.back()}
          className="h-16 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-2xl font-bold"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
