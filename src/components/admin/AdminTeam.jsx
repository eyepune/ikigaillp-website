import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptyForm = {
  name: "", role: "", role_hi: "", bio: "", bio_hi: "", photo: "", email: "",
  linkedin: "", instagram: "", twitter: "",
  specializations: "", years_experience: "", sort_order: 0, status: "active",
};

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      console.error('Error loading team members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true); };
  const openEdit = (m) => { setForm({ ...emptyForm, ...m }); setEditing(m.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    const data = { 
      ...form, 
      years_experience: Number(form.years_experience) || 0, 
      sort_order: Number(form.sort_order) || 0 
    };
    try {
      if (editing) {
        const { error } = await supabase
          .from('team_members')
          .update(data)
          .eq('id', editing);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([data]);
        if (error) throw error;
      }
      await load();
      closeForm();
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving member: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setDeleteConfirm(null);
      load();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", padding: "10px 14px", color: "white", fontSize: "14px", outline: "none",
  };
  const labelStyle = { color: "#a8b8a8", fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "6px" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ color: "white", fontSize: "18px", fontWeight: 700, margin: "0 0 4px" }}>Team Members</h2>
          <p style={{ color: "#a8b8a8", fontSize: "13px", margin: 0 }}>{members.length} members</p>
        </div>
        <button onClick={openNew} style={{ display: "flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg, #1e7a78, #125a58)", color: "white", border: "none", borderRadius: "100px", padding: "10px 20px", fontSize: "13px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(30,122,120,0.3)" }}>
          <Plus size={15} /> Add Member
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8" }}>Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(m => (
            <div key={m.id} style={{ padding: "20px", borderRadius: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(30,122,120,0.4)", flexShrink: 0, background: "linear-gradient(135deg, #1e7a78, #2d8a4e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                  ) : (
                    <span style={{ color: "white", fontWeight: 700, fontSize: "22px" }}>{m.name?.[0]}</span>
                  )}
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: 700, fontSize: "15px", margin: "0 0 3px" }}>{m.name}</p>
                  <p style={{ color: "#1e7a78", fontSize: "12px", fontWeight: 600, margin: "0 0 3px" }}>{m.role}</p>
                  {m.years_experience > 0 && <p style={{ color: "#a8b8a8", fontSize: "11px", margin: 0 }}>{m.years_experience} yrs exp</p>}
                </div>
              </div>
              {m.specializations && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {m.specializations.split(",").slice(0, 3).map((s, i) => (
                    <span key={i} style={{ padding: "3px 8px", borderRadius: "100px", background: "rgba(30,122,120,0.12)", border: "1px solid rgba(30,122,120,0.2)", color: "#a8b8a8", fontSize: "11px" }}>
                      {s.trim()}
                    </span>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <button onClick={() => openEdit(m)} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(30,122,120,0.3)", background: "rgba(30,122,120,0.12)", color: "#1e7a78", cursor: "pointer", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => setDeleteConfirm(m.id)} style={{ padding: "6px", borderRadius: "8px", border: "1px solid rgba(232,76,30,0.2)", background: "rgba(232,76,30,0.10)", color: "#e84c1e", cursor: "pointer" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px", color: "#a8b8a8", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)" }}>
              <p style={{ fontSize: "32px", margin: "0 0 12px" }}>👥</p>
              <p style={{ margin: 0 }}>No team members yet. Add your first one!</p>
            </div>
          )}
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#0a1a12", border: "1px solid rgba(232,76,30,0.3)", borderRadius: "20px", padding: "32px", maxWidth: "380px", width: "90%", textAlign: "center" }}>
            <p style={{ fontSize: "32px", margin: "0 0 12px" }}>🗑️</p>
            <h3 style={{ color: "white", margin: "0 0 8px" }}>Remove Team Member?</h3>
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
          <div style={{ width: "100%", maxWidth: "560px", background: "#0a1a12", borderLeft: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ color: "white", margin: 0, fontSize: "18px", fontWeight: 700 }}>{editing ? "Edit Member" : "Add Team Member"}</h2>
              <button onClick={closeForm} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "8px", padding: "6px", color: "#a8b8a8", cursor: "pointer" }}><X size={18} /></button>
            </div>

            <div style={{ padding: "24px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Photo URL */}
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 90, height: 90, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(30,122,120,0.4)", margin: "0 auto 12px", flexShrink: 0, background: "linear-gradient(135deg, #1e7a78, #2d8a4e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {form.photo ? (
                    <img src={form.photo} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                  ) : (
                    <span style={{ color: "white", fontWeight: 700, fontSize: "32px" }}>{form.name?.[0] || "?"}</span>
                  )}
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Photo URL</label>
                  <input
                    name="photo"
                    value={form.photo}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Role / Title (English) *</label>
                  <input name="role" value={form.role} onChange={handleChange} placeholder="Lead Trainer" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Role / Title (Hindi)</label>
                <input name="role_hi" value={form.role_hi || ""} onChange={handleChange} placeholder="मुख्य प्रशिक्षक" style={inputStyle} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Bio (English)</label>
                  <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} placeholder="Brief biography..." style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                <div>
                  <label style={labelStyle}>Bio (Hindi)</label>
                  <textarea name="bio_hi" value={form.bio_hi || ""} onChange={handleChange} rows={3} placeholder="संक्षिप्त जीवनी..." style={{ ...inputStyle, resize: "vertical" }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Specializations (comma separated)</label>
                <input name="specializations" value={form.specializations} onChange={handleChange} placeholder="Public Speaking, Leadership, NLP" style={inputStyle} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Years of Experience</label>
                  <input type="number" name="years_experience" value={form.years_experience} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Sort Order</label>
                  <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" style={inputStyle} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label style={labelStyle}>LinkedIn</label>
                  <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="URL" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Instagram</label>
                  <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="URL" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Twitter</label>
                  <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="URL" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Status</label>
                <select name="status" value={form.status} onChange={handleChange} style={{ ...inputStyle, background: "#0a1a12" }}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={closeForm} style={{ padding: "10px 20px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "white", cursor: "pointer", fontSize: "13px" }}>Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name} style={{ padding: "10px 24px", borderRadius: "100px", border: "none", background: "linear-gradient(135deg, #1e7a78, #125a58)", color: "white", fontWeight: 700, cursor: "pointer", fontSize: "13px", boxShadow: "0 4px 16px rgba(30,122,120,0.3)" }}>
                {saving ? "Saving..." : editing ? "Update Member" : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}