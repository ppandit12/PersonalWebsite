import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <a href="#" className="text-xl font-bold font-display tracking-tighter uppercase">
        Pawan Pandit
      </a>

      <div className="hidden md:flex gap-8 text-sm font-mono uppercase tracking-widest">
        <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
        <a href="#experience" className="hover:opacity-50 transition-opacity">Journey</a>
        <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
      </div>


    </motion.nav>
  );
};

export default Navbar;
