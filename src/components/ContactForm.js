'use client';

export default function ContactForm() {
  return (
    <form onSubmit={e => { e.preventDefault(); e.target.querySelector('button').textContent = 'Welcome home ✦'; }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <input type="text" placeholder="Your name" required style={{ padding: '14px 20px', border: '1px solid rgba(179,164,151,0.3)', background: '#F8F4EC', color: '#4F4A48', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none', width: '100%' }} />
      <input type="email" placeholder="Your email address" required style={{ padding: '14px 20px', border: '1px solid rgba(179,164,151,0.3)', background: '#F8F4EC', color: '#4F4A48', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 2, outline: 'none', width: '100%' }} />
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Join the Porch</button>
    </form>
  );
}
