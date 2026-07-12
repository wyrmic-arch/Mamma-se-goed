'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function StorySection({ props }) {
  return (
    <section className="section" style={{ background: '#F8F4EC' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="story-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ position: 'relative' }}>
            {props.image ? (
              <>
                <img src={props.image} alt={props.title} style={{ borderRadius: 2, boxShadow: '0 8px 32px rgba(79,74,72,0.12)', width: '100%' }} />
                <div style={{ position: 'absolute', bottom: -16, right: -16, width: 120, height: 120, border: '2px solid #E8C26A', borderRadius: 2, zIndex: -1 }} />
              </>
            ) : (
              <div style={{
                aspectRatio: '4/5', borderRadius: 2, background: 'linear-gradient(135deg, #F1EBE0, #C9B8D8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(79,74,72,0.12)',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: '#B3A497', opacity: 0.5 }}>✦</span>
              </div>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h2 className="section-title">{props.title}</h2>
            {props.paragraphs?.map((p, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: '#4F4A48', lineHeight: 1.8, marginBottom: 20 }}>{p}</p>
            ))}
            {props.signature && (
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontStyle: 'italic', color: '#8B6F47', marginTop: 32 }}>{props.signature}</p>
            )}
            <Link href="/story" className="btn btn-outline" style={{ marginTop: 24, display: 'inline-block' }}>Read Full Story</Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
