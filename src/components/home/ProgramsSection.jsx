import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { supabase } from "@/lib/supabaseClient";
import { ArrowRight } from "lucide-react";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

const fallbackPrograms = {
  en: [
    { slug: "personality-development", icon: "🧠", title: "Personality Development", description: "Deep self-awareness sessions that help you understand your strengths, habits, and blind spots.", color: "#e84c1e" },
    { slug: "public-speaking", icon: "🎤", title: "Public Speaking & Communication", description: "From stage fright to standing ovations. Express ideas with clarity and lasting impact.", color: "#1e7a78" },
    { slug: "career-counselling", icon: "🧭", title: "Career Counselling", description: "Navigate your career with purpose toward roles that align with your values.", color: "#e8b429" },
    { slug: "leadership-team-building", icon: "🤝", title: "Leadership & Team Building", description: "Build the soft power of great leaders — empathy, initiative, and vision.", color: "#2d8a4e" },
    { slug: "soft-skills-training", icon: "⚡", title: "Soft Skills Training", description: "Master adaptability, problem-solving, critical thinking, and professional presence.", color: "#9b5e91" },
    { slug: "workshop-facilitation", icon: "📋", title: "Workshop Facilitation", description: "Custom-designed workshops for institutions and corporations.", color: "#e84c1e" },
  ],
  hi: [
    { slug: "personality-development", icon: "🧠", title: "व्यक्तित्व विकास", description: "गहन आत्म-जागरूकता सत्र जो आपको अपनी शक्तियों और आदतों को समझने में मदद करते हैं।", color: "#e84c1e" },
    { slug: "public-speaking", icon: "🎤", title: "सार्वजनिक वक्तृत्व", description: "मंच के डर से तालियों तक। स्पष्टता और स्थायी प्रभाव के साथ विचार व्यक्त करें।", color: "#1e7a78" },
    { slug: "career-counselling", icon: "🧭", title: "करियर परामर्श", description: "उद्देश्य के साथ अपने करियर को नेविगेट करें।", color: "#e8b429" },
    { slug: "leadership-team-building", icon: "🤝", title: "नेतृत्व और टीम निर्माण", description: "महान नेताओं की सॉफ्ट पावर बनाएं — सहानुभूति, पहल और दृष्टि।", color: "#2d8a4e" },
    { slug: "soft-skills-training", icon: "⚡", title: "सॉफ्ट स्किल्स प्रशिक्षण", description: "अनुकूलनशीलता, समस्या-समाधान और पेशेवर उपस्थिति में महारत हासिल करें।", color: "#9b5e91" },
    { slug: "workshop-facilitation", icon: "📋", title: "कार्यशाला सुविधा", description: "संस्थानों और निगमों के लिए कस्टम-डिज़ाइन की गई कार्यशालाएं।", color: "#e84c1e" },
  ],
};

