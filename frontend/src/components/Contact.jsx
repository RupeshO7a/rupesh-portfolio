import React from "react";
import { portfolioData } from "../mock";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactHeader = () => (
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
);

const Contact = () => {
  const { profile } = portfolioData;
  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ContactHeader />
        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          <ContactInfo profile={profile} />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
