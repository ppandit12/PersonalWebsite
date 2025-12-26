import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.p 
              className="text-3xl md:text-5xl font-light leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I am <span className="text-white font-bold">Pawan Kumar Pandit</span>.
            </motion.p>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
               A passionate full-stack developer specializing in building robust web applications. 
               My toolkit defines my craft: <span className="text-white">Node.js, Express, MongoDB, & React</span>.
            </motion.p>
          </div>
      </div>
    </section>
  );
};

export default About;
