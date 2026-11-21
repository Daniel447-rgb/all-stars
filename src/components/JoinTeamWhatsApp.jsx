import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  User, 
  Calendar, 
  Shield, 
  MapPin, 
  Phone, 
  Sparkles, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function JoinTeamWhatsApp() {
  const { clubSettings } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    position: 'Forward',
    preferredFoot: 'Right',
    city: '',
    experience: '',
    personalMessage: ''
  });

  const positions = ['Forward (Striker / Winger)', 'Midfielder (CAM / CM / CDM)', 'Defender (Centre Back / Fullback)', 'Goalkeeper'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    return `⚽ *ALL STARS ACADEMY - TRIAL APPLICATION* ⚽\n\n` +
      `👤 *Full Name:* ${formData.fullName || '[Your Name]'}\n` +
      `🎂 *Age:* ${formData.age || '[Your Age]'}\n` +
      `🎯 *Preferred Position:* ${formData.position}\n` +
      `👟 *Dominant Foot:* ${formData.preferredFoot}\n` +
      `📍 *Location:* ${formData.city || '[Your City]'}\n` +
      `🏆 *Previous Experience:* ${formData.experience || 'Grassroots / School football'}\n\n` +
      `💬 *Message to Coach:* \n"${formData.personalMessage || 'Hello Coach, I would love the opportunity to attend trials and prove myself for ALL Stars Academy.'}"\n\n` +
      `Looking forward to hearing about upcoming trial dates! Thank you.`;
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const cleanPhone = (clubSettings.coachWhatsapp || '+2348123456789').replace(/[^0-9]/g, '');
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuickChat = () => {
    const cleanPhone = (clubSettings.coachWhatsapp || '+2348123456789').replace(/[^0-9]/g, '');
    const quickMsg = `Hello ${clubSettings.coachName || 'Coach'}, I am interested in ALL Stars Academy trials and would like more information on registration and training schedule.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(quickMsg)}`, '_blank');
  };

  return (
    <section id="join" className="py-24 bg-[#07090e] relative border-b border-[#181d28] w-full">
      
      {/* Mature Ambient Backdrop */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#cba358]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Fullscreen Width */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-[0.2em] mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Join Our Academy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            Take Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Trial Step</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Aspiring footballers: Complete the quick application below. It formats your information and sends it directly to our head coach's WhatsApp for review.
          </p>
        </div>

        {/* Main Grid: Form on Left, WhatsApp Live Preview & Coach Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Form: Application */}
          <div className="lg:col-span-7 bg-[#0d1017] rounded-3xl p-6 sm:p-9 border border-[#1b212f] shadow-2xl card-sheen">
            
            <div className="flex items-center justify-between border-b border-[#181d28] pb-5 mb-6">
              <h3 className="font-black text-lg text-white flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-emerald-400" />
                Trial Registration Dossier
              </h3>
              <span className="text-xs text-emerald-400 font-bold bg-[#0c1f14] px-3 py-1 rounded-full border border-emerald-500/30">
                Direct to WhatsApp
              </span>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              
              {/* Full Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Samuel Okon"
                    className="w-full bg-[#07090e] border border-[#1b212f] focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Age / Year of Birth *
                  </label>
                  <input
                    type="text"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 17 years (2009)"
                    className="w-full bg-[#07090e] border border-[#1b212f] focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Position & Preferred Foot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Primary Position *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full bg-[#07090e] border border-[#1b212f] focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    {positions.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Dominant Foot
                  </label>
                  <select
                    name="preferredFoot"
                    value={formData.preferredFoot}
                    onChange={handleChange}
                    className="w-full bg-[#07090e] border border-[#1b212f] focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Right">Right Foot</option>
                    <option value="Left">Left Foot</option>
                    <option value="Both (Two-Footed)">Both (Two-Footed)</option>
                  </select>
                </div>
              </div>

              {/* City & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    City / Neighborhood
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Lagos, Abuja, London..."
                    className="w-full bg-[#07090e] border border-[#1b212f] focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Playing Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. High school team, grassroots club"
                    className="w-full bg-[#07090e] border border-[#1b212f] focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Message to Coach */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Message / Tell Coach About Your Skills
                </label>
                <textarea
                  name="personalMessage"
                  rows={3}
                  value={formData.personalMessage}
                  onChange={handleChange}
                  placeholder="Tell Coach Adekunle about your strengths (e.g. pace, stamina, vision), match achievements, and why you want to wear the ALL Stars jersey..."
                  className="w-full bg-[#07090e] border border-[#1b212f] focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit to WhatsApp Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#07090e] shadow-xl shadow-emerald-500/20 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Submit Application to Coach on WhatsApp</span>
                <Send className="w-4 h-4" />
              </button>

            </form>

          </div>

          {/* Right Column: WhatsApp Live Message Preview & Coach Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Phone Mockup Card */}
            <div className="bg-[#0d1017] rounded-3xl p-6 border border-[#1b212f] shadow-2xl">
              
              <div className="flex items-center gap-3 border-b border-[#181d28] pb-4 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[#07090e] font-bold shadow-lg">
                  <MessageSquare className="w-5 h-5 text-[#07090e]" />
                </div>
                <div>
                  <div className="text-sm font-black text-white flex items-center gap-1.5">
                    <span>{clubSettings.coachName || 'Coach Adekunle'}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {clubSettings.coachWhatsapp || '+234 812 345 6789'}
                  </div>
                </div>
              </div>

              {/* Message Bubble Preview */}
              <div className="bg-[#05090c] p-4 rounded-2xl border border-[#0d2218] shadow-inner">
                <div className="text-[10px] uppercase font-black text-emerald-400 tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> WhatsApp Message Output Preview
                </div>
                <div className="bg-[#0a3825] text-white p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed font-sans shadow-md whitespace-pre-line border border-[#0f4e34]">
                  {generateWhatsAppMessage()}
                </div>
                <div className="text-right text-[10px] text-slate-500 mt-2 font-mono">
                  Delivered straight to Coach's WhatsApp
                </div>
              </div>

              {/* Quick Chat Alternative */}
              <div className="mt-5 pt-4 border-t border-[#181d28]">
                <p className="text-xs text-slate-400 mb-3 text-center">
                  Just want to ask a fast question or inquire about training grounds?
                </p>
                <button
                  onClick={handleQuickChat}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#07090e] hover:bg-[#131722] text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct WhatsApp Message</span>
                </button>
              </div>

            </div>

            {/* Academy Training Information Box */}
            <div className="bg-[#0d1017] p-6 rounded-3xl border border-[#1b212f] space-y-3.5">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#cba358]" />
                Training Schedule & Location
              </h4>
              <div className="text-xs text-slate-400 space-y-2">
                <p>📍 <strong className="text-slate-300">Ground:</strong> {clubSettings.trainingGround || 'ALL Stars Sports Complex, Starway Arena'}</p>
                <p>⏰ <strong className="text-slate-300">Sessions:</strong> {clubSettings.trainingDays || 'Tuesdays, Thursdays & Saturdays'}</p>
                <p>⚡ <strong className="text-slate-300">Ages Welcome:</strong> Under-15 to Under-23 squads</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
