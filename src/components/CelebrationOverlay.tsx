import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Star } from 'lucide-react';

const CelebrationOverlay = ({ onComplete }: { onComplete?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Trigger Santa & Confetti on mount
  useEffect(() => {
    // Initial Confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#ec4899', '#ffffff']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#ec4899', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Auto-dismiss after 6.5s (allow time for reading and santa)
    const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) setTimeout(onComplete, 1000);
    }, 6500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0f172a] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 opacity-90" />
            
            {/* Ambient Blobs */}
            {/* Ambient Blobs - Optimized for Mobile */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-purple-900/40 to-transparent blur-3xl" />
            
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-[100px] mix-blend-screen opacity-30" 
            />
            <motion.div 
                 animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="hidden md:block absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full blur-[120px] mix-blend-screen opacity-30" 
            />

            {/* Santa Fly-by Container */}
            <motion.div
                className="fixed z-[10] flex items-end text-6xl md:text-8xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] pointer-events-none"
                initial={{ x: "-100vw", y: "20vh", rotate: 5 }}
                animate={{ x: "120vw", y: "5vh", rotate: -5 }}
                transition={{ duration: 5, ease: "linear", delay: 0.5 }}
            >
                <div className="transform -scale-x-100 flex gap-4">
                     {/* Reindeers */}
                    <div className="flex gap-2">
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>🦌</motion.div>
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}>🦌</motion.div>
                    </div>
                    {/* Sleigh */}
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }} className="relative">
                        🛷
                         <div className="absolute -top-4 right-4 text-5xl animate-pulse">🎅</div>
                    </motion.div>
                </div>
            </motion.div>


            {/* Main Content */}
            <div className="relative z-20 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                        <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                        <span className="text-indigo-200 text-sm font-medium tracking-wide">Holiday Special</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white mb-6 leading-none">
                        Merry <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-red-400 text-glow">Christmas</span>
                    </h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-2xl md:text-4xl font-light text-indigo-100"
                    >
                        & Happy New Year 2026
                    </motion.p>
                </motion.div>
            </div>
            
            {/* Floating Decorative Cards */}
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block rotate-[-6deg]"
            >
                 <div className="flex items-center gap-3">
                    <div className="bg-pink-500/20 p-2 rounded-full"><Heart className="text-pink-500" size={20} fill="currentColor" /></div>
                    <span className="font-bold text-white">Full of Joy</span>
                </div>
            </motion.div>

             <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block rotate-[6deg]"
            >
                 <div className="flex items-center gap-3">
                    <div className="bg-yellow-500/20 p-2 rounded-full"><Star className="text-yellow-500" size={20} fill="currentColor" /></div>
                    <span className="font-bold text-white">New Beginnings</span>
                </div>
            </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationOverlay;
