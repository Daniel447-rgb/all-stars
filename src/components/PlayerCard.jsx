import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, Zap, Sparkles, Wind, Crosshair, Target, Shield } from 'lucide-react';

export default function PlayerCard({ player }) {
  const { setSelectedPlayerModal } = useApp();

  return (
    <div 
      onClick={() => setSelectedPlayerModal(player)}
      className="group relative bg-[#0d1017] rounded-3xl overflow-hidden border border-[#1b212f] hover:border-[#cba358]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#cba358]/10 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between card-sheen"
    >
      {/* Top Banner / Card Head */}
      <div className="relative h-64 w-full overflow-hidden bg-[#07090e]">
        <img
          src={player.photoUrl}
          alt={player.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Shading gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-transparent to-[#07090e]/70" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl text-xs font-black font-mono bg-[#07090e]/85 backdrop-blur-md text-[#f3df9b] border border-[#cba358]/30 shadow-md">
            #{player.jerseyNumber}
          </span>
          <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-[#07090e]/85 backdrop-blur-md text-slate-300 border border-[#1e2536]">
            {player.position}
          </span>
        </div>

        {/* Rating & Starting XI indicator */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#cba358] to-[#8e6d2b] text-[#07090e] font-black font-mono text-base flex flex-col items-center justify-center shadow-xl border border-[#f3df9b]/30 leading-none">
            <span>{player.overall}</span>
            <span className="text-[7px] uppercase font-sans font-black tracking-tighter">OVR</span>
          </div>
          {player.isStartingXI && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow">
              Starting XI
            </span>
          )}
        </div>

        {/* Player Name at bottom of image */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-xl font-black text-white tracking-wide truncate group-hover:text-[#f3df9b] transition-colors">
            {player.name}
          </h3>
          <p className="text-xs font-semibold text-slate-400">
            {player.subPosition || player.position} • {player.age} yrs
          </p>
        </div>
      </div>

      {/* Skills Showcase Section */}
      <div className="p-5 space-y-3.5 bg-[#0d1017] flex-1 flex flex-col justify-between">
        
        {/* Core Attributes Bars (Stamina, Dribble, Agility) */}
        <div className="space-y-2.5">
          
          {/* Stamina */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Stamina
              </span>
              <span className="font-mono font-bold text-emerald-400">
                {player.stamina}%
              </span>
            </div>
            <div className="w-full bg-[#131722] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${player.stamina}%` }}
              />
            </div>
          </div>

          {/* Dribbling */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#cba358]" /> Dribbling
              </span>
              <span className="font-mono font-bold text-[#f3df9b]">
                {player.dribbling}%
              </span>
            </div>
            <div className="w-full bg-[#131722] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#99732b] via-[#cba358] to-[#f3df9b] h-full rounded-full transition-all duration-700"
                style={{ width: `${player.dribbling}%` }}
              />
            </div>
          </div>

          {/* Agility */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Agility
              </span>
              <span className="font-mono font-bold text-cyan-400">
                {player.agility}%
              </span>
            </div>
            <div className="w-full bg-[#131722] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${player.agility}%` }}
              />
            </div>
          </div>

        </div>

        {/* Secondary Stats Grid: Pace, Passing, Shooting */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#181d28] text-center">
          <div className="bg-[#07090e] p-2 rounded-xl border border-[#1a202c]">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Pace</span>
            <span className="text-xs font-mono font-bold text-white">{player.pace}%</span>
          </div>
          <div className="bg-[#07090e] p-2 rounded-xl border border-[#1a202c]">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Pass</span>
            <span className="text-xs font-mono font-bold text-white">{player.passing}%</span>
          </div>
          <div className="bg-[#07090e] p-2 rounded-xl border border-[#1a202c]">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Shot</span>
            <span className="text-xs font-mono font-bold text-white">{player.shooting}%</span>
          </div>
        </div>

        {/* View Profile Action Link */}
        <div className="pt-2 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#cba358] group-hover:text-[#f3df9b] transition-colors inline-flex items-center gap-1">
            Scout Report & Dossier →
          </span>
        </div>

      </div>
    </div>
  );
}
