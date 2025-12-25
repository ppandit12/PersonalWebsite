import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const gradients = [
    "from-purple-900 to-blue-900",
    "from-emerald-900 to-teal-900",
    "from-red-900 to-orange-900",
    "from-gray-900 to-black"
  ];

  return (
    <section id="projects" className="py-32 bg-black relative min-h-screen text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 transition-opacity duration-700 pointer-events-none">
         <AnimatePresence mode="wait">
            {hoveredProject !== null && (
                <motion.div
                    key={hoveredProject}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[hoveredProject % gradients.length]}`}
                />
            )}
         </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-sm font-mono text-gray-400 mb-16 uppercase tracking-widest">Selected Works</h2>

        <div className="space-y-0">
          {projectsData.map((project, index) => (
            <div 
              key={index}
              className="group border-t border-white/10 py-12 transition-all duration-500 hover:bg-white/5 relative"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 px-4">
                <h3 className="text-4xl md:text-6xl font-display font-bold uppercase transition-transform duration-500 group-hover:translate-x-4">
                  {project.title}
                </h3>
                
                <div className="flex flex-col items-end opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="flex gap-2 mb-2">
                        {project.techStack.slice(0, 3).map(tech => (
                            <span key={tech} className="text-xs font-mono border border-white/20 px-2 py-1 rounded-full">{tech}</span>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm hover:underline">
                            View Site <ArrowUpRight size={16} />
                        </a>
                        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm hover:underline">
                            GitHub <ArrowUpRight size={16} />
                        </a>
                    </div>
                </div>
              </div>
              
              <div className="max-w-xl mt-4 px-4 md:pl-4 opacity-50 text-sm md:text-base hidden md:block">
                  {project.description}
              </div>
            </div>
          ))}
          <div className="border-t border-white/10"></div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
