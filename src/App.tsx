import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Lenis from 'lenis';

function App() {
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <CustomCursor />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div 
        className={`min-h-screen bg-black text-white transition-opacity duration-1000 ease-out ${
          loading ? 'opacity-0 fixed w-full' : 'opacity-100'
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

