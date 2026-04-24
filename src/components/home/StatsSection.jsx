import { useEffect, useState, useRef } from "react";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

function CountUp({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  const { lang } = useLang();

  const stats = [
    { value: 500, suffix: "+", labelKey: "stat_lives", color: "#e84c1e", icon: "✦" },
    { value: 200, suffix: "+", labelKey: "stat_workshops", color: "#1e7a78", icon: "◎" },
    { value: 50, suffix: "+", labelKey: "stat_partners", color: "#2d8a4e", icon: "◈" },
    { value: 98, suffix: "%", labelKey: "stat_satisfaction", color: "#e8b429", icon: "★" },
  ];

  return (
    <section style={{ padding: "80px 0", background: "linear-gradient(180deg, #0a1a12 0%, #060f0b 100%)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center", position: "relative", padding: "32px 16px", background: "rgba(255,255,255,0.025)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", transition: "all 0.4s ease" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${stat.color}10`; e.currentTarget.style.borderColor = `${stat.color}30`; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 60px ${stat.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ color: stat.color, fontSize: "20px", marginBottom: "12px", opacity: 0.7 }}>{stat.icon}</div>
              <div style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, fontFamily: "'Playfair Display', serif", background: `linear-gradient(135deg, white 40%, ${stat.color} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1, marginBottom: "8px", filter: `drop-shadow(0 0 20px ${stat.color}40)` }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p style={{ color: "#a8b8a8", fontSize: "13px", fontWeight: 500, letterSpacing: "0.5px" }}>{t(lang, stat.labelKey)}</p>
              <div style={{ position: "absolute", bottom: 0, left: "30%", right: "30%", height: "2px", background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`, borderRadius: "0 0 24px 24px", opacity: 0.6 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}