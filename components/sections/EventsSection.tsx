"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Calendar,
  MapPin,
  X,
  Sparkles,
  Camera,
  Award,
  Users,
  Presentation,
  Maximize2,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface EventItem {
  id: string;
  title: string;
  category: "Congreso" | "Hackathon" | "Workshop" | "Comunidad";
  location: string;
  date: string;
  description: string;
  image?: string;
  colSpan: string;
  color: string;
  role?: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: "01",
    title: "Congreso Nacional de Ingeniería de Sistemas (CONEISC)",
    category: "Congreso",
    role: "Participante Activo",
    location: "Puno / Arequipa, Perú",
    date: "2024",
    description:
      "Conferencias magistrales sobre arquitecturas modernas de microservicios, bases de datos distribuidas y tendencias emergentes en Inteligencia Artificial aplicada.",
    image: "/programa.png",
    colSpan: "col-span-1 md:col-span-2",
    color: "from-blue-600/30 via-indigo-950 to-background",
  },
  {
    id: "02",
    title: "Hackathon de Innovación & Soluciones Regionales",
    category: "Hackathon",
    role: "Equipo Backend",
    location: "Puno, Perú",
    date: "2024",
    description:
      "Desarrollo intensivo de plataformas para automatización administrativa y trazabilidad de inventarios con Laravel y bases relacionales.",
    image: "/pro2.png",
    colSpan: "col-span-1 md:col-span-1",
    color: "from-orange-600/30 via-amber-950 to-background",
  },
  {
    id: "03",
    title: "Workshop: Machine Learning & Redes Neuronales",
    category: "Workshop",
    role: "Investigador & Tallerista",
    location: "UNA Puno",
    date: "2024",
    description:
      "Sesión práctica de entrenamiento y ajuste de un Perceptrón Multicapa (MLP) para clasificación de semillas y datos biológicos en Python.",
    colSpan: "col-span-1 md:col-span-1",
    color: "from-emerald-600/30 via-teal-950 to-background",
  },
  {
    id: "04",
    title: "Encuentro de Comunidades Tech & Open Source",
    category: "Comunidad",
    role: "Comunidad Dev",
    location: "Puno, Perú",
    date: "2023",
    description:
      "Networking y mesas redondas sobre flujos de trabajo profesionales con Git, automatización en entornos Linux y arquitectura de APIs REST limpias.",
    colSpan: "col-span-1 md:col-span-1",
    color: "from-purple-600/30 via-pink-950 to-background",
  },
  {
    id: "05",
    title: "Jornadas Académicas de Sistemas & Bases de Datos",
    category: "Congreso",
    role: "Estudiante UNA",
    location: "Univ. Nacional del Altiplano",
    date: "2023",
    description:
      "Capacitación especializada en modelado relacional de alta fidelidad, normalización, optimización de consultas SQL en PostgreSQL y consistencia ACID.",
    colSpan: "col-span-1 md:col-span-1",
    color: "from-cyan-600/30 via-blue-950 to-background",
  },
];

