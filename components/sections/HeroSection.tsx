"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

gsap.registerEffect({
  name: "counter",
  effect: (targets: any, config: any) => {
    const obj = { val: 0 };

    return gsap.to(obj, {
      val: config.end,
      duration: config.duration,
      ease: config.ease,
      onUpdate: () => {
        targets.forEach((el: HTMLElement) => {
          el.textContent = Math.floor(obj.val).toString();
        });
      },
    });
  },
});

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

      const tl = gsap.timeline();

      tl.add(
        gsap.effects.counter(".timer", {
          end: 100,
          duration: 2,
          ease: "power2.out",
        }),
        0,
      )
        .fromTo(
          ".timer",
          { scale: 0.5, transformOrigin: "left center" },
          { scale: 1.2, duration: 2, ease: "power2.out" },
          0,
        )
        // Pequeño delay de 0.3s antes de ocultar
        .to({}, { duration: 0.3 })
        .add(() => {
          timerSplit = new SplitText(".timer", { type: "chars" });

          gsap.to(timerSplit.chars, {
            x: -100,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(".timer", { display: "none" });
            },
          });
        })
        // Empieza 0.5s después de la orden de ocultar los números
        .from(
          split.chars,
          {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power4.out",
          },
          "+=0.5",
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
        if (timerSplit) timerSplit.revert();
        if (dynamicSplit) dynamicSplit.revert();
        if (rotatorTl) rotatorTl.kill();
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
      <div className="hero-content relative w-full h-full flex flex-col justify-end p-10 text-foreground section origin-bottom">
        <div className="timer text-9xl font-heading tabular-nums">
          <span className="inline-block">0</span>
        </div>

        <div className="z-10 font-heading text-left text-[clamp(1.5rem,7vw,200px)] md:text-[clamp(3rem,10vw,200px)] leading-none flex flex-col uppercase">
          <div className="title text-[clamp(1.5rem,7vw,200px)] md:text-[clamp(3rem,10vw,200px)]s">
            HOLA, SOY
          </div>
          <div className="text-primary mt-2 h-[1.1em] overflow-visible w-full">
            <span className="dynamic-word inline-block whitespace-nowrap"></span>
          </div>
        </div>
        <div className="border-b-2 w-full border-border barra-progress"></div>
        <ul className="flex justify-around items-center list-none menu-item text-muted-foreground mt-4 text-sm font-mono tracking-widest uppercase">
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
