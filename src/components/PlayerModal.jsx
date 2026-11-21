import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Activity, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Calendar, 
  User, 
  Flame,
  Target
} from 'lucide-react';

export default function PlayerModal() {
  const { selectedPlayerModal, setSelectedPlayerModal } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPlayerModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedPlayerModal]);

  if (!selectedPlayerModal) return null;

  const p = selectedPlayerModal;

  const statItems = [
    { label: 'Stamina', val: p.stamina, icon: Activity, color: 'from-emerald-600 to-emerald-400', text: 'text-emerald-400' },
    { label: 'Dribbling', val: p.dribbling, icon: Zap, color: 'from-[#99732b] to-[#f3df9b]', text: 'text-[#f3df9b]' },
    { label: 'Agility', val: p.agility, icon: Sparkles, color: 'from-cyan-600 to-cyan-400', text: 'text-cyan-400' },
    { label: 'Pace / Sprint', val: p.pace, icon: Flame, color: 'from-rose-600 to-orange-400', text: 'text-rose-400' },
    { label: 'Passing Vision', val: p.passing, icon: Target, color: 'from-indigo-600 to-purple-400', text: 'text-indigo-400' },
    { label: 'Shooting & Finish', val: p.shooting, icon: Award, color: 'from-amber-600 to-yellow-400', text: 'text-amber-300' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-slide-in">
      
      {/* Background dismissal overlay */}
      <div 
        className="absolute inset-0" 
        onClick={() => setSelectedPlayerModal(null)}
      />

      <div className="relative w-full max-w-2xl bg-[#0d1017] border border-[#262f44] rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-[#1b212f] bg-[#07090e]/95">
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#cba358] to-[#8e6d2b] text-[#07090e] font-black font-mono text-xl flex items-center justify-center shadow-lg">
              #{p.jerseyNumber}
            </span>
            <div>
              <h3 className="font-black text-2xl text-white">
                {p.name}
              </h3>
              <p className="text-xs font-bold text-[#cba358] uppercase tracking-wider">
                {p.position} • {p.subPosition || 'Squad Member'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedPlayerModal(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Top Banner: Photo & Quick Physical Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            <div className="sm:col-span-5 flex justify-center">
              <div className="relative w-48 h-56 rounded-2xl overflow-hidden border border-[#262f44] shadow-xl bg-[#07090e]">
                <img
                  src={p.photoUrl}
                  alt={p.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg bg-[#cba358] text-[#07090e] font-black text-xs font-mono shadow">
                  {p.overall} OVR
                </div>
              </div>
            </div>

            <div className="sm:col-span-7 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#07090e] p-3 rounded-xl border border-[#1b212f]">
                  <span className="text-slate-400 block font-semibold">Age:</span>
                  <span className="text-white font-bold">{p.age || 18} Years Old</span>
                </div>
                <div className="bg-[#07090e] p-3 rounded-xl border border-[#1b212f]">
                  <span className="text-slate-400 block font-semibold">Dominant Foot:</span>
                  <span className="text-white font-bold">{p.preferredFoot || 'Right'}</span>
                </div>
                <div className="bg-[#07090e] p-3 rounded-xl border border-[#1b212f]">
                  <span className="text-slate-400 block font-semibold">Height:</span>
                  <span className="text-white font-bold">{p.height || "5'11\" (180cm)"}</span>
                </div>
                <div className="bg-[#07090e] p-3 rounded-xl border border-[#1b212f]">
                  <span className="text-slate-400 block font-semibold">Squad Role:</span>
                  <span className="text-emerald-400 font-bold">
                    {p.isStartingXI ? `Starting XI (${p.startingSlot || 'XI'})` : 'Squad Rotation'}
                  </span>
                </div>
              </div>

              {/* Match Stats */}
              <div className="bg-[#07090e] p-3.5 rounded-xl border border-[#1b212f] grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Apps</span>
                  <span className="text-lg font-black text-white font-mono">{p.appearances || 0}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Goals</span>
                  <span className="text-lg font-black text-[#f3df9b] font-mono">{p.goals || 0}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Assists</span>
                  <span className="text-lg font-black text-cyan-400 font-mono">{p.assists || 0}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Full Scouting Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Player Scouting Assessment
            </h4>
            <div className="bg-[#07090e] p-5 rounded-2xl border border-[#1b212f] text-slate-300 text-xs sm:text-sm leading-relaxed">
              "{p.bio || 'High-potential academy talent displaying technical diligence, disciplined positioning, and rapid physical progression under academy coaching.'}"
            </div>
          </div>

          {/* Technical Skills Assessment */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5 flex items-center justify-between">
              <span>Technical & Athletic Breakdown</span>
              <span className="text-[#cba358] text-[11px] font-mono font-bold">Max 100%</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statItems.map((st) => {
                const IconComponent = st.icon;
                return (
                  <div key={st.label} className="bg-[#07090e] p-3.5 rounded-xl border border-[#1b212f]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <IconComponent className={`w-3.5 h-3.5 ${st.text}`} />
                        {st.label}
                      </span>
                      <span className={`font-mono font-bold ${st.text}`}>
                        {st.val}%
                      </span>
                    </div>

                    <div className="w-full bg-[#131722] h-2 rounded-full overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${st.color} h-full rounded-full transition-all duration-700`}
                        style={{ width: `${st.val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#07090e]/95 border-t border-[#1b212f] flex justify-end">
          <button
            onClick={() => setSelectedPlayerModal(null)}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#171c28] hover:bg-[#202738] text-white transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
