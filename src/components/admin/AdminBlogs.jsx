import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X, Globe, FileText } from "lucide-react";

const categories = ["News", "Workshop", "Achievement", "Announcement", "Blog"];

const emptyForm = {
  title: "", title_hi: "", slug: "", excerpt: "", excerpt_hi: "", content: "", content_hi: "",
  cover_image: "", category: "Blog", status: "draft", published_date: "",
  meta_title: "", meta_description: "",
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminBlogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("content");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true); setActiveSection("content"); };
  const openEdit = (p) => { setForm({ ...emptyForm, ...p }); setEditing(p.id); setShowForm(true); setActiveSection("content"); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev, [name]: value,
      ...(name === "title" && !editing ? { slug: slugify(value), meta_title: value } : {}),
    }));
  };

  const handleSave = async (statusOverride) => {
    setSaving(true);
    const data = { ...form, status: statusOverride || form.status };
    try {
      if (editing) {
        const { error } = await supabase
          .from('updates')
          .update(data)
          .eq('id', editing);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('updates')
          .insert([data]);
        if (error) throw error;
      }
      await load();
      closeForm();
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving post: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('updates')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setDeleteConfirm(null);
      load();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredPosts = filterStatus === "all" ? posts : posts.filter(p => p.status === filterStatus);

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", padding: "10px 14px", color: "white", fontSize: "14px", outline: "none",
  };
  const labelStyle = { color: "#a8b8a8", fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "6px" };

  const categoryColors = { News: "#1e7a78", Workshop: "#e84c1e", Achievement: "#2d8a4e", Announcement: "#e8b429", Blog: "#9b5e91" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ color: "white", fontSize: "18px", fontWeight: 700, margin: "0 0 4px" }}>Blog Posts</h2>
          <p style={{ color: "#a8b8a8", fontSize: "13px", margin: 0 }}>{posts.length} total posts</p>
        </div>
        <button onClick={openNew} style={{ display: "flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg, #2d8a4e, #1e6035)", color: "white", border: "none", borderRadius: "100px", padding: "10px 20px", fontSize: "13px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(45,138,78,0.3)" }}>
          <Plus size={15} /> New Post
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["all", "published", "draft"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{
            padding: "6px 16px", borderRadius: "100px", border: "1px solid",
            fontSize: "12px", fontWeight: 600, cursor: "pointer",
            borderColor: filterStatus === s ? "#2d8a4e" : "rgba(255,255,255,0.1)",
            background: filterStatus === s ? "rgba(45,138,78,0.15)" : "transparent",
            color: filterStatus === s ? "#2d8a4e" : "#a8b8a8",
            textTransform: "capitalize",
          }}>{s}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8" }}>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredPosts.map(p => (
            <div key={p.id} style={{ display: "flex", gap: "16px", padding: "16px 20px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {p.cover_image && <img src={p.cover_image} style={{ width: 70, height: 70, borderRadius: "12px", objectFit: "cover", flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700,
                    background: `${categoryColors[p.category] || "#a8b8a8"}18`,
                    color: categoryColors[p.category] || "#a8b8a8",
                    border: `1px solid ${categoryColors[p.category] || "#a8b8a8"}30`,
                  }}>{p.category}</span>
                  <span style={{
                    padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600,
                    background: p.status === "published" ? "rgba(45,138,78,0.12)" : "rgba(255,255,255,0.06)",
                    color: p.status === "published" ? "#2d8a4e" : "#a8b8a8",
                  }}>{p.status}</span>
                </div>
                <p style={{ color: "white", fontWeight: 700, fontSize: "15px", margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</p>
                <p style={{ color: "#a8b8a8", fontSize: "12px", margin: 0 }}>{p.excerpt?.slice(0, 80) || p.slug}</p>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                <button onClick={() => openEdit(p)} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(45,138,78,0.3)", background: "rgba(45,138,78,0.12)", color: "#2d8a4e", cursor: "pointer", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => setDeleteConfirm(p.id)} style={{ padding: "6px", borderRadius: "8px", border: "1px solid rgba(232,76,30,0.2)", background: "rgba(232,76,30,0.10)", color: "#e84c1e", cursor: "pointer" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {filteredPosts.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)" }}>
              <p style={{ fontSize: "32px", margin: "0 0 12px" }}>✍️</p>
              <p style={{ margin: 0 }}>No posts yet. Write your first one!</p>
            </div>
          )}
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#0a1a12", border: "1px solid rgba(232,76,30,0.3)", borderRadius: "20px", padding: "32px", maxWidth: "380px", width: "90%", textAlign: "center" }}>
            <p style={{ fontSize: "32px", margin: "0 0 12px" }}>🗑️</p>
            <h3 style={{ color: "white", margin: "0 0 8px" }}>Delete Post?</h3>
            <p style={{ color: "#a8b8a8", fontSize: "14px", margin: "0 0 24px" }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: "10px 20px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "white", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: "10px 20px", borderRadius: "100px", border: "none", background: "#e84c1e", color: "white", fontWeight: 700, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Drawer */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "100%", maxWidth: "700px", background: "#0a1a12", borderLeft: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#0a1a12", zIndex: 10 }}>
              <h2 style={{ color: "white", margin: 0, fontSize: "18px", fontWeight: 700 }}>{editing ? "Edit Post" : "New Blog Post"}</h2>
              <button onClick={closeForm} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "8px", padding: "6px", color: "#a8b8a8", cursor: "pointer" }}><X size={18} /></button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 24px" }}>
              {[{ id: "content", label: "Content", icon: FileText }, { id: "seo", label: "SEO & Meta", icon: Globe }].map(s => (
                <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                  padding: "12px 16px", border: "none", background: "transparent", cursor: "pointer",
                  color: activeSection === s.id ? "#2d8a4e" : "#a8b8a8",
                  borderBottom: activeSection === s.id ? "2px solid #2d8a4e" : "2px solid transparent",
                  fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px",
                }}>
                  <s.icon size={14} /> {s.label}
                </button>
              ))}
            </div>

            <div style={{ padding: "24px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "18px" }}>
              {activeSection === "content" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Category</label>
                      <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, background: "#0a1a12" }}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Published Date</label>
                      <input type="date" name="published_date" value={form.published_date} onChange={handleChange} style={{ ...inputStyle, background: "#0a1a12" }} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Title (English) *</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Post title" style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Title (Hindi)</label>
                    <input name="title_hi" value={form.title_hi || ""} onChange={handleChange} placeholder="अद्यतन शीर्षक" style={inputStyle} />
                  </div>

                  <div>
                    <label style={labelStyle}>Slug *</label>
                    <input name="slug" value={form.slug} onChange={handleChange} placeholder="url-slug" style={inputStyle} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Excerpt (English)</label>
                      <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3} placeholder="Brief summary" style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                    <div>
                      <label style={labelStyle}>Excerpt (Hindi)</label>
                      <textarea name="excerpt_hi" value={form.excerpt_hi || ""} onChange={handleChange} rows={3} placeholder="संक्षिप्त विवरण" style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Full Content (English) (HTML supported)</label>
                    <textarea name="content" value={form.content} onChange={handleChange} rows={12} placeholder="Write your full blog post here..." style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "13px" }} />
                  </div>

                  <div>
                    <label style={labelStyle}>Full Content (Hindi) (HTML supported)</label>
                    <textarea name="content_hi" value={form.content_hi || ""} onChange={handleChange} rows={12} placeholder="पूर्ण विवरण यहाँ लिखें..." style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "13px" }} />
                  </div>

                  <div>
                    <label style={labelStyle}>Cover Image URL</label>
                    <input
                      name="cover_image"
                      value={form.cover_image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      style={inputStyle}
                    />
                    {form.cover_image && <img src={form.cover_image} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "12px", marginTop: "10px" }} />}
                  </div>
                </>
              )}

              {activeSection === "seo" && (
                <>
                  <div style={{ padding: "16px", background: "rgba(45,138,78,0.08)", borderRadius: "12px", border: "1px solid rgba(45,138,78,0.2)" }}>
                    <p style={{ color: "#2d8a4e", fontSize: "13px", fontWeight: 600, margin: "0 0 4px" }}>🔍 Search Preview</p>
                    <p style={{ color: "white", fontSize: "16px", fontWeight: 700, margin: "0 0 3px" }}>{form.meta_title || form.title || "Post Title"}</p>
                    <p style={{ color: "#a8b8a8", fontSize: "13px", margin: "0 0 3px" }}>ikigai-llp.com/updates/{form.slug || "post-slug"}</p>
                    <p style={{ color: "#a8b8a8", fontSize: "13px", margin: 0 }}>{form.meta_description || form.excerpt || "Meta description will appear here..."}</p>
                  </div>

                  <div>
                    <label style={labelStyle}>Meta Title (SEO)</label>
                    <input name="meta_title" value={form.meta_title} onChange={handleChange} placeholder="SEO optimized title" style={inputStyle} />
                    <p style={{ color: form.meta_title?.length > 60 ? "#e84c1e" : "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>{form.meta_title?.length || 0}/60 characters</p>
                  </div>

                  <div>
                    <label style={labelStyle}>Meta Description (SEO)</label>
                    <textarea name="meta_description" value={form.meta_description} onChange={handleChange} rows={4} placeholder="Description shown in search results" style={{ ...inputStyle, resize: "vertical" }} />
                    <p style={{ color: form.meta_description?.length > 160 ? "#e84c1e" : "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>{form.meta_description?.length || 0}/160 characters</p>
                  </div>

                  <div>
                    <label style={labelStyle}>Status</label>
                    <select name="status" value={form.status} onChange={handleChange} style={{ ...inputStyle, background: "#0a1a12" }}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "10px", justifyContent: "flex-end", background: "#0a1a12" }}>
              <button onClick={closeForm} style={{ padding: "10px 20px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "white", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
              <button onClick={() => handleSave("draft")} disabled={saving || !form.title} style={{ padding: "10px 20px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "white", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                Save Draft
              </button>
              <button onClick={() => handleSave("published")} disabled={saving || !form.title} style={{ padding: "10px 24px", borderRadius: "100px", border: "none", background: "linear-gradient(135deg, #2d8a4e, #1e6035)", color: "white", fontWeight: 700, cursor: "pointer", fontSize: "13px", boxShadow: "0 4px 16px rgba(45,138,78,0.3)" }}>
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}