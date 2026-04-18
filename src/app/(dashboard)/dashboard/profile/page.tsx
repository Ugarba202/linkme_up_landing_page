"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { 
  Camera, 
  Loader2, 
  Save, 
  User, 
  CheckCircle,
  AtSign,
  Type,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ProfileFormData {
  fullName: string;
  username: string;
  bio: string;
}

export default function ProfileEditor() {
  const { profile, user, initialized } = useAuth();
  const { updateProfileData } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "",
      username: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName || "",
        username: profile.username || "",
        bio: profile.bio || "",
      });
    }
  }, [profile, reset]);

  if (!initialized || !profile || !user) return null;

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMsg("");

    try {
      if (!data.username.trim() || !data.fullName.trim()) {
        throw new Error("Display Name and Username are required.");
      }
      
      const cleanUsername = data.username.toLowerCase().trim();
      await new Promise(r => setTimeout(r, 800));

      updateProfileData({
        fullName: data.fullName,
        username: cleanUsername,
        bio: data.bio,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    setErrorMsg("");

    try {
      await new Promise(r => setTimeout(r, 1000));
      const localUrl = URL.createObjectURL(file);
      updateProfileData({ avatarUrl: localUrl });
    } catch (err: any) {
      setErrorMsg("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      
      {/* ─── Header ─── */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
           Digital <span className="text-primary">Identity</span>
        </h1>
        <p className="text-white/40 text-lg max-w-2xl font-medium">
          Manage how the world sees you. Your identity is your most valuable asset.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,380px] gap-10 items-start">
        
        {/* ─── Left: Form ─── */}
        <div className="space-y-8">
          <Card className="bg-[#0F1021]/60 backdrop-blur-xl border-white/5 p-8 md:p-10 rounded-[40px] relative overflow-hidden">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-10">
              
              {/* Profile Header (Avatar Integration) */}
              <div className="flex flex-col md:flex-row items-center gap-8 border-b border-white/5 pb-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-primary animate-gradient shadow-glow">
                    <div className="w-full h-full rounded-full bg-[#050510] flex items-center justify-center overflow-hidden relative">
                       {isUploading ? (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 z-20">
                           <Loader2 className="w-6 h-6 animate-spin text-primary" />
                           <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Optimizing</span>
                        </div>
                      ) : null}
                      
                      {profile.avatarUrl ? (
                        <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-white/10" />
                      )}
                      
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      >
                         <Camera className="w-8 h-8 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-2xl bg-primary flex items-center justify-center border-4 border-[#050510] shadow-xl">
                     <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-2">
                   <h3 className="text-2xl font-black tracking-tight">Profile Essence</h3>
                   <p className="text-white/30 text-sm font-medium leading-relaxed max-w-[300px]">
                     Upload a high-resolution photo. Recommended size: 1024x1024px.
                   </p>
                   <Button 
                    type="button"
                    variant="ghost" 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary hover:text-primary-light hover:bg-primary/10 font-bold h-auto p-0 text-xs uppercase tracking-widest"
                   >
                     Update Picture <ArrowRight className="ml-2 w-3 h-3" />
                   </Button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">
                     <Type className="w-3 h-3" /> Display Name
                   </label>
                   <Input 
                     {...register("fullName")}
                     className="h-16 bg-white/[0.03] border-white/5 focus-visible:ring-primary rounded-[22px] px-6 text-lg font-bold" 
                     placeholder="John Doe"
                   />
                </div>
                <div className="space-y-3">
                   <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">
                     <AtSign className="w-3 h-3" /> Unique Handle
                   </label>
                   <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 text-sm font-black uppercase tracking-widest pointer-events-none">
                        u/
                      </span>
                      <Input 
                        {...register("username")}
                        className="pl-12 h-16 bg-white/[0.03] border-white/5 focus-visible:ring-primary rounded-[22px] px-6 text-lg font-bold" 
                        placeholder="username"
                      />
                   </div>
                </div>
              </div>

              <div className="space-y-3">
                 <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">
                   <FileText className="w-3 h-3" /> Public Biography
                 </label>
                 <textarea 
                   {...register("bio")}
                   className="w-full min-h-[160px] bg-white/[0.03] border border-white/5 focus:ring-2 focus:ring-primary rounded-[32px] px-6 py-5 text-base font-medium leading-relaxed text-white placeholder:text-white/10 outline-none transition-all"
                   placeholder="Describe your essence in a few words..."
                 />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 ">
                 {errorMsg && (
                    <p className="text-red-500 font-bold text-sm bg-red-500/10 px-4 py-2 rounded-xl flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> {errorMsg}
                    </p>
                 )}
                 <div className="flex-1" />
                 
                 <div className="flex items-center gap-6">
                    <AnimatePresence>
                      {saveSuccess && (
                        <motion.span 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 text-green-500 font-black text-[10px] uppercase tracking-widest"
                        >
                           <CheckCircle className="w-4 h-4" /> Sync Successful
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <Button 
                      type="submit"
                      disabled={isSaving}
                      className="h-16 px-12 bg-primary hover:brightness-110 font-black uppercase tracking-widest text-sm rounded-[24px] shadow-glow min-w-[200px]"
                    >
                      {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : "Save Changes"}
                    </Button>
                 </div>
              </div>

            </form>
          </Card>
        </div>

        {/* ─── Right: Side Info ─── */}
        <div className="space-y-8">
           <Card className="p-8 bg-gradient-to-br from-white/[0.04] to-transparent border-white/5 rounded-[40px]">
              <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-primary" /> Privacy Control
              </h4>
              <p className="text-white/40 text-sm font-medium leading-relaxed mb-8">
                Your profile is currently <span className="text-white">Public</span>. Anyone with your link or QR code can view your active connections.
              </p>
              
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <Globe className="w-4 h-4 text-white/30" />
                       <span className="text-xs font-bold">Search Visibility</span>
                    </div>
                    <div className="w-10 h-5 bg-primary/20 rounded-full relative">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full" />
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <Smartphone className="w-4 h-4 text-white/30" />
                       <span className="text-xs font-bold">Show App Badge</span>
                    </div>
                    <div className="w-10 h-5 bg-primary/20 rounded-full relative">
                       <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full" />
                    </div>
                 </div>
              </div>
           </Card>

           <div className="p-8 rounded-[40px] bg-primary/5 border border-primary/20 border-dashed text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="text-base font-black mb-2">Build Your Brand</h4>
              <p className="text-[11px] text-white/30 font-bold leading-relaxed">
                Consistency is key. Use the same Display Name across all social platforms to make it easier for people to find you.
              </p>
           </div>
        </div>

      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleAvatarUpload}
      />
    </div>
  );
}
