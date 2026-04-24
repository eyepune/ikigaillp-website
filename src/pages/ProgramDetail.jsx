import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPageUrl } from "@/utils";
import { ArrowRight, Home, CheckCircle2, Clock, Users, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "../components/LanguageContext";

const allPrograms = {
  "personality-development": {
    slug: "personality-development",
    icon: "🧠",
    title: "Personality Development",
    tagline: "Become the best version of yourself — from the inside out.",
    desc: "Deep self-awareness sessions that help you understand your strengths, habits, and blind spots — so you can grow with genuine confidence.",
    color: "#e84c1e",
    accentColor: "#e84c1e",
    duration: "2-day intensive or 8-week programme",
    mode: "In-person workshops or live online",
    batchSize: "15–25 participants",
    certificate: "Ikigai Certificate of Completion",
    overview: "Personality Development at Ikigai goes beyond motivational talks. Using evidence-based frameworks from positive psychology, cognitive behavioural coaching, and Ikigai philosophy, we help participants build a rock-solid sense of identity, emotional intelligence, and authentic confidence that lasts.",
    whoFor: [
      "Students preparing for college, careers, or life transitions",
      "Early-career professionals wanting to accelerate growth",
      "Anyone feeling stuck, unfulfilled, or unsure of their direction",
      "Leaders wanting to deepen their self-awareness",
    ],
    achievements: [
      "Develop a clear, grounded sense of self-identity",
      "Identify and leverage your unique strengths",
      "Build emotional resilience and self-regulation",
      "Project confidence in every social and professional setting",
      "Break limiting beliefs that have been holding you back",
      "Create a personalised roadmap for continuous growth",
    ],
    modules: [
      { num: "01", title: "Self-Discovery Deep Dive", desc: "Personality assessments, values mapping, and strengths profiling to understand who you truly are." },
      { num: "02", title: "The Confidence Blueprint", desc: "Practical exercises to build authentic confidence — not the performative kind, the kind that stays." },
      { num: "03", title: "Emotional Intelligence Mastery", desc: "Learn to read, understand, and manage your emotions and those of people around you." },
      { num: "04", title: "Breaking Limiting Beliefs", desc: "Identify the mental scripts that hold you back and rewrite them using evidence-based techniques." },
      { num: "05", title: "Your Personal Brand", desc: "How to present yourself authentically and memorably in every room you walk into." },
      { num: "06", title: "Growth Roadmap", desc: "Leave with a personalised 90-day action plan for measurable personal growth." },
    ],
    testimonial: { quote: "Ikigai changed how I see myself. The personality development sessions helped me recognise strengths I never knew I had. I walked into my first job interview with complete confidence.", name: "Priya Sharma", role: "Graduate Student, Delhi University", initials: "P" },
    relatedSlugs: ["public-speaking", "career-counselling", "leadership-team-building", "soft-skills-training", "workshop-facilitation"],
  },
  "public-speaking": {
    slug: "public-speaking",
    icon: "🎤",
    title: "Public Speaking & Communication",
    tagline: "From stage fright to standing ovations.",
    desc: "We train you to express ideas with clarity, conviction, and lasting impact — in rooms of 2 or 2000.",
    color: "#1e7a78",
    duration: "3-day intensive or 10-week programme",
    mode: "In-person (preferred) or live online",
    batchSize: "10–20 participants",
    certificate: "Ikigai Certificate of Completion",
    overview: "Great communicators aren't born — they're built. Our Public Speaking & Communication programme takes you from nervous presenter to compelling speaker through a structured, supportive, and surprisingly fun journey. Whether it's a job interview, a boardroom pitch, or the main stage, you'll own it.",
    whoFor: [
      "Students presenting projects, dissertations, or viva voce",
      "Professionals pitching ideas, leading meetings, or giving talks",
      "Entrepreneurs seeking to win clients and investors",
      "Anyone who wants to be heard and remembered",
    ],
    achievements: [
      "Eliminate the fear of public speaking for good",
      "Structure any speech or presentation with clarity and impact",
      "Develop a commanding, authentic stage presence",
      "Master vocal variety, pacing, and body language",
      "Handle Q&A, interruptions, and difficult audiences with ease",
      "Record, review, and dramatically improve your delivery",
    ],
    modules: [
      { num: "01", title: "Fear to Freedom", desc: "Understand the science of stage fright and use it as fuel rather than a block." },
      { num: "02", title: "The Architecture of a Great Speech", desc: "Frameworks for opening, structuring, and closing any talk with maximum impact." },
      { num: "03", title: "Voice & Body Mastery", desc: "Vocal exercises, posture training, and non-verbal communication techniques." },
      { num: "04", title: "Storytelling That Sticks", desc: "How to use narrative, metaphor, and emotion to make your message unforgettable." },
      { num: "05", title: "Live Practice Rounds", desc: "Multiple filmed practice sessions with detailed, constructive group feedback." },
      { num: "06", title: "High-Stakes Scenarios", desc: "Mock interviews, panel debates, and impromptu speaking drills under pressure." },
    ],
    testimonial: { quote: "The public speaking workshop was transformative. I used to dread presentations. Now I actually look forward to them. The coaches have a gift for making you feel capable.", name: "Rohan Mehta", role: "Software Engineer, Bangalore", initials: "R" },
    relatedSlugs: ["personality-development", "career-counselling", "leadership-team-building", "soft-skills-training", "workshop-facilitation"],
  },
  "career-counselling": {
    slug: "career-counselling",
    icon: "🧭",
    title: "Career Counselling",
    tagline: "Navigate your career with purpose, not guesswork.",
    desc: "We guide students and professionals toward roles that align with their values, strengths, and long-term vision — not just market trends.",
    color: "#e8b429",
    duration: "Individual: 3 sessions | Group: 6-week programme",
    mode: "1:1 or group, in-person or online",
    batchSize: "Individual or up to 20 in group",
    certificate: "Ikigai Career Clarity Certificate",
    overview: "Most career decisions are made under pressure, with incomplete information, and influenced by others. Our Career Counselling programme gives you a structured, personalised process to discover what you really want, understand the landscape, and build a clear roadmap to get there.",
    whoFor: [
      "Students choosing between streams, colleges, or career paths",
      "Fresh graduates unsure where to start",
      "Mid-career professionals considering a pivot",
      "Anyone feeling lost, stuck, or unfulfilled in their current path",
    ],
    achievements: [
      "Identify your core values and how they impact career satisfaction",
      "Map your unique strengths and natural talents",
      "Explore industries and roles you may not have considered",
      "Build a clear, actionable career roadmap",
      "Master the art of networking and strategic personal branding",
    ],
    modules: [
      { num: "01", title: "Self-Assessment", desc: "Psychometric tools and structured reflection to understand your baseline." },
      { num: "02", title: "Market Exploration", desc: "Understanding industry trends, growth sectors, and future-proof roles." },
      { num: "03", title: "Skill Mapping", desc: "Bridging the gap between where you are and where you want to be." },
      { num: "04", title: "Strategy & Roadmap", desc: "Setting short, medium, and long-term milestones for your career journey." },
    ],
    testimonial: { quote: "Ikigai helped me find my direction when I was completely lost. The career sessions were practical, honest, and life-changing.", name: "Anish Gupta", role: "Final Year Student", initials: "A" },
    relatedSlugs: ["personality-development", "public-speaking", "leadership-team-building", "soft-skills-training", "workshop-facilitation"],
  },
  "leadership-team-building": {
    slug: "leadership-team-building",
    icon: "🤝",
    title: "Leadership & Team Building",
    tagline: "Lead with empathy. Build with intention.",
    desc: "Build the soft power of great leaders — empathy, initiative, vision, and the ability to bring people together.",
    color: "#2d8a4e",
    duration: "Custom based on organisation needs",
    mode: "On-site / Off-site / Virtual",
    batchSize: "Varies",
    certificate: "Ikigai Leadership Certificate",
    overview: "Leadership is not a title — it's a way of being. Our Leadership & Team Building programmes for corporates and institutions focus on 'soft power' — the ability to influence, inspire, and collaborate effectively to achieve shared goals.",
    whoFor: [
      "New managers and team leads",
      "Corporate teams looking to improve collaboration",
      "Student leaders and council members",
      "Founders and entrepreneurs building teams",
    ],
    achievements: [
      "Understand different leadership styles and when to use them",
      "Build trust and psychological safety within teams",
      "Master the art of giving and receiving constructive feedback",
      "Lead effective meetings and collaborative sessions",
      "Resolve conflicts and build a cohesive team culture",
    ],
    modules: [
      { num: "01", title: "Foundations of Leadership", desc: "What modern leadership looks like — shifting from authority to influence." },
      { num: "02", title: "The Trust Equation", desc: "How to build and maintain trust within a team or organisation." },
      { num: "03", title: "Communication for Leaders", desc: "Active listening, empathy, and clear delegation." },
      { num: "04", title: "Conflict to Collaboration", desc: "Techniques for resolving friction and turning it into growth." },
      { num: "05", title: "High-Performance Teams", desc: "Building a culture of accountability and excellence." },
    ],
    testimonial: { quote: "Our team's communication improved noticeably after just one workshop. Highly recommended for any growing team.", name: "Sarah Thomas", role: "HR Manager", initials: "S" },
    relatedSlugs: ["personality-development", "public-speaking", "career-counselling", "soft-skills-training", "workshop-facilitation"],
  },
  "soft-skills-training": {
    slug: "soft-skills-training",
    icon: "⚡",
    title: "Soft Skills Training",
    tagline: "The skills no textbook teaches.",
    desc: "Master adaptability, problem-solving, critical thinking, and professional presence through real-world scenarios.",
    color: "#9b5e91",
    duration: "8 weeks or intensive workshops",
    mode: "Hybrid",
    batchSize: "20–30 participants",
    certificate: "Ikigai Soft Skills Mastery",
    overview: "In the age of AI, 'human' skills are the most valuable assets. Our Soft Skills Training focuses on the 'transversal' skills that make you indispensable in any professional environment — from critical thinking to adaptability.",
    whoFor: [
      "Graduating students entering the workforce",
      "Professionals wanting to polish their presence",
      "Anyone wanting to improve their problem-solving ability",
    ],
    achievements: [
      "Improve overall professional presence and etiquette",
      "Master adaptability in changing environments",
      "Enhance critical thinking and analytical skills",
      "Build a toolkit for effective problem-solving",
      "Understand professional ethics and boundaries",
    ],
    modules: [
      { num: "01", title: "Professionalism & Presence", desc: "First impressions, etiquette, and personal branding." },
      { num: "02", title: "Critical Thinking", desc: "Analysing information, identifying biases, and making better decisions." },
      { num: "03", title: "Problem Solving", desc: "Frameworks for tackling complex challenges systematically." },
      { num: "04", title: "Adaptability & Resilience", desc: "Managing change and thriving in uncertainty." },
    ],
    testimonial: { quote: "Essential training for anyone starting their career. It fills the gaps that formal education leaves behind.", name: "Kevin V.", role: "Junior Analyst", initials: "K" },
    relatedSlugs: ["personality-development", "public-speaking", "career-counselling", "leadership-team-building", "workshop-facilitation"],
  },
  "workshop-facilitation": {
    slug: "workshop-facilitation",
    icon: "📋",
    title: "Workshop Facilitation",
    tagline: "Built for your organisation.",
    desc: "Custom-designed workshops for institutions and corporations. Interactive, story-driven, and built for measurable results.",
    color: "#e84c1e",
    duration: "Custom",
    mode: "On-site / Virtual",
    batchSize: "Custom",
    certificate: "Ikigai Facilitation Certificate",
    overview: "Generic workshops don't work. We design and facilitate bespoke sessions tailored to the specific challenges and goals of your organisation — ensuring every minute is interactive, engaging, and outcome-oriented.",
    whoFor: [
      "Corporations wanting to upskill employees",
      "Educational institutions for student development",
      "NGOs and community groups",
    ],
    achievements: [
      "Achieve specific organisational learning goals",
      "Engage participants through interactive design",
      "Get measurable feedback and action plans",
      "Foster a culture of continuous learning",
    ],
    modules: [
      { num: "01", title: "Needs Assessment", desc: "Identifying the core gaps and goals of your team." },
      { num: "02", title: "Custom Design", desc: "Building the curriculum and activities specific to your needs." },
      { num: "03", title: "Active Facilitation", desc: "Expertly guided sessions that keep energy high and focus sharp." },
      { num: "04", title: "Outcome Review", desc: "Post-workshop analysis and next steps for the organisation." },
    ],
    testimonial: { quote: "The facilitation was masterfully done. Everyone was engaged from start to finish.", name: "Dr. Mehra", role: "Principal", initials: "M" },
    relatedSlugs: ["personality-development", "public-speaking", "career-counselling", "leadership-team-building", "soft-skills-training"],
  },
};

const allProgramsHi = {
  "personality-development": {
    title: "व्यक्तित्व विकास",
    tagline: "अपने आप का सबसे अच्छा संस्करण बनें — अंदर से बाहर तक।",
    desc: "गहरे आत्म-जागरूकता सत्र जो आपको अपनी ताकत, आदतों और कमजोरियों को समझने में मदद करते हैं — ताकि आप वास्तविक आत्मविश्वास के साथ बढ़ सकें।",
    duration: "2-दिवसीय गहन या 8-सप्ताह का कार्यक्रम",
    mode: "इन-पर्सन वर्कशॉप या लाइव ऑनलाइन",
    batchSize: "15-25 प्रतिभागी",
    certificate: "Ikigai पूर्णता प्रमाण पत्र",
    overview: "Ikigai में व्यक्तित्व विकास केवल प्रेरक बातों से परे है। सकारात्मक मनोविज्ञान, संज्ञानात्मक व्यवहार कोचिंग और Ikigai दर्शन के साक्ष्य-आधारित ढांचे का उपयोग करते हुए, हम प्रतिभागियों को पहचान, भावनात्मक बुद्धिमत्ता और प्रामाणिक आत्मविश्वास की एक मजबूत भावना बनाने में मदद करते हैं जो लंबे समय तक चलती है।",
    whoFor: [
      "कॉलेज, करियर या जीवन संक्रमण की तैयारी करने वाले छात्र",
      "विकास में तेजी लाने के इच्छुक शुरुआती करियर पेशेवर",
      "कोई भी जो अटका हुआ, अधूरा या अपनी दिशा के बारे में अनिश्चित महसूस कर रहा है",
      "अपनी आत्म-जागरूकता को गहरा करने के इच्छुक नेता",
    ],
    achievements: [
      "आत्म-पहचान की एक स्पष्ट, जमीनी भावना विकसित करें",
      "अपनी अनूठी शक्तियों को पहचानें और उनका लाभ उठाएं",
      "भावनात्मक लचीलापन और आत्म-नियमन बनाएं",
      "हर सामाजिक और पेशेवर सेटिंग में आत्मविश्वास दिखाएं",
      "उन सीमित मान्यताओं को तोड़ें जो आपको पीछे रोक रही थीं",
      "निरंतर विकास के लिए एक व्यक्तिगत रोडमैप बनाएं",
    ],
    modules: [
      { num: "01", title: "आत्म-खोज की गहरी डुबकी", desc: "आप वास्तव में कौन हैं, यह समझने के लिए व्यक्तित्व मूल्यांकन, मूल्यों का मानचित्रण और शक्तियों की रूपरेखा।" },
      { num: "02", title: "आत्मविश्वास का ब्लूप्रिंट", desc: "प्रामाणिक आत्मविश्वास बनाने के लिए व्यावहारिक अभ्यास — दिखावा नहीं, बल्कि वह जो टिकता है।" },
      { num: "03", title: "भावनात्मक बुद्धिमत्ता में महारत", desc: "अपनी और अपने आस-पास के लोगों की भावनाओं को पढ़ना, समझना और प्रबंधित करना सीखें।" },
      { num: "04", title: "सीमित मान्यताओं को तोड़ना", desc: "उन मानसिक लिपियों को पहचानें जो आपको पीछे रोकती हैं और उन्हें साक्ष्य-आधारित तकनीकों का उपयोग करके फिर से लिखें।" },
      { num: "05", title: "आपका व्यक्तिगत ब्रांड", desc: "आप जिस भी कमरे में जाते हैं, वहां खुद को प्रामाणिक और यादगार तरीके से कैसे पेश करें।" },
      { num: "06", title: "विकास का रोडमैप", desc: "औसत दर्जे के व्यक्तिगत विकास के लिए 90-दिवसीय व्यक्तिगत कार्य योजना के साथ विदा हों।" },
    ],
  },
  "public-speaking": {
    title: "सार्वजनिक वक्तृत्व और संचार",
    tagline: "मंच के डर से खड़े होकर तालियों तक।",
    desc: "हम आपको 2 या 2000 के कमरों में स्पष्टता, दृढ़ विश्वास और स्थायी प्रभाव के साथ विचारों को व्यक्त करने के लिए प्रशिक्षित करते हैं।",
    duration: "3-दिवसीय गहन या 10-सप्ताह का कार्यक्रम",
    mode: "इन-पर्सन (वरीयता) या लाइव ऑनलाइन",
    batchSize: "10-20 प्रतिभागी",
    overview: "महान संचारक पैदा नहीं होते — वे बनाए जाते हैं। हमारा सार्वजनिक वक्तृत्व और संचार कार्यक्रम आपको एक संरचित, सहायक और आश्चर्यजनक रूप से मजेदार यात्रा के माध्यम से घबराए हुए प्रस्तुतकर्ता से सम्मोहक वक्ता तक ले जाता है। चाहे वह नौकरी का साक्षात्कार हो, बोर्डरूम पिच हो, या मुख्य मंच, आप इसे जीत लेंगे।",
    whoFor: [
      "परियोजनाओं, शोध प्रबंधों या मौखिक परीक्षा प्रस्तुत करने वाले छात्र",
      "विचारों को पेश करने, बैठकों का नेतृत्व करने या भाषण देने वाले पेशेवर",
      "ग्राहकों और निवेशकों को जीतने की कोशिश करने वाले उद्यमी",
      "कोई भी जो सुना और याद रखा जाना चाहता है",
    ],
    achievements: [
      "सार्वजनिक बोलने के डर को हमेशा के लिए खत्म करें",
      "स्पष्टता और प्रभाव के साथ किसी भी भाषण या प्रस्तुति की संरचना करें",
      "एक प्रभावशाली, प्रामाणिक मंच उपस्थिति विकसित करें",
      "मुखर विविधता, गति और शरीर की भाषा में महारत हासिल करें",
      "प्रश्नोत्तर, रुकावटों और कठिन दर्शकों को आसानी से संभालें",
      "अपनी डिलीवरी को रिकॉर्ड करें, समीक्षा करें और नाटकीय रूप से सुधारें",
    ],
    modules: [
      { num: "01", title: "डर से आज़ादी", desc: "मंच के डर के विज्ञान को समझें और इसे एक अवरोध के बजाय ईंधन के रूप में उपयोग करें।" },
      { num: "02", title: "एक महान भाषण की संरचना", desc: "अधिकतम प्रभाव के साथ किसी भी बात को शुरू करने, संरचना करने और बंद करने के लिए रूपरेखा।" },
      { num: "03", title: "आवाज और शरीर पर महारत", desc: "मुखर अभ्यास, मुद्रा प्रशिक्षण और गैर-मौखिक संचार तकनीकें।" },
      { num: "04", title: "कहानी जो टिकती है", desc: "अपने संदेश को अविस्मरणीय बनाने के लिए कथा, रूपक और भावना का उपयोग कैसे करें।" },
      { num: "05", title: "लाइव अभ्यास सत्र", desc: "विस्तृत, रचनात्मक समूह प्रतिक्रिया के साथ कई फिल्माए गए अभ्यास सत्र।" },
      { num: "06", title: "उच्च-दांव वाले परिदृश्य", desc: "दबाव में मॉक साक्षात्कार, पैनल बहस और तत्काल बोलने के अभ्यास।" },
    ],
  },
  "career-counselling": {
    title: "करियर काउंसलिंग",
    tagline: "उद्देश्य के साथ अपने करियर को नेविगेट करें, अटकलों से नहीं।",
    desc: "हम छात्रों और पेशेवरों को उन भूमिकाओं की ओर मार्गदर्शन करते हैं जो उनके मूल्यों, शक्तियों और दीर्घकालिक दृष्टिकोण के साथ संरेखित होती हैं — केवल बाजार के रुझानों के साथ नहीं।",
    duration: "व्यक्तिगत: 3 सत्र | समूह: 6-सप्ताह का कार्यक्रम",
    mode: "1:1 या समूह, इन-पर्सन या ऑनलाइन",
    overview: "अधिकांश करियर निर्णय दबाव में, अधूरी जानकारी के साथ और दूसरों से प्रभावित होकर लिए जाते हैं। हमारा करियर काउंसलिंग कार्यक्रम आपको वास्तव में क्या चाहिए, परिदृश्य को समझने और वहां पहुंचने के लिए एक स्पष्ट रोडमैप बनाने के लिए एक संरचित, व्यक्तिगत प्रक्रिया देता है।",
    whoFor: [
      "स्ट्रीम, कॉलेज या करियर पथ के बीच चयन करने वाले छात्र",
      "नए स्नातक जो अनिश्चित हैं कि कहां से शुरू करें",
      "मिड-करियर पेशेवर जो बदलाव पर विचार कर रहे हैं",
      "कोई भी जो अपने वर्तमान पथ में खोया हुआ, अटका हुआ या अधूरा महसूस कर रहा है",
    ],
    achievements: [
      "अपने मूल मूल्यों को पहचानें और वे करियर की संतुष्टि को कैसे प्रभावित करते हैं",
      "अपनी अनूठी शक्तियों और प्राकृतिक प्रतिभाओं का मानचित्रण करें",
      "उन उद्योगों और भूमिकाओं का पता लगाएं जिन पर आपने विचार नहीं किया होगा",
      "एक स्पष्ट, कार्रवाई योग्य करियर रोडमैप बनाएं",
      "नेटवर्किंग और रणनीतिक व्यक्तिगत ब्रांडिंग की कला में महारत हासिल करें",
    ],
    modules: [
      { num: "01", title: "स्व-मूल्यांकन", desc: "आपकी आधार रेखा को समझने के लिए साइकोमेट्रिक उपकरण और संरचित प्रतिबिंब।" },
      { num: "02", title: "बाजार अन्वेषण", desc: "उद्योग के रुझान, विकास क्षेत्रों और भविष्य-सुरक्षित भूमिकाओं को समझना।" },
      { num: "03", title: "कौशल मानचित्रण", desc: "आप जहां हैं और जहां होना चाहते हैं, उसके बीच की खाई को पाटना।" },
      { num: "04", title: "रणनीति और रोडमैप", desc: "अपने करियर की यात्रा के लिए अल्पकालिक, मध्यम और दीर्घकालिक मील के पत्थर निर्धारित करना।" },
    ],
  },
  "leadership-team-building": {
    title: "नेतृत्व और टीम निर्माण",
    tagline: "सहानुभूति के साथ नेतृत्व करें। इरादे के साथ निर्माण करें।",
    desc: "महान नेताओं की नरम शक्ति का निर्माण करें — सहानुभूति, पहल, दृष्टि और लोगों को एक साथ लाने की क्षमता।",
    duration: "संगठन की जरूरतों के आधार पर कस्टम",
    mode: "ऑन-साइट / ऑफ-साइट / वर्चुअल",
    certificate: "Ikigai नेतृत्व प्रमाण पत्र",
    overview: "नेतृत्व एक उपाधि नहीं है — यह होने का एक तरीका है। कॉर्पोरेट्स और संस्थानों के लिए हमारे नेतृत्व और टीम निर्माण कार्यक्रम 'सॉफ्ट पावर' पर ध्यान केंद्रित करते हैं — साझा लक्ष्यों को प्राप्त करने के लिए प्रभावी ढंग से प्रभावित करने, प्रेरित करने और सहयोग करने की क्षमता।",
    whoFor: [
      "नए प्रबंधक और टीम लीड",
      "सहयोग में सुधार करने के इच्छुक कॉर्पोरेट टीम",
      "छात्र नेता और परिषद सदस्य",
      "टीम बनाने वाले संस्थापक और उद्यमी",
    ],
    achievements: [
      "विभिन्न नेतृत्व शैलियों को समझें और उनका कब उपयोग करना है",
      "टीमों के भीतर विश्वास और मनोवैज्ञानिक सुरक्षा बनाएं",
      "रचनात्मक प्रतिक्रिया देने और प्राप्त करने की कला में महारत हासिल करें",
      "प्रभावी बैठकों और सहयोगी सत्रों का नेतृत्व करें",
      "विवादों को हल करें और एक एकजुट टीम संस्कृति बनाएं",
    ],
    modules: [
      { num: "01", title: "नेतृत्व की नींव", desc: "आधुनिक नेतृत्व कैसा दिखता है — अधिकार से प्रभाव की ओर बदलाव।" },
      { num: "02", title: "ट्रस्ट इक्वेशन", desc: "एक टीम या संगठन के भीतर विश्वास कैसे बनाया और बनाए रखा जाए।" },
      { num: "03", title: "नेताओं के लिए संचार", desc: "सक्रिय सुनना, सहानुभूति और स्पष्ट प्रतिनिधिमंडल।" },
      { num: "04", title: "संघर्ष से सहयोग", desc: "घर्षण को हल करने और इसे विकास में बदलने की तकनीकें।" },
      { num: "05", title: "उच्च प्रदर्शन वाली टीमें", desc: "जवाबदेही और उत्कृष्टता की संस्कृति का निर्माण।" },
    ],
  },
  "soft-skills-training": {
    title: "सॉफ्ट स्किल्स ट्रेनिंग",
    tagline: "वे कौशल जो कोई पाठ्यपुस्तक नहीं सिखाती।",
    desc: "वास्तविक दुनिया के परिदृश्यों के माध्यम से अनुकूलनशीलता, समस्या-समाधान, महत्वपूर्ण सोच और पेशेवर उपस्थिति में महारत हासिल करें।",
    duration: "8 सप्ताह या गहन कार्यशालाएं",
    mode: "हाइब्रिड",
    overview: "एआई के युग में, 'मानव' कौशल सबसे मूल्यवान संपत्ति हैं। हमारा सॉफ्ट स्किल्स प्रशिक्षण 'ट्रांसवर्सल' कौशल पर ध्यान केंद्रित करता है जो आपको किसी भी पेशेवर वातावरण में अपरिहार्य बनाते हैं — महत्वपूर्ण सोच से लेकर अनुकूलनशीलता तक।",
    whoFor: [
      "कार्यबल में प्रवेश करने वाले स्नातक छात्र",
      "अपनी उपस्थिति को चमकाने के इच्छुक पेशेवर",
      "कोई भी जो अपनी समस्या सुलझाने की क्षमता में सुधार करना चाहता है",
    ],
    achievements: [
      "समग्र पेशेवर उपस्थिति और शिष्टाचार में सुधार करें",
      "बदलते परिवेश में अनुकूलनशीलता में महारत हासिल करें",
      "महत्वपूर्ण सोच और विश्लेषणात्मक कौशल बढ़ाएं",
      "प्रभावी समस्या-समाधान के लिए एक टूलकिट बनाएं",
      "पेशेवर नैतिकता और सीमाओं को समझें",
    ],
    modules: [
      { num: "01", title: "पेशेवरता और उपस्थिति", desc: "पहली छाप, शिष्टाचार और व्यक्तिगत ब्रांडिंग।" },
      { num: "02", title: "महत्वपूर्ण सोच", desc: "जानकारी का विश्लेषण करना, पूर्वाग्रहों की पहचान करना और बेहतर निर्णय लेना।" },
      { num: "03", title: "समस्या समाधान", desc: "जटिल चुनौतियों को व्यवस्थित रूप से हल करने के लिए रूपरेखा।" },
      { num: "04", title: "अनुकूलनशीलता और लचीलापन", desc: "परिवर्तन का प्रबंधन और अनिश्चितता में फलना-फूलना।" },
    ],
  },
  "workshop-facilitation": {
    title: "कार्यशाला सुविधा",
    tagline: "आपके संगठन के लिए निर्मित।",
    desc: "संस्थानों और निगमों के लिए कस्टम-डिज़ाइन की गई कार्यशालाएं। संवादात्मक, कहानी-संचालित और मापने योग्य परिणामों के लिए निर्मित।",
    duration: "कस्टम",
    overview: "जेनेरिक कार्यशालाएं काम नहीं करतीं। हम आपके संगठन की विशिष्ट चुनौतियों और लक्ष्यों के अनुरूप विशेष सत्रों को डिजाइन और सुविधाजनक बनाते हैं — यह सुनिश्चित करते हुए कि हर मिनट इंटरैक्टिव, आकर्षक और परिणाम-उन्मुख है।",
    whoFor: [
      "कर्मचारियों को अपस्किल करने के इच्छुक निगम",
      "छात्र विकास के लिए शैक्षणिक संस्थान",
      "एनजीओ और सामुदायिक समूह",
    ],
    achievements: [
      "विशिष्ट संगठनात्मक सीखने के लक्ष्यों को प्राप्त करें",
      "इंटरैक्टिव डिजाइन के माध्यम के माध्यम से प्रतिभागियों को संलग्न करें",
      "मापने योग्य प्रतिक्रिया और कार्य योजनाएं प्राप्त करें",
      "निरंतर सीखने की संस्कृति को बढ़ावा दें",
    ],
    modules: [
      { num: "01", title: "आवश्यकता मूल्यांकन", desc: "अपनी टीम के मुख्य अंतराल और लक्ष्यों की पहचान करना।" },
      { num: "02", title: "कस्टम डिजाइन", desc: "आपकी आवश्यकताओं के अनुरूप पाठ्यक्रम और गतिविधियों का निर्माण।" },
      { num: "03", title: "सक्रिय सुविधा", desc: "विशेषज्ञ रूप से निर्देशित सत्र जो ऊर्जा को उच्च और ध्यान को केंद्रित रखते हैं।" },
      { num: "04", title: "परिणाम समीक्षा", desc: "संगठन के लिए कार्यशाला के बाद का विश्लेषण और अगले कदम।" },
    ],
  },
};

const relatedLabels = {
  "personality-development": { shortDesc: "Grow from the inside out.", shortDescHi: "अंदर से बाहर तक बढ़ें।" },
  "public-speaking": { shortDesc: "Master communication.", shortDescHi: "संचार में महारत हासिल करें।" },
  "career-counselling": { shortDesc: "Navigate with purpose.", shortDescHi: "उद्देश्य के साथ नेविगेट करें।" },
  "leadership-team-building": { shortDesc: "Build the soft power of leaders.", shortDescHi: "नेताओं की नरम शक्ति का निर्माण करें।" },
  "soft-skills-training": { shortDesc: "Indispensable human skills.", shortDescHi: "अपरिहार्य मानवीय कौशल।" },
  "workshop-facilitation": { shortDesc: "Tailored for your team.", shortDescHi: "आपकी टीम के लिए अनुकूलित।" },
};

export default function ProgramDetail() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || "personality-development";
  
  const [dbProgram, setDbProgram] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [activeT, setActiveT] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchData = async () => {
      try {
        const [progRes, testRes] = await Promise.all([
          supabase.from('programs').select('*').eq('slug', slug).single(),
          supabase.from('testimonials').select('*').eq('status', 'active')
        ]);
        
        if (progRes.data) setDbProgram(progRes.data);
        if (testRes.data) setTestimonials(testRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Merge logic: use DB if available, fallback to static for complex fields
  const { lang } = useLang();
  const isHi = lang === 'hi';
  const staticData = allPrograms[slug] || allPrograms["personality-development"];
  const staticHi = allProgramsHi[slug] || allProgramsHi["personality-development"];
  
  // Localization logic
  const localize = (dbItem) => {
    return {
      ...dbItem,
      title: (isHi ? dbItem.title_hi : null) || dbItem.title,
      tagline: (isHi ? dbItem.tagline_hi : null) || dbItem.tagline,
      description: (isHi ? dbItem.description_hi : null) || dbItem.description,
      content: (isHi ? dbItem.content_hi : null) || dbItem.content,
      overview: (isHi ? dbItem.overview_hi : null) || dbItem.overview,
      suitable_for: (isHi ? dbItem.suitable_for_hi : null) || dbItem.suitable_for,
    };
  };

  const finalStatic = isHi ? { ...staticData, ...staticHi } : staticData;
  const program = dbProgram ? { ...finalStatic, ...localize(dbProgram) } : finalStatic;
  const color = program.color;

  if (loading && !dbProgram) {
     // Optional: show loader if first time
  }

  return (
    <div className="bg-[#0d1f1a]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, #071820 0%, #0d1f1a 60%, #0a1510 100%)` }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#a8b8a8] mb-8">
            <Link to={createPageUrl("Home")} className="hover:text-white transition-colors flex items-center gap-1"><Home size={13} /> Home</Link>
            <span>/</span>
            <Link to={createPageUrl("Programs")} className="hover:text-white transition-colors">Programs</Link>
            <span>/</span>
            <span className="text-white">{program.title}</span>
          </nav>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-[#c8d5c8] mb-8 overflow-hidden">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" 
                 style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "sans-serif" }}>
              {program.icon && (program.icon.startsWith('http') || program.icon.startsWith('/')) ? (
                <img src={program.icon} alt={program.title} className="w-full h-full object-cover" />
              ) : (
                program.icon
              )}
            </span> {isHi ? "फ्लैगशिप कार्यक्रम" : "FLAGSHIP PROGRAMME"}
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
              {program.title.split(" ").slice(0, -1).join(" ")} <br />
              <span className="italic" style={{ color }}>{program.title.split(" ").slice(-1)}</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#c8d5c8] italic mb-6">"{program.tagline}"</p>
            <p className="text-[#a8b8a8] text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              {program.description || program.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl("Contact") + `?program=${program.slug}`} className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg shadow-orange-900/20" style={{ backgroundColor: color }}>
                {isHi ? "अभी नामांकन करें" : "ENROL NOW"} <ArrowRight size={16} />
              </Link>
              <a href="#overview" className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all">{isHi ? "और जानें" : "LEARN MORE"}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <div className="bg-[#0a1a14] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {[
              { label: isHi ? "अवधि" : "DURATION", value: program.duration },
              { label: isHi ? "प्रारूप" : "MODE", value: program.mode || program.format },
              { label: isHi ? "बैच का आकार" : "BATCH SIZE", value: program.batchSize || "15-25" },
              { label: isHi ? "प्रमाण पत्र" : "CERTIFICATE", value: program.certificate || (isHi ? "Ikigai प्रमाण पत्र" : "Ikigai Certificate") },
            ].map(({ label, value }) => (
              <div key={label} className="lg:px-8 first:pl-0 last:pr-0">
                <p className="text-xs font-semibold tracking-widest mb-1" style={{ color: color }}>{label}</p>
                <p className="text-white font-medium text-sm leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section id="overview" className="py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-10 sm:space-y-12">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: color }}>{isHi ? "कार्यक्रम अवलोकन" : "Programme Overview"}</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6">{isHi ? "यह किस" : "What this"} <span className="italic" style={{ color: color }}>{isHi ? "बारे में है" : "is about"}</span></h2>
                <p className="text-[#a8b8a8] leading-relaxed text-lg">{program.overview}</p>
              </div>
              <div>
                <p className="text-white font-semibold text-sm uppercase tracking-wide mb-6">{isHi ? "यह किसके लिए है?" : "WHO IS THIS FOR?"}</p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {(program.whoFor || []).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#a8b8a8]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-6 sm:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ background: `radial-gradient(circle at 100% 0%, ${color}, transparent 70%)` }} />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}><CheckCircle2 size={20} style={{ color: color }} /></div>
                <p className="text-white font-bold text-sm uppercase tracking-wider">{isHi ? "आप क्या हासिल करेंगे" : "What you'll achieve"}</p>
              </div>
              <ol className="space-y-6">
                {(program.achievements || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 transition-all group-hover:scale-110" style={{ backgroundColor: `${color}40`, border: `1px solid ${color}60` }}>{i + 1}</span>
                    <span className="text-[#c8d5c8] leading-relaxed pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-14 sm:py-24 bg-[#0a1a14] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: color }}>{isHi ? "यात्रा" : "The Journey"}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">{isHi ? "कार्यक्रम मॉड्यूल" : "Programme Modules"}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(program.modules || []).map((mod, i) => (
              <div key={i} className="group p-6 sm:p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-white/25 transition-all card-hover">
                <div className="text-4xl font-serif font-bold mb-6 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: color }}>{mod.num}</div>
                <h3 className="text-white font-bold text-lg mb-3 font-serif">{mod.title}</h3>
                <p className="text-[#a8b8a8] text-sm leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials */}
      <section className="py-14 sm:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {testimonials.length > 0 ? (
            <>
              <div className="mb-10 animate-fade-in">
                <p className="text-5xl mb-6 opacity-30 font-serif text-white">"</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-serif italic text-[#c8d5c8] leading-relaxed mb-10">
                  {testimonials[activeT].text}
                </p>
                <div className="flex items-center justify-center gap-4">
                  {testimonials[activeT].photo ? (
                    <img src={testimonials[activeT].photo} alt={testimonials[activeT].name} className="w-14 h-14 rounded-full object-cover border-2" style={{ borderColor: color }} />
                  ) : (
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg" style={{ backgroundColor: color }}>
                      {testimonials[activeT].name?.[0]}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-white font-bold">{testimonials[activeT].name}</p>
                    <p className="text-[#a8b8a8] text-sm uppercase tracking-wide font-semibold">{testimonials[activeT].role}</p>
                  </div>
                </div>
              </div>
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setActiveT(i)} style={{ height: 6, borderRadius: 3, border: "none", cursor: "pointer", background: i === activeT ? color : "rgba(255,255,255,0.2)", width: i === activeT ? 28 : 6, transition: "all 0.3s" }} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-5xl mb-6 opacity-30 font-serif text-white">"</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-serif italic text-[#c8d5c8] leading-relaxed mb-8">
                {program.testimonial.quote}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: color }}>
                  {program.testimonial.initials}
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">{program.testimonial.name}</p>
                  <p className="text-[#a8b8a8] text-sm">{program.testimonial.role}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#0a1a14] to-[#0d1f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4">
            {isHi ? (<>अपनी यात्रा शुरू करने के लिए <br /><span className="italic" style={{ color: color }}>तैयार हैं?</span></>) : (<>Ready to begin your <br /><span className="italic" style={{ color: color }}>journey?</span></>)}
          </h2>
          <p className="text-[#a8b8a8] text-lg mb-10">
            {isHi ? "हमसे संपर्क करें और हम आपको आपके लिए सही कार्यक्रम, प्रारूप और समयरेखा का पता लगाने में मदद करेंगे।" : "Reach out to us and we'll help you figure out the right programme, format, and timeline for you."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl("Contact") + `?program=${program.slug}`} className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105" style={{ backgroundColor: color }}>
              {isHi ? "हमसे संपर्क करें" : "CONTACT US"} <ArrowRight size={16} />
            </Link>
            <Link to={createPageUrl("Programs")} className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all">{isHi ? "सभी कार्यक्रम देखें" : "VIEW ALL PROGRAMS"}</Link>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-12 sm:py-16 bg-[#0a1a14] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6 sm:mb-8">{isHi ? "अन्य कार्यक्रमों का पता लगाएं" : "Explore other programmes"}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
            {(program.relatedSlugs || []).map((rSlug) => {
              const rp = allPrograms[rSlug];
              if (!rp) return null;
              return (
                <Link key={rSlug} to={createPageUrl("ProgramDetail") + `?slug=${rSlug}`}
                  className="group flex flex-col gap-2 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-white/25 transition-all card-hover"
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0" 
                        style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "sans-serif" }}>
                    {rp.icon && (rp.icon.startsWith('http') || rp.icon.startsWith('/')) ? (
                      <img src={rp.icon} alt={rp.title} className="w-full h-full object-cover" />
                    ) : (
                      rp.icon
                    )}
                  </span>
                  <p className="text-white font-semibold text-sm leading-snug group-hover:text-[#e8b429] transition-colors">{isHi ? allProgramsHi[rSlug]?.title : rp.title}</p>
                  <p className="text-[#a8b8a8] text-xs leading-relaxed">{isHi ? relatedLabels[rSlug]?.shortDescHi : relatedLabels[rSlug]?.shortDesc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}