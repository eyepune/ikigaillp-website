import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UserPlus, Mail, Shield, Users } from "lucide-react";

export default function AdminInvite() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // In a real Supabase app, we might fetch from a 'profiles' table 
    // where users with 'admin' role are stored.
    const fetchAdmins = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'admin');
        
        if (!error && data) {
          setAdmins(data);
        } else {
          // Fallback or empty state if profiles table doesn't exist yet
          setAdmins([]);
        }
      } catch (err) {
        setAdmins([]);
      }
    };
    fetchAdmins();
  }, [success]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setError("");
    setSuccess("");
    
    try {
      // Supabase user invitation usually requires a service role key or 
      // specific Edge Functions. For now, we'll show a message.
      setError("User invitation via Supabase requires additional configuration. Please contact the system administrator.");
    } catch (err) {
      setError(err.message || "Failed to send invitation.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", padding: "11px 14px", color: "white", fontSize: "14px", outline: "none",
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "white", fontSize: "18px", fontWeight: 700, margin: "0 0 4px" }}>Manage Admins</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>Invite other people to manage the website.</p>
      </div>

      {/* Invite card */}
      <div style={{ background: "#0b1a14", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(232,76,30,0.15)", border: "1px solid rgba(232,76,30,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UserPlus size={16} style={{ color: "#e84c1e" }} />
          </div>
          <div>
            <p style={{ color: "white", fontWeight: 700, fontSize: "14px", margin: 0 }}>Invite New Admin</p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: 0 }}>They'll receive an email to set up their account</p>
          </div>
        </div>

        <form onSubmit={handleInvite} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", display: "block", marginBottom: "6px" }}>
              EMAIL ADDRESS
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="colleague@example.com"
                required
                style={{ ...inputStyle, paddingLeft: "36px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", background: "rgba(155,89,182,0.08)", border: "1px solid rgba(155,89,182,0.2)", borderRadius: "10px" }}>
            <Shield size={14} style={{ color: "#9b59b6", flexShrink: 0 }} />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: 0 }}>They will be granted <strong style={{ color: "white" }}>Admin</strong> access — full ability to create, edit and delete all content.</p>
          </div>

          {success && (
            <div style={{ padding: "10px 14px", background: "rgba(45,138,78,0.12)", border: "1px solid rgba(45,138,78,0.3)", borderRadius: "10px", color: "#4caf7d", fontSize: "13px" }}>
              ✅ {success}
            </div>
          )}
          {error && (
            <div style={{ padding: "10px 14px", background: "rgba(232,76,30,0.1)", border: "1px solid rgba(232,76,30,0.3)", borderRadius: "10px", color: "#e84c1e", fontSize: "13px" }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={sending || !email.trim()}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              background: sending ? "#555" : "linear-gradient(135deg, #e84c1e, #c52d0a)",
              color: "white", border: "none", borderRadius: "100px", padding: "12px 24px",
              fontSize: "13px", fontWeight: 700, cursor: sending ? "not-allowed" : "pointer",
              boxShadow: sending ? "none" : "0 4px 16px rgba(232,76,30,0.3)",
              transition: "all 0.2s",
            }}
          >
            <UserPlus size={15} /> {sending ? "Sending invite..." : "Send Admin Invitation"}
          </button>
        </form>
      </div>

      {/* Existing admins */}
      <div style={{ background: "#0b1a14", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Users size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
          <h3 style={{ color: "white", fontSize: "14px", fontWeight: 700, margin: 0 }}>Current Admins ({admins.length})</h3>
        </div>
        {admins.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: 0 }}>No other admins found or profiles table not configured.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {admins.map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #e84c1e, #e8b429)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>
                  {a.full_name?.[0] || a.email?.[0]?.toUpperCase() || "A"}
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <p style={{ color: "white", fontSize: "13px", fontWeight: 600, margin: 0 }}>{a.full_name || "—"}</p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.email}</p>
                </div>
                <span style={{ padding: "3px 10px", borderRadius: "100px", fontSize: "10px", fontWeight: 700, background: "rgba(232,76,30,0.15)", color: "#ff7c5c", border: "1px solid rgba(232,76,30,0.2)", flexShrink: 0 }}>
                  Admin
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}