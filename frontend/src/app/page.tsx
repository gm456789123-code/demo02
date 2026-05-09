import Link from 'next/link';
import MatchCard from './components/MatchCard';
import SpecialGameCards from './components/SpecialGameCards';

const upcomingMatches = [
  { league: 'Premier League', leagueColor: '#6236ff', homeTeam: 'Man Utd', homeEmoji: '🔴', awayTeam: 'Arsenal', awayEmoji: '⭕', time: '12:00', points: 30 },
  { league: 'La Liga', leagueColor: '#ff6b00', homeTeam: 'Barcelona', homeEmoji: '🔵', awayTeam: 'Valson', awayEmoji: '🟡', time: '12:00', points: 20 },
  { league: 'Premier League', leagueColor: '#6236ff', homeTeam: 'Chelsea', homeEmoji: '💙', awayTeam: 'Liverpool', awayEmoji: '❤️', time: '17:00', points: 30 },
  { league: 'La Liga', leagueColor: '#ff6b00', homeTeam: 'Sevilla', homeEmoji: '⚪', awayTeam: 'Valencia', awayEmoji: '🦇', time: '13:00', points: 20 },
];

const topMatches = [
  { league: 'UCL', leagueColor: '#00f2ff', homeTeam: 'Man Utd', homeEmoji: '🔴', awayTeam: 'Barcelona', awayEmoji: '🔵', time: '12:00', points: 50 },
  { league: 'UCL', leagueColor: '#00f2ff', homeTeam: 'Real Madrid', homeEmoji: '⚪', awayTeam: 'Atlético', awayEmoji: '🔴', time: '12:00', points: 50 },
  { league: 'EPL', leagueColor: '#6236ff', homeTeam: 'Brentford', homeEmoji: '🐝', awayTeam: 'Man City', awayEmoji: '🔵', time: '12:00', points: 30 },
  { league: 'EPL', leagueColor: '#6236ff', homeTeam: 'Liverpool', homeEmoji: '❤️', awayTeam: 'KSBUGK', awayEmoji: '🟢', time: '12:00', points: 30 },
];

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#060912',
        backgroundImage:
          'linear-gradient(rgba(0,242,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.025) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }}
    >
      {/* ── Top Navbar ── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          height: '56px',
          background: 'rgba(6,9,18,0.92)',
          borderBottom: '1px solid rgba(0,242,255,0.1)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>⚽</span>
            <span
              style={{
                fontWeight: 800,
                fontSize: '15px',
                background: 'linear-gradient(90deg, #00f2ff, #7000ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
              }}
            >
              GOALGUESS
            </span>
          </div>
          {['หน้าแรก', 'ทายผล', 'ผลบอลสด', 'ข่าวสาร', 'ข้อมูลส่วนตัว'].map((item, i) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: '13px',
                color: i === 0 ? '#00f2ff' : '#5a7090',
                textDecoration: 'none',
                fontWeight: i === 0 ? 600 : 400,
                display: 'none',
              }}
              className="md:block"
            >
              {item}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            style={{
              padding: '6px 18px',
              borderRadius: '8px',
              background: 'transparent',
              border: '1px solid rgba(0,242,255,0.35)',
              color: '#00f2ff',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Kanit, sans-serif',
            }}
          >
            Login
          </button>
          <Link
            href="/predict"
            style={{
              padding: '6px 18px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #ff0055, #7000ff)',
              color: 'white',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 0 16px rgba(255,0,85,0.35)',
              letterSpacing: '0.3px',
            }}
          >
            ทายผลเลย!
          </Link>
        </div>
      </nav>

      <div className="page-padding" style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* ── Hero ── */}
        <div
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            minHeight: '280px',
            background:
              'radial-gradient(ellipse 55% 70% at 50% -10%, rgba(112,0,255,0.45) 0%, transparent 65%),' +
              'radial-gradient(ellipse 30% 50% at 12% 60%, rgba(0,242,255,0.18) 0%, transparent 55%),' +
              'radial-gradient(ellipse 30% 50% at 88% 60%, rgba(255,0,85,0.15) 0%, transparent 55%),' +
              'radial-gradient(ellipse 70% 25% at 50% 110%, rgba(0,242,255,0.1) 0%, transparent 60%),' +
              'linear-gradient(160deg, #07051a 0%, #0e0826 45%, #070516 100%)',
            border: '1px solid rgba(112,0,255,0.3)',
            boxShadow: '0 0 60px rgba(112,0,255,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Scan line overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
              pointerEvents: 'none',
            }}
          />

          {/* Glow dots */}
          <div style={{ position: 'absolute', top: '20%', left: '8%', width: '4px', height: '4px', borderRadius: '50%', background: '#00f2ff', boxShadow: '0 0 12px #00f2ff', opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: '60%', left: '15%', width: '3px', height: '3px', borderRadius: '50%', background: '#7000ff', boxShadow: '0 0 10px #7000ff', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: '30%', right: '10%', width: '5px', height: '5px', borderRadius: '50%', background: '#ff0055', boxShadow: '0 0 14px #ff0055', opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: '70%', right: '18%', width: '3px', height: '3px', borderRadius: '50%', background: '#00f2ff', boxShadow: '0 0 8px #00f2ff', opacity: 0.4 }} />

          {/* Content */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '32px 24px',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '3px',
                color: '#9b5cf6',
                textTransform: 'uppercase',
              }}
            >
              ⬡ UCL &nbsp;▸&nbsp; คู่ยอดโลก
            </div>

            {/* Teams + Countdown */}
            <div
              className="hero-gap"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                width: '100%',
                maxWidth: '560px',
                justifyContent: 'center',
              }}
            >
              {/* Home team */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flex: 1 }}>
                <div
                  className="hero-team-logo"
                  style={{
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, rgba(220,30,30,0.7), rgba(100,0,0,0.3))',
                    border: '2px solid rgba(220,50,50,0.7)',
                    boxShadow: '0 0 30px rgba(220,30,30,0.45), 0 0 60px rgba(220,30,30,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '44px',
                    animation: 'float-up 3s ease-in-out infinite',
                  }}
                >
                  🔴
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#dde6f0' }}>แมนยู ยูไนเต็ด</span>
              </div>

              {/* Countdown */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div
                  className="hero-countdown"
                  style={{
                    fontFamily: '"Kanit", monospace',
                    fontWeight: 800,
                    letterSpacing: '4px',
                    color: '#00f2ff',
                    textShadow: '0 0 16px rgba(0,242,255,0.9), 0 0 32px rgba(0,242,255,0.4)',
                    background: 'rgba(0,0,0,0.45)',
                    border: '1px solid rgba(0,242,255,0.3)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    animation: 'countdown-pulse 1s ease-in-out infinite',
                  }}
                >
                  00:06:45
                </div>
                <span style={{ fontSize: '11px', color: '#4a6080', letterSpacing: '2px' }}>เหลือเวลา</span>
              </div>

              {/* Away team */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flex: 1 }}>
                <div
                  className="hero-team-logo"
                  style={{
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, rgba(20,100,220,0.7), rgba(0,40,120,0.3))',
                    border: '2px solid rgba(40,120,220,0.7)',
                    boxShadow: '0 0 30px rgba(20,100,220,0.45), 0 0 60px rgba(20,100,220,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '44px',
                    animation: 'float-up 3s ease-in-out infinite',
                    animationDelay: '0.8s',
                  }}
                >
                  🔵
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#dde6f0' }}>บาร์เซโลนา</span>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#4a6080', letterSpacing: '0.5px' }}>
              UCL คู่ยอดโลก: แมนยู ยูไนเต็ด vs บาร์เซโลนา
            </p>

            <Link
              href="/predict"
              style={{
                padding: '10px 36px',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, #ff0055, #7000ff)',
                color: 'white',
                fontWeight: 800,
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(255,0,85,0.5), 0 4px 20px rgba(0,0,0,0.4)',
                letterSpacing: '1px',
                transition: 'all 0.3s',
              }}
            >
              ⚡ ทายผลเลย!
            </Link>
          </div>
        </div>

        {/* ── Main content + Right sidebar ── */}
        <div className="page-body" style={{ gap: '20px', alignItems: 'flex-start' }}>

          {/* Left: match sections */}
          <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <Section title="คู่แข่งกัดไป" accent="#00f2ff">
              <div className="match-grid">
                {upcomingMatches.map((m, i) => <MatchCard key={i} {...m} />)}
              </div>
            </Section>

            <Section title="คู่แข่งกัดไป (ยอดนิยม)" accent="#00f2ff">
              <div className="match-grid">
                {topMatches.map((m, i) => <MatchCard key={i} {...m} />)}
              </div>
            </Section>

            <Section title="เกมพิเศษ" accent="#7000ff">
              <SpecialGameCards />
            </Section>
          </div>

          {/* Right sidebar */}
          <div className="right-panel"><RightSidebar /></div>
        </div>
      </div>
    </div>
  );
}

