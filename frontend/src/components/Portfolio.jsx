import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Footer from "./Footer";
import { useReveal } from "../hooks/usePortfolioHooks";

const AmbientOrbs = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div
      className="orb"
      style={{
        width: 500,
        height: 500,
        top: "-10%",
        left: "-10%",
        background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)"
      }}
    />
    <div
      className="orb"
      style={{
        width: 600,
        height: 600,
        top: "40%",
        right: "-15%",
        background: "radial-gradient(circle, #1e3a8a 0%, transparent 70%)",
        animationDelay: "-4s"
      }}
    />
    <div
      className="orb"
      style={{
        width: 400,
        height: 400,
        bottom: "-10%",
        left: "30%",
        background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
        animationDelay: "-8s",
        opacity: 0.25
      }}
    />
  </div>
);

const Portfolio = () => {
  useReveal(".reveal");

  return (
    <div className="relative">
      <AmbientOrbs />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
