import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPageUrl } from "@/utils";
import { ArrowRight, Home } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "../components/LanguageContext";
import { t } from "../components/i18n";

const allCourses = {
  "full-stack-development": {
    slug: "full-stack-development",
    icon: "🌐",
    category: "Software Development",
    title: "Full Stack Development",
    tagline: "Build anything. From front to back.",
    desc: "Master the complete web development stack — from pixel-perfect frontends to robust backends and databases.",
    color: "#1e7a78",
    duration: "6 months",
    mode: "Online / Hybrid",
    batchSize: "20–30 participants",
    certificate: "Ikigai Full Stack Certificate",
    overview: "Our Full Stack Development course takes you from zero to job-ready. You will learn how to build modern web applications — from designing responsive UIs to architecting scalable backends — with hands-on projects every step of the way.",
    whoFor: ["Beginners with zero coding experience", "Students from any background", "Professionals wanting to switch to tech", "Entrepreneurs wanting to build their own product"],
    achievements: ["Build full, production-ready web applications", "Master both frontend and backend technologies", "Work with real databases and APIs", "Deploy applications to the cloud", "Build a strong GitHub portfolio"],
    modules: [
      { num: "01", title: "HTML, CSS & JavaScript", desc: "The core building blocks of the web — from structure to style and interactivity." },
      { num: "02", title: "Frontend Frameworks", desc: "React.js for building dynamic, component-based user interfaces." },
      { num: "03", title: "Backend Development", desc: "Node.js, Express, and RESTful API design for server-side logic." },
      { num: "04", title: "Databases", desc: "SQL & NoSQL databases — design, query, and integrate with your apps." },
      { num: "05", title: "Full Stack Projects", desc: "Build 3+ complete projects from scratch to show employers." },
    ],
    relatedSlugs: ["java-development", "blockchain", "artificial-intelligence", "cloud-computing", "cyber-security"],
  },
  "artificial-intelligence": {
    slug: "artificial-intelligence",
    icon: "🤖",
    category: "Technology Courses",
    title: "Artificial Intelligence",
    tagline: "Build machines that learn.",
    desc: "From AI theory to real applications — learn how intelligent systems work and how to build them.",
    color: "#2d8a4e",
    duration: "4 months",
    mode: "Online / Hybrid",
    batchSize: "20–30 participants",
    certificate: "Ikigai AI Certificate",
    overview: "Artificial Intelligence is the defining technology of our era. This course decodes AI — how it works, the core algorithms behind it, and how to build AI-powered applications across various industries.",
    whoFor: ["Tech professionals entering the AI space", "Students in CS, Data, or Engineering", "Anyone curious about how AI actually works", "Product managers working with AI teams"],
    achievements: ["Understand AI concepts and terminology deeply", "Implement core AI algorithms", "Build neural networks", "Apply AI to real-world problems", "Discuss and evaluate AI systems with confidence"],
    modules: [
      { num: "01", title: "Introduction to AI", desc: "History, concepts, types of AI, and current state of the field." },
      { num: "02", title: "AI Algorithms", desc: "Search algorithms, optimisation, and classical AI problem-solving techniques." },
      { num: "03", title: "Neural Networks", desc: "How neural networks work, layers, activation functions, backpropagation." },
      { num: "04", title: "AI Applications", desc: "Computer vision, NLP, recommendation systems — real use cases explored." },
      { num: "05", title: "AI Projects", desc: "Build 2+ AI applications using Python and popular AI libraries." },
    ],
    relatedSlugs: ["machine-learning", "python-with-ai", "data-science", "cloud-computing", "full-stack-development"],
  },
  "digital-marketing": {
    slug: "digital-marketing",
    icon: "📢",
    category: "Technology Courses",
    title: "Digital Marketing",
    tagline: "Connect with the digital world.",
    desc: "Master the complete digital marketing toolkit — from SEO and social media to paid ads and analytics.",
    color: "#e8b429",
    duration: "3 months",
    mode: "Online / Hybrid",
    batchSize: "20–30 participants",
    certificate: "Ikigai Digital Marketing Certificate",
    overview: "Marketing has moved from billboards to screens. This course covers the entire digital marketing spectrum, teaching you how to build brands, acquire customers, and measure success in the digital age.",
    whoFor: ["Business students", "Aspiring marketers", "Entrepreneurs looking to grow their brands", "Traditional marketers moving to digital"],
    achievements: ["Master SEO and SEM", "Create effective social media strategies", "Run successful paid ad campaigns", "Understand content marketing and email", "Use analytics to drive marketing decisions"],
    modules: [
      { num: "01", title: "Marketing Strategy", desc: "Understanding audiences, funnels, and brand voice." },
      { num: "02", title: "SEO & Search", desc: "How to rank on Google and drive organic traffic." },
      { num: "03", title: "Social Media", desc: "Building community and engagement across key platforms." },
      { num: "04", title: "Ads & Analytics", desc: "Paid advertising (Meta, Google) and measuring ROI." },
    ],
    relatedSlugs: ["business-english", "data-analytics", "soft-skills-training-course"],
  },
  "business-english": {
    slug: "business-english",
    icon: "👔",
    category: "Language & Communication",
    title: "Business English",
    tagline: "Communicate with impact.",
    desc: "Improve professional communication skills in English for meetings, emails, presentations, and negotiations.",
    color: "#9b5e91",
    duration: "3 months",
    mode: "Hybrid",
    batchSize: "15–20 participants",
    certificate: "Ikigai Business English Certificate",
    overview: "English is the language of global business. This course focuses on the specific vocabulary, structures, and cultural nuances needed to excel in a professional environment, from writing clear emails to leading international calls.",
    whoFor: ["Working professionals", "Job seekers", "Students preparing for interviews", "Anyone wanting to polish their corporate English"],
    achievements: ["Write clear, professional emails and reports", "Master business vocabulary and idioms", "Lead and participate in meetings with confidence", "Negotiate effectively in English", "Deliver compelling professional presentations"],
    modules: [
      { num: "01", title: "Professional Writing", desc: "Emails, reports, and professional correspondence." },
      { num: "02", title: "Speaking in Business", desc: "Meetings, calls, and networking scenarios." },
      { num: "03", title: "Presenting in English", desc: "Structure, vocabulary, and handling Q&A." },
      { num: "04", title: "Advanced Topics", desc: "Negotiation, conflict, and cultural nuances." },
    ],
    relatedSlugs: ["ielts-toefl", "soft-skills-training-course", "leadership-management"],
  },
  "java-development": {
    slug: "java-development",
    icon: "☕",
    category: "Software Development",
    title: "Java Development",
    tagline: "Build enterprise-grade applications.",
    desc: "Master Java — one of the world's most in-demand programming languages — from basics to enterprise-grade applications.",
    color: "#e84c1e",
    duration: "4 months",
    mode: "Online / Hybrid",
    batchSize: "20–30 participants",
    certificate: "Ikigai Java Developer Certificate",
    overview: "Java powers the world's largest enterprise systems. This course takes you deep into the Java ecosystem — from Object-Oriented Programming (OOP) fundamentals to Spring Boot and building robust, scalable applications used by millions.",
    whoFor: ["Aspiring software engineers", "Computer Science students", "Professionals switching to backend development"],
    achievements: ["Master Java Core and OOP concepts", "Build web applications with Spring Boot", "Understand multi-threading and concurrency", "Work with Hibernate and JPA for databases", "Develop 2+ full enterprise-style projects"],
    modules: [
      { num: "01", title: "Java Fundamentals", desc: "Syntax, variables, loops, and data structures." },
      { num: "02", title: "OOP in Java", desc: "Classes, objects, inheritance, polymorphism, and abstraction." },
      { num: "03", title: "Advanced Java", desc: "Collections, exceptions, generics, and lambdas." },
      { num: "04", title: "Spring Boot", desc: "Building REST APIs and microservices." },
    ],
    relatedSlugs: ["full-stack-development", "cloud-computing", "cyber-security"],
  },
  "machine-learning": {
    slug: "machine-learning",
    icon: "📉",
    category: "Technology Courses",
    title: "Machine Learning",
    tagline: "Predict the future with data.",
    desc: "Master the algorithms and techniques that power modern intelligent systems — from regression to deep learning.",
    color: "#2d8a4e",
    duration: "5 months",
    mode: "Online / Hybrid",
    batchSize: "20–25 participants",
    certificate: "Ikigai Machine Learning Certificate",
    overview: "Data is the new oil, and Machine Learning is the engine. Learn how to train models that find patterns, make predictions, and drive decision-making in everything from finance to healthcare.",
    whoFor: ["Aspiring Data Scientists", "Software engineers wanting to specialize in ML", "Statisticians and researchers"],
    achievements: ["Master supervised and unsupervised learning", "Build and evaluate predictive models", "Work with Scikit-learn, TensorFlow, and Keras", "Handle large-scale data processing", "Complete a capstone ML project"],
    modules: [
      { num: "01", title: "Foundations of ML", desc: "Linear algebra, statistics, and Python libraries." },
      { num: "02", title: "Supervised Learning", desc: "Regression, classification, and decision trees." },
      { num: "03", title: "Unsupervised Learning", desc: "Clustering, dimensionality reduction, and PCA." },
      { num: "04", title: "Deep Learning", desc: "Neural networks and introduction to Keras/TensorFlow." },
    ],
    relatedSlugs: ["artificial-intelligence", "data-science", "python-with-ai", "data-analytics"],
  },
  "cloud-computing": {
    slug: "cloud-computing",
    icon: "☁",
    category: "Technology Courses",
    title: "Cloud Computing (AWS & DevOps)",
    tagline: "The infrastructure of the future.",
    desc: "Master AWS cloud services and DevOps practices — deploy, automate, and scale applications like modern engineering teams.",
    color: "#0078d4",
    duration: "4 months",
    mode: "Online / Hybrid",
    batchSize: "25–30 participants",
    certificate: "Ikigai Cloud & DevOps Certificate",
    overview: "In today's world, the server is the cloud. This course covers the essentials of AWS cloud infrastructure and the DevOps culture of automation, helping you deploy applications with speed and reliability.",
    whoFor: ["IT professionals", "Software developers", "System administrators", "Anyone pursuing cloud certifications"],
    achievements: ["Master AWS core services (EC2, S3, RDS)", "Implement CI/CD pipelines", "Understand containerization with Docker", "Learn Infrastructure as Code (IaC)", "Build a scalable, cloud-native architecture"],
    modules: [
      { num: "01", title: "Cloud Fundamentals", desc: "Virtualization, cloud models, and AWS basics." },
      { num: "02", title: "AWS Core Services", desc: "Computing, storage, and database management in AWS." },
      { num: "03", title: "DevOps Practices", desc: "CI/CD, version control, and automation tools." },
      { num: "04", title: "Cloud Security", desc: "IAM, VPC, and securing cloud applications." },
    ],
    relatedSlugs: ["azure-900", "full-stack-development", "cyber-security"],
  },
  "ielts-toefl": {
    slug: "ielts-toefl",
    icon: "📖",
    category: "Language & Communication",
    title: "IELTS / TOEFL Preparation",
    tagline: "Your gateway to global education.",
    desc: "Comprehensive preparation for IELTS and TOEFL — covering all four sections with expert strategies and mock tests.",
    color: "#e84c1e",
    duration: "2 months",
    mode: "Live Online / Intensive",
    batchSize: "15–25 participants",
    certificate: "Ikigai Test Prep Certificate",
    overview: "Standardised tests can be daunting. This course deconstructs the IELTS and TOEFL exams, giving you the specific strategies, vocabulary, and practice needed to achieve your target score and secure your spot in universities abroad.",
    whoFor: ["Students applying to foreign universities", "Professionals seeking immigration", "Anyone needing official English proficiency"],
    achievements: ["Master the specific format of each section", "Improve speed and accuracy in Reading/Listening", "Learn high-scoring structures for Writing", "Build confidence for the Speaking interview", "Take multiple full-length mock tests"],
    modules: [
      { num: "01", title: "Listening & Reading", desc: "Strategies for different question types." },
      { num: "02", title: "Writing Tasks", desc: "Structuring essays and describing data." },
      { num: "03", title: "Speaking Drills", desc: "Mock interviews and fluency practice." },
      { num: "04", title: "Mock Exams", desc: "Full-length timed practice under exam conditions." },
    ],
    relatedSlugs: ["foreign-languages", "business-english", "soft-skills-training-course", "data-analytics", "advanced-excel"],
  },
};

