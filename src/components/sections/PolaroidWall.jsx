import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MediaRender from '../media/MediaRender';

// ─── Photo data ───────────────────────────────────────────────────────────────
const photos = [
  { id: 1, img: '/WhatsApp Image 2026-06-03 at 9.35.36 PM (1).jpeg', cap: 'our little world',   rot: -6,  top: '10%', left: '8%',  delay: 0.1 },
  { id: 2, img: '/WhatsApp Image 2026-06-03 at 9.35.36 PM (2).jpeg', cap: 'that one time...',    rot:  4,  top: '18%', left: '55%', delay: 0.3 },
  { id: 3, img: '/WhatsApp Image 2026-06-03 at 9.35.34 PM.jpeg', cap: 'my favourite smile',  rot: -3,  top: '45%', left: '15%', delay: 0.5 },
  { id: 4, img: '/WhatsApp Image 2026-06-03 at 9.35.37 PM.jpeg', cap: 'always you',            rot:  7,  top: '55%', left: '60%', delay: 0.2 },
  { id: 5, img: '/WhatsApp Image 2026-06-03 at 9.35.38 PM (1).jpeg', cap: 'just us',             rot: -5,  top: '80%', left: '35%', delay: 0.4 },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function PolaroidWall() {
  const [secretFound, setSecretFound] = useState(false);

  return (
    <section className="relative w-full min-h-screen py-16 overflow-hidden" style={{ background: '#FAF7F2' }}>
      
      {/* Background texture (subtle grid or dots) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      {/* Header */}
      <div className="overflow-hidden mb-12 relative z-20">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="font-script text-5xl md:text-7xl text-dusty-rose text-center drop-shadow-sm"
        >
          moments I keep
        </motion.h2>
      </div>

      {/* ── Desktop Scattered Layout ── */}
      <div className="relative max-w-5xl mx-auto h-[900px] hidden md:block">
        {photos.map((p) => (
          <motion.div
            key={p.id}
            className="absolute z-10"
            style={{ top: p.top, left: p.left }}
            initial={{ opacity: 0, y: 50, rotate: p.rot - 15 }}
            whileInView={{ opacity: 1, y: 0, rotate: p.rot }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.2, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
            whileDrag={{ scale: 1.1, zIndex: 50, rotate: 0, cursor: 'grabbing' }}
          >
            {/* Gentle float */}
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6 + p.delay, repeat: Infinity, ease: 'easeInOut' }}>
              <div
                className="interactive cursor-grab bg-white p-4 pb-14 rounded-sm transition-shadow duration-300"
                style={{ boxShadow: '0 15px 40px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.05)' }}
              >
                <div className="w-[240px] h-[210px] overflow-hidden bg-gray-100 rounded-sm pointer-events-none">
                  <MediaRender src={p.img} alt={p.cap} className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 text-center pointer-events-none opacity-80">
                  <span className="font-handwritten text-2xl text-gray-700">{p.cap}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Hidden secret trigger */}
        <motion.div 
          className="absolute bottom-12 right-12 z-30 cursor-pointer interactive group"
          onClick={() => setSecretFound(true)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="font-detail text-[10px] uppercase tracking-widest text-deep-dark/20 group-hover:text-deep-dark/50 transition-colors">
            psst... click here ✨
          </span>
          <AnimatePresence>
            {secretFound && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -40, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute bottom-full right-0 whitespace-nowrap bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-pink-100"
              >
                <span className="font-handwritten text-lg text-wine">Found it 🌸 You're curious just like her.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Mobile Grid Layout ── */}
      <div className="md:hidden flex flex-col items-center gap-10 px-4 pt-4 pb-16">
        {photos.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[280px]"
          >
            <div
              className="bg-white p-4 pb-12 rounded-sm"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.05)', transform: `rotate(${p.rot}deg)` }}
            >
              <div className="w-full aspect-[4/3.5] overflow-hidden bg-gray-100 rounded-sm">
                <MediaRender src={p.img} alt={p.cap} className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 text-center opacity-80">
                <span className="font-handwritten text-2xl text-gray-700">{p.cap}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
