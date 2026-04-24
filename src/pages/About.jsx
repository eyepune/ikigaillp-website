import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { supabase } from "@/lib/supabaseClient";
import { ArrowRight, Users, Award, Target, Heart } from "lucide-react";
import { useLang } from "../components/LanguageContext";
import { t } from "../components/i18n";

const fallbackTeam = [
  {
    id: "ashly",
    name: "Ashly Varma",
    role: "Founder & Lead Facilitator",
    bio: "Engineer and coach with 5+ years of experience in Digital Marketing, certified AI & ML coach, Salesforce. Focused on transforming lives through Quality Education.",
    photo: "https://base44.app/api/apps/69a1ffff704da6ffef51cd18/files/mp/public/69a1ffff704da6ffef51cd18/0dd370dff_1000060617.jpg"
  },
  {
    id: "gaukarn",
    name: "Gaukarn Thakur",
    role: "Co founder",
    bio: "Specializes in helping individuals align career choices with core values and long-term aspirations through evidence-based frameworks.",
    photo: "https://base44.app/api/apps/69a1ffff704da6ffef51cd18/files/public/69a1ffff704da6ffef51cd18/356aafc70_1000047812.jpg"
  },
  {
    id: "amit",
    name: "Amit Verma",
    role: "COO",
    bio: "A B.Tech Computer Science graduate with a decade of experience working in IT companies in India and abroad. Currently teaching students for competitive exams and providing career counselling.",
    photo: "https://base44.app/api/apps/69a1ffff704da6ffef51cd18/files/public/69a1ffff704da6ffef51cd18/cca86830b_1000058663.jpg"
  },
  {
    id: "sneha",
    name: "Sneha Surti",
    role: "Head of Training & Management",
    bio: "As a seasoned Trainer and Educator, Sneha specializes in designing and delivering high-impact learning experiences that drive both individual growth and organizational success. She has empowered professionals across industries for almost 20 years.",
    photo: "https://base44.app/api/apps/69a1ffff704da6ffef51cd18/files/mp/public/69a1ffff704da6ffef51cd18/cea855120_1000061776.jpg"
  },
  {
    id: "stanford",
    name: "Stanford D'souza",
    role: "VP Marketing",
    bio: "Results-driven business leader with over 12 years of experience in client engagement, operations, and strategic marketing. Leads the Microsoft & Enterprise vertical at ID8NXT.",
    photo: "https://base44.app/api/apps/69a1ffff704da6ffef51cd18/files/mp/public/69a1ffff704da6ffef51cd18/7cf6b1579_1000059762.jpg"
  }
];

const memberColors = ["#e84c1e", "#1e7a78", "#2d8a4e", "#e8b429", "#9b5e91", "#e84c1e"];

export default function About() {
  const [team, setTeam] = useState([]);
  const { lang } = useLang();

  const milestones = [
    { year: "2018", eventKey: "milestone_2018" },
    { year: "2019", eventKey: "milestone_2019" },
    { year: "2020", eventKey: "milestone_2020" },
    { year: "2021", eventKey: "milestone_2021" },
    { year: "2022", eventKey: "milestone_2022" },
    { year: "2023", eventKey: "milestone_2023" },
  ];

  useEffect(() => {
    const localize = (m) => {
      if (lang === 'en') return m;
      return {
        ...m,
        role: m.role_hi || m.role,
        bio: m.bio_hi || m.bio,
      };
    };

    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('status', 'active')
          .order('sort_order', { ascending: true });
        
        if (error) throw error;

        const finalTeam = (data && data.length > 0) ? data : fallbackTeam;
        setTeam(finalTeam.map(localize));
      } catch (error) {
        console.error('Error fetching team:', error);
        setTeam(fallbackTeam.map(localize));
      }
    };
    fetchTeam();
  }, [lang]);


  return (
    <div className="bg-[#0d1f1a] pt-20">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0f2820] to-[#0d1f1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#e84c1e] blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{t(lang, "about_page_subtitle")}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
            {t(lang, "about_page_heading1")}<br />
            <span className="italic text-[#e8b429]">{t(lang, "about_page_heading2")}</span>
          </h1>
          <p className="text-[#a8b8a8] text-base sm:text-xl leading-relaxed max-w-2xl">
            {t(lang, "about_page_intro")}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-6">{t(lang, "our_story")}</h2>
              <div className="space-y-4 text-[#a8b8a8] leading-relaxed">
                <p>{t(lang, "story_p1")}</p>
                <p>{t(lang, "story_p2")}</p>
                <p>{t(lang, "story_p3")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, labelKey: "stat_lives_label", color: "#e84c1e" },
                { icon: Award, labelKey: "stat_workshops_label", color: "#1e7a78" },
                { icon: Target, labelKey: "stat_partners_label", color: "#2d8a4e" },
                { icon: Heart, labelKey: "stat_satisfaction_label", color: "#e8b429" },
              ].map(({ icon: Icon, labelKey, color }, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <p className="text-white text-sm font-semibold">{t(lang, labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 sm:py-24 bg-[#0f1f18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{t(lang, "our_people")}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">{t(lang, "meet_team")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => {
              const color = memberColors[i % memberColors.length];
              return (
                <div key={member.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center hover:border-white/20 transition-all card-hover">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2" style={{ borderColor: `${color}60` }}
                      onError={e => { e.currentTarget.style.display = "none"; const next = e.currentTarget.nextElementSibling; if (next && next.setAttribute) next.setAttribute('style', 'display: flex'); }}
                    />
                  ) : null}
                  <div className="w-20 h-20 rounded-full items-center justify-center text-white text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: color, display: member.photo ? "none" : "flex" }}>
                    {member.name?.[0]}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm mb-3" style={{ color }}>{member.role}</p>
                  <p className="text-[#a8b8a8] text-sm leading-relaxed">{member.bio}</p>
                </div>
              );
            })}
            {team.length === 0 && (
              <p className="col-span-4 text-center text-[#a8b8a8] py-8">{t(lang, "team_coming_soon")}</p>
            )}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#e84c1e] text-sm font-semibold uppercase tracking-widest mb-4">{t(lang, "our_journey")}</p>
            <h2 className="text-4xl font-serif font-bold text-white">{t(lang, "milestones_title")}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-8 items-start">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#e84c1e]/20 border border-[#e84c1e]/40 flex items-center justify-center relative z-10">
                      <span className="text-[#e84c1e] text-xs font-bold">{m.year}</span>
                    </div>
                  </div>
                  <div className="pt-4 pb-2">
                    <p className="text-white leading-relaxed">{t(lang, m.eventKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-[#0f1f18] to-[#0d1f1a]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">{t(lang, "cta_journey")}</h2>
          <p className="text-[#a8b8a8] mb-8">{t(lang, "cta_journey_sub")}</p>
          <Link to={createPageUrl("Programs")} className="inline-flex items-center gap-2 bg-[#e84c1e] hover:bg-[#d43d12] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105">
            {t(lang, "explore_programs")} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}