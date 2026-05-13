"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Laravel,
  React,
  TailwindCss,
  Typescript,
  Figma,
  Gsap,
} from "@thesvg/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NextJsWordmark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80">
    <path
      fill="currentColor"
      d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"
    />
    <path
      fill="currentColor"
      d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"
    />
  </svg>
);

const skills = [
  {
    name: "React",
    size: "text-6xl md:text-8xl lg:text-9xl",
    color: "text-primary",
    position: "left-[5%] md:left-[5%] top-[5%] md:top-[10%]",
    speed: 0.05,
    logo: <React />,
  },
  {
    name: "",
    size: "text-6xl md:text-8xl lg:text-[10rem]",
    color: "text-foreground",
    position: "right-[5%] md:right-[5%] top-[15%] md:top-[15%]",
    speed: 0.08,
    logo: <NextJsWordmark />,
  },
  {
    name: "",
    size: "text-[15rem] md:text-[15rem] lg:text-[17rem]",
    color: "text-muted-foreground/30",
    position: "left-[10%] md:left-[10%] top-[40%] md:top-[40%]",
    speed: 0.12,
    logo: <Gsap />,
  },
  {
    name: "Tailwind CSS",
    size: "text-4xl md:text-6xl lg:text-8xl",
    color: "text-foreground/80",
    position: "right-[5%] md:right-[10%] top-[50%] md:top-[45%]",
    speed: 0.06,
    logo: <TailwindCss />,
  },
  {
    name: "TypeScript",
    size: "text-5xl md:text-7xl lg:text-9xl",
    color: "text-primary/70",
    position: "left-[5%] md:left-[5%] bottom-[10%] md:bottom-[15%]",
    speed: 0.04,
    logo: <Typescript />,
  },
  {
    name: "Figma",
    size: "text-6xl md:text-8xl lg:text-9xl",
    color: "text-muted-foreground/50",
    position: "right-[10%] md:right-[5%] bottom-[5%] md:bottom-[10%]",
    speed: 0.07,
    logo: <Figma />,
  },
  {
    name: "Laravel",
    size: "text-4xl md:text-6xl lg:text-8xl",
    color: "text-foreground/90",
    position: "left-[30%] md:left-[45%] bottom-[2%] md:bottom-[5%]",
    speed: 0.09,
    logo: <Laravel />,
  },
];

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      // 1. Stagger Reveal Animation on Scroll
      gsap.fromTo(
        ".skill-item",
        {
          y: 100,
          opacity: 0,
          scale: 0.5,
          rotationZ: () => gsap.utils.random(-15, 15),
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          onComplete: () => {
            // 2. Continuous Soft Floating Animation
            gsap.utils.toArray(".skill-item").forEach((item: any) => {
              gsap.to(item, {
                y: `+=${gsap.utils.random(-25, 25)}`,
                x: `+=${gsap.utils.random(-15, 15)}`,
                rotationZ: gsap.utils.random(-4, 4),
                duration: gsap.utils.random(4, 7),
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              });
            });
          },
        },
      );

      // 3. Mouse Parallax Effect
      const mouseMoveHandler = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        // Normalize mouse coordinates from -1 to 1
        const xPos = (e.clientX / innerWidth - 0.5) * 2;
        const yPos = (e.clientY / innerHeight - 0.5) * 2;

        gsap.utils.toArray(".skill-item").forEach((item: any) => {
          const speed = parseFloat(
            item.getAttribute("data-mouse-speed") || "0.05",
          );
          gsap.to(item, {
            x: -xPos * innerWidth * speed,
            y: -yPos * innerHeight * speed,
            duration: 1.5,
            ease: "power2.out",
          });
        });
      };

      window.addEventListener("mousemove", mouseMoveHandler);

      return () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] md:min-h-[120vh] py-32 px-6 overflow-hidden bg-pine-teal-950 flex flex-col items-center justify-center section"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] rounded-full bg-primary/5 blur-[150px] pointer-events-none z-0"></div>

      {/* Center Cinematic Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 text-center pointer-events-none select-none">
        <h2 className="text-[18vw] md:text-[12vw] font-heading font-black opacity-[0.03] text-foreground tracking-tighter whitespace-nowrap">
          TECH STACK
        </h2>
      </div>

      {/* Floating Elements Container */}
      <div className="relative w-full h-[120vh] md:h-[100vh] max-w-screen-2xl mx-auto z-10">
        {skills.map((skill, index) => {
          const isHovered = hoveredIndex === index;
          const isOthersHovered =
            hoveredIndex !== null && hoveredIndex !== index;

          return (
            <div
              key={index}
              className={`skill-item absolute flex items-center gap-4 cursor-crosshair transition-all duration-700 ease-out ${skill.position} ${skill.size} ${skill.color}`}
              data-mouse-speed={skill.speed}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                opacity: isOthersHovered ? 0.15 : 1,
                filter: isOthersHovered ? "blur(8px)" : "blur(0px)",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                zIndex: isHovered ? 50 : 10,
              }}
            >
              {skill.logo && (
                <span
                  className={`inline-flex h-[0.8em] w-auto items-center justify-center [&>svg]:h-full [&>svg]:w-auto drop-shadow-2xl transition-transform duration-500 ${
                    isHovered ? "scale-110" : ""
                  } `}
                >
                  {skill.logo}
                </span>
              )}
              {skill.name && (
                <h3 className="font-heading font-black tracking-tighter uppercase leading-none select-none">
                  {skill.name}
                </h3>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
