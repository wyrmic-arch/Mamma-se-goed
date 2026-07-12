'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SECTION_TYPES = [
  { type: 'hero', label: 'Hero', icon: '⌂' },
  { type: 'porchLight', label: 'Porch Banner', icon: '☽' },
  { type: 'story', label: 'Story', icon: '✎' },
  { type: 'gallery', label: 'Gallery', icon: '◻' },
  { type: 'values', label: 'Values', icon: '✦' },
  { type: 'musicSplit', label: 'Music Split', icon: '♫' },
  { type: 'musicFeature', label: 'Music Feature', icon: '♪' },
  { type: 'letters', label: 'Letters', icon: '✉' },
  { type: 'contact', label: 'Contact', icon: '☎' },
]

function getDefaultProps(type) {
  const defaults = {
    hero: { tagline: 'New headline here', subtitle: 'Subtitle text', backgroundImage: '' },
    porchLight: { quote: 'New quote', subtitle: 'Subtitle' },
    story: { title: 'Story Title', image: '', paragraphs: ['Paragraph one.'], signature: '' },
    gallery: { title: 'Gallery', subtitle: 'Subtitle', images: [] },
    values: { title: 'Values', subtitle: 'Subtitle', items: [{ icon: '✨', title: 'Value', description: 'Description' }] },
    musicSplit: { title: 'Section Title', image: '', paragraphs: ['Paragraph text.'], cta: 'Button' },
    musicFeature: { title: 'Feature Title', image: '', paragraphs: ['Paragraph text.'], cta: 'Button' },
    letters: { title: 'Letters', subtitle: 'Subtitle', items: [{ quote: '"Quote text"', author: '— Name' }] },
    contact: { title: 'Contact Title', subtitle: 'Subtitle text', backgroundImage: '' },
  }
  return defaults[type] || {}
}

