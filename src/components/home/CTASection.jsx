import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mail, Globe, MapPin, ArrowRight } from "lucide-react";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

export default function CTASection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const { lang } = useLang();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const infoCards = [
    { icon: Mail, labelKey: "cta_email_label", valueKey: "cta_email_value", value: "info@ikigaiedu.com", color: "#e84c1e" },
    { icon: Globe, labelKey: "cta_programs_label", valueKey: "cta_programs_value", color: "#1e7a78" },
    { icon: MapPin, labelKey: "cta_reach_label", valueKey: "cta_reach_value", color: "#2d8a4e" },
  ];

  return (
    <section ref={ref} style={{ padding: "140px 0", background: "linear-gradient(180deg, #070f0b 0%, #0a1a12 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", width: "800px", height: "800px", border: "1px solid rgba(232,76,30,0.06)", borderRadius: "50%", transform: "translate(-50%, -50%)", animation: "pulse 4s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: "600px", height: "600px", border: "1px solid rgba(232,180,41,0.06)", borderRadius: "50%", transform: "translate(-50%, -50%)", animation: "pulse 4s ease-in-out 1s infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: "400px", height: "400px", border: "1px solid rgba(45,138,78,0.08)", borderRadius: "50%", transform: "translate(-50%, -50%)", animation: "pulse 4s ease-in-out 2s infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", left: "25%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(232,76,30,0.10) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", right: "25%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(30,122,120,0.10) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", marginBottom: "24px", border: "1px solid rgba(232,76,30,0.3)", background: "rgba(232,76,30,0.08)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <span style={{ color: "#e84c1e", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>{t(lang, "cta_badge")}</span>
        </div>

        <h2 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", lineHeight: 1.05, marginBottom: "24px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
          {t(lang, "cta_heading1")} <br />
          <span style={{ fontStyle: "italic", background: "linear-gradient(135deg, #e8b429, #e84c1e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 30px rgba(232,180,41,0.4))" }}>{t(lang, "cta_heading2")}</span>
        </h2>

        <p style={{ color: "#a8b8a8", fontSize: "18px", maxWidth: "560px", margin: "0 auto 48px", lineHeight: 1.7, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.2s" }}>
          {t(lang, "cta_body")}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginBottom: "80px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.3s" }}>
          <Link to={createPageUrl("Contact")} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #e84c1e, #c52d0a)", boxShadow: "0 8px 40px rgba(232,76,30,0.40), inset 0 1px 0 rgba(255,255,255,0.15)", color: "white", fontWeight: 700, padding: "16px 36px", borderRadius: "100px", fontSize: "14px", letterSpacing: "1px", textDecoration: "none", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(232,76,30,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(232,76,30,0.40), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
          >
            {t(lang, "cta_start")} <ArrowRight size={16} />
          </Link>
          <a href="mailto:info@ikigaiedu.com" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontWeight: 600, padding: "16px 32px", borderRadius: "100px", fontSize: "14px", textDecoration: "none", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          >
            <Mail size={16} /> info@ikigaiedu.com
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.4s" }}>
          {infoCards.map(({ icon: Icon, labelKey, valueKey, value, color }, i) => (
            <div key={i} style={{ padding: "24px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", textAlign: "center", backdropFilter: "blur(10px)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${color}08`; e.currentTarget.style.borderColor = `${color}25`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", background: `${color}18`, border: `1px solid ${color}25` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p style={{ color: "#a8b8a8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px" }}>{t(lang, labelKey)}</p>
              <p style={{ color: "white", fontSize: "14px", fontWeight: 600, margin: 0 }}>{value || t(lang, valueKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}