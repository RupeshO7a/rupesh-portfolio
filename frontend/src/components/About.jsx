import React from "react";
import { GraduationCap, MapPin, Award, Users } from "lucide-react";
import { portfolioData } from "../mock";

const SectionLabel = ({ index, label }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="font-mono text-xs text-cyan-400">{index}</span>
    <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300">{label}</span>
    <span className="flex-1 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
  </div>
);

const About = () => {
  const { about, education, involvement } = portfolioData;
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal">
          <SectionLabel index="01" label="About" />
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-4xl">
            {about.headline}
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 reveal space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-slate-300 text-lg leading-relaxed">
                {p}
              </p>
            ))}
            <div className="pt-6 grid sm:grid-cols-2 gap-3">
              {about.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl glass hover:border-cyan-400/30 transition-colors">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] flex-shrink-0" />
                  <span className="text-slate-200 text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 reveal space-y-4">
            <div className="glass rounded-2xl p-6 hover:border-cyan-400/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                  <GraduationCap size={20} />
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-slate-400">Education</div>
              </div>
              <div className="font-display text-xl font-semibold text-white">{education.degree}</div>
              <div className="text-sm text-slate-300 mt-1">{education.minor}</div>
              <div className="mt-3 pt-3 border-t border-white/8 text-sm text-slate-400">
                <div>{education.institution}</div>
                <div className="flex items-center gap-1.5 mt-1 font-mono text-xs">
                  <MapPin size={12} />
                  {education.location} · {education.period}
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 hover:border-amber-300/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-300/10 flex items-center justify-center text-amber-300">
                  <Users size={20} />
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-slate-400">Leadership</div>
              </div>
              <ul className="space-y-2">
                {involvement.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-200 text-sm">
                    <Award size={14} className="text-amber-300 mt-0.5 flex-shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
