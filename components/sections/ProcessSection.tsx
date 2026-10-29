"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const processes = [
  {
    number: "01",
    tag: "El Punto de Partida",
    title: "Inmersión & Escucha Activa",
    description:
      "Todo comienza con una conversación cercana para entender a fondo tu negocio, tu visión y qué te diferencia. No utilizo plantillas prediseñadas; analizamos juntos tus objetivos para definir una estrategia web única.",
  },
  {
    number: "02",
    tag: "Identidad & Estética",
    title: "Concepto Visual & Diseño Exclusivo",
    description:
      "Traduzco tus ideas en una propuesta estética hecha a medida. Diseñamos la personalidad visual, los flujos y la experiencia de usuario para que tu web tenga carácter propio y destaque de inmediato frente a la competencia.",
  },
  {
    number: "03",
    tag: "Ingeniería a Medida",
    title: "Desarrollo Full Stack & Rendimiento",
    description:
      "Doy vida al diseño con tecnologías modernas. Construyo una web ultra-rápida, con animaciones fluidas y diseño responsivo, respaldada por una estructura técnica limpia, segura y preparada para crecer con tu marca.",
  },
  {
    number: "04",
    tag: "Puesta a Punto",
    title: "Detalles Finales & Lanzamiento",
    description:
      "Optimizamos cada detalle: velocidad de carga, pruebas rigurosas en móviles y conexión de tus canales. Lanzamos tu plataforma al mundo lista para cautivar visitantes y convertir clientes, acompañándote en cada paso.",
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
        },
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
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-onyx-900 text-foreground overflow-hidden section"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 md:mb-32 process-header">
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-primary inline-block"></span>
            El Viaje de tu Proyecto
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tighter">
            ¿Cómo es trabajar conmigo?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl font-light leading-relaxed">
            Una experiencia colaborativa de principio a fin: desde la primera conversación hasta el lanzamiento de una plataforma web única, potente y diseñada a tu medida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 process-grid">
          {processes.map((proc, index) => (
            <div
              key={index}
              className={`process-item flex flex-col md:flex-row gap-6 md:gap-10 transition-all duration-500 ${
                activeStep !== null && activeStep !== index
                  ? "opacity-30 blur-[2px]"
                  : "opacity-100"
              } ${index % 2 !== 0 ? "md:mt-32" : ""}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="text-7xl md:text-9xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-primary/80 to-background/10 leading-none select-none">
                {proc.number}
              </div>

              <div className="flex flex-col pt-4 md:pt-8">
                <span className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2">
                  {proc.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-foreground">
                  {proc.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light text-base md:text-lg">
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
