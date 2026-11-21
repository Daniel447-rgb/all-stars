import React from 'react';
import { useApp } from '../context/AppContext';
import { Crown, Sparkles, Activity, Zap, Award, Flame, Quote, ArrowRight } from 'lucide-react';

export default function PlayerOfTheWeek() {
  const { players, playerOfTheWeek, setSelectedPlayerModal } = useApp();

  const potwPlayer = players.find(p => p.id === playerOfTheWeek?.playerId) || players[0];

  if (!potwPlayer) return null;

  return (
    <section id="player-of-the-week" className="py-24 bg-[#07090e] relative overflow-hidden border-b border-[#181d28] w-full">
      
      {/* Mature Brushed Gold Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#cba358]/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Fullscreen Padding */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cba358]/10 border border-[#cba358]/30 text-[#f3df9b] text-[11px] font-black uppercase tracking-[0.2em] mb-3">
            <Crown className="w-4 h-4 text-[#cba358]" />
            <span>Weekly Excellence Reward</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            Player Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3df9b] via-[#cba358] to-[#99732b]">The Week</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Rewarding commitment, work ethic, and matchday heroics throughout our academy ranks.
          </p>
        </div>

        {/* Featured POTW Showcase Card */}
        <div className="max-w-5xl mx-auto relative group">
          
          {/* Subtle Golden Halo */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#cba358] via-[#e5c07b] to-[#8e6d2b] rounded-3xl blur-xl opacity-25 group-hover:opacity-45 transition duration-700" />

          <div className="relative bg-[#0d1017] rounded-3xl border border-[#262f44] p-6 sm:p-10 shadow-2xl overflow-hidden card-sheen">
            
            {/* Top Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1b212f] pb-5 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#cba358] to-[#8e6d2b] text-[#07090e] flex items-center justify-center shadow-lg font-black">
                  <Award className="w-5 h-5 text-[#07090e]" />
                </span>
                <div>
                  <h3 className="font-black text-base text-white tracking-wide">
                    {playerOfTheWeek.weekTitle || 'Gameweek MVP'}
                  </h3>
                  <span className="text-xs font-semibold text-[#cba358] font-mono">
                    {playerOfTheWeek.dateRange || 'Current Matchweek'}
                  </span>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-[#cba358]/10 border border-[#cba358]/30 text-[#f3df9b] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#cba358] animate-spin" />
                <span>{playerOfTheWeek.badgeText || 'STAR OF THE WEEK'}</span>
              </div>
            </div>

            {/* Main Grid: Player Photo & Accolade Info */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Player Card Visual */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-[#262f44] shadow-2xl bg-[#07090e] group/pic">
                  <img
                    src={potwPlayer.photoUrl}
                    alt={potwPlayer.name}
                    className="w-full h-84 sm:h-[420px] object-cover object-top group-hover/pic:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-black/30" />

                  {/* Crown Icon at top */}
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-[#07090e]/85 backdrop-blur-md border border-[#cba358]/40 flex items-center justify-center shadow-xl">
                    <Crown className="w-5 h-5 text-[#f3df9b]" />
                  </div>

                  {/* Jersey & Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#cba358] to-[#8e6d2b] text-[#07090e] font-black font-mono text-base flex items-center justify-center shadow-lg">
                      #{potwPlayer.jerseyNumber}
                    </div>
                  </div>

                  {/* Player Name Banner */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#07090e]/95 backdrop-blur-md p-4 rounded-2xl border border-[#1b212f]">
                    <h4 className="font-black text-xl text-white truncate">
                      {potwPlayer.name}
                    </h4>
                    <p className="text-xs font-bold text-[#cba358] uppercase tracking-wider">
                      {potwPlayer.position} • {potwPlayer.subPosition || 'Star Prospect'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Weekly Stats, Highlight, Coach Tribute */}
              <div className="md:col-span-7 space-y-5">
                
                {/* Match Highlight */}
                <div className="bg-[#07090e] p-5 rounded-2xl border border-[#1b212f]">
                  <div className="text-xs font-black text-[#cba358] uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#cba358]" /> Matchweek Standout Performance
                  </div>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
                    {playerOfTheWeek.matchHighlight}
                  </p>
                </div>

                {/* Key Attributes Bar for POTW */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#07090e] p-3.5 rounded-2xl border border-[#1b212f] text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Stamina Output</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono">{potwPlayer.stamina}%</span>
                    <div className="w-full bg-[#131722] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${potwPlayer.stamina}%` }} />
                    </div>
                  </div>

                  <div className="bg-[#07090e] p-3.5 rounded-2xl border border-[#1b212f] text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Dribble Success</span>
                    <span className="text-2xl font-black text-[#f3df9b] font-mono">{potwPlayer.dribbling}%</span>
                    <div className="w-full bg-[#131722] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-[#cba358] h-full rounded-full" style={{ width: `${potwPlayer.dribbling}%` }} />
                    </div>
                  </div>

                  <div className="bg-[#07090e] p-3.5 rounded-2xl border border-[#1b212f] text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Agility Agility</span>
                    <span className="text-2xl font-black text-cyan-400 font-mono">{potwPlayer.agility}%</span>
                    <div className="w-full bg-[#131722] h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${potwPlayer.agility}%` }} />
                    </div>
                  </div>
                </div>

                {/* Coach Remark Quote */}
                <div className="relative bg-[#07090e] p-5 rounded-2xl border border-[#cba358]/20">
                  <Quote className="w-7 h-7 text-[#cba358]/25 absolute top-3 right-3" />
                  <span className="text-[11px] font-black uppercase text-[#cba358] tracking-widest block mb-1">
                    Coach's Official Commendation
                  </span>
                  <p className="text-xs sm:text-sm italic text-slate-300 leading-relaxed pr-6">
                    "{playerOfTheWeek.coachQuote}"
                  </p>
                </div>

                {/* Action button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPlayerModal(potwPlayer)}
                    className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#cba358] to-[#a88238] hover:from-[#d8b368] hover:to-[#b79044] text-[#07090e] shadow-xl shadow-[#cba358]/20 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>View {potwPlayer.name}'s Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
