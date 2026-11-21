import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, 
  Menu, 
  X, 
  UserCheck, 
  Lock, 
  MessageSquare, 
  Users, 
  Trophy, 
  Award,
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function Navbar({ onOpenAdmin, onOpenAuth }) {
  const { isAdmin, totalPlayers, clubSettings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fullscreen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const navLinks = [
    { name: 'Showcase', href: '#home' },
    { name: 'Squad Roster', href: '#squad', badge: `${totalPlayers}` },
    { name: 'Starting XI', href: '#starting-xi' },
    { name: 'Player of Week', href: '#player-of-the-week', highlight: true },
    { name: 'Honors', href: '#achievements' },
    { name: 'Join Team', href: '#join', cta: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-[#1a202c] transition-all duration-300 w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Academy Name */}
          <a href="#home" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#f3df9b] via-[#cba358] to-[#8e6d2b] p-0.5 shadow-xl shadow-[#cba358]/10 group-hover:shadow-[#cba358]/25 transition-all duration-300">
              <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#cba358] group-hover:scale-110 transition-transform duration-200" />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gradient-to-r from-[#f3df9b] to-[#cba358] rounded-full flex items-center justify-center text-[7px] font-black text-[#07090e] shadow">
                ★
              </div>
            </div>

            <div className="flex flex-col text-left">
              <span className="font-extrabold text-sm sm:text-xl tracking-wide sm:tracking-wider uppercase text-white group-hover:text-[#f3df9b] transition-colors flex items-center gap-1 sm:gap-2">
                ALL Stars <span className="hidden sm:inline text-transparent bg-clip-text bg-gradient-to-r from-[#f3df9b] to-[#cba358]">Academy</span>
              </span>
              <span className="hidden sm:block text-[9px] tracking-[0.25em] text-slate-400 uppercase font-semibold">
                Elite Football Development
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  link.cta
                    ? 'bg-gradient-to-r from-[#cba358] to-[#a88238] hover:from-[#d8b368] hover:to-[#b79044] text-[#07090e] font-black shadow-lg shadow-[#cba358]/15 ml-3'
                    : link.highlight
                    ? 'text-[#f3df9b] hover:bg-[#cba358]/10 border border-[#cba358]/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#131722] text-[#f3df9b] font-mono font-bold border border-[#232a3b]">
                    {link.badge}
                  </span>
                )}
                {link.highlight && (
                  <Sparkles className="w-3 h-3 text-[#cba358] animate-pulse" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Controls: Fullscreen Toggle, WhatsApp & Admin */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Fullscreen Display Toggle */}
            <button
              onClick={toggleFullScreen}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-[#0e121a] hover:bg-[#151b27] border border-[#1e2536] transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Display Mode"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-[#cba358]" />
                  <span className="text-[11px] font-mono">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-[#cba358]" />
                  <span className="text-[11px] font-mono">Fullscreen</span>
                </>
              )}
            </button>

            {/* Quick Coach WhatsApp Button */}
            <a
              href={`https://wa.me/${clubSettings.coachWhatsapp?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Coach Adekunle, I would like to inquire about ALL Stars Academy trials.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase bg-[#0c1f14] text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-200"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Coach WhatsApp</span>
            </a>

            {/* Admin Entry */}
            {isAdmin ? (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#cba358] to-[#99732b] hover:from-[#d8b368] hover:to-[#a88238] text-[#07090e] shadow-lg shadow-[#cba358]/20 transition-all cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-[#0e121a] hover:bg-[#151b27] border border-[#1e2536] transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#cba358]" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleFullScreen}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#0e121a] border border-[#1e2536]"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#cba358]" /> : <Maximize2 className="w-4 h-4 text-[#cba358]" />}
            </button>

            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#cba358] text-[#07090e] flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#0e121a] border border-[#1e2536]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07090e] border-b border-[#1a202c] px-4 pt-3 pb-6 space-y-2 animate-slide-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider ${
                link.cta
                  ? 'bg-gradient-to-r from-[#cba358] to-[#a88238] text-[#07090e] text-center'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-[#131722] text-[#f3df9b] font-mono">
                    {link.badge} Players
                  </span>
                )}
              </div>
            </a>
          ))}

          <div className="pt-4 border-t border-[#1a202c] flex flex-col gap-2">
            <a
              href={`https://wa.me/${clubSettings.coachWhatsapp?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Coach Adekunle, I would like to inquire about joining ALL Stars Academy.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Coach on WhatsApp</span>
            </a>

            {!isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-[#0e121a] border border-[#1e2536]"
              >
                <Lock className="w-3.5 h-3.5 text-[#cba358]" />
                <span>Staff Portal</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
