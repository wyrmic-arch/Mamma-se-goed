import { getContent } from '@/lib/data';

export default function GalleryPage() {
  const c = getContent();
  if (!c) return <div className="section"><div className="container"><p>Content not found.</p></div></div>;

  const sizeClass = (size) => {
    if (size === 'wide') return { gridColumn: 'span 2', aspectRatio: '16/9' };
    if (size === 'tall') return { gridRow: 'span 2', aspectRatio: '3/4' };
    return { aspectRatio: '4/3' };
  };

  return (
    <>
      <section className="section" style={{ paddingTop: 160, background: 'linear-gradient(180deg,#F8F4EC 0%,#F1EBE0 100%)' }}>
        <div className="container">
          <h1 className="section-title center">{c.gallery.title}</h1>
          <p className="section-subtitle center">{c.gallery.subtitle}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 48 }}>
            {c.gallery.images.map((img, i) => (
              <div key={i} style={{ position: 'relative', overflow: 'hidden', borderRadius: 2, cursor: 'pointer', ...sizeClass(img.size) }}>
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  className="gallery-img"
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', background: 'linear-gradient(0deg,rgba(79,74,72,0.85) 0%,transparent 100%)', color: '#F8F4EC', fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', fontStyle: 'italic', opacity: 0, transition: 'opacity 0.3s' }} className="gallery-caption">
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .gallery-img:hover{transform:scale(1.05)!important}
        div:hover > .gallery-caption{opacity:1!important}
        @media(max-width:768px){
          div[style*="grid-template-columns"]{grid-template-columns:repeat(2,1fr)!important}
          div[style*="gridRow"]{grid-row:span 1!important;aspect-ratio:4/3!important}
        }
        @media(max-width:480px){
          div[style*="grid-template-columns"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </>
  );
}
