import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, ChevronRight, Home } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    content: [
      { heading: "Personal Information", text: "When you contact us, register for a programme, or use our services, we may collect your name, email address, phone number, and other details you provide." },
      { heading: "Usage Data", text: "We automatically collect information about how you interact with our website, including pages visited, time spent, and referring URLs, to improve your experience." },
      { heading: "Cookies", text: "We use cookies and similar tracking technologies to personalise content, analyse traffic, and remember your preferences. You can control cookie settings through your browser." },
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      { heading: "Service Delivery", text: "To process enquiries, enrol you in programmes, and communicate about your learning journey with us." },
      { heading: "Improvement", text: "To analyse and improve our website, programmes, and overall user experience." },
      { heading: "Communications", text: "To send updates, programme information, and relevant content — with your consent, and always with the option to unsubscribe." },
      { heading: "Legal Compliance", text: "To meet our legal obligations and protect the rights and safety of Ikigai and our users." },
    ],
  },
  {
    title: "Data Sharing & Disclosure",
    content: [
      { heading: "No Sale of Data", text: "We do not sell, rent, or trade your personal information to third parties for their marketing purposes." },
      { heading: "Service Providers", text: "We may share data with trusted partners who help us operate our website and deliver services, under strict confidentiality obligations." },
      { heading: "Legal Requirements", text: "We may disclose information when required by law, court order, or to protect the safety and rights of Ikigai, our users, or the public." },
    ],
  },
  {
    title: "Data Security",
    content: [
      { heading: "Protection Measures", text: "We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, loss, or misuse." },
      { heading: "Data Retention", text: "We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy or as required by law." },
    ],
  },
  {
    title: "Your Rights",
    content: [
      { heading: "Access & Correction", text: "You have the right to access the personal information we hold about you and request corrections if it is inaccurate or incomplete." },
      { heading: "Deletion", text: "You may request the deletion of your personal data, subject to any legal obligations we have to retain certain information." },
      { heading: "Withdrawal of Consent", text: "Where you have provided consent for processing, you may withdraw it at any time by contacting us at info@ikigaiedu.com." },
    ],
  },
  {
    title: "Third-Party Links",
    content: [
      { heading: "External Sites", text: "Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies." },
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      { heading: "Updates", text: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes acceptance of the updated policy." },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div style={{ background: "#0d1f1a", minHeight: "100vh", paddingTop: 80 }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg, #0a1a14, #0d1f1a)", padding: "60px 0 40px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <nav style={{ display: "flex", alignItems: "center", gap: 8, color: "#a8b8a8", fontSize: 13, marginBottom: 24, flexWrap: "wrap" }}>
            <Link to={createPageUrl("Home")} style={{ color: "#a8b8a8", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              <Home size={13} /> Home
            </Link>
            <ChevronRight size={12} />
            <span style={{ color: "white" }}>Privacy Policy</span>
          </nav>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(30,122,120,0.1)", border: "1px solid rgba(30,122,120,0.25)", marginBottom: 20 }}>
            <Shield size={13} style={{ color: "#1e7a78" }} />
            <span style={{ color: "#1e7a78", fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>PRIVACY POLICY</span>
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(32px,4vw,52px)", fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 16px" }}>
            Your Privacy Matters
          </h1>
          <p style={{ color: "#a8b8a8", fontSize: 16, lineHeight: 1.7, margin: "0 0 12px" }}>
            At Ikigai, we are committed to protecting your personal information and being transparent about how we use it.
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0 }}>Effective Date: 1 January 2025 &nbsp;·&nbsp; Last Updated: 1 March 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6" style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {sections.map((section, si) => (
            <div key={si} style={{ padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(30,122,120,0.15)", border: "1px solid rgba(30,122,120,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e7a78", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{si + 1}</div>
                <h2 style={{ color: "white", fontSize: 18, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>{section.title}</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {section.content.map((item, ii) => (
                  <div key={ii}>
                    <h3 style={{ color: "#1e7a78", fontSize: 13, fontWeight: 700, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>{item.heading}</h3>
                    <p style={{ color: "#a8b8a8", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ marginTop: 48, padding: "32px", background: "rgba(232,76,30,0.05)", border: "1px solid rgba(232,76,30,0.15)", borderRadius: 20, textAlign: "center" }}>
          <h3 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: 22, margin: "0 0 10px" }}>Questions about your privacy?</h3>
          <p style={{ color: "#a8b8a8", fontSize: 14, margin: "0 0 20px" }}>Reach out to us and we'll be happy to help.</p>
          <a href="mailto:info@ikigaiedu.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "#e84c1e", color: "white", fontWeight: 700, fontSize: 14, borderRadius: 100, textDecoration: "none" }}>
            info@ikigaiedu.com
          </a>
        </div>
      </div>
    </div>
  );
}