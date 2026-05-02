import React from "react";
import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";

const InfoRow = ({ icon: Icon, label, value, href, accent = "cyan" }) => {
  const accentClass = accent === "amber" ? "text-amber-300 bg-amber-300/10" : "text-cyan-400 bg-cyan-400/10";
  const Inner = (
    <>
      <div className={`w-11 h-11 rounded-xl ${accentClass} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400">{label}</div>
        <div className="text-white font-medium">{value}</div>
      </div>
    </>
  );
  if (!href) {
    return <div className="glass rounded-2xl p-5 flex items-center gap-4">{Inner}</div>;
  }
  return (
    <a href={href} className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-400/40 transition-colors group">
      {Inner}
    </a>
  );
};

const SocialLinks = ({ socials }) => (
  <div className="flex gap-3 pt-2">
    <a href={socials.github} target="_blank" rel="noreferrer" className="flex-1 glass rounded-xl py-3 flex items-center justify-center gap-2 text-slate-200 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
      <Github size={18} /> <span className="text-sm font-medium">GitHub</span>
    </a>
    <a href={socials.linkedin} target="_blank" rel="noreferrer" className="flex-1 glass rounded-xl py-3 flex items-center justify-center gap-2 text-slate-200 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
      <Linkedin size={18} /> <span className="text-sm font-medium">LinkedIn</span>
    </a>
  </div>
);

const ContactInfo = ({ profile }) => (
  <div className="lg:col-span-2 space-y-3 reveal">
    <InfoRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
    <InfoRow icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
    <InfoRow icon={MapPin} label="Location" value={profile.location} accent="amber" />
    <SocialLinks socials={profile.socials} />
  </div>
);

export default ContactInfo;
