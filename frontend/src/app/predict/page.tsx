import Link from 'next/link';
import MatchCard from '../components/MatchCard';

const leagues = [
  { name: 'ทั้งหมด', active: true },
  { name: 'UCL', active: false },
  { name: 'Premier League', active: false },
  { name: 'La Liga', active: false },
  { name: 'Serie A', active: false },
  { name: 'Bundesliga', active: false },
];

const matches = [
  { league: 'UCL', leagueColor: '#00f2ff', homeTeam: 'Man Utd', homeEmoji: '🔴', awayTeam: 'Barcelona', awayEmoji: '🔵', time: '12:00', points: 50 },
  { league: 'UCL', leagueColor: '#00f2ff', homeTeam: 'Real Madrid', homeEmoji: '⚪', awayTeam: 'PSG', awayEmoji: '🔵', time: '14:00', points: 50 },
  { league: 'Premier League', leagueColor: '#3d1aff', homeTeam: 'Arsenal', homeEmoji: '⭕', awayTeam: 'Chelsea', awayEmoji: '💙', time: '18:30', points: 30 },
  { league: 'Premier League', leagueColor: '#3d1aff', homeTeam: 'Liverpool', homeEmoji: '❤️', awayTeam: 'Man City', awayEmoji: '🔵', time: '20:45', points: 30 },
  { league: 'La Liga', leagueColor: '#ff6b00', homeTeam: 'Atletico', homeEmoji: '🔴', awayTeam: 'Sevilla', awayEmoji: '⚪', time: '22:00', points: 20 },
  { league: 'La Liga', leagueColor: '#ff6b00', homeTeam: 'Villarreal', homeEmoji: '🟡', awayTeam: 'Betis', awayEmoji: '🟢', time: '22:00', points: 20 },
];

export default function PredictPage() {
  return (
    <div className="cyber-grid min-h-screen">
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{ borderBottom: '1px solid rgba(0,242,255,0.1)' }}
      >
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🏆</span>
          <h1 className="text-xl font-bold" style={{ color: '#e0e6ed' }}>ทายผลบอล</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7fa3' }}>ทายผลการแข่งขันและสะสมคะแนน</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Sub-menu for predict games */}
        <div className="flex gap-3 flex-wrap">
          {[
            { href: '/predict', label: '⚽ ทายผลบอล', active: true },
            { href: '/spin-wheel', label: '🎡 ปันกงล้อ', active: false },
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

        {/* League filter */}
        <div className="flex gap-2 flex-wrap">
          {leagues.map((l) => (
            <button
              key={l.name}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                background: l.active ? 'rgba(0,242,255,0.15)' : 'rgba(13,21,38,0.8)',
                color: l.active ? '#00f2ff' : '#6b7fa3',
                border: l.active ? '1px solid rgba(0,242,255,0.4)' : '1px solid rgba(0,242,255,0.1)',
              }}
            >
              {l.name}
            </button>
          ))}
        </div>

        {/* Match grid */}
        <div>
          <h2 className="text-sm font-semibold mb-4" style={{ color: '#6b7fa3' }}>
            วันนี้ — {matches.length} คู่
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((m, i) => (
              <MatchCard key={i} {...m} />
            ))}
          </div>
        </div>

        {/* Info banner */}
        <div
          className="rounded-xl p-4 flex items-center gap-4"
          style={{
            background: 'rgba(0,242,255,0.05)',
            border: '1px solid rgba(0,242,255,0.15)',
          }}
        >
          <span className="text-2xl">💡</span>
          <div>
            <div className="text-sm font-semibold" style={{ color: '#00f2ff' }}>เคล็ดลับการทาย</div>
            <div className="text-xs mt-0.5" style={{ color: '#6b7fa3' }}>
              ทายให้ถูกต้องเพื่อสะสมคะแนนขึ้นอันดับ Leaderboard — ยิ่งทายถูก ยิ่งได้มาก!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
