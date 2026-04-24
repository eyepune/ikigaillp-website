import MissionSection from "../components/home/MissionSection";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import TestimonialsSection from "../components/home/TestimonialsSection";
import { useLang } from "../components/LanguageContext";
import { t } from "../components/i18n";

const goals = {
  en: [
    { icon: "🎓", title: "Transform Education", desc: "Move beyond rote learning toward purpose-driven education that produces self-aware, confident, and capable individuals." },
    { icon: "🌱", title: "Nurture Potential", desc: "Every person has extraordinary potential. Our mission is to create the conditions where that potential can flourish." },
    { icon: "🤝", title: "Build Community", desc: "Create a community of purposeful individuals who support and inspire each other on their journeys." },
    { icon: "📈", title: "Create Impact at Scale", desc: "From individual sessions to corporate programs, expand our reach so more people can find their ikigaiE." },
  ],
  hi: [
    { icon: "🎓", title: "शिक्षा को बदलें", desc: "रटने से आगे बढ़कर उद्देश्य-आधारित शिक्षा की ओर बढ़ें जो आत्म-जागरूक, आत्मविश्वासी और सक्षम व्यक्तियों का निर्माण करती है।" },
    { icon: "🌱", title: "क्षमता को संवारें", desc: "हर व्यक्ति में असाधारण क्षमता होती है। हमारा मिशन उन स्थितियों का निर्माण करना है जहाँ वह क्षमता फल-फूल सके।" },
    { icon: "🤝", title: "समुदाय बनाएं", desc: "उद्देश्यपूर्ण व्यक्तियों का एक समुदाय बनाएं जो अपनी यात्रा में एक-दूसरे का समर्थन और प्रेरणा देते हैं।" },
    { icon: "📈", title: "बड़े पैमाने पर प्रभाव डालें", desc: "व्यक्तिगत सत्रों से लेकर कॉर्पोरेट कार्यक्रमों तक, अपनी पहुंच का विस्तार करें ताकि अधिक लोग अपना इकिगई पा सकें।" },
  ],
};

export default function Mission() {
  const { lang } = useLang();
  const isHi = lang === 'hi';
  
  const displayGoals = goals[lang] || goals.en;

  return (
    <div className="bg-[#0d1f1a] pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#0f2820] to-[#0d1f1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#2d8a4e] blur-[100px]" />
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-[#e84c1e] blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{isHi ? "हमारा मिशन" : "Our Mission"}</p>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
            {isHi ? "एक ऐसी दुनिया जहाँ हर कोई" : "A world where everyone"}<br />
            <span className="italic text-[#e8b429]">{isHi ? "उद्देश्य के साथ जीता है" : "lives with purpose"}</span>
          </h1>
          <p className="text-[#a8b8a8] text-xl leading-relaxed max-w-2xl mx-auto">
            {isHi ? "लोगों को उनके उद्देश्य की खोज करने और आत्मविश्वास, स्पष्टता और अर्थ के साथ जीने में मदद करके शिक्षा को फिर से परिभाषित करना।" : "To redefine education by helping people discover their purpose and live with confidence, clarity, and meaning."}
          </p>
        </div>
      </section>

      {/* Mission values */}
      <MissionSection />

      {/* Strategic Goals */}
      <section className="py-24 bg-[#0f1f18]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{isHi ? "हम क्या बना रहे हैं" : "What We're Building"}</p>
            <h2 className="text-4xl font-serif font-bold text-white">{isHi ? "हमारे रणनीतिक लक्ष्य" : "Our Strategic Goals"}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {displayGoals.map((g, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                <span className="text-4xl shrink-0">{g.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{g.title}</h3>
                  <p className="text-[#a8b8a8] leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-[#0f1f18] to-[#0d1f1a]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">{isHi ? "मिशन में शामिल हों" : "Join the mission"}</h2>
          <p className="text-[#a8b8a8] mb-8">{isHi ? "उद्देश्य, आत्मविश्वास और स्पष्टता के साथ जीने वाले लोगों के बढ़ते समुदाय का हिस्सा बनें।" : "Become part of a growing community of people living with purpose, confidence, and clarity."}</p>
          <Link to={createPageUrl("Contact")} className="inline-flex items-center gap-2 bg-[#e84c1e] hover:bg-[#d43d12] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105">
            {isHi ? "संपर्क में रहें" : "Get In Touch"} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}