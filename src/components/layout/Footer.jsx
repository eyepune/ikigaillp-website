import { Link, useNavigate } from "react-router-dom";

import { createPageUrl } from "@/utils";
import { Mail, MapPin, Phone, Instagram, Linkedin, Send, Lock, Apple, Play } from "lucide-react";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";
import { supabase } from "@/lib/supabaseClient";

const programSlugs = [
  { slug: "personality-development", label_en: "Personality Development", label_hi: "व्यक्तित्व विकास" },
  { slug: "public-speaking",          label_en: "Public Speaking",          label_hi: "सार्वजनिक वक्तृत्व" },
  { slug: "career-counselling",       label_en: "Career Counselling",       label_hi: "करियर परामर्श" },
  { slug: "leadership-team-building", label_en: "Leadership & Team Building", label_hi: "नेतृत्व और टीम निर्माण" },
  { slug: "soft-skills-training",     label_en: "Soft Skills Training",     label_hi: "सॉफ्ट स्किल्स प्रशिक्षण" },
  { slug: "workshop-facilitation",    label_en: "Workshop Facilitation",    label_hi: "कार्यशाला सुविधा" },
];

const navPages = [
  { label_en: "About Us",    label_hi: "हमारे बारे में",  page: "About" },
  { label_en: "Programs",    label_hi: "कार्यक्रम",       page: "Programs" },
  { label_en: "Philosophy",  label_hi: "दर्शन",            page: "Philosophy" },
  { label_en: "Mission",     label_hi: "मिशन",             page: "Mission" },
  { label_en: "Updates",     label_hi: "अपडेट",            page: "Updates" },
  { label_en: "Contact",     label_hi: "संपर्क",           page: "Contact" },
];

const legalLinks = [
  { label_key: "footer_privacy",      page: "PrivacyPolicy" },
  { label_key: "footer_terms",        page: "TermsAndConditions" },
  { label_key: "footer_accessibility", page: "AccessibilityPolicy" },
];

const socials = [
  { SIcon: Instagram, href: "https://www.instagram.com/ikigai_edutech?utm_source=qr&igsh=OTZta3Rpdms5aTZ3", label: "Instagram" },
  { SIcon: Linkedin,  href: "https://www.linkedin.com/in/ikigai-edutech-a279b83b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
  { SIcon: Send,      href: "https://t.me/ikigai_10", label: "Telegram Group" },
  { SIcon: Send,      href: "https://t.me/ikigai1010", label: "Telegram Channel" },
];

export default function Footer() {
  const { lang } = useLang();
  const navigate = useNavigate();

  const handleAdminClick = async (e) => {
    e.preventDefault();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate(createPageUrl("AdminPanel"));
      } else {
        navigate(createPageUrl("AdminLogin"));
      }
    } catch {
      navigate(createPageUrl("AdminLogin"));
    }
  };

  return (
    <footer style={{ background: "#050d09", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>

      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent 0%, #e84c1e 25%, #e8b429 50%, #2d8a4e 75%, transparent 100%)" }} />

      {/* Glow */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(45,138,78,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ paddingTop: 64, paddingBottom: 40, position: "relative" }}>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">

          {/* Brand col */}
          <div className="lg:col-span-4">
            <Link to={createPageUrl("Home")} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, textDecoration: "none" }}>
              <div style={{ position: "relative", width: 52, height: 52 }}>
                <div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: "conic-gradient(from 0deg, rgba(232,76,30,0.25), rgba(232,180,41,0.25), rgba(45,138,78,0.25), rgba(30,122,120,0.25), rgba(232,76,30,0.25))", animation: "spin-slow 10s linear infinite" }} />
                <img src="https://image2url.com/r2/default/images/1772242108813-4a9261de-a713-4545-a18f-4d2032db2b0c.png" alt="Ikigai" style={{ width: 52, height: 52, objectFit: "contain", position: "relative", filter: "drop-shadow(0 0 8px rgba(232,180,41,0.2))" }} />
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 800, fontSize: 20, letterSpacing: 1 }}>ikigaiE</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase" }}>Edu & Training</div>
              </div>
            </Link>

            <p style={{ color: "#7a9c8a", fontSize: 13, lineHeight: 1.8, marginBottom: 24, maxWidth: 300 }}>
              {t(lang, "footer_mission")}
            </p>

            <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
              {socials.map(({ SIcon, href, label }) => (
                <a key={label} href={href} aria-label={label} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7a9c8a", background: "rgba(255,255,255,0.02)", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#e84c1e"; e.currentTarget.style.color = "#e84c1e"; e.currentTarget.style.background = "rgba(232,76,30,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#7a9c8a"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "none"; }}>
                  <SIcon size={14} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { Icon: Mail,   href: "mailto:info@ikigaiedu.com", text: "info@ikigaiedu.com", color: "#e84c1e" },
                { Icon: Phone,  href: "tel:+918828127133",         text: "+91 88281 27133",    color: "#1e7a78" },
              ].map(({ Icon, href, text, color }) => (
                <a key={text} href={href} style={{ display: "flex", alignItems: "center", gap: 10, color: "#7a9c8a", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#7a9c8a"; }}>
                  <Icon size={13} style={{ color, flexShrink: 0 }} />
                  {text}
                </a>
              ))}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#7a9c8a", fontSize: 13 }}>
                <MapPin size={13} style={{ color: "#2d8a4e", marginTop: 2, flexShrink: 0 }} />
                <span style={{ lineHeight: 1.6 }}>{t(lang, "footer_location")}</span>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="lg:col-span-1" />

          {/* Navigate */}
          <div className="lg:col-span-2">
            <h4 style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, margin: "0 0 20px" }}>{t(lang, "footer_navigate")}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {navPages.map(item => (
                <li key={item.page}>
                  <Link to={createPageUrl(item.page)} style={{ color: "#7a9c8a", textDecoration: "none", fontSize: 13, display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.paddingLeft = "4px"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#7a9c8a"; e.currentTarget.style.paddingLeft = "0"; }}>
                    {lang === "hi" ? item.label_hi : item.label_en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-3">
            <h4 style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 20px" }}>{t(lang, "footer_programs")}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {programSlugs.map(p => (
                <li key={p.slug}>
                  <Link to={createPageUrl("ProgramDetail") + `?slug=${p.slug}`} style={{ color: "#7a9c8a", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#7a9c8a"; }}>
                    {lang === "hi" ? p.label_hi : p.label_en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App download */}
          <div className="lg:col-span-2">
            <h4 style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 20px" }}>{t(lang, "footer_get_app")}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { AIcon: Apple, labelKey: "footer_app_store",    bg: "rgba(232,76,30,0.08)",  border: "rgba(232,76,30,0.18)", href: "https://apps.apple.com/in/app/myinstitute/id1472483563" },
                { AIcon: Play,  labelKey: "footer_google_play",  bg: "rgba(45,138,78,0.08)",  border: "rgba(45,138,78,0.18)", href: "https://play.google.com/store/apps/details?id=co.george.tlsih" },
              ].map(({ AIcon, labelKey, bg, border, href }) => (
                <a key={labelKey} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: bg, border: `1px solid ${border}`, borderRadius: 10, textDecoration: "none", color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.transform = "translateX(3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}>
                  <AIcon size={16} /> {t(lang, labelKey)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: 0 }}>
              © {new Date().getFullYear()} {t(lang, "footer_copyright")}
            </p>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, margin: 0 }}>
              {t(lang, "footer_developed_by")}{" "}
              <a href="https://www.eyepune.com" target="_blank" rel="noopener noreferrer" style={{ color: "#800000", textDecoration: "none", fontWeight: 600 }}>EyE PunE</a>
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
            {legalLinks.map(item => (
              <Link key={item.page} to={createPageUrl(item.page)} style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}>
                {t(lang, item.label_key)}
              </Link>
            ))}
            <span style={{ color: "rgba(255,255,255,0.08)" }}>|</span>
            <a href="#" onClick={handleAdminClick} style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.2)", fontSize: 12, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}>
              <Lock size={10} /> {t(lang, "footer_admin")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}