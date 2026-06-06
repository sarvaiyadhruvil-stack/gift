import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaRender from '../media/MediaRender';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated Counter ─────────────────────────────────────────────────────────
function StatCard({ value, label, delay, icon }) {
  const ref = useRef(null);
  const [count, setCount] = useState(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value !== 'number') return;
    const trig = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ v: 0 }, {
          v: value,
          duration: 2.5,
          ease: 'power3.out',
          onUpdate() { setCount(Math.round(this.targets()[0].v)); },
        });
      },
    });
    return () => trig.kill();
  }, [value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center justify-center gap-3 p-10 rounded-3xl w-full md:w-64 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(242,196,206,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(242,196,206,0.15) 0%, transparent 70%)' }} />
      
      <span className="text-3xl mb-1">{icon}</span>
      <span className="font-display text-6xl md:text-7xl text-wine leading-none tabular-nums">
        {count}
      </span>
      <span className="font-detail uppercase tracking-[0.2em] text-[11px] text-deep-dark/50">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function IntroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });
  // Parallax the blush orb
  const orbY = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 px-4 md:px-8 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0D0A0B 0%, #FAF7F2 15%, #FAF7F2 100%)' }}
    >
      {/* Floating orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          y: orbY,
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(242,196,206,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Title */}
      <div className="overflow-hidden mb-12 relative z-10">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="font-script text-5xl md:text-7xl text-dusty-rose drop-shadow-[0_0_20px_rgba(201,139,154,0.25)]"
        >
          A collection of beautiful moments...
        </motion.h2>
      </div>

      {/* Stats */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-12 w-full max-w-3xl justify-center relative z-10">
        <StatCard value="100%" label="Smile"    delay={0.1}  icon="✨" />
        <StatCard value="∞"    label="Memories" delay={0.25} icon="💖" />
        <StatCard value={1}    label="You"      delay={0.4}  icon="❤️" />
      </div>

      {/* ── Visual Media Collage (Fills Empty Space beautifully) ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-12 px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Left Image - tilted slightly left */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, rotate: -1, zIndex: 20 }}
          className="group relative w-full max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl interactive cursor-pointer"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(242, 196, 206, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <MediaRender
            src="/WhatsApp Image 2026-06-03 at 9.35.31 PM.jpeg"
            alt="Beautiful moment"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Center Image Card - taller, upright, glowing */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, zIndex: 20 }}
          className="group relative w-full max-w-[310px] aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(242,196,206,0.15)] md:-translate-y-6 interactive cursor-pointer"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '2px solid rgba(242, 196, 206, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <MediaRender
            src="/WhatsApp Image 2026-06-03 at 9.35.33 PM.jpeg"
            alt="Beautiful image"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-0 right-0 text-center z-20 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span className="font-detail text-[9px] uppercase tracking-[0.25em] text-white/80 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              laughter and light ✨
            </span>
          </div>
        </motion.div>

        {/* Right Image - tilted slightly right */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, rotate: 1, zIndex: 20 }}
          className="group relative w-full max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl interactive cursor-pointer"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(242, 196, 206, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <MediaRender
            src="/WhatsApp Image 2026-06-03 at 9.35.34 PM.jpeg"
            alt="Precious moment"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>
      </div>

      {/* Quote */}
      <div className="overflow-hidden relative z-10">
        <motion.p
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="font-heading italic text-2xl md:text-3xl text-deep-dark/65 max-w-xl leading-relaxed"
        >
          "...of choosing you, every single day."
        </motion.p>
      </div>
    </section>
  );
}
