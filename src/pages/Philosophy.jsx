import IkigaiFourDiagram from "../components/home/IkigaiFourDiagram";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import { useLang } from "../components/LanguageContext";
import { t } from "../components/i18n";

export default function Philosophy() {
  const { lang } = useLang();

  const concepts = [
    { emoji: "❤️", kanji: "愛", labelKey: "passion_label", descKey: "passion_desc", color: "#e84c1e" },
    { emoji: "⚡", kanji: "才", labelKey: "profession_label", descKey: "profession_desc", color: "#1e7a78" },
    { emoji: "🌍", kanji: "使", labelKey: "mission_label_phil", descKey: "mission_desc", color: "#2d8a4e" },
    { emoji: "💼", kanji: "業", labelKey: "vocation_label", descKey: "vocation_desc", color: "#e8b429" },
  ];

  return (
    <div className="bg-[#0d1f1a] pt-20">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0f2820] to-[#0d1f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{t(lang, "our_philosophy")}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6">
            {t(lang, "art_of_ikigai")}
          </h1>
          <p className="text-[#a8b8a8] text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
            {t(lang, "philosophy_quote_intro")}
          </p>
        </div>
      </section>

      {/* Diagram Section */}
      <section className="py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex justify-center w-full">
              <IkigaiFourDiagram size={480} />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">生き甲斐 — ikigaiE</h2>
              <p className="text-[#a8b8a8] leading-relaxed mb-4">{t(lang, "ikigai_meaning")}</p>
              <p className="text-[#a8b8a8] leading-relaxed mb-4">{t(lang, "ikigai_culture")}</p>
              <p className="text-[#a8b8a8] leading-relaxed mb-8">{t(lang, "ikigai_we")}</p>
              <div className="p-6 bg-[#e84c1e]/10 border border-[#e84c1e]/30 rounded-2xl">
                <p className="text-[#e8b429] font-serif italic text-lg leading-relaxed">{t(lang, "ikigai_quote")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Concepts */}
      <section className="py-14 sm:py-24 bg-[#0f1f18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">{t(lang, "four_dimensions")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {concepts.map((c, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{c.emoji}</span>
                  <div>
                    <span className="text-3xl font-serif opacity-30 text-white mr-3">{c.kanji}</span>
                    <h3 className="text-white font-bold text-lg mt-1" style={{ color: c.color }}>{t(lang, c.labelKey)}</h3>
                  </div>
                </div>
                <p className="text-[#a8b8a8] leading-relaxed">{t(lang, c.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Application */}
      <section className="py-14 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">{t(lang, "how_we_apply")}</h2>
          <p className="text-[#a8b8a8] text-lg leading-relaxed mb-8">{t(lang, "how_we_apply_body")}</p>
          <Link to={createPageUrl("Programs")} className="inline-flex items-center gap-2 bg-[#e84c1e] hover:bg-[#d43d12] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105">
            {t(lang, "explore_our_programs")} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}