'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: '1px solid rgba(179,164,151,0.2)', borderRadius: 2, marginBottom: 16, background: '#F8F4EC' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#4F4A48', textAlign: 'left' }}>
        {title}
        <span style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
      </button>
      {open && <div style={{ padding: '20px', borderTop: '1px solid rgba(179,164,151,0.2)' }}>{children}</div>}
    </div>
  );
}

function Input({ label, value, onChange, multiline = false, small = false }) {
  const Component = multiline ? 'textarea' : 'input';
  const style = {
    width: '100%',
    padding: small ? '8px 12px' : '12px 16px',
    border: '1px solid rgba(179,164,151,0.3)',
    borderRadius: 2,
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: '#4F4A48',
    background: '#fff',
    outline: 'none',
    resize: multiline ? 'vertical' : 'none',
    minHeight: multiline ? 80 : 'auto',
    boxSizing: 'border-box',
  };
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={{ display: 'block', marginBottom: 4, fontSize: '0.82rem', fontWeight: 500, color: '#8B6F47', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</label>}
      <Component style={style} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => {
        if (r.status === 401) { router.push('/admin'); return null; }
        return r.json();
      })
      .then(d => { if (d) setContent(d); })
      .catch(() => router.push('/admin'));
  }, [router]);

  const updateContent = useCallback((section, updates) => {
    setContent(prev => ({ ...prev, [section]: { ...prev[section], ...updates } }));
  }, []);

  const updateArrayItem = useCallback((section, index, key, value) => {
    setContent(prev => {
      const items = [...prev[section]];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, [section]: items };
    });
  }, []);

  const updateMusicSection = useCallback((index, key, value) => {
    setContent(prev => {
      const sections = [...prev.music.sections];
      sections[index] = { ...sections[index], [key]: value };
      return { ...prev, music: { ...prev.music, sections } };
    });
  }, []);

  const updateMusicSectionParagraph = useCallback((secIdx, parIdx, value) => {
    setContent(prev => {
      const sections = [...prev.music.sections];
      const pars = [...sections[secIdx].paragraphs];
      pars[parIdx] = value;
      sections[secIdx] = { ...sections[secIdx], paragraphs: pars };
      return { ...prev, music: { ...prev.music, sections } };
    });
  }, []);

  const addArrayItem = useCallback((section, item) => {
    setContent(prev => ({ ...prev, [section]: [...prev[section], item] }));
  }, []);

  const removeArrayItem = useCallback((section, index) => {
    setContent(prev => {
      const items = prev[section].filter((_, i) => i !== index);
      return { ...prev, [section]: items };
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage('Content saved successfully!');
      } else {
        setMessage('Error saving content.');
      }
    } catch {
      setMessage('Error saving content.');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (!content) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1EBE0' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#B3A497' }}>Loading...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'values', label: 'Values' },
    { id: 'music', label: 'Music' },
    { id: 'letters', label: 'Letters' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F1EBE0', fontFamily: 'var(--font-body)' }}>
      {/* Admin Header */}
      <div style={{ background: '#4F4A48', color: '#F8F4EC', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="/ane-wilder-logo-clean.png" alt="Ane Wilder" style={{ height: 28, filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300 }}>Content Dashboard</h1>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {message && <span style={{ fontSize: '0.85rem', color: message.includes('success') ? '#AEBFA6' : '#B68FA2' }}>{message}</span>}
          <button onClick={handleSave} disabled={saving} className="btn" style={{ background: '#E8C26A', color: '#4F4A48', padding: '8px 20px', fontSize: '0.82rem', border: 'none', cursor: 'pointer' }}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
          <a href="/" target="_blank" style={{ fontSize: '0.82rem', color: 'rgba(248,244,236,0.6)', textDecoration: 'underline' }}>View Site</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid rgba(179,164,151,0.2)', paddingBottom: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '8px 20px',
              background: activeTab === t.id ? '#F8F4EC' : 'transparent',
              border: 'none',
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: activeTab === t.id ? 500 : 400,
              color: activeTab === t.id ? '#4F4A48' : '#B3A497',
              borderBottom: activeTab === t.id ? '2px solid #4F4A48' : '2px solid transparent',
              marginBottom: -1,
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div>
            <Section title="Hero Section" defaultOpen={true}>
              <Input label="Tagline (use <em> for italics)" value={content.hero.tagline} onChange={v => updateContent('hero', { tagline: v })} multiline />
              <Input label="Subtitle" value={content.hero.subtitle} onChange={v => updateContent('hero', { subtitle: v })} multiline />
              <Input label="Background Image Path" value={content.hero.backgroundImage} onChange={v => updateContent('hero', { backgroundImage: v })} small />
            </Section>

            <Section title="Porch Light Banner">
              <Input label="Quote" value={content.porchLight.quote} onChange={v => updateContent('porchLight', { quote: v })} />
              <Input label="Subtitle" value={content.porchLight.subtitle} onChange={v => updateContent('porchLight', { subtitle: v })} />
            </Section>

            <Section title="Music Feature Section">
              <Input label="Title" value={content.musicFeature.title} onChange={v => updateContent('musicFeature', { title: v })} />
              <Input label="Image Path" value={content.musicFeature.image} onChange={v => updateContent('musicFeature', { image: v })} small />
              {content.musicFeature.paragraphs.map((p, i) => (
                <Input key={i} label={`Paragraph ${i + 1}`} value={p} onChange={v => {
                  const pars = [...content.musicFeature.paragraphs];
                  pars[i] = v;
                  updateContent('musicFeature', { paragraphs: pars });
                }} multiline />
              ))}
              <Input label="CTA Button Text" value={content.musicFeature.cta} onChange={v => updateContent('musicFeature', { cta: v })} small />
            </Section>
          </div>
        )}

        {/* STORY TAB */}
        {activeTab === 'story' && (
          <Section title="Story Content" defaultOpen={true}>
            <Input label="Title" value={content.story.title} onChange={v => updateContent('story', { title: v })} />
            <Input label="Image Path" value={content.story.image} onChange={v => updateContent('story', { image: v })} small />
            {content.story.paragraphs.map((p, i) => (
              <Input key={i} label={`Paragraph ${i + 1}`} value={p} onChange={v => {
                const pars = [...content.story.paragraphs];
                pars[i] = v;
                updateContent('story', { paragraphs: pars });
              }} multiline />
            ))}
            <Input label="Signature" value={content.story.signature} onChange={v => updateContent('story', { signature: v })} />
          </Section>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <Section title="Gallery Content" defaultOpen={true}>
            <Input label="Title" value={content.gallery.title} onChange={v => updateContent('gallery', { title: v })} />
            <Input label="Subtitle" value={content.gallery.subtitle} onChange={v => updateContent('gallery', { subtitle: v })} multiline />
            <p style={{ fontSize: '0.85rem', color: '#B3A497', marginBottom: 12 }}>Images ({content.gallery.images.length})</p>
            {content.gallery.images.map((img, i) => (
              <div key={i} style={{ padding: 12, marginBottom: 8, border: '1px solid rgba(179,164,151,0.15)', borderRadius: 2, background: '#fff' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <Input label={`Image ${i + 1} Path`} value={img.src} onChange={v => updateArrayItem('gallery', i, 'src', v)} small />
                  <div style={{ minWidth: 100 }}>
                    <label style={{ display: 'block', marginBottom: 4, fontSize: '0.72rem', fontWeight: 500, color: '#8B6F47', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Size</label>
                    <select value={img.size} onChange={e => updateArrayItem('gallery', i, 'size', e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid rgba(179,164,151,0.3)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#4F4A48', background: '#fff' }}>
                      <option value="normal">Normal</option>
                      <option value="wide">Wide</option>
                      <option value="tall">Tall</option>
                    </select>
                  </div>
                </div>
                <Input label="Caption" value={img.caption} onChange={v => updateArrayItem('gallery', i, 'caption', v)} small />
                <button onClick={() => removeArrayItem('gallery', i)} style={{ background: 'none', border: 'none', color: '#B68FA2', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>Remove</button>
              </div>
            ))}
            <button onClick={() => addArrayItem('gallery', { src: '/uploads/', caption: 'New image', size: 'normal' })} style={{ background: 'none', border: '1px dashed #B3A497', color: '#B3A497', padding: '12px', cursor: 'pointer', width: '100%', borderRadius: 2, fontSize: '0.85rem' }}>
              + Add Image
            </button>
          </Section>
        )}

        {/* VALUES TAB */}
        {activeTab === 'values' && (
          <Section title="Values Content" defaultOpen={true}>
            <Input label="Title" value={content.values.title} onChange={v => updateContent('values', { title: v })} />
            <Input label="Subtitle" value={content.values.subtitle} onChange={v => updateContent('values', { subtitle: v })} multiline />
            {content.values.items.map((item, i) => (
              <div key={i} style={{ padding: 12, marginBottom: 8, border: '1px solid rgba(179,164,151,0.15)', borderRadius: 2, background: '#fff' }}>
                <Input label={`Value ${i + 1} Icon (emoji)`} value={item.icon} onChange={v => updateArrayItem('values', i, 'icon', v)} small />
                <Input label="Title" value={item.title} onChange={v => updateArrayItem('values', i, 'title', v)} small />
                <Input label="Description" value={item.description} onChange={v => updateArrayItem('values', i, 'description', v)} multiline />
                <button onClick={() => removeArrayItem('values', i)} style={{ background: 'none', border: 'none', color: '#B68FA2', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>Remove</button>
              </div>
            ))}
            <button onClick={() => addArrayItem('values', { icon: '✨', title: 'New Value', description: 'Description here.' })} style={{ background: 'none', border: '1px dashed #B3A497', color: '#B3A497', padding: '12px', cursor: 'pointer', width: '100%', borderRadius: 2, fontSize: '0.85rem' }}>
              + Add Value
            </button>
          </Section>
        )}

        {/* MUSIC TAB */}
        {activeTab === 'music' && (
          <div>
            <Section title="Music Feature (Dark Section)" defaultOpen={true}>
              <Input label="Title" value={content.musicFeature.title} onChange={v => updateContent('musicFeature', { title: v })} />
              <Input label="Image Path" value={content.musicFeature.image} onChange={v => updateContent('musicFeature', { image: v })} small />
              {content.musicFeature.paragraphs.map((p, i) => (
                <Input key={i} label={`Paragraph ${i + 1}`} value={p} onChange={v => {
                  const pars = [...content.musicFeature.paragraphs];
                  pars[i] = v;
                  updateContent('musicFeature', { paragraphs: pars });
                }} multiline />
              ))}
              <Input label="CTA Button Text" value={content.musicFeature.cta} onChange={v => updateContent('musicFeature', { cta: v })} small />
            </Section>

            {content.music.sections.map((sec, i) => (
              <Section key={i} title={`Split Section ${i + 1}: ${sec.title}`}>
                <Input label="Title" value={sec.title} onChange={v => updateMusicSection(i, 'title', v)} />
                <Input label="Image Path" value={sec.image} onChange={v => updateMusicSection(i, 'image', v)} small />
                <Input label="CTA Text" value={sec.cta} onChange={v => updateMusicSection(i, 'cta', v)} small />
                {sec.paragraphs.map((p, j) => (
                  <Input key={j} label={`Paragraph ${j + 1}`} value={p} onChange={v => updateMusicSectionParagraph(i, j, v)} multiline />
                ))}
              </Section>
            ))}
          </div>
        )}

        {/* LETTERS TAB */}
        {activeTab === 'letters' && (
          <Section title="Letters / Testimonials" defaultOpen={true}>
            <Input label="Title" value={content.letters.title} onChange={v => updateContent('letters', { title: v })} />
            <Input label="Subtitle" value={content.letters.subtitle} onChange={v => updateContent('letters', { subtitle: v })} multiline />
            {content.letters.items.map((item, i) => (
              <div key={i} style={{ padding: 12, marginBottom: 8, border: '1px solid rgba(179,164,151,0.15)', borderRadius: 2, background: '#fff' }}>
                <Input label={`Letter ${i + 1} Quote`} value={item.quote} onChange={v => updateArrayItem('letters', i, 'quote', v)} multiline />
                <Input label="Author" value={item.author} onChange={v => updateArrayItem('letters', i, 'author', v)} small />
                <button onClick={() => removeArrayItem('letters', i)} style={{ background: 'none', border: 'none', color: '#B68FA2', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>Remove</button>
              </div>
            ))}
            <button onClick={() => addArrayItem('letters', { quote: '"New testimonial quote."', author: '— Name, City' })} style={{ background: 'none', border: '1px dashed #B3A497', color: '#B3A497', padding: '12px', cursor: 'pointer', width: '100%', borderRadius: 2, fontSize: '0.85rem' }}>
              + Add Letter
            </button>
          </Section>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <Section title="Contact / Newsletter Section" defaultOpen={true}>
            <Input label="Title" value={content.contact.title} onChange={v => updateContent('contact', { title: v })} />
            <Input label="Subtitle" value={content.contact.subtitle} onChange={v => updateContent('contact', { subtitle: v })} multiline />
            <Input label="Background Image Path" value={content.contact.backgroundImage} onChange={v => updateContent('contact', { backgroundImage: v })} small />
          </Section>
        )}

        {/* Image Upload */}
        <Section title="Upload Image">
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.url) {
              alert(`Uploaded! Path: ${data.url}\nCopy this path to use in content fields.`);
            } else {
              alert('Upload failed.');
            }
          }} style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <input type="file" name="file" accept="image/*" required style={{ flex: 1, padding: '10px 0', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#4F4A48' }} />
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.82rem', border: 'none', cursor: 'pointer' }}>Upload</button>
          </form>
        </Section>
      </div>
    </div>
  );
}
