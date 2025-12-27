```javascript
import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
      return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a0a0a]">
             {/* Static Optimized Gradient for Mobile to prevent lag/blinking */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-fuchsia-900/30 blur-3xl opacity-50" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.2),transparent_70%)]" />
        </div>
      );
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a0a0a]">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3], 
          x: [-20, 20, -20],
          y: [-20, 20, -20]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-purple-600 rounded-full blur-[100px] opacity-40 mix-blend-screen will-change-transform"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [30, -30, 30],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[20%] right-[-5%] w-[60vh] h-[60vh] bg-blue-600 rounded-full blur-[120px] opacity-30 mix-blend-screen will-change-transform"
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [-50, 50, -50],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[20%] w-[70vh] h-[70vh] bg-cyan-600 rounded-full blur-[100px] opacity-30 mix-blend-screen will-change-transform"
      />

       <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[10%] right-[10%] w-[40vh] h-[40vh] bg-fuchsia-600 rounded-full blur-[90px] opacity-30 mix-blend-screen will-change-transform"
      />
      

    </div>
  );
};

export default Background;
```
