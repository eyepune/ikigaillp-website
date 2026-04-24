import React, { useState } from 'react';
import { supabase } from "@/lib/supabaseClient";
import { Mail, MapPin, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { useLang } from "../components/LanguageContext";
import { t } from "../components/i18n";

const programs = {
  en: ["Personality Development", "Public Speaking & Communication", "Career Counselling", "Leadership & Team Building", "Soft Skills Training", "Workshop Facilitation"],
  hi: ["व्यक्तित्व विकास", "सार्वजनिक वक्तृत्व और संचार", "करियर परामर्श", "नेतृत्व और टीम निर्माण", "सॉफ्ट स्किल्स प्रशिक्षण", "कार्यशाला सुविधा"],
};

const courses = {
  en: [
    "Full Stack Development", "Java Development", "Blockchain",
    "Microsoft Azure Fundamentals (AZ-900)",
    "Artificial Intelligence", "Machine Learning", "Python with AI",
    "Advanced Excel", "Data Science", "Cyber Security", "Cloud Computing (AWS & DevOps)",
    "Digital Marketing", "Data Analytics", "Leadership & Management Program", "Six Sigma",
    "Business English", "Soft Skills Training (Course)", "Foreign Languages", "IELTS / TOEFL Preparation",
  ],
  hi: [
    "फुल स्टैक डेवलपमेंट", "जावा डेवलपमेंट", "ब्लॉकचेन",
    "माइक्रोसॉफ्ट एज़्योर फंडामेंटल्स (AZ-900)",
    "आर्टिफिशियल इंटेलिजेंस", "मशीन लर्निंग", "पायथन विद एआई",
    "एडवांस्ड एक्सेल", "डेटा साइंस", "साइबर सुरक्षा", "क्लाउड कंप्यूटिंग (AWS और DevOps)",
    "डिजिटल मार्केटिंग", "डेटा एनालिटिक्स", "नेतृत्व और प्रबंधन कार्यक्रम", "सिक्स सिग्मा",
    "बिजनेस इंग्लिश", "सॉफ्ट स्किल्स ट्रेनिंग (कोर्स)", "विदेशी भाषाएं", "IELTS / TOEFL तैयारी",
  ],
};

export default function Contact() {
  const params = new URLSearchParams(window.location.search);
  const defaultProgram = params.get("program") || "";
  const { lang } = useLang();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "",
    message: "", program_interest: defaultProgram ? defaultProgram.replace(/-/g, " ") : "",
    type: defaultProgram ? "program_enquiry" : "general",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('contact_submissions')
      .insert([form]);
    
    if (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again.');
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#0d1f1a] pt-20">
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0f2820] to-[#0d1f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{t(lang, "get_in_touch")}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6">
            {t(lang, "lets_connect")} <span className="italic text-[#e8b429]">{t(lang, "connect_highlight")}</span>
          </h1>
          <p className="text-[#a8b8a8] text-base sm:text-xl max-w-2xl mx-auto">{t(lang, "contact_intro")}</p>
        </div>
      </section>

      <section className="py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-4">{t(lang, "contact_info")}</h2>
                <p className="text-[#a8b8a8] leading-relaxed">{t(lang, "contact_info_sub")}</p>
              </div>
              {[
                { icon: Mail, labelKey: "email_label", value: "info@ikigaiedu.com", href: "mailto:info@ikigaiedu.com", color: "#e84c1e" },
                { icon: Phone, labelKey: "phone_label", value: "+91 88281 27133", href: "tel:+918828127133", color: "#1e7a78" },
                { icon: MapPin, labelKey: "location_label", valueKey: "location_value", href: null, color: "#2d8a4e" },
              ].map(({ icon: Icon, labelKey, value, valueKey, href, color }, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}20` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-[#a8b8a8] text-xs uppercase tracking-wide mb-0.5">{t(lang, labelKey)}</p>
                    {href ? (
                      <a href={href} className="text-white font-medium hover:text-[#e84c1e] transition-colors text-sm">{value}</a>
                    ) : (
                      <p className="text-white font-medium text-sm">{valueKey ? t(lang, valueKey) : value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/5 border border-white/10 rounded-3xl">
                  <CheckCircle size={60} className="text-[#2d8a4e] mb-6" />
                  <h2 className="text-3xl font-serif font-bold text-white mb-4">{t(lang, "received_title")}</h2>
                  <p className="text-[#a8b8a8] text-lg max-w-md">{t(lang, "received_body")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8 space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-white mb-2">{t(lang, "send_message")}</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#a8b8a8] text-sm mb-1.5">{t(lang, "full_name")}</label>
                      <input required name="name" value={form.name} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#e84c1e]/50 transition-colors text-sm"
                        placeholder={t(lang, "name_placeholder")} />
                    </div>
                    <div>
                      <label className="block text-[#a8b8a8] text-sm mb-1.5">{t(lang, "email_field")}</label>
                      <input required type="email" name="email" value={form.email} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#e84c1e]/50 transition-colors text-sm"
                        placeholder={t(lang, "email_placeholder")} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#a8b8a8] text-sm mb-1.5">{t(lang, "phone_field")}</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#e84c1e]/50 transition-colors text-sm"
                        placeholder={t(lang, "phone_placeholder")} />
                    </div>
                    <div>
                      <label className="block text-[#a8b8a8] text-sm mb-1.5">{t(lang, "enquiry_type")}</label>
                      <select name="type" value={form.type} onChange={handleChange}
                        className="w-full bg-[#0d1f1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e84c1e]/50 transition-colors text-sm">
                        <option value="general">{t(lang, "general_enquiry")}</option>
                        <option value="program_enquiry">{t(lang, "program_enquiry")}</option>
                        <option value="course_enquiry">{t(lang, "course_enquiry")}</option>
                      </select>
                    </div>
                  </div>
                  {form.type === "program_enquiry" && (
                    <div>
                      <label className="block text-[#a8b8a8] text-sm mb-1.5">{t(lang, "program_interest")}</label>
                      <select name="program_interest" value={form.program_interest} onChange={handleChange}
                        className="w-full bg-[#0d1f1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e84c1e]/50 transition-colors text-sm">
                        <option value="">{t(lang, "select_program")}</option>
                        {(programs[lang] || programs.en).map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  )}
                  {form.type === "course_enquiry" && (
                    <div>
                      <label className="block text-[#a8b8a8] text-sm mb-1.5">{t(lang, "course_interest")}</label>
                      <select name="program_interest" value={form.program_interest} onChange={handleChange}
                        className="w-full bg-[#0d1f1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e84c1e]/50 transition-colors text-sm">
                        <option value="">{t(lang, "select_course")}</option>
                        {(courses[lang] || courses.en).map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-[#a8b8a8] text-sm mb-1.5">{t(lang, "subject_field")}</label>
                    <input name="subject" value={form.subject} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#e84c1e]/50 transition-colors text-sm"
                      placeholder={t(lang, "subject_placeholder")} />
                  </div>
                  <div>
                    <label className="block text-[#a8b8a8] text-sm mb-1.5">{t(lang, "message_field")}</label>
                    <textarea required name="message" value={form.message} onChange={handleChange} rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#e84c1e]/50 transition-colors text-sm resize-none"
                      placeholder={t(lang, "message_placeholder")} />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#e84c1e] hover:bg-[#d43d12] disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition-all hover:scale-[1.02]"
                  >
                    {loading ? t(lang, "sending") : (<>{t(lang, "send_btn")} <ArrowRight size={16} /></>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}