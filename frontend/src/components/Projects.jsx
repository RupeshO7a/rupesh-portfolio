import React, { useRef } from "react";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { portfolioData } from "../mock";

const ACCENTS = {
  cyan: { ring: "ring-cyan-400/30", bar: "from-cyan-400 to-blue-500", text: "text-cyan-400", dot: "bg-cyan-400" },
  amber: { ring: "ring-amber-300/30", bar: "from-amber-300 to-orange-500", text: "text-amber-300", dot: "bg-amber-300" }
};

const use3DTilt = () => {
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
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  };
  return { ref, onMove, reset };
};

const ProjectMeta = ({ index, period }) => (
  <div className="flex items-start justify-between gap-4 mb-5">
    <div className="font-mono text-xs text-slate-500">PROJECT / 0{index + 1}</div>
    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
      <Calendar size={12} />{period}
    </div>
  </div>
);

const ProjectTitle = ({ project, accent }) => (
  <>
    <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${accent.bar} mb-5`} />
    <h3 className="font-display text-3xl md:text-4xl font-bold text-white">{project.name}</h3>
    <div className={`mt-1 font-mono text-xs uppercase tracking-widest ${accent.text}`}>
      {project.subtitle}
    </div>
  </>
);

const ProjectBullets = ({ bullets, accent }) => (
  <ul className="mt-5 space-y-2">
    {bullets.map((b) => (
      <li key={b.slice(0, 40)} className="flex gap-2.5 text-slate-400 text-sm">
        <span className={`mt-2 h-1 w-1 rounded-full ${accent.dot} flex-shrink-0`} />
        {b}
      </li>
    ))}
  </ul>
);

const ProjectTags = ({ tags }) => (
  <div className="mt-6 flex flex-wrap gap-2">
    {tags.map((t) => (
      <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-slate-200 border border-white/8">
        {t}
      </span>
    ))}
  </div>
);

const ProjectFooter = ({ link, id, accent }) => (
  <div className="mt-7 pt-6 border-t border-white/8 flex items-center justify-between">
    <a href={link} target="_blank" rel="noreferrer"
       className={`inline-flex items-center gap-2 ${accent.text} hover:underline font-medium text-sm`}
       data-testid={`project-link-${id}`}>
      <Github size={16} />
      View on GitHub
    </a>
    <a href={link} target="_blank" rel="noreferrer"
       className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors">
      <ExternalLink size={16} />
    </a>
  </div>
);

const ProjectCard = ({ project, index }) => {
  const { ref, onMove, reset } = use3DTilt();
  const accent = ACCENTS[project.accent] || ACCENTS.cyan;

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`tilt-card reveal relative glass rounded-3xl p-7 md:p-8 hover:ring-1 ${accent.ring} transition-all duration-300 group overflow-hidden`}
      style={{ boxShadow: "0 30px 60px -30px rgba(0,0,0,0.7)" }}
    >
      <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${accent.bar} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
      <div className="relative">
        <ProjectMeta index={index} period={project.period} />
        <ProjectTitle project={project} accent={accent} />
        <p className="mt-5 text-slate-300 leading-relaxed">{project.description}</p>
        <ProjectBullets bullets={project.bullets} accent={accent} />
        <ProjectTags tags={project.tags} />
        <ProjectFooter link={project.link} id={project.id} accent={accent} />
      </div>
    </article>
  );
};

const ProjectsHeader = () => (
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
);

const Projects = () => (
  <section id="projects" className="relative py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <ProjectsHeader />
      <div className="grid md:grid-cols-2 gap-7">
        {portfolioData.projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
