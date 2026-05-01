import React, { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { portfolioData } from "../mock";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-[#07090f]/80 backdrop-blur-xl border-b border-white/5" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 group"
          data-testid="logo-btn"
        >
          <span className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-display font-bold text-[#07090f] text-lg shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
            R
            <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-300" />
          </span>
          <span className="font-display font-semibold tracking-tight hidden sm:block">
            {portfolioData.profile.firstName}
            <span className="text-cyan-400">.</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {portfolioData.navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              data-testid={`nav-${l.id}`}
              className="px-4 py-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors relative group"
            >
              {l.label}
              <span className="absolute left-4 right-4 bottom-1 h-px bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          ))}
        </nav>

        <button
          onClick={() => handleNav("contact")}
          className="hidden md:inline-flex btn-primary text-sm"
          data-testid="header-cta"
        >
          Let&apos;s Talk
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-200"
          data-testid="mobile-menu-btn"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-3 mx-4 glass rounded-2xl p-4 flex flex-col gap-1">
          {portfolioData.navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className="text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-200"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