const allCoursesHi = {
  "full-stack-development": {
    title: "फुल स्टैक डेवलपमेंट",
    tagline: "कुछ भी बनाएं। सामने से पीछे तक।",
    desc: "पूर्ण वेब विकास स्टैक में महारत हासिल करें — पिक्सेल-परफेक्ट फ्रंटएंड से लेकर मजबूत बैकएंड और डेटाबेस तक।",
    duration: "6 महीने",
    mode: "ऑनलाइन / हाइब्रिड",
    batchSize: "20-30 प्रतिभागी",
    certificate: "Ikigai फुल स्टैक प्रमाण पत्र",
    overview: "हमारा फुल स्टैक डेवलपमेंट कोर्स आपको शून्य से नौकरी के लिए तैयार करता है। आप सीखेंगे कि आधुनिक वेब एप्लिकेशन कैसे बनाए जाते हैं — रिस्पॉन्सिव यूआई डिजाइन करने से लेकर स्केलेबल बैकएंड को आर्किटेक्चर करने तक — हर कदम पर व्यावहारिक परियोजनाओं के साथ।",
    whoFor: ["बिना कोडिंग अनुभव वाले शुरुआती", "किसी भी पृष्ठभूमि के छात्र", "तकनीक में स्विच करने के इच्छुक पेशेवर", "अपना उत्पाद बनाने के इच्छुक उद्यमी"],
    achievements: ["पूर्ण, उत्पादन-तैयार वेब एप्लिकेशन बनाएं", "फ्रंटएंड और बैकएंड प्रौद्योगिकियों में महारत हासिल करें", "वास्तविक डेटाबेस और एपीआई के साथ काम करें", "एप्लिकेशन को क्लाउड पर तैनात करें", "एक मजबूत GitHub पोर्टफोलियो बनाएं"],
    modules: [
      { num: "01", title: "HTML, CSS और JavaScript", desc: "वेब के मुख्य निर्माण खंड — संरचना से लेकर शैली और अन्तरक्रियाशीलता तक।" },
      { num: "02", title: "फ्रंटएंड फ्रेमवर्क", desc: "डायनामिक, घटक-आधारित यूजर इंटरफेस बनाने के लिए React.js।" },
      { num: "03", title: "बैकएंड डेवलपमेंट", desc: "सर्वर-साइड लॉजिक के लिए Node.js, Express और RESTful API डिजाइन।" },
      { num: "04", title: "डेटाबेस", desc: "SQL और NoSQL डेटाबेस — डिजाइन, क्वेरी और अपने एप्लिकेशन के साथ एकीकृत करें।" },
      { num: "05", title: "फुल स्टैक प्रोजेक्ट्स", desc: "नियोक्ताओं को दिखाने के लिए शुरू से 3+ पूर्ण प्रोजेक्ट बनाएं।" },
    ],
  },
  "artificial-intelligence": {
    title: "आर्टिफिशियल इंटेलिजेंस",
    tagline: "ऐसी मशीनें बनाएं जो सीखती हैं।",
    desc: "AI सिद्धांत से वास्तविक अनुप्रयोगों तक — जानें कि बुद्धिमान सिस्टम कैसे काम करते हैं और उन्हें कैसे बनाया जाए।",
    duration: "4 महीने",
    overview: "आर्टिफिशियल इंटेलिजेंस हमारे युग की परिभाषित तकनीक है। यह कोर्स AI को डिकोड करता है — यह कैसे काम करता है, इसके पीछे के मुख्य एल्गोरिदम और विभिन्न उद्योगों में AI-संचालित एप्लिकेशन कैसे बनाएं।",
    whoFor: ["AI क्षेत्र में प्रवेश करने वाले तकनीकी पेशेवर", "CS, डेटा या इंजीनियरिंग के छात्र", "AI वास्तव में कैसे काम करता है, इसके बारे में जानने के इच्छुक लोग", "AI टीमों के साथ काम करने वाले उत्पाद प्रबंधक"],
    achievements: ["AI अवधारणाओं और शब्दावली को गहराई से समझें", "मुख्य AI एल्गोरिदम लागू करें", "न्यूरल नेटवर्क बनाएं", "वास्तविक दुनिया की समस्याओं के लिए AI लागू करें", "आत्मविश्वास से AI प्रणालियों पर चर्चा और मूल्यांकन करें"],
    modules: [
      { num: "01", title: "AI का परिचय", desc: "इतिहास, अवधारणाएं, AI के प्रकार और क्षेत्र की वर्तमान स्थिति।" },
      { num: "02", title: "AI एल्गोरिदम", desc: "खोज एल्गोरिदम, अनुकूलन और शास्त्रीय AI समस्या-समाधान तकनीकें।" },
      { num: "03", title: "न्यूरल नेटवर्क", desc: "न्यूरल नेटवर्क कैसे काम करते हैं, परतें, सक्रियण कार्य, बैकप्रोपेगेशन।" },
      { num: "04", title: "AI अनुप्रयोग", desc: "कंप्यूटर विजन, एनएलपी, अनुशंसा प्रणाली — वास्तविक उपयोग के मामलों का पता लगाया गया।" },
      { num: "05", title: "AI प्रोजेक्ट्स", desc: "Python और लोकप्रिय AI लाइब्रेरी का उपयोग करके 2+ AI एप्लिकेशन बनाएं।" },
    ],
  },
  "java-development": {
    title: "जावा डेवलपमेंट",
    tagline: "एंटरप्राइज-ग्रेड एप्लिकेशन बनाएं।",
    desc: "जावा में महारत हासिल करें - दुनिया की सबसे अधिक मांग वाली प्रोग्रामिंग भाषाओं में से एक - बुनियादी बातों से लेकर एंटरप्राइज-ग्रेड अनुप्रयोगों तक।",
    duration: "4 महीने",
    overview: "जावा दुनिया के सबसे बड़े एंटरप्राइज सिस्टम को शक्ति प्रदान करता है। यह कोर्स आपको जावा इकोसिस्टम की गहराई में ले जाता है - ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP) के बुनियादी सिद्धांतों से लेकर स्प्रिंग बूट और लाखों लोगों द्वारा उपयोग किए जाने वाले मजबूत, स्केलेबल अनुप्रयोगों के निर्माण तक।",
    whoFor: ["महत्वाकांक्षी सॉफ्टवेयर इंजीनियर", "कंप्यूटर साइंस के छात्र", "बैकएंड डेवलपमेंट में स्विच करने वाले पेशेवर"],
    achievements: ["जावा कोर और OOP अवधारणाओं में महारत हासिल करें", "स्प्रिंग बूट के साथ वेब एप्लिकेशन बनाएं", "मल्टी-थ्रेडिंग और समवर्तीता को समझें", "डेटाबेस के लिए हाइबरनेट और JPA के साथ काम करें", "2+ पूर्ण एंटरप्राइज-शैली प्रोजेक्ट विकसित करें"],
    modules: [
      { num: "01", title: "जावा फंडामेंटल्स", desc: "सिंटैक्स, वेरिएबल, लूप और डेटा स्ट्रक्चर।" },
      { num: "02", title: "जावा में OOP", desc: "क्लास, ऑब्जेक्ट, इनहेरिटेंस, पॉलीमोर्फिज्म और एब्स्ट्रैक्शन।" },
      { num: "03", title: "एडवांस्ड जावा", desc: "कलेक्शन, एक्सेप्शन, जेनरिक और लैम्ब्डा।" },
      { num: "04", title: "स्प्रिंग बूट", desc: "REST API और माइक्रोसर्विस बनाना।" },
    ],
  },
  "machine-learning": {
    title: "मशीन लर्निंग",
    tagline: "डेटा के साथ भविष्य की भविष्यवाणी करें।",
    desc: "आधुनिक बुद्धिमान प्रणालियों को शक्ति प्रदान करने वाले एल्गोरिदम और तकनीकों में महारत हासिल करें — प्रतिगमन से लेकर गहन शिक्षण तक।",
    duration: "5 महीने",
    overview: "डेटा नया तेल है, और मशीन लर्निंग इंजन है। जानें कि उन मॉडलों को कैसे प्रशिक्षित किया जाए जो पैटर्न ढूंढते हैं, भविष्यवाणियां करते हैं, और वित्त से लेकर स्वास्थ्य सेवा तक हर चीज में निर्णय लेते हैं।",
    whoFor: ["महत्वाकांक्षी डेटा वैज्ञानिक", "ML में विशेषज्ञता हासिल करने के इच्छुक सॉफ्टवेयर इंजीनियर", "सांख्यिकीविद और शोधकर्ता"],
    achievements: ["सुपरवाइज्ड और अनसुपरवाइज्ड लर्निंग में महारत हासिल करें", "भविष्य कहनेवाला मॉडल बनाएं और उनका मूल्यांकन करें", "Scikit-learn, TensorFlow और Keras के साथ काम करें", "बड़े पैमाने पर डेटा प्रोसेसिंग को संभालें", "एक कैपस्टोन ML प्रोजेक्ट पूरा करें"],
    modules: [
      { num: "01", title: "ML की नींव", desc: "रैखिक बीजगणित, सांख्यिकी और पायथन लाइब्रेरी।" },
      { num: "02", title: "सुपरवाइज्ड लर्निंग", desc: "प्रतिगमन, वर्गीकरण और निर्णय वृक्ष।" },
      { num: "03", title: "अनसुपरवाइज्ड लर्निंग", desc: "क्लस्टरिंग, आयामी कमी और PCA।" },
      { num: "04", title: "डीप लर्निंग", desc: "न्यूरल नेटवर्क और केरास/टेंसरफ्लो का परिचय।" },
    ],
  },
  "cloud-computing": {
    title: "क्लाउड कंप्यूटिंग (AWS और DevOps)",
    tagline: "आज का बुनियादी ढांचा।",
    desc: "AWS क्लाउड सेवाओं और DevOps प्रथाओं में महारत हासिल करें — आधुनिक इंजीनियरिंग टीमों की तरह एप्लिकेशन को तैनात, स्वचालित और स्केल करें।",
    duration: "4 महीने",
    overview: "क्लाउड कंप्यूटिंग ने सॉफ्टवेयर बनाने और वितरित करने के तरीके को बदल दिया है। यह कोर्स AWS पर केंद्रित है, जो दुनिया का अग्रणी क्लाउड प्लेटफॉर्म है, और DevOps कार्यप्रणाली जो टीमों को उच्च गति और पैमाने पर सॉफ्टवेयर बनाने और तैनात करने की अनुमति देती है।",
    whoFor: ["सॉफ्टवेयर इंजीनियर", "आईटी पेशेवर", "आधुनिक बुनियादी ढांचे के कौशल के इच्छुक छात्र", "अपने स्वयं के ऐप तैनात करने के इच्छुक डेवलपर्स"],
    achievements: ["मुख्य AWS सेवाओं (EC2, S3, RDS, Lambda) में महारत हासिल करें", "CI/CD पाइपलाइनों को समझें", "कोड के रूप में बुनियादी ढांचे का प्रबंधन करें", "वेब एप्लिकेशन को तैनात और स्केल करें", "AWS क्लाउड प्रैक्टिशनर प्रमाणन के लिए तैयारी करें"],
    modules: [
      { num: "01", title: "क्लाउड फंडामेंटल्स", desc: "क्लाउड क्या है और यह पारंपरिक आईटी को कैसे बदलता है।" },
      { num: "02", title: "AWS कोर सर्विसेज", desc: "AWS पर कंप्यूट, स्टोरेज, नेटवर्किंग और सुरक्षा।" },
      { num: "03", title: "DevOps प्रथाएं", desc: "स्वचालन, पाइपलाइन और DevOps संस्कृति।" },
      { num: "04", title: "स्केलिंग और मॉनिटरिंग", desc: "यह सुनिश्चित करना कि आपका ऐप चालू रहे और ट्रैफ़िक को संभाले।" },
    ],
  },
  "digital-marketing": {
    title: "डिजिटल मार्केटिंग",
    tagline: "डिजिटल दुनिया से जुड़ें।",
    desc: "पूर्ण डिजिटल मार्केटिंग टूलकिट में महारत हासिल करें — SEO और सोशल मीडिया से लेकर सशुल्क विज्ञापन और एनालिटिक्स तक।",
    duration: "3 महीने",
    overview: "मार्केटिंग होर्डिंग से स्क्रीन पर चली गई है। यह कोर्स पूरे डिजिटल मार्केटिंग स्पेक्ट्रम को कवर करता है, जो आपको डिजिटल युग में ब्रांड बनाने, ग्राहक प्राप्त करने और सफलता को मापने का तरीका सिखाता है।",
    whoFor: ["बिजनेस छात्र", "मार्केटिंग में करियर बनाने के इच्छुक", "अपने ब्रांड को विकसित करने के इच्छुक उद्यमी", "डिजिटल में जाने वाले पारंपरिक मार्केटर"],
    achievements: ["SEO और SEM में महारत हासिल करें", "प्रभावी सोशल मीडिया रणनीतियां बनाएं", "सफल सशुल्क विज्ञापन अभियान चलाएं", "कंटेंट मार्केटिंग और ईमेल को समझें", "मार्केटिंग निर्णय लेने के लिए एनालिटिक्स का उपयोग करें"],
    modules: [
      { num: "01", title: "मार्केटिंग रणनीति", desc: "दर्शकों, फनल और ब्रांड आवाज को समझना।" },
      { num: "02", title: "SEO और खोज", desc: "Google पर रैंक कैसे करें और ऑर्गेनिक ट्रैफ़िक कैसे प्राप्त करें।" },
      { num: "03", title: "सोशल मीडिया", desc: "प्रमुख प्लेटफार्मों पर समुदाय और जुड़ाव बनाना।" },
      { num: "04", title: "विज्ञापन और एनालिटिक्स", desc: "सशुल्क विज्ञापन (Meta, Google) और ROI को मापना।" },
    ],
  },
  "business-english": {
    title: "बिजनेस इंग्लिश",
    tagline: "प्रभाव के साथ संवाद करें।",
    desc: "अंग्रेजी में बैठकों, ईमेल, प्रस्तुतियों और बातचीत में पेशेवर संचार कौशल में सुधार करें।",
    duration: "3 महीने",
    overview: "अंग्रेजी वैश्विक व्यापार की भाषा है। यह कोर्स एक पेशेवर वातावरण में उत्कृष्टता प्राप्त करने के लिए आवश्यक विशिष्ट शब्दावली, संरचनाओं और सांस्कृतिक बारीकियों पर केंद्रित है, स्पष्ट ईमेल लिखने से लेकर अंतरराष्ट्रीय कॉल का नेतृत्व करने तक।",
    whoFor: ["कामकाजी पेशेवर", "नौकरी चाहने वाले", "साक्षात्कार की तैयारी करने वाले छात्र", "अपनी कॉर्पोरेट अंग्रेजी को चमकाने के इच्छुक लोग"],
    achievements: ["स्पष्ट, पेशेवर ईमेल और रिपोर्ट लिखें", "व्यापार की शब्दावली में महारत हासिल करें", "बैठकों में आत्मविश्वास से नेतृत्व करें और भाग लें", "अंग्रेजी में प्रभावी ढंग से बातचीत करें", "सम्मोहक पेशेवर प्रस्तुतियां दें"],
    modules: [
      { num: "01", title: "पेशेवर लेखन", desc: "ईमेल, रिपोर्ट और पेशेवर पत्राचार।" },
      { num: "02", title: "बिजनेस में बोलना", desc: "बैठकें, कॉल और नेटवर्किंग परिदृश्य।" },
      { num: "03", title: "अंग्रेजी में प्रस्तुति", desc: "संरचना, शब्दावली और प्रश्नोत्तर को संभालना।" },
      { num: "04", title: "उन्नत विषय", desc: "बातचीत, संघर्ष और सांस्कृतिक बारीकियां।" },
    ],
  },
};

