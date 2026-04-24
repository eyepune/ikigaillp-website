import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Phone, Building, User, Globe, RefreshCw } from "lucide-react";

const statusColors = {
  new: { bg: "rgba(232,76,30,0.15)", text: "#ff6b47", border: "rgba(232,76,30,0.3)" },
  reviewed: { bg: "rgba(232,180,41,0.15)", text: "#e8b429", border: "rgba(232,180,41,0.3)" },
  admitted: { bg: "rgba(45,138,78,0.15)", text: "#4caf7d", border: "rgba(45,138,78,0.3)" },
};

export default function AdminAzure900() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [updating, setUpdating] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('azure900_enrollments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEnrollments(data || []);
    } catch (err) {
      console.error('Error loading enrollments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from('azure900_enrollments')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    } catch (err) {
      console.error('Update status error:', err);
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filterStatus === "all" ? enrollments : enrollments.filter(e => e.status === filterStatus);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div style={{ width: 32, height: 32, border: "3px solid rgba(232,76,30,0.2)", borderTopColor: "#e84c1e", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ color: "white", fontSize: 18, fontWeight: 700, margin: 0 }}>AZ-900 Enrollments</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: 0 }}>{enrollments.length} total submissions</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["all", "new", "reviewed", "admitted"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${filterStatus === s ? "#e84c1e" : "rgba(255,255,255,0.1)"}`, background: filterStatus === s ? "rgba(232,76,30,0.15)" : "transparent", color: filterStatus === s ? "#ff6b47" : "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
              {s === "all" ? `All (${enrollments.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${enrollments.filter(e => e.status === s).length})`}
            </button>
          ))}
          <button onClick={load} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,0.3)" }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>☁️</p>
          <p style={{ fontSize: 14 }}>No enrollments yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(e => {
            const sc = statusColors[e.status] || statusColors.new;
            return (
              <div key={e.id} style={{ background: "#0a1510", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  {/* Left info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,120,212,0.2)", border: "1px solid rgba(0,120,212,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60b0ff", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                        {e.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>{e.name}</p>
                        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, margin: 0 }}>Age: {e.age || "—"} · {e.department || "—"}</p>
                      </div>
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                        {e.status || "new"}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                        <Mail size={11} /> {e.email}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                        <Phone size={11} /> {e.phone}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                        <Building size={11} /> {e.college || "—"}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                        <Globe size={11} /> {e.language || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Status changer */}
                  <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
                    {["new", "reviewed", "admitted"].map(s => (
                      <button key={s} disabled={e.status === s || updating === e.id} onClick={() => updateStatus(e.id, s)}
                        style={{ padding: "5px 12px", borderRadius: 7, border: `1px solid ${e.status === s ? statusColors[s].border : "rgba(255,255,255,0.08)"}`, background: e.status === s ? statusColors[s].bg : "transparent", color: e.status === s ? statusColors[s].text : "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 600, cursor: e.status === s ? "default" : "pointer", textTransform: "capitalize", transition: "all 0.15s", opacity: updating === e.id ? 0.6 : 1 }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, margin: "10px 0 0", textAlign: "right" }}>
                  {new Date(e.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}