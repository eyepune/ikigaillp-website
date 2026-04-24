import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useLang } from "../components/LanguageContext";

const categoryColors = {
  News: "#e84c1e",
  Workshop: "#1e7a78",
  Achievement: "#e8b429",
  Announcement: "#2d8a4e",
  Blog: "#9b5e91",
};

export default function UpdateDetail() {
  const { lang } = useLang();
  const isHi = lang === 'hi';
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchUpdate = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('updates')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;
        setUpdate(data);
      } catch (error) {
        console.error('Error fetching update:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdate();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#0d1f1a] pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#e84c1e] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#a8b8a8]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!update) {
    return (
      <div className="bg-[#0d1f1a] pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="text-white text-2xl font-serif font-bold mb-3">Update not found</h2>
          <Link to={createPageUrl("Updates")} className="text-[#e84c1e] hover:text-white transition-colors">← Back to Updates</Link>
        </div>
      </div>
    );
  }

  const color = categoryColors[update.category] || "#e84c1e";
  const displayTitle = (isHi ? update.title_hi : null) || update.title;
  const displayExcerpt = (isHi ? update.excerpt_hi : null) || update.excerpt;
  const displayContent = (isHi ? update.content_hi : null) || update.content;

  return (
    <div className="bg-[#0d1f1a] pt-20">
      {/* Hero */}
      <section className="py-12 sm:py-16 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}10 0%, #0d1f1a 70%)` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={createPageUrl("Updates")} className="inline-flex items-center gap-2 text-[#a8b8a8] hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> {isHi ? "अपडेट्स पर वापस जाएं" : "Back to Updates"}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: `${color}20`, color }}>
              <Tag size={10} /> {update.category}
            </span>
            {update.published_date && (
              <span className="flex items-center gap-1 text-[#a8b8a8] text-sm">
                <Calendar size={12} />
                {new Date(update.published_date).toLocaleDateString(isHi ? "hi-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
            {displayTitle}
          </h1>

          {displayExcerpt && (
            <p className="text-[#a8b8a8] text-xl leading-relaxed max-w-2xl">{displayExcerpt}</p>
          )}
        </div>
      </section>

      {/* Cover image */}
      {update.cover_image && (
        <div className="max-w-5xl mx-auto px-6 lg:px-8 -mt-4 mb-12">
          <img src={update.cover_image} alt={displayTitle} className="w-full h-80 object-cover rounded-2xl" />
        </div>
      )}

      {/* Content */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div
                className="rich-content prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: displayContent || (isHi ? "<p>जल्द आ रहा है...</p>" : "<p>Content coming soon...</p>") }}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">About this update</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#a8b8a8]">Category</span>
                    <span style={{ color }}>{update.category}</span>
                  </div>
                  {update.published_date && (
                    <div className="flex justify-between">
                      <span className="text-[#a8b8a8]">Published</span>
                      <span className="text-white">{new Date(update.published_date).toLocaleDateString("en-IN")}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-white font-semibold mb-2">Explore more</p>
                <Link to={createPageUrl("Updates")} className="text-[#a8b8a8] hover:text-white text-sm transition-colors flex items-center gap-1">
                  All updates →
                </Link>
              </div>

              <div className="p-5 rounded-xl" style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                <p className="text-white font-semibold mb-2 text-sm">Interested in our programs?</p>
                <Link to={createPageUrl("Programs")} className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color }}>
                  View Programs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}