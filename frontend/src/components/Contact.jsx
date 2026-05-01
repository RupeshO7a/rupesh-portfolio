import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, Linkedin, Github } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { portfolioData } from "../mock";

const Contact = () => {
  const { profile } = portfolioData;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    setSending(true);
    // mock save to localStorage
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
      stored.push({ ...form, at: new Date().toISOString() });
      localStorage.setItem("portfolio_messages", JSON.stringify(stored));
      toast.success("Message received — I'll reply within 24h.");
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-mono text-xs text-cyan-400">06</span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300">Get in touch</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
            Let&apos;s build something <span className="shimmer-text">extraordinary.</span>
          </h2>
          <p className="mt-5 text-slate-300 text-lg">
            Open to internships, research collaborations and full-stack/AI engineering roles. Reach out — I reply fast.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          {/* contact info */}
          <div className="lg:col-span-2 space-y-3 reveal">
            <a href={`mailto:${profile.email}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-400/40 transition-colors group" data-testid="contact-email">
              <div className="w-11 h-11 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Email</div>
                <div className="text-white font-medium">{profile.email}</div>
              </div>
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-400/40 transition-colors group">
              <div className="w-11 h-11 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Phone size={20} />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Phone</div>
                <div className="text-white font-medium">{profile.phone}</div>
              </div>
            </a>
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-300/10 flex items-center justify-center text-amber-300">
                <MapPin size={20} />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Location</div>
                <div className="text-white font-medium">{profile.location}</div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="flex-1 glass rounded-xl py-3 flex items-center justify-center gap-2 text-slate-200 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                <Github size={18} /> <span className="text-sm font-medium">GitHub</span>
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex-1 glass rounded-xl py-3 flex items-center justify-center gap-2 text-slate-200 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                <Linkedin size={18} /> <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* form */}
          <form onSubmit={onSubmit} className="lg:col-span-3 glass rounded-3xl p-7 md:p-9 reveal space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Your Name</Label>
                <Input
                  id="name"
                  data-testid="contact-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ada Lovelace"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Email</Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="contact-email-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg" className="font-mono text-[11px] uppercase tracking-widest text-slate-400">Message</Label>
              <Textarea
                id="msg"
                rows={6}
                data-testid="contact-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project, role, or idea…"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              data-testid="contact-submit"
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {sending ? "Sending…" : (<><Send size={16} /> Send Message</>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
