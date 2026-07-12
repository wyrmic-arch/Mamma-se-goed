'use client'

import { motion } from 'framer-motion'

export default function PorchLightSection({ props }) {
  return (
    <section style={{ background: '#4F4A48', padding: '48px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: 2, background: 'linear-gradient(90deg, transparent, rgba(232,194,106,0.15), transparent)' }} />
      <div className="container">
        <motion.p initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 300, color: '#E8C26A', fontStyle: 'italic', letterSpacing: '0.02em' }}
        >{props.quote}</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: 'rgba(248,244,236,0.55)', marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >{props.subtitle}</motion.p>
      </div>
    </section>
  )
}
