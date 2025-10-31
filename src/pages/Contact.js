const Contact = () => {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2.5rem 2rem', background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)', borderRadius: 18, boxShadow: '0 4px 24px #e0e7ff55', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontWeight: 700, fontSize: '2.2rem', marginBottom: 8, color: '#3b3b3b' }}>Contact Us</h1>
      <p style={{ color: '#6366f1', fontSize: '1.1rem', marginBottom: 24 }}>We'd love to hear from you! Fill out the form or use the info below.</p>
      <div style={{ display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.1rem', color: '#6366f1' }}>
          <span role="img" aria-label="email">📧</span>
          <span>support@eshop.com</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.1rem', color: '#6366f1' }}>
          <span role="img" aria-label="phone">📞</span>
          <span>+91-8590609366</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.1rem', color: '#6366f1' }}>
          <span role="img" aria-label="address">📍</span>
          <span>123, E-Shop Street, kerela, India</span>
        </div>
      </div>
      <form style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16, background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px #e0e7ff33' }} onSubmit={e => { e.preventDefault(); alert('Thank you for contacting us!'); }}>
        <input type="text" placeholder="Your Name" required style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1rem' }} />
        <input type="email" placeholder="Your Email" required style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1rem' }} />
        <textarea placeholder="Your Message" required rows={4} style={{ padding: 10, borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1rem', resize: 'vertical' }} />
        <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 60%, #818cf8 100%)', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px #6366f122' }}>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;