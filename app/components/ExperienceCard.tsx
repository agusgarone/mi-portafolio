import { motion } from "framer-motion";

type ExperienceCardProps = {
  time: string;
  titleRole: string;
  descriptionRole: string;
  technologies: string[];
};

export default function ExperienceCard({
  time,
  titleRole,
  descriptionRole,
  technologies,
}: ExperienceCardProps) {
  return (
    <motion.div
      className="sm:w-full lg:max-w-3xl flex flex-col lg:flex-row px-4 py-3 lg:py-4 border lg:items-start border-gray-700 bg-gray-800 rounded-lg shadow-md transition-all duration-300 gap-2 lg:gap-4"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(0, 255, 150, 0.2)",
        borderColor: "#00ff96",
        backgroundColor: "#1f2937",
      }}
    >
      <div id="tiempo-del-puesto" className="flex-1 self-center lg:self-start">
        <p className="tiempo">{time}</p>
      </div>
      <div
        id="informacion-sobre-el-puesto"
        className="flex flex-[4] flex-col gap-2"
      >
        <div id="puesto" className="titulo">
          <p>{titleRole}</p>
        </div>
        <div id="explicacion-del-puesto" className="descripcion">
          <p>{descriptionRole}</p>
        </div>
        <div id="stack-tecnologico-del-puesto">
          <ul className="flex flex-row flex-wrap gap-2">
            {technologies.map((item) => (
              <li key={`${item}-${titleRole}`}>
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
