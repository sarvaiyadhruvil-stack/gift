import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MediaRender from '../media/MediaRender';

// ─── Card data (front photo + back photo + text) ──────────────────────────────
const CARDS = [
  {
    id: 1,
    title: "What I love about you...",
    text: "The way your eyes light up when you talk about things you love. Your endless empathy. The beautiful mind behind that quiet smile.",
    frontPhoto: "/WhatsApp Image 2026-06-03 at 9.35.38 PM (2).jpeg",
    backPhoto:  "/WhatsApp Image 2026-06-03 at 9.35.38 PM (3).jpeg",
    accent: '#F2C4CE',
    glow: 'rgba(242,196,206,0.35)',
    rotation: -4,
    delay: 0.1,
    offset: 'md:-translate-y-8',
  },
  {
    id: 2,
    title: "My favourite memory...",
    text: "One of my favorite memories — when you asked me to come stand beside you instead of staying on the other side of the car. It was such a small moment, but it meant so much to me.",
    frontPhoto: "/WhatsApp Image 2026-06-03 at 9.35.38 PM.jpeg",
    backPhoto:  "/WhatsApp Image 2026-06-03 at 9.35.39 PM.jpeg",
    accent: '#D4C5E2',
    glow: 'rgba(212,197,226,0.35)',
    rotation: 3,
    delay: 0.25,
    offset: 'md:translate-y-6',
  },
  {
    id: 3,
    title: "A promise to you...",
    text: "I promise to choose you. Even on the hard days, even when we're stubborn. I promise to stand by you and build a beautiful future together. Always you.",
    frontPhoto: "/WhatsApp Image 2026-06-03 at 9.35.34 PM (1).jpeg",
    backPhoto:  "/WhatsApp Image 2026-06-03 at 9.35.36 PM.jpeg",
    accent: '#F5E6D3',
    glow: 'rgba(245,230,211,0.35)',
    rotation: -2,
    delay: 0.4,
    offset: 'md:-translate-y-3',
  },
];

// ─── Flip Card ────────────────────────────────────────────────────────────────
function FlipCard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className={`interactive cursor-pointer ${card.offset}`}
      style={{ perspective: 1400 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 1, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, zIndex: 30 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Gentle float */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5.5 + card.delay * 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Outer glow ring */}
        <div
          className="rounded-3xl p-[2px] transition-all duration-700"
          style={{
            background: isFlipped
              ? `linear-gradient(135deg, ${card.accent}55, ${card.accent}22)`
              : `linear-gradient(135deg, ${card.accent}33, transparent)`,
            boxShadow: isFlipped ? `0 0 40px ${card.glow}` : `0 20px 50px ${card.glow}`,
          }}
        >
          {/* Card body */}
          <motion.div
            style={{
              width: 270,
              height: 370,
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotateY: isFlipped ? 180 : 0, rotate: isFlipped ? 0 : card.rotation }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── FRONT: full photo + title overlay ── */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <MediaRender
                src={card.frontPhoto}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              {/* dark gradient from bottom */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }}
              />
              {/* Title + hint */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-center">
                <h4 className="font-heading text-lg text-white leading-snug drop-shadow-md mb-2">
                  {card.title}
                </h4>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="font-detail text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: card.accent }}
                >
                  tap to reveal ✨
                </motion.span>
              </div>
            </div>

            {/* ── BACK: photo top + text bottom ── */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: '#0D0A0B',
              }}
            >
              {/* Photo — top 52% */}
              <div className="relative flex-shrink-0" style={{ height: '52%' }}>
                <MediaRender
                  src={card.backPhoto}
                  alt={card.title + ' memory'}
                  className="w-full h-full object-cover"
                />
                {/* fade edge into dark */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, transparent, #0D0A0B)' }}
                />
              </div>

              {/* Text — bottom 48% */}
              <div
                className="flex-1 flex flex-col items-center justify-center px-5 py-4 text-center gap-2"
              >
                <span
                  className="font-detail text-[9px] uppercase tracking-[0.2em] mb-1"
                  style={{ color: card.accent, opacity: 0.7 }}
                >
                  {card.title}
                </span>
                <p className="font-handwritten font-bold text-[17px] leading-snug text-champagne">
                  {card.text}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function MinorLettersSection() {
  return (
    <section
      className="min-h-screen py-20 px-4 relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: '#0D0A0B' }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute top-1/3 left-1/4 pointer-events-none"
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(242,196,206,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 pointer-events-none"
        style={{
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(212,197,226,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />

      {/* Title */}
      <div className="overflow-hidden mb-16 md:mb-20 relative z-10">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="font-script text-5xl md:text-7xl text-dusty-rose drop-shadow-[0_0_25px_rgba(201,139,154,0.35)]"
        >
          little notes for you
        </motion.h2>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 relative z-10">
        {CARDS.map((card) => (
          <FlipCard key={card.id} card={card} />
        ))}
      </div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-16 font-detail text-[11px] uppercase tracking-[0.25em] text-white/20 relative z-10"
      >
        tap any card to flip it
      </motion.p>
    </section>
  );
}
