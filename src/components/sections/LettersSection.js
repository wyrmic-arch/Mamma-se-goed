'use client'

import { motion } from 'framer-motion'

export default function LettersSection({ props }) {
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, #F1EBE0 0%, #F8F4EC 100%)' }}>
      <div className="container">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-title center">{props.title}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-subtitle center">{props.subtitle}</motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginTop: 48 }} className="letters-grid">
          {props.items?.map((l, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{
                background: '#F8F4EC', padding: 32,
                border: '1px solid rgba(179,164,151,0.2)', borderRadius: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              className="letter-card"
            >
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontStyle: 'italic', color: '#4F4A48', lineHeight: 1.7, marginBottom: 20 }}>{l.quote}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#B3A497', letterSpacing: '0.05em' }}>{l.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .letter-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(79,74,72,0.08); }
      `}</style>
    </section>
  )
}
