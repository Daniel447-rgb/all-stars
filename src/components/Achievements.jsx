import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Medal, Award, ShieldCheck, Flame, Star, Sparkles } from 'lucide-react';

export default function Achievements() {
  const { achievements } = useApp();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Tournament Gold', 'National Finalist', 'Individual Honor', 'Excellence Award'];

  const filteredAchievements = achievements.filter(ach => {
    if (filter === 'All') return true;
    return ach.category?.toLowerCase() === filter.toLowerCase();
  });

  const getIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'trophy':
        return <Trophy className="w-6 h-6 text-[#f3df9b]" />;
      case 'medal':
        return <Medal className="w-6 h-6 text-slate-300" />;
      case 'award':
        return <Award className="w-6 h-6 text-[#cba358]" />;
      case 'shieldcheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'flame':
        return <Flame className="w-6 h-6 text-orange-400" />;
      default:
        return <Trophy className="w-6 h-6 text-[#cba358]" />;
    }
  };

  return (
    <section id="achievements" className="py-24 bg-[#0a0d14] relative border-b border-[#181d28] w-full">
      
      {/* Mature Ambient Backdrop */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#cba358]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Fullscreen Width */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cba358]/10 border border-[#cba358]/30 text-[#f3df9b] text-[11px] font-black uppercase tracking-[0.2em] mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#cba358]" />
            <span>Trophy Cabinet & Honors</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            Academy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3df9b] via-[#cba358] to-[#99732b]">Achievements</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Celebrating our tournament victories, regional titles, fair play recognitions, and elite individual player awards.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[#cba358] to-[#a88238] text-[#07090e] font-black shadow-lg'
                    : 'bg-[#0d1017] text-slate-400 hover:text-white border border-[#1b212f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid with Card Sheen & Hover Lifting */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAchievements.map((ach) => (
            <div
              key={ach.id}
              className="group relative bg-[#0d1017] rounded-3xl p-7 border border-[#1b212f] hover:border-[#cba358]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#cba358]/10 hover:-translate-y-1.5 flex flex-col justify-between card-sheen"
            >
              <div>
                {/* Card Top: Icon & Year */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#07090e] border border-[#1e2536] flex items-center justify-center group-hover:scale-110 group-hover:border-[#cba358]/50 transition-all duration-300 shadow-xl">
                    {getIcon(ach.badgeIcon)}
                  </div>

                  <span className="px-3 py-1 rounded-xl text-xs font-black font-mono bg-[#cba358]/10 text-[#f3df9b] border border-[#cba358]/20">
                    {ach.year}
                  </span>
                </div>

                {/* Category Pill */}
                <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#cba358] mb-1.5">
                  {ach.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-black text-white group-hover:text-[#f3df9b] transition-colors leading-snug">
                  {ach.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {/* Bottom Decorative Crest Accent */}
              <div className="pt-6 mt-5 border-t border-[#181d28] flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5 text-[#f3df9b]">
                  <Star className="w-3.5 h-3.5 fill-[#cba358] text-[#cba358]" /> Official Honor
                </span>
                <span className="text-slate-500 font-mono text-[10px]">ALL STARS ACADEMY</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
