"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  Nextdotjs,
  TailwindCss,
  Gsap,
  React as ReactSvg,
  Laravel,
  Php,
  Postgresql,
  Python,
  ScikitLearn,
  Pandas,
  Numpy,
} from "@thesvg/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Statcont — Consultoría Empresarial",
    category: "Full Stack / Co-fundador",
    description:
      "Plataforma web de alto rendimiento para agencia de consultoría con diseño minimalista, arquitectura moderna y presencia de marca.",
    technologies: [
      { name: "Next.js", icon: Nextdotjs },
      { name: "TailwindCSS", icon: TailwindCss },
      { name: "GSAP", icon: Gsap },
    ],
    color: "from-blue-500/20 to-purple-500/20",
    img: "/proyects/statcont.png",
    link: "https://landing-agency-statcont.vercel.app",
  },
  {
    id: "02",
    title: "Catálogo Web — Cevichería Manolo’s",
    category: "Web App / Frontend Cinemático",
    description:
      "Plataforma gastronómica responsiva con carrusel infinito interactivo, filtrado dinámico de productos y experiencia cinemática.",
    technologies: [
      { name: "Next.js", icon: Nextdotjs },
      { name: "React", icon: ReactSvg },
      { name: "TailwindCSS", icon: TailwindCss },
      { name: "GSAP", icon: Gsap },
    ],
    color: "from-orange-500/20 to-amber-500/20",
    img: "/proyects/fondo-hero.png",
    link: "#",
  },
  {
    id: "03",
    title: "Sistema de Inventario Multisucursal",
    category: "Backend & Gestión Administrativa",
    description:
      "Sistema para gestión integral de existencias, control de transferencias seguras entre múltiples almacenes y generación de reportes de auditoría.",
    technologies: [
      { name: "Laravel", icon: Laravel },
      { name: "PHP", icon: Php },
      { name: "PostgreSQL", icon: Postgresql },
      { name: "TailwindCSS", icon: TailwindCss },
    ],
    color: "from-rose-500/20 to-red-600/20",
    img: null,
    link: "#",
  },
  {
    id: "04",
    title: "Clasificación de Granos (Machine Learning)",
    category: "Inteligencia Artificial & Datos",
    description:
      "Implementación de un Perceptrón Multicapa (MLP) para clasificación y predicción automática de semillas y frejoles mediante análisis estadístico.",
    technologies: [
      { name: "Python", icon: Python },
      { name: "Scikit-Learn", icon: ScikitLearn },
      { name: "Pandas", icon: Pandas },
      { name: "NumPy", icon: Numpy },
    ],
    color: "from-emerald-500/20 to-teal-500/20",
    img: null,
    link: "#",
  },
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollEl = scrollRef.current;
      const container = containerRef.current;
      if (!scrollEl || !container) return;

      const getScrollAmount = () => {
        return -(scrollEl.scrollWidth - window.innerWidth);
      };

      // Create horizontal scroll tween
      const tween = gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: "none",
      });

      // Pin and link to scroll
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      // Subtle parallax on project images
      const images = gsap.utils.toArray<HTMLElement>(".project-image-inner");
      images.forEach((img) => {
        gsap.to(img, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            scrub: true,
          },
        });
      });

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-jungle-teal-950 text-foreground overflow-hidden flex items-center section"
    >
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-20 mix-blend-difference">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
          Proyectos <span className="text-primary font-light">Destacados</span>
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex h-full w-max items-center px-6 md:px-12 lg:px-24 gap-12 md:gap-24 pt-24"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[75vh] flex flex-col justify-start group shrink-0"
          >
            {/* Project Image / Placeholder */}
            <div className="relative w-full h-[45vh] md:h-[50vh] shrink-0 overflow-hidden rounded-2xl bg-muted border border-border">
              <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-background/30 backdrop-blur-sm flex items-center justify-center">
                <Link
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300"
                >
                  Ver Proyecto <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <div
                className={`project-image-inner w-[120%] h-full absolute top-0 -left-[10%] bg-gradient-to-br ${project.color} flex items-center justify-center`}
              >
                {project.img ? (
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="flex items-center gap-3 mb-4">
                      {project.technologies.slice(0, 3).map((t, idx) => {
                        const Icon = t.icon;
                        return (
                          <div
                            key={idx}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-background/50 backdrop-blur-md border border-border/50 flex items-center justify-center p-3 shadow-xl"
                          >
                            <Icon className="w-full h-full" />
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-xl md:text-2xl font-heading font-bold text-foreground/80 max-w-xs">
                      {project.title}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="flex flex-col md:flex-row justify-between items-start mt-6 gap-4">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                  {project.category}
                </p>
                <h3 className="text-xl md:text-3xl font-heading font-bold text-foreground mb-3 text-balance">
                  {project.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground font-light max-w-md leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:max-w-[260px] justify-start md:justify-end">
                {project.technologies.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 text-[10px] md:text-xs px-3 py-1 rounded-full border border-border text-foreground bg-secondary/50 backdrop-blur-sm"
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {tech.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
