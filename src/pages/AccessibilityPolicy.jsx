import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Eye, ChevronRight, Home } from "lucide-react";

const sections = [
  {
    title: "Our Commitment",
    content: [
      { heading: "Statement", text: "Ikigai is committed to ensuring that our website and educational services are accessible to everyone, regardless of ability, disability, age, or technology. We believe that access to quality education and personal development is a right, not a privilege." },
      { heading: "Standards", text: "We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, as published by the World Wide Web Consortium (W3C), to the best of our ability." },
    ],
  },
  {
    title: "Accessibility Features",
    content: [
      { heading: "Keyboard Navigation", text: "Our website is designed to be navigable using a keyboard alone, without requiring the use of a mouse. Interactive elements are accessible via Tab, Enter, and arrow keys." },
      { heading: "Screen Reader Compatibility", text: "We use semantic HTML and appropriate ARIA attributes to ensure compatibility with popular screen readers such as JAWS, NVDA, and VoiceOver." },
      { heading: "Colour & Contrast", text: "We aim to maintain sufficient colour contrast between text and backgrounds to ensure readability for users with visual impairments, including colour blindness." },
      { heading: "Text Scaling", text: "Our interface is designed to accommodate browser-level text scaling up to 200% without loss of content or functionality." },
      { heading: "Alternative Text", text: "Meaningful images on our website include descriptive alternative text so that screen reader users can understand the content and context." },
    ],
  },
  {
    title: "Ongoing Efforts",
    content: [
      { heading: "Continuous Improvement", text: "Accessibility is an ongoing effort. We regularly review our website and content to identify and address accessibility barriers as technology and standards evolve." },
      { heading: "Third-Party Content", text: "Some content on our website is provided by third parties. While we encourage our partners to follow accessibility best practices, we may not be able to fully control accessibility in all third-party materials." },
      { heading: "Programme Accessibility", text: "For our in-person and online programmes, we aim to accommodate participants with accessibility needs where reasonably possible. Please contact us in advance so we can make appropriate arrangements." },
    ],
  },
  {
    title: "Known Limitations",
    content: [
      { heading: "Current Gaps", text: "While we work to make our website as accessible as possible, some older content or third-party embedded tools may not yet meet full WCAG 2.1 AA compliance. We are actively working to resolve these limitations." },
      { heading: "Reporting Issues", text: "If you encounter any accessibility barrier on our website or in our services, we encourage you to contact us so we can work to fix it promptly." },
    ],
  },
  {
    title: "Requesting Accommodations",
    content: [
      { heading: "Programme Support", text: "If you require specific accommodations to participate in any Ikigai programme — such as captioning, sign language interpretation, or alternative formats — please let us know at least 14 days in advance when possible." },
      { heading: "Content in Alternative Formats", text: "We will make reasonable efforts to provide programme materials in alternative formats upon request. Contact us at info@ikigaiedu.com to discuss your needs." },
    ],
  },
  {
    title: "Feedback & Contact",
    content: [
      { heading: "Report a Barrier", text: "We welcome feedback on the accessibility of our website and services. If you experience any accessibility issues, please contact us at info@ikigaiedu.com with a description of the issue and the page or service affected." },
      { heading: "Response Time", text: "We aim to respond to accessibility-related queries within 5 working days and to resolve issues as quickly as reasonably possible." },
    ],
  },
];

export default function AccessibilityPolicy() {
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
            <span style={{ color: "white" }}>Accessibility</span>
          </nav>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(45,138,78,0.08)", border: "1px solid rgba(45,138,78,0.25)", marginBottom: 20 }}>
            <Eye size={13} style={{ color: "#2d8a4e" }} />
            <span style={{ color: "#2d8a4e", fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>ACCESSIBILITY POLICY</span>
          </div>
          <h1 style={{ color: "white", fontSize: "clamp(32px,4vw,52px)", fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 16px" }}>
            Accessible to Everyone
          </h1>
          <p style={{ color: "#a8b8a8", fontSize: 16, lineHeight: 1.7, margin: "0 0 12px" }}>
            We believe great education should be accessible to all. Here's how we work to make Ikigai inclusive for every learner.
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
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(45,138,78,0.1)", border: "1px solid rgba(45,138,78,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2d8a4e", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{si + 1}</div>
                <h2 style={{ color: "white", fontSize: 18, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>{section.title}</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {section.content.map((item, ii) => (
                  <div key={ii}>
                    <h3 style={{ color: "#2d8a4e", fontSize: 13, fontWeight: 700, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>{item.heading}</h3>
                    <p style={{ color: "#a8b8a8", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: "32px", background: "rgba(45,138,78,0.04)", border: "1px solid rgba(45,138,78,0.15)", borderRadius: 20, textAlign: "center" }}>
          <h3 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: 22, margin: "0 0 10px" }}>Experiencing an accessibility barrier?</h3>
          <p style={{ color: "#a8b8a8", fontSize: 14, margin: "0 0 20px" }}>Tell us and we'll work to fix it as quickly as possible.</p>
          <a href="mailto:info@ikigaiedu.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "#2d8a4e", color: "white", fontWeight: 700, fontSize: 14, borderRadius: 100, textDecoration: "none" }}>
            info@ikigaiedu.com
          </a>
        </div>
      </div>
    </div>
  );
}