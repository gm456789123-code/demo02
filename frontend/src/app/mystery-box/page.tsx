'use client';

import Link from 'next/link';
import { useState } from 'react';

const prizes = [
  { emoji: '👑', label: 'Gold Badge', rarity: 'Legendary', color: '#ffc107', chance: '1%' },
  { emoji: '💎', label: '500 คะแนน', rarity: 'Epic', color: '#7000ff', chance: '5%' },
  { emoji: '🏆', label: '200 คะแนน', rarity: 'Rare', color: '#00f2ff', chance: '15%' },
  { emoji: '🌟', label: '100 คะแนน', rarity: 'Uncommon', color: '#00ff88', chance: '29%' },
  { emoji: '⭐', label: '50 คะแนน', rarity: 'Common', color: '#6b7fa3', chance: '50%' },
];

const rarityLabels: Record<string, string> = {
  Legendary: 'ในตำนาน',
  Epic: 'ยอดเยี่ยม',
  Rare: 'หายาก',
  Uncommon: 'พิเศษ',
  Common: 'ธรรมดา',
};

export default function MysteryBoxPage() {
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'opening' | 'revealed'>('idle');
  const [prize, setPrize] = useState<(typeof prizes)[0] | null>(null);
  const [boxesLeft, setBoxesLeft] = useState(5);

  const openBox = () => {
    if (phase !== 'idle' || boxesLeft === 0) return;

    setPhase('shaking');
    setTimeout(() => {
      setPhase('opening');
      setTimeout(() => {
        const rand = Math.random() * 100;
        let cumulative = 0;
        let selected = prizes[prizes.length - 1];
        for (const p of prizes) {
          cumulative += parseFloat(p.chance);
          if (rand <= cumulative) {
            selected = p;
            break;
          }
        }
        setPrize(selected);
        setBoxesLeft((b) => b - 1);
        setPhase('revealed');
      }, 800);
    }, 1500);
  };

  const reset = () => {
    setPhase('idle');
    setPrize(null);
  };

  return (
    <div className="cyber-grid min-h-screen">
      {/* Header */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(0,242,255,0.1)' }}>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">📦</span>
          <h1 className="text-xl font-bold" style={{ color: '#e0e6ed' }}>กล่องสุ่ม</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7fa3' }}>เปิดกล่องลุ้นรางวัลสุดพิเศษ</p>
      </div>

      <div className="p-6">
        {/* Sub-menu */}
        <div className="flex gap-3 flex-wrap mb-8">
          {[
            { href: '/predict', label: '⚽ ทายผลบอล', active: false },
            { href: '/spin-wheel', label: '🎡 ปันกงล้อ', active: false },
            { href: '/mystery-box', label: '📦 กล่องสุ่ม', active: true },
            { href: '/card-predict', label: '🃏 ทายไพ่', active: false },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: item.active ? 'linear-gradient(135deg, #7000ff, #ff0055)' : 'rgba(13,21,38,0.8)',
                color: item.active ? 'white' : '#6b7fa3',
                border: item.active ? 'none' : '1px solid rgba(0,242,255,0.15)',
                boxShadow: item.active ? '0 0 15px rgba(112,0,255,0.3)' : 'none',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Box Area */}
          <div className="flex flex-col items-center gap-6 flex-1">
            {/* Mystery Box */}
            <div
              className="relative cursor-pointer select-none"
              onClick={phase === 'idle' && boxesLeft > 0 ? openBox : undefined}
            >
              <div
                style={{
                  fontSize: '120px',
                  lineHeight: 1,
                  filter: phase === 'revealed' && prize
                    ? `drop-shadow(0 0 30px ${prize.color})`
                    : 'drop-shadow(0 0 20px rgba(112,0,255,0.5))',
                  animation:
                    phase === 'shaking'
                      ? 'box-shake 0.5s ease-in-out infinite'
                      : phase === 'opening'
                      ? 'float-up 0.3s ease-out'
                      : 'float-up 3s ease-in-out infinite',
                  transition: 'filter 0.5s ease',
                }}
              >
                {phase === 'revealed' && prize ? prize.emoji : '📦'}
              </div>

              {phase === 'idle' && boxesLeft > 0 && (
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full"
                  style={{ background: 'rgba(112,0,255,0.3)', color: '#c090ff', border: '1px solid rgba(112,0,255,0.4)', whiteSpace: 'nowrap' }}
                >
                  คลิกเพื่อเปิด!
                </div>
              )}
            </div>

            {/* Status / Result */}
            {phase === 'shaking' && (
              <div className="text-sm animate-neon-pulse" style={{ color: '#7000ff' }}>
                🎲 กำลังสุ่ม...
              </div>
            )}
            {phase === 'opening' && (
              <div className="text-sm animate-neon-pulse" style={{ color: '#00f2ff' }}>
                ✨ เปิดกล่อง!
              </div>
            )}
            {phase === 'revealed' && prize && (
              <div
                className="rounded-2xl p-6 text-center w-full max-w-xs animate-reveal"
                style={{
                  background: `${prize.color}12`,
                  border: `1px solid ${prize.color}35`,
                  boxShadow: `0 0 30px ${prize.color}25`,
                }}
              >
                <div
                  className="inline-block px-3 py-0.5 rounded-full text-xs font-bold mb-2"
                  style={{ background: `${prize.color}25`, color: prize.color }}
                >
                  {rarityLabels[prize.rarity]} • {prize.rarity}
                </div>
                <div className="text-2xl font-black mt-1" style={{ color: prize.color }}>
                  {prize.label}
                </div>
                <button
                  onClick={reset}
                  className="mt-4 px-5 py-2 rounded-lg text-sm font-semibold"
                  style={{
                    background: 'rgba(13,21,38,0.8)',
                    border: '1px solid rgba(0,242,255,0.2)',
                    color: '#00f2ff',
                    cursor: 'pointer',
                  }}
                >
                  เปิดกล่องต่อ →
                </button>
              </div>
            )}

            {/* Boxes left */}
            <div className="flex items-center gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                  style={{
                    background: i < boxesLeft ? 'rgba(112,0,255,0.2)' : 'rgba(13,21,38,0.5)',
                    border: i < boxesLeft ? '1px solid rgba(112,0,255,0.4)' : '1px solid rgba(255,255,255,0.05)',
                    opacity: i < boxesLeft ? 1 : 0.3,
                  }}
                >
                  {i < boxesLeft ? '📦' : '□'}
                </div>
              ))}
              <span className="text-xs ml-2" style={{ color: '#6b7fa3' }}>เหลือ {boxesLeft} กล่อง</span>
            </div>
          </div>

          {/* Prize Table */}
          <div className="flex-1 max-w-sm">
            <div className="glass-card p-5">
              <div className="text-sm font-bold mb-4" style={{ color: '#e0e6ed' }}>อัตราการออก</div>
              <div className="space-y-3">
                {prizes.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl w-8 text-center">{p.emoji}</span>
                    <div className="flex-1">
                      <div className="text-xs font-semibold" style={{ color: p.color }}>{p.label}</div>
                      <div className="text-xs" style={{ color: '#6b7fa3' }}>{rarityLabels[p.rarity]}</div>
                    </div>
                    <div className="text-xs font-bold" style={{ color: p.color }}>{p.chance}</div>
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
