"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Php,
  Javascript,
  Python,
  Laravel,
  Nodedotjs,
  Postgresql,
  Mysql,
  React as ReactSvg,
  Nextdotjs,
  TailwindCss,
  Linux,
  ScikitLearn,
} from "@thesvg/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const skills = [
  {
    name: "Laravel",
    size: "text-4xl md:text-6xl lg:text-7xl",
    color: "text-foreground",
    position: "left-[5%] md:left-[8%] top-[6%] md:top-[8%]",
    speed: 0.05,
    logo: <Laravel />,
  },
  {
    name: "Python",
    size: "text-4xl md:text-5xl lg:text-7xl",
    color: "text-foreground",
    position: "right-[6%] md:right-[10%] top-[8%] md:top-[10%]",
    speed: 0.08,
    logo: <Python />,
  },
  {
    name: "PostgreSQL",
    size: "text-4xl md:text-6xl lg:text-8xl",
    color: "text-foreground",
    position: "left-[10%] md:left-[12%] top-[23%] md:top-[22%]",
    speed: 0.06,
    logo: <Postgresql />,
  },
  {
    name: "Next.js",
    size: "text-3xl md:text-5xl lg:text-7xl",
    color: "text-foreground",
    position: "right-[8%] md:right-[15%] top-[23%] md:top-[22%]",
    speed: 0.09,
    logo: <Nextdotjs />,
  },
  {
    name: "PHP",
    size: "text-4xl md:text-5xl lg:text-6xl",
    color: "text-foreground/90",
    position: "left-[4%] md:left-[6%] top-[40%] md:top-[38%]",
    speed: 0.04,
    logo: <Php />,
  },
  {
    name: "Node.js",
    size: "text-3xl md:text-5xl lg:text-7xl",
    color: "text-foreground",
    position: "right-[5%] md:right-[8%] top-[38%] md:top-[38%]",
    speed: 0.07,
    logo: <Nodedotjs />,
  },
  {
    name: "React",
    size: "text-4xl md:text-6xl lg:text-8xl",
    color: "text-foreground",
    position: "left-[10%] md:left-[16%] top-[56%] md:top-[53%]",
    speed: 0.06,
    logo: <ReactSvg />,
  },
  {
    name: "Tailwind CSS",
    size: "text-3xl md:text-4xl lg:text-6xl",
    color: "text-foreground",
    position: "right-[8%] md:right-[12%] top-[53%] md:top-[51%]",
    speed: 0.08,
    logo: <TailwindCss />,
  },
  {
    name: "MySQL",
    size: "text-3xl md:text-5xl lg:text-6xl",
    color: "text-foreground/90",
    position: "left-[6%] md:left-[8%] top-[72%] md:top-[69%]",
    speed: 0.05,
    logo: <Mysql />,
  },
  {
    name: "Machine Learning",
    size: "text-3xl md:text-5xl lg:text-6xl",
    color: "text-primary",
    position: "right-[6%] md:right-[10%] top-[69%] md:top-[67%]",
    speed: 0.1,
    logo: <ScikitLearn />,
  },
  {
    name: "JavaScript",
    size: "text-3xl md:text-4xl lg:text-6xl",
    color: "text-foreground/90",
    position: "left-[18%] md:left-[28%] bottom-[8%] md:bottom-[10%]",
    speed: 0.06,
    logo: <Javascript />,
  },
  {
    name: "Linux & Git",
    size: "text-2xl md:text-4xl lg:text-5xl",
    color: "text-foreground/80",
    position: "right-[18%] md:right-[26%] bottom-[6%] md:bottom-[8%]",
    speed: 0.05,
    logo: <Linux />,
  },
];

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      // 1. Initial Entrance Animation
      gsap.fromTo(
        ".skill-item",
        {
          opacity: 0,
          scale: 0.5,
          y: 80,
          filter: "blur(15px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.8,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          onComplete: () => {
            // 2. Continuous Soft Floating Animation
            gsap.utils
              .toArray<HTMLElement>(".skill-item")
              .forEach((item) => {
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
        const xPos = (e.clientX / innerWidth - 0.5) * 2;
        const yPos = (e.clientY / innerHeight - 0.5) * 2;

        gsap.utils
          .toArray<HTMLElement>(".skill-item")
          .forEach((item) => {
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
              className={`skill-item absolute flex items-center gap-3 md:gap-4 cursor-crosshair transition-all duration-700 ease-out ${skill.position} ${skill.size} ${skill.color}`}
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
                  className={`inline-flex h-[0.85em] w-auto items-center justify-center [&>svg]:h-full [&>svg]:w-auto drop-shadow-2xl transition-transform duration-500 ${
                    isHovered ? "scale-110" : ""
                  }`}
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
