import React from "react";
import { useCounter } from "../hooks/usePortfolioHooks";

const StatItem = ({ stat }) => {
  const [value, ref] = useCounter(stat.value);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-white">
        {value}
        <span className="text-cyan-400">{stat.suffix}</span>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400 mt-1">
        {stat.label}
      </div>
    </div>
  );
};

const HeroStats = ({ stats }) => (
  <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl border-t border-white/8 pt-8">
    {stats.map((s) => (
      <StatItem key={s.label} stat={s} />
    ))}
  </div>
);

export default HeroStats;
