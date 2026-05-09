"use client"
import Image from "next/image";
import pro2 from "@/public/pro2.png"
import gsap from "gsap"
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export function AboutSection() {
    {/* const containerRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {

        const split = new SplitText(".seco, .parrafo", {
            type: "words, line, chars",
        });

        gsap.from(split.words, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none reverse",
            },

            y: 50,
            opacity: 0,
            duration: 3,
            stagger: 0.08,
            ease: "power3.out",
        });
        gsap.from(split.lines, {
            scrollTrigger: {
                trigger: ".parrafo",
                start: "top 85%",
                toggleActions: "play none none reverse",
            },

            x: -200, // entra desde la izquierda
            opacity: 0,
            duration: .1,
            ease: "power3.out",
        });
        return () => {
            split.revert();
        }
    }, {scope: containerRef});*/
    }
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to('.parrafo', {
            x: 400,
            ease: "power1.inOut",
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.section.middle',
                start: "top 25%",
                end: "bottom 75%",
               
            }
        })
        gsap.to('.subtitle', {
            x: -400,
            ease: "power1.inOut",
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.section.middle',
                start: "top 75%",
                end: "bottom 75%",

            }
        })
    });
    return (
        <section className="min-h-screen flex items-center justify-center   flex-col p-10 space-y-4 section middle"
        >
            <div className="flex-1 flex gap-3 justify-center items-center">


                <div className="h-75 flex flex-col gap-2 ">
                    <h2 className="text-5xl font-heading subtitle ">
                        Sobre Mí
                    </h2>

                    {/* <div className="border-l-2 border-black flex-1 min-h-0 w-3 self-center "></div>*/}

                </div>

                {/* Columna Derecha: Texto e Imagen */}
                <div className="flex items-center justify-center max-w-5xl h-[300px] text-justify relative">
                    <div className="h-75 flex flex-col items-center justify-center">
                        <p className="text-xl parrafo">
                            ¡Hola! Soy estudiante de Ingeniería de Sistemas y un gran apasionado por el desarrollo web.
                            Me encanta dar vida a soluciones digitales que no solo funcionen a la perfección, sino que
                            sean súper
                            intuitivas, cómodas y geniales de navegar. Para lograrlo, combino lo mejor de la lógica de
                            sistemas y el
                            diseño visual utilizando tecnologías como React, Next.js, Laravel, Tailwind CSS y Figma. ¡Mi
                            mayor
                            motivación es seguir aprendiendo y crear proyectos increíbles donde la eficiencia del código
                            y la mejor
                            experiencia de usuario vayan siempre de la mano!
                        </p>
                    </div>
                    <Image src={pro2} alt="imagen" className="w-[400px] h-[300px] "/>
                </div>

            </div>
            <div className="flex-1  flex  gap-3 justify-center items-center">
                <div className="h-75 flex flex-col gap-2">
                    <h2 className="text-5xl font-heading subtitle">
                        Objetivo
                    </h2>

                    {/* <div className="border-l-2 border-black flex-1 min-h-0 w-3 self-center "></div>*/}

                </div>
                <div className="flex items-center justify-center max-w-5xl h-[300px] text-justify relative">
                    <p className="text-2xl parrafo">
                        Mi objetivo es desarrollar páginas web que no solo cumplan con los requerimientos del cliente,
                        sino
                        que
                        también brinden una experiencia clara, cómoda y atractiva para los usuarios, generando valor
                        real en
                        cada proyecto.</p>
                </div>

            </div>
            <div className="flex-1 flex gap-3 justify-center items-center">
                <div className="h-75 flex flex-col gap-2">
                    <h2 className="text-5xl font-heading subtitle">
                        Filosofia
                    </h2>

                    {/*  <div className="border-l-2 border-black flex-1 min-h-0 w-3 self-center "></div>*/}

                </div>
                <div className="flex items-center justify-center max-w-5xl h-[300px] text-justify">
                    <p className="text-2xl parrafo ">
                        Creo que una buena página web debe ser simple de entender y fácil de usar. Mi enfoque es crear
                        sitios
                        donde el usuario se sienta cómodo desde el primer momento, combinando diseño, funcionalidad y
                        claridad
                        en cada detalle.</p>
                </div>
            </div>
        </section>
    );
}
