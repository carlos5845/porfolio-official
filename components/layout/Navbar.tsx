"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleTransition = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    // Bloquear clicks durante la transición
    gsap.set(".transition-panel-container", { pointerEvents: "auto" });

    gsap.to(".transition-panel", {
      yPercent: -100, // Sube desde top: 100% para cubrir la pantalla
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.inOut",
      onComplete: () => {
        // Ejecutar navegación
        if (href.startsWith("#")) {
          const section = document.querySelector(href);
          if (section) section.scrollIntoView({ behavior: "instant" });
        } else {
          router.push(href);
        }

        setOpen(false);

        // Esperar renderizado y animar hacia afuera
        setTimeout(() => {
          gsap.to(".transition-panel", {
            yPercent: -200, // Sube para desaparecer por arriba
            duration: 0.8,
            stagger: 0.05,
            ease: "power4.inOut",
            onComplete: () => {
              // Resetear posición
              gsap.set(".transition-panel", { yPercent: 0 });
              gsap.set(".transition-panel-container", {
                pointerEvents: "none",
              });
            },
          });
        }, 100);
      },
    });
  };

  let timerSplit: SplitText;
  useGSAP(() => {
    const split = new SplitText(".nat", {
      type: "chars",
    });
    gsap.from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
      delay: 2,
    });
  });
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div className="" ref={containerRef}>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-8 py-6  nat backdrop-blur-md">
        <Link
          href="/"
          className=" tracking-[0.2em] font-heading text-[clamp(30px,30px,11px)] z-[200] relative text-foreground mix-blend-normal"
        >
          CARLOSJS
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative z-[200] bg-transparent border-none cursor-pointer group"
        >
          <div className="relative h-6 min-w-[80px] overflow-hidden font-bold tracking-[0.2em] text-foreground">
            <span
              className={`absolute left-0 top-0 w-full transition-all duration-300 ${
                open ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              MENU
            </span>

            <span
              className={`absolute left-0 top-0 w-full transition-all duration-300 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              CLOSE
            </span>
          </div>
        </button>
      </nav>

      {/* Overlay */}
      <div
        aria-hidden={!open}
        className="fixed inset-0 z-50 bg-pine-teal-600 overflow-y-auto transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 3rem) 3rem)"
            : "circle(0% at calc(100% - 3rem) 3rem)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="min-h-full flex flex-col justify-end p-8 pt-32 pb-12">
          <ul className="list-none flex flex-col">
            {[
              { label: "Inicio", href: "#home" },
              { label: "Sobre mí", href: "#about" },
              { label: "Experiencia", href: "#experience" },
              { label: "Servicios", href: "#services" },
              { label: "Proceso", href: "#process" },
              { label: "Skills", href: "#skills" },
              { label: "Proyectos", href: "#projects" },
              { label: "Contacto", href: "#contact" },
            ].map((item, i) => (
              <li
                key={item.href}
                className="overflow-hidden border-t border-foreground/20 last:border-b"
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleTransition(e, item.href)}
                  className="group flex items-center justify-between py-6 font-bold text-primary-foreground no-underline hover:opacity-70 transition-opacity"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 4rem)",
                    letterSpacing: "-0.02em",
                    transform: open ? "translateY(0)" : "translateY(110%)",
                    transition: `transform 0.6s cubic-bezier(0.23,1,0.32,1) ${0.1 + i * 0.07}s`,
                  }}
                >
                  {item.label}
                  <span className="text-2xl opacity-30 inline-block -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Transition Panels */}
      <div className="transition-panel-container fixed inset-0 z-[9999] pointer-events-none flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="transition-panel w-1/5 h-screen bg-foreground absolute top-full"
            style={{ left: `${(i - 1) * 20}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