const relatedLabels = {
  "full-stack-development": { shortDesc: "Master the web.", shortDescHi: "वेब में महारत हासिल करें।" },
  "java-development": { shortDesc: "Enterprise backend power.", shortDescHi: "एंटरप्राइज बैकएंड पावर।" },
  "blockchain": { shortDesc: "The future of trust.", shortDescHi: "विश्वास का भविष्य।" },
  "artificial-intelligence": { shortDesc: "Build intelligent systems.", shortDescHi: "बुद्धिमान सिस्टम बनाएं।" },
  "machine-learning": { shortDesc: "Turning data to insight.", shortDescHi: "डेटा को अंतर्दृष्टि में बदलना।" },
  "python-with-ai": { shortDesc: "The language of AI.", shortDescHi: "AI की भाषा।" },
  "advanced-excel": { shortDesc: "The corporate data tool.", shortDescHi: "कॉर्पोरेट डेटा टूल।" },
  "data-science": { shortDesc: "The sexiest job of 21st century.", shortDescHi: "21वीं सदी की सबसे बेहतरीन नौकरी।" },
  "cyber-security": { shortDesc: "Protect the digital world.", shortDescHi: "डिजिटल दुनिया की रक्षा करें।" },
  "cloud-computing": { shortDesc: "Infrastructure at scale.", shortDescHi: "बड़े पैमाने पर बुनियादी ढांचा।" },
  "digital-marketing": { shortDesc: "Connect and grow.", shortDescHi: "जुड़ें और बढ़ें।" },
  "data-analytics": { shortDesc: "Insights through data.", shortDescHi: "डेटा के माध्यम से अंतर्दृष्टि।" },
  "leadership-management": { shortDesc: "Lead with impact.", shortDescHi: "प्रभाव के साथ नेतृत्व करें।" },
  "six-sigma": { shortDesc: "Process perfection.", shortDescHi: "प्रक्रिया पूर्णता।" },
  "business-english": { shortDesc: "Global professional English.", shortDescHi: "वैश्विक पेशेवर अंग्रेजी।" },
  "soft-skills-training-course": { shortDesc: "Human skills for success.", shortDescHi: "सफलता के लिए मानवीय कौशल।" },
  "foreign-languages": { shortDesc: "Speak a new world.", shortDescHi: "एक नई दुनिया बोलें।" },
  "ielts-toefl": { shortDesc: "Open global doors.", shortDescHi: "वैश्विक दरवाजे खोलें।" },
};

export default function CourseDetail() {
  const { lang } = useLang();
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || "full-stack-development";
  
  const [dbCourse, setDbCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchCourse = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (data) setDbCourse(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  // Merge logic
  const isHi = lang === 'hi';
  const staticData = allCourses[slug] || allCourses["full-stack-development"];
  const staticHi = allCoursesHi[slug] || allCoursesHi["full-stack-development"];
  
  // Localization logic
  const localize = (dbItem) => {
    return {
      ...dbItem,
      title: (isHi ? dbItem.title_hi : null) || dbItem.title,
      tagline: (isHi ? dbItem.tagline_hi : null) || dbItem.tagline,
      description: (isHi ? dbItem.description_hi : null) || dbItem.description,
      overview: (isHi ? dbItem.overview_hi : null) || dbItem.overview,
      whoFor: (isHi && Array.isArray(dbItem.who_is_it_for_hi) && dbItem.who_is_it_for_hi.length > 0) 
        ? dbItem.who_is_it_for_hi 
        : (Array.isArray(dbItem.who_is_it_for) && dbItem.who_is_it_for.length > 0 ? dbItem.who_is_it_for : undefined),
      achievements: (isHi && Array.isArray(dbItem.achievements_hi) && dbItem.achievements_hi.length > 0) 
        ? dbItem.achievements_hi 
        : (Array.isArray(dbItem.achievements) && dbItem.achievements.length > 0 ? dbItem.achievements : undefined),
      modules: (isHi && Array.isArray(dbItem.modules_hi) && dbItem.modules_hi.length > 0) 
        ? dbItem.modules_hi 
        : (Array.isArray(dbItem.modules) && dbItem.modules.length > 0 ? dbItem.modules : undefined),
    };
  };

  const finalStatic = isHi ? { ...staticData, ...staticHi } : staticData;
  const course = dbCourse ? { ...finalStatic, ...localize(dbCourse) } : finalStatic;
  const color = course.color || "#1e7a78";

  return (
    <div className="bg-[#0d1f1a] pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #071820 0%, #0d1f1a 60%, #0a1510 100%)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#a8b8a8] mb-8">
            <Link to={createPageUrl("Home")} className="hover:text-white transition-colors flex items-center gap-1"><Home size={13} /> {t(lang, "nav_home") || (isHi ? "होम" : "Home")}</Link>
            <span>/</span>
            <Link to={createPageUrl("Programs")} className="hover:text-white transition-colors">{t(lang, "nav_programs")}</Link>
            <span>/</span>
            <span className="text-white">{course.title}</span>
          </nav>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-[#c8d5c8] mb-8 overflow-hidden">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" 
                 style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "sans-serif" }}>
              {course.icon && (course.icon.startsWith('http') || course.icon.startsWith('/')) ? (
                <img src={course.icon} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                course.icon
              )}
            </span> {course.category || t(lang, "specialised_courses")}
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-5">
              {course.title.split(" ").slice(0, -1).join(" ")} <br />
              <span className="italic" style={{ color: color }}>{course.title.split(" ").slice(-1)}</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl italic mb-5 text-[#c8d5c8]">"{course.tagline}"</p>
            <p className="text-[#a8b8a8] text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              {course.description || course.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl("Contact") + `?course=${course.slug}`} className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg shadow-emerald-900/20" style={{ backgroundColor: color }}>
                {t(lang, "prog_enrol")} <ArrowRight size={16} />
              </Link>
              <a href="#overview" className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all">{t(lang, "azure_curriculum")}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-[#0a1a14] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {[
              { label: t(lang, "prog_duration"), value: course.duration },
              { label: t(lang, "prog_format"), value: course.mode },
              { label: isHi ? "बैच का आकार" : "BATCH SIZE", value: course.batchSize || "20-30" },
              { label: isHi ? "प्रमाण पत्र" : "CERTIFICATE", value: course.certificate },
            ].map(({ label, value }) => (
              <div key={label} className="lg:px-8 first:pl-0 last:pr-0">
                <p className="text-xs font-semibold tracking-widest mb-1" style={{ color: color }}>{label}</p>
                <p className="text-white font-medium text-sm leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview */}
      <section id="overview" className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: color }}>{t(lang, "prog_overview")}</p>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6">{isHi ? "यह पाठ्यक्रम" : "What this course"} <span className="italic" style={{ color: color }}>{isHi ? "किस बारे में है" : "is about"}</span></h2>
              <p className="text-[#a8b8a8] leading-relaxed text-lg mb-8">{course.overview}</p>
              <div>
                <p className="text-white font-semibold text-sm uppercase tracking-wide mb-4">{t(lang, "prog_who_for")}</p>
                <ul className="space-y-3">
                  {(course.whoFor || []).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#a8b8a8]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🏆</span>
                <p className="text-white font-bold text-sm uppercase tracking-wider">{t(lang, "prog_achievements")}</p>
              </div>
              <ol className="space-y-4">
                {(course.achievements || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: `${color}40`, border: `1px solid ${color}60` }}>{i + 1}</span>
                    <span className="text-[#c8d5c8] leading-snug pt-1">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-14 sm:py-20 bg-[#0a1a14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: color }}>{t(lang, "azure_curriculum")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">{t(lang, "prog_modules")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {(course.modules || []).map((mod, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                <div className="text-4xl font-serif font-bold mb-4 opacity-30" style={{ color: color }}>{mod.num}</div>
                <h3 className="text-white font-semibold text-lg mb-2 font-serif">{mod.title}</h3>
                <p className="text-[#a8b8a8] text-sm leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-24 bg-gradient-to-b from-[#0a1a14] to-[#0d1f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
            {isHi ? (<>क्या आप <br /><span className="italic" style={{ color: color }}>{course.title}</span> में महारत हासिल करने के लिए तैयार हैं?</>) : (<>Ready to master <br /><span className="italic" style={{ color: color }}>{course.title}?</span></>)}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl("Contact") + `?course=${course.slug}`} className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105" style={{ backgroundColor: color }}>
              {t(lang, "prog_enrol")} <ArrowRight size={16} />
            </Link>
            <Link to={createPageUrl("Programs")} className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all">{isHi ? "कार्यक्रमों पर वापस जाएं" : "BACK TO PROGRAMS"}</Link>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-12 sm:py-16 bg-[#0a1a14] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6 sm:mb-8">{isHi ? "संबंधित पाठ्यक्रम" : "Related Courses"}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
            {(course.relatedSlugs || []).map((rSlug) => {
              const rc = allCourses[rSlug];
              if (!rc) return null;
              return (
                <Link key={rSlug} to={createPageUrl("CourseDetail") + `?slug=${rSlug}`}
                  className="group flex flex-col gap-2 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-white/25 transition-all card-hover"
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0" 
                        style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "sans-serif" }}>
                    {rc.icon && (rc.icon.startsWith('http') || rc.icon.startsWith('/')) ? (
                      <img src={rc.icon} alt={rc.title} className="w-full h-full object-cover" />
                    ) : (
                      rc.icon
                    )}
                  </span>
                  <p className="text-white font-semibold text-sm leading-snug group-hover:text-[#e8b429] transition-colors">{isHi ? (allCoursesHi[rSlug]?.title || rc.title) : rc.title}</p>
                  <p className="text-[#a8b8a8] text-xs leading-relaxed">{isHi ? (relatedLabels[rSlug]?.shortDescHi || relatedLabels[rSlug]?.shortDesc) : (relatedLabels[rSlug]?.shortDesc || relatedLabels[rSlug])}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}