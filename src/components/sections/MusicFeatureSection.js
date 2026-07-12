'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MusicFeatureSection({ props }) {
  return (
    <section className="section" style={{ background: '#4F4A48', color: '#F8F4EC' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="music-feature-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {props.image ? (
              <img src={props.image} alt={props.title} style={{ borderRadius: 2, opacity: 0.9, width: '100%' }} />
            ) : (
              <div style={{
                aspectRatio: '4/3', borderRadius: 2,
                background: 'linear-gradient(135deg, #5A5452, #3A3533)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'rgba(232,194,106,0.3)' }}>♪</span>
              </div>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h2 className="section-title" style={{ color: '#F8F4EC' }}>{props.title}</h2>
            {props.paragraphs?.map((p, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: 'rgba(248,244,236,0.8)', lineHeight: 1.8, marginBottom: 20 }}>{p}</p>
            ))}
            {props.cta && <Link href="/contact" className="btn btn-gold" style={{ display: 'inline-block' }}>{props.cta}</Link>}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
