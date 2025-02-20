import { motion } from "framer-motion";

type ProjectCardProps = {
  projectTitle: string;
  projectDescription: string;
  technologies: string[];
};

export default function ProjectCard({
  projectTitle,
  projectDescription,
  technologies,
}: ProjectCardProps) {
  return (
    <motion.div
      className="relative w-full max-w-lg flex flex-row p-4 border border-gray-700 bg-gray-800 rounded-lg shadow-md transition-all duration-300 gap-10"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(0, 255, 150, 0.2)",
        borderColor: "#00ff96",
        backgroundColor: "#1f2937",
      }}
    >
      <div id="tiempo-del-puesto">
        <p className="tiempo">imagen</p>
        {/* <image /> */}
      </div>
      <div id="informacion-sobre-el-puesto" className="flex flex-col gap-2">
        <div id="puesto" className="titulo">
          <p>{projectTitle}</p>
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
