import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

const pillarsData = {
  en: [
    { num: "01", color: "#e84c1e", category: "Passion", title: "What You LOVE", desc: "Passion is the fuel. We help you excavate what truly excites and energizes you — beyond external expectations.", icon: "❤" },
    { num: "02", color: "#1e7a78", category: "Profession", title: "What You're GOOD AT", desc: "Skills and strengths shine when you're self-aware. We sharpen what makes you uniquely capable.", icon: "⚡" },
    { num: "03", color: "#2d8a4e", category: "Mission", title: "What World NEEDS", desc: "Purpose expands when your abilities serve something larger than yourself. We connect your gifts to real impact.", icon: "🌍" },
    { num: "04", color: "#e8b429", category: "Vocation", title: "What You Can Be PAID For", desc: "Practical career guidance ensures your purpose is not just fulfilling — it's sustainable and rewarding.", icon: "✦" },
  ],
  hi: [
    { num: "01", color: "#e84c1e", category: "जुनून", title: "जो आप प्यार करते हैं", desc: "जुनून ईंधन है। हम आपको यह पता लगाने में मदद करते हैं कि बाहरी उम्मीदों से परे वास्तव में आपको क्या उत्साहित और ऊर्जावान बनाता है।", icon: "❤" },
    { num: "02", color: "#1e7a78", category: "पेशा", title: "जिसमें आप अच्छे हैं", desc: "जब आप आत्म-जागरूक होते हैं तो कौशल और ताकत चमकती है। हम उसे तेज करते हैं जो आपको विशिष्ट रूप से सक्षम बनाता है।", icon: "⚡" },
    { num: "03", color: "#2d8a4e", category: "मिशन", title: "दुनिया को क्या चाहिए", desc: "उद्देश्य तब फैलता है जब आपकी क्षमताएं खुद से बड़ी किसी चीज़ की सेवा करती हैं। हम आपके उपहारों को वास्तविक प्रभाव से जोड़ते हैं।", icon: "🌍" },
    { num: "04", color: "#e8b429", category: "व्यवसाय", title: "जिसके लिए आपको भुगतान मिल सकता है", desc: "व्यावहारिक करियर मार्गदर्शन यह सुनिश्चित करता है कि आपका उद्देश्य न केवल संतोषजनक है - यह टिकाऊ और पुरस्कृत भी है।", icon: "✦" },
  ],
};

function PillarCard({ p, i, lang }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), i * 150); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [i]);

  const isHi = lang === 'hi';

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", padding: "32px 28px",
        background: hovered ? `linear-gradient(135deg, ${p.color}12 0%, rgba(255,255,255,0.04) 100%)` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? p.color + "40" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "24px", overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: visible ? (hovered ? "translateY(-8px) scale(1.02)" : "translateY(0)") : "translateY(40px)",
        opacity: visible ? 1 : 0,
        boxShadow: hovered ? `0 24px 60px ${p.color}20, inset 0 1px 0 rgba(255,255,255,0.1)` : "none",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Top gradient bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
        opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s",
      }} />

      {/* Background number watermark */}
      <div style={{
        position: "absolute", bottom: "-10px", right: "16px",
        fontSize: "100px", fontWeight: 900, fontFamily: "'Playfair Display', serif",
        color: p.color, opacity: 0.04, lineHeight: 1, userSelect: "none",
        transition: "opacity 0.4s",
        ...(hovered && { opacity: 0.07 }),
      }}>{p.num}</div>

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: "16px", marginBottom: "20px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(135deg, ${p.color}30, ${p.color}10)`,
        border: `1px solid ${p.color}30`,
        fontSize: "22px",
        boxShadow: hovered ? `0 8px 24px ${p.color}30` : "none",
        transition: "all 0.3s",
        transform: hovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
      }}>
        {p.icon}
      </div>

      {/* Category badge */}
      <div style={{
        display: "inline-block", padding: "4px 12px", borderRadius: "100px",
        background: `${p.color}18`, border: `1px solid ${p.color}30`,
        color: p.color, fontSize: "11px", fontWeight: 700, letterSpacing: "1px",
        marginBottom: "12px",
      }}>{p.category}</div>

      <h3 style={{ color: "white", fontWeight: 700, fontSize: "18px", fontFamily: "'Playfair Display', serif", marginBottom: "12px", lineHeight: 1.3 }}>{p.title}</h3>
      <p style={{ color: "#a8b8a8", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>

      {/* Hover arrow */}
      <div style={{
        marginTop: "20px", color: p.color, fontSize: "13px", fontWeight: 600,
        opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)",
        transition: "all 0.3s",
      }}>
        {isHi ? "और अधिक खोजें" : "Discover more"} →
      </div>
    </div>
  );
}

export default function FrameworkSection() {
  const { lang } = useLang();
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  const isHi = lang === 'hi';
  const pillars = pillarsData[lang] || pillarsData.en;

  return (
    <section style={{
      padding: "120px 0",
      background: "linear-gradient(180deg, #070f0b 0%, #0a1a12 50%, #070f0b 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: "800px", height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(45,138,78,0.04) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div
          ref={titleRef}
          style={{
            textAlign: "center", marginBottom: "72px",
            opacity: titleVisible ? 1 : 0, transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "100px", marginBottom: "20px",
            border: "1px solid rgba(232,76,30,0.3)", background: "rgba(232,76,30,0.08)",
          }}>
            <span style={{ color: "#e84c1e", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>{isHi ? "हमारा दृष्टिकोण" : "OUR APPROACH"}</span>
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, fontFamily: "'Playfair Display', serif",
            color: "white", marginBottom: "16px", lineHeight: 1.1,
          }}>{isHi ? "" : "The "} <span style={{ fontStyle: "italic", color: "#e8b429" }}>{isHi ? "इकिगई" : "Ikigai"}</span> {isHi ? "फ्रेमवर्क" : "Framework"}</h2>
          <p style={{ color: "#a8b8a8", fontSize: "18px", maxWidth: "580px", margin: "0 auto", lineHeight: 1.6 }}>
            {isHi ? "हमारे द्वारा चलाए जाने वाले प्रत्येक कार्यक्रम को इन चार स्तंभों के साथ जोड़ा गया है - एक उद्देश्यपूर्ण जीवन के निर्माण खंड।" : "Every program we run is anchored to these four pillars — the building blocks of a purposeful life."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => <PillarCard key={i} p={p} i={i} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}