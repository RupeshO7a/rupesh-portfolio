import React from "react";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { portfolioData } from "../mock";

const SectionLabel = ({ index, label }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="font-mono text-xs text-cyan-400">{index}</span>
    <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300">{label}</span>
    <span className="flex-1 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
  </div>
);

const Experience = () => {
  const { experience } = portfolioData;
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal">
          <SectionLabel index="02" label="Experience" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Where I&apos;ve <span className="text-cyan-400">shipped.</span>
          </h2>
        </div>

        <div className="mt-14 relative">
          {/* timeline line */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent" />

          <div className="space-y-10">
            {experience.map((e) => (
              <article key={e.id} className="reveal relative pl-12 md:pl-16">
                <div className="absolute left-0 md:left-2 top-2 w-9 h-9 rounded-full bg-[#0b1018] border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Briefcase size={16} className="text-cyan-400" />
                </div>

                <div className="glass rounded-2xl p-6 md:p-8 hover:border-cyan-400/30 transition-colors group">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-white">
                        {e.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-cyan-400">
                        <span className="font-medium">{e.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5"><Calendar size={12} />{e.period}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={12} />{e.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {e.bullets.map((b) => (
                      <li key={b.slice(0, 40)} className="flex gap-2.5 text-slate-300 text-sm leading-relaxed">
                        <ChevronRight size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-5 border-t border-white/8 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/8">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
