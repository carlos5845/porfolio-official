"use client"

import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

gsap.registerEffect({
    name: "counter",
    effect: (targets: any, config: any) => {
        const obj = {val: 0};

        return gsap.to(obj, {
            val: config.end,
            duration: config.duration,
            ease: config.ease,
            onUpdate: () => {
                targets.forEach((el: HTMLElement) => {
                    el.textContent = Math.floor(obj.val).toString();
                });
            }
        });
    }
});

export function HeroSection() {
    const container = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const split = new SplitText('.title', {
            type: "chars, words"
        });

        let timerSplit: SplitText;

        const tl = gsap.timeline();

        tl.add(
            gsap.effects.counter(".timer", {
                end: 100,
                duration: 2,
                ease: "power1.out"
            }),
            0
        )
            .fromTo(".timer",
                {scale: 0.5, transformOrigin: "left center"},
                {scale: 1.2, duration: 2, ease: "power1.out"},
                0
            )
            .add(() => {
                timerSplit = new SplitText(".timer", {type: "chars"});

                gsap.to(timerSplit.chars, {
                    x: -100,
                    autoAlpha: 0,
                    stagger: 0.05,
                    duration: 1,
                    onComplete: () => {
                        gsap.set(".timer", {display: "none"});
                    }
                });
            })

            .add(() => {
                timerSplit = new SplitText(".timer", {type: "chars"});

                gsap.to(timerSplit.chars, {
                    x: -100,
                    autoAlpha: 0,
                    stagger: 0.05,
                    duration: 1,
                    onComplete: () => {
                        gsap.set(".timer", {display: "none"});
                    }
                });
            })
            .from(split.chars, {
                y: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 1,
                ease: "power4.out"
            }, ">-0.1")
            .fromTo('.barra-progress',
                {width: "0%"},
                {width: "100%", duration: 2, ease: "power1.out"},
                "<"
            )
            .from('.menu-item', {
                opacity: 0,
                y: 20,
                stagger: 0.3,
                duration: 2,
                ease: "power2.out"
            }, "<0.1")


        return () => {
            split.revert();
            if (timerSplit) timerSplit.revert();
        };

    }, {scope: container});

    return (
        <div
            ref={container}
            className="relative h-screen flex flex-col justify-end p-10"
        >
            <div className="timer text-9xl font-heading tabular-nums">
                0
            </div>

            <div className="z-10 font-heading text-left text-[clamp(3rem,12vw,200px)] leading-none title">
                CARLOS DAVID
            </div>
            <div className="border-b-2 w-full border-black barra-progress"></div>
            <ul className="flex justify-around items-center list-none  menu-item">
                <li>CARLOS</li>
                <li>CARLOS</li>
                <li>CARLOS</li>
            </ul>

        </div>
    );
}
