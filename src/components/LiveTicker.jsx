import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Trophy, Shield, Activity, Calendar } from 'lucide-react';

export default function LiveTicker() {
  const { totalPlayers, playerOfTheWeek, players } = useApp();
  const potwPlayer = players.find(p => p.id === playerOfTheWeek?.playerId);

  const tickerItems = [
    `★ ALL STARS ACADEMY OFFICIAL`,
    `ACTIVE SQUAD: ${totalPlayers} TALENTS`,
    `SPOTLIGHT CAROUSEL: 15-SEC AUTO ROTATION`,
    `PLAYER OF THE WEEK: ${potwPlayer?.name?.toUpperCase() || 'NOT SELECTED'}`,
    `TRAINING DAYS: TUESDAYS, THURSDAYS & SATURDAY MORNINGS`,
    `TRIALS REGISTRATION: WHATSAPP DIRECT TO COACH`,
    `TACTICAL FIRST ELEVEN SQUAD ACTIVE`,
    `CHAMPIONSHIP TROPHY CABINET UPDATED`,
  ];

  return (
    <div className="w-full bg-[#050609] border-y border-[#181d28] py-2 overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-[11px] font-mono tracking-widest text-slate-400 font-semibold">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <span key={idx} className="flex items-center gap-3">
            <span className="text-[#cba358]">◆</span>
            <span className="hover:text-[#f3df9b] transition-colors">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
