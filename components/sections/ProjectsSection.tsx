import Image from "next/image";

type Proyects = {
    title: string,
    description: string,
    image: string,
    tecnologies: string[],
}
const proyectos: Proyects = {
    title: "CRISTIAN CABRO",
    description: "es un cabro",
    image: "/public/pro2.png",
    tecnologies: ["React", "Nextjs", "TailwindCSS"],
}

export function ProjectsSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-10">
            <h2 className="text-5xl font-heading">Proyectos</h2>
            <h3>
                {
                    proyectos.title
                }
            </h3>
            <Image src={proyectos.image} alt="imasd" width="100" height="100"/>
            <div className="w-[120%] bg-amber-500 -rotate-3 flex h-36 ">
                <span>carlos</span>
                <span>carlos</span>
                <span>carlos</span>
                <span>carlos</span>
            </div>
        </section>
    );
}
