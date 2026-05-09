"use client";

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";
import gsap from "gsap";

export default function Navbar() {
    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);


    let timerSplit: SplitText;
    useGSAP(
        () => {
            const split = new SplitText('.nat', {
                type: "chars"
            });
            gsap.from(split.chars, {

                y: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 1,
                ease: "power4.out",
                delay: 2

            },)

        }
    )
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
            <nav
                className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-8 py-6  nat">
                <Link href="/"
                      className=" tracking-[0.2em] font-heading text-[clamp(30px,30px,11px)] z-[200] relative text-black mix-blend-normal">
                    CARLOSJS
                </Link>

                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    className="relative z-[200] bg-transparent border-none cursor-pointer group"
                >
                    <div className="relative h-6 min-w-[80px] overflow-hidden font-bold tracking-[0.2em] text-black">
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
                className="fixed inset-0 z-50 bg-ink-black-500 flex flex-col justify-end p-8 transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
                style={{
                    clipPath: open
                        ? "circle(150% at calc(100% - 3rem) 3rem)"
                        : "circle(0% at calc(100% - 3rem) 3rem)",
                    pointerEvents: open ? "auto" : "none",
                }}
            >
                <ul className="list-none flex flex-col">
                    {[
                        {label: "Inicio", href: "/"},
                        {label: "Proyectos", href: "/proyectos"},
                        {label: "Sobre mí", href: "/sobre-mi"},
                        {label: "Contacto", href: "/contacto"},
                    ].map((item, i) => (
                        <li
                            key={item.href}
                            className="overflow-hidden border-t border-black/10 last:border-b"
                        >
                            <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between py-6 font-bold text-[#0a0a0a] no-underline hover:text-white hover:opacity-70 transition-colors"
                                style={{
                                    fontSize: "clamp(2rem, 6vw, 4rem)",
                                    letterSpacing: "-0.02em",
                                    transform: open ? "translateY(0)" : "translateY(110%)",
                                    transition: `transform 0.6s cubic-bezier(0.23,1,0.32,1) ${0.1 + i * 0.07}s`,
                                }}
                            >
                                {item.label}
                                <span
                                    className="text-2xl opacity-30 inline-block -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  →
                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
