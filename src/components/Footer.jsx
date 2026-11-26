import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, MessageSquare, MapPin, Calendar, Heart, Lock, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAuth }) {
  const { clubSettings, isAdmin } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070a] border-t border-[#181d28] pt-16 pb-12 relative w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#181d28]">
          
          {/* Col 1: Club Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f3df9b] via-[#cba358] to-[#8e6d2b] p-0.5 shadow-lg shadow-[#cba358]/20">
                <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#cba358]" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white uppercase tracking-wider block">
                  ALL Stars <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3df9b] to-[#cba358]">Academy</span>
                </span>
                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">
                  Official Club Portal
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Developing elite football talents through technical precision, high-intensity aerobic conditioning, tactical intelligence, and unwavering discipline.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#cba358]/10 text-[#f3df9b] border border-[#cba358]/20">
                ★ Forging Future Champions
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#home" className="hover:text-[#f3df9b] transition-colors">Home Showcase</a></li>
              <li><a href="#squad" className="hover:text-[#f3df9b] transition-colors">Full Squad Roster</a></li>
              <li><a href="#starting-xi" className="hover:text-[#f3df9b] transition-colors">First Eleven Pitch</a></li>
              <li><a href="#player-of-the-week" className="hover:text-[#f3df9b] transition-colors">Player of the Week</a></li>
              <li><a href="#achievements" className="hover:text-[#f3df9b] transition-colors">Trophy Cabinet</a></li>
              <li><a href="#join" className="hover:text-[#f3df9b] transition-colors">Trial Application</a></li>
            </ul>
          </div>

          {/* Col 3: Training & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Academy Ground
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{clubSettings.trainingGround || 'ALL Stars Sports Complex, Starway Arena'}</span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-[#cba358] shrink-0 mt-0.5" />
                <span>{clubSettings.trainingDays || 'Tuesdays, Thursdays & Saturdays'}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Coach Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-300">
              Direct Contact
            </h4>
            <p className="text-xs text-slate-400">
              Interested in scheduling a friendly match or academy scouting trials?
            </p>

            <a
              href={`https://wa.me/${clubSettings.coachWhatsapp?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${clubSettings.coachName || 'Coach'}, I would like to inquire about ALL Stars Academy.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all duration-200"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Head Coach</span>
            </a>

            <div className="pt-2">
              <button
                onClick={onOpenAuth}
                className="text-[11px] font-semibold text-slate-500 hover:text-[#f3df9b] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3 text-[#cba358]" />
                <span>Staff Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} ALL Stars Academy. All Rights Reserved. Built with React, Tailwind CSS, ImgBB & Firebase.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-[#f3df9b] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
