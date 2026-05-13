"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials = [
  {
    quote: "La atención al detalle y la calidad del código superaron todas nuestras expectativas. Una verdadera experiencia digital.",
    name: "Elena Rodríguez",
    role: "CEO, TechStart",
  },
  {
    quote: "Transformó completamente nuestra identidad web. Las animaciones y el rendimiento son de primer nivel.",
    name: "Marcos Silva",
    role: "Director Creativo, Studio Minimal",
  },
];

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".testimonial-item");

      items.forEach((item: any, i) => {
        // Blur to sharp animation
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            filter: "blur(20px)",
            scale: 0.9,
            y: 50
          },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "top 40%",
              scrub: 1,
            },
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            y: 0,
            ease: "power2.out",
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-onyx-950 text-foreground flex flex-col justify-center overflow-hidden section"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-5 pointer-events-none flex items-center justify-center">
        <Quote className="w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] text-foreground" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col space-y-48">
        {testimonials.map((test, index) => (
          <div 
            key={index} 
            className="testimonial-item flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <Quote className="w-12 h-12 md:w-16 md:h-16 text-primary/50 mb-8" />
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium leading-tight md:leading-tight mb-12 text-foreground">
              "{test.quote}"
            </h3>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold text-foreground mb-1">{test.name}</p>
              <p className="text-muted-foreground font-mono uppercase tracking-widest text-sm">{test.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
