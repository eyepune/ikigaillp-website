import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabaseClient";
import { createPageUrl } from "@/utils";
import AdminPrograms from "../components/admin/AdminPrograms";
import AdminTeam from "../components/admin/AdminTeam";
import AdminBlogs from "../components/admin/AdminBlogs";
import AdminContacts from "../components/admin/AdminContacts";
import AdminInvite from "../components/admin/AdminInvite";
import AdminCourses from "../components/admin/AdminCourses";
import AdminTestimonials from "../components/admin/AdminTestimonials";
import AdminAzure900 from "../components/admin/AdminAzure900";
import {
  LayoutDashboard, BookOpen, Users, FileText, GraduationCap,
  MessageSquare, LogOut, UserPlus, TrendingUp, Bell, Star,
  ChevronLeft, ChevronRight, ExternalLink, Menu, X, Zap, Cloud
} from "lucide-react";

const TABS = [
  { id: "overview",      label: "Overview",      icon: LayoutDashboard, group: "main" },
  { id: "programs",      label: "Programs",      icon: BookOpen,         group: "content" },
  { id: "courses",       label: "Courses",       icon: GraduationCap,    group: "content" },
  { id: "azure900",      label: "AZ-900 Enrolments", icon: Cloud,          group: "content" },
  { id: "team",          label: "Team",          icon: Users,            group: "content" },
  { id: "blogs",         label: "Blog Posts",    icon: FileText,         group: "content" },
  { id: "testimonials",  label: "Testimonials",  icon: Star,             group: "content" },
  { id: "contacts",      label: "Enquiries",     icon: MessageSquare,    group: "data" },
  { id: "invite",        label: "Admins",        icon: UserPlus,         group: "data" },
];

