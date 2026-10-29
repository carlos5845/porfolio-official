import type { Metadata } from "next";
import { Righteous, Roboto_Flex } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const righteousSans = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto_Flex({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "Carlos David Quispe Chata | Software Developer · Backend & IA",
  description:
    "Portafolio profesional de Carlos David Quispe Chata. Estudiante de Ingeniería de Sistemas en la Universidad Nacional del Altiplano. Desarrollo de software, arquitectura backend, bases de datos y Machine Learning.",
  icons: {
    icon: "/logo_porfolio.jpg",
    shortcut: "/logo_porfolio.jpg",
    apple: "/logo_porfolio.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${righteousSans.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
