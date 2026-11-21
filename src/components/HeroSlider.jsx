import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Zap, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck,
  Award,
  Flame,
  Target
} from 'lucide-react';

export default function HeroSlider() {
  const { players, setSelectedPlayerModal, clubSettings } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const INTERVAL_SECONDS = clubSettings.heroSlideIntervalSec || 15;
  const [secondsRemaining, setSecondsRemaining] = useState(INTERVAL_SECONDS);
  const progressTimerRef = useRef(null);

  const activePlayer = players && players.length > 0 ? players[currentIndex] : null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % players.length);
    setProgress(0);
    setSecondsRemaining(INTERVAL_SECONDS);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + players.length) % players.length);
    setProgress(0);
    setSecondsRemaining(INTERVAL_SECONDS);
  };

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
    setProgress(0);
    setSecondsRemaining(INTERVAL_SECONDS);
  };

  // 30-second interval with smooth countdown
  useEffect(() => {
    if (!isPlaying || !players.length) return;

    const tickMs = 100;
    const totalTicks = (INTERVAL_SECONDS * 1000) / tickMs;
    let ticks = 0;

    progressTimerRef.current = setInterval(() => {
      ticks++;
      const currentProgress = (ticks / totalTicks) * 100;
      setProgress(currentProgress);

      const remaining = Math.max(0, Math.ceil(INTERVAL_SECONDS - (ticks * tickMs) / 1000));
      setSecondsRemaining(remaining);

      if (ticks >= totalTicks) {
        ticks = 0;
        setCurrentIndex((prev) => (prev + 1) % players.length);
        setProgress(0);
        setSecondsRemaining(INTERVAL_SECONDS);
      }
    }, tickMs);

    return () => clearInterval(progressTimerRef.current);
  }, [isPlaying, currentIndex, players.length, INTERVAL_SECONDS]);

  if (!activePlayer) return null;

  return (
    <section id="home" className="relative min-h-[94vh] lg:min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#07090e] via-[#0b0e15] to-[#07090e] border-b border-[#181d28] carbon-grain">
      
      {/* Mature Atmospheric Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#cba358]/10 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#0f3822]/20 rounded-full blur-[120px]" />
      </div>

      {/* Full Screen Display Container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-20 py-12 lg:py-16 relative z-10">
        
        {/* 30-Second Rotation Progress Control Pill */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-[#0d1017]/90 backdrop-blur-xl px-5 py-3 rounded-2xl border border-[#1e2536] max-w-2xl shadow-2xl">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cba358] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#cba358]"></span>
            </span>
            <span className="text-[#f3df9b] font-black uppercase tracking-widest text-[11px]">
              Spotlight Rotation
            </span>
            <span className="text-slate-400 font-mono text-[11px]">Auto-switches every 15s</span>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Progress line */}
            <div className="w-32 bg-[#171c28] h-2 rounded-full overflow-hidden p-0.5 border border-[#262f44]">
              <div 
                className="bg-gradient-to-r from-[#cba358] via-[#e5c07b] to-[#f3df9b] h-full rounded-full transition-all duration-100 ease-linear shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Countdown seconds */}
            <div className="flex items-center gap-1 font-mono text-xs font-black text-[#f3df9b]">
              <Clock className="w-3 h-3 text-[#cba358]" />
              <span>{secondsRemaining}s</span>
            </div>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a202c] transition-colors cursor-pointer"
              title={isPlaying ? "Pause 30s timer" : "Resume 30s timer"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Fullscreen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Academy Creed & Featured Player Technical Dossier */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cba358]/10 border border-[#cba358]/30 text-[#f3df9b] text-[11px] font-black uppercase tracking-[0.2em] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#cba358]" />
              <span>Elite Talent Showcase</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              Forging The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3df9b] via-[#cba358] to-[#99732b]">
                Next Generation
              </span> <br />
              Of Football Royalty.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base xl:text-lg max-w-2xl leading-relaxed">
              Welcome to <strong className="text-white">ALL Stars Academy</strong>. Precision technique, boundless physical stamina, and championship discipline forged on the training pitch.
            </p>

            {/* Active Player Live Highlight Card (Animated) */}
            <div 
              key={activePlayer.id}
              className="animate-slide-in bg-[#0d1017]/90 backdrop-blur-xl border border-[#1e2536] rounded-3xl p-6 shadow-2xl space-y-5 text-left card-sheen"
            >
              <div className="flex items-center justify-between border-b border-[#1b212f] pb-4">
                <div className="flex items-center gap-3.5">
                  <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#cba358] to-[#8e6d2b] text-[#07090e] font-black text-xl flex items-center justify-center font-mono shadow-lg">
                    #{activePlayer.jerseyNumber}
                  </span>
                  <div>
                    <h3 className="font-black text-2xl text-white tracking-wide leading-tight">
                      {activePlayer.name}
                    </h3>
                    <p className="text-xs font-bold text-[#cba358] uppercase tracking-wider">
                      {activePlayer.position} • {activePlayer.subPosition || 'Star Prospect'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Scout Rating</div>
                  <div className="text-3xl font-black text-[#f3df9b] font-mono leading-none">
                    {activePlayer.overall} <span className="text-xs text-slate-500 font-sans font-bold">OVR</span>
                  </div>
                </div>
              </div>

              {/* Technical Skill Gauges (Stamina, Dribbling, Agility) */}
              <div className="grid grid-cols-3 gap-3.5">
                
                {/* Stamina */}
                <div className="bg-[#07090e]/80 p-3.5 rounded-2xl border border-[#1a202c]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" /> Stamina
                    </span>
                    <span className="font-mono font-black text-emerald-400">{activePlayer.stamina}%</span>
                  </div>
                  <div className="w-full bg-[#131722] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${activePlayer.stamina}%` }}
                    />
                  </div>
                </div>

                {/* Dribbling */}
                <div className="bg-[#07090e]/80 p-3.5 rounded-2xl border border-[#1a202c]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#cba358]" /> Dribble
                    </span>
                    <span className="font-mono font-black text-[#f3df9b]">{activePlayer.dribbling}%</span>
                  </div>
                  <div className="w-full bg-[#131722] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#99732b] via-[#cba358] to-[#f3df9b] h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${activePlayer.dribbling}%` }}
                    />
                  </div>
                </div>

                {/* Agility */}
                <div className="bg-[#07090e]/80 p-3.5 rounded-2xl border border-[#1a202c]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Agility
                    </span>
                    <span className="font-mono font-black text-cyan-400">{activePlayer.agility}%</span>
                  </div>
                  <div className="w-full bg-[#131722] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${activePlayer.agility}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Bio quote */}
              <p className="text-xs text-slate-300 italic line-clamp-2 border-l-2 border-[#cba358] pl-3">
                "{activePlayer.bio}"
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#join"
                className="px-7 py-4 rounded-2xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#cba358] via-[#e5c07b] to-[#cba358] hover:from-[#d8b368] hover:to-[#b79044] text-[#07090e] shadow-xl shadow-[#cba358]/20 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Join The Team / Trials</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#squad"
                className="px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#0d1017] hover:bg-[#151a24] text-white border border-[#1e2536] transition-all"
              >
                View Full Squad ({players.length})
              </a>

              <button
                onClick={() => setSelectedPlayerModal(activePlayer)}
                className="px-4 py-4 rounded-2xl text-xs font-bold text-[#f3df9b] hover:text-white hover:bg-[#cba358]/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Full Scout Dossier</span>
              </button>
            </div>

          </div>

          {/* Right Column: Full-Height Cinematic Player Showcase with Animation */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Showcase Visual Card */}
            <div className="relative w-full max-w-md xl:max-w-lg group">
              
              {/* Outer Golden Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#cba358] via-[#e5c07b] to-[#8e6d2b] rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-700 animate-pulse-glow" />

              <div className="relative bg-[#0d1017] border border-[#262f44] rounded-3xl overflow-hidden shadow-2xl card-sheen">
                
                {/* Top Badge: Spotlight + Jersey */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase bg-[#07090e]/85 backdrop-blur-md text-[#f3df9b] border border-[#cba358]/30 shadow-lg flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#cba358]" />
                    Spotlight Star
                  </span>
                </div>

                <div className="absolute top-5 right-5 z-20">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#cba358] to-[#8e6d2b] text-[#07090e] font-black font-mono text-xl flex items-center justify-center shadow-lg border border-[#f3df9b]/40">
                    #{activePlayer.jerseyNumber}
                  </div>
                </div>

                {/* Main Player Image Container */}
                <div className="relative h-[420px] sm:h-[480px] xl:h-[520px] w-full overflow-hidden bg-[#07090e]">
                  <img
                    key={activePlayer.id}
                    src={activePlayer.photoUrl}
                    alt={activePlayer.name}
                    className="w-full h-full object-cover object-top transition-all duration-700 ease-out transform group-hover:scale-105 animate-slide-in"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-black/30" />
                </div>

                {/* Bottom Overlay on Card */}
                <div className="p-6 bg-[#07090e]/95 border-t border-[#1a202c] relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-2xl font-black text-white tracking-wide">
                        {activePlayer.name}
                      </h4>
                      <p className="text-xs font-bold text-[#cba358] uppercase tracking-widest">
                        {activePlayer.position} • {activePlayer.preferredFoot} Foot
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-3xl font-black text-[#f3df9b] font-mono">
                        {activePlayer.overall}
                      </span>
                      <span className="block text-[9px] text-slate-400 uppercase font-black tracking-widest">
                        Scout Score
                      </span>
                    </div>
                  </div>

                  {/* Stat Badges Strip */}
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#181d28] text-center">
                    <div className="bg-[#0d1017] p-2 rounded-xl border border-[#1b212f]">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Stamina</div>
                      <div className="text-sm font-black text-emerald-400 font-mono">{activePlayer.stamina}%</div>
                    </div>
                    <div className="bg-[#0d1017] p-2 rounded-xl border border-[#1b212f]">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Dribble</div>
                      <div className="text-sm font-black text-[#f3df9b] font-mono">{activePlayer.dribbling}%</div>
                    </div>
                    <div className="bg-[#0d1017] p-2 rounded-xl border border-[#1b212f]">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Agility</div>
                      <div className="text-sm font-black text-cyan-400 font-mono">{activePlayer.agility}%</div>
                    </div>
                    <div className="bg-[#0d1017] p-2 rounded-xl border border-[#1b212f]">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Pace</div>
                      <div className="text-sm font-black text-rose-400 font-mono">{activePlayer.pace}%</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Slider Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#07090e]/85 hover:bg-[#cba358] hover:text-[#07090e] text-white backdrop-blur-md border border-[#262f44] hover:border-[#cba358] shadow-2xl transition-all duration-200 cursor-pointer"
                aria-label="Previous Player"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#07090e]/85 hover:bg-[#cba358] hover:text-[#07090e] text-white backdrop-blur-md border border-[#262f44] hover:border-[#cba358] shadow-2xl transition-all duration-200 cursor-pointer"
                aria-label="Next Player"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Player Dots / Thumbnails Strip */}
            <div className="flex items-center gap-2 mt-6 max-w-full overflow-x-auto py-2 px-1">
              {players.slice(0, 9).map((player, idx) => (
                <button
                  key={player.id}
                  onClick={() => goToSlide(idx)}
                  className={`relative group rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'ring-2 ring-[#cba358] scale-110'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  title={`${player.name} (#${player.jerseyNumber})`}
                >
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#1a202c]"
                  />
                  {idx === currentIndex && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#cba358] rounded-full" />
                  )}
                </button>
              ))}
              {players.length > 9 && (
                <a
                  href="#squad"
                  className="text-[11px] font-bold text-slate-400 hover:text-[#f3df9b] px-2.5 py-1 bg-[#0d1017] rounded-full border border-[#1e2536]"
                >
                  +{players.length - 9} more
                </a>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
