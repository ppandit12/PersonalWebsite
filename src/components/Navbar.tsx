import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
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

      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-8 text-sm font-mono uppercase tracking-widest">
            <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
            <a href="#experience" className="hover:opacity-50 transition-opacity">Journey</a>
            <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>

        <button 
            onClick={onOpenTerminal}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 transition-all group"
        >
            <Terminal size={18} className="text-green-400 group-hover:text-green-300" />
            <span className="hidden md:inline text-xs font-mono font-bold uppercase tracking-widest text-green-400 group-hover:text-green-300">Playground</span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
