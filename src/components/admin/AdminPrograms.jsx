import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react";

const emptyForm = {
  slug: "", icon: "PR", title: "", tagline: "", description: "", content: "",
  overview: "",
  title_hi: "", tagline_hi: "", description_hi: "", content_hi: "",
  overview_hi: "",
  cover_image: "", color: "#e84c1e", duration: "", format: "",
  suitable_for: "", suitable_for_hi: "",
  status: "draft", sort_order: 0, meta_title: "", meta_description: "",
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setPrograms(data || []);
    } catch (err) {
      console.error('Error loading programs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true); setActiveSection("basic"); };
  const openEdit = (p) => { setForm({ ...emptyForm, ...p }); setEditing(p.id); setShowForm(true); setActiveSection("basic"); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev, [name]: value,
      ...(name === "title" && !editing ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from('programs')
          .update(form)
          .eq('id', editing);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([form]);
        if (error) throw error;
      }
      await load();
      closeForm();
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving program: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setDeleteConfirm(null);
      load();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const toggleStatus = async (p) => {
    try {
      const newStatus = p.status === "active" ? "draft" : "active";
      const { error } = await supabase
        .from('programs')
        .update({ status: newStatus })
        .eq('id', p.id);
      if (error) throw error;
      load();
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", padding: "10px 14px", color: "white", fontSize: "14px", outline: "none",
    transition: "border-color 0.2s",
  };
  const labelStyle = { color: "#a8b8a8", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", display: "block", marginBottom: "6px" };
  const sectionTabs = [
    { id: "basic", label: "Basic Info" },
    { id: "hindi", label: "Hindi Content" },
    { id: "details", label: "Details" },
    { id: "seo", label: "SEO" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ color: "white", fontSize: "18px", fontWeight: 700, margin: "0 0 4px" }}>Programs</h2>
          <p style={{ color: "#a8b8a8", fontSize: "13px", margin: 0 }}>{programs.length} programs total</p>
        </div>
        <button onClick={openNew} style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "linear-gradient(135deg, #e84c1e, #c52d0a)", color: "white",
          border: "none", borderRadius: "100px", padding: "10px 20px", fontSize: "13px",
          fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(232,76,30,0.3)",
        }}>
          <Plus size={15} /> Add Program
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8" }}>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {programs.map(p => (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "16px 20px", borderRadius: "16px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              transition: "all 0.2s",
            }}>
              {p.icon && (p.icon.startsWith('http') || p.icon.startsWith('/')) ? (
                <img src={p.icon} style={{ width: 56, height: 56, borderRadius: "12px", objectFit: "cover", flexShrink: 0 }} />
              ) : p.cover_image ? (
                <img src={p.cover_image} style={{ width: 56, height: 56, borderRadius: "12px", objectFit: "cover", flexShrink: 0 }} />
              ) : (
                <div style={{ 
                  width: 56, height: 56, borderRadius: "12px", 
                  background: "rgba(255,255,255,0.05)", 
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  fontSize: "20px", fontWeight: 700, color: "white", flexShrink: 0,
                  fontFamily: "sans-serif"
                }}>
                  {p.icon || "PR"}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "white", fontWeight: 700, fontSize: "15px", margin: "0 0 3px" }}>{p.title}</p>
                <p style={{ color: "#a8b8a8", fontSize: "12px", margin: 0 }}>{p.tagline || p.description?.slice(0, 60) + "..." }</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <span style={{
                  padding: "4px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700,
                  background: p.status === "active" ? "rgba(45,138,78,0.15)" : "rgba(255,255,255,0.06)",
                  color: p.status === "active" ? "#2d8a4e" : "#a8b8a8",
                  border: `1px solid ${p.status === "active" ? "rgba(45,138,78,0.3)" : "rgba(255,255,255,0.1)"}`,
                }}>{p.status}</span>
                <button onClick={() => toggleStatus(p)} title="Toggle status" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px", color: "#a8b8a8", cursor: "pointer" }}>
                  {p.status === "active" ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => openEdit(p)} style={{ background: "rgba(30,122,120,0.15)", border: "1px solid rgba(30,122,120,0.25)", borderRadius: "8px", padding: "6px 12px", color: "#1e7a78", cursor: "pointer", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => setDeleteConfirm(p.id)} style={{ background: "rgba(232,76,30,0.12)", border: "1px solid rgba(232,76,30,0.2)", borderRadius: "8px", padding: "6px", color: "#e84c1e", cursor: "pointer" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {programs.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)" }}>
              <p style={{ fontSize: "32px", margin: "0 0 12px" }}>📚</p>
              <p style={{ margin: 0 }}>No programs yet. Add your first one!</p>
            </div>
          )}
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#0a1a12", border: "1px solid rgba(232,76,30,0.3)", borderRadius: "20px", padding: "32px", maxWidth: "380px", width: "90%", textAlign: "center" }}>
            <p style={{ fontSize: "32px", margin: "0 0 12px" }}>🗑️</p>
            <h3 style={{ color: "white", margin: "0 0 8px" }}>Delete Program?</h3>
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
          <div style={{ width: "100%", maxWidth: "600px", background: "#0a1a12", borderLeft: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
            {/* Drawer header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#0a1a12", zIndex: 10 }}>
              <h2 style={{ color: "white", margin: 0, fontSize: "18px", fontWeight: 700 }}>{editing ? "Edit Program" : "New Program"}</h2>
              <button onClick={closeForm} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px", color: "#a8b8a8", cursor: "pointer" }}><X size={18} /></button>
            </div>

            {/* Section tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 24px" }}>
              {sectionTabs.map(s => (
                <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                  padding: "12px 16px", border: "none", background: "transparent", cursor: "pointer",
                  color: activeSection === s.id ? "#e84c1e" : "#a8b8a8",
                  borderBottom: activeSection === s.id ? "2px solid #e84c1e" : "2px solid transparent",
                  fontSize: "13px", fontWeight: 600,
                }}>{s.label}</button>
              ))}
            </div>

            <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "18px" }}>
              {activeSection === "basic" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Icon (emoji)</label>
                      <input name="icon" value={form.icon} onChange={handleChange} style={{ ...inputStyle, fontSize: "22px", textAlign: "center" }} maxLength={4} />
                    </div>
                    <div>
                      <label style={labelStyle}>Color</label>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <input type="color" name="color" value={form.color} onChange={handleChange} style={{ width: 44, height: 44, borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "none", cursor: "pointer", padding: "2px" }} />
                        <input name="color" value={form.color} onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Title (English) *</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Program title" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Slug *</label>
                    <input name="slug" value={form.slug} onChange={handleChange} placeholder="url-slug" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Tagline (English)</label>
                    <input name="tagline" value={form.tagline} onChange={handleChange} placeholder="Short memorable tagline" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Short Description (English)</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={2} placeholder="Brief description for cards" style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Overview (English)</label>
                    <textarea name="overview" value={form.overview} onChange={handleChange} rows={4} placeholder="Full program overview..." style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Full Content / HTML (English)</label>
                    <textarea name="content" value={form.content} onChange={handleChange} rows={6} placeholder="Detailed content / HTML" style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace" }} />
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
                    {form.cover_image && <img src={form.cover_image} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: "10px", marginTop: "10px" }} />}
                  </div>
                  <div>
                    <label style={labelStyle}>Status</label>
                    <select name="status" value={form.status} onChange={handleChange} style={{ ...inputStyle, background: "#0a1a12" }}>
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                </>
              )}

              {activeSection === "hindi" && (
                <>
                  <div style={{ background: "rgba(232,76,30,0.05)", border: "1px solid rgba(232,76,30,0.1)", borderRadius: "12px", padding: "16px", marginBottom: "8px" }}>
                    <p style={{ color: "#e84c1e", fontSize: "12px", fontWeight: 700, margin: 0 }}>Hindi Translations</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Title (Hindi)</label>
                    <input name="title_hi" value={form.title_hi || ""} onChange={handleChange} placeholder="व्यक्तित्व विकास" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Tagline (Hindi)</label>
                    <input name="tagline_hi" value={form.tagline_hi || ""} onChange={handleChange} placeholder="स्वयं को जानें। स्वयं को बढ़ाएं।" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Short Description (Hindi)</label>
                    <textarea name="description_hi" value={form.description_hi || ""} onChange={handleChange} rows={3} placeholder="गहन आत्म-जागरूकता सत्र..." style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Overview (Hindi)</label>
                    <textarea name="overview_hi" value={form.overview_hi || ""} onChange={handleChange} rows={4} placeholder="पूरे कार्यक्रम का अवलोकन..." style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Full Content (Hindi)</label>
                    <textarea name="content_hi" value={form.content_hi || ""} onChange={handleChange} rows={6} placeholder="Detailed content in Hindi..." style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                </>
              )}

              {activeSection === "details" && (
                <>
                  <div>
                    <label style={labelStyle}>Duration</label>
                    <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 8–12 weeks" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Format</label>
                    <input name="format" value={form.format} onChange={handleChange} placeholder="e.g. Group & 1-on-1" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Suitable For (English)</label>
                    <input name="suitable_for" value={form.suitable_for} onChange={handleChange} placeholder="e.g. Students, Professionals" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Suitable For (Hindi)</label>
                    <input name="suitable_for_hi" value={form.suitable_for_hi || ""} onChange={handleChange} placeholder="जैसे: छात्र, पेशेवर" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Sort Order</label>
                    <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} style={inputStyle} />
                  </div>
                </>
              )}

              {activeSection === "seo" && (
                <>
                  <div>
                    <label style={labelStyle}>Meta Title</label>
                    <input name="meta_title" value={form.meta_title} onChange={handleChange} placeholder="SEO title (60 chars)" style={inputStyle} />
                    <p style={{ color: form.meta_title?.length > 60 ? "#e84c1e" : "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>{form.meta_title?.length || 0}/60</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Meta Description</label>
                    <textarea name="meta_description" value={form.meta_description} onChange={handleChange} rows={3} placeholder="SEO description (160 chars)" style={{ ...inputStyle, resize: "vertical" }} />
                    <p style={{ color: form.meta_description?.length > 160 ? "#e84c1e" : "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>{form.meta_description?.length || 0}/160</p>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "10px", justifyContent: "flex-end", position: "sticky", bottom: 0, background: "#0a1a12" }}>
              <button onClick={closeForm} style={{ padding: "10px 20px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "white", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title} style={{ padding: "10px 24px", borderRadius: "100px", border: "none", background: saving ? "#555" : "linear-gradient(135deg, #e84c1e, #c52d0a)", color: "white", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontSize: "13px", boxShadow: "0 4px 16px rgba(232,76,30,0.3)" }}>
                {saving ? "Saving..." : editing ? "Update Program" : "Create Program"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}