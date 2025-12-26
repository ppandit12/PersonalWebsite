import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaJs, FaHtml5, FaCss3Alt, FaJava, FaPython, FaReact, 
  FaNodeJs, FaGitAlt, FaFigma, FaAndroid, FaApple 
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiExpress, SiRedis, SiPostgresql, 
  SiMongodb, SiPostman, SiExpo 
} from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";

// Icon Map
const iconMap: Record<string, React.ReactNode> = {
  // Languages
  "JavaScript": <FaJs className="text-yellow-400" />,
  "HTML": <FaHtml5 className="text-orange-500" />,
  "CSS": <FaCss3Alt className="text-blue-500" />,
  "Java": <FaJava className="text-red-500" />,
  "Python": <FaPython className="text-blue-400" />,
  "TypeScript": <SiTypescript className="text-blue-600" />,

  // Frameworks
  "Next.js": <SiNextdotjs className="text-black" />,
  "React.js": <FaReact className="text-cyan-400" />,
  "Express.js": <SiExpress className="text-gray-500" />,
  "Node.js": <FaNodeJs className="text-green-500" />,
  "React Native": <FaReact className="text-cyan-400" />,
  "Expo": <SiExpo className="text-black" />,

  // Databases
  "Redis": <SiRedis className="text-red-600" />,
  "PostgreSQL": <SiPostgresql className="text-blue-400" />,
  "MongoDB": <SiMongodb className="text-green-500" />,

  // Mobile
  "Android": <FaAndroid className="text-green-500" />,
  "iOS": <FaApple className="text-black" />,

  // Tools
  "Git": <FaGitAlt className="text-orange-600" />,
  "VS Code": <VscVscode className="text-blue-500" />,
  "Postman": <SiPostman className="text-orange-500" />,
  "Figma": <FaFigma className="text-pink-500" />
};

const experiences = [
  {
    company: 'Kyptronix LLP',
    role: 'MERN Stack Intern',
    location: 'Kolkata',
    period: 'Oct 2025 - Present',
    description: [
      'Building full-stack web applications using MongoDB, Express.js, React.js, and Node.js.',
      'Developed and integrated RESTful APIs with frontend components for seamless data flow.',
      'Implemented authentication and authorization using JWT and middleware in Express.js.'
    ]
  },
  {
    company: 'Codesoft Infotech',
    role: 'Frontend Developer Intern',
    location: 'Gujarat',
    period: 'Jan 2025 - June 2025',
    description: [
      'Developed user-friendly and responsive web applications using functional components.',
      'Collaborated with team members to design front-end features and optimize web performance.',
      'Worked on integrating APIs and managing state with React hooks.'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-32 text-white relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-display font-semibold leading-tight tracking-tight mb-8">
            Explore my journey <br className="hidden md:block" />
            <span className="text-gray-400">and the technologies that define my craft.</span>
          </h2>
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card group p-8 rounded-2xl grid md:grid-cols-[1fr_2fr] gap-8 transition-transform hover:-translate-y-1 duration-300"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full border border-gray-300 text-xs font-mono uppercase tracking-wider mb-4">
                  {exp.period}
                </span>
                <h3 className="text-2xl font-display font-medium">{exp.company}</h3>
                <p className="text-gray-500 font-mono text-sm mt-1">{exp.location}</p>
              </div>

              <div>
                <h4 className="text-xl md:text-2xl font-medium mb-6 flex items-center gap-2">
                  {exp.role}
                </h4>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-400 text-lg font-light leading-relaxed flex items-start">
                      <span className="mr-3 mt-2 block w-1.5 h-1.5 bg-gray-500 rounded-full shrink-0 group-hover:bg-white transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Section */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-24"
        >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-display font-semibold mb-12"
            >
              Technical Expertise
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                    { category: 'Programming Languages', items: ['JavaScript', 'HTML', 'CSS', 'Java', 'Python', 'TypeScript'] },
                    { category: 'Libraries/Frameworks', items: ['Next.js', 'React.js', 'Express.js'] },
                    { category: 'Databases', items: ['Redis', 'PostgreSQL', 'MongoDB'] },
                    { category: 'Mobile Development', items: ['React Native', 'Expo', 'Android', 'iOS'] },
                    { category: 'Tools / Platforms', items: ['Git', 'VS Code', 'Postman', 'Figma'] }
                ].map((skillSet, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                        <h4 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">
                          {skillSet.category}
                        </h4>
                        
                        <div className="flex flex-wrap gap-4">
                            {skillSet.items.map((skill, skillIdx) => (
                              <motion.div 
                                key={skill} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: (idx * 0.1) + (skillIdx * 0.05) }}
                                className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/5 transition-colors cursor-default"
                                whileHover={{ scale: 1.05, y: -2, borderColor: '#fff' }}
                              >
                                <span className="text-lg">{iconMap[skill]}</span>
                                <span className="text-sm font-medium text-white/80">{skill}</span>
                              </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Experience;
