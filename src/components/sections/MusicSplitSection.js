'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MusicSplitSection({ props, index }) {
  const isEven = index % 2 === 0

  return (
    <section style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', minHeight: 420,
      background: isEven ? '#F8F4EC' : '#F1EBE0',
    }} className="music-split">
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{
          position: 'relative', overflow: 'hidden', minHeight: 420,
          order: isEven ? 0 : 1,
        }} className={`split-img ${isEven ? '' : 'order-2'}`}
      >
        {props.image ? (
          <img src={props.image} alt={props.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
        ) : (
          <div style={{
            width: '100%', height: '100%', position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #C9B8D8, #AEBFA6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'rgba(248,244,236,0.3)' }}>♫</span>
          </div>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 48px' }}
      >
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, color: '#4F4A48', marginBottom: 20 }}>{props.title}</h3>
        {props.paragraphs?.map((p, j) => (
          <p key={j} style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', color: '#B3A497', lineHeight: 1.8, marginBottom: 16 }}>{p}</p>
        ))}
        {props.cta && <Link href="/contact" className="btn btn-outline" style={{ marginTop: 16, alignSelf: 'flex-start' }}>{props.cta}</Link>}
      </motion.div>
      <style>{`
        @media (max-width: 768px) {
          .music-split { grid-template-columns: 1fr !important; }
          .split-img { min-height: 300px !important; position: relative !important; }
          .split-img img { position: relative !important; }
          .order-2 { order: 2 !important; }
        }
      `}</style>
    </section>
  )
}
