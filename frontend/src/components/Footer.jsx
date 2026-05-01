import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { portfolioData } from "../mock";

const Footer = () => {
  const { profile, navLinks } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/8 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-display font-bold text-[#07090f] text-lg">R</span>
              <span className="font-display text-lg font-semibold text-white">{profile.firstName}<span className="text-cyan-400">.</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Building intelligent systems with care. Currently engineering AI-driven, secure full-stack platforms.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">Navigate</div>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-slate-300 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-3">Connect</div>
            <div className="flex gap-3">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                <Github size={16} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href={profile.socials.email} className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                <Mail size={16} />
              </a>
            </div>
            <div className="mt-4 text-xs font-mono text-slate-500">
              {profile.email}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/8 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-500">
            © {year} {profile.name}. Crafted with intent.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
            data-testid="back-to-top"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
