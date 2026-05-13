"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const processes = [
  {
    number: "01",
    title: "Descubrimiento",
    description: "Análisis profundo de los requerimientos, objetivos del negocio y audiencia objetivo para establecer una base sólida.",
  },
  {
    number: "02",
    title: "Diseño UI/UX",
    description: "Creación de wireframes y prototipos interactivos en Figma, definiendo la estética visual y el flujo de usuario.",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construcción de la aplicación utilizando código limpio, arquitecturas escalables y tecnologías de vanguardia.",
  },
  {
    number: "04",
    title: "Animación & Pulido",
    description: "Integración de micro-interacciones y animaciones fluidas con GSAP para una experiencia inmersiva y memorable.",
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useGSAP(
    () => {
      // Reveal the title
      gsap.fromTo(
        ".process-header",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".process-header",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Stagger reveal process items
      gsap.fromTo(
        ".process-item",
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-onyx-900 text-foreground overflow-hidden section"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-20 md:mb-32 process-header">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tighter">
            Mi Proceso
            <span className="text-primary">.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl font-light">
            Metodología estructurada de principio a fin para transformar ideas abstractas en productos digitales funcionales y visualmente deslumbrantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 process-grid">
          {processes.map((proc, index) => (
            <div 
              key={index} 
              className={`process-item flex flex-col md:flex-row gap-6 md:gap-10 transition-all duration-500 ${activeStep !== null && activeStep !== index ? 'opacity-30 blur-[2px]' : 'opacity-100'} ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              
              <div className="text-7xl md:text-9xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-primary/80 to-background/10 leading-none select-none">
                {proc.number}
              </div>
              
              <div className="flex flex-col pt-4 md:pt-8">
                <h3 className="text-3xl font-semibold mb-4 text-foreground">
                  {proc.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light text-lg">
                  {proc.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
