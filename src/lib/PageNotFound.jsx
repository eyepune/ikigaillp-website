import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { Compass, Home, ShieldAlert } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function PageNotFound() {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                return { user: session?.user || null, isAuthenticated: !!session };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });
    
    return (
        <div className="min-h-screen bg-[#070f0c] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#2d8a4e]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#e8b429]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-lg w-full relative">
                <div className="text-center">
                    {/* 404 Error Code */}
                    <div className="relative inline-block mb-12">
                        <h1 className="text-[180px] font-black leading-none text-white/5 font-serif select-none">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Compass size={80} className="text-[#e84c1e] animate-[spin_10s_linear_infinite]" />
                        </div>
                    </div>
                    
                    {/* Main Message */}
                    <div className="space-y-4 mb-12">
                        <h2 className="text-4xl font-serif font-bold text-white">Lost your way?</h2>
                        <p className="text-[#a8b8a8] text-lg max-w-sm mx-auto leading-relaxed">
                            The page <span className="text-white font-semibold">"/{pageName}"</span> seems to have drifted away into the void.
                        </p>
                    </div>
                    
                    {/* Admin Note */}
                    {isFetched && authData?.isAuthenticated && (
                        <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-3xl text-left backdrop-blur-sm max-w-md mx-auto">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#e8b429]/10 border border-[#e8b429]/20 flex items-center justify-center text-[#e8b429]">
                                    <ShieldAlert size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase tracking-wider mb-1">Admin Insight</p>
                                    <p className="text-sm text-[#a8b8a8] leading-relaxed">
                                        This path hasn't been mapped yet. If this is a required page, ensure it's defined in the application config.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Action Button */}
                    <button 
                        onClick={() => window.location.href = '/'} 
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#070f0c] font-bold rounded-2xl hover:bg-[#e8b429] transition-all duration-300 shadow-xl"
                    >
                        <Home size={18} />
                        Go Back Home
                    </button>
                </div>
            </div>
        </div>
    );
}