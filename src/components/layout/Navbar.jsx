import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Download } from "lucide-react";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const { lang, setLang } = useLang();

  const navLinks = [
    { labelKey: "nav_about", page: "About" },
    { labelKey: "nav_programs", page: "Programs" },
    { labelKey: "nav_philosophy", page: "Philosophy" },
    { labelKey: "nav_updates", page: "Updates" },
    { labelKey: "nav_contact", page: "Contact" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(8,22,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {scrolled && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(232,180,41,0.5), rgba(232,76,30,0.5), transparent)",
        }} />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", inset: "-4px", borderRadius: "50%",
                background: "conic-gradient(from 0deg, #e84c1e, #e8b429, #2d8a4e, #1e7a78, #e84c1e)",
                opacity: 0, transition: "opacity 0.3s",
              }} className="group-hover:opacity-100" />
              <img
                src="https://image2url.com/r2/default/images/1772242108813-4a9261de-a713-4545-a18f-4d2032db2b0c.png"
                alt="Ikigai"
                className="w-14 h-14 object-contain relative"
                style={{ filter: "drop-shadow(0 0 8px rgba(232,180,41,0.3))" }}
              />
            </div>
            <div>
              <div style={{ lineHeight: 1 }}>
                <span className="text-white font-bold text-lg tracking-wide">ikigaiE</span>
              </div>
              <p className="text-[10px] text-[#a8b8a8] uppercase tracking-widest leading-none mt-0.5">{t(lang, "nav_tagline")}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                onMouseEnter={() => setActiveLink(link.page)}
                onMouseLeave={() => setActiveLink(null)}
                style={{ position: "relative", padding: "4px 0" }}
                className="text-[#c8d5c8] hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {link.label || t(lang, link.labelKey)}
                <span style={{
                  position: "absolute", bottom: "-2px", left: 0,
                  height: "2px", borderRadius: "1px",
                  background: "linear-gradient(90deg, #e84c1e, #e8b429)",
                  width: activeLink === link.page ? "100%" : "0",
                  transition: "width 0.3s ease",
                  boxShadow: "0 0 8px rgba(232,76,30,0.6)",
                }} />
              </Link>
            ))}
          </nav>

          {/* CTA + Language Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: "20px", padding: "2px", border: "1px solid rgba(255,255,255,0.1)" }}>
              {["en", "hi"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: "4px 12px", borderRadius: "18px", fontSize: "12px", fontWeight: 700,
                    background: lang === l ? "linear-gradient(135deg, #e84c1e, #c03010)" : "transparent",
                    color: lang === l ? "white" : "#a8b8a8",
                    border: "none", cursor: "pointer", transition: "all 0.2s",
                    letterSpacing: "0.5px",
                  }}
                >
                  {l === "en" ? "EN" : "हि"}
                </button>
              ))}
            </div>
            <a
              href={createPageUrl("Home") + "#mobile-app"}
              style={{
                background: "rgba(45,138,78,0.12)",
                border: "1px solid rgba(45,138,78,0.3)",
                display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px",
              }}
              className="text-white font-semibold text-xs rounded-full transition-all duration-200 hover:bg-opacity-20"
            >
              <Download size={14} /> {t(lang, "nav_download_app")}
            </a>
            <Link
              to={createPageUrl("Contact")}
              style={{
                background: "linear-gradient(135deg, #e84c1e, #c03010)",
                boxShadow: "0 4px 20px rgba(232,76,30,0.35)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              className="text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_6px_30px_rgba(232,76,30,0.5)]"
            >
              {t(lang, "nav_get_started")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-lg"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={{
        maxHeight: menuOpen ? "600px" : "0",
        overflow: "hidden",
        transition: "max-height 0.4s ease",
        background: "rgba(8,22,15,0.98)",
        backdropFilter: "blur(20px)",
        borderTop: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}>
        <div className="px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.page}
              to={createPageUrl(link.page)}
              className="flex items-center justify-between text-[#c8d5c8] hover:text-white text-base font-medium py-3 border-b border-white/5 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label || t(lang, link.labelKey)}
              <span style={{ color: "#e84c1e", fontSize: "12px" }}>→</span>
            </Link>
          ))}

          {/* Mobile Language Toggle */}
          <div style={{ display: "flex", gap: "8px", paddingTop: "12px" }}>
            {["en", "hi"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  flex: 1, padding: "8px", borderRadius: "10px", fontSize: "13px", fontWeight: 700,
                  background: lang === l ? "linear-gradient(135deg, #e84c1e, #c03010)" : "rgba(255,255,255,0.05)",
                  color: lang === l ? "white" : "#a8b8a8",
                  border: `1px solid ${lang === l ? "rgba(232,76,30,0.4)" : "rgba(255,255,255,0.1)"}`,
                  cursor: "pointer",
                }}
              >
                {l === "en" ? "English" : "हिंदी"}
              </button>
            ))}
          </div>

          <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <a
              href={createPageUrl("Home") + "#mobile-app"}
              className="w-full text-center py-3 rounded-lg transition-all text-white font-semibold text-sm"
              style={{ background: "rgba(45,138,78,0.2)", border: "1px solid rgba(45,138,78,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              onClick={() => setMenuOpen(false)}
            >
              <Download size={16} /> {t(lang, "nav_download_app")}
            </a>
          </div>
          <Link
            to={createPageUrl("Contact")}
            className="block text-white text-center font-semibold py-3.5 rounded-full mt-2 transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #e84c1e, #c03010)", boxShadow: "0 4px 20px rgba(232,76,30,0.3)" }}
            onClick={() => setMenuOpen(false)}
          >
            {t(lang, "nav_get_started")}
          </Link>
        </div>
      </div>
    </header>
  );
}