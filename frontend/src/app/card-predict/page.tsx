'use client';

import Link from 'next/link';
import { useState } from 'react';

const tarotCards = [
  { id: 1, name: 'The Star', thaiName: 'ดาวนำโชค', emoji: '⭐', prediction: 'ทีมเหย้าจะชนะอย่างสวยงาม', color: '#00f2ff', points: 80 },
  { id: 2, name: 'The Moon', thaiName: 'พระจันทร์', emoji: '🌙', prediction: 'เสมอกัน โชคมาทั้งสองฝ่าย', color: '#7000ff', points: 60 },
  { id: 3, name: 'The Sun', thaiName: 'ดวงอาทิตย์', emoji: '☀️', prediction: 'ชัยชนะถล่มทลาย! สกอร์สูง', color: '#ffc107', points: 100 },
  { id: 4, name: 'The Tower', thaiName: 'หอคอย', emoji: '🗼', prediction: 'ทีมเยือนกลับมาชนะ upset!', color: '#ff0055', points: 120 },
  { id: 5, name: 'The Wheel', thaiName: 'วงล้อโชคชะตา', emoji: '🎡', prediction: 'ผลออกมาเซอร์ไพรส์ทุกคน', color: '#00ff88', points: 90 },
  { id: 6, name: 'The World', thaiName: 'โลกทั้งใบ', emoji: '🌍', prediction: 'เกมสวยงามและสูสีมาก', color: '#ff6b00', points: 70 },
];

const matches = [
  { home: 'Man Utd 🔴', away: 'Barcelona 🔵' },
  { home: 'Real Madrid ⚪', away: 'PSG 🔵' },
  { home: 'Liverpool ❤️', away: 'Man City 🔵' },
];

