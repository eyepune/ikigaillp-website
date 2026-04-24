import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";

const categories = ["News", "Workshop", "Achievement", "Announcement", "Blog"];

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminUpdateEditor() {
  const params = new URLSearchParams(window.location.search);
  const editId = params.get("id");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    title: "", title_hi: "", slug: "", excerpt: "", excerpt_hi: "", content: "", content_hi: "",
    cover_image: "", category: "News", status: "draft",
    meta_title: "", meta_description: "", published_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.href = createPageUrl("AdminLogin"); return; }
      
      setUser(session.user);
      
      if (editId) {
        const { data, error } = await supabase
          .from('updates')
          .select('*')
          .eq('id', editId)
          .single();
        
        if (error) throw error;
        if (data) setForm({ ...form, ...data });
      }
    } catch (err) {
      console.error('Auth/Load error:', err);
      window.location.href = createPageUrl("AdminLogin");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && !editId ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleSave = async (status) => {
    setSaving(true);
    const payload = { ...form, status };
    try {
      if (editId) {
        const { error } = await supabase
          .from('updates')
          .update(payload)
          .eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('updates')
          .insert([payload]);
        if (error) throw error;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving update: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080f0c] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#e84c1e] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080f0c] text-white">
      {/* Header */}
      <header className="sticky top-0 bg-[#080f0c]/95 backdrop-blur border-b border-white/10 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl("AdminPanel")} className="flex items-center gap-2 text-[#a8b8a8] hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <h1 className="font-semibold">{editId ? "Edit Update" : "New Update"}</h1>
          <div className="flex items-center gap-3">
            {saved && <span className="text-green-400 text-sm flex items-center gap-1"><Save size={14} /> Saved!</span>}
            <button onClick={() => handleSave("draft")} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-xl text-sm transition-all disabled:opacity-50">
              <EyeOff size={14} /> Save Draft
            </button>
            <button onClick={() => handleSave("published")} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#e84c1e] hover:bg-[#d43d12] text-white font-semibold rounded-xl text-sm transition-all disabled:opacity-50">
              <Eye size={14} /> Publish
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <input
                name="title" value={form.title} onChange={handleChange}
                placeholder="Update title..."
                className="w-full bg-transparent text-white text-3xl font-serif font-bold placeholder-white/30 border-b border-white/10 pb-4 focus:outline-none focus:border-[#e84c1e]/50"
              />
            </div>

            {/* Slug */}
            <div className="flex items-center gap-2">
              <span className="text-[#a8b8a8] text-sm">/updates/</span>
              <input
                name="slug" value={form.slug} onChange={handleChange}
                placeholder="url-slug"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#e84c1e]/50"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-[#a8b8a8] text-xs uppercase tracking-wide mb-2">Excerpt / Summary</label>
              <textarea
                name="excerpt" value={form.excerpt} onChange={handleChange} rows={3}
                placeholder="A short summary that appears in listings..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#e84c1e]/50 text-sm resize-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-[#a8b8a8] text-xs uppercase tracking-wide mb-2">Content (HTML supported)</label>
              <textarea
                name="content" value={form.content} onChange={handleChange} rows={12}
                placeholder="<p>Write your update content here...</p>"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#e84c1e]/50 text-sm resize-none font-mono"
              />
            </div>

            {/* Hindi Version */}
            <div className="pt-8 border-t border-white/10 space-y-6">
              <h2 className="text-[#e84c1e] font-semibold text-lg uppercase tracking-wider">Hindi Version</h2>
              
              <div>
                <label className="block text-[#a8b8a8] text-xs uppercase tracking-wide mb-2">Title (Hindi)</label>
                <input
                  name="title_hi" value={form.title_hi || ""} onChange={handleChange}
                  placeholder="अद्यतन शीर्षक..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e84c1e]/50"
                />
              </div>

              <div>
                <label className="block text-[#a8b8a8] text-xs uppercase tracking-wide mb-2">Excerpt (Hindi)</label>
                <textarea
                  name="excerpt_hi" value={form.excerpt_hi || ""} onChange={handleChange} rows={3}
                  placeholder="संक्षिप्त विवरण..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e84c1e]/50 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-[#a8b8a8] text-xs uppercase tracking-wide mb-2">Content (Hindi)</label>
                <textarea
                  name="content_hi" value={form.content_hi || ""} onChange={handleChange} rows={12}
                  placeholder="पूर्ण विवरण यहाँ लिखें..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e84c1e]/50 text-sm resize-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Sidebar settings */}
          <div className="space-y-5">
            {/* Publish settings */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Settings</h3>

              <div>
                <label className="block text-[#a8b8a8] text-xs mb-1.5">Status</label>
                <select name="status" value={form.status} onChange={handleChange}
                  className="w-full bg-[#0d1f1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label className="block text-[#a8b8a8] text-xs mb-1.5">Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full bg-[#0d1f1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[#a8b8a8] text-xs mb-1.5">Published Date</label>
                <input type="date" name="published_date" value={form.published_date} onChange={handleChange}
                  className="w-full bg-[#0d1f1a] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none" />
              </div>
            </div>

            {/* Cover image */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Cover Image</h3>
              {form.cover_image && (
                <img src={form.cover_image} alt="Cover" className="w-full h-36 object-cover rounded-xl mb-3" />
              )}
              <input name="cover_image" value={form.cover_image} onChange={handleChange}
                placeholder="Paste image URL here"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#e84c1e]/50 placeholder-white/30" />
            </div>

            {/* SEO */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">SEO</h3>
              <div>
                <label className="block text-[#a8b8a8] text-xs mb-1.5">Meta Title</label>
                <input name="meta_title" value={form.meta_title} onChange={handleChange}
                  placeholder="SEO title..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#e84c1e]/50 placeholder-white/30" />
              </div>
              <div>
                <label className="block text-[#a8b8a8] text-xs mb-1.5">Meta Description</label>
                <textarea name="meta_description" value={form.meta_description} onChange={handleChange} rows={3}
                  placeholder="SEO description..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#e84c1e]/50 placeholder-white/30 resize-none" />
              </div>
            </div>

            {/* Save buttons */}
            <div className="space-y-2">
              <button onClick={() => handleSave("published")} disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#e84c1e] hover:bg-[#d43d12] text-white font-semibold rounded-xl text-sm transition-all disabled:opacity-50">
                <Eye size={15} /> Publish Update
              </button>
              <button onClick={() => handleSave("draft")} disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl text-sm transition-all disabled:opacity-50">
                <Save size={15} /> Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}