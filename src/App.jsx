import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LiveTicker from './components/LiveTicker';
import HeroSlider from './components/HeroSlider';
import SquadSection from './components/SquadSection';
import StartingXI from './components/StartingXI';
import PlayerOfTheWeek from './components/PlayerOfTheWeek';
import Achievements from './components/Achievements';
import JoinTeamWhatsApp from './components/JoinTeamWhatsApp';
import PlayerModal from './components/PlayerModal';
import AdminAuthModal from './components/Admin/AdminAuthModal';
import AdminPanel from './components/Admin/AdminPanel';
import Footer from './components/Footer';
import Toast from './components/Toast';

function MainApp() {
  const { isAdmin } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setAdminPanelOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-[#cba358] selection:text-[#07090e]">
      
      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setAdminPanelOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Broadcast Live Matchday Ticker */}
      <LiveTicker />

      {/* Main Content Sections (Full Screen Fluid Display) */}
      <main className="flex-1 w-full">
        {/* 1. Hero Showcase with 30s changing player images */}
        <HeroSlider />

        {/* 2. Squad Roster with Total Players & Skill Percentages */}
        <SquadSection />

        {/* 3. Starting XI Football Pitch Board */}
        <StartingXI />

        {/* 4. Player of the Week Spotlight */}
        <PlayerOfTheWeek />

        {/* 5. Club Achievements & Honors */}
        <Achievements />

        {/* 6. Stranger Trial Application & WhatsApp link to Coach */}
        <JoinTeamWhatsApp />
      </main>

      {/* Footer */}
      <Footer onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Scout Dossier Detail Modal */}
      <PlayerModal />

      {/* Admin Authentication Modal */}
      <AdminAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={() => setAdminPanelOpen(true)}
      />

      {/* Full CRUD Admin Control Panel */}
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
      />

      {/* Floating System Toasts */}
      <Toast />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
