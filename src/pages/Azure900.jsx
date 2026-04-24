import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Home, CheckCircle, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "../components/LanguageContext";
import { t } from "../components/i18n";

const color = "#0078d4"; // Azure brand blue

const emptyForm = {
  name: "", email: "", phone: "", college: "", age: "", department: "", language: "",
};

export default function Azure900() {
  const { lang } = useLang();
  const isHi = lang === 'hi';
  
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.college.trim()) errs.college = "College / Institute is required";
    if (!form.age || isNaN(Number(form.age))) errs.age = "Valid age is required";
    if (!form.department.trim()) errs.department = "Department is required";
    if (!form.language) errs.language = "Please select a language preference";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const { error } = await supabase
        .from('azure900_enrollments')
        .insert([{ ...form, age: Number(form.age) }]);
      
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error('Enrollment error:', err);
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#0078d4]/60 transition-colors text-sm";
  const labelClass = "block text-[#a8b8a8] text-xs font-semibold uppercase tracking-wide mb-1.5";
  const errClass = "text-red-400 text-xs mt-1";

  return (
    <div className="bg-[#0d1f1a] pt-16">
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071820 0%, #0d1f1a 60%, #0a1510 100%)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#a8b8a8] mb-8 flex-wrap">
            <Link to={createPageUrl("Home")} className="hover:text-white transition-colors flex items-center gap-1"><Home size={13} /> {t(lang, "nav_home")}</Link>
            <span>/</span>
            <Link to={createPageUrl("Programs")} className="hover:text-white transition-colors">{t(lang, "nav_programs")}</Link>
            <span>/</span>
            <span className="text-white">{isHi ? "माइक्रोसॉफ्ट एज़्योर" : "Microsoft Azure Fundamentals (AZ-900)"}</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-[#c8d5c8] mb-8">
            <span>☁️</span> {t(lang, "specialised_courses")}
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-5">
              {isHi ? "माइक्रोसॉफ्ट एज़्योर" : "Microsoft Azure"}<br />
              <span className="italic" style={{ color }}>{isHi ? "फंडामेंटल्स (AZ-900)" : "Fundamentals (AZ-900)"}</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl italic mb-5 text-[#60b0ff]">"{t(lang, "azure_tagline")}"</p>
            <p className="text-[#a8b8a8] text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              {t(lang, "azure_intro")}
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={scrollToForm}
                className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: color }}>
                {t(lang, "prog_enrol")} <ArrowRight size={16} />
              </button>
              <Link to={createPageUrl("Programs")}
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all">
                {t(lang, "footer_programs")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#0a1a14] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {[
              { label: t(lang, "prog_duration"), value: t(lang, "azure_stats_duration") },
              { label: t(lang, "prog_format"), value: t(lang, "azure_stats_mode") },
              { label: isHi ? "बैच का आकार" : "BATCH SIZE", value: t(lang, "azure_stats_batch") },
              { label: t(lang, "prog_certificate"), value: t(lang, "azure_stats_cert_val") },
            ].map(({ label, value }) => (
              <div key={label} className="lg:px-8 first:pl-0 last:pr-0">
                <p className="text-xs font-semibold tracking-widest mb-1" style={{ color }}>{label}</p>
                <p className="text-white font-medium text-sm leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color }}>{t(lang, "prog_overview")}</p>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6">
                {isHi ? "यह पाठ्यक्रम" : "What this course"} <span className="italic" style={{ color }}>{isHi ? "किस बारे में है" : "is about"}</span>
              </h2>
              <p className="text-[#a8b8a8] leading-relaxed text-lg mb-8">
                {t(lang, "azure_intro")}
              </p>
              <div>
                <p className="text-white font-semibold text-sm uppercase tracking-wide mb-4">{t(lang, "prog_who_for")}</p>
                <ul className="space-y-3">
                  {["azure_who_students", "azure_who_it_pro", "azure_who_stakeholders", "azure_who_anyone"].map((key, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#a8b8a8]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      {t(lang, key)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">☁️</span>
                <p className="text-white font-bold text-sm uppercase tracking-wider">{t(lang, "azure_achieve_title")}</p>
              </div>
              <ol className="space-y-4">
                {["azure_achieve_cert", "azure_achieve_concepts", "azure_achieve_portal", "azure_achieve_security", "azure_achieve_pricing"].map((key, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: `${color}40`, border: `1px solid ${color}60` }}>{i + 1}</span>
                    <span className="text-[#c8d5c8] leading-snug pt-1">{t(lang, key)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-[#0a1a14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color }}>{t(lang, "azure_curriculum")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">{t(lang, "prog_modules")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                <div className="text-4xl font-serif font-bold mb-4 opacity-30" style={{ color }}>{`0${num}`}</div>
                <h3 className="text-white font-semibold text-lg mb-2 font-serif">{t(lang, `azure_mod${num}_title`)}</h3>
                <p className="text-[#a8b8a8] text-sm leading-relaxed">{t(lang, `azure_mod${num}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={formRef} className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color }}>{t(lang, "azure_enrolment")}</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              {t(lang, "azure_enrol_title")}
            </h2>
            <p className="text-[#a8b8a8]">{t(lang, "azure_enrol_sub")}</p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center p-12 bg-white/5 border border-white/10 rounded-3xl">
              <CheckCircle size={60} className="mb-6" style={{ color: "#2d8a4e" }} />
              <h3 className="text-2xl font-serif font-bold text-white mb-3">{t(lang, "azure_success")}</h3>
              <p className="text-[#a8b8a8] text-lg max-w-sm">
                {t(lang, "azure_success_msg")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{t(lang, "form_name")}</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder={isHi ? "आपका पूरा नाम" : "Your full name"} className={inputClass} />
                  {errors['name'] && <p className={errClass}>{errors['name']}</p>}
                </div>
                <div>
                  <label className={labelClass}>{t(lang, "form_email")}</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" className={inputClass} />
                  {errors['email'] && <p className={errClass}>{errors['email']}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{t(lang, "form_phone")}</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX" className={inputClass} />
                  {errors['phone'] && <p className={errClass}>{errors['phone']}</p>}
                </div>
                <div>
                  <label className={labelClass}>{t(lang, "form_age")}</label>
                  <input name="age" type="number" min="10" max="80" value={form.age} onChange={handleChange}
                    placeholder="e.g. 21" className={inputClass} />
                  {errors['age'] && <p className={errClass}>{errors['age']}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>{t(lang, "form_college")}</label>
                <input name="college" value={form.college} onChange={handleChange}
                  placeholder={isHi ? "उदा. मुंबई विश्वविद्यालय" : "e.g. Mumbai University"} className={inputClass} />
                {errors['college'] && <p className={errClass}>{errors['college']}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{t(lang, "form_dept")}</label>
                  <input name="department" value={form.department} onChange={handleChange}
                    placeholder={isHi ? "उदा. कंप्यूटर साइंस" : "e.g. Computer Science"} className={inputClass} />
                  {errors['department'] && <p className={errClass}>{errors['department']}</p>}
                </div>
                <div>
                  <label className={labelClass}>{t(lang, "form_lang")}</label>
                  <div className="relative">
                    <select name="language" value={form.language} onChange={handleChange}
                      className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                      style={{ background: "#0d1f1a" }}>
                      <option value="">{isHi ? "भाषा चुनें" : "Select language"}</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Tamil">Tamil</option>
                    </select>
                    <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a8b8a8] pointer-events-none" />
                  </div>
                  {errors['language'] && <p className={errClass}>{errors['language']}</p>}
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50 mt-2"
                style={{ backgroundColor: color }}>
                {loading ? t(lang, "form_submitting") : (<>{t(lang, "form_submit")} <ArrowRight size={16} /></>)}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#0a1a14] to-[#0d1f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#a8b8a8] text-lg mb-6">{isHi ? "नामांकन करने से पहले प्रश्न हैं?" : "Have questions before enrolling?"}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl("Contact")}
              className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all">
              {t(lang, "nav_contact")}
            </Link>
            <Link to={createPageUrl("Programs")}
              className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all">
              {t(lang, "programs_view_all")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}