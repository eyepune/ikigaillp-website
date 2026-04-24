import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";
import { supabase } from "@/lib/supabaseClient";

const staticTestimonials = [
  { 
    text: "Ikigai changed how I see myself. The personality development sessions helped me recognize strengths I never knew I had. I walked into my first job interview with complete confidence.", 
    text_hi: "इकिगई ने खुद को देखने का मेरा नजरिया बदल दिया। व्यक्तित्व विकास सत्रों ने मुझे उन शक्तियों को पहचानने में मदद की जिन्हें मैं कभी नहीं जानता था। मैं पूरे आत्मविश्वास के साथ अपने पहले नौकरी साक्षात्कार में गया।",
    name: "Priya Sharma", 
    role: "Graduate Student, Delhi University", 
    role_hi: "स्नातक छात्र, दिल्ली विश्वविद्यालय",
    initials: "PS", 
    color: "#e84c1e" 
  },
  { 
    text: "The public speaking workshop was transformative. I used to dread presentations. Now I actually look forward to them. The coaches have a gift for making you feel capable.", 
    text_hi: "सार्वजनिक बोलने की कार्यशाला परिवर्तनकारी थी। मैं प्रस्तुतियों से डरता था। अब मैं वास्तव में उनका इंतजार करता हूं। प्रशिक्षकों के पास आपको सक्षम महसूस कराने का हुनर है।",
    name: "Rohan Mehta", 
    role: "Software Engineer, Bangalore", 
    role_hi: "सॉफ्टवेयर इंजीनियर, बैंगलोर",
    initials: "RM", 
    color: "#1e7a78" 
  },
  { 
    text: "We brought Ikigai in for a team building day and it exceeded every expectation. The energy, the activities, the insights — our team still talks about it months later.", 
    text_hi: "हम टीम बिल्डिंग डे के लिए इकिगई को लेकर आए और इसने हर उम्मीद को पार कर लिया। ऊर्जा, गतिविधियाँ, अंतर्दृष्टि — हमारी टीम अभी भी महीनों बाद इसके बारे में बात करती है।",
    name: "Anika Kapoor", 
    role: "HR Director, Tech Startup", 
    role_hi: "एचआर निदेशक, टेक स्टार्टअप",
    initials: "AK", 
    color: "#2d8a4e" 
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tList, setTList] = useState(staticTestimonials);
  const ref = useRef(null);
  const { lang } = useLang();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('status', 'active')
          .order('sort_order', { ascending: false });
        
        if (error) throw error;
        
        const localize = (t) => {
          if (lang === 'en') return t;
          return {
            ...t,
            role: t.role_hi || t.role,
            text: t.text_hi || t.text,
          };
        };

        const filtered = (data || []).filter(t => t.page_context === "home" || t.page_context === "all").map(localize);
        if (filtered.length > 0) setTList(filtered);
      } catch (err) {
        console.error('Testimonials error:', err);
      }
    };
    fetchTestimonials();
  }, [lang]);


  const current = tList[active] || tList[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const navigate = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(a => (a + dir + tList.length) % tList.length);
      setAnimating(false);
    }, 300);
  };

  return (
    <section ref={ref} style={{ padding: "120px 0", background: "linear-gradient(180deg, #0a1a12 0%, #060f0b 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", left: "5%", fontSize: "300px", lineHeight: 1, color: "#2d8a4e", opacity: 0.03, fontFamily: "serif", userSelect: "none", pointerEvents: "none" }}>"</div>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: "600px", height: "400px", background: `radial-gradient(ellipse, ${current.color}08 0%, transparent 70%)`, transform: "translate(-50%, -50%)", transition: "background 0.6s ease", pointerEvents: "none" }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        <div style={{ textAlign: "center", marginBottom: "64px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", marginBottom: "16px", border: "1px solid rgba(232,76,30,0.3)", background: "rgba(232,76,30,0.08)" }}>
            <span style={{ color: "#e84c1e", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>{t(lang, "testimonials_badge")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white" }}>
            {t(lang, "testimonials_heading")} <span style={{ fontStyle: "italic", color: "#e8b429" }}>{t(lang, "testimonials_heading_highlight")}</span>
          </h2>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
          <div style={{ position: "relative", padding: "56px 64px", background: "rgba(255,255,255,0.03)", border: `1px solid ${current.color}25`, borderRadius: "32px", backdropFilter: "blur(20px)", boxShadow: `0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`, transition: "all 0.5s ease" }}>
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "2px", background: `linear-gradient(90deg, transparent, ${current.color}, transparent)`, borderRadius: "0 0 2px 2px" }} />
            <div style={{ width: 52, height: 52, borderRadius: "16px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${current.color}30, ${current.color}10)`, border: `1px solid ${current.color}30`, fontSize: "26px", color: current.color, boxShadow: `0 8px 24px ${current.color}20`, transition: "all 0.5s ease" }}>"</div>

            <p style={{ color: "#d0dcd0", fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.7, fontFamily: "'Playfair Display', serif", fontStyle: "italic", marginBottom: "40px", opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "all 0.3s ease" }}>
              "{current.text}"
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {current.photo ? (
                <img src={current.photo} alt={current.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: `2px solid ${current.color}50` }} />
              ) : (
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${current.color}cc, ${current.color}66)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "18px", boxShadow: `0 8px 24px ${current.color}40`, border: `2px solid ${current.color}50`, transition: "all 0.5s ease" }}>{current.initials || current.name?.[0]}</div>
              )}
              <div>
                <p style={{ color: "white", fontWeight: 700, margin: 0, fontSize: "15px" }}>{current.name}</p>
                <p style={{ color: "#a8b8a8", margin: 0, fontSize: "13px" }}>{current.role}</p>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "24px", right: "32px", display: "flex", gap: "4px" }}>
              {[...Array(current.rating || 5)].map((_, i) => <span key={i} style={{ color: "#e8b429", fontSize: "12px", opacity: 0.6 }}>★</span>)}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "40px" }}>
            <button onClick={() => navigate(-1)} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "scale(1.1)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "scale(1)"; }}>
              <ChevronLeft size={18} />
            </button>
            <div style={{ display: "flex", gap: "8px" }}>
              {tList.map((item, i) => (
                <button key={i} onClick={() => setActive(i)} style={{ height: 6, borderRadius: "3px", cursor: "pointer", border: "none", background: i === active ? (item.color || "#e84c1e") : "rgba(255,255,255,0.2)", width: i === active ? 28 : 6, transition: "all 0.4s ease", boxShadow: i === active ? `0 0 12px ${item.color || "#e84c1e"}60` : "none" }} />
              ))}
            </div>
            <button onClick={() => navigate(1)} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "scale(1.1)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "scale(1)"; }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}