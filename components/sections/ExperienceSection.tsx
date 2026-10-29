"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "Co-fundador y Desarrollador Backend",
    company: "Statcont",
    period: "2024 - Presente",
    description:
      "Participación activa en el diseño de arquitectura de software, modelado de bases de datos relacionales y desarrollo de componentes backend escalables para soluciones administrativas y de consultoría empresarial.",
  },
  {
    id: 2,
    role: "Desarrollo de Proyectos Independientes",
    company: "Freelance / Software Propio",
    period: "2023 - Presente",
    description:
      "Desarrollo integral de aplicaciones web, sistemas de gestión interna y soluciones backend especializadas para control de existencias, procesos administrativos e inventarios multisucursal utilizando Laravel, Node.js y Python.",
  },
  {
    id: 3,
    role: "Formación Académica en Ingeniería de Sistemas",
    company: "Universidad Nacional del Altiplano (Puno)",
    period: "2022 - 2027",
    description:
      "Formación rigurosa en ciencias de la computación, arquitectura de software, bases de datos relacionales y diseño de algoritmos. Implementación de proyectos aplicados de Machine Learning y análisis estadístico de datos.",
  },
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reveal header
      gsap.fromTo(
        ".exp-header",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".exp-header",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
      );

      // Animate vertical line
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
        },
      );

      // Animate timeline items
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 100, opacity: 0 },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-jungle-teal-950 text-foreground section"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
        {/* Left Column: Sticky Header */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 exp-header">
            <h2 className="text-5xl md:text-7xl font-heading font-bold leading-tight tracking-tighter mb-6">
              Experiencia
              <br />
              <span className="text-muted-foreground">& Proyectos</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 font-light max-w-md leading-relaxed">
              Trayectoria enfocada en la construcción de sistemas confiables, arquitectura de datos y desarrollo backend de alto valor funcional.
            </p>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="lg:col-span-7 relative timeline-container pt-12 lg:pt-0">
          {/* Vertical progress line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-border">
            <div className="timeline-line w-full h-full bg-primary origin-top"></div>
          </div>

          <div className="space-y-24 pb-24">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="timeline-item relative pl-8 md:pl-24"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] md:left-[28px] top-2 w-2 h-2 rounded-full bg-background border border-primary z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)] shadow-primary/50"></div>

                <div className="flex flex-col space-y-4 group cursor-default">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-mono tracking-widest text-primary/70 uppercase">
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="text-lg text-muted-foreground font-medium">
                    {exp.company}
                  </h4>

                  <p className="text-muted-foreground/80 leading-relaxed font-light text-lg">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
