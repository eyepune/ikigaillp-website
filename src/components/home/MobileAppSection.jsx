import { Play, Smartphone } from "lucide-react";
import { useLang } from "../LanguageContext";
import { t } from "../i18n";

export default function MobileAppSection() {
  const { lang } = useLang();

  return (
    <section id="mobile-app" style={{ background: "linear-gradient(135deg, rgba(13,31,26,1) 0%, rgba(15,40,24,1) 50%, rgba(13,31,26,0.8) 100%)", padding: "120px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(232,76,30,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none", animation: "float 6s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(30,122,120,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none", animation: "float 8s ease-in-out infinite", animationDelay: "1s" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #e84c1e, #c52d0a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Smartphone size={18} style={{ color: "white" }} />
            </div>
            <span style={{ color: "#e84c1e", fontWeight: 700, fontSize: "12px", letterSpacing: "2.5px", textTransform: "uppercase" }}>{t(lang, "mobile_badge")}</span>
          </div>
          <h2 style={{ fontSize: "48px", fontWeight: 700, color: "white", marginBottom: "16px", fontFamily: "'Playfair Display', serif", letterSpacing: "-1px" }}>
            {t(lang, "mobile_heading")}
          </h2>
          <p style={{ color: "#a8b8a8", fontSize: "17px", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
            {t(lang, "mobile_body")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <a href="https://apps.apple.com/in/app/myinstitute/id1472483563" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 24px", background: "rgba(232,76,30,0.1)", border: "1px solid rgba(232,76,30,0.4)", borderRadius: "14px", color: "white", textDecoration: "none", fontWeight: 600, transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,76,30,0.2)"; e.currentTarget.style.borderColor = "rgba(232,76,30,0.6)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(232,76,30,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(232,76,30,0.1)"; e.currentTarget.style.borderColor = "rgba(232,76,30,0.4)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "rgba(232,76,30,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", color: "#a8b8a8", fontWeight: 500 }}>{t(lang, "mobile_download_on")}</div>
                <div style={{ fontSize: "18px", fontWeight: 700, marginTop: "2px" }}>App Store</div>
              </div>
              <div style={{ fontSize: "20px" }}>→</div>
            </a>

            <a href="https://play.google.com/store/apps/details?id=co.george.tlsih" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 24px", background: "rgba(45,138,78,0.1)", border: "1px solid rgba(45,138,78,0.4)", borderRadius: "14px", color: "white", textDecoration: "none", fontWeight: 600, transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(45,138,78,0.2)"; e.currentTarget.style.borderColor = "rgba(45,138,78,0.6)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(45,138,78,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(45,138,78,0.1)"; e.currentTarget.style.borderColor = "rgba(45,138,78,0.4)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "rgba(45,138,78,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Play size={30} fill="white" color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", color: "#a8b8a8", fontWeight: 500 }}>{t(lang, "mobile_get_it")}</div>
                <div style={{ fontSize: "18px", fontWeight: 700, marginTop: "2px" }}>Google Play</div>
              </div>
              <div style={{ fontSize: "20px" }}>→</div>
            </a>

            <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: "13px", color: "#a8b8a8", marginBottom: "12px", fontWeight: 600 }}>{t(lang, "mobile_requirements")}</div>
              <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "#a8b8a8" }}>
                <span>✓ iOS 14+</span>
                <span>✓ Android 8+</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)", padding: "32px", borderRadius: "20px", boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 0 1px rgba(232,76,30,0.5)", position: "relative", backdropFilter: "blur(10px)" }}>
              <div style={{ position: "absolute", top: "0", left: "0", right: "0", height: "2px", background: "linear-gradient(90deg, transparent, #e84c1e, transparent)" }} />
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a1ffff704da6ffef51cd18/6c94a11a0_qr-code-BP7AQYT4.png"
                alt="Download QR Code"
                style={{ width: "220px", height: "220px", display: "block" }}
              />
            </div>
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <p style={{ color: "#e84c1e", fontSize: "14px", fontWeight: 700, margin: "0 0 6px" }}>{t(lang, "mobile_quick_download")}</p>
              <p style={{ color: "#a8b8a8", fontSize: "13px", margin: 0 }}>{t(lang, "mobile_scan")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}