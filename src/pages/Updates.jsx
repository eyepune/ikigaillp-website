import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/lib/supabaseClient";
import { createPageUrl } from "@/utils";
import { useLang } from "../components/LanguageContext";
import { t } from "../components/i18n";
import { Tag, Calendar, ArrowRight } from "lucide-react";

const categoryColors = {
  News: "#e84c1e",
  Workshop: "#1e7a78",
  Achievement: "#e8b429",
  Announcement: "#2d8a4e",
  Blog: "#9b5e91",
};

export default function Updates() {
  const { lang } = useLang();
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('updates')
          .select('*')
          .eq('status', 'published')
          .order('published_date', { ascending: false });

        if (error) throw error;
        setUpdates(data || []);
      } catch (error) {
        console.error('Error fetching updates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  const categories = {
    en: ["All", "News", "Workshop", "Achievement", "Announcement", "Blog"],
    hi: ["सभी", "समाचार", "कार्यशाला", "उपलब्धि", "घोषणा", "ब्लॉग"],
  };
  const filtered = activeCategory === "All" ? updates : updates.filter((u) => u.category === activeCategory);

  return (
    <div className="bg-[#0d1f1a] pt-20">
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0f2820] to-[#0d1f1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{t(lang, "latest")}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6">{t(lang, "updates_heading")}</h1>
          <p className="text-[#a8b8a8] text-base sm:text-xl max-w-2xl mx-auto">{t(lang, "updates_intro")}</p>
        </div>
      </section>

      <section className="py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-12">
            {(categories[lang] || categories.en).map((cat, i) => (
              <button key={cat} onClick={() => setActiveCategory(categories.en[i])}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === categories.en[i] ? "bg-[#e84c1e] text-white" : "bg-white/5 border border-white/10 text-[#a8b8a8] hover:text-white hover:bg-white/10"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="bg-white/5 border border-white/10 rounded-2xl h-64 animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">📝</p>
              <h3 className="text-white text-2xl font-serif font-bold mb-3">{t(lang, "no_updates")}</h3>
              <p className="text-[#a8b8a8]">{t(lang, "no_updates_sub")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((update) => {
                const isHi = lang === 'hi';
                const displayTitle = (isHi ? update.title_hi : null) || update.title;
                const displayExcerpt = (isHi ? update.excerpt_hi : null) || update.excerpt;
                const color = categoryColors[update.category] || "#e84c1e";
                
                return (
                  <Link 
                    key={update.id} 
                    to={createPageUrl("UpdateDetail") + `?slug=${update.slug}`}
                    className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all card-hover"
                  >
                    {update.cover_image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={update.cover_image} 
                          alt={displayTitle} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                    )}
                    {!update.cover_image && (
                      <div className="h-32 flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                        <span className="text-5xl">📖</span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${color}20`, color: color }}>
                          <Tag size={10} /> {update.category}
                        </span>
                        {update.published_date && (
                          <span className="flex items-center gap-1 text-[#a8b8a8] text-xs">
                            <Calendar size={10} /> {new Date(update.published_date).toLocaleDateString(isHi ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        )}
                      </div>
                      <h2 className="text-white font-bold text-lg font-serif mb-2 group-hover:text-[#e8b429] transition-colors">{displayTitle}</h2>
                      {displayExcerpt && <p className="text-[#a8b8a8] text-sm leading-relaxed flex-1 mb-4">{displayExcerpt}</p>}
                      <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: color }}>
                        {t(lang, "read_more")} <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}