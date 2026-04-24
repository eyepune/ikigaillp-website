import FrameworkSection from "../components/home/FrameworkSection";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLang } from "../components/LanguageContext";
import { t } from "../components/i18n";

const approach = {
  en: [
    { step: "01", title: "Discover", desc: "We start with who you are. Deep assessments, reflective conversations, and structured exploration help us understand your unique profile.", color: "#e84c1e" },
    { step: "02", title: "Design", desc: "We create a personalized learning journey tailored to your goals, strengths, and areas for growth.", color: "#e8b429" },
    { step: "03", title: "Develop", desc: "Through workshops, coaching, and practice, we build real capabilities — not just awareness.", color: "#2d8a4e" },
    { step: "04", title: "Deploy", desc: "We help you apply what you've learned in real-world contexts — jobs, relationships, leadership, and life.", color: "#1e7a78" },
  ],
  hi: [
    { step: "01", title: "खोजें", desc: "हम आपसे शुरुआत करते हैं। गहन मूल्यांकन, चिंतनशील बातचीत और संरचित अन्वेषण हमें आपकी अद्वितीय प्रोफ़ाइल को समझने में मदद करते हैं।", color: "#e84c1e" },
    { step: "02", title: "डिजाइन", desc: "हम आपके लक्ष्यों, शक्तियों और विकास के क्षेत्रों के अनुरूप एक व्यक्तिगत सीखने की यात्रा बनाते हैं।", color: "#e8b429" },
    { step: "03", title: "विकसित करें", desc: "कार्यशालाओं, कोचिंग और अभ्यास के माध्यम से, हम वास्तविक क्षमताएं बनाते हैं - न कि केवल जागरूकता।", color: "#2d8a4e" },
    { step: "04", title: "तैनात करें", desc: "हम आपको वास्तविक दुनिया के संदर्भों - नौकरियों, रिश्तों, नेतृत्व और जीवन में जो कुछ भी आपने सीखा है उसे लागू करने में मदद करते हैं।", color: "#1e7a78" },
  ],
};

export default function Framework() {
  const { lang } = useLang();
  const isHi = lang === 'hi';
  
  const displayApproach = approach[lang] || approach.en;

  const reasons = {
    en: [
      "Purpose-anchored learning increases motivation and retention",
      "Holistic development addresses both hard and soft dimensions",
      "Evidence-based methods proven across 500+ participants",
      "Personalized approach adapts to individual needs and goals",
      "Real-world application built into every program",
    ],
    hi: [
      "उद्देश्य-आधारित शिक्षा प्रेरणा और प्रतिधारण को बढ़ाती है",
      "समग्र विकास कठोर और नरम दोनों आयामों को संबोधित करता है",
      "500+ प्रतिभागियों में सिद्ध साक्ष्य-आधारित तरीके",
      "व्यक्तिगत दृष्टिकोण व्यक्तिगत आवश्यकताओं और लक्ष्यों के अनुकूल होता है",
      "प्रत्येक कार्यक्रम में निर्मित वास्तविक दुनिया का अनुप्रयोग",
    ],
  };

  const pillars = {
    en: [
      { label: "Purpose-First", desc: "Everything begins with knowing your why" },
      { label: "Evidence-Based", desc: "Methods grounded in research and results" },
      { label: "Human-Centered", desc: "Designed around real human experiences" },
      { label: "Results-Driven", desc: "Measured outcomes, not just participation" },
    ],
    hi: [
      { label: "उद्देश्य-प्रथम", desc: "सब कुछ आपके 'क्यों' को जानने से शुरू होता है" },
      { label: "साक्ष्य-आधारित", desc: "अनुसंधान और परिणामों पर आधारित तरीके" },
      { label: "मानव-केंद्रित", desc: "वास्तविक मानवीय अनुभवों के इर्द-गिर्द डिज़ाइन किया गया" },
      { label: "परिणाम-उन्मुख", desc: "मापे गए परिणाम, न कि केवल भागीदारी" },
    ],
  };

  return (
    <div className="bg-[#0d1f1a] pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#0f2820] to-[#0d1f1a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{isHi ? "हमारा दृष्टिकोण" : "Our Approach"}</p>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6">
            {isHi ? "इकिगई" : "The Ikigai"} <span className="italic text-[#e8b429]">{isHi ? "फ्रेमवर्क" : "Framework"}</span>
          </h1>
          <p className="text-[#a8b8a8] text-xl leading-relaxed max-w-2xl mx-auto">
            {isHi ? "हमारे द्वारा चलाए जाने वाले प्रत्येक कार्यक्रम को चार मूलभूत स्तंभों के साथ जोड़ा गया है - एक उद्देश्यपूर्ण, आत्मविश्वासी और सार्थक जीवन के निर्माण खंड।" : "Every program we run is anchored to four foundational pillars — the building blocks of a purposeful, confident, and meaningful life."}
          </p>
        </div>
      </section>

      {/* Framework pillars (reused component) */}
      <FrameworkSection />

      {/* Our Process */}
      <section className="py-24 bg-[#0d1f1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{isHi ? "हमारी प्रक्रिया" : "Our Process"}</p>
            <h2 className="text-4xl font-serif font-bold text-white">{isHi ? "हम कैसे काम करते हैं" : "How We Work"}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayApproach.map((step, i) => (
              <div key={i} className="relative">
                {i < displayApproach.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-1/2 h-px border-t border-dashed border-white/20 z-10 translate-x-full" />
                )}
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all relative z-20">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4"
                    style={{ backgroundColor: `${step.color}30`, border: `1px solid ${step.color}50` }}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-[#a8b8a8] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-24 bg-[#0f1f18]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-white mb-6">{isHi ? "हमारा फ्रेमवर्क क्यों काम करता है" : "Why Our Framework Works"}</h2>
              <p className="text-[#a8b8a8] leading-relaxed mb-6">
                {isHi ? "अधिकांश प्रशिक्षण कार्यक्रम अलगाव में कौशल पर ध्यान केंद्रित करते हैं। हम अलग तरह से काम करते हैं। हमारा ढांचा यह सुनिश्चित करता है कि हमारे द्वारा सिखाया जाने वाला प्रत्येक कौशल एक बड़े उद्देश्य से जुड़ा हो - सीखने को सार्थक बनाना, प्रतिधारण को उच्च बनाना और वास्तविक दुनिया के अनुप्रयोग को मजबूत बनाना।" : "Most training programs focus on skills in isolation. We work differently. Our framework ensures that every skill we teach is connected to a larger purpose — making learning meaningful, retention higher, and real-world application stronger."}
              </p>
              <ul className="space-y-3">
                {(reasons[lang] || reasons.en).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#2d8a4e] mt-0.5 shrink-0" />
                    <span className="text-[#c8d5c8] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(pillars[lang] || pillars.en).map((c, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="text-white font-semibold text-sm mb-2">{c.label}</h4>
                  <p className="text-[#a8b8a8] text-xs leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#0f1f18] to-[#0d1f1a]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">{isHi ? "फ्रेमवर्क को क्रियान्वित होते देखें" : "See the framework in action"}</h2>
          <p className="text-[#a8b8a8] mb-8">{isHi ? "यह देखने के लिए हमारे कार्यक्रमों का अन्वेषण करें कि प्रत्येक इकिगई ढांचे को कैसे लागू करता है।" : "Explore our programs to see how each one applies the Ikigai framework."}</p>
          <Link to={createPageUrl("Programs")} className="inline-flex items-center gap-2 bg-[#e84c1e] hover:bg-[#d43d12] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105">
            {isHi ? "कार्यक्रम देखें" : "View Programs"} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}