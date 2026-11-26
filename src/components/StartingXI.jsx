import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { User, Trophy } from 'lucide-react';

export default function StartingXI() {
  const {
    players,
    formation,
    formations,
    setFormation,
    moveStartingXI,
    setSelectedPlayerModal
  } = useApp();
  const draggedPlayerId = useRef(null);
  const currentCoords = formations[formation] || formations['4-3-3'];
  const starterPlayers = players.filter(p => p.isStartingXI);
  const benchPlayers = players.filter(p => !p.isStartingXI);

  const getPlayerInSlot = (slotKey) => {
    return players.find(p => p.isStartingXI && p.startingSlot === slotKey);
  };

  return (
    <section id="starting-xi" className="py-24 bg-[#0a0d14] relative border-b border-[#181d28] w-full">
      
      {/* Mature Ambient Backdrop */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#0e301c]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Fullscreen Width */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-[0.2em] mb-3">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tactical Blueprint</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            Starting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Eleven Squad</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            The coach's first-choice tactical lineup on matchdays. Drag players to switch positions or click to inspect their attributes.
          </p>

          {/* Formation Switcher */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-[#07090e] border border-[#1b212f] gap-1.5">
            {Object.keys(formations).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormation(fmt)}
                className={`px-5 py-2 rounded-xl text-xs font-black font-mono transition-all duration-200 cursor-pointer ${
                  formation === fmt
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-[#07090e] shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* The Football Pitch Container (Maximized Fluid Width) */}
        <div className="max-w-5xl mx-auto">
          
          <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.5] md:aspect-[4/3.8] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1b251e] pitch-mature-grass">
            
            {/* Pitch Markings SVG overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect x="5%" y="4%" width="90%" height="92%" fill="none" stroke="#fff" strokeWidth="2.5" />
                <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="#fff" strokeWidth="2" />
                <circle cx="50%" cy="50%" r="13%" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="50%" cy="50%" r="4" fill="#fff" />

                <rect x="25%" y="4%" width="50%" height="18%" fill="none" stroke="#fff" strokeWidth="2" />
                <rect x="37%" y="4%" width="26%" height="7%" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="50%" cy="13%" r="3" fill="#fff" />
                <path d="M 42 22 A 15 15 0 0 0 58 22" fill="none" stroke="#fff" strokeWidth="2" />

                <rect x="25%" y="78%" width="50%" height="18%" fill="none" stroke="#fff" strokeWidth="2" />
                <rect x="37%" y="89%" width="26%" height="7%" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="50%" cy="87%" r="3" fill="#fff" />
                
                <path d="M 5% 7% A 3% 3% 0 0 0 8% 4%" fill="none" stroke="#fff" strokeWidth="2" />
                <path d="M 92% 4% A 3% 3% 0 0 0 95% 7%" fill="none" stroke="#fff" strokeWidth="2" />
                <path d="M 5% 93% A 3% 3% 0 0 1 8% 96%" fill="none" stroke="#fff" strokeWidth="2" />
                <path d="M 92% 96% A 3% 3% 0 0 1 95% 93%" fill="none" stroke="#fff" strokeWidth="2" />
              </svg>
            </div>

            {/* Starter Pins Rendered on Pitch with Floating/Hover Animations */}
            {Object.entries(currentCoords).map(([slotKey, coord]) => {
              const player = getPlayerInSlot(slotKey);

              return (
                <div
                  key={slotKey}
                  style={{ top: coord.top, left: coord.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    const playerId = draggedPlayerId.current || event.dataTransfer.getData('text/plain');
                    if (playerId) moveStartingXI(playerId, slotKey);
                    draggedPlayerId.current = null;
                  }}
                >
                  {player ? (
                    <button
                      onClick={() => setSelectedPlayerModal(player)}
                      draggable
                      onDragStart={(event) => {
                        draggedPlayerId.current = player.id;
                        event.dataTransfer.effectAllowed = 'move';
                        event.dataTransfer.setData('text/plain', player.id);
                      }}
                      onDragEnd={() => {
                        draggedPlayerId.current = null;
                      }}
                      className="flex flex-col items-center focus:outline-none transition-all duration-300 hover:scale-125 cursor-grab active:cursor-grabbing"
                    >
                      {/* Avatar with mature gold border */}
                      <div className="relative">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#cba358] via-[#f3df9b] to-[#8e6d2b] shadow-2xl shadow-black/80">
                          <img
                            src={player.photoUrl}
                            alt={player.name}
                            className="w-full h-full object-cover rounded-full bg-[#07090e]"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>

                        {/* Jersey Number Badge */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#07090e] text-[#f3df9b] font-mono text-[10px] font-black flex items-center justify-center border border-[#cba358] shadow">
                          {player.jerseyNumber}
                        </div>

                        {/* OVR Rating Badge */}
                        <div className="absolute -top-1 -left-1 px-1.5 py-0.2 rounded-md bg-[#cba358] text-[#07090e] font-black text-[9px] shadow">
                          {player.overall}
                        </div>
                      </div>

                      {/* Surname Label */}
                      <div className="mt-1 bg-[#07090e]/95 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-[#1b212f] text-center shadow-xl max-w-[95px] sm:max-w-[120px]">
                        <span className="block text-[11px] sm:text-xs font-black text-white truncate leading-tight">
                          {player.name.split(' ').pop()}
                        </span>
                        <span className="block text-[9px] font-bold text-emerald-400 uppercase tracking-tighter">
                          {slotKey}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div className="flex flex-col items-center opacity-60">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-slate-400 bg-black/60 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="mt-1 text-[10px] font-bold text-slate-300 bg-black/80 px-1.5 py-0.5 rounded">
                        {slotKey}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

          </div>

          {/* Lineup Roster Summary Bar */}
          <div className="mt-8 bg-[#0d1017] rounded-3xl p-6 border border-[#1b212f] shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#181d28] pb-4">
              <div>
                <h3 className="font-black text-base text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  First Choice Matchday Lineup ({starterPlayers.length}/11)
                </h3>
                <p className="text-xs text-slate-400">
                  Formation: {formation} • Bench reserves ready for tactical rotation
                </p>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                <span className="text-[#f3df9b] font-bold font-mono">{benchPlayers.length}</span> reserves on bench
              </div>
            </div>

            {/* Quick Starter Avatars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
              {starterPlayers.map((player) => (
                <button
                  key={player.id}
                  onClick={() => setSelectedPlayerModal(player)}
                  className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#07090e] hover:bg-[#131722] border border-[#1a202c] hover:border-emerald-500/40 transition-all text-left group cursor-pointer"
                >
                  <img
                    src={player.photoUrl}
                    alt={player.name}
                    className="w-10 h-10 rounded-xl object-cover bg-black shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                      {player.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono font-semibold">
                      #{player.jerseyNumber} • {player.startingSlot || player.position}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