import { staticPrograms, staticCourseCategories } from "./Programs";
import { fallbackTeam } from "./About";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({ programs: 0, team: 0, blogs: 0, contacts: 0, published: 0 });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    if (!confirm("This will import all static programs, courses, and team members into Supabase. Continue?")) return;
    setSyncing(true);
    try {
      // 1. Sync Programs
      const programsToInsert = staticPrograms.en.map((p, i) => {
        const hi = staticPrograms.hi.find(h => h.slug === p.slug) || {};
        return {
          slug: p.slug,
          title: p.title,
          title_hi: hi.title,
          tagline: p.tagline,
          tagline_hi: hi.tagline,
          description: p.desc,
          description_hi: hi.desc,
          icon: p.icon,
          color: p.color,
          sort_order: i,
          status: 'active'
        };
      });

      // 2. Sync Courses (flatten categories)
      const coursesToInsert = [];
      staticCourseCategories.forEach((cat, catIdx) => {
        cat.courses.forEach((c, i) => {
          coursesToInsert.push({
            slug: c.slug,
            title: c.title,
            category: cat.category,
            description: c.desc,
            icon: c.icon,
            color: cat.color,
            sort_order: (catIdx * 100) + i,
            status: 'active'
          });
        });
      });

      // 3. Sync Team
      const teamToInsert = fallbackTeam.map((m, i) => ({
        name: m.name,
        role: m.role,
        bio: m.bio,
        photo: m.photo,
        sort_order: i,
        status: 'active'
      }));

      // Execute Inserts (Upsert to avoid duplicates if slug exists)
      const results = await Promise.all([
        supabase.from('programs').upsert(programsToInsert, { onConflict: 'slug' }),
        supabase.from('courses').upsert(coursesToInsert, { onConflict: 'slug' }),
        supabase.from('team_members').upsert(teamToInsert, { onConflict: 'name' }) // Use name as conflict for team
      ]);

      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        console.error('Sync errors:', errors);
        const tableMissing = errors.some(e => e.error.code === 'PGRST204' || e.error.code === 'PGRST205');
        if (tableMissing) {
          alert("DATABASE TABLES MISSING: Please run the SQL setup script in your Supabase SQL Editor first!");
        } else {
          alert("Some errors occurred during sync. Check console.");
        }
      } else {
        alert("Synchronization successful! All static data has been imported to your database.");
        window.location.reload();
      }
    } catch (err) {
      console.error('Sync failed:', err);
      alert("Sync failed: " + err.message);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { window.location.href = createPageUrl("AdminLogin"); return; }
        
        const u = session.user;
        setUser(u);
        const [programsResult, teamResult, blogsResult, contactsResult] = await Promise.all([
          supabase.from('programs').select('*'),
          supabase.from('team_members').select('*'),
          supabase.from('updates').select('*'),
          supabase.from('contact_submissions').select('*'),
        ]);
        
        const programs = programsResult.data || [];
        const team = teamResult.data || [];
        const blogs = blogsResult.data || [];
        const contacts = contactsResult.data || [];

        setStats({
          programs: programs.filter(p => p.status === "active").length,
          team: team.filter(t => t.status === "active").length,
          blogs: blogs.length,
          contacts: contacts.filter(c => c.status === "new" || !c.status).length,
          published: blogs.filter(b => b.status === "published").length,
        });
        setLoading(false);
      } catch (err) { 
        console.error('Dash error:', err);
        window.location.href = createPageUrl("AdminLogin"); 
      }
    })();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#070f0c" }}>
      <div className="text-center">
        <div style={{ width: 40, height: 40, border: "3px solid rgba(232,76,30,0.2)", borderTopColor: "#e84c1e", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading dashboard...</p>
      </div>
    </div>
  );

  const sidebarW = collapsed ? 68 : 220;
  const currentTab = TABS.find(t => t.id === activeTab);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 14px" : "20px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, rgba(232,76,30,0.2), rgba(232,180,41,0.1))", border: "1px solid rgba(232,76,30,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <img src="https://image2url.com/r2/default/images/1772242108813-4a9261de-a713-4545-a18f-4d2032db2b0c.png" alt="Ikigai" style={{ width: 22, height: 22, objectFit: "contain" }} />
          </div>
          {!collapsed && (
            <div style={{ overflow: "hidden" }}>
              <p style={{ color: "white", fontWeight: 800, fontSize: 14, margin: 0, letterSpacing: 0.5 }}>IKIGAI</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, margin: 0, letterSpacing: 2, textTransform: "uppercase" }}>Admin</p>
            </div>
          )}
        </div>
        {!isMobile && (
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4, display: "flex", flexShrink: 0 }}>
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* User */}
      {!collapsed && (
        <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #e84c1e, #e8b429)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
              {user?.full_name?.[0] || "A"}
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ color: "white", fontSize: 12, fontWeight: 600, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.full_name || "Admin"}</p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {[{ label: "Main", ids: ["overview"] }, { label: "Content", ids: ["programs","courses","azure900","team","blogs","testimonials"] }, { label: "Data", ids: ["contacts","invite"] }].map(group => {
          const groupTabs = TABS.filter(t => group.ids.includes(t.id));
          return (
            <div key={group.label} style={{ marginBottom: 18 }}>
              {!collapsed && <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "0 8px 8px", margin: 0 }}>{group.label}</p>}
              {groupTabs.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setMobileOpen(false); }}
                    title={collapsed ? tab.label : undefined}
                    style={{
                      width: "100%", display: "flex", alignItems: "center",
                      justifyContent: collapsed ? "center" : "flex-start",
                      gap: 9, padding: collapsed ? "10px" : "9px 10px",
                      borderRadius: 9, border: "none", cursor: "pointer",
                      marginBottom: 2, textAlign: "left", position: "relative",
                      background: active ? "rgba(232,76,30,0.12)" : "transparent",
                      color: active ? "#ff6b47" : "rgba(255,255,255,0.45)",
                      fontWeight: active ? 700 : 400, fontSize: 13,
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; } }}
                  >
                    {active && <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 2.5, borderRadius: 2, background: "#e84c1e" }} />}
                    <Icon size={15} style={{ flexShrink: 0 }} />
                    {!collapsed && <span style={{ flex: 1 }}>{tab.label}</span>}
                    {tab.id === "contacts" && stats.contacts > 0 && (
                      <span style={{
                        background: "#e84c1e", color: "white", fontSize: 9, fontWeight: 700,
                        padding: collapsed ? undefined : "1px 6px",
                        borderRadius: collapsed ? "50%" : 100,
                        width: collapsed ? 16 : undefined, height: collapsed ? 16 : undefined,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: collapsed ? "absolute" : "static",
                        top: collapsed ? 6 : undefined, right: collapsed ? 6 : undefined,
                      }}>{stats.contacts}</span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {!collapsed && (
          <a href={createPageUrl("Home")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 9, color: "rgba(255,255,255,0.4)", fontSize: 12, textDecoration: "none", marginBottom: 6, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
            <ExternalLink size={13} /> Visit Website
          </a>
        )}
        <button onClick={async () => { await supabase.auth.signOut(); window.location.href = createPageUrl("Home"); }}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", gap: 8, padding: "8px 10px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.07)", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#ff6b47"; e.currentTarget.style.borderColor = "rgba(232,76,30,0.3)"; e.currentTarget.style.background = "rgba(232,76,30,0.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "transparent"; }}>
          <LogOut size={13} />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#070f0c", display: "flex", fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.85)" }}>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside style={{ width: sidebarW, background: "#0a1510", borderRight: "1px solid rgba(255,255,255,0.06)", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40, transition: "width 0.25s ease", overflow: "hidden" }}>
          <SidebarContent />
        </aside>
      )}

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 49 }} />
          <aside style={{ width: 240, background: "#0a1510", borderRight: "1px solid rgba(255,255,255,0.06)", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50 }}>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", marginLeft: isMobile ? 0 : sidebarW, transition: "margin-left 0.25s ease" }}>

        {/* Topbar */}
        <header style={{ height: 56, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0a1510", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isMobile && (
              <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", display: "flex", padding: 4 }}>
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
            <div>
              <h1 style={{ color: "white", fontWeight: 700, fontSize: 15, margin: 0 }}>{currentTab?.label || "Dashboard"}</h1>
              {!isMobile && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: 0 }}>
                {activeTab === "overview" ? "Content snapshot" : `Manage ${currentTab?.label?.toLowerCase()}`}
              </p>}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {stats.contacts > 0 && (
              <button onClick={() => setActiveTab("contacts")} style={{ position: "relative", background: "rgba(232,76,30,0.1)", border: "1px solid rgba(232,76,30,0.2)", borderRadius: 8, cursor: "pointer", padding: "6px 8px", display: "flex", alignItems: "center" }}>
                <Bell size={15} style={{ color: "#e84c1e" }} />
                <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: "#e84c1e", borderRadius: "50%", fontSize: 9, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {stats.contacts}
                </span>
              </button>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 10px", background: "rgba(255,255,255,0.04)", borderRadius: 100, border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #e84c1e, #e8b429)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 10 }}>
                {user?.full_name?.[0] || "A"}
              </div>
              {!isMobile && <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600 }}>{user?.full_name || "Admin"}</span>}
            </div>
            {isMobile && (
              <button onClick={async () => { await supabase.auth.signOut(); window.location.href = createPageUrl("Home"); }} style={{ background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, cursor: "pointer", padding: "6px 8px", color: "rgba(255,255,255,0.4)", display: "flex" }}>
                <LogOut size={14} />
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: isMobile ? 14 : 24, overflowY: "auto", paddingBottom: 32 }}>
          {activeTab === "overview"     && <OverviewTab stats={stats} setActiveTab={setActiveTab} user={user} handleSync={handleSync} syncing={syncing} />}
          {activeTab === "programs"     && <AdminPrograms />}
          {activeTab === "courses"      && <AdminCourses />}
          {activeTab === "azure900"     && <AdminAzure900 />}
          {activeTab === "team"         && <AdminTeam />}
          {activeTab === "blogs"        && <AdminBlogs />}
          {activeTab === "testimonials" && <AdminTestimonials />}
          {activeTab === "contacts"     && <AdminContacts />}
          {activeTab === "invite"       && <AdminInvite />}
        </main>
      </div>
    </div>
  );
}

