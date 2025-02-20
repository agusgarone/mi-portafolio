"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import ExperienceCard from "./components/ExperienceCard";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  // Referencias para cada sección
  const sobreMiRef = useRef(null);
  const habilidadesRef = useRef(null);
  const proyectosRef = useRef(null);

  // Detectar cuándo una sección está visible
  const isSobreMiInView = useInView(sobreMiRef, { amount: 0.6 });
  const isHabilidadesInView = useInView(habilidadesRef, { amount: 0.6 });
  const isProyectosInView = useInView(proyectosRef, { amount: 0.6 });

  useEffect(() => {
    if (isSobreMiInView) setActiveSection("sobre-mi");
    else if (isHabilidadesInView) setActiveSection("habilidades");
    else if (isProyectosInView) setActiveSection("proyectos");
  }, [isSobreMiInView, isHabilidadesInView, isProyectosInView]);

  useEffect(() => {});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 64);
      mouseY.set(e.clientY - 64);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <motion.div
        className="fixed w-32 h-32 bg-green-400 rounded-full opacity-30 pointer-events-none filter blur-3xl"
        style={{ x: smoothX, y: smoothY }}
        animate={{ x: smoothX.get() - 64, y: smoothY.get() - 64 }}
      />
      <div className="w-1/2 h-screen flex flex-col justify-between items-center p-24">
        <section id="presentacion" className="flex flex-col gap-24">
          <div className="text-start">
            <h1 className="text-5xl font-bold text-green-400">
              Agustín Garone
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Desarrollador Frontend & Mobile | React.js | React Native
            </p>
          </div>
          <nav className="right-0 p-4 z-10">
            <ul className="flex justify-center text-lg flex-col gap-6">
              {["sobre-mi", "habilidades", "proyectos"].map((section) => (
                <li
                  key={section}
                  className="relative flex flex-row items-center"
                >
                  <motion.div
                    className="w-full h-[3px] bg-green-400 rounded-full"
                    layoutId="underline"
                    initial={{ width: "5%" }}
                    animate={{
                      width: activeSection === section ? "15%" : "5%",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <Link
                    href={`#${section}`}
                    className={`relative px-3 py-1 transition-all duration-300 ${
                      activeSection === section
                        ? "text-green-400 font-bold"
                        : "text-white"
                    }`}
                  >
                    {section.replace("-", " ").toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
        <section id="contacto" className="flex flex-row gap-6 justify-start">
          <p className="text-lg">🔹 github</p>
          <p className="text-lg">🔹 linkedin</p>
          <p className="text-lg">🔹 gmail</p>
        </section>
      </div>

      <div className="w-1/2 h-screen overflow-y-auto scroll-smooth pl-12">
        <section
          ref={sobreMiRef}
          id="sobre-mi"
          className="h-4/5 w-4/6 flex flex-col pt-24 mb-5"
        >
          <p className="text-lg">
            Soy un desarrollador apasionado por la creación de interfaces de
            usuario accesibles y perfectas en píxeles que combinan un diseño
            bien pensado con una ingeniería sólida. Mi trabajo favorito se
            encuentra en la intersección del diseño y el desarrollo, creando
            experiencias que no sólo se ven muy bien, sino que están
            meticulosamente construidas para el rendimiento y la usabilidad.
          </p>
          <br />
          <p className="text-lg">
            Actualmente, soy Ingeniero Semi Senior Front-End en Bewise.
            Contribuyo a la creación y mantenimiento de componentes de interfaz
            de usuario que potencian el front-end de los proyectos en los que
            participo, asegurando que cada aplicacion cumpla con los estándares
            de accesibilidad web y las mejores prácticas para ofrecer una
            experiencia de usuario inclusiva.
          </p>
          <br />
          <p className="text-lg">
            En mi tiempo libre, suelo estar corriendo, en gimnasio, jugando o
            mirando futbol apoyando a mi equipo Argentinos Juniors.
          </p>
        </section>
        <section
          ref={habilidadesRef}
          id="habilidades"
          className="h-3/5 flex flex-col items-start gap-8"
        >
          <ExperienceCard
            time="2021-presente"
            titleRole="Desarrollador Front-end en Bewise"
            descriptionRole="Explicación del puesto"
            technologies={["React.js", "React Native"]}
          />

          <ExperienceCard
            time="2021-presente"
            titleRole="Desarrollador Front-end en Bewise"
            descriptionRole="Explicación del puesto"
            technologies={["React.js", "React Native"]}
          />

          <Link
            href={`www.google.com`}
            className={
              "relative py-1 transition-all duration-300 font-bold text-white hover:text-green-400"
            }
          >
            Ver CV completo
          </Link>
        </section>
        <section
          ref={proyectosRef}
          id="proyectos"
          className="h-4/5 flex flex-col items-start gap-8"
        >
          <ProjectCard
            projectTitle="Cart Wise Shop"
            projectDescription="Aplicación mobile para crear tus listas de compras y nunca olvidarte de los productos faltantes en tu casa."
            technologies={["React Native", "Supabase"]}
          />
          <ProjectCard
            projectTitle="Cart Wise Shop"
            projectDescription="Aplicación mobile para crear tus listas de compras y nunca olvidarte de los productos faltantes en tu casa."
            technologies={["React Native", "Supabase"]}
          />
          <ProjectCard
            projectTitle="Cart Wise Shop"
            projectDescription="Aplicación mobile para crear tus listas de compras y nunca olvidarte de los productos faltantes en tu casa."
            technologies={["React Native", "Supabase"]}
          />
          <ProjectCard
            projectTitle="Cart Wise Shop"
            projectDescription="Aplicación mobile para crear tus listas de compras y nunca olvidarte de los productos faltantes en tu casa."
            technologies={["React Native", "Supabase"]}
          />
        </section>
      </div>
    </div>
  );
}
