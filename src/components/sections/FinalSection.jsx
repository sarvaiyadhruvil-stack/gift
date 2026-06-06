import React, { useRef, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import MediaRender from '../media/MediaRender';

// ─── Clip-reveal line animation ───────────────────────────────────────────────
function RevealLine({ children, delay = 0, className = '' }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.3, delay, ease: [0.76, 0, 0.24, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Particle burst (one-shot) ────────────────────────────────────────────────
function useParticles(count) {
  return useMemo(() => {
    const colors = ['#F2C4CE', '#D4C5E2', '#D4AF7A', '#FFF9F5'];
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const dist = Math.random() * 40 + 12;
      return {
        id: i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - Math.random() * 15,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 2,
      };
    });
  }, [count]);
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function FinalSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%' });
  const particles = useParticles(100);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const lines = [
    { text: 'I loved you', sub: 'yesterday.', delay: 0 },
    { text: 'I love you', sub: 'today.', delay: 0.4 },
    { text: "I'll love you", sub: 'tomorrow.', delay: 0.8 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0D0A0B, #050305)' }}
    >
      {/* ── Soft Background Memory Layer (Fills empty space beautifully) ── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] mix-blend-screen"
        style={{ y: backgroundY }}
      >
        <MediaRender
          src="/WhatsApp Image 2026-06-03 at 9.35.39 PM.jpeg"
          alt="Ambient closing background"
          className="w-full h-full object-cover scale-110 filter blur-[1px]"
        />
      </motion.div>

      {/* ── Particle Burst ── */}
      {isInView && (
        <div className="absolute top-1/2 left-1/2 pointer-events-none z-0" aria-hidden="true">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 8px ${p.color}`,
                top: -p.size / 2,
                left: -p.size / 2,
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0.9 }}
              animate={{ x: `${p.tx}vw`, y: `${p.ty}vh`, scale: 1, opacity: 0 }}
              transition={{ duration: p.duration, delay: 1.5 + p.delay, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      {/* ── Typography ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-8 md:gap-14 mb-20 md:mb-28">
        {lines.map(({ text, sub, delay }) => (
          <div key={text} className="leading-none">
            <RevealLine
              delay={delay}
              className="font-display italic font-light text-[48px] sm:text-[68px] md:text-[96px] lg:text-[112px] text-white leading-[1]"
            >
              {text}
            </RevealLine>
            <RevealLine
              delay={delay + 0.15}
              className="font-display italic font-light text-[34px] sm:text-[48px] md:text-[72px] lg:text-[88px] text-white/50 leading-[1] ml-6 md:ml-14"
            >
              {sub}
            </RevealLine>
          </div>
        ))}
      </div>

      {/* ── Birthday Text with heartbeat glow ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 2 }}
        className="relative z-10 mb-16 text-center"
      >
        <motion.h3
          className="font-script text-5xl md:text-7xl text-dusty-rose"
          animate={{
            textShadow: [
              '0 0 10px rgba(201,139,154,0.15)',
              '0 0 50px rgba(201,139,154,0.6)',
              '0 0 10px rgba(201,139,154,0.15)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          I Love You, My Bbg ❤️
        </motion.h3>
      </motion.div>

      {/* ── Closing whisper ── */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 2.8 }}
        className="relative z-10 font-handwritten text-2xl md:text-3xl text-white/40"
      >
        until the end of time.
      </motion.span>
    </section>
  );
}