function SortableSection({ section, selected, onSelect, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }
  const info = SECTION_TYPES.find(t => t.type === section.type)

  return (
    <div ref={setNodeRef} style={style} {...attributes}
      onClick={() => onSelect(section.id)}
      className={`admin-section-item ${selected === section.id ? 'selected' : ''}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', cursor: 'pointer', borderRadius: 4, background: selected === section.id ? '#E8E0D6' : 'transparent', transition: 'background 0.15s' }}>
        <span {...listeners} style={{ cursor: 'grab', fontSize: '1rem', color: '#B3A497', userSelect: 'none' }}>⠿</span>
        <span style={{ fontSize: '1rem' }}>{info?.icon || '◻'}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#4F4A48', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{info?.label || section.type}</div>
          <div style={{ fontSize: '0.72rem', color: '#B3A497' }}>#{section.order + 1}</div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(section.id) }}
          style={{ background: 'none', border: 'none', color: '#B68FA2', cursor: 'pointer', fontSize: '0.85rem', padding: 4, opacity: 0, transition: 'opacity 0.15s' }}
          className="delete-btn"
        >✕</button>
      </div>
    </div>
  )
}

function SectionPreview({ section }) {
  const p = section.props

  switch (section.type) {
    case 'hero':
      return (
        <div style={{ minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32, background: p.backgroundImage ? `url(${p.backgroundImage}) center/cover` : 'linear-gradient(135deg, #F8F4EC, #C9B8D8)', borderRadius: 2, position: 'relative' }}>
          {p.backgroundImage && <div style={{ position: 'absolute', inset: 0, background: 'rgba(248,244,236,0.6)' }} />}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#4F4A48', marginBottom: 8 }}>{p.tagline?.replace(/<[^>]*>/g, '') || 'Hero'}</div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', fontStyle: 'italic' }}>{p.subtitle}</div>
          </div>
        </div>
      )
    case 'porchLight':
      return (
        <div style={{ padding: 32, textAlign: 'center', background: '#4F4A48', borderRadius: 2 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#E8C26A', fontStyle: 'italic' }}>{p.quote}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(248,244,236,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{p.subtitle}</div>
        </div>
      )
    case 'story':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 24, background: '#F8F4EC', borderRadius: 2 }}>
          <div style={{ aspectRatio: '4/5', background: 'linear-gradient(135deg, #F1EBE0, #C9B8D8)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {p.image ? <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }} /> : <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#B3A497' }}>✦</span>}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#4F4A48', marginBottom: 8 }}>{p.title}</div>
            {p.paragraphs?.slice(0, 1).map((par, i) => <div key={i} style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', lineHeight: 1.6 }}>{par}</div>)}
          </div>
        </div>
      )
    case 'gallery':
      return (
        <div style={{ padding: 24, background: 'linear-gradient(180deg, #F8F4EC, #F1EBE0)', borderRadius: 2, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#4F4A48', marginBottom: 4 }}>{p.title}</div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.8rem', color: '#B3A497', fontStyle: 'italic', marginBottom: 16 }}>{p.subtitle}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ aspectRatio: '4/3', background: p.images?.[i]?.src ? `url(${p.images[i].src}) center/cover` : 'linear-gradient(135deg, #E8E0D6, #C9B8D8)', borderRadius: 2 }} />
            ))}
          </div>
        </div>
      )
    case 'values':
      return (
        <div style={{ padding: 24, background: '#F1EBE0', borderRadius: 2, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#4F4A48', marginBottom: 4 }}>{p.title}</div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.8rem', color: '#B3A497', fontStyle: 'italic' }}>{p.subtitle}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
            {p.items?.slice(0, 3).map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 12 }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#4F4A48' }}>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      )
    case 'musicSplit':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 24, background: '#F8F4EC', borderRadius: 2 }}>
          <div style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #C9B8D8, #AEBFA6)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {p.image ? <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }} /> : <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'rgba(79,74,72,0.3)' }}>♫</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#4F4A48', marginBottom: 8 }}>{p.title}</div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: '#B3A497', lineHeight: 1.6 }}>{p.paragraphs?.[0] || ''}</div>
            <div style={{ marginTop: 12, fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#B3A497', border: '1px solid #B3A497', display: 'inline-block', padding: '6px 16px', borderRadius: 2 }}>{p.cta}</div>
          </div>
        </div>
      )
    case 'musicFeature':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 24, background: '#4F4A48', borderRadius: 2, color: '#F8F4EC' }}>
          <div style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, #5A5452, #3A3533)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {p.image ? <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }} /> : <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'rgba(232,194,106,0.3)' }}>♪</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 8 }}>{p.title}</div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: 'rgba(248,244,236,0.7)', lineHeight: 1.6 }}>{p.paragraphs?.[0] || ''}</div>
            <div style={{ marginTop: 12, fontFamily: 'var(--font-body)', fontSize: '0.8rem', background: '#E8C26A', color: '#4F4A48', display: 'inline-block', padding: '6px 16px', borderRadius: 2 }}>{p.cta}</div>
          </div>
        </div>
      )
    case 'letters':
      return (
        <div style={{ padding: 24, background: 'linear-gradient(180deg, #F1EBE0, #F8F4EC)', borderRadius: 2, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#4F4A48', marginBottom: 4 }}>{p.title}</div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.8rem', color: '#B3A497', fontStyle: 'italic', marginBottom: 16 }}>{p.subtitle}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {p.items?.slice(0, 3).map((item, i) => (
              <div key={i} style={{ padding: 16, background: '#F8F4EC', border: '1px solid rgba(179,164,151,0.2)', borderRadius: 2 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontStyle: 'italic', color: '#4F4A48', lineHeight: 1.5 }}>{item.quote}</div>
                <div style={{ fontSize: '0.75rem', color: '#B3A497', marginTop: 8 }}>{item.author}</div>
              </div>
            ))}
          </div>
        </div>
      )
    case 'contact':
      return (
        <div style={{ padding: 40, background: p.backgroundImage ? `url(${p.backgroundImage}) center/cover` : '#4F4A48', borderRadius: 2, textAlign: 'center', position: 'relative' }}>
          {p.backgroundImage && <div style={{ position: 'absolute', inset: 0, background: 'rgba(79,74,72,0.7)' }} />}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#F8F4EC', marginBottom: 4 }}>{p.title}</div>
            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', color: 'rgba(248,244,236,0.7)', fontStyle: 'italic', marginBottom: 16 }}>{p.subtitle}</div>
            <div style={{ maxWidth: 300, margin: '0 auto', padding: '8px 16px', background: '#E8C26A', color: '#4F4A48', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>Join the Porch</div>
          </div>
        </div>
      )
    default:
      return <div style={{ padding: 24, background: '#F1EBE0', borderRadius: 2 }}>Unknown section: {section.type}</div>
  }
}

function AddSectionModal({ open, onClose, onAdd }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ background: '#F8F4EC', borderRadius: 2, padding: 32, maxWidth: 500, width: '90%', maxHeight: '80vh', overflow: 'auto', border: '1px solid rgba(179,164,151,0.2)' }} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#4F4A48', marginBottom: 20 }}>Add Section</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {SECTION_TYPES.map(t => (
            <button key={t.type} onClick={() => { onAdd(t.type); onClose() }}
              style={{ padding: 20, background: '#F1EBE0', border: '1px solid rgba(179,164,151,0.15)', borderRadius: 2, cursor: 'pointer', textAlign: 'center', transition: 'background 0.15s' }}
              onMouseOver={e => e.target.style.background = '#E8E0D6'} onMouseOut={e => e.target.style.background = '#F1EBE0'}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{t.icon}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#4F4A48', fontWeight: 500 }}>{t.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function MediaLibrary({ media, onInsert, onUpload }) {
  const fileInputRef = useRef(null)

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Media Library</span>
        <button onClick={() => fileInputRef.current?.click()}
          style={{ background: '#4F4A48', color: '#F8F4EC', border: 'none', padding: '4px 12px', borderRadius: 2, fontSize: '0.78rem', cursor: 'pointer' }}
        >+ Upload</button>
      </div>
      <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = '' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {media.map(m => (
          <div key={m.id} onClick={() => onInsert(m.url)}
            style={{ aspectRatio: '1', borderRadius: 2, overflow: 'hidden', cursor: 'pointer', border: '2px solid transparent', transition: 'border-color 0.15s' }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#4F4A48'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'transparent'}
          >
            <img src={m.url} alt={m.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function PropertiesPanel({ section, onUpdate }) {
  if (!section) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: '#B3A497', fontFamily: 'var(--font-editorial)', fontSize: '0.9rem', fontStyle: 'italic' }}>
        Select a section to edit
      </div>
    )
  }

  const p = section.props
  const update = (key, val) => onUpdate(section.id, { ...section.props, [key]: val })

  const renderField = (key, val, opts = {}) => {
    const label = opts.label || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
    if (opts.type === 'image') {
      return (
        <div key={key} style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
          <div style={{ aspectRatio: '16/9', borderRadius: 2, border: '2px dashed rgba(179,164,151,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: val ? `url(${val}) center/cover` : '#F1EBE0', position: 'relative' }}
            onDragOver={e => e.preventDefault()}
            onDrop={async (e) => {
              e.preventDefault()
              const file = e.dataTransfer.files?.[0]
              if (file) {
                const fd = new FormData()
                fd.append('file', file)
                const res = await fetch('/api/media', { method: 'POST', body: fd })
                const data = await res.json()
                if (data.url) update(key, data.url)
              }
            }}
          >
            {!val && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#B3A497' }}>Drop image here</span>}
            {val && <button onClick={() => update(key, '')} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', fontSize: '0.85rem' }}>✕</button>}
          </div>
        </div>
      )
    }
    if (opts.type === 'textarea') {
      return (
        <div key={key} style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
          <textarea value={val || ''} onChange={e => update(key, e.target.value)} rows={3}
            style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(179,164,151,0.3)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#4F4A48', background: '#fff', resize: 'vertical', outline: 'none' }}
          />
        </div>
      )
    }
    return (
      <div key={key} style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
        <input value={val || ''} onChange={e => update(key, e.target.value)}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(179,164,151,0.3)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#4F4A48', background: '#fff', outline: 'none' }}
        />
      </div>
    )
  }

  switch (section.type) {
    case 'hero':
      return (
        <div>
          {renderField('tagline', p.tagline, { type: 'textarea' })}
          {renderField('subtitle', p.subtitle, { type: 'textarea' })}
          {renderField('backgroundImage', p.backgroundImage, { type: 'image' })}
        </div>
      )
    case 'porchLight':
      return (
        <div>
          {renderField('quote', p.quote)}
          {renderField('subtitle', p.subtitle)}
        </div>
      )
    case 'story':
      return (
        <div>
          {renderField('title', p.title)}
          {renderField('image', p.image, { type: 'image' })}
          {p.paragraphs?.map((par, i) => renderField(`paragraphs[${i}]`, par, { label: `Paragraph ${i + 1}`, type: 'textarea' }))}
          {renderField('signature', p.signature)}
        </div>
      )
    case 'gallery':
      return (
        <div>
          {renderField('title', p.title)}
          {renderField('subtitle', p.subtitle, { type: 'textarea' })}
          <div style={{ marginTop: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Images</label>
            {p.images?.map((img, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 2, background: img.src ? `url(${img.src}) center/cover` : '#E8E0D6', flexShrink: 0 }} />
                <input value={img.src || ''} onChange={e => {
                  const imgs = [...(p.images || [])]
                  imgs[i] = { ...imgs[i], src: e.target.value }
                  update('images', imgs)
                }} placeholder="Image URL" style={{ flex: 1, padding: '6px 8px', border: '1px solid rgba(179,164,151,0.3)', borderRadius: 2, fontSize: '0.78rem', outline: 'none' }} />
                <button onClick={() => {
                  const imgs = p.images.filter((_, j) => j !== i)
                  update('images', imgs)
                }} style={{ background: 'none', border: 'none', color: '#B68FA2', cursor: 'pointer', fontSize: '0.85rem' }}>✕</button>
              </div>
            ))}
            <button onClick={() => update('images', [...(p.images || []), { src: '', caption: '', size: 'normal' }])}
              style={{ background: 'none', border: '1px dashed #B3A497', color: '#B3A497', padding: 8, cursor: 'pointer', width: '100%', borderRadius: 2, fontSize: '0.8rem' }}
            >+ Add Image</button>
          </div>
        </div>
      )
    case 'values':
      return (
        <div>
          {renderField('title', p.title)}
          {renderField('subtitle', p.subtitle, { type: 'textarea' })}
          <div style={{ marginTop: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Values</label>
            {p.items?.map((item, i) => (
              <div key={i} style={{ marginBottom: 8, padding: 8, border: '1px solid rgba(179,164,151,0.15)', borderRadius: 2, background: '#fff' }}>
                <input value={item.icon || ''} onChange={e => {
                  const items = [...(p.items || [])]
                  items[i] = { ...items[i], icon: e.target.value }
                  update('items', items)
                }} placeholder="Icon emoji" style={{ width: '100%', padding: '4px 8px', border: '1px solid rgba(179,164,151,0.3)', borderRadius: 2, fontSize: '0.78rem', marginBottom: 4, outline: 'none' }} />
                <input value={item.title || ''} onChange={e => {
                  const items = [...(p.items || [])]
                  items[i] = { ...items[i], title: e.target.value }
                  update('items', items)
                }} placeholder="Title" style={{ width: '100%', padding: '4px 8px', border: '1px solid rgba(179,164,151,0.3)', borderRadius: 2, fontSize: '0.78rem', marginBottom: 4, outline: 'none' }} />
                <textarea value={item.description || ''} onChange={e => {
                  const items = [...(p.items || [])]
                  items[i] = { ...items[i], description: e.target.value }
                  update('items', items)
                }} placeholder="Description" rows={2} style={{ width: '100%', padding: '4px 8px', border: '1px solid rgba(179,164,151,0.3)', borderRadius: 2, fontSize: '0.78rem', outline: 'none', resize: 'vertical' }} />
                <button onClick={() => update('items', p.items.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: '#B68FA2', cursor: 'pointer', fontSize: '0.75rem' }}>Remove</button>
              </div>
            ))}
            <button onClick={() => update('items', [...(p.items || []), { icon: '✨', title: 'New', description: '' }])}
              style={{ background: 'none', border: '1px dashed #B3A497', color: '#B3A497', padding: 8, cursor: 'pointer', width: '100%', borderRadius: 2, fontSize: '0.8rem' }}
            >+ Add Value</button>
          </div>
        </div>
      )
    case 'musicSplit':
    case 'musicFeature':
      return (
        <div>
          {renderField('title', p.title)}
          {renderField('image', p.image, { type: 'image', label: 'Image' })}
          {p.paragraphs?.map((par, i) => renderField(`paragraphs[${i}]`, par, { label: `Paragraph ${i + 1}`, type: 'textarea' }))}
          {renderField('cta', p.cta, { label: 'Button Text' })}
        </div>
      )
    case 'letters':
      return (
        <div>
          {renderField('title', p.title)}
          {renderField('subtitle', p.subtitle, { type: 'textarea' })}
          <div style={{ marginTop: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Testimonials</label>
            {p.items?.map((item, i) => (
              <div key={i} style={{ marginBottom: 8, padding: 8, border: '1px solid rgba(179,164,151,0.15)', borderRadius: 2, background: '#fff' }}>
                <textarea value={item.quote || ''} onChange={e => {
                  const items = [...(p.items || [])]
                  items[i] = { ...items[i], quote: e.target.value }
                  update('items', items)
                }} placeholder="Quote" rows={2} style={{ width: '100%', padding: '4px 8px', border: '1px solid rgba(179,164,151,0.3)', borderRadius: 2, fontSize: '0.78rem', marginBottom: 4, outline: 'none', resize: 'vertical' }} />
                <input value={item.author || ''} onChange={e => {
                  const items = [...(p.items || [])]
                  items[i] = { ...items[i], author: e.target.value }
                  update('items', items)
                }} placeholder="Author" style={{ width: '100%', padding: '4px 8px', border: '1px solid rgba(179,164,151,0.3)', borderRadius: 2, fontSize: '0.78rem', outline: 'none' }} />
                <button onClick={() => update('items', p.items.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: '#B68FA2', cursor: 'pointer', fontSize: '0.75rem' }}>Remove</button>
              </div>
            ))}
            <button onClick={() => update('items', [...(p.items || []), { quote: '"New quote"', author: '— Name' }])}
              style={{ background: 'none', border: '1px dashed #B3A497', color: '#B3A497', padding: 8, cursor: 'pointer', width: '100%', borderRadius: 2, fontSize: '0.8rem' }}
            >+ Add Testimonial</button>
          </div>
        </div>
      )
    case 'contact':
      return (
        <div>
          {renderField('title', p.title)}
          {renderField('subtitle', p.subtitle, { type: 'textarea' })}
          {renderField('backgroundImage', p.backgroundImage, { type: 'image' })}
        </div>
      )
    default:
      return <div style={{ color: '#B3A497', fontStyle: 'italic', fontSize: '0.85rem' }}>No editable properties</div>
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [sections, setSections] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [media, setMedia] = useState([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const authRes = await fetch('/api/auth/check')
        if (!authRes.ok) { router.push('/admin'); return }
        const [sectionsRes, mediaRes] = await Promise.all([
          fetch('/api/sections'),
          fetch('/api/media'),
        ])
        if (!mounted) return
        if (sectionsRes.ok) setSections(await sectionsRes.json())
        if (mediaRes.ok) setMedia(await mediaRes.json())
      } catch { router.push('/admin') }
    }
    load()
    return () => { mounted = false }
  }, [router])

  const selectedSection = sections.find(s => s.id === selectedId)

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      for (const section of sections) {
        await fetch(`/api/sections/${section.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: section.type, props: section.props, order: section.order, pageId: section.pageId }),
        })
      }
      setMessage('Saved!')
    } catch { setMessage('Error saving') }
    setSaving(false)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleReorder = async (newSections) => {
    const updated = newSections.map((s, i) => ({ ...s, order: i }))
    setSections(updated)
    try {
      await fetch('/api/sections/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updated.map(s => ({ id: s.id, order: s.order })) }),
      })
    } catch {}
  }

  const handleAddSection = async (type) => {
    try {
      const res = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, props: getDefaultProps(type) }),
      })
      if (res.ok) {
        const section = await res.json()
        setSections(prev => [...prev, section])
        setSelectedId(section.id)
      }
    } catch {}
  }

  const handleDeleteSection = async (id) => {
    try {
      await fetch(`/api/sections/${id}`, { method: 'DELETE' })
      setSections(prev => prev.filter(s => s.id !== id))
      if (selectedId === id) setSelectedId(null)
    } catch {}
  }

  const handleUpdateProps = async (id, props) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, props } : s))
  }

  const handleUpload = async (file) => {
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/media', { method: 'POST', body: fd })
      if (res.ok) {
        const item = await res.json()
        setMedia(prev => [item, ...prev])
      }
    } catch {}
  }

  const handleDragEnd = (event) => {
    setActiveId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sections.findIndex(s => s.id === active.id)
    const newIndex = sections.findIndex(s => s.id === over.id)
    handleReorder(arrayMove(sections, oldIndex, newIndex))
  }

  const handleInsertMedia = (url) => {
    if (!selectedSection) return
    const type = selectedSection.type
    if (type === 'hero') handleUpdateProps(selectedSection.id, { ...selectedSection.props, backgroundImage: url })
    else if (type === 'story') handleUpdateProps(selectedSection.id, { ...selectedSection.props, image: url })
    else if (type === 'musicSplit' || type === 'musicFeature') handleUpdateProps(selectedSection.id, { ...selectedSection.props, image: url })
    else if (type === 'contact') handleUpdateProps(selectedSection.id, { ...selectedSection.props, backgroundImage: url })
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F1EBE0', fontFamily: 'var(--font-body)' }}>
      {/* Top Bar */}
      <div style={{ background: '#4F4A48', color: '#F8F4EC', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300 }}>Ane Wilder</span>
          <span style={{ fontSize: '0.85rem', color: 'rgba(248,244,236,0.5)', fontFamily: 'var(--font-editorial)', fontStyle: 'italic' }}>Content Dashboard</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {message && <span style={{ fontSize: '0.85rem', color: message.includes('Error') ? '#B68FA2' : '#AEBFA6' }}>{message}</span>}
          <button onClick={handleSave} disabled={saving}
            style={{ background: '#E8C26A', color: '#4F4A48', padding: '8px 20px', borderRadius: 2, fontSize: '0.82rem', fontWeight: 500, border: 'none', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
          >{saving ? 'Saving...' : 'Save All'}</button>
          <a href="/" target="_blank" style={{ fontSize: '0.82rem', color: 'rgba(248,244,236,0.6)', textDecoration: 'underline' }}>View Site</a>
          <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(248,244,236,0.3)', color: 'rgba(248,244,236,0.6)', padding: '6px 12px', borderRadius: 2, fontSize: '0.78rem', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {/* Three-Panel Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div style={{ width: 260, flexShrink: 0, background: '#F8F4EC', borderRight: '1px solid rgba(179,164,151,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px 12px', borderBottom: '1px solid rgba(179,164,151,0.15)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sections</span>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
            <DndContext collisionDetection={closestCenter} onDragStart={e => setActiveId(e.active.id)} onDragEnd={handleDragEnd}>
              <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                {sections.map(s => (
                  <SortableSection key={s.id} section={s} selected={selectedId} onSelect={setSelectedId} onDelete={handleDeleteSection} />
                ))}
              </SortableContext>
              <DragOverlay>
                {activeId ? <div style={{ padding: '8px 12px', background: '#E8E0D6', borderRadius: 4, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#4F4A48' }}>Moving...</div> : null}
              </DragOverlay>
            </DndContext>
          </div>
          <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(179,164,151,0.15)' }}>
            <button onClick={() => setShowAddModal(true)}
              style={{ width: '100%', padding: '10px', background: '#4F4A48', color: '#F8F4EC', border: 'none', borderRadius: 2, fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer' }}
            >+ Add Section</button>
          </div>
          <div style={{ padding: '8px 12px 16px', overflow: 'auto' }}>
            <MediaLibrary media={media} onInsert={handleInsertMedia} onUpload={handleUpload} />
          </div>
        </div>

        {/* Center Canvas */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24, background: '#E8E0D6' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {sections.length === 0 && (
              <div style={{ textAlign: 'center', padding: 64, color: '#B3A497' }}>
                <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', fontStyle: 'italic', marginBottom: 16 }}>No sections yet. Add your first one!</p>
                <button onClick={() => setShowAddModal(true)} className="btn btn-primary">Add Section</button>
              </div>
            )}
            {sections.map(s => (
              <div key={s.id} onClick={() => setSelectedId(s.id)}
                style={{
                  cursor: 'pointer', marginBottom: 16, borderRadius: 4, overflow: 'hidden',
                  outline: selectedId === s.id ? '3px solid #4F4A48' : '1px solid rgba(179,164,151,0.2)',
                  outlineOffset: 2, transition: 'outline 0.15s',
                }}
              >
                <SectionPreview section={s} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Properties Panel */}
        <div style={{ width: 320, flexShrink: 0, background: '#F8F4EC', borderLeft: '1px solid rgba(179,164,151,0.2)', overflow: 'auto' }}>
          <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(179,164,151,0.15)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Properties</span>
            {selectedSection && <span style={{ fontSize: '0.75rem', color: '#B3A497', marginLeft: 8 }}>{SECTION_TYPES.find(t => t.type === selectedSection.type)?.label}</span>}
          </div>
          <div style={{ padding: 16 }}>
            <PropertiesPanel section={selectedSection} onUpdate={handleUpdateProps} />
          </div>
        </div>
      </div>

      {/* Add Section Modal */}
      <AddSectionModal open={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddSection} />

      <style>{`
        .admin-section-item:hover .delete-btn { opacity: 1 !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(179,164,151,0.3); border-radius: 3px; }
      `}</style>
    </div>
  )
}
