"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Pagina web para una agencia de consultoria",
    category: "Desarrollo frontend",
    description:
      "Una plataforma de comercio electrónico de alto rendimiento con diseño minimalista y pasarela de pago integrada.",
    technologies: ["Next.js", "TailwindCSS", "GSAP"],
    // Placeholder abstracto generado por gradientes en el código, pero usamos una imagen genérica para mantener consistencia si hubiera.
    // Usaremos divs decorativos en lugar de imagenes para este demo premium.
    color: "from-blue-500/20 to-purple-500/20",
    img: "/proyects/statcont.png",
    link: "https://landing-agency-statcont.vercel.app",
  },
  {
    id: "02",
    title: "Dashboard Financiero",
    category: "Aplicación Web",
    description:
      "Panel de control analítico para gestión de finanzas con gráficos interactivos y datos en tiempo real.",
    technologies: ["React", "TypeScript", "Recharts"],
    color: "from-emerald-500/20 to-teal-500/20",
    img: "/proyects/dashboard.png",
    link: "/404",
  },
  {
    id: "03",
    title: "Agencia Creativa",
    category: "Landing Page Interactiva",
    description:
      "Sitio web galardonado con animaciones complejas y scroll inmersivo para una agencia de diseño.",
    technologies: ["GSAP", "Three.js", "React"],
    color: "from-orange-500/20 to-rose-500/20",
    img: "/proyects/agencia.png",
    link: "/404",
  },
  {
    id: "04",
    title: "App de Gestión",
    category: "SaaS",
    description:
      "Software as a Service para gestión de equipos y tareas con arquitectura escalable.",
    technologies: ["Laravel", "PostgreSQL", "Vue"],
    color: "from-indigo-500/20 to-cyan-500/20",
    img: "/proyects/saas.png",
    link: "/404",
  },
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const scrollWrapper = scrollRef.current;

      if (!container || !scrollWrapper) return;

      // Horizontal Scroll Animation
      const getScrollAmount = () => {
        const scrollWidth = scrollWrapper.scrollWidth;
        return -(scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(scrollWrapper, {
        x: getScrollAmount,
        ease: "none",
      });

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
      const images = gsap.utils.toArray(".project-image-inner");
      images.forEach((img: any) => {
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
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[75vh] flex flex-col justify-start group shrink-0"
          >
            {/* Project Image / Placeholder */}
            <div className="relative w-full h-[45vh] md:h-[50vh] shrink-0 overflow-hidden rounded-2xl bg-muted border border-border">
              <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-background/20 backdrop-blur-sm flex items-center justify-center">
                <Link
                  href={project.link}
                  target="_blank"
                  className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300"
                >
                  Ver Caso de Estudio <ArrowUpRight className="w-5 h-5" />
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
                  <span className="text-9xl font-heading font-black text-foreground/5">
                    {project.id}
                  </span>
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
                <p className="text-sm md:text-base text-muted-foreground font-light max-w-md">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:max-w-[200px] justify-start md:justify-end">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] md:text-xs px-3 py-1 rounded-full border border-border text-muted-foreground bg-secondary/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Spacer at the end so the last project aligns properly before unpinning */}
        <div className="w-[10vw]"></div>
      </div>
    </section>
  );
}
