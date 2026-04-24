import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react";

const PAGE_CONTEXTS = ["all", "home", "program", "course"];

const emptyForm = {
  name: "", role: "", role_hi: "", text: "", text_hi: "", initials: "", photo: "",
  color: "#e84c1e", rating: 5, program_or_course: "",
  page_context: "all", status: "active", sort_order: 0,
};

const inputStyle = {
  width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px", padding: "10px 14px", color: "white", fontSize: "14px", outline: "none",
};
const labelStyle = {
  color: "#a8b8a8", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px",
  display: "block", marginBottom: "6px",
};

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filterCtx, setFilterCtx] = useState("all_filter");

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error loading testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true); };
  const openEdit = (t) => { setForm({ ...emptyForm, ...t }); setEditing(t.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev, [name]: value,
      ...(name === "name" && !editing ? { initials: value.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() } : {}),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from('testimonials')
          .update(form)
          .eq('id', editing);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([form]);
        if (error) throw error;
      }
      await load();
      closeForm();
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving testimonial: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setDeleteConfirm(null);
      load();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const toggleStatus = async (t) => {
    try {
      const newStatus = t.status === "active" ? "inactive" : "active";
      const { error } = await supabase
        .from('testimonials')
        .update({ status: newStatus })
        .eq('id', t.id);
      if (error) throw error;
      load();
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  const filtered = filterCtx === "all_filter" ? items : items.filter(t => t.page_context === filterCtx);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ color: "white", fontSize: "18px", fontWeight: 700, margin: "0 0 4px" }}>Testimonials</h2>
          <p style={{ color: "#a8b8a8", fontSize: "13px", margin: 0 }}>{items.length} testimonials total</p>
        </div>
        <button onClick={openNew} style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "linear-gradient(135deg, #e84c1e, #c52d0a)", color: "white",
          border: "none", borderRadius: "100px", padding: "10px 20px", fontSize: "13px",
          fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(232,76,30,0.3)",
        }}>
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {[{ key: "all_filter", label: "All" }, ...PAGE_CONTEXTS.map(c => ({ key: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))].map(({ key, label }) => (
          <button key={key} onClick={() => setFilterCtx(key)} style={{
            padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
            background: filterCtx === key ? "rgba(232,76,30,0.2)" : "rgba(255,255,255,0.05)",
            color: filterCtx === key ? "#e84c1e" : "#a8b8a8",
            borderColor: filterCtx === key ? "rgba(232,76,30,0.4)" : "rgba(255,255,255,0.1)",
          }}>{label}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8" }}>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map(t => (
            <div key={t.id} style={{
              display: "flex", alignItems: "flex-start", gap: "14px",
              padding: "16px 18px", borderRadius: "14px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${t.color || "#e84c1e"}30`, display: "flex", alignItems: "center", justifyContent: "center", color: t.color || "#e84c1e", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                {t.initials || t.name?.[0] || "?"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                  <p style={{ color: "white", fontWeight: 700, fontSize: "14px", margin: 0 }}>{t.name}</p>
                  <span style={{ padding: "2px 8px", borderRadius: "100px", fontSize: "10px", fontWeight: 600, background: "rgba(232,180,41,0.15)", color: "#e8b429", border: "1px solid rgba(232,180,41,0.3)" }}>{t.page_context}</span>
                </div>
                <p style={{ color: "#a8b8a8", fontSize: "12px", margin: "0 0 4px" }}>{t.role}</p>
                <p style={{ color: "#666", fontSize: "12px", margin: 0, fontStyle: "italic" }}>"{t.text?.slice(0, 80)}{t.text?.length > 80 ? "..." : ""}"</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <span style={{ padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, background: t.status === "active" ? "rgba(45,138,78,0.15)" : "rgba(255,255,255,0.06)", color: t.status === "active" ? "#2d8a4e" : "#a8b8a8", border: `1px solid ${t.status === "active" ? "rgba(45,138,78,0.3)" : "rgba(255,255,255,0.1)"}` }}>{t.status}</span>
                <button onClick={() => toggleStatus(t)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px", color: "#a8b8a8", cursor: "pointer" }}>
                  {t.status === "active" ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => openEdit(t)} style={{ background: "rgba(30,122,120,0.15)", border: "1px solid rgba(30,122,120,0.25)", borderRadius: "8px", padding: "6px 12px", color: "#1e7a78", cursor: "pointer", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => setDeleteConfirm(t.id)} style={{ background: "rgba(232,76,30,0.12)", border: "1px solid rgba(232,76,30,0.2)", borderRadius: "8px", padding: "6px", color: "#e84c1e", cursor: "pointer" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)" }}>
              <p style={{ fontSize: "32px", margin: "0 0 12px" }}>💬</p>
              <p style={{ margin: 0 }}>No testimonials yet. Add your first one!</p>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#0a1a12", border: "1px solid rgba(232,76,30,0.3)", borderRadius: "20px", padding: "32px", maxWidth: "380px", width: "90%", textAlign: "center" }}>
            <p style={{ fontSize: "32px", margin: "0 0 12px" }}>🗑️</p>
            <h3 style={{ color: "white", margin: "0 0 8px" }}>Delete Testimonial?</h3>
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
          <div style={{ width: "100%", maxWidth: "560px", background: "#0a1a12", borderLeft: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#0a1a12", zIndex: 10 }}>
              <h2 style={{ color: "white", margin: 0, fontSize: "18px", fontWeight: 700 }}>{editing ? "Edit Testimonial" : "New Testimonial"}</h2>
              <button onClick={closeForm} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px", color: "#a8b8a8", cursor: "pointer" }}><X size={18} /></button>
            </div>

            <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "18px" }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Initials</label>
                  <input name="initials" value={form.initials} onChange={handleChange} placeholder="e.g. PS" maxLength={2} style={{ ...inputStyle, textTransform: "uppercase", textAlign: "center", letterSpacing: "2px" }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Role / Title (English)</label>
                  <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Graduate Student" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Role / Title (Hindi)</label>
                  <input name="role_hi" value={form.role_hi || ""} onChange={handleChange} placeholder="उदा. स्नातक छात्र" style={inputStyle} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Testimonial Text (English) *</label>
                  <textarea name="text" value={form.text} onChange={handleChange} rows={4} placeholder="What did they say..." style={{ ...inputStyle, resize: "vertical", fontStyle: "italic" }} />
                </div>
                <div>
                  <label style={labelStyle}>Testimonial Text (Hindi)</label>
                  <textarea name="text_hi" value={form.text_hi || ""} onChange={handleChange} rows={4} placeholder="उन्होंने क्या कहा..." style={{ ...inputStyle, resize: "vertical", fontStyle: "italic" }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Accent Color</label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input type="color" name="color" value={form.color} onChange={handleChange} style={{ width: 44, height: 44, borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "none", cursor: "pointer", padding: "2px" }} />
                    <input name="color" value={form.color} onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Rating (1–5)</label>
                  <input type="number" name="rating" value={form.rating} onChange={handleChange} min={1} max={5} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Show On Page</label>
                <select name="page_context" value={form.page_context} onChange={handleChange} style={{ ...inputStyle, background: "#0a1a12" }}>
                  {PAGE_CONTEXTS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
                <p style={{ color: "#a8b8a8", fontSize: "11px", marginTop: "4px" }}>
                  "all" = everywhere, "home" = homepage only, "program" / "course" = detail pages
                </p>
              </div>
              <div>
                <label style={labelStyle}>Related Program / Course Slug</label>
                <input name="program_or_course" value={form.program_or_course} onChange={handleChange} placeholder="e.g. public-speaking (optional)" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Photo URL (optional)</label>
                <input name="photo" value={form.photo} onChange={handleChange} placeholder="https://..." style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Status</label>
                  <select name="status" value={form.status} onChange={handleChange} style={{ ...inputStyle, background: "#0a1a12" }}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Sort Order</label>
                  <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "10px", justifyContent: "flex-end", position: "sticky", bottom: 0, background: "#0a1a12" }}>
              <button onClick={closeForm} style={{ padding: "10px 20px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "white", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name || !form.text} style={{ padding: "10px 24px", borderRadius: "100px", border: "none", background: saving ? "#555" : "linear-gradient(135deg, #e84c1e, #c52d0a)", color: "white", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontSize: "13px" }}>
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}