import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPageUrl } from "@/utils";
import { ArrowRight, Home, Download, Apple, Play } from "lucide-react";
import { useLang } from "../components/LanguageContext";
import { t } from "../components/i18n";
import { supabase } from "@/lib/supabaseClient";

const staticPrograms = {
  en: [
    { slug: "personality-development", icon: "🧠", title: "Personality Development", tagline: "Know yourself. Grow yourself.", desc: "Deep self-awareness sessions that help you understand your strengths, habits, and blind spots — so you can grow with genuine confidence.", duration: "8–12 weeks", format: "Group & 1-on-1", suitable: "Students, Professionals", color: "#e84c1e" },
    { slug: "public-speaking", icon: "🎤", title: "Public Speaking & Communication", tagline: "From stage fright to standing ovations.", desc: "We train you to express ideas with clarity, conviction, and lasting impact — in rooms of 5 or 500.", duration: "6–10 weeks", format: "Workshops & Practice", suitable: "All levels", color: "#1e7a78" },
    { slug: "career-counselling", icon: "🧭", title: "Career Counselling", tagline: "Navigate with purpose.", desc: "Navigate your career with purpose. We guide students and professionals toward roles that align with your values and strengths.", duration: "4–6 sessions", format: "1-on-1 Coaching", suitable: "Students, Career changers", color: "#e8b429" },
    { slug: "leadership-team-building", icon: "🤝", title: "Leadership & Team Building", tagline: "Lead with empathy. Build with intention.", desc: "Build the soft power of great leaders — empathy, initiative, vision, and the ability to bring people together.", duration: "1–3 day programs", format: "Corporate Workshops", suitable: "Managers, Teams", color: "#2d8a4e" },
    { slug: "soft-skills-training", icon: "⚡", title: "Soft Skills Training", tagline: "The skills no textbook teaches.", desc: "Master adaptability, problem-solving, critical thinking, and professional presence through real-world scenarios.", duration: "4–8 weeks", format: "Group Sessions", suitable: "Students, Entry-level", color: "#9b5e91" },
    { slug: "workshop-facilitation", icon: "📋", title: "Workshop Facilitation", tagline: "Built for your organization.", desc: "Custom-designed workshops for institutions and corporations. Interactive, story-driven, and built for measurable results.", duration: "Custom", format: "On-site / Virtual", suitable: "Organizations, Schools", color: "#e84c1e" },
  ],
  hi: [
    { slug: "personality-development", icon: "🧠", title: "व्यक्तित्व विकास", tagline: "स्वयं को जानें। स्वयं को बढ़ाएं।", desc: "गहन आत्म-जागरूकता सत्र जो आपको अपनी शक्तियों, आदतों और अंध बिंदुओं को समझने में मदद करते हैं।", duration: "8–12 सप्ताह", format: "समूह और 1-on-1", suitable: "छात्र, पेशेवर", color: "#e84c1e" },
    { slug: "public-speaking", icon: "🎤", title: "सार्वजनिक वक्तृत्व और संचार", tagline: "मंच के डर से तालियों तक।", desc: "हम आपको स्पष्टता, दृढ़ विश्वास और स्थायी प्रभाव के साथ विचार व्यक्त करने के लिए प्रशिक्षित करते हैं।", duration: "6–10 सप्ताह", format: "कार्यशालाएं और अभ्यास", suitable: "सभी स्तर", color: "#1e7a78" },
    { slug: "career-counselling", icon: "🧭", title: "करियर परामर्श", tagline: "उद्देश्य के साथ नेविगेट करें।", desc: "उद्देश्य के साथ अपने करियर को नेविगेट करें। हम छात्रों और पेशेवरों को उनके मूल्यों के अनुरूप भूमिकाओं की ओर मार्गदर्शन करते हैं।", duration: "4–6 सत्र", format: "1-on-1 कोचिंग", suitable: "छात्र, करियर बदलने वाले", color: "#e8b429" },
    { slug: "leadership-team-building", icon: "🤝", title: "नेतृत्व और टीम निर्माण", tagline: "सहानुभूति से नेतृत्व करें। इरादे से बनाएं।", desc: "महान नेताओं की सॉफ्ट पावर बनाएं — सहानुभूति, पहल, दृष्टि और लोगों को एकजुट करने की क्षमता।", duration: "1–3 दिन कार्यक्रम", format: "कॉर्पोरेट कार्यशालाएं", suitable: "प्रबंधक, टीमें", color: "#2d8a4e" },
    { slug: "soft-skills-training", icon: "⚡", title: "सॉफ्ट स्किल्स प्रशिक्षण", tagline: "वे कौशल जो कोई पाठ्यपुस्तक नहीं सिखाती।", desc: "वास्तविक दुनिया के परिदृश्यों के माध्यम से अनुकूलनशीलता, समस्या-समाधान और पेशेवर उपस्थिति में महारत हासिल करें।", duration: "4–8 सप्ताह", format: "समूह सत्र", suitable: "छात्र, प्रवेश-स्तर", color: "#9b5e91" },
    { slug: "workshop-facilitation", icon: "📋", title: "कार्यशाला सुविधा", tagline: "आपके संगठन के लिए निर्मित।", desc: "संस्थानों और निगमों के लिए कस्टम-डिज़ाइन की गई कार्यशालाएं। इंटरएक्टिव, कहानी-संचालित और मापने योग्य परिणामों के लिए।", duration: "कस्टम", format: "ऑन-साइट / वर्चुअल", suitable: "संगठन, स्कूल", color: "#e84c1e" },
  ],
};

const staticCourseCategories = [
  {
    category: "Software Development",
    color: "#1e7a78",
    icon: "💻",
    courses: [
      { slug: "full-stack-development", icon: "🌐", title: "Full Stack Development", desc: "Master the complete web development stack — from pixel-perfect frontends to robust backends and databases." },
      { slug: "java-development", icon: "☕", title: "Java Development", desc: "Master Java — one of the world's most in-demand programming languages — from basics to enterprise-grade applications." },
      { slug: "blockchain", icon: "⛓", title: "Blockchain", desc: "Understand and build on blockchain — from cryptographic fundamentals to deploying smart contracts on real networks." },
    ],
  },
  {
    category: "Technology Courses",
    color: "#2d8a4e",
    icon: "🚀",
    courses: [
      { slug: "artificial-intelligence", icon: "🤖", title: "Artificial Intelligence", desc: "From AI theory to real applications — learn how intelligent systems work and how to build them." },
      { slug: "machine-learning", icon: "📉", title: "Machine Learning", desc: "Master the algorithms and techniques that power modern intelligent systems — from regression to deep learning." },
      { slug: "python-with-ai", icon: "🐍", title: "Python with AI", desc: "Master Python programming and apply it directly to AI and machine learning with NumPy, Pandas, and TensorFlow." },
      { slug: "advanced-excel", icon: "📊", title: "Advanced Excel", desc: "Go beyond basic spreadsheets — master Excel for professional data analysis, automation, and business intelligence." },
      { slug: "data-science", icon: "🧪", title: "Data Science", desc: "Master the complete data science pipeline — from collection and cleaning to analysis, visualisation, and ML modelling." },
      { slug: "cyber-security", icon: "🛡", title: "Cyber Security", desc: "Learn how cyber attacks work — and how to stop them. Build skills in ethical hacking, network security, and threat response." },
      { slug: "cloud-computing", icon: "☁", title: "Cloud Computing (AWS & DevOps)", desc: "Master AWS cloud services and DevOps practices — deploy, automate, and scale applications like modern engineering teams." },
    ],
  },
  {
    category: "Microsoft Certifications",
    color: "#0078d4",
    icon: "☁",
    courses: [
      { slug: "azure-900", icon: "🟦", title: "Microsoft Azure Fundamentals (AZ-900)", desc: "Earn the globally recognised AZ-900 certification — your launchpad into the Microsoft Azure cloud ecosystem.", isAzure: true },
    ],
  },
];

const courseColors = ["#1e7a78", "#e84c1e", "#2d8a4e", "#e8b429", "#9b5e91", "#e84c1e", "#1e7a78"];

function CourseCard({ course, categoryColor, colorIndex, lang }) {
  const cardColor = course.slug === "azure-900" || course.isAzure ? "#0078d4" : (courseColors[colorIndex % courseColors.length] || categoryColor);
  const linkTo = (course.slug === "azure-900" || course.isAzure) ? createPageUrl("Azure900") : createPageUrl("CourseDetail") + `?slug=${course.slug}`;
  return (
    <Link to={linkTo}
      className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-300 card-hover"
      style={{ background: `${cardColor}10`, border: `1px solid ${cardColor}25` }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${cardColor}55`; e.currentTarget.style.background = `${cardColor}18`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = `${cardColor}25`; e.currentTarget.style.background = `${cardColor}10`; }}
    >
      <div className="p-5 sm:p-8 flex-1">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mb-6 overflow-hidden text-white" 
             style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "sans-serif" }}>
          {course.icon && (course.icon.startsWith('http') || course.icon.startsWith('/')) ? (
            <img src={course.icon} alt={course.title} className="w-full h-full object-cover" />
          ) : (
            course.icon
          )}
        </div>
        <h2 className="text-white font-bold text-xl font-serif mb-3 group-hover:text-[#e8b429] transition-colors">{course.title}</h2>
        <p className="text-[#a8b8a8] text-sm leading-relaxed">{course.description || course.desc}</p>
      </div>
      <div className="px-5 sm:px-8 pb-5 sm:pb-8">
        <div className="w-full h-px mb-4" style={{ background: `${cardColor}30` }} />
        <span className="inline-flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: cardColor }}>
          {(course.slug === "azure-900" || course.isAzure) ? (lang === 'hi' ? "अभी नामांकन करें" : "Enrol Now") : (lang === 'hi' ? "और जानें" : "Learn More")} <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function Programs() {
  const { lang } = useLang();
  const isHi = lang === 'hi';
  const [dbPrograms, setDbPrograms] = useState([]);
  const [dbCourses, setDbCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes, coursesRes] = await Promise.all([
          supabase.from('programs').select('*').eq('status', 'active').order('sort_order', { ascending: true }),
          supabase.from('courses').select('*').eq('status', 'active').order('sort_order', { ascending: true })
        ]);

        if (programsRes.data) setDbPrograms(programsRes.data);
        if (coursesRes.data) setDbCourses(coursesRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Prepare final lists with localization
  const localize = (item) => {
    if (!item) return item;
    if (lang === 'en') return item;
    return {
      ...item,
      title: item.title_hi || item.title,
      tagline: item.tagline_hi || item.tagline,
      description: item.description_hi || item.description || item.desc,
      overview: item.overview_hi || item.overview,
      content: item.content_hi || item.content,
    };
  };

  const displayPrograms = dbPrograms.length > 0 
    ? dbPrograms.map(localize) 
    : (staticPrograms[lang] || staticPrograms.en);
  
  // Group courses by category
  const categoriesMap = {};
  if (dbCourses.length > 0) {
    dbCourses.forEach(c => {
      const localizedCourse = localize(c);
      if (!categoriesMap[c.category]) {
        categoriesMap[c.category] = {
          category: c.category,
          color: c.color || "#1e7a78",
          icon: c.icon || "📚",
          courses: []
        };
      }
      categoriesMap[c.category].courses.push(localizedCourse);
    });
  }

  const displayCategories = dbCourses.length > 0 
    ? Object.values(categoriesMap) 
    : staticCourseCategories.map(cat => ({
        ...cat,
        category: isHi ? (
          cat.category === "Software Development" ? "सॉफ्टवेयर डेवलपमेंट" :
          cat.category === "Technology Courses" ? "तकनीकी पाठ्यक्रम" :
          cat.category === "Microsoft Certifications" ? "माइक्रोसॉफ्ट प्रमाणपत्र" : cat.category
        ) : cat.category,
        courses: cat.courses.map(course => ({
          ...course,
          title: isHi ? (
            course.slug === "full-stack-development" ? "फुल स्टैक डेवलपमेंट" :
            course.slug === "java-development" ? "जावा डेवलपमेंट" :
            course.slug === "blockchain" ? "ब्लॉकचेन" :
            course.slug === "artificial-intelligence" ? "आर्टिफिशियल इंटेलिजेंस" :
            course.slug === "machine-learning" ? "मशीन लर्निंग" :
            course.slug === "python-with-ai" ? "पायथन विद एआई" :
            course.slug === "advanced-excel" ? "एडवांस्ड एक्सेल" :
            course.slug === "data-science" ? "डेटा साइंस" :
            course.slug === "cyber-security" ? "साइबर सुरक्षा" :
            course.slug === "cloud-computing" ? "क्लाउड कंप्यूटिंग (AWS और DevOps)" :
            course.slug === "azure-900" ? "माइक्रोसॉफ्ट एज़्योर फंडामेंटल्स (AZ-900)" : course.title
          ) : course.title,
          desc: isHi ? (
            course.slug === "full-stack-development" ? "पिक्सेल-परफेक्ट फ्रंटएंड से लेकर मजबूत बैकएंड और डेटाबेस तक - संपूर्ण वेब डेवलपमेंट स्टैक में महारत हासिल करें।" :
            course.slug === "java-development" ? "जावा में महारत हासिल करें - दुनिया की सबसे अधिक मांग वाली प्रोग्रामिंग भाषाओं में से एक - बुनियादी बातों से लेकर एंटरप्राइज-ग्रेड अनुप्रयोगों तक।" :
            course.slug === "blockchain" ? "ब्लॉकचेन को समझें और उस पर निर्माण करें - क्रिप्टोग्राफिक बुनियादी बातों से लेकर वास्तविक नेटवर्क पर स्मार्ट अनुबंधों को तैनात करने तक।" :
            course.slug === "artificial-intelligence" ? "AI सिद्धांत से लेकर वास्तविक अनुप्रयोगों तक - जानें कि बुद्धिमान सिस्टम कैसे काम करते हैं और उन्हें कैसे बनाया जाए।" :
            course.slug === "machine-learning" ? "आधुनिक बुद्धिमान प्रणालियों को शक्ति प्रदान करने वाले एल्गोरिदम और तकनीकों में महारत हासिल करें - प्रतिगमन से लेकर गहन शिक्षण तक।" :
            course.slug === "python-with-ai" ? "पायथन प्रोग्रामिंग में महारत हासिल करें और इसे सीधे NumPy, Pandas और TensorFlow के साथ AI और मशीन लर्निंग पर लागू करें।" :
            course.slug === "advanced-excel" ? "बुनियादी स्प्रेडशीट से आगे बढ़ें - पेशेवर डेटा विश्लेषण, स्वचालन और व्यावसायिक बुद्धिमत्ता के लिए एक्सेल में महारत हासिल करें।" :
            course.slug === "data-science" ? "संपूर्ण डेटा विज्ञान पाइपलाइन में महारत हासिल करें - संग्रह और सफाई से लेकर विश्लेषण, विज़ुअलाइज़ेशन और ML मॉडलिंग तक।" :
            course.slug === "cyber-security" ? "जानें कि साइबर हमले कैसे काम करते हैं - और उन्हें कैसे रोका जाए। एथिकल हैकिंग, नेटवर्क सुरक्षा और खतरे की प्रतिक्रिया में कौशल बनाएं।" :
            course.slug === "cloud-computing" ? "AWS क्लाउड सेवाओं और DevOps प्रथाओं में महारत हासिल करें - आधुनिक इंजीनियरिंग टीमों की तरह अनुप्रयोगों को तैनात, स्वचालित और स्केल करें।" :
            course.slug === "azure-900" ? "विश्व स्तर पर मान्यता प्राप्त AZ-900 प्रमाणन अर्जित करें - माइक्रोसॉफ्ट एज़्योर क्लाउड पारिस्थितिकी तंत्र में आपका लॉन्चपैड।" : course.desc
          ) : course.desc
        }))
      }));

  return (
    <div className="bg-[#0d1f1a] pt-20">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0f2820] to-[#0d1f1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-[#1e7a78] blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-sm text-[#a8b8a8] mb-8">
            <Link to={createPageUrl("Home")} className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={13} /> {isHi ? "होम" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-white">{t(lang, "our_programs")}</span>
          </nav>
          <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{t(lang, "what_we_offer")}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
            {t(lang, "our_programs")}
          </h1>
          <p className="text-[#a8b8a8] text-base sm:text-xl leading-relaxed max-w-2xl">
            {t(lang, "programs_intro")}
          </p>
        </div>
      </section>

      {/* Flagship Programs */}
      <section className="py-14 sm:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-10">{t(lang, "flagship_programs")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPrograms.map((p, i) => (
              <Link key={p.slug} to={createPageUrl("ProgramDetail") + `?slug=${p.slug}`}
                className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-white/20 transition-all card-hover"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold mb-8 overflow-hidden text-white" 
                     style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "sans-serif" }}>
                  {p.icon && (p.icon.startsWith('http') || p.icon.startsWith('/')) ? (
                    <img src={p.icon} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    p.icon
                  )}
                </div>
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: p.color }}>{p.tagline}</p>
                <h3 className="text-white text-2xl font-serif font-bold mb-4">{p.title}</h3>
                <p className="text-[#a8b8a8] leading-relaxed mb-8">{p.description || p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: p.color }}>
                  {t(lang, "view_details")} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Business Courses */}
      <section className="py-14 sm:py-24 bg-[#0a1a14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">{t(lang, "specialised_courses")}</h2>
            <p className="text-[#a8b8a8]">{t(lang, "courses_sub")}</p>
          </div>

          <div className="space-y-20">
            {displayCategories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white" 
                       style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "sans-serif" }}>
                    {cat.icon}
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl font-serif font-bold">{cat.category}</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.courses.map((course, ci) => (
                    <CourseCard key={course.slug} course={course} categoryColor={cat.color} colorIndex={ci} lang={lang} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0f1f18]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">{t(lang, "not_sure")}</h2>
          <p className="text-[#a8b8a8] mb-8">{t(lang, "not_sure_sub")}</p>
          <Link to={createPageUrl("Contact")} className="inline-flex items-center gap-2 bg-[#e84c1e] hover:bg-[#d43d12] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale(1.05)">
            {t(lang, "talk_to_us")} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* App Download CTA */}
      <section style={{ background: "linear-gradient(135deg, rgba(232,76,30,0.1) 0%, rgba(45,138,78,0.08) 100%)", padding: "64px 24px", borderTop: "1px solid rgba(232,76,30,0.2)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "linear-gradient(135deg, #e84c1e, #c52d0a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Download size={16} style={{ color: "white" }} />
            </div>
            <span style={{ color: "#e84c1e", fontWeight: 700, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>{t(lang, "learn_anytime")}</span>
          </div>
          <h3 style={{ fontSize: "32px", fontWeight: 700, color: "white", marginBottom: "12px", fontFamily: "'Playfair Display', serif" }}>
            {t(lang, "take_learning")}
          </h3>
          <p style={{ color: "#a8b8a8", fontSize: "16px", lineHeight: 1.7, marginBottom: "24px" }}>
            {t(lang, "download_app_body")}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "rgba(232,76,30,0.2)", border: "1px solid rgba(232,76,30,0.4)", borderRadius: "12px", textDecoration: "none", color: "white", fontWeight: 600, fontSize: "15px", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,76,30,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(232,76,30,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <Apple size={22} style={{ color: "white" }} /> App Store
            </a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "rgba(45,138,78,0.2)", border: "1px solid rgba(45,138,78,0.4)", borderRadius: "12px", textDecoration: "none", color: "white", fontWeight: 600, fontSize: "15px", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(45,138,78,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(45,138,78,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <Play size={22} style={{ color: "white" }} /> Google Play
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}