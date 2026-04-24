import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, ChevronRight, Home } from "lucide-react";

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      { heading: "Agreement", text: "By accessing or using the Ikigai website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services." },
      { heading: "Updates", text: "We reserve the right to modify these terms at any time. Continued use of our services after changes are posted constitutes your acceptance of the revised terms." },
    ],
  },
  {
    title: "Our Services",
    content: [
      { heading: "Scope", text: "Ikigai provides personal development programmes, corporate training, career counselling, technical courses, and related educational services." },
      { heading: "Availability", text: "We reserve the right to modify, suspend, or discontinue any service at any time without prior notice, though we will endeavour to inform enrolled participants where possible." },
      { heading: "Eligibility", text: "Our services are available to individuals of all ages, though certain programmes may have specific eligibility requirements as communicated during enrolment." },
    ],
  },
  {
    title: "Enrolment & Payments",
    content: [
      { heading: "Programme Enrolment", text: "Enrolment is confirmed upon receipt of full or agreed partial payment as specified for each programme. We reserve the right to decline any enrolment at our discretion." },
      { heading: "Fees & Pricing", text: "Programme fees are as published or quoted at the time of enquiry. We reserve the right to change pricing for future intakes." },
      { heading: "Refund Policy", text: "Refund eligibility depends on the specific programme and timing of cancellation. Please contact us directly to understand the refund terms applicable to your enrolment." },
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      { heading: "Ownership", text: "All content on the Ikigai website and within our programmes — including text, graphics, logos, audio, video, and course materials — is owned by Ikigai or our content partners and is protected by applicable intellectual property laws." },
      { heading: "Permitted Use", text: "You may access content for personal, non-commercial use only. You may not reproduce, distribute, or create derivative works without our express written permission." },
      { heading: "Participant Materials", text: "Materials provided during programmes are for your personal learning use only and may not be shared, resold, or used commercially." },
    ],
  },
  {
    title: "User Responsibilities",
    content: [
      { heading: "Conduct", text: "You agree to engage respectfully and professionally in all Ikigai programmes, workshops, and communications. Disruptive, abusive, or inappropriate behaviour may result in removal from a programme without refund." },
      { heading: "Accurate Information", text: "You are responsible for providing accurate information during enquiry and enrolment. Providing false information may result in cancellation of services." },
      { heading: "Confidentiality", text: "Content shared in group sessions or workshops is considered confidential to the group. Participants are expected to respect the privacy of fellow participants." },
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      { heading: "No Guarantees", text: "While we are committed to delivering high-quality programmes, Ikigai does not guarantee specific outcomes, results, or employment following participation in any programme." },
      { heading: "Liability Cap", text: "To the extent permitted by law, Ikigai's liability for any claim arising from the use of our services is limited to the fees paid by you for the specific service in question." },
      { heading: "Indirect Damages", text: "Ikigai is not liable for indirect, incidental, special, or consequential damages arising from the use or inability to use our services." },
    ],
  },
  {
    title: "Governing Law",
    content: [
      { heading: "Jurisdiction", text: "These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra." },
    ],
  },
  {
    title: "Contact",
    content: [
      { heading: "Get in Touch", text: "If you have any questions or concerns about these terms, please contact us at info@ikigaiedu.com or call +91 88281 27133." },
    ],
  },
];

export default function TermsAndConditions() {
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
            <span style={{ color: "white" }}>Terms & Conditions</span>
          </nav>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(232,180,41,0.08)", border: "1px solid rgba(232,180,41,0.25)", marginBottom: 20 }}>
            <FileText size={13} style={{ color: "#e8b429" }} />
            <span style={{ color: "#e8b429", fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>TERMS & CONDITIONS</span>
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(32px,4vw,52px)", fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 16px" }}>
            Terms of Service
          </h1>
          <p style={{ color: "#a8b8a8", fontSize: 16, lineHeight: 1.7, margin: "0 0 12px" }}>
            Please read these terms carefully before using our services. They define your rights and responsibilities as an Ikigai participant.
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
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(232,180,41,0.1)", border: "1px solid rgba(232,180,41,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8b429", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{si + 1}</div>
                <h2 style={{ color: "white", fontSize: 18, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>{section.title}</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {section.content.map((item, ii) => (
                  <div key={ii}>
                    <h3 style={{ color: "#e8b429", fontSize: 13, fontWeight: 700, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>{item.heading}</h3>
                    <p style={{ color: "#a8b8a8", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ marginTop: 48, padding: "32px", background: "rgba(232,180,41,0.04)", border: "1px solid rgba(232,180,41,0.15)", borderRadius: 20, textAlign: "center" }}>
          <h3 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: 22, margin: "0 0 10px" }}>Have questions about our terms?</h3>
          <p style={{ color: "#a8b8a8", fontSize: 14, margin: "0 0 20px" }}>Our team is happy to clarify anything before you commit.</p>
          <a href="mailto:info@ikigaiedu.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "#e8b429", color: "#0d1f1a", fontWeight: 700, fontSize: 14, borderRadius: 100, textDecoration: "none" }}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}