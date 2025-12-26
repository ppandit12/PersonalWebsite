import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden text-white"
    >
      {/* Rotating Text Ring Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          className="w-[800px] h-[800px] opacity-[0.03] select-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text fontSize="14" fontWeight="bold" fill="currentColor">
              <textPath xlinkHref="#circle" spacing="auto">
                FULL-STACK DEVELOPER • MOBILE DEVELOPER • FULL-STACK DEVELOPER • MOBILE DEVELOPER •
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>

      <motion.div 
        className="relative z-10 text-center flex flex-col items-center"
        style={{ y, opacity }}
      >
        <motion.p 
          className="text-xl md:text-2xl font-medium text-gray-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hey, i'm <span className="font-bold text-white">Pawan</span>
        </motion.p>
        
        <motion.h1 
          className="text-[8vw] md:text-[6vw] leading-[1.1] font-display font-semibold tracking-tight max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Full-stack Developer &
          <br />
          <span className="text-gray-400">Mobile Developer.</span>
        </motion.h1>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-sm font-mono lowercase">scroll down</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
