'use client';

import Link from 'next/link';

const cards = [
  { href: '/spin-wheel', icon: '🎡', label: 'ปันกงล้อ', desc: 'หมุนล้อลุ้นรางวัล', color: '#00f2ff' },
  { href: '/mystery-box', icon: '📦', label: 'กล่องสุ่ม', desc: 'สุ่มไอเทมสุดพิเศษ', color: '#7000ff' },
  { href: '/card-predict', icon: '🃏', label: 'ทายไพ่', desc: 'ทายผลด้วยไพ่ทาโรต์', color: '#ff0055' },
];

export default function SpecialGameCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '18px 20px',
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${card.color}08 0%, rgba(13,21,38,0.9) 100%)`,
            border: `1px solid ${card.color}28`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${card.color}12`,
            textDecoration: 'none',
            transition: 'all 0.25s ease',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = `${card.color}55`;
            el.style.boxShadow = `0 4px 30px rgba(0,0,0,0.4), 0 0 20px ${card.color}20`;
            el.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = `${card.color}28`;
            el.style.boxShadow = `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${card.color}12`;
            el.style.transform = 'none';
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: `${card.color}15`,
              border: `1px solid ${card.color}35`,
              boxShadow: `0 0 16px ${card.color}25`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              flexShrink: 0,
            }}
          >
            {card.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: card.color }}>{card.label}</div>
            <div style={{ fontSize: '12px', color: '#5a7090', marginTop: '2px' }}>{card.desc}</div>
          </div>
          <span style={{ fontSize: '20px', color: card.color, opacity: 0.4 }}>›</span>
        </Link>
      ))}
    </div>
  );
}
