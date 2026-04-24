import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabaseClient";
import { createPageUrl } from "@/utils";
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        window.location.href = createPageUrl("AdminPanel");
      }
      setChecking(false);
    };
    checkSession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      if (data.session) {
        window.location.href = createPageUrl("AdminPanel");
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#070f0c] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#e84c1e] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070f0c] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#e84c1e] to-[#e8b429] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#e84c1e]/20">
            <img src="https://image2url.com/r2/default/images/1772242108813-4a9261de-a713-4545-a18f-4d2032db2b0c.png" alt="Ikigai" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Ikigai Admin</h1>
          <p className="text-white/40 text-sm tracking-wide uppercase font-semibold">Dashboard Access</p>
        </div>

        <div className="bg-[#0a1510] border border-white/5 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 text-sm animate-shake">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#e84c1e]/50 focus:bg-white/10 transition-all text-sm"
                  placeholder="admin@ikigaiedu.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#e84c1e]/50 focus:bg-white/10 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e84c1e] hover:bg-[#ff5d2e] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#e84c1e]/20 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn size={18} /> Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">← Back to website</a>
        </div>
      </div>
    </div>
  );
}