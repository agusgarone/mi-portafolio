import { motion } from "framer-motion";
import { Loader } from "lucide-react";

type ProjectCardProps = {
  projectTitle: string;
  projectDescription: string;
  technologies: string[];
  url: string;
  isInProgress: boolean;
};

export default function ProjectCard({
  projectTitle,
  projectDescription,
  technologies,
  isInProgress,
  url,
}: ProjectCardProps) {
  return (
    <motion.div
      className="w-full lg:max-w-3xl flex p-4 border border-gray-700 bg-gray-800 rounded-lg shadow-md transition-all duration-300"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(0, 255, 150, 0.2)",
        borderColor: "#00ff96",
        backgroundColor: "#1f2937",
      }}
    >
      <div
        id="informacion-sobre-el-puesto"
        className="flex flex-col gap-2 w-full"
      >
        <div id="puesto" className="titulo flex flex-row justify-between">
          <a
            className="w-5/12"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {projectTitle}
          </a>
          {isInProgress && (
            <motion.div
              className="flex top-4 right-4 items-center gap-1 sm:gap-2 bg-green-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-full w-fit self-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.span
                className="text-xs sm:text-sm font-semibold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                En progreso
              </motion.span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </motion.div>
            </motion.div>
          )}
        </div>
        <div id="explicacion-del-puesto" className="descripcion">
          <p>{projectDescription}</p>
        </div>
        <div id="stack-tecnologico-del-puesto">
          <ul className="flex flex-row flex-wrap gap-2">
            {technologies.map((item) => (
              <li key={`${item}-${projectTitle}`}>
                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1">
                  <p className="tecnologia">{item}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
