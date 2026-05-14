"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export function HeroSection() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const split = new SplitText(".title", {
        type: "chars, words",
      });

      let timerSplit: SplitText;
      let dynamicSplit: SplitText | null = null;
      let rotatorTl: gsap.core.Timeline | null = null;

      const words = [
        "CARLOSJS",
        "DESARROLLADOR",
        "DISEÑADOR",
        "FREELANCER",
        "CREATIVO",
        "FRONTEND DEV",
      ];

      let currentIndex = 0;

      const animateNextWord = () => {
        const dynamicWordEl = document.querySelector(".dynamic-word");
        if (!dynamicWordEl) return;

        if (dynamicSplit) {
          dynamicSplit.revert();
        }

        dynamicWordEl.textContent = words[currentIndex];
        dynamicSplit = new SplitText(dynamicWordEl, { type: "chars" });

        rotatorTl = gsap.timeline({
          onComplete: () => {
            currentIndex = (currentIndex + 1) % words.length;
            animateNextWord();
          },
        });

        rotatorTl
          .fromTo(
            dynamicSplit.chars,
            { y: 80, opacity: 0, filter: "blur(12px)", rotationX: -90 },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              rotationX: 0,
              duration: 1,
              stagger: 0.05,
              ease: "back.out(1.5)",
            },
          )
          .to({}, { duration: 2.5 })
          .to(dynamicSplit.chars, {
            y: -80,
            opacity: 0,
            filter: "blur(12px)",
            rotationX: 90,
            duration: 0.6,
            stagger: 0.03,
            ease: "power3.in",
          });
      };

      // Bloquear el scroll durante la animación inicial
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          // Restaurar el scroll y ocultar el loader para liberar eventos
          document.body.style.overflow = "";
          gsap.set(".intro-loader", { pointerEvents: "none", display: "none" });
        },
      });

      // 1. Aparece el texto central suavemente sobre los paneles (con un ligero delay inicial)
      tl.fromTo(
        ".intro-logo",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 },
      )
        // 2. Pequeña pausa cinemática y el texto se difumina hacia arriba
        .to(".intro-logo", {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.in",
          delay: 0.6,
        })
        // 3. Los paneles continúan subiendo para descubrir la pantalla principal
        .to(
          ".intro-panel",
          {
            yPercent: -100, // Sube hasta desaparecer por arriba
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.inOut",
          },
          "-=0.4",
        )
        // 4. Inicia la animación del contenido principal (Hero)
        .from(
          split.chars,
          {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.6",
        )
        .fromTo(
          ".barra-progress",
          { width: "0%" },
          { width: "100%", duration: 1.5, ease: "power3.inOut" },
          "<",
        )
        .from(
          ".menu-item li",
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
          },
          "-=1",
        )
        .add(() => {
          animateNextWord();
        }, "-=0.5");

      return () => {
        split.revert();
        if (dynamicSplit) dynamicSplit.revert();
        if (rotatorTl) rotatorTl.kill();
        document.body.style.overflow = ""; // Limpieza de seguridad
      };
    },
    { scope: container },
  );

  useGSAP(
    () => {
      // Cinematic Stacking Effect
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(".hero-content", {
        scale: 0.92,
        opacity: 0.4,
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="relative h-screen w-full bg-background z-0">
      {/* Intro Loader Panels */}
      <div className="intro-loader fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="intro-panel w-1/5 h-screen bg-foreground absolute top-0"
              style={{ left: `${(i - 1) * 20}%` }}
            ></div>
          ))}
        </div>
        <div className="intro-logo z-10 font-heading text-4xl md:text-6xl tracking-[0.3em] font-bold text-background opacity-0">
          CARLOSJS
        </div>
      </div>

      <Image
        src="/proyects/fondo-hero.png"
        alt="Hero"
        width={1920}
        height={1080}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      />
      <div className="hero-content relative w-full h-full flex flex-col justify-end p-10 text-foreground section origin-bottom">
        <div className="z-10 font-heading text-left text-[clamp(1.5rem,7vw,200px)] md:text-[clamp(3rem,10vw,200px)] leading-none flex flex-col uppercase">
          <div className="title text-[clamp(1.5rem,7vw,200px)] md:text-[clamp(3rem,10vw,200px)]s">
            HOLA, SOY
          </div>
          <div className="text-primary mt-2 h-[1.1em] overflow-visible w-full">
            <span className="dynamic-word inline-block whitespace-nowrap"></span>
          </div>
        </div>
        <div className="border-b-2 w-full border-border barra-progress border-white"></div>
        <ul className="flex justify-around items-center list-none menu-item text-muted-foreground mt-4 text-sm font-mono tracking-widest uppercase text-white">
          <li className="hover:text-primary transition-colors cursor-pointer">
            Cultura
          </li>
          <li className="hover:text-primary transition-colors cursor-pointer">
            Visión
          </li>
          <li className="hover:text-primary transition-colors cursor-pointer">
            Contacto
          </li>
        </ul>
      </div>
    </div>
  );
}
