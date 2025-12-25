import React, { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Faster animation to match Visuvate's snappy feel
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Non-linear progress for a more organic feel
        const increment = Math.max(2, (100 - prev) / 10);
        return Math.min(prev + increment, 100);
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay before starting fade out
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        // Wait for fade out animation to finish before unmounting
        setTimeout(onComplete, 700); // 700ms matches the duration below
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Radial Gradient Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1d4ed8_0%,_transparent_50%)] opacity-20"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo / Icon */}
        <div className="mb-8 p-4 relative">
          <div className="w-16 h-16 border-2 border-white/20 transform rotate-45 flex items-center justify-center overflow-hidden backdrop-blur-sm">
            <div className="w-10 h-10 border border-white/40 transform -rotate-45 flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
          </div>
          {/* Glow effect behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/20 rounded-full blur-xl -z-10"></div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-gray-800 relative overflow-hidden rounded-full">
          {/* Progress Fill */}
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Percentage (Optional, kept minimal) */}
        <div className="mt-2 text-blue-500/80 text-xs font-mono tracking-widest">
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
