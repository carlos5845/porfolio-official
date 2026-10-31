"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Database, GraduationCap, Languages } from "lucide-react";
import personalFigure from "@/public/personal_figure.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reveal the main title
      gsap.fromTo(
        ".reveal-title",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".reveal-title",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
      );

      // Reveal text paragraphs with stagger
      gsap.fromTo(
        ".reveal-text",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".reveal-text-container",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
      );

      // Marquee animation
      gsap.to(".marquee-content", {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "linear",
      });

      // Reveal image container
      gsap.fromTo(
        ".reveal-image",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".reveal-image",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      // Reveal cards
      gsap.fromTo(
        ".reveal-card",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".cards-container",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
      );

      // Subtle parallax on the image
      gsap.to(".parallax-img", {
        scrollTrigger: {
          trigger: ".parallax-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -30,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-onyx-950 text-foreground overflow-hidden section"
    >
      {/* Background subtle decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-20 md:mb-32">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold reveal-title leading-tight tracking-tighter">
            Arquitectura sólida,
            <br />
            <span className="text-muted-foreground">
              soluciones escalables e inteligentes.
            </span>
          </h2>
        </div>

        {/* About Me Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24 md:mb-32 items-center">
          <div className="lg:col-span-7 reveal-text-container space-y-6">
            <h3 className="text-2xl font-semibold mb-4 text-foreground reveal-text flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary inline-block"></span>
              Perfil Profesional
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed reveal-text font-light">
              Soy estudiante de <span className="text-foreground font-medium">Ingeniería de Sistemas</span> en la Universidad Nacional del Altiplano con un profundo interés en el desarrollo de software, la arquitectura backend y el análisis de datos.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed reveal-text font-light">
              Cuento con experiencia práctica en proyectos académicos e independientes utilizando <span className="text-foreground font-medium">Laravel, Node.js, Python</span> y bases de datos relacionales (<span className="text-foreground font-medium">PostgreSQL, MySQL</span>). Mi enfoque principal es desarrollar soluciones web funcionales, seguras y escalables, integrando interfaces responsivas modernas y explorando aplicaciones prácticas de <span className="text-primary font-medium">Machine Learning</span>.
            </p>
          </div>

          <div className="lg:col-span-5 parallax-container relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center reveal-image">
            {/* Resplandor ambiental verde claro de fondo */}
            <div className="absolute w-[85%] h-[85%] bg-emerald-400/25 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Contenedor con desvanecido gradual (mask) en contornos para suavizar cualquier corte */}
            <div
              className="relative w-full h-full"
              style={{
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.4) 82%, rgba(0,0,0,0) 97%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.4) 82%, rgba(0,0,0,0) 97%)",
              }}
            >
              <Image
                src={personalFigure}
                alt="Carlos David Quispe Chata"
                fill
                className="object-contain object-bottom parallax-img drop-shadow-[0_12px_28px_rgba(74,222,128,0.26)]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Technologies Marquee */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-6 -rotate-[4deg] scale-130 bg-secondary/80 border-y border-border mb-24 md:mb-32 z-20 backdrop-blur-md">
          <div className="flex w-max marquee-content items-center">
            {/* First Set */}
            <div className="flex gap-12 px-6 items-center">
              {[
                "Backend Escalable",
                "Laravel & Node.js",
                "Bases de Datos Relacionales",
                "PostgreSQL & MySQL",
                "Machine Learning",
                "Full Stack Web",
                "Python & Datos",
              ].map((tech) => (
                <span
                  key={`1-${tech}`}
                  className="text-xl md:text-3xl font-heading font-bold text-muted-foreground uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
            {/* Second Set (Duplicate for seamless loop) */}
            <div className="flex gap-12 px-6 items-center">
              {[
                "Backend Escalable",
                "Laravel & Node.js",
                "Bases de Datos Relacionales",
                "PostgreSQL & MySQL",
                "Machine Learning",
                "Full Stack Web",
                "Python & Datos",
              ].map((tech) => (
                <span
                  key={`2-${tech}`}
                  className="text-xl md:text-3xl font-heading font-bold text-muted-foreground uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Section: Formación, Especialidad & Filosofía */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 cards-container">
          {/* Formación Card */}
          <div className="reveal-card group relative p-8 md:p-10 rounded-3xl bg-card/40 border border-border hover:bg-card/60 hover:border-primary/50 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted group-hover:bg-secondary transition-colors duration-500">
              <GraduationCap className="w-6 h-6 text-foreground/80" />
            </div>

            <h3 className="text-2xl font-semibold mb-2 text-foreground">
              Educación & Idiomas
            </h3>
            <p className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">
              Univ. Nacional del Altiplano · 2022–2027
            </p>
            <p className="text-muted-foreground leading-relaxed font-light mb-4">
              Ingeniería de Sistemas orientada al modelado de datos, algoritmos computacionales y desarrollo de arquitecturas de software.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-muted-foreground/80 pt-2 border-t border-border/50">
              <span className="flex items-center gap-1.5"><Languages className="w-3.5 h-3.5 text-primary" /> Español: Nativo</span>
              <span>•</span>
              <span>Inglés: Técnico</span>
            </div>
          </div>

          {/* Filosofía Card */}
          <div className="reveal-card group relative p-8 md:p-10 rounded-3xl bg-card/40 border border-border hover:bg-card/60 hover:border-primary/50 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted group-hover:bg-secondary transition-colors duration-500">
              <Database className="w-6 h-6 text-foreground/80" />
            </div>

            <h3 className="text-2xl font-semibold mb-2 text-foreground">
              Filosofía Técnica
            </h3>
            <p className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">
              Funcionalidad · Seguridad · Escalabilidad
            </p>
            <p className="text-muted-foreground leading-relaxed font-light mb-4">
              Priorizo el diseño estructurado, el modelado relacional riguroso y la claridad en cada endpoint. Una solución de software debe ser sólida por detrás y transparente para el usuario final.
            </p>
            <blockquote className="border-l-2 border-border pl-4 italic text-muted-foreground/80">
              &ldquo;Un software escalable nace de una base de datos bien modelada y un código limpio.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
