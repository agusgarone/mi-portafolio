"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <motion.div
        className="fixed w-8 h-8 bg-green-400 rounded-full opacity-50 pointer-events-none"
        style={{ x: smoothX, y: smoothY }}
        animate={{ x: smoothX.get() - 16, y: smoothY.get() - 16 }}
      />
      <div className="w-1/2 h-screen flex flex-col justify-center items-center top-0">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-400">
            Hola, soy Agustín Garone
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Desarrollador Frontend & Mobile | React.js | React Native
          </p>
        </div>
        <nav className="right-0 p-4 z-10">
          <ul className="flex justify-center space-x-6 text-lg flex-col">
            <li>
              <Link href="#sobre-mi" className="hover:text-green-400">
                Sobre Mí
              </Link>
            </li>
            <li>
              <Link href="#habilidades" className="hover:text-green-400">
                Habilidades
              </Link>
            </li>
            <li>
              <Link href="#proyectos" className="hover:text-green-400">
                Proyectos
              </Link>
            </li>
            <li>
              <Link href="#contacto" className="hover:text-green-400">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="w-1/2 h-screen overflow-y-auto px-8 scroll-smooth">
        <section id="sobre-mi" className="h-screen flex items-center">
          <p className="text-lg">🔹 Sección 1: Algo sobre ti</p>
        </section>
        <section id="habilidades" className="h-screen flex items-center">
          <p className="text-lg">🔹 Sección 2: Tus habilidades</p>
        </section>
        <section id="proyectos" className="h-screen flex items-center">
          <p className="text-lg">🔹 Sección 3: Tus proyectos</p>
        </section>
        <section id="contacto" className="h-screen flex items-center">
          <p className="text-lg">🔹 Sección 4: Contacto</p>
        </section>
      </div>
    </div>
  );
}
