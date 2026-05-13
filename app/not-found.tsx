import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background massive text */}
      <h1 className="absolute text-[clamp(10rem,30vw,25rem)] font-heading font-black text-foreground/5 leading-none select-none z-0">
        404
      </h1>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-8">
        <p className="text-sm md:text-base font-mono text-primary mb-4 tracking-[0.3em] uppercase">
          Ruta Desconocida
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 tracking-tighter">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground font-light max-w-md mx-auto mb-12 md:text-lg">
          La dimensión digital que buscas no existe o se encuentra actualmente
          en desarrollo.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-border bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary px-10 py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
