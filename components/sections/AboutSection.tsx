"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MonitorSmartphone, Layers } from "lucide-react";
import me from "@/public/me.png";

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
        duration: 20,
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
            Más que código,
            <br />
            <span className="text-muted-foreground">
              experiencias digitales.
            </span>
          </h2>
        </div>

        {/* About Me Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24 md:mb-32 items-center">
          <div className="lg:col-span-7 reveal-text-container space-y-6">
            <h3 className="text-2xl font-semibold mb-4 text-foreground reveal-text flex items-center gap-3">
              <span className="w-8 h-[2px] bg-primary inline-block"></span>
              Sobre mí
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed reveal-text font-light">
              ¡Hola! Soy estudiante de Ingeniería de Sistemas y un gran
              apasionado por el desarrollo web. Me encanta dar vida a soluciones
              digitales que no solo funcionen a la perfección, sino que sean
              súper intuitivas, cómodas y geniales de navegar.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed reveal-text font-light">
              Para lograrlo, combino lo mejor de la lógica de sistemas y el
              diseño visual. Mi mayor motivación es seguir aprendiendo y crear
              proyectos increíbles donde la eficiencia del código y la mejor
              experiencia de usuario vayan siempre de la mano.
            </p>
          </div>

          <div className="lg:col-span-5 parallax-container relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden reveal-image border border-border">
            {/* Overlay to darken image slightly to match the theme */}
            <div className="absolute inset-0 bg-background/20 z-10 mix-blend-overlay"></div>
            <Image
              src={me}
              alt="Carlos David - Desarrollador Web"
              fill
              className="object-cover parallax-img scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Technologies Marquee */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-6 -rotate-[4deg] scale-130 bg-secondary/80 border-y border-border mb-24 md:mb-32 z-20 backdrop-blur-md">
          <div className="flex w-max marquee-content items-center">
            {/* First Set */}
            <div className="flex gap-12 px-6 items-center">
              {[
                "Landing Pages",
                "Paginas Web",
                "Aplicaciones Web",
                "E-commerce",
                "Paginas E-commerce",
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
                "Landing Pages",
                "Paginas Web",
                "Aplicaciones Web",
                "E-commerce",
                "Paginas E-commerce",
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

        {/* Cards Section: Objetivo & Filosofía */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 cards-container">
          {/* Objetivo Card */}
          <div className="reveal-card group relative p-8 md:p-10 rounded-3xl bg-card/40 border border-border hover:bg-card/60 hover:border-primary/50 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted group-hover:bg-secondary transition-colors duration-500">
              <MonitorSmartphone className="w-6 h-6 text-foreground/80" />
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Objetivo
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              Desarrollar páginas web que no solo cumplan con los requerimientos
              del cliente, sino que también brinden una experiencia clara,
              cómoda y atractiva para los usuarios, generando valor real en cada
              proyecto.
            </p>
          </div>

          {/* Filosofía Card */}
          <div className="reveal-card group relative p-8 md:p-10 rounded-3xl bg-card/40 border border-border hover:bg-card/60 hover:border-primary/50 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted group-hover:bg-secondary transition-colors duration-500">
              <Layers className="w-6 h-6 text-foreground/80" />
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Filosofía
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light mb-4">
              Creo que una buena página web debe ser simple de entender y fácil
              de usar. Mi enfoque es crear sitios donde el usuario se sienta
              cómodo desde el primer momento, combinando diseño, funcionalidad y
              claridad.
            </p>
            <blockquote className="border-l-2 border-border pl-4 italic text-muted-foreground/80">
              "Una buena página web no debe ser complicada."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
