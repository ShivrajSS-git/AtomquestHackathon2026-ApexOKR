import React, { useState } from 'react';
import { Target, Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };

  const setDemoUser = (roleEmail) => setEmail(roleEmail);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-dark)'
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 4rem',
        maxWidth: '600px',
        margin: '0 auto'
      }} className="animate-fade-in">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{
            width: '48px', height: '48px',
            background: 'var(--primary)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--bg-panel)'
          }}>
            <Target size={28} />
          </div>
          <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            ApexOKR
          </span>
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Sign In to Portal</h1>
        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
          Access your organizational goal setting and tracking dashboard.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group">
            <label className="label">Corporate Email Address</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                className="input"
                style={{ paddingLeft: '3rem' }}
                placeholder="name@apexokr.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            Enter Portal
          </button>
        </form>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-glass)' }}>
          <p className="label mb-2">Hackathon Demo Credentials</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => setDemoUser('employee@apexokr.com')} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>Employee</button>
            <button onClick={() => setDemoUser('manager@apexokr.com')} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>Manager</button>
            <button onClick={() => setDemoUser('admin@apexokr.com')} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>Admin</button>
          </div>
        </div>
        
      </div>
      
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, var(--bg-panel) 0%, var(--bg-dark) 100%)',
        borderLeft: '1px solid var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-10%', right: '-10%',
          width: '500px', height: '500px',
          background: 'var(--primary)',
          opacity: 0.05,
          borderRadius: '50%',
          filter: 'blur(100px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-10%', left: '-10%',
          width: '600px', height: '600px',
          background: 'var(--secondary)',
          opacity: 0.05,
          borderRadius: '50%',
          filter: 'blur(100px)'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-main)', lineHeight: 1.2 }}>
            Aligning personal <span style={{ color: 'var(--primary)' }}>ambition</span> with organizational <span style={{ color: 'var(--secondary)' }}>growth</span>.
          </h2>
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            The all-in-one platform for setting transparent OKRs, tracking quarterly performance, and fostering continuous feedback.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
