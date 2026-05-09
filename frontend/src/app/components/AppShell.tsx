'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BsList } from 'react-icons/bs';
import Sidebar from './Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar whenever route changes (link click on mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile backdrop overlay */}
      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />

      {/* Main content */}
      <div className="app-main">
        {/* Mobile top bar */}
        <div className="mobile-topbar">
          <button
            onClick={() => setOpen(true)}
            aria-label="เปิดเมนู"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(0,242,255,0.08)',
              border: '1px solid rgba(0,242,255,0.2)',
              color: '#00f2ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <BsList />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>⚽</span>
            <span
              style={{
                fontWeight: 800,
                fontSize: '15px',
                letterSpacing: '1px',
                background: 'linear-gradient(90deg,#00f2ff,#b070ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              GOALGUESS
            </span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
