'use client'

import { motion } from 'framer-motion'

export default function ValuesSection({ props }) {
  return (
    <section className="section" style={{ background: '#F1EBE0' }}>
      <div className="container">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-title center">{props.title}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-subtitle center">{props.subtitle}</motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginTop: 48 }} className="values-grid">
          {props.items?.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center', padding: '32px 20px' }}
            >
              <div style={{
                width: 64, height: 64, margin: '0 auto 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%', background: '#F8F4EC',
                fontSize: '1.8rem',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }} className="value-icon">{v.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, color: '#4F4A48', marginBottom: 12 }}>{v.title}</h3>
              <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.9rem', color: '#B3A497', lineHeight: 1.7 }}>{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .value-icon:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(79,74,72,0.1); }
      `}</style>
    </section>
  )
}
