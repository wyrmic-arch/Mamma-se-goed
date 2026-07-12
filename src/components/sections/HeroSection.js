'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection({ props }) {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {props.backgroundImage && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: `url(${props.backgroundImage}) center/cover no-repeat` }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg,rgba(248,244,236,0.55) 0%,rgba(248,244,236,0.7) 50%,rgba(248,244,236,0.92) 100%)' }} />
        </>
      )}
      {!props.backgroundImage && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(135deg, var(--cream) 0%, #f0e8d8 40%, var(--lavender) 100%)',
        }}>
          <div style={{ position: 'absolute', top: '15%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,184,216,0.3) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(174,191,166,0.2) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', top: '40%', right: '25%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,194,106,0.1) 0%, transparent 70%)' }} />
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, padding: '120px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: '#4F4A48', lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>Ane Wilder</h1>
          <p style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#8B6F47', fontStyle: 'italic', marginBottom: 24, letterSpacing: '0.02em' }}>Music & Stories</p>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 300, color: '#4F4A48', lineHeight: 1.4, marginBottom: 24, letterSpacing: '-0.01em' }}
          dangerouslySetInnerHTML={{ __html: props.tagline }}
        />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
          style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', color: '#B3A497', fontStyle: 'italic', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 40px' }}
        >{props.subtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/story" className="btn btn-outline">Read Her Story</Link>
          <Link href="/contact" className="btn btn-primary">Join the Porch</Link>
        </motion.div>
      </div>
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 1, fontSize: '0.75rem', color: '#B3A497', letterSpacing: '0.1em', textTransform: 'uppercase', animation: 'bounce 2s infinite' }}>Scroll ↓</div>
    </section>
  )
}
