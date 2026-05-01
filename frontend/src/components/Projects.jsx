import React, { useRef } from "react";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { portfolioData } from "../mock";

const use3D = () => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = `perspective(1000px) rotateY(0) rotateX(0)`;
  };
  return { ref, onMove, reset };
};

const ProjectCard = ({ p, index }) => {
  const { ref, onMove, reset } = use3D();
  const accentMap = {
    cyan: { ring: "ring-cyan-400/30", bar: "from-cyan-400 to-blue-500", text: "text-cyan-400", glow: "shadow-cyan-500/20" },
    amber: { ring: "ring-amber-300/30", bar: "from-amber-300 to-orange-500", text: "text-amber-300", glow: "shadow-amber-500/20" }
  };
  const a = accentMap[p.accent] || accentMap.cyan;

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`tilt-card reveal relative glass rounded-3xl p-7 md:p-8 hover:ring-1 ${a.ring} transition-all duration-300 group overflow-hidden`}
      style={{ boxShadow: "0 30px 60px -30px rgba(0,0,0,0.7)" }}
    >
      {/* corner decoration */}
      <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${a.bar} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />

      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="font-mono text-xs text-slate-500">PROJECT / 0{index + 1}</div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <Calendar size={12} />{p.period}
          </div>
        </div>

        <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${a.bar} mb-5`} />

        <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
          {p.name}
        </h3>
        <div className={`mt-1 font-mono text-xs uppercase tracking-widest ${a.text}`}>
          {p.subtitle}
        </div>

        <p className="mt-5 text-slate-300 leading-relaxed">{p.description}</p>

        <ul className="mt-5 space-y-2">
          {p.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-slate-400 text-sm">
              <span className={`mt-2 h-1 w-1 rounded-full ${p.accent === "amber" ? "bg-amber-300" : "bg-cyan-400"} flex-shrink-0`} />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-slate-200 border border-white/8">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-7 pt-6 border-t border-white/8 flex items-center justify-between">
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 ${a.text} hover:underline font-medium text-sm`}
            data-testid={`project-link-${p.id}`}
          >
            <Github size={16} />
            View on GitHub
          </a>
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const { projects } = portfolioData;
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-cyan-400">03</span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300">Selected Work</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Projects in <span className="shimmer-text">production thinking</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-md">
            Each project below is a study in turning hard problems — healthcare, defence, predictive science — into reliable engineered systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
