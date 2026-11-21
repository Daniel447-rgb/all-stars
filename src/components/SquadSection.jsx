import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import PlayerCard from './PlayerCard';
import { Users, Search, Filter, Sparkles, Shield, UserPlus } from 'lucide-react';

export default function SquadSection() {
  const { players, totalPlayers } = useApp();
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const positions = ['All', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'];

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesPos = 
        selectedPosition === 'All' || 
        player.position?.toLowerCase() === selectedPosition.toLowerCase();
      
      const matchesSearch = 
        player.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(player.jerseyNumber).includes(searchQuery);

      return matchesPos && matchesSearch;
    });
  }, [players, selectedPosition, searchQuery]);

  const getCount = (pos) => {
    if (pos === 'All') return players.length;
    return players.filter(p => p.position?.toLowerCase() === pos.toLowerCase()).length;
  };

  return (
    <section id="squad" className="py-24 bg-[#07090e] relative border-b border-[#181d28] w-full">
      
      {/* Mature Ambient Backdrop */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#cba358]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Fullscreen Width Padding */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-20 relative z-10">
        
        {/* Section Header with Total Player Counter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cba358]/10 border border-[#cba358]/30 text-[#f3df9b] text-[11px] font-black uppercase tracking-[0.2em] mb-3">
              <Users className="w-3.5 h-3.5 text-[#cba358]" />
              <span>Academy Roster</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              Official Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3df9b] via-[#cba358] to-[#99732b]">Squad</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Inspect technical attributes, stamina benchmarks, dribbling ratings, and profiles of all our active academy talents.
            </p>
          </div>

          {/* Prominent Total Player Counter Badge with mature gold trim */}
          <div className="bg-gradient-to-r from-[#cba358]/25 via-[#cba358]/10 to-transparent p-0.5 rounded-3xl border border-[#cba358]/30 shadow-2xl">
            <div className="bg-[#0d1017]/95 backdrop-blur-xl px-7 py-5 rounded-[22px] flex items-center gap-5 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#cba358] to-[#8e6d2b] text-[#07090e] flex items-center justify-center font-black text-3xl font-mono shadow-xl border border-[#f3df9b]/30">
                {totalPlayers}
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-[#cba358] tracking-widest block">
                  Active Roster
                </span>
                <span className="text-xl font-black text-white tracking-wide">
                  Total Players in Academy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-[#0d1017] p-3 rounded-2xl border border-[#1b212f]">
          
          {/* Position Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {positions.map((pos) => {
              const count = getCount(pos);
              const isActive = selectedPosition === pos;
              return (
                <button
                  key={pos}
                  onClick={() => setSelectedPosition(pos)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#cba358] to-[#a88238] text-[#07090e] shadow-lg font-black'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{pos === 'All' ? 'All Positions' : `${pos}s`}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-[#07090e]/20 text-[#07090e] font-black' : 'bg-[#131722] text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or number..."
              className="w-full bg-[#07090e] border border-[#1b212f] focus:border-[#cba358] rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Players Cards Grid with Fullscreen Expansion */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0d1017] rounded-3xl border border-[#1b212f]">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No players found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or position filter.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
