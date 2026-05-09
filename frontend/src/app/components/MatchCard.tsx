'use client';

import { useState } from 'react';

type BetChoice = 'win' | 'draw' | 'lose' | null;

interface MatchCardProps {
  league: string;
  leagueColor?: string;
  homeTeam: string;
  homeEmoji: string;
  awayTeam: string;
  awayEmoji: string;
  time: string;
  points?: number;
}

const teamColors: Record<string, string> = {
  '🔴': '#e63946', '🔵': '#1d78d4', '⭕': '#e63946', '💙': '#1d78d4',
  '❤️': '#cc0000', '🟡': '#f4c430', '⚪': '#aaaaaa', '🟢': '#00aa44',
  '🐝': '#f4c430', '🟠': '#ff6b00', '🦇': '#8800cc', '🌍': '#2d8a4e',
};

function TeamBadge({ emoji, name }: { emoji: string; name: string }) {
  const color = teamColors[emoji] || '#00f2ff';
  const abbrev = name.split(' ').map((w) => w[0]).join('').slice(0, 3).toUpperCase();

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${color}60, ${color}15)`,
          border: `2px solid ${color}80`,
          boxShadow: `0 0 14px ${color}50, inset 0 0 12px ${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          flexShrink: 0,
        }}
      >
        {emoji}
      </div>
      <span style={{ fontSize: '11px', color: '#c0d0e0', fontWeight: 600, textAlign: 'center', maxWidth: '70px' }}>
        {name}
      </span>
    </div>
  );
}

export default function MatchCard({
  league,
  leagueColor = '#00f2ff',
  homeTeam,
  homeEmoji,
  awayTeam,
  awayEmoji,
  time,
  points = 0,
}: MatchCardProps) {
  const [choice, setChoice] = useState<BetChoice>(null);

  const toggle = (val: BetChoice) => setChoice(choice === val ? null : val);

  const betBtnStyle = (type: 'win' | 'draw' | 'lose') => {
    const colors = { win: '#00ff88', draw: '#ffc107', lose: '#ff0055' };
    const c = colors[type];
    const active = choice === type;
    return {
      padding: '5px 12px',
      borderRadius: '8px',
      border: `1.5px solid ${active ? c : c + '60'}`,
      color: c,
      background: active ? `${c}22` : 'transparent',
      boxShadow: active ? `0 0 12px ${c}50` : 'none',
      fontSize: '12px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontFamily: 'Kanit, sans-serif',
    } as React.CSSProperties;
  };

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, rgba(0,242,255,0.04) 0%, rgba(13,21,38,0.92) 50%, rgba(112,0,255,0.04) 100%)',
        border: '1px solid rgba(0,242,255,0.18)',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,242,255,0.08)',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,242,255,0.45)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,242,255,0.12), inset 0 1px 0 rgba(0,242,255,0.15)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,242,255,0.18)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,242,255,0.08)';
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      {/* League + time */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 10px',
            borderRadius: '20px',
            background: `${leagueColor}18`,
            border: `1px solid ${leagueColor}45`,
            color: leagueColor,
            letterSpacing: '0.3px',
          }}
        >
          {league}
        </span>
        <span style={{ fontSize: '12px', color: '#5a7090', fontWeight: 500 }}>{time}</span>
      </div>

      {/* Teams */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <TeamBadge emoji={homeEmoji} name={homeTeam} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: '8px',
              background: 'rgba(0,242,255,0.06)',
              border: '1px solid rgba(0,242,255,0.18)',
              color: 'rgba(0,242,255,0.7)',
              letterSpacing: '1px',
            }}
          >
            VS
          </div>
        </div>

        <TeamBadge emoji={awayEmoji} name={awayTeam} />
      </div>

      {/* Bet buttons */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
        <button style={betBtnStyle('win')} onClick={() => toggle('win')}>ชนะ</button>
        <button style={betBtnStyle('draw')} onClick={() => toggle('draw')}>เสมอ</button>
        <button style={betBtnStyle('lose')} onClick={() => toggle('lose')}>แพ้</button>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '8px',
          borderTop: '1px solid rgba(0,242,255,0.08)',
        }}
      >
        <span style={{ fontSize: '11px', color: '#5a7090' }}>ทายผล</span>
        <span
          style={{
            fontSize: '11px',
            color: points > 0 ? '#00f2ff' : '#5a7090',
            fontWeight: 600,
          }}
        >
          {choice
            ? <span style={{ color: '#00ff88' }}>✓ เลือกแล้ว</span>
            : `${points} คะแนน`}
        </span>
      </div>
    </div>
  );
}
