import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Phone, MessageSquare, Check, Clock, Reply } from "lucide-react";

const statusColors = {
  new: { bg: "rgba(232,76,30,0.15)", text: "#e84c1e", border: "rgba(232,76,30,0.3)" },
  read: { bg: "rgba(232,180,41,0.15)", text: "#e8b429", border: "rgba(232,180,41,0.3)" },
  responded: { bg: "rgba(45,138,78,0.15)", text: "#2d8a4e", border: "rgba(45,138,78,0.3)" },
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setContacts(data || []);
    } catch (err) {
      console.error('Error loading contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
      if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const filtered = filter === "all" ? contacts : contacts.filter(c => c.status === filter);
  const newCount = contacts.filter(c => c.status === "new").length;

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ color: "white", fontSize: "18px", fontWeight: 700, margin: "0 0 4px" }}>
          Contact Submissions
          {newCount > 0 && <span style={{ marginLeft: "10px", background: "#e84c1e", color: "white", fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "100px" }}>{newCount} new</span>}
        </h2>
        <p style={{ color: "#a8b8a8", fontSize: "13px", margin: 0 }}>{contacts.length} total submissions</p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["all", "new", "read", "responded"].map(s => {
          const c = statusColors[s] || {};
          const count = s === "all" ? contacts.length : contacts.filter(x => x.status === s).length;
          return (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: "6px 16px", borderRadius: "100px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
              border: `1px solid ${filter === s ? (c.border || "rgba(255,255,255,0.3)") : "rgba(255,255,255,0.1)"}`,
              background: filter === s ? (c.bg || "rgba(255,255,255,0.08)") : "transparent",
              color: filter === s ? (c.text || "white") : "#a8b8a8",
              textTransform: "capitalize",
            }}>
              {s} ({count})
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: "16px" }}>
        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8" }}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#a8b8a8", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)" }}>
              <p style={{ fontSize: "32px", margin: "0 0 12px" }}>💬</p>
              <p style={{ margin: 0 }}>No submissions here.</p>
            </div>
          ) : filtered.map(c => {
            const sc = statusColors[c.status] || statusColors.new;
            return (
              <div key={c.id} onClick={() => { setSelected(c); if (c.status === "new") markStatus(c.id, "read"); }}
                style={{
                  padding: "16px 18px", borderRadius: "14px", cursor: "pointer",
                  background: selected?.id === c.id ? "rgba(232,76,30,0.08)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selected?.id === c.id ? "rgba(232,76,30,0.25)" : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.2s",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                      <p style={{ color: "white", fontWeight: 700, fontSize: "14px", margin: 0 }}>{c.name}</p>
                      {c.status === "new" && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e84c1e", display: "inline-block" }} />}
                    </div>
                    <p style={{ color: "#a8b8a8", fontSize: "12px", margin: "0 0 4px" }}>{c.email}</p>
                    <p style={{ color: "#a8b8a8", fontSize: "12px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.subject || c.message?.slice(0, 50)}</p>
                  </div>
                  <span style={{ padding: "3px 9px", borderRadius: "100px", fontSize: "10px", fontWeight: 700, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, flexShrink: 0, textTransform: "capitalize" }}>
                    {c.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
            <button onClick={() => setSelected(null)} style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "8px", padding: "6px", color: "#a8b8a8", cursor: "pointer" }}>✕</button>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #e84c1e, #e8b429)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "16px" }}>
                  {selected.name?.[0]}
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: 700, fontSize: "16px", margin: 0 }}>{selected.name}</p>
                  <p style={{ color: "#a8b8a8", fontSize: "12px", margin: 0 }}>{selected.type === "program_enquiry" ? "Program Enquiry" : "General Contact"}</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {selected.email && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <Mail size={14} style={{ color: "#e84c1e", flexShrink: 0 }} />
                    <a href={`mailto:${selected.email}`} style={{ color: "#a8b8a8", fontSize: "13px", textDecoration: "none" }}>{selected.email}</a>
                  </div>
                )}
                {selected.phone && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <Phone size={14} style={{ color: "#1e7a78", flexShrink: 0 }} />
                    <span style={{ color: "#a8b8a8", fontSize: "13px" }}>{selected.phone}</span>
                  </div>
                )}
                {selected.program_interest && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <MessageSquare size={14} style={{ color: "#2d8a4e", flexShrink: 0 }} />
                    <span style={{ color: "#a8b8a8", fontSize: "13px" }}>Interested in: <strong style={{ color: "white" }}>{selected.program_interest}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {selected.subject && (
              <div style={{ marginBottom: "16px" }}>
                <p style={{ color: "#a8b8a8", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", margin: "0 0 6px" }}>SUBJECT</p>
                <p style={{ color: "white", fontSize: "15px", fontWeight: 600, margin: 0 }}>{selected.subject}</p>
              </div>
            )}

            <div style={{ marginBottom: "24px" }}>
              <p style={{ color: "#a8b8a8", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", margin: "0 0 8px" }}>MESSAGE</p>
              <div style={{ padding: "16px", background: "rgba(255,255,255,0.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ color: "#d0dcd0", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{selected.message}</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your enquiry"}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "100px", background: "linear-gradient(135deg, #e84c1e, #c52d0a)", color: "white", fontSize: "13px", fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(232,76,30,0.3)" }}>
                <Reply size={13} /> Reply via Email
              </a>
              {selected.status !== "responded" && (
                <button onClick={() => markStatus(selected.id, "responded")}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "100px", border: "1px solid rgba(45,138,78,0.3)", background: "rgba(45,138,78,0.12)", color: "#2d8a4e", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                  <Check size={13} /> Mark as Responded
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}