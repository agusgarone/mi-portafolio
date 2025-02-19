"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

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
          className="h-4/5 flex flex-col items-start"
        >
          <motion.div
            className="relative w-full max-w-lg flex flex-row p-4 border border-gray-700 bg-gray-800 rounded-lg shadow-md transition-all duration-300 gap-10"
            whileHover={{
              scale: 1.05, // Se agranda ligeramente
              boxShadow: "0px 10px 30px rgba(0, 255, 150, 0.2)", // Sombra verde
              borderColor: "#00ff96", // Borde verde
              backgroundColor: "#1f2937",
            }}
          >
            <div id="tiempo-del-puesto">
              <p className="tiempo">2021-presente</p>
            </div>
            <div
              id="informacion-sobre-el-puesto"
              className="flex flex-col gap-2"
            >
              <div id="puesto" className="titulo">
                <p>Desarrollador Front-end en Bewise</p>
              </div>
              <div id="explicacion-del-puesto" className="descripcion">
                <p>Explicacion del puesto</p>
              </div>
              <div id="stack-tecnologico-del-puesto">
                <p className="tecnologia">Tecnologias que se usan</p>
              </div>
            </div>
          </motion.div>
          {/* <div id="Card" className="w-full flex flex-row p-4 rounded-l gap-10"> */}
          {/* </div> */}
        </section>
        <section
          ref={proyectosRef}
          id="proyectos"
          className="h-4/5 w-4/6 flex items-center"
        >
          <p className="text-lg">🔹 Sección 3: Tus proyectos</p>
        </section>
      </div>
    </div>
  );
}
