import { useEffect, useRef, useState } from "react";
import IkigaiDiagram from "./IkigaiDiagram";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

export default function PhilosophySection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const { lang } = useLang();

  const segments = [
    { labelKey: "seg_passion", sublabelKey: "seg_passion_sub", color: "#e84c1e" },
    { labelKey: "seg_mission", sublabelKey: "seg_mission_sub", color: "#2d8a4e" },
    { labelKey: "seg_vocation", sublabelKey: "seg_vocation_sub", color: "#e8b429" },
    { labelKey: "seg_profession", sublabelKey: "seg_profession_sub", color: "#1e7a78" },
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
    <section id="philosophy" ref={ref} style={{ padding: "120px 0", background: "linear-gradient(180deg, #0a1a12 0%, #060f0b 100%)", position: "relative", overflow: "hidden" }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: "absolute", left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%`, width: 3, height: 3, borderRadius: "50%", background: ["#e84c1e","#e8b429","#2d8a4e","#1e7a78"][i % 4], opacity: 0.2, animation: `float ${4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`, pointerEvents: "none" }} />
      ))}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div style={{ display: "flex", justifyContent: "center", order: 2, opacity: visible ? 1 : 0, transform: visible ? "translateX(0) scale(1)" : "translateX(-40px) scale(0.95)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.2s" }} className="lg:order-1">
            <IkigaiDiagram size={460} />
          </div>

          <div style={{ order: 1, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }} className="lg:order-2">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", marginBottom: "24px", border: "1px solid rgba(232,76,30,0.3)", background: "rgba(232,76,30,0.08)" }}>
              <span style={{ color: "#e84c1e", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>{t(lang, "philosophy_badge")}</span>
            </div>

            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "white", lineHeight: 1.1, marginBottom: "24px" }}>
              {t(lang, "philosophy_heading")} <br />
              <span style={{ fontStyle: "italic", color: "#e8b429", filter: "drop-shadow(0 0 15px rgba(232,180,41,0.3))" }}>{t(lang, "philosophy_heading_highlight")}</span>
            </h2>

            <p style={{ color: "#a8b8a8", lineHeight: 1.8, marginBottom: "16px", fontSize: "15px" }}>{t(lang, "philosophy_p1")}</p>
            <p style={{ color: "#a8b8a8", lineHeight: 1.8, marginBottom: "40px", fontSize: "15px" }}>{t(lang, "philosophy_p2")}</p>

            <div className="grid grid-cols-2 gap-3">
              {segments.map((seg, i) => (
                <div key={i}
                  style={{ padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: `1px solid ${seg.color}20`, transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${seg.color}0c`; e.currentTarget.style.borderColor = `${seg.color}35`; e.currentTarget.style.transform = "scale(1.03)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = `${seg.color}20`; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${seg.color}, transparent)`, opacity: 0.6 }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: seg.color, marginBottom: "8px", boxShadow: `0 0 8px ${seg.color}60` }} />
                  <p style={{ color: "white", fontWeight: 700, fontSize: "14px", margin: "0 0 3px" }}>{t(lang, seg.labelKey)}</p>
                  <p style={{ color: "#a8b8a8", fontSize: "12px", margin: 0 }}>{t(lang, seg.sublabelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}