"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "@thesvg/react";
import owo from "@/public/owo.png";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      // Parallax reveal effect for the footer content
      gsap.fromTo(
        ".footer-content",
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      );

      // Stagger reveal links
      gsap.fromTo(
        ".social-link",
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef },
  );

  // Magnetic button effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-pine-teal-900 text-foreground overflow-hidden flex flex-col justify-end z-0 border-t border-border"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 footer-content flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-[0.3em] text-primary mb-6">
          <MapPin className="w-4 h-4" />
          <span>Puno, Perú · Disponible para Proyectos</span>
        </div>

        <p className="text-xl md:text-2xl font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
          ¿Tienes una idea o proyecto en mente?
        </p>
        <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-heading font-black leading-none tracking-tighter mb-12 hover:text-primary transition-colors duration-500 cursor-default">
          ¿HABLAMOS?
        </h2>

        <div className="mb-10 w-24 md:w-32 opacity-80">
          <Image src={owo} alt="Mascot" className="w-full h-auto" />
        </div>

        <a
          href="mailto:contacto@carlosdavid.dev"
          className="inline-block"
        >
          <button
            ref={buttonRef}
            className="group relative flex items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full bg-primary text-primary-foreground font-bold text-lg md:text-2xl tracking-wider uppercase overflow-hidden transition-colors hover:bg-foreground hover:text-background shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Escríbeme{" "}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>
        </a>

        {/* Bottom Bar */}
        <div className="w-full mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:contacto@carlosdavid.dev"
              className="social-link inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span>Email</span>
            </a>
          </div>

          <div className="text-sm font-light text-muted-foreground flex gap-4 uppercase tracking-widest">
            <span>© {new Date().getFullYear()} Carlos David Quispe Chata</span>
            <span className="text-border">|</span>
            <span>Puno, Perú</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
