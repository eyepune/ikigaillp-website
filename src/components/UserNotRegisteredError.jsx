import React from 'react';
import { ShieldAlert, ArrowLeft, Mail } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen bg-[#070f0c] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e84c1e]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-md w-full relative">
        <div className="bg-[#0a1510] border border-white/5 rounded-[32px] p-10 text-center shadow-2xl backdrop-blur-xl">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
            <ShieldAlert size={40} className="text-red-500" />
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-white mb-4 tracking-tight">Access Restricted</h1>
          <p className="text-[#a8b8a8] leading-relaxed mb-8">
            You are not registered to access the admin dashboard. Please contact the system administrator to request permissions.
          </p>
          
          <div className="space-y-4">
            <a href="mailto:info@ikigaiedu.com" className="w-full flex items-center justify-center gap-2 py-4 bg-[#e84c1e] hover:bg-[#ff5d2e] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#e84c1e]/20">
              <Mail size={18} /> Contact Support
            </a>
            
            <button 
              onClick={() => window.location.href = createPageUrl("Home")}
              className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-semibold rounded-2xl transition-all"
            >
              <ArrowLeft size={18} /> Back to Website
            </button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-white/20 text-xs uppercase tracking-widest font-bold">
          Ikigai LLP security protocol
        </p>
      </div>
    </div>
  );
}
