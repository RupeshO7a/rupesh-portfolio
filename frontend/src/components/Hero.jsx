import React from "react";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { portfolioData } from "../mock";
import HeroPortrait from "./HeroPortrait";
import HeroStats from "./HeroStats";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const HeroIntro = ({ profile }) => (
  <div className="lg:col-span-7 order-2 lg:order-1">
    <div className="flex items-center gap-3 mb-6">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-300">
        Available for collaborations · 2026
      </span>
    </div>

    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] text-white">
      <span className="block">{profile.firstName}</span>
      <span className="block shimmer-text">{profile.lastName}.</span>
    </h1>

    <p className="mt-6 text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed">
      <span className="text-cyan-400 font-mono text-sm">// </span>
      {profile.tagline}. I am a <span className="text-white font-medium">{profile.role}</span> turning data into deployed intelligence.
    </p>

    <div className="mt-8 flex flex-wrap items-center gap-4">
      <button onClick={() => scrollTo("projects")} className="btn-primary" data-testid="hero-cta-projects">
        View Projects
      </button>
      <button onClick={() => scrollTo("contact")} className="btn-ghost" data-testid="hero-cta-contact">
        Get in Touch
      </button>
    </div>

    <div className="mt-10 flex items-center gap-5 text-slate-400">
      <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors" data-testid="social-github">
        <Github size={20} />
      </a>
      <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors" data-testid="social-linkedin">
        <Linkedin size={20} />
      </a>
      <a href={profile.socials.email} className="hover:text-cyan-400 transition-colors" data-testid="social-email">
        <Mail size={20} />
      </a>
      <span className="h-4 w-px bg-white/15" />
      <span className="flex items-center gap-1.5 text-sm font-mono">
        <MapPin size={14} className="text-cyan-400" />
        {profile.location.split(",")[0]}
      </span>
    </div>
  </div>
);

const Hero = () => {
  const { profile, stats } = portfolioData;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <HeroIntro profile={profile} />
          <HeroStats stats={stats} />
        </div>
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <HeroPortrait profile={profile} />
        </div>
      </div>

      <button
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
        data-testid="scroll-down"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
