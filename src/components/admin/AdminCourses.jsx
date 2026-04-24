import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react";

const CATEGORIES = [
  "Software Development",
  "Technology Courses",
  "Business & Management",
  "Language & Communication",
];

const emptyForm = {
  slug: "", icon: "CO", title: "", description: "", overview: "",
  title_hi: "", tagline_hi: "", description_hi: "", content_hi: "", overview_hi: "",
  category: "Technology Courses", duration: "", mode: "", batch_size: "",
  certificate: "", cover_image: "", color: "#1e7a78",
  who_is_it_for: "", who_is_it_for_hi: "",
  achievements: "", achievements_hi: "",
  modules: "", modules_hi: "",
  status: "draft", sort_order: 0, meta_title: "", meta_description: "",
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const inputStyle = {
  width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px", padding: "10px 14px", color: "white", fontSize: "14px", outline: "none",
};
const labelStyle = {
  color: "#a8b8a8", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px",
  display: "block", marginBottom: "6px",
};

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true); setActiveSection("basic"); };
  const openEdit = (c) => { 
    const formatted = { 
      ...emptyForm, 
      ...c,
      who_is_it_for: Array.isArray(c.who_is_it_for) ? c.who_is_it_for.join('\n') : (c.who_is_it_for || ""),
      who_is_it_for_hi: Array.isArray(c.who_is_it_for_hi) ? c.who_is_it_for_hi.join('\n') : (c.who_is_it_for_hi || ""),
      achievements: Array.isArray(c.achievements) ? c.achievements.join('\n') : (c.achievements || ""),
      achievements_hi: Array.isArray(c.achievements_hi) ? c.achievements_hi.join('\n') : (c.achievements_hi || ""),
      modules: typeof c.modules === 'object' && c.modules !== null ? JSON.stringify(c.modules, null, 2) : (c.modules || ""),
      modules_hi: typeof c.modules_hi === 'object' && c.modules_hi !== null ? JSON.stringify(c.modules_hi, null, 2) : (c.modules_hi || ""),
    };
    setForm(formatted); 
    setEditing(c.id); 
    setShowForm(true); 
    setActiveSection("basic"); 
  };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev, [name]: value,
      ...(name === "title" && !editing ? { slug: slugify(value) } : {}),
    }));
  };

  const sectionTabs = [
    { id: "basic", label: "Basic Info" },
    { id: "hindi", label: "Hindi Content" },
    { id: "details", label: "Details" },
    { id: "content", label: "Content" },
    { id: "seo", label: "SEO" },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      // Prepare payload with correct JSON types
      const payload = { 
        ...form,
        who_is_it_for: typeof form.who_is_it_for === 'string' ? form.who_is_it_for.split('\n').filter(Boolean) : form.who_is_it_for,
        who_is_it_for_hi: typeof form.who_is_it_for_hi === 'string' ? form.who_is_it_for_hi.split('\n').filter(Boolean) : form.who_is_it_for_hi,
        achievements: typeof form.achievements === 'string' ? form.achievements.split('\n').filter(Boolean) : form.achievements,
        achievements_hi: typeof form.achievements_hi === 'string' ? form.achievements_hi.split('\n').filter(Boolean) : form.achievements_hi,
      };

      // Handle modules JSON
      if (typeof payload.modules === 'string' && payload.modules.trim()) {
        try { payload.modules = JSON.parse(payload.modules); } catch(e) { throw new Error("Invalid English Modules JSON"); }
      }
      if (typeof payload.modules_hi === 'string' && payload.modules_hi.trim()) {
        try { payload.modules_hi = JSON.parse(payload.modules_hi); } catch(e) { throw new Error("Invalid Hindi Modules JSON"); }
      }

      if (editing) {
        const { error } = await supabase
          .from('courses')
          .update(payload)
          .eq('id', editing);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([payload]);
        if (error) throw error;
      }
      await load();
      closeForm();
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving course: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setDeleteConfirm(null);
      load();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const toggleStatus = async (c) => {
    try {
      const newStatus = c.status === "active" ? "draft" : "active";
      const { error } = await supabase
        .from('courses')
        .update({ status: newStatus })
        .eq('id', c.id);
      if (error) throw error;
      load();
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  const filtered = filterCategory === "All" ? courses : courses.filter(c => c.category === filterCategory);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ color: "white", fontSize: "18px", fontWeight: 700, margin: "0 0 4px" }}>Courses</h2>
          <p style={{ color: "#a8b8a8", fontSize: "13px", margin: 0 }}>{courses.length} courses total</p>
        </div>
        <button onClick={openNew} style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "linear-gradient(135deg, #e84c1e, #c52d0a)", color: "white",
          border: "none", borderRadius: "100px", padding: "10px 20px", fontSize: "13px",
          fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(232,76,30,0.3)",
        }}>
          <Plus size={15} /> Add Course
        </button>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["All", ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setFilterCategory(cat)} style={{
            padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
            background: filterCategory === cat ? "rgba(232,76,30,0.2)" : "rgba(255,255,255,0.05)",
            color: filterCategory === cat ? "#e84c1e" : "#a8b8a8",
            borderColor: filterCategory === cat ? "rgba(232,76,30,0.4)" : "rgba(255,255,255,0.1)",
          }}>{cat}</button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8" }}>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map(c => (
            <div key={c.id} style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "14px 18px", borderRadius: "14px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{ 
                width: 48, height: 48, borderRadius: "10px", 
                background: "rgba(255,255,255,0.05)", 
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", 
                fontSize: "18px", fontWeight: 700, color: "white", flexShrink: 0,
                fontFamily: "sans-serif", overflow: "hidden" 
              }}>
                {c.icon && (c.icon.startsWith('http') || c.icon.startsWith('/')) ? (
                  <img src={c.icon} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  c.icon || "CO"
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "white", fontWeight: 700, fontSize: "14px", margin: "0 0 2px" }}>{c.title}</p>
                <p style={{ color: "#a8b8a8", fontSize: "11px", margin: "0 0 2px" }}>{c.category}</p>
                <p style={{ color: "#666", fontSize: "11px", margin: 0 }}>{c.description?.slice(0, 60)}{c.description?.length > 60 ? "..." : ""}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <span style={{
                  padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700,
                  background: c.status === "active" ? "rgba(45,138,78,0.15)" : "rgba(255,255,255,0.06)",
                  color: c.status === "active" ? "#2d8a4e" : "#a8b8a8",
                  border: `1px solid ${c.status === "active" ? "rgba(45,138,78,0.3)" : "rgba(255,255,255,0.1)"}`,
                }}>{c.status}</span>
                <button onClick={() => toggleStatus(c)} title="Toggle status" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px", color: "#a8b8a8", cursor: "pointer" }}>
                  {c.status === "active" ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => openEdit(c)} style={{ background: "rgba(30,122,120,0.15)", border: "1px solid rgba(30,122,120,0.25)", borderRadius: "8px", padding: "6px 12px", color: "#1e7a78", cursor: "pointer", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => setDeleteConfirm(c.id)} style={{ background: "rgba(232,76,30,0.12)", border: "1px solid rgba(232,76,30,0.2)", borderRadius: "8px", padding: "6px", color: "#e84c1e", cursor: "pointer" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)" }}>
              <p style={{ fontSize: "32px", margin: "0 0 12px" }}>💻</p>
              <p style={{ margin: 0 }}>No courses yet. Add your first one!</p>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#0a1a12", border: "1px solid rgba(232,76,30,0.3)", borderRadius: "20px", padding: "32px", maxWidth: "380px", width: "90%", textAlign: "center" }}>
            <p style={{ fontSize: "32px", margin: "0 0 12px" }}>🗑️</p>
            <h3 style={{ color: "white", margin: "0 0 8px" }}>Delete Course?</h3>
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
          <div style={{ width: "100%", maxWidth: "620px", background: "#0a1a12", borderLeft: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#0a1a12", zIndex: 10 }}>
              <h2 style={{ color: "white", margin: 0, fontSize: "18px", fontWeight: 700 }}>{editing ? "Edit Course" : "New Course"}</h2>
              <button onClick={closeForm} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px", color: "#a8b8a8", cursor: "pointer" }}><X size={18} /></button>
            </div>

            {/* Section tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 24px" }}>
              {sectionTabs.map(s => (
                <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                  padding: "12px 14px", border: "none", background: "transparent", cursor: "pointer",
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
                    <label style={labelStyle}>Title *</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Course title" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Slug *</label>
                    <input name="slug" value={form.slug} onChange={handleChange} placeholder="url-slug" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Category *</label>
                    <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, background: "#0a1a12" }}>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Short Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Brief description for course cards" style={{ ...inputStyle, resize: "vertical" }} />
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
                    {form.cover_image && <img src={form.cover_image} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: "10px", marginTop: "10px" }} />}
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
                    <input name="title_hi" value={form.title_hi || ""} onChange={handleChange} placeholder="पूर्ण स्टैक विकास" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Tagline (Hindi)</label>
                    <input name="tagline_hi" value={form.tagline_hi || ""} onChange={handleChange} placeholder="कुछ भी बनाएँ।" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Short Description (Hindi)</label>
                    <textarea name="description_hi" value={form.description_hi || ""} onChange={handleChange} rows={3} placeholder="Brief description in Hindi..." style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Overview (Hindi)</label>
                    <textarea name="overview_hi" value={form.overview_hi || ""} onChange={handleChange} rows={5} placeholder="Full course overview in Hindi..." style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Who Is This For (Hindi - one per line)</label>
                    <textarea name="who_is_it_for_hi" value={form.who_is_it_for_hi || ""} onChange={handleChange} rows={4} placeholder={"छात्र\nपेशेवर\n..."} style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>What You'll Achieve (Hindi - one per line)</label>
                    <textarea name="achievements_hi" value={form.achievements_hi || ""} onChange={handleChange} rows={4} placeholder={"कोडिंग सीखें\nवास्तविक प्रोजेक्ट बनाएं\n..."} style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Modules (Hindi - JSON format)</label>
                    <textarea name="modules_hi" value={form.modules_hi || ""} onChange={handleChange} rows={6} placeholder={'[{"num":"01","title":"परिचय","desc":"..."}]'} style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "12px" }} />
                  </div>
                </>
              )}

              {activeSection === "details" && (

                <>
                  <div>
                    <label style={labelStyle}>Duration</label>
                    <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 3 months" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Mode</label>
                    <input name="mode" value={form.mode} onChange={handleChange} placeholder="e.g. In-person or Online" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Batch Size</label>
                    <input name="batch_size" value={form.batch_size} onChange={handleChange} placeholder="e.g. 15–25 participants" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Certificate</label>
                    <input name="certificate" value={form.certificate} onChange={handleChange} placeholder="e.g. Ikigai Full Stack Certificate" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Sort Order</label>
                    <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} style={inputStyle} />
                  </div>
                </>
              )}

              {activeSection === "content" && (
                <>
                  <div>
                    <label style={labelStyle}>Overview</label>
                    <textarea name="overview" value={form.overview} onChange={handleChange} rows={5} placeholder="Full course overview..." style={{ ...inputStyle, resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Who Is This For (one per line)</label>
                    <textarea name="who_is_it_for" value={form.who_is_it_for} onChange={handleChange} rows={4} placeholder={"Students\nProfessionals\n..."} style={{ ...inputStyle, resize: "vertical" }} />
                    <p style={{ color: "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>Enter each item on a new line</p>
                  </div>
                  <div>
                    <label style={labelStyle}>What You'll Achieve (one per line)</label>
                    <textarea name="achievements" value={form.achievements} onChange={handleChange} rows={4} placeholder={"Learn to code\nBuild real projects\n..."} style={{ ...inputStyle, resize: "vertical" }} />
                    <p style={{ color: "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>Enter each item on a new line</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Modules (JSON format)</label>
                    <textarea name="modules" value={form.modules} onChange={handleChange} rows={6} placeholder={'[{"num":"01","title":"Intro","desc":"..."}]'} style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "12px" }} />
                    <p style={{ color: "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>JSON array with num, title, desc fields</p>
                  </div>
                </>
              )}

              {activeSection === "seo" && (
                <>
                  <div>
                    <label style={labelStyle}>Meta Title</label>
                    <input name="meta_title" value={form.meta_title} onChange={handleChange} placeholder="SEO title (60 chars)" style={inputStyle} />
                    <p style={{ color: (form.meta_title?.length || 0) > 60 ? "#e84c1e" : "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>{form.meta_title?.length || 0}/60</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Meta Description</label>
                    <textarea name="meta_description" value={form.meta_description} onChange={handleChange} rows={3} placeholder="SEO description (160 chars)" style={{ ...inputStyle, resize: "vertical" }} />
                    <p style={{ color: (form.meta_description?.length || 0) > 160 ? "#e84c1e" : "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>{form.meta_description?.length || 0}/160</p>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "10px", justifyContent: "flex-end", position: "sticky", bottom: 0, background: "#0a1a12" }}>
              <button onClick={closeForm} style={{ padding: "10px 20px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "white", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.slug} style={{ padding: "10px 24px", borderRadius: "100px", border: "none", background: saving ? "#555" : "linear-gradient(135deg, #e84c1e, #c52d0a)", color: "white", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontSize: "13px", boxShadow: "0 4px 16px rgba(232,76,30,0.3)" }}>
                {saving ? "Saving..." : editing ? "Update Course" : "Create Course"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}