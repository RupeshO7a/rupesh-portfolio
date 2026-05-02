import React from "react";
import { Award, BadgeCheck, Trophy } from "lucide-react";
import { portfolioData } from "../mock";

const Certifications = () => {
  const { certifications } = portfolioData;
  const achievements = [
    { id: "acc", value: "+28%", text: "ML accuracy lift on seismic datasets at Infosys" },
    { id: "clean", value: "-30%", text: "data cleaning time via optimized NumPy/Pandas pipelines" },
    { id: "chain", value: "-90%", text: "on-chain storage cost via Merkle-tree optimization" },
    { id: "forecast", value: "+15%", text: "forecasting performance with visualization-driven insight" }
  ];

  return (
    <section id="certifications" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-cyan-400">05</span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300">Credentials &amp; Wins</span>
            <span className="flex-1 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Certified, measured, <span className="text-amber-300">delivered.</span>
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10">
          {/* Certifications */}
          <div className="reveal space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
              <BadgeCheck size={14} className="text-cyan-400" /> Certifications
            </div>
            {certifications.map((c) => (
              <div key={c.id} className="glass rounded-2xl p-6 hover:border-cyan-400/30 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20 flex-shrink-0">
                    <Award size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">{c.year}</span>
                    </div>
                    <div className="text-cyan-400 text-sm mt-0.5">{c.issuer}</div>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">{c.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="reveal space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
              <Trophy size={14} className="text-amber-300" /> Quantified Impact
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((a) => (
                <div key={a.id} className="glass rounded-2xl p-6 hover:border-amber-300/30 transition-all hover:-translate-y-1">
                  <div className="font-display text-4xl font-bold text-amber-300 mb-2">{a.value}</div>
                  <div className="text-sm text-slate-300 leading-relaxed">{a.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