function OverviewTab({ stats, setActiveTab, user, handleSync, syncing }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const statCards = [
    { label: "Active Programs", value: stats.programs, color: "#e84c1e", bg: "rgba(232,76,30,0.08)", icon: "📚", tab: "programs", desc: "Live on website" },
    { label: "Team Members",    value: stats.team,     color: "#1e7a78", bg: "rgba(30,122,120,0.08)",  icon: "👥", tab: "team",     desc: "Active staff" },
    { label: "Blog Posts",      value: stats.blogs,    color: "#2d8a4e", bg: "rgba(45,138,78,0.08)",   icon: "✍️", tab: "blogs",    desc: `${stats.published} published` },
    { label: "New Enquiries",   value: stats.contacts, color: "#e8b429", bg: "rgba(232,180,41,0.08)",  icon: "💬", tab: "contacts", desc: "Unread" },
  ];

  const quickActions = [
    { label: "Add Program",     tab: "programs",     color: "#e84c1e", icon: "📚" },
    { label: "Add Course",      tab: "courses",      color: "#1e7a78", icon: "🎓" },
    { label: "Add Team Member", tab: "team",         color: "#1e7a78", icon: "👥" },
    { label: "Write Post",      tab: "blogs",        color: "#2d8a4e", icon: "✍️" },
    { label: "Testimonials",    tab: "testimonials", color: "#e8b429", icon: "⭐" },
    { label: "View Enquiries",  tab: "contacts",     color: "#9b59b6", icon: "💬" },
  ];

  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: 28, padding: "24px", background: "linear-gradient(135deg, rgba(232,76,30,0.06), rgba(232,180,41,0.04))", borderRadius: 16, border: "1px solid rgba(232,76,30,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #e84c1e, #e8b429)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👋</div>
          <div>
            <h2 style={{ color: "white", fontSize: 18, fontWeight: 800, margin: 0 }}>{greeting}, {user?.full_name?.split(" ")[0] || "Admin"}</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: 0 }}>Here's your content at a glance.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {statCards.map((card, i) => (
          <button key={i} onClick={() => setActiveTab(card.tab)} style={{ padding: "18px 16px", borderRadius: 14, border: `1px solid ${card.color}18`, background: card.bg, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 24px ${card.color}15`; e.currentTarget.style.borderColor = `${card.color}35`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = `${card.color}18`; }}>
            <div style={{ fontSize: 20, marginBottom: 10 }}>{card.icon}</div>
            <div style={{ color: card.color, fontSize: 30, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>{card.value}</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{card.label}</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{card.desc}</div>
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ background: "#0a1510", borderRadius: 14, padding: "18px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Zap size={14} style={{ color: "#e84c1e" }} />
          <h3 style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => setActiveTab(a.tab)} style={{ padding: "14px 10px", borderRadius: 10, border: `1px solid ${a.color}18`, background: `${a.color}08`, cursor: "pointer", textAlign: "center", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
              onMouseEnter={e => { e.currentTarget.style.background = `${a.color}18`; e.currentTarget.style.borderColor = `${a.color}35`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${a.color}08`; e.currentTarget.style.borderColor = `${a.color}18`; e.currentTarget.style.transform = "none"; }}>
              <span style={{ fontSize: 18 }}>{a.icon}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 11 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Database Tools */}
      <div style={{ background: "rgba(232,76,30,0.03)", borderRadius: 14, padding: "18px", border: "1px dashed rgba(232,76,30,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Cloud size={14} style={{ color: "#e84c1e" }} />
          <h3 style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Database Tools</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: 0 }}>
            If your dashboard is empty, use this tool to import all programs, courses, and team members from the website's static files into your Supabase database.
          </p>
          <button 
            onClick={handleSync}
            disabled={syncing}
            style={{ 
              flexShrink: 0, padding: "10px 20px", borderRadius: 100, border: "none", 
              background: syncing ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #e84c1e, #c52d0a)", 
              color: "white", fontSize: 13, fontWeight: 700, cursor: syncing ? "default" : "pointer",
              boxShadow: syncing ? "none" : "0 4px 12px rgba(232,76,30,0.3)",
              display: "flex", alignItems: "center", gap: 8
            }}
          >
            {syncing ? <><div style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "white", borderRadius: "50%", animation: "spin 1s linear infinite" }} /> Syncing...</> : <><Cloud size={14} /> Sync Site Data</>}
          </button>
        </div>
      </div>
    </div>
  );
}