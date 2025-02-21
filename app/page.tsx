"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import ExperienceCard from "./components/ExperienceCard";
import ProjectCard from "./components/ProjectCard";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Role } from "./models/role";
import { Project } from "./models/project";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const sobreMiRef = useRef(null);
  const habilidadesRef = useRef(null);
  const proyectosRef = useRef(null);

  const isSobreMiInView = useInView(sobreMiRef, { amount: 0.6 });
  const isHabilidadesInView = useInView(habilidadesRef, { amount: 0.6 });
  const isProyectosInView = useInView(proyectosRef, { amount: 0.6 });

  const [roles, setRoles] = useState<Role[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (isSobreMiInView) setActiveSection("sobre-mi");
    else if (isHabilidadesInView) setActiveSection("habilidades");
    else if (isProyectosInView) setActiveSection("proyectos");
  }, [isSobreMiInView, isHabilidadesInView, isProyectosInView]);

  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data));
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

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
                  className="relative flex flex-row items-center group"
                >
                  <motion.div
                    className="w-full h-[3px] bg-green-400 rounded-full"
                    layoutId="underline"
                    initial={{ width: "5%" }}
                    whileHover={{ width: "15%" }}
                    animate={{
                      width: activeSection === section ? "15%" : "5%",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <Link
                    href={`#${section}`}
                    className={`relative px-3 py-1 transition-all duration-300 group-hover:text-green-400 ${
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
          <a
            href="https://github.com/agusgarone"
            target="_blank"
            rel="noopener noreferrer"
            className="relative py-1 transition-all duration-300 font-bold text-white hover:text-green-400"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/agustin-garone/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative py-1 transition-all duration-300 font-bold text-white hover:text-green-400"
          >
            <Linkedin />
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative py-1 transition-all duration-300 font-bold text-white hover:text-green-400"
          >
            <Mail />
          </a>
        </section>
      </div>

      <div className="w-1/2 h-screen overflow-y-auto scroll-smooth pl-12">
        <section
          ref={sobreMiRef}
          id="sobre-mi"
          className="h-4/6 w-4/6 flex flex-col pt-24 mb-5"
        >
          <p className="text-lg">
            Soy un desarrollador apasionado por la creación de interfaces de
            usuario accesibles y perfectas en píxeles que combinan un diseño
            bien pensado con una ingeniería sólida. Mi trabajo favorito se
            encuentra en la combinacón del diseño y el desarrollo, creando
            experiencias que no sólo se ven muy bien, sino que están
            meticulosamente construidas para el rendimiento y la usabilidad.
          </p>
          <br />
          <p className="text-lg">
            Actualmente, soy Desarrollador Semi Senior Front-End en Bewise.
            Contribuyo a la creación y mantenimiento de componentes de interfaz
            de usuario que potencian el front-end de los proyectos en los que
            participo, asegurando que cada aplicacion cumpla con los estándares
            de accesibilidad web y las mejores prácticas para ofrecer una
            experiencia de usuario inclusiva.
          </p>
          <br />
          <p className="text-lg">
            En mi tiempo libre, suelo estar corriendo, en gimnasio, jugando o
            mirando a mi equipo{" "}
            <motion.span
              className="w-fit duration-200"
              whileHover={{ color: "red" }}
            >
              Argentinos Juniors.
            </motion.span>
          </p>
        </section>
        <section
          ref={habilidadesRef}
          id="habilidades"
          className="h-3/5 flex flex-col items-start gap-8 pt-20"
        >
          {roles.map((role, index) => (
            <ExperienceCard
              key={index}
              time={role.time}
              titleRole={role.titleRole}
              descriptionRole={role.descriptionRole}
              technologies={role.technologies}
            />
          ))}
          <Link
            href="/Agustin-ES.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group/link font-bold hover:text-green-400 flex"
          >
            Ver CV completo
            <span
              className="inline-block h-4 w-4 shrink-0 transition-transform 
                group-hover/link:-translate-y-1 group-hover/link:translate-x-1 
                group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 
                motion-reduce:transition-none ml-1 translate-y-px"
            >
              <ArrowUpRight />
            </span>
          </Link>
        </section>
        <section
          ref={proyectosRef}
          id="proyectos"
          className="h-5/6 flex flex-col items-start gap-8 pt-28"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              projectTitle={project.title}
              projectDescription={project.description}
              technologies={project.technologies}
              url={project.url}
              isInProgress={project.isInProgress}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
