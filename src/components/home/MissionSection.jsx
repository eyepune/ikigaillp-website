import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

export default function MissionSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const { lang } = useLang();

  const values = [
    { icon: "✦", labelKey: "val_confidence", descKey: "val_confidence_desc", color: "#e84c1e" },
    { icon: "◎", labelKey: "val_clarity", descKey: "val_clarity_desc", color: "#1e7a78" },
    { icon: "♥", labelKey: "val_meaning", descKey: "val_meaning_desc", color: "#2d8a4e" },
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
    <section ref={ref} style={{ padding: "120px 0", background: "linear-gradient(180deg, #070f0b 0%, #0a1a12 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", right: "5%", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(30,122,120,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "250px", height: "250px", borderRadius: "50%", border: "1px solid rgba(232,76,30,0.07)", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", marginBottom: "24px", border: "1px solid rgba(232,76,30,0.3)", background: "rgba(232,76,30,0.08)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
            <span style={{ color: "#e84c1e", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>{t(lang, "mission_badge")}</span>
          </div>

          <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", lineHeight: 1.05, marginBottom: "24px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
            {t(lang, "mission_heading1")} <br />
            <span style={{ fontStyle: "italic", color: "#e8b429", filter: "drop-shadow(0 0 20px rgba(232,180,41,0.3))" }}>{t(lang, "mission_heading2")}</span>
          </h2>

          <p style={{ color: "#a8b8a8", fontSize: "18px", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto 80px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.2s" }}>
            {t(lang, "mission_body")}{" "}
            <span style={{ color: "#e84c1e", fontWeight: 700 }}>{t(lang, "mission_confidence")}</span>,{" "}
            <span style={{ color: "#1e7a78", fontWeight: 700 }}>{t(lang, "mission_clarity")}</span>{lang === "en" ? " and " : " और "}{" "}
            <span style={{ color: "#2d8a4e", fontWeight: 700 }}>{t(lang, "mission_meaning")}</span>.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i}
                style={{ padding: "40px 28px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "24px", backdropFilter: "blur(10px)", position: "relative", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transitionDelay: `${0.3 + i * 0.1}s` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${v.color}0c`; e.currentTarget.style.borderColor = `${v.color}30`; e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 24px 60px ${v.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "2px", background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`, opacity: 0.7 }} />
                <div style={{ width: 64, height: 64, borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", background: `linear-gradient(135deg, ${v.color}25, ${v.color}08)`, border: `1px solid ${v.color}25`, fontSize: "26px", boxShadow: `0 8px 24px ${v.color}20` }}>
                  {v.icon}
                </div>
                <h3 style={{ color: v.color, fontWeight: 800, fontSize: "22px", marginBottom: "12px", letterSpacing: "0.5px" }}>{t(lang, v.labelKey)}</h3>
                <p style={{ color: "#a8b8a8", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{t(lang, v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}