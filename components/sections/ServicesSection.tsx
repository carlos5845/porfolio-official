"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const services = [
  {
    title: "Front-End",
    description: "Desarrollo de interfaces inmersivas, ultra-rápidas y pixel-perfect usando React y Next.js.",
  },
  {
    title: "UI/UX Design",
    description: "Diseño de experiencias centradas en el usuario con prototipado de alta fidelidad en Figma.",
  },
  {
    title: "Motion",
    description: "Animaciones avanzadas con GSAP para crear interacciones fluidas y cinemáticas.",
  },
  {
    title: "Back-End",
    description: "Arquitecturas escalables y APIs robustas con Laravel para respaldar productos digitales.",
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Split text for scrubbing effect
      const splitTitles = new SplitText(".service-title", { type: "chars" });

      // Animate each character's opacity based on scroll
      gsap.fromTo(
        splitTitles.chars,
        {
          opacity: 0.1,
        },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".services-list",
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Reveal descriptions
      const descriptions = gsap.utils.toArray(".service-desc");
      descriptions.forEach((desc: any) => {
        gsap.fromTo(
          desc,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: desc,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      });

      return () => {
        splitTitles.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-pine-teal-900 text-foreground flex flex-col justify-center section"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-xl md:text-2xl text-muted-foreground font-mono uppercase tracking-[0.3em] mb-16 md:mb-24 flex items-center gap-4">
          <span className="w-12 h-[1px] bg-primary/50"></span>
          Especialidades
        </h2>

        <div className="flex flex-col space-y-16 md:space-y-24 services-list">
          {services.map((service, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/50 pb-8 group">
              
              <h3 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter service-title select-none">
                {service.title}
              </h3>
              
              <p className="text-lg md:text-xl text-muted-foreground/80 font-light max-w-sm mt-6 md:mt-0 md:text-right service-desc">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
