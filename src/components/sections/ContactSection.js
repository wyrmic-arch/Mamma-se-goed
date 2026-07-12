'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactSection({ props }) {
  const [done, setDone] = useState(false)

  return (
    <section style={{
      position: 'relative', textAlign: 'center',
      background: props.backgroundImage ? `url(${props.backgroundImage}) center/cover no-repeat` : '#4F4A48',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: props.backgroundImage ? 'rgba(79,74,72,0.75)' : undefined,
      }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '96px 24px' }}>
        <div className="container">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-title" style={{ color: '#F8F4EC' }}>{props.title}</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ color: 'rgba(248,244,236,0.8)', marginBottom: 40, fontFamily: 'var(--font-editorial)', fontStyle: 'italic', maxWidth: 560, margin: '0 auto 40px' }}
          >{props.subtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <form onSubmit={async (e) => {
              e.preventDefault()
              const fd = new FormData(e.target)
              await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: fd.get('email'), name: fd.get('name') }),
              })
              setDone(true)
            }} style={{ maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input name="email" type="email" placeholder="Your email address" required style={{
                padding: '14px 20px', border: '1px solid rgba(248,244,236,0.3)',
                background: 'rgba(248,244,236,0.1)', color: '#F8F4EC',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                borderRadius: 2, outline: 'none', width: '100%',
              }} />
              <button type="submit" className="btn btn-gold" style={{ marginTop: 8 }}>
                {done ? 'Welcome home ✦' : 'Join the Porch'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
