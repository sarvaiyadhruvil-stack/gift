import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { letterContent } from '../../data/letter';
import Typewriter from '../animations/Typewriter';
import MediaRender from '../media/MediaRender';

// ─── Scattered Background Memories ───────────────────────────────────────────
const scatteredMemories = [
  { id: 1, src: "/WhatsApp Image 2026-06-03 at 9.35.38 PM (1).jpeg", rotation: -12, top: "15%", left: "10%", delay: 0.2 },
  { id: 2, src: "/WhatsApp Image 2026-06-03 at 9.35.38 PM (2).jpeg", rotation: 15, top: "20%", right: "8%", delay: 0.4 },
  { id: 3, src: "/WhatsApp Image 2026-06-03 at 9.35.38 PM (3).jpeg", rotation: -8, bottom: "18%", left: "12%", delay: 0.6 },
  { id: 4, src: "/WhatsApp Image 2026-06-03 at 9.35.38 PM.jpeg", rotation: 10, bottom: "15%", right: "10%", delay: 0.3 },
];

// ─── Envelope ─────────────────────────────────────────────────────────────────
function Envelope({ onClick }) {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer interactive group"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Title */}
      <div className="overflow-hidden mb-12">
        <motion.h3
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="font-handwritten text-3xl md:text-5xl text-champagne text-center"
        >
          I wrote you something...
        </motion.h3>
      </div>

      {/* Envelope body */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative w-[260px] h-[175px] md:w-[360px] md:h-[240px]"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Glow on hover */}
          <div
            className="absolute -inset-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,175,122,0.15) 0%, transparent 70%)' }}
          />

          {/* Envelope layers */}
          <div className="absolute inset-0 rounded-lg" style={{ background: '#DCC9A8', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }} />
          <div className="absolute inset-0 rounded-lg z-10" style={{ background: '#D4BA96', clipPath: 'polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)' }} />
          <div className="absolute inset-0 rounded-b-lg z-20" style={{ background: '#C9AA82', clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }} />
          <div className="absolute top-0 left-0 right-0 z-30 rounded-t-lg" style={{ height: '52%', background: '#E8D5B0', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />

          {/* Wax seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2"
              style={{ background: '#7A3B4B', borderColor: '#5A2030', boxShadow: '0 4px 20px rgba(122,59,75,0.4)' }}
            >
              <span className="text-champagne text-lg">❤</span>
            </div>
          </div>

          {/* Hint */}
          <motion.span
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-detail text-[10px] tracking-[0.2em] uppercase text-champagne/40"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            click to open
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Letter ───────────────────────────────────────────────────────────────────
function Letter({ showContent }) {
  return (
    <motion.div
      key="letter"
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden relative"
      style={{
        padding: '44px 36px',
        background: 'rgba(20, 10, 18, 0.75)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(242, 196, 206, 0.15)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {showContent && (
        <div className="font-handwritten font-bold text-xl md:text-2xl leading-[1.8] text-champagne drop-shadow-[0_2px_10px_rgba(245,230,211,0.2)]">
          <Typewriter textArray={letterContent} speed={50} />

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: letterContent.join(' ').split(' ').length * 0.05 + 1.5, duration: 1.5 }}
            className="mt-14 flex items-center justify-end gap-3"
          >
            <span className="font-script text-4xl md:text-5xl text-blush drop-shadow-[0_2px_15px_rgba(242,196,206,0.4)]">
              Dhruvil
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blush/90">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => setShowContent(true), 1300);
  };

  return (
    <section
      className="min-h-screen py-16 px-4 md:px-8 relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#12080F' }}
    >
      {/* Candlelight glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(ellipse, rgba(212,175,122,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Scattered background polaroids that fade out when letter is opened */}
      <AnimatePresence>
        {!isOpen && scatteredMemories.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.8, rotate: m.rotation - 10 }}
            animate={{ opacity: 0.45, scale: 1, rotate: m.rotation }}
            exit={{ opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.6 } }}
            transition={{ duration: 1.2, delay: m.delay, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ opacity: 0.85, scale: 1.08, zIndex: 10, rotate: m.rotation > 0 ? 3 : -3 }}
            className="absolute z-0 hidden md:block bg-white p-2 pb-6 shadow-xl w-36 pointer-events-auto cursor-pointer"
            style={{
              top: m.top,
              left: m.left,
              right: m.right,
              bottom: m.bottom,
            }}
          >
            <div className="w-full aspect-square overflow-hidden bg-gray-100">
              <MediaRender src={m.src} alt="Scrapbook Memory" className="w-full h-full object-cover" />
            </div>
            <div className="mt-2 text-center">
              <span className="font-handwritten text-xs text-gray-600">us ❤️</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div key="envelope" exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <Envelope onClick={handleOpen} />
            </motion.div>
          ) : (
            <Letter key="letter" showContent={showContent} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
