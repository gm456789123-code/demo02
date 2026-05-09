'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';

const segments = [
  { label: '50 คะแนน', color: '#00f2ff', emoji: '⭐' },
  { label: 'ลองใหม่', color: '#6b7fa3', emoji: '🔄' },
  { label: '200 คะแนน', color: '#7000ff', emoji: '💎' },
  { label: '20 คะแนน', color: '#00ff88', emoji: '🌟' },
  { label: 'รางวัลพิเศษ', color: '#ff0055', emoji: '🎁' },
  { label: '100 คะแนน', color: '#ffc107', emoji: '🏆' },
  { label: 'ลองใหม่', color: '#6b7fa3', emoji: '🔄' },
  { label: '500 คะแนน', color: '#00f2ff', emoji: '👑' },
];

export default function SpinWheelPage() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<(typeof segments)[0] | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(3);
  const spinRef = useRef(false);

  const spin = () => {
    if (spinning || spinsLeft === 0 || spinRef.current) return;
    spinRef.current = true;
    setSpinning(true);
    setResult(null);

    const extraSpins = 5 + Math.random() * 5;
    const segmentAngle = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const finalAngle = rotation + extraSpins * 360 + randomSegment * segmentAngle;

    setRotation(finalAngle);

    setTimeout(() => {
      setSpinning(false);
      spinRef.current = false;
      setSpinsLeft((s) => s - 1);
      const idx = Math.floor(((finalAngle % 360) / 360) * segments.length);
      setResult(segments[(segments.length - idx) % segments.length]);
    }, 4000);
  };

  const segmentAngle = 360 / segments.length;

  return (
    <div className="cyber-grid min-h-screen">
      {/* Header */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(0,242,255,0.1)' }}>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🎡</span>
          <h1 className="text-xl font-bold" style={{ color: '#e0e6ed' }}>ปันกงล้อ</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7fa3' }}>หมุนล้อนำโชค ลุ้นรางวัลสุดพิเศษ</p>
      </div>

      <div className="p-6">
        {/* Sub-menu */}
        <div className="flex gap-3 flex-wrap mb-8">
          {[
            { href: '/predict', label: '⚽ ทายผลบอล', active: false },
            { href: '/spin-wheel', label: '🎡 ปันกงล้อ', active: true },
            { href: '/mystery-box', label: '📦 กล่องสุ่ม', active: false },
            { href: '/card-predict', label: '🃏 ทายไพ่', active: false },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: item.active ? 'linear-gradient(135deg, #00f2ff, #7000ff)' : 'rgba(13,21,38,0.8)',
                color: item.active ? 'white' : '#6b7fa3',
                border: item.active ? 'none' : '1px solid rgba(0,242,255,0.15)',
                boxShadow: item.active ? '0 0 15px rgba(0,242,255,0.3)' : 'none',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Wheel */}
          <div className="flex flex-col items-center gap-6">
            {/* Pointer */}
            <div className="relative">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10"
                style={{ filter: 'drop-shadow(0 0 8px #ff0055)' }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '14px solid transparent',
                    borderRight: '14px solid transparent',
                    borderTop: '28px solid #ff0055',
                  }}
                />
              </div>

              {/* SVG Wheel */}
              <svg
                width="320"
                height="320"
                viewBox="0 0 320 320"
                style={{
                  transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                  transform: `rotate(${rotation}deg)`,
                  filter: spinning ? 'drop-shadow(0 0 20px rgba(0,242,255,0.6))' : 'drop-shadow(0 0 10px rgba(0,242,255,0.3))',
                }}
              >
                {segments.map((seg, i) => {
                  const startAngle = (i * segmentAngle - 90) * (Math.PI / 180);
                  const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180);
                  const r = 150;
                  const cx = 160;
                  const cy = 160;
                  const x1 = cx + r * Math.cos(startAngle);
                  const y1 = cy + r * Math.sin(startAngle);
                  const x2 = cx + r * Math.cos(endAngle);
                  const y2 = cy + r * Math.sin(endAngle);
                  const midAngle = (startAngle + endAngle) / 2;
                  const textR = r * 0.65;
                  const tx = cx + textR * Math.cos(midAngle);
                  const ty = cy + textR * Math.sin(midAngle);

                  return (
                    <g key={i}>
                      <path
                        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                        fill={seg.color}
                        fillOpacity={i % 2 === 0 ? 0.85 : 0.6}
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="1"
                      />
                      <text
                        x={tx}
                        y={ty}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="11"
                        fontWeight="bold"
                        fill="white"
                        transform={`rotate(${(i * segmentAngle + segmentAngle / 2)}, ${tx}, ${ty})`}
                        style={{ pointerEvents: 'none' }}
                      >
                        {seg.emoji}
                      </text>
                    </g>
                  );
                })}
                {/* Center circle */}
                <circle cx="160" cy="160" r="24" fill="#060912" stroke="rgba(0,242,255,0.6)" strokeWidth="2" />
                <text x="160" y="165" textAnchor="middle" fontSize="16" fill="#00f2ff">⚽</text>
              </svg>
            </div>

            {/* Spin button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={spin}
                disabled={spinning || spinsLeft === 0}
                className="btn-cyber px-10 py-3 rounded-full text-sm font-black"
                style={{
                  opacity: spinning || spinsLeft === 0 ? 0.5 : 1,
                  cursor: spinning || spinsLeft === 0 ? 'not-allowed' : 'pointer',
                  letterSpacing: '1px',
                }}
              >
                {spinning ? '⏳ กำลังหมุน...' : '🎡 หมุนเลย!'}
              </button>
              <div className="text-sm" style={{ color: '#6b7fa3' }}>
                เหลือสิทธิ์: <span style={{ color: '#00f2ff', fontWeight: 700 }}>{spinsLeft}</span> ครั้ง
              </div>
            </div>
          </div>

          {/* Result + Rewards table */}
          <div className="flex-1 space-y-4 min-w-64">
            {/* Result display */}
            {result ? (
              <div
                className="rounded-2xl p-6 text-center animate-reveal"
                style={{
                  background: `${result.color}15`,
                  border: `1px solid ${result.color}40`,
                  boxShadow: `0 0 30px ${result.color}30`,
                }}
              >
                <div className="text-5xl mb-3">{result.emoji}</div>
                <div className="text-lg font-black" style={{ color: result.color }}>
                  {result.label}
                </div>
                <div className="text-xs mt-1" style={{ color: '#6b7fa3' }}>ยินดีด้วย!</div>
              </div>
            ) : (
              <div
                className="rounded-2xl p-6 text-center"
                style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(0,242,255,0.1)' }}
              >
                <div className="text-4xl mb-3 opacity-30">🎡</div>
                <div className="text-sm" style={{ color: '#6b7fa3' }}>กด หมุนเลย! เพื่อลุ้นรางวัล</div>
              </div>
            )}

            {/* Reward table */}
            <div className="glass-card p-4">
              <div className="text-sm font-bold mb-3" style={{ color: '#e0e6ed' }}>รางวัลทั้งหมด</div>
              <div className="space-y-2">
                {segments.filter((s) => s.label !== 'ลองใหม่').map((s, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span>{s.emoji}</span>
                    <span style={{ color: s.color, flex: 1 }}>{s.label}</span>
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
