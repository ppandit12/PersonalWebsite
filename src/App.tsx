import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';

import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Lenis from 'lenis';

import Background from './components/Background';
import { Analytics } from "@vercel/analytics/react"
import Playground from './components/Playground';
import CelebrationOverlay from './components/CelebrationOverlay';

function App() {
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setShowCelebration(true);
  };

  return (
    <>
      <CustomCursor />
      <Background />
      <Playground isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      
      <AnimatePresence>
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
        {showCelebration && <CelebrationOverlay onComplete={() => setShowCelebration(false)} />}
      </AnimatePresence>
      
      <div 
        className={`min-h-screen text-white transition-opacity duration-1000 ease-out ${
          (loading || showCelebration) ? 'opacity-0 fixed w-full' : 'opacity-100'
        }`}
      >
        <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
        <main>
          <Hero />
          <About />
          <Experience />
        </main>
        <Footer />
      </div>
      <Analytics />
    </>
  );
}

export default App;

