import React from "react";
import { useTilt } from "../hooks/usePortfolioHooks";

const HeroPortrait = ({ profile }) => {
  const tiltRef = useTilt(14);

  return (
    <div className="relative" style={{ perspective: "1100px" }}>
      <div
        ref={tiltRef}
        className="tilt-card relative w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] lg:w-[400px] lg:h-[540px] rounded-[2rem] overflow-hidden"
        style={{
          boxShadow:
            "0 40px 100px -20px rgba(6,182,212,0.35), 0 30px 80px -30px rgba(0,0,0,0.9)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-transparent to-amber-400/20 rounded-[2rem] p-[2px]">
          <div className="w-full h-full rounded-[1.92rem] overflow-hidden bg-[#0b1018] relative">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover object-center"
              style={{ transform: "scale(1.05)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090f] via-transparent to-transparent" />
            <div className="tilt-inner absolute top-5 left-5 glass px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest text-cyan-300">
              AI · ML · Systems
            </div>
            <div className="tilt-inner absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="font-display text-xl text-white font-semibold">
                  {profile.firstName} {profile.lastName}
                </div>
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
      <div className="absolute -inset-6 -z-10 rounded-[3rem] border border-white/8" />
      <div className="absolute -inset-12 -z-20 rounded-[3.5rem] border border-white/5" />
    </div>
  );
};

export default HeroPortrait;