/* ── Right Sidebar ── */
const leaderboard = [
  { rank: 1, name: 'บวรโชค ก.', badge: 'Gold', points: 5432, color: '#ffc107', avatar: '👑' },
  { rank: 2, name: 'ชุมพลทอง', badge: 'Silver', points: 5452, color: '#9aa8b8', avatar: '🥈' },
  { rank: 3, name: 'บวรมัน', badge: 'Silver', points: 5432, color: '#9aa8b8', avatar: '🥉' },
  { rank: 4, name: 'ออฟถิน', badge: 'Silver', points: 5382, color: '#9aa8b8', avatar: '🏅' },
];

const voteOptions = [
  { label: 'สู้น', pct: 0, color: '#00f2ff' },
  { label: 'ต่อรองจะ', pct: 26, color: '#7000ff' },
  { label: 'ฝ่าย', pct: 0, color: '#ff0055' },
];

function RightSidebar() {
  return (
    <div style={{ width: '260px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Leaderboard */}
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(0,242,255,0.04), rgba(13,21,38,0.92))',
          border: '1px solid rgba(0,242,255,0.15)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '12px 16px',
            background: 'linear-gradient(90deg, rgba(0,242,255,0.08), transparent)',
            borderBottom: '1px solid rgba(0,242,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '16px' }}>🏆</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#dde6f0' }}>อันดับเขียน</span>
          <div
            style={{
              marginLeft: 'auto',
              fontSize: '10px',
              padding: '2px 8px',
              borderRadius: '20px',
              background: 'rgba(0,242,255,0.1)',
              border: '1px solid rgba(0,242,255,0.2)',
              color: '#00f2ff',
            }}
          >
            Leaderboard ▾
          </div>
        </div>

        {/* Entries */}
        <div style={{ padding: '8px' }}>
          {leaderboard.map((p) => (
            <div
              key={p.rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 8px',
                borderRadius: '10px',
                marginBottom: '4px',
                background: p.rank === 1 ? 'rgba(255,193,7,0.06)' : 'transparent',
                border: p.rank === 1 ? '1px solid rgba(255,193,7,0.15)' : '1px solid transparent',
                transition: 'background 0.2s',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 35%, ${p.color}40, ${p.color}10)`,
                  border: `1.5px solid ${p.color}60`,
                  boxShadow: `0 0 8px ${p.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0,
                }}
              >
                {p.avatar}
              </div>

              {/* Name + badge */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#dde6f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: p.color,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    marginTop: '1px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: p.color,
                      boxShadow: `0 0 4px ${p.color}`,
                      display: 'inline-block',
                    }}
                  />
                  {p.badge}
                </div>
              </div>

              {/* Points */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: p.rank === 1 ? '#ffc107' : '#00f2ff' }}>
                  {p.points.toLocaleString()}
                </div>
                <div style={{ fontSize: '10px', color: '#4a6080' }}>คะแนน</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured vs match */}
      <div
        style={{
          borderRadius: '16px',
          background: 'linear-gradient(145deg, rgba(112,0,255,0.06), rgba(13,21,38,0.92))',
          border: '1px solid rgba(112,0,255,0.2)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '10px 14px',
            background: 'linear-gradient(90deg, rgba(112,0,255,0.1), transparent)',
            borderBottom: '1px solid rgba(112,0,255,0.12)',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#b070ff' }}>⚡ แมตช์เด่น</span>
        </div>
        <div style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '28px', marginBottom: '4px' }}>🔴</div>
            <div style={{ fontSize: '11px', color: '#9ab0c8', fontWeight: 600 }}>Man Utd</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#00f2ff',
                textShadow: '0 0 12px rgba(0,242,255,0.8)',
                letterSpacing: '2px',
              }}
            >
              2 : 0
            </div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#00ff88',
                marginTop: '4px',
                letterSpacing: '1px',
              }}
            >
              ● LIVE
            </div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '28px', marginBottom: '4px' }}>🔵</div>
            <div style={{ fontSize: '11px', color: '#9ab0c8', fontWeight: 600 }}>Barcelona</div>
          </div>
        </div>
      </div>

      {/* Vote poll */}
      <div
        style={{
          borderRadius: '16px',
          background: 'linear-gradient(145deg, rgba(0,242,255,0.03), rgba(13,21,38,0.92))',
          border: '1px solid rgba(0,242,255,0.12)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '10px 14px',
            background: 'linear-gradient(90deg, rgba(0,242,255,0.07), transparent)',
            borderBottom: '1px solid rgba(0,242,255,0.1)',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#00f2ff' }}>📊 โหวต: คืนนี้ลิเวอร์พูล จะชนะ?</span>
        </div>
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {voteOptions.map((opt, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#9ab0c8' }}>{opt.label}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: opt.color }}>{opt.pct}%</span>
              </div>
              <div
                style={{
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${opt.pct}%`,
                    borderRadius: '3px',
                    background: opt.color,
                    boxShadow: `0 0 6px ${opt.color}`,
                    transition: 'width 0.8s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div
        style={{
          borderRadius: '16px',
          background: 'linear-gradient(145deg, rgba(0,255,136,0.03), rgba(13,21,38,0.92))',
          border: '1px solid rgba(0,255,136,0.12)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          padding: '14px',
        }}
      >
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#00ff88', marginBottom: '12px' }}>
          📈 สถิติของคุณ
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { label: 'ทายถูก', value: '12', color: '#00ff88' },
            { label: 'ทายผิด', value: '4', color: '#ff0055' },
            { label: 'คะแนน', value: '360', color: '#00f2ff' },
            { label: 'อันดับ', value: '#8', color: '#ffc107' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                padding: '10px',
                borderRadius: '10px',
                background: `${s.color}08`,
                border: `1px solid ${s.color}20`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: '#5a7090', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{ width: '4px', height: '18px', borderRadius: '2px', background: accent, boxShadow: `0 0 8px ${accent}` }} />
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#dde6f0', margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accent}30, transparent)` }} />
      </div>
      {children}
    </section>
  );
}
