'use client'

import { motion } from 'framer-motion'

function GalleryImage({ src, caption, size, index }) {
  const sizes = {
    normal: { aspectRatio: '4/3' },
    wide: { gridColumn: 'span 2', aspectRatio: '16/9' },
    tall: { gridRow: 'span 2', aspectRatio: '3/4' },
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: 2, cursor: 'pointer', ...(sizes[size] || sizes.normal) }}
    >
      {src ? (
        <img src={src} alt={caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} className="gallery-img" />
      ) : (
        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #F1EBE0, #C9B8D8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', fontStyle: 'italic' }}>Drop image here</span>
        </div>
      )}
      {caption && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px',
          background: 'linear-gradient(0deg, rgba(79,74,72,0.85) 0%, transparent 100%)',
          color: '#F8F4EC', fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', fontStyle: 'italic',
          opacity: 0, transition: 'opacity 0.3s',
        }} className="gallery-caption">{caption}</div>
      )}
    </motion.div>
  )
}

export default function GallerySection({ props }) {
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, #F8F4EC 0%, #F1EBE0 100%)' }}>
      <div className="container">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-title center">{props.title}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-subtitle center">{props.subtitle}</motion.p>
        {props.images?.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 48 }} className="gallery-grid">
            {props.images.map((img, i) => (
              <GalleryImage key={i} src={img.src} caption={img.caption} size={img.size} index={i} />
            ))}
          </div>
        )}
      </div>
      <style>{`
        .gallery-img:hover { transform: scale(1.05) !important; }
        div:hover > .gallery-caption { opacity: 1 !important; }
        @media (max-width: 768px) { .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .gallery-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
