import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const heroImages = [
  "/WhatsApp Image 2026-06-03 at 9.35.31 PM.jpeg",
  "/WhatsApp Image 2026-06-03 at 9.35.33 PM.jpeg",
  "/WhatsApp Image 2026-06-03 at 9.35.36 PM.jpeg",
  "/WhatsApp Image 2026-06-03 at 9.35.37 PM.jpeg",
  "/WhatsApp Image 2026-06-03 at 9.35.39 PM.jpeg"
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Scroll tracking for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax the background image slightly slower than the scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Fade out elements as user scrolls down
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Slideshow timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center"
    >
      {/* ── Crossfading Background Slideshow ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImgIndex}
            src={heroImages[currentImgIndex]} 
            alt="Celebrating Us" 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </motion.div>

      {/* ── Darkening Overlay for Text Readability ── */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <div 
        className="absolute inset-x-0 bottom-0 h-1/2 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0D0A0B, transparent)' }}
      />

      {/* ── Center Liquid Glass Text ── */}
      <motion.div
        className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        style={{ opacity: opacityFade }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[95vw] sm:max-w-4xl px-4 sm:px-8 py-10 md:py-16 rounded-[2.5rem] sm:rounded-[3rem]"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.05)',
          }}
        >
          <h1 
            className="font-display font-black text-[7.5vw] sm:text-[52px] md:text-[68px] lg:text-[80px] leading-[1.1] tracking-tight drop-shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F5E6D3 40%, #F2C4CE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
          >
            A Gallery of U ❤️
          </h1>
          <p
            className="font-script text-3xl md:text-4xl mt-6 drop-shadow-[0_2px_20px_rgba(242,196,206,0.5)]"
            style={{ color: '#F2C4CE' }}
          >
            My Bbg
          </p>
        </motion.div>
      </motion.div>

      {/* ── Scroll Hint Arrow ── */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
        style={{ opacity: opacityFade }}
      >
        <motion.svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.5" className="text-white/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