export function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // 1. Scroll Animations with GSAP ScrollTrigger
  useGSAP(
    () => {
      // Reveal header with subtle blur
      gsap.fromTo(
        ".events-header",
        { y: 50, opacity: 0, filter: "blur(10px)" },
        {
          scrollTrigger: {
            trigger: ".events-header",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
      );

      // Stagger reveal event cards with 3D feel
      gsap.fromTo(
        ".event-card",
        { y: 80, scale: 0.94, opacity: 0, filter: "blur(12px)" },
        {
          scrollTrigger: {
            trigger: ".events-grid",
            start: "top 82%",
          },
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
      );

      // Parallax scroll on card images
      const images = gsap.utils.toArray<HTMLElement>(".event-bg-image");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".event-card") || containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  // 2. Modal Open Animation with GSAP Timeline
  useGSAP(
    () => {
      if (!selectedEvent || !modalContainerRef.current) return;

      const tl = gsap.timeline();

      tl.fromTo(
        ".lightbox-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" },
      )
        .fromTo(
          ".lightbox-content",
          {
            scale: 0.86,
            y: 40,
            opacity: 0,
            filter: "blur(16px)",
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "<0.05",
        )
        .fromTo(
          ".lightbox-image-wrap img",
          { scale: 1.18, filter: "brightness(0.7)" },
          {
            scale: 1,
            filter: "brightness(1)",
            duration: 0.8,
            ease: "power3.out",
          },
          "<0.05",
        )
        .fromTo(
          ".modal-meta-item",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          ".modal-title",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          ".modal-desc",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.35",
        )
        .fromTo(
          ".modal-footer-info",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.25",
        )
        .fromTo(
          ".lightbox-close-btn",
          { scale: 0, rotation: -180, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.45, ease: "back.out(2)" },
          "-=0.4",
        );
    },
    { scope: modalContainerRef, dependencies: [selectedEvent] },
  );

  // Smooth Animated Close
  const closeModal = useCallback(() => {
    if (isClosing || !modalContainerRef.current) {
      setSelectedEvent(null);
      return;
    }

    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedEvent(null);
        setIsClosing(false);
      },
    });

    tl.to(".lightbox-content", {
      scale: 0.9,
      y: 25,
      opacity: 0,
      filter: "blur(12px)",
      duration: 0.25,
      ease: "power2.in",
    }).to(
      ".lightbox-backdrop",
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.15",
    );
  }, [isClosing]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (selectedEvent) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent, closeModal]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Congreso":
        return <Presentation className="w-3.5 h-3.5" />;
      case "Hackathon":
        return <Award className="w-3.5 h-3.5" />;
      case "Workshop":
        return <Sparkles className="w-3.5 h-3.5" />;
      case "Comunidad":
        return <Users className="w-3.5 h-3.5" />;
      default:
        return <Camera className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-onyx-950 text-foreground overflow-hidden section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] rounded-full bg-primary/5 blur-[160px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Clean Header */}
        <div className="mb-14 md:mb-20 events-header max-w-2xl">
          <div className="flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-primary mb-4">
            <Camera className="w-4 h-4" />
            <span>Comunidad, Ciencia & Tecnología</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tighter">
            Eventos & <span className="text-primary font-light">Trayectoria</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-4 font-light leading-relaxed">
            Fotografías y registros de mi participación activa en conferencias, hackathons, congresos universitarios y workshops técnicos.
          </p>
        </div>

        {/* Balanced Grid (Row 1: 2+1 = 3 cols; Row 2: 1+1+1 = 3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 events-grid">
          {EVENTS_DATA.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className={`event-card group relative rounded-3xl overflow-hidden border border-border bg-card/60 flex flex-col justify-between p-6 md:p-8 min-h-[360px] md:min-h-[380px] hover:border-primary/60 transition-all duration-500 cursor-pointer shadow-xl will-change-transform ${event.colSpan}`}
            >
              {/* Background with Full Image and Dedicated Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                {event.image ? (
                  <div className="relative w-full h-[115%] -top-[7.5%] event-bg-image">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/40 z-10"></div>
                  </div>
                ) : (
                  <>
                    <div className={`w-full h-full bg-gradient-to-br ${event.color}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
                  </>
                )}
              </div>

              {/* Top Header: Badge on the left, Date on the right (Clean flex flow, no overlapping) */}
              <div className="relative z-20 flex items-center justify-between gap-3 w-full">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-md">
                  {getCategoryIcon(event.category)}
                  {event.category}
                </span>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-md">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {event.date}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Bottom Body: Location, Title, Description, and Role footer */}
              <div className="relative z-20 flex flex-col gap-2 pt-12">
                <div className="flex items-center gap-1.5 text-xs font-mono text-primary">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{event.location}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h3>

                <p className="text-xs md:text-sm text-neutral-300 font-light line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                {event.role && (
                  <div className="mt-2 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400">
                    <span>
                      Rol: <strong className="text-white font-medium">{event.role}</strong>
                    </span>
                    <span className="text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ver foto →
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Scoped GSAP Animations */}
      {selectedEvent && (
        <div
          ref={modalContainerRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
        >
          {/* Animated Backdrop */}
          <div
            onClick={closeModal}
            className="lightbox-backdrop absolute inset-0 bg-black/85 backdrop-blur-2xl cursor-pointer"
          />

          {/* Animated Modal Card */}
          <div
            className="lightbox-content relative w-full max-w-4xl bg-card border border-border/80 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Cerrar modal"
              className="lightbox-close-btn absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all cursor-pointer shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header with reveal animation */}
            <div className="lightbox-image-wrap relative w-full h-[260px] md:h-[420px] shrink-0 bg-black overflow-hidden">
              {selectedEvent.image ? (
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${selectedEvent.color} flex flex-col items-center justify-center p-8 text-center`}
                >
                  <Camera className="w-16 h-16 text-primary mb-3 opacity-60" />
                  <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                    Registro Fotográfico · {selectedEvent.category}
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"></div>
            </div>

            {/* Modal Details with Staggered Entrance */}
            <div className="p-6 md:p-8 overflow-y-auto flex flex-col">
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-mono uppercase tracking-widest mb-3">
                <span className="modal-meta-item px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary">
                  {selectedEvent.category}
                </span>
                <span className="modal-meta-item flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" /> {selectedEvent.date}
                </span>
                <span className="modal-meta-item flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" /> {selectedEvent.location}
                </span>
              </div>

              <h2 className="modal-title text-2xl md:text-4xl font-heading font-bold text-foreground mb-4 leading-tight">
                {selectedEvent.title}
              </h2>

              <p className="modal-desc text-muted-foreground leading-relaxed font-light text-base md:text-lg mb-6">
                {selectedEvent.description}
              </p>

              {selectedEvent.role && (
                <div className="modal-footer-info pt-4 border-t border-border flex items-center justify-between text-xs md:text-sm font-mono text-muted-foreground">
                  <span>
                    Participación: <strong className="text-foreground">{selectedEvent.role}</strong>
                  </span>
                  <span className="text-primary font-medium">Carlos David Quispe Chata</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
