'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BsHouseDoorFill,
  BsTrophyFill,
  BsFire,
  BsArrowRepeat,
  BsBoxFill,
  BsSuitSpadeFill,
  BsBroadcast,
  BsPersonFill,
  BsGearFill,
  BsPower,
  BsChevronDown,
  BsCircleFill,
  BsXLg,
} from 'react-icons/bs';

type SubItem = { href: string; label: string; Icon: React.ElementType; color: string };
type NavItem =
  | { href: string; label: string; Icon: React.ElementType }
  | { label: string; Icon: React.ElementType; sub: SubItem[] };

const mainNav: NavItem[] = [
  { href: '/', label: 'หน้าแรก', Icon: BsHouseDoorFill },
  {
    label: 'ทายผล',
    Icon: BsTrophyFill,
    sub: [
      { href: '/predict',      label: 'ทายผลบอล', Icon: BsFire,           color: '#00f2ff' },
      { href: '/spin-wheel',   label: 'ปันกงล้อ',  Icon: BsArrowRepeat,    color: '#00f2ff' },
      { href: '/mystery-box',  label: 'กล่องสุ่ม', Icon: BsBoxFill,        color: '#7000ff' },
      { href: '/card-predict', label: 'ทายไพ่',    Icon: BsSuitSpadeFill,  color: '#ff0055' },
    ],
  },
  { href: '/live',     label: 'ผลบอลสด',      Icon: BsBroadcast  },
  { href: '/profile',  label: 'ข้อมูลส่วนตัว', Icon: BsPersonFill },
  { href: '/settings', label: 'ตั้งค่า',        Icon: BsGearFill   },
];

const liveMatches = [
  { league: 'Premier League', home: 'Man Utd', away: 'Barcelona', score: '2-0', live: true,  homeColor: '#cc2200', awayColor: '#1d78d4' },
  { league: 'La Liga',        home: 'Real Madrid', away: 'Atlético',  score: '1-1', live: false, homeColor: '#aaaaaa', awayColor: '#cc2200' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [predictOpen, setPredictOpen] = useState(
    ['predict', 'spin-wheel', 'mystery-box', 'card-predict'].some((s) =>
      pathname.startsWith('/' + s)
    )
  );

  const isActive    = (href: string) => pathname === href;
  const isSubActive = (href: string) => pathname.startsWith(href) && href !== '/';

  /* ── style helpers ── */
  const itemBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 16px',
    borderRadius: '12px',
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'Kanit, sans-serif',
    color: '#5a7090',
    textDecoration: 'none',
    background: 'transparent',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  };

  const activeStyle = (color = '#00f2ff'): React.CSSProperties => ({
    borderLeftColor: color,
    background: `${color}12`,
    color,
    fontWeight: 600,
  });

  const iconBox = (color = '#00f2ff', active = false): React.CSSProperties => ({
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '16px',
    background: active ? `${color}20` : 'rgba(255,255,255,0.04)',
    border: `1px solid ${active ? color + '40' : 'rgba(255,255,255,0.06)'}`,
    color: active ? color : '#5a7090',
    transition: 'all 0.2s ease',
  });

  return (
    <aside
      className={`app-sidebar${isOpen ? ' is-open' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #08091a 0%, #060912 60%, #06050f 100%)',
        borderRight: '1px solid rgba(0,242,255,0.08)',
        boxShadow: '4px 0 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* right-edge glow */}
      <div style={{ position:'absolute', right:0, top:'8%', bottom:'8%', width:'1px', background:'linear-gradient(180deg,transparent,rgba(0,242,255,0.35),transparent)', pointerEvents:'none' }} />

      {/* ── Logo ── */}
      <div style={{ padding:'20px 18px', borderBottom:'1px solid rgba(0,242,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        {/* Mobile close button */}
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="ปิดเมนู"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '30px',
            height: '30px',
            borderRadius: '8px',
            background: 'rgba(255,0,85,0.1)',
            border: '1px solid rgba(255,0,85,0.25)',
            color: '#ff0055',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <BsXLg />
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div
            style={{
              width:'44px', height:'44px', borderRadius:'14px',
              background:'linear-gradient(135deg,#00f2ff,#7000ff)',
              boxShadow:'0 0 18px rgba(0,242,255,0.45)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'22px', flexShrink:0,
            }}
          >
            ⚽
          </div>
          <div>
            <div style={{ fontWeight:800, fontSize:'16px', letterSpacing:'1.5px', background:'linear-gradient(90deg,#00f2ff,#b070ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              GOALGUESS
            </div>
            <div style={{ fontSize:'11px', color:'#3a5070', letterSpacing:'0.5px' }}>ทายผลบอล</div>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex:1, overflowY:'auto', padding:'14px 10px', display:'flex', flexDirection:'column', gap:'3px' }}>

        {mainNav.map((item) => {
          /* ── Dropdown group (ทายผล) ── */
          if ('sub' in item) {
            const anyActive = item.sub.some((s) => isSubActive(s.href));
            const open = predictOpen;

            return (
              <div key={item.label}>
                <button
                  onClick={() => setPredictOpen((o) => !o)}
                  style={{
                    ...itemBase,
                    justifyContent: 'space-between',
                    ...(anyActive ? activeStyle() : {}),
                  }}
                  onMouseEnter={(e) => { if (!anyActive) { (e.currentTarget as HTMLElement).style.background='rgba(0,242,255,0.05)'; (e.currentTarget as HTMLElement).style.color='#a0b8cc'; } }}
                  onMouseLeave={(e) => { if (!anyActive) { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='#5a7090'; } }}
                >
                  <span style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                    <span style={iconBox('#00f2ff', anyActive)}>
                      <item.Icon />
                    </span>
                    {item.label}
                  </span>
                  <BsChevronDown
                    style={{
                      fontSize: '11px',
                      opacity: 0.5,
                      transform: open ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>

                {open && (
                  <div style={{ marginLeft:'8px', marginTop:'2px', marginBottom:'2px', display:'flex', flexDirection:'column', gap:'2px' }}>
                    {item.sub.map((sub) => {
                      const active = isSubActive(sub.href);
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          style={{
                            ...itemBase,
                            padding: '10px 14px',
                            fontSize: '13px',
                            ...(active ? activeStyle(sub.color) : {}),
                          }}
                          onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background='rgba(0,242,255,0.04)'; (e.currentTarget as HTMLElement).style.color='#a0b8cc'; } }}
                          onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='#5a7090'; } }}
                        >
                          <span style={iconBox(sub.color, active)}>
                            <sub.Icon />
                          </span>
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          /* ── Regular item ── */
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ ...itemBase, ...(active ? activeStyle() : {}) }}
              onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background='rgba(0,242,255,0.05)'; (e.currentTarget as HTMLElement).style.color='#a0b8cc'; } }}
              onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='#5a7090'; } }}
            >
              <span style={iconBox('#00f2ff', active)}>
                <item.Icon />
              </span>
              {item.label}
            </Link>
          );
        })}

        <div style={{ margin:'8px 6px', borderTop:'1px solid rgba(0,242,255,0.06)' }} />

        {/* Logout */}
        <Link
          href="/logout"
          style={{ ...itemBase, color:'rgba(255,0,85,0.5)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background='rgba(255,0,85,0.06)'; (e.currentTarget as HTMLElement).style.color='#ff0055'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='rgba(255,0,85,0.5)'; }}
        >
          <span style={{ ...iconBox('#ff0055', false), border:'1px solid rgba(255,0,85,0.2)' }}>
            <BsPower />
          </span>
          ออกจากระบบ
        </Link>
      </nav>

      {/* ── Live Score ── */}
      <div style={{ padding:'12px 10px', borderTop:'1px solid rgba(0,242,255,0.07)', background:'rgba(0,0,0,0.18)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px', padding:'0 6px' }}>
          <BsCircleFill style={{ fontSize:'8px', color:'#00ff88', filter:'drop-shadow(0 0 4px #00ff88)', animation:'neon-pulse 1.5s ease-in-out infinite' }} />
          <span style={{ fontSize:'11px', fontWeight:700, color:'#4a6080', letterSpacing:'0.5px' }}>Live Score</span>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {liveMatches.map((m, i) => (
            <div
              key={i}
              style={{
                padding:'10px 12px', borderRadius:'12px',
                background:'rgba(13,21,38,0.8)',
                border:'1px solid rgba(0,242,255,0.08)',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ fontSize:'10px', color:'#2e4060', marginBottom:'7px', letterSpacing:'0.3px' }}>{m.league}</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'4px' }}>
                {/* Home */}
                <div style={{ display:'flex', alignItems:'center', gap:'6px', flex:1 }}>
                  <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:m.homeColor, boxShadow:`0 0 7px ${m.homeColor}80`, flexShrink:0 }} />
                  <span style={{ fontSize:'11px', fontWeight:600, color:'#9ab0c8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.home}</span>
                </div>
                {/* Score */}
                <span style={{
                  fontSize:'13px', fontWeight:800, padding:'3px 10px', borderRadius:'8px', letterSpacing:'1px', flexShrink:0,
                  background: m.live ? 'rgba(0,255,136,0.1)' : 'rgba(0,242,255,0.07)',
                  color: m.live ? '#00ff88' : '#00f2ff',
                  border: m.live ? '1px solid rgba(0,255,136,0.25)' : '1px solid rgba(0,242,255,0.18)',
                }}>
                  {m.score}
                </span>
                {/* Away */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'6px', flex:1 }}>
                  <span style={{ fontSize:'11px', fontWeight:600, color:'#9ab0c8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', textAlign:'right' }}>{m.away}</span>
                  <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:m.awayColor, boxShadow:`0 0 7px ${m.awayColor}80`, flexShrink:0 }} />
                </div>
              </div>
              {m.live && (
                <div style={{ textAlign:'center', marginTop:'6px', fontSize:'10px', color:'#00ff88', fontWeight:700, letterSpacing:'1.5px' }}>
                  ● LIVE
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
