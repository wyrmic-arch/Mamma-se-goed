'use client';

export default function NewsletterForm({ dark }) {
  if (dark) {
    return (
      <form onSubmit={e => { e.preventDefault(); e.target.querySelector('button').textContent = 'Welcome home ✦'; }} style={{ maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input type="email" placeholder="Your email address" required style={{ padding: '14px 20px', border: '1px solid rgba(248,244,236,0.3)', background: 'rgba(248,244,236,0.1)', color: '#F8F4EC', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none', width: '100%' }} />
        <button type="submit" className="btn" style={{ background: '#E8C26A', color: '#4F4A48', marginTop: 8 }}>Join the Porch</button>
      </form>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); e.target.querySelector('button').textContent = 'Welcome home ✦'; }} style={{ maxWidth: 440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <input type="text" placeholder="Your name" required style={{ padding: '14px 20px', border: '1px solid rgba(179,164,151,0.3)', background: '#F8F4EC', color: '#4F4A48', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none', width: '100%' }} />
      <input type="email" placeholder="Your email address" required style={{ padding: '14px 20px', border: '1px solid rgba(179,164,151,0.3)', background: '#F8F4EC', color: '#4F4A48', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none', width: '100%' }} />
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Join the Porch</button>
    </form>
  );
}
