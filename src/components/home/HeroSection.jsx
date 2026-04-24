import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, ChevronDown } from "lucide-react";
import IkigaiDiagram from "./IkigaiDiagram";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

const avatarColors = ["#e84c1e", "#e8b429", "#2d8a4e", "#1e7a78", "#9b5e91"];
const avatarLetters = ["A", "B", "C", "D", "E"];

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 4,
      color: ["#e84c1e", "#e8b429", "#2d8a4e", "#1e7a78"][Math.floor(Math.random() * 4)],
    }))
  );
  const { lang } = useLang();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const handler = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 20;
  const parallaxY = (mousePos.y - 0.5) * 20;

  return (
    <section style={{
      position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
      overflow: "hidden",
      background: "radial-gradient(ellipse at 60% 40%, #0f2c1e 0%, #0a1f15 40%, #060f0b 100%)",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(rgba(45,138,78,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,138,78,0.5) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
        transition: "transform 0.1s ease",
      }} />
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,76,30,0.15) 0%, transparent 70%)", filter: "blur(40px)", transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`, transition: "transform 0.15s ease" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(30,122,120,0.15) 0%, transparent 70%)", filter: "blur(40px)", transform: `translate(${-parallaxX * 0.5}px, ${-parallaxY * 0.5}px)`, transition: "transform 0.15s ease" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(45,138,78,0.08) 0%, transparent 70%)", filter: "blur(60px)", transform: `translate(-50%, -50%) translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)`, transition: "transform 0.15s ease" }} />

      {particles.map(p => (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: p.color, opacity: 0.4, boxShadow: `0 0 ${p.size * 3}px ${p.color}`, animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`, pointerEvents: "none" }} />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "100px", marginBottom: "32px", border: "1px solid rgba(45,138,78,0.4)", background: "rgba(45,138,78,0.08)", backdropFilter: "blur(10px)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2d8a4e", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ color: "#a8d8a8", fontSize: "12px", fontWeight: 600, letterSpacing: "2px" }}>{t(lang, "hero_badge")}</span>
            </div>

            <h1 style={{ fontSize: "clamp(38px, 10vw, 96px)", fontWeight: 700, lineHeight: 0.92, fontFamily: "'Playfair Display', serif", marginBottom: "28px" }}>
              <span style={{ display: "block", color: "white", textShadow: "0 0 40px rgba(255,255,255,0.1)" }}>{t(lang, "hero_find")}</span>
              <span style={{ display: "block", fontStyle: "italic", background: "linear-gradient(90deg, #e84c1e, #e8b429, #2d8a4e, #1e7a78, #e8b429, #e84c1e)", backgroundSize: "300% 300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "brand-shimmer 4s ease-in-out infinite", filter: "drop-shadow(0 0 20px rgba(232,180,41,0.3))" }}>{t(lang, "hero_reason")}</span>
              <span style={{ display: "block", color: "white", textShadow: "0 0 40px rgba(255,255,255,0.1)" }}>{t(lang, "hero_being")}</span>
            </h1>

            <p style={{ color: "#a8b8a8", fontSize: "18px", lineHeight: 1.7, maxWidth: "420px", marginBottom: "36px" }}>
              {t(lang, "hero_body")}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
              <Link
                to={createPageUrl("Programs")}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #e84c1e 0%, #c52d0a 100%)", boxShadow: "0 8px 32px rgba(232,76,30,0.40), inset 0 1px 0 rgba(255,255,255,0.15)", color: "white", fontWeight: 700, padding: "14px 28px", borderRadius: "100px", fontSize: "13px", letterSpacing: "1px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(232,76,30,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,76,30,0.40), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
              >
                {t(lang, "hero_explore")} <ArrowRight size={15} />
              </Link>
              <Link
                to={createPageUrl("Philosophy")}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontWeight: 600, padding: "14px 28px", borderRadius: "100px", fontSize: "13px", letterSpacing: "1px", textDecoration: "none", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
              >
                {t(lang, "hero_philosophy")}
              </Link>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex" }}>
                {avatarLetters.map((letter, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${avatarColors[i]}cc, ${avatarColors[i]}88)`, border: "2px solid #0a1f15", marginLeft: i === 0 ? 0 : "-8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, boxShadow: `0 0 12px ${avatarColors[i]}40`, zIndex: 5 - i, position: "relative" }}>{letter}</div>
                ))}
              </div>
              <div>
                <p style={{ color: "white", fontWeight: 600, fontSize: "14px", margin: 0 }}>{t(lang, "hero_social_proof")}</p>
                <p style={{ color: "#a8b8a8", fontSize: "12px", margin: 0 }}>{t(lang, "hero_social_sub")}</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)", transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
            <div style={{ transform: `translate(${parallaxX * -0.8}px, ${parallaxY * -0.8}px)`, transition: "transform 0.15s ease", width: "100%", maxWidth: "480px" }}>
              <IkigaiDiagram size={480} />
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "rgba(168,184,168,0.6)", fontSize: "10px", letterSpacing: "3px" }}>
          <span>{t(lang, "hero_scroll")}</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, rgba(168,184,168,0.5), transparent)", animation: "pulse 2s infinite" }} />
        </div>
      </div>
    </section>
  );
}