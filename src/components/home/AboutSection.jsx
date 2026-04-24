import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const { lang } = useLang();

  const pillars = [
    { icon: "✦", labelKey: "pillar_purpose", color: "#e84c1e" },
    { icon: "◎", labelKey: "pillar_evidence", color: "#1e7a78" },
    { icon: "♥", labelKey: "pillar_human", color: "#2d8a4e" },
    { icon: "⚡", labelKey: "pillar_results", color: "#e8b429" },
  ];

  const cards = [
    { icon: "✦", titleKey: "card_purpose_title", descKey: "card_purpose_desc", color: "#e84c1e" },
    { icon: "◈", titleKey: "card_confidence_title", descKey: "card_confidence_desc", color: "#1e7a78" },
    { icon: "◉", titleKey: "card_impact_title", descKey: "card_impact_desc", color: "#2d8a4e" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{ padding: "120px 0", background: "linear-gradient(180deg, #060f0b 0%, #0a1a12 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(30,122,120,0.06)", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", marginBottom: "24px", border: "1px solid rgba(232,76,30,0.3)", background: "rgba(232,76,30,0.08)" }}>
              <span style={{ color: "#e84c1e", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>{t(lang, "about_badge")}</span>
            </div>

            <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", lineHeight: 1.1, marginBottom: "24px" }}>
              {t(lang, "about_heading")} <br />
              <span style={{ fontStyle: "italic", color: "#e8b429", filter: "drop-shadow(0 0 15px rgba(232,180,41,0.3))" }}>{t(lang, "about_heading_highlight")}</span>
            </h2>

            <p style={{ color: "#a8b8a8", fontSize: "17px", lineHeight: 1.7, marginBottom: "16px" }}>{t(lang, "about_p1")}</p>
            <p style={{ color: "#a8b8a8", lineHeight: 1.7, marginBottom: "36px", fontSize: "15px" }}>{t(lang, "about_p2")}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
              {pillars.map((p, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "100px", background: `${p.color}10`, border: `1px solid ${p.color}25`, color: "#c8d5c8", fontSize: "13px", fontWeight: 500, transition: "all 0.3s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${p.color}20`; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${p.color}10`; e.currentTarget.style.color = "#c8d5c8"; }}
                >
                  <span style={{ color: p.color }}>{p.icon}</span> {t(lang, p.labelKey)}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link to={createPageUrl("About")}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontWeight: 600, fontSize: "13px", padding: "12px 24px", borderRadius: "100px", textDecoration: "none", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                {t(lang, "about_story")}
              </Link>
              <Link to={createPageUrl("Contact")}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg, #e84c1e, #c52d0a)", boxShadow: "0 6px 24px rgba(232,76,30,0.30)", color: "white", fontWeight: 700, fontSize: "13px", padding: "12px 24px", borderRadius: "100px", textDecoration: "none", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(232,76,30,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(232,76,30,0.30)"; }}
              >
                {t(lang, "about_work")}
              </Link>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
            {cards.map((card, i) => (
              <div key={i}
                style={{ padding: "28px 24px", borderRadius: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)", display: "flex", alignItems: "flex-start", gap: "20px", transition: "all 0.4s ease", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.background = `${card.color}0a`; e.currentTarget.style.borderColor = `${card.color}25`; e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${card.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: "3px", background: `linear-gradient(180deg, transparent, ${card.color}, transparent)`, borderRadius: "2px", opacity: 0.6 }} />
                <div style={{ width: 52, height: 52, borderRadius: "16px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", background: `linear-gradient(135deg, ${card.color}25, ${card.color}08)`, border: `1px solid ${card.color}25` }}>
                  {card.icon}
                </div>
                <div>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: "17px", marginBottom: "6px" }}>{t(lang, card.titleKey)}</h3>
                  <p style={{ color: "#a8b8a8", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{t(lang, card.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}