import React, { useState, useCallback } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { portfolioData } from "../mock";
import { useScrolled } from "../hooks/usePortfolioHooks";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Logo = ({ firstName, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 group" data-testid="logo-btn">
    <span className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-display font-bold text-[#07090f] text-lg shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
      R
      <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-amber-300" />
    </span>
    <span className="font-display font-semibold tracking-tight hidden sm:block">
      {firstName}
      <span className="text-cyan-400">.</span>
    </span>
  </button>
);

const DesktopNav = ({ links, onNavigate }) => (
  <nav className="hidden md:flex items-center gap-1">
    {links.map((link) => (
      <button
        key={link.id}
        onClick={() => onNavigate(link.id)}
        data-testid={`nav-${link.id}`}
        className="px-4 py-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors relative group"
      >
        {link.label}
        <span className="absolute left-4 right-4 bottom-1 h-px bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </button>
    ))}
  </nav>
);

const MobileMenu = ({ links, onNavigate }) => (
  <div className="md:hidden mt-3 mx-4 glass rounded-2xl p-4 flex flex-col gap-1">
    {links.map((link) => (
      <button
        key={link.id}
        onClick={() => onNavigate(link.id)}
        className="text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-200"
      >
        {link.label}
      </button>
    ))}
  </div>
);

const Header = () => {
  const scrolled = useScrolled(30);
  const [open, setOpen] = useState(false);

  const handleNav = useCallback((id) => {
    scrollToId(id);
    setOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-[#07090f]/80 backdrop-blur-xl border-b border-white/5" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo firstName={portfolioData.profile.firstName} onClick={() => handleNav("home")} />
        <DesktopNav links={portfolioData.navLinks} onNavigate={handleNav} />
        <button
          onClick={() => handleNav("contact")}
          className="hidden md:inline-flex btn-primary text-sm"
          data-testid="header-cta"
        >
          Let&apos;s Talk
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-slate-200"
          data-testid="mobile-menu-btn"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && <MobileMenu links={portfolioData.navLinks} onNavigate={handleNav} />}
    </header>
  );
};

export default Header;
