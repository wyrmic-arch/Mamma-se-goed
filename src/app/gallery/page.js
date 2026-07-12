import Link from 'next/link'

export default function GalleryPage() {
  return (
    <section className="section" style={{ paddingTop: 160, background: 'linear-gradient(180deg, #F8F4EC 0%, #F1EBE0 100%)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 700 }}>
        <h1 className="section-title center">The Visual World</h1>
        <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: '#B3A497', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 40 }}>
          Warm mornings, honest pages, golden fields, and the quiet objects that hold a story together.
        </p>
        <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1rem', color: '#4F4A48', lineHeight: 1.8, marginBottom: 32 }}>
          The gallery is managed through the admin panel. Head back to the homepage to see the full visual world of Ane Wilder.
        </p>
        <Link href="/" className="btn btn-outline">Back to Home</Link>
      </div>
    </section>
  )
}