export default function CardPredictPage() {
  const [selectedMatch, setSelectedMatch] = useState(0);
  const [drawnCard, setDrawnCard] = useState<(typeof tarotCards)[0] | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [faceDown, setFaceDown] = useState(true);
  const [cardsUsed, setCardsUsed] = useState<number[]>([]);

  const drawCard = () => {
    if (isFlipping) return;

    const available = tarotCards.filter((c) => !cardsUsed.includes(c.id));
    if (available.length === 0) return;

    setIsFlipping(true);
    setFaceDown(true);
    setDrawnCard(null);

    setTimeout(() => {
      const card = available[Math.floor(Math.random() * available.length)];
      setDrawnCard(card);
      setCardsUsed((prev) => [...prev, card.id]);
      setFaceDown(false);
      setIsFlipping(false);
    }, 600);
  };

  const reset = () => {
    setDrawnCard(null);
    setCardsUsed([]);
    setFaceDown(true);
  };

  return (
    <div className="cyber-grid min-h-screen">
      {/* Header */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(0,242,255,0.1)' }}>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🃏</span>
          <h1 className="text-xl font-bold" style={{ color: '#e0e6ed' }}>ทายไพ่</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7fa3' }}>ดึงไพ่ทาโรต์ทำนายผลการแข่งขัน</p>
      </div>

      <div className="p-6">
        {/* Sub-menu */}
        <div className="flex gap-3 flex-wrap mb-8">
          {[
            { href: '/predict', label: '⚽ ทายผลบอล', active: false },
            { href: '/spin-wheel', label: '🎡 ปันกงล้อ', active: false },
            { href: '/mystery-box', label: '📦 กล่องสุ่ม', active: false },
            { href: '/card-predict', label: '🃏 ทายไพ่', active: true },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: item.active ? 'linear-gradient(135deg, #ff0055, #7000ff)' : 'rgba(13,21,38,0.8)',
                color: item.active ? 'white' : '#6b7fa3',
                border: item.active ? 'none' : '1px solid rgba(0,242,255,0.15)',
                boxShadow: item.active ? '0 0 15px rgba(255,0,85,0.3)' : 'none',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Match selector + Card draw */}
          <div className="flex flex-col items-center gap-6 flex-1">
            {/* Match selector */}
            <div className="w-full max-w-md">
              <div className="text-xs font-semibold mb-2" style={{ color: '#6b7fa3' }}>เลือกคู่แข่งขัน</div>
              <div className="grid grid-cols-1 gap-2">
                {matches.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedMatch(i); reset(); }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium"
                    style={{
                      background: selectedMatch === i ? 'rgba(255,0,85,0.12)' : 'rgba(13,21,38,0.8)',
                      border: selectedMatch === i ? '1px solid rgba(255,0,85,0.4)' : '1px solid rgba(0,242,255,0.1)',
                      color: selectedMatch === i ? '#ff0055' : '#6b7fa3',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{m.home}</span>
                    <span style={{ opacity: 0.5 }}>VS</span>
                    <span>{m.away}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card */}
            <div
              className="relative"
              style={{
                width: '160px',
                height: '240px',
                perspective: '1000px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s ease',
                  transform: faceDown ? 'rotateY(0deg)' : 'rotateY(180deg)',
                }}
              >
                {/* Card Back */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #1a0a3e, #0a1a3e)',
                    border: '2px solid rgba(112,0,255,0.4)',
                    boxShadow: '0 0 20px rgba(112,0,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                  }}
                >
                  🃏
                </div>

                {/* Card Front */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderRadius: '16px',
                    background: drawnCard
                      ? `linear-gradient(135deg, ${drawnCard.color}15, rgba(6,9,18,0.95))`
                      : 'rgba(13,21,38,0.9)',
                    border: drawnCard ? `2px solid ${drawnCard.color}50` : '2px solid rgba(0,242,255,0.2)',
                    boxShadow: drawnCard ? `0 0 25px ${drawnCard.color}30` : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '16px',
                  }}
                >
                  {drawnCard && (
                    <>
                      <span style={{ fontSize: '48px' }}>{drawnCard.emoji}</span>
                      <div style={{ color: drawnCard.color, fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>
                        {drawnCard.thaiName}
                      </div>
                      <div style={{ color: '#6b7fa3', fontSize: '10px', textAlign: 'center' }}>
                        {drawnCard.name}
                      </div>
                      <div
                        className="text-center text-xs mt-1 px-2 py-1 rounded-lg"
                        style={{
                          background: `${drawnCard.color}15`,
                          color: drawnCard.color,
                          border: `1px solid ${drawnCard.color}30`,
                        }}
                      >
                        +{drawnCard.points} pts
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Prediction */}
            {drawnCard && !faceDown && (
              <div
                className="rounded-xl p-4 text-center max-w-sm w-full animate-reveal"
                style={{
                  background: `${drawnCard.color}10`,
                  border: `1px solid ${drawnCard.color}30`,
                }}
              >
                <div className="text-xs mb-1" style={{ color: '#6b7fa3' }}>คำทำนาย</div>
                <div className="text-sm font-semibold" style={{ color: drawnCard.color }}>
                  "{drawnCard.prediction}"
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={drawCard}
                disabled={isFlipping || cardsUsed.length === tarotCards.length}
                className="btn-cyber px-6 py-2.5 rounded-xl text-sm font-bold"
                style={{
                  opacity: isFlipping || cardsUsed.length === tarotCards.length ? 0.5 : 1,
                  cursor: isFlipping || cardsUsed.length === tarotCards.length ? 'not-allowed' : 'pointer',
                }}
              >
                {isFlipping ? '✨ กำลังดึง...' : drawnCard ? '🃏 ดึงใหม่' : '🃏 ดึงไพ่'}
              </button>
              {cardsUsed.length > 0 && (
                <button
                  onClick={reset}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{
                    background: 'rgba(13,21,38,0.8)',
                    border: '1px solid rgba(0,242,255,0.2)',
                    color: '#6b7fa3',
                    cursor: 'pointer',
                  }}
                >
                  รีเซ็ต
                </button>
              )}
            </div>

            <div className="text-xs" style={{ color: '#6b7fa3' }}>
              ใช้ไปแล้ว {cardsUsed.length}/{tarotCards.length} ใบ
            </div>
          </div>

          {/* Right: All cards */}
          <div className="flex-1 max-w-xs">
            <div className="glass-card p-4">
              <div className="text-sm font-bold mb-4" style={{ color: '#e0e6ed' }}>ไพ่ทั้งหมด</div>
              <div className="grid grid-cols-2 gap-2">
                {tarotCards.map((c) => {
                  const used = cardsUsed.includes(c.id);
                  const isActive = drawnCard?.id === c.id;
                  return (
                    <div
                      key={c.id}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: isActive ? `${c.color}15` : 'rgba(13,21,38,0.6)',
                        border: isActive ? `1px solid ${c.color}40` : '1px solid rgba(0,242,255,0.08)',
                        opacity: used && !isActive ? 0.4 : 1,
                      }}
                    >
                      <div style={{ fontSize: '24px' }}>{c.emoji}</div>
                      <div className="text-xs font-medium mt-1" style={{ color: isActive ? c.color : '#6b7fa3' }}>
                        {c.thaiName}
                      </div>
                      <div className="text-xs" style={{ color: c.color }}>+{c.points}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
