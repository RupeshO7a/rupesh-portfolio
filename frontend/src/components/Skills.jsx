import React from "react";
import { portfolioData } from "../mock";
import { Code2, Brain, BarChart3, Wrench } from "lucide-react";

const CATEGORY_ICONS = {
  Languages: Code2,
  "ML & Data": Brain,
  "Visualization & BI": BarChart3,
  "Tools & IDEs": Wrench
};

const SkillsHeader = () => (
  <div className="reveal">
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs text-cyan-400">04</span>
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300">Toolbox</span>
      <span className="flex-1 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
    </div>
    <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
      The <span className="text-cyan-400">stack</span> I build with
    </h2>
  </div>
);

const SkillChip = ({ name }) => (
  <span className="font-mono text-[11px] px-2.5 py-1.5 rounded-md bg-white/5 text-slate-200 border border-white/8 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors cursor-default">
    {name}
  </span>
);

const SkillCategory = ({ name, items }) => {
  const Icon = CATEGORY_ICONS[name] || Code2;
  return (
    <div className="reveal glass rounded-2xl p-6 hover:border-cyan-400/30 transition-all hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/15 to-blue-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20">
          <Icon size={20} />
        </div>
        <h3 className="font-display text-lg font-semibold text-white">{name}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => <SkillChip key={s} name={s} />)}
      </div>
    </div>
  );
};

const SkillsMarquee = ({ items }) => (
  <div className="mt-16 relative py-6 border-y border-white/8 bg-white/[0.015]">
    <div className="flex marquee-track whitespace-nowrap">
      {[...items, ...items].map((s, i) => (
        <span key={`${s}-${i}`} className="font-display text-3xl md:text-5xl font-semibold text-slate-700 px-8 flex items-center gap-8">
          {s}
          <span className="text-cyan-400 text-2xl">◆</span>
        </span>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const { skills } = portfolioData;
  const allSkills = Object.values(skills).flat();

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SkillsHeader />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(skills).map(([cat, list]) => (
            <SkillCategory key={cat} name={cat} items={list} />
          ))}
        </div>
      </div>
      <SkillsMarquee items={allSkills} />
    </section>
  );
};

export default Skills;
