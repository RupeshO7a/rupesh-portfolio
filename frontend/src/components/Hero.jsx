import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { portfolioData } from "../mock";

const useTilt = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1100px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(0)`;
    };
    const reset = () => {
      el.style.transform = `perspective(1100px) rotateY(0) rotateX(0)`;
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);
  return ref;
};

const useCounter = (target, duration = 1800) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (t) => {
              const p = Math.min((t - start) / duration, 1);
              setVal(Math.floor(p * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return [val, ref];
};

const StatItem = ({ s }) => {
  const [v, ref] = useCounter(s.value);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-white">
        {v}
        <span className="text-cyan-400">{s.suffix}</span>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400 mt-1">
        {s.label}
      </div>
    </div>
  );
};

const Hero = () => {
  const tiltRef = useTilt();
  const { profile, stats } = portfolioData;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-16 px-6"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left: text */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
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
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
              data-testid="hero-cta-projects"
            >
              View Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-ghost"
              data-testid="hero-cta-contact"
            >
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

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl border-t border-white/8 pt-8">
            {stats.map((s) => (
              <StatItem key={s.label} s={s} />
            ))}
          </div>
        </div>

        {/* Right: 3D portrait */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <div className="relative" style={{ perspective: "1100px" }}>
            <div
              ref={tiltRef}
              className="tilt-card relative w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] lg:w-[400px] lg:h-[540px] rounded-[2rem] overflow-hidden"
              style={{
                boxShadow:
                  "0 40px 100px -20px rgba(6,182,212,0.35), 0 30px 80px -30px rgba(0,0,0,0.9)"
              }}
            >
              {/* gradient frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-transparent to-amber-400/20 rounded-[2rem] p-[2px]">
                <div className="w-full h-full rounded-[1.92rem] overflow-hidden bg-[#0b1018] relative">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover object-center"
                    style={{ transform: "scale(1.05)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090f] via-transparent to-transparent" />
                  {/* floating chips */}
                  <div className="tilt-inner absolute top-5 left-5 glass px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest text-cyan-300">
                    AI · ML · Systems
                  </div>
                  <div className="tilt-inner absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <div className="font-display text-xl text-white font-semibold">{profile.firstName} {profile.lastName}</div>
                      <div className="font-mono text-xs text-slate-300">{profile.role}</div>
                    </div>
                    <div className="glass rounded-xl px-3 py-2 text-center">
                      <div className="font-display text-lg text-amber-300 font-bold leading-none">B.Tech</div>
                      <div className="font-mono text-[10px] text-slate-300">CSE ·27</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* decorative ring */}
            <div className="absolute -inset-6 -z-10 rounded-[3rem] border border-white/8" />
            <div className="absolute -inset-12 -z-20 rounded-[3.5rem] border border-white/5" />
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
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
