import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MediaRender from '../media/MediaRender';

const MESSAGES = [
  'She smiles and the world forgets its worries.',
  'Since you walked into my life, everything changed. ✨',
  'You are someone\'s answered prayer.',
  'I\'d choose you in every lifetime.',
  'The brightest star in my sky.',
  'Home is wherever you are.',
  'You make ordinary moments extraordinary.',
  'You are loved — completely, without condition.',
  'Every day with you is a gift.',
  'You are my favourite person. Always.',
];

export default function SecretSection() {
  const containerRef = useRef(null);
  const [activeMessage, setActiveMessage] = useState(null);

  const stars = useMemo(() =>
    Array.from({ length: 180 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      twinkle: i % 7 === 0,
    }))
  , []);

  const handleClick = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setActiveMessage({
      id: Date.now(),
      text: msg,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setActiveMessage(null), 3500);
  };

  return (
    <section
      ref={containerRef}
      onClick={handleClick}
      className="relative h-[50vh] overflow-hidden flex items-end justify-center pb-10 cursor-crosshair select-none"
      style={{ background: 'radial-gradient(ellipse at 50% 70%, #1A0E14 0%, #000 100%)' }}
    >
      {/* Ambient background memory loop (fills empty dark space with high-end feel) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07] mix-blend-lighten">
        <MediaRender
          src="/WhatsApp Image 2026-06-03 at 9.35.33 PM.jpeg"
          alt="Ambient memory background"
          className="w-full h-full object-cover scale-105 filter blur-[3px]"
        />
      </div>
      {/* Star field */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: 'white',
            opacity: s.opacity,
            boxShadow: s.twinkle ? '0 0 4px rgba(255,255,255,0.6)' : 'none',
            animation: s.twinkle ? `twinkle ${2 + Math.random() * 3}s ease-in-out infinite` : 'none',
          }}
        />
      ))}

      {/* Floating message */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            key={activeMessage.id}
            className="absolute z-50 pointer-events-none"
            style={{ left: activeMessage.x, top: activeMessage.y }}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -70, scale: 1 }}
            exit={{ opacity: 0, y: -140, scale: 0.9 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="px-5 py-3 rounded-full whitespace-nowrap"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <span className="font-handwritten text-base md:text-lg text-white/90">
                {activeMessage.text}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 font-detail text-[10px] uppercase tracking-[0.2em] text-white/20"
      >
        click anywhere
      </motion.p>
    </section>
  );
}