function ProgramCard({ program, i, lang }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), i * 100); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [i]);

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", padding: "32px", display: "flex", flexDirection: "column",
        background: hovered ? `linear-gradient(135deg, ${program.color}10 0%, rgba(255,255,255,0.03) 100%)` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? program.color + "35" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "24px", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: visible ? (hovered ? "translateY(-8px)" : "translateY(0)") : "translateY(40px)",
        opacity: visible ? 1 : 0,
        boxShadow: hovered ? `0 30px 70px ${program.color}18, inset 0 1px 0 rgba(255,255,255,0.08)` : "none",
        backdropFilter: "blur(10px)", cursor: "pointer",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent 0%, ${program.color} 50%, transparent 100%)`, opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />
      <div style={{ 
        width: 60, height: 60, borderRadius: "18px", marginBottom: "24px", 
        display: "flex", alignItems: "center", justifyContent: "center", 
        fontSize: "30px", fontWeight: 700, fontFamily: "sans-serif",
        background: hovered ? `rgba(255,255,255,0.08)` : "rgba(255,255,255,0.05)", 
        border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}`, 
        color: "white",
        transition: "all 0.4s", 
        transform: hovered ? "scale(1.05)" : "scale(1)", 
        boxShadow: hovered ? `0 12px 30px rgba(0,0,0,0.3)` : "none", 
        overflow: "hidden" 
      }}>
        {program.icon && (program.icon.startsWith('http') || program.icon.startsWith('/')) ? (
          <img src={program.icon} alt={program.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          program.icon
        )}
      </div>
      <h3 style={{ color: "white", fontWeight: 700, fontSize: "18px", fontFamily: "'Playfair Display', serif", marginBottom: "12px", lineHeight: 1.3 }}>{program.title}</h3>
      <p style={{ color: "#a8b8a8", fontSize: "14px", lineHeight: 1.7, flex: 1, marginBottom: "24px" }}>{program.description || program.desc}</p>
      <Link to={createPageUrl("ProgramDetail") + `?slug=${program.slug}`}
        style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: program.color, textDecoration: "none", letterSpacing: "0.5px", transition: "gap 0.3s" }}
      >
        {t(lang, "programs_learn_more")} <ArrowRight size={14} style={{ transition: "transform 0.3s", transform: hovered ? "translateX(4px)" : "translateX(0)" }} />
      </Link>
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, background: `radial-gradient(circle at 100% 100%, ${program.color}15, transparent 70%)`, borderRadius: "0 0 24px 0" }} />
    </div>
  );
}

export default function ProgramsSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [dbPrograms, setDbPrograms] = useState(null);
  const titleRef = useRef(null);
  const { lang } = useLang();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .eq('status', 'active')
          .order('sort_order', { ascending: true })
          .limit(6);
        
        if (error) throw error;
        if (data && data.length > 0) setDbPrograms(data);
      } catch (err) {
        console.error('Programs error:', err);
      }
    };
    fetchPrograms();
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  // Use DB programs or fallback translated list
  const localize = (p) => {
    if (!p) return p;
    if (lang === 'en') return p;
    return {
      ...p,
      title: p.title_hi || p.title,
      description: p.description_hi || p.description,
    };
  };

  const programs = dbPrograms ? dbPrograms.map(localize) : (fallbackPrograms[lang] || fallbackPrograms.en);

  return (
    <section id="what-we-do" style={{ padding: "120px 0", background: "linear-gradient(180deg, #060f0b 0%, #0a1a12 50%, #060f0b 100%)", position: "relative", overflow: "hidden" }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ position: "absolute", left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 30}%`, width: Math.random() * 3 + 2, height: Math.random() * 3 + 2, borderRadius: "50%", opacity: 0.15, background: ["#e84c1e","#e8b429","#2d8a4e","#1e7a78","#9b5e91","#e84c1e"][i], animation: `float ${4 + i}s ease-in-out ${i * 0.5}s infinite`, pointerEvents: "none" }} />
      ))}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "72px", opacity: titleVisible ? 1 : 0, transform: titleVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", marginBottom: "20px", border: "1px solid rgba(232,76,30,0.3)", background: "rgba(232,76,30,0.08)" }}>
            <span style={{ color: "#e84c1e", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>{t(lang, "programs_badge")}</span>
          </div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", marginBottom: "16px" }}>
            {t(lang, "programs_heading")} <span style={{ fontStyle: "italic", color: "#e8b429" }}>{t(lang, "programs_heading_highlight")}</span>
          </h2>
          <p style={{ color: "#a8b8a8", fontSize: "18px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6 }}>
            {t(lang, "programs_subtext")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, i) => <ProgramCard key={i} program={program} i={i} lang={lang} />)}
        </div>

        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <Link to={createPageUrl("Programs")}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontWeight: 600, padding: "14px 32px", borderRadius: "100px", fontSize: "14px", letterSpacing: "0.5px", textDecoration: "none", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            {t(lang, "programs_view_all")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}