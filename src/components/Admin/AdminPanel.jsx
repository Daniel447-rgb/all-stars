import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { uploadToImgBB } from '../../services/imgbb';
import { logOutAdmin } from '../../services/firebase';
import { 
  Users, 
  Trophy, 
  Crown, 
  Settings, 
  Plus, 
  Edit2, 
  Trash2, 
  UploadCloud, 
  Image as ImageIcon, 
  Check, 
  X, 
  Shield, 
  LogOut, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle,
  RotateCcw,
  Activity,
  Zap,
  Save,
  MessageSquare
} from 'lucide-react';

export default function AdminPanel({ isOpen, onClose }) {
  const { 
    players, 
    addPlayer, 
    updatePlayer, 
    deletePlayer, 
    updateStartingXI, 
    formation, 
    setFormation,
    playerOfTheWeek, 
    updatePOTW, 
    achievements, 
    addAchievement, 
    updateAchievement, 
    deleteAchievement, 
    clubSettings, 
    updateClubSettings, 
    resetToSampleData,
    currentUser,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('players'); // 'players' | 'startingXI' | 'potw' | 'achievements' | 'settings'

  // Player Form State (for Add or Edit)
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [playerForm, setPlayerForm] = useState({
    name: '',
    jerseyNumber: '',
    position: 'Forward',
    subPosition: 'Striker',
    age: 18,
    height: "5'11\" (180cm)",
    preferredFoot: 'Right',
    photoUrl: '',
    stamina: 85,
    dribbling: 88,
    agility: 87,
    pace: 89,
    passing: 82,
    shooting: 84,
    bio: '',
    appearances: 10,
    goals: 5,
    assists: 3,
    isStartingXI: false,
    startingSlot: null
  });

  // ImgBB Upload States
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Achievement Form State
  const [achModalOpen, setAchModalOpen] = useState(false);
  const [editingAchId, setEditingAchId] = useState(null);
  const [achForm, setAchForm] = useState({
    title: '',
    year: '2026',
    category: 'Tournament Gold',
    description: '',
    badgeIcon: 'Trophy'
  });

  // POTW Form State
  const [potwForm, setPotwForm] = useState({
    playerId: playerOfTheWeek.playerId || (players[0]?.id || ''),
    weekTitle: playerOfTheWeek.weekTitle || 'Gameweek MVP',
    dateRange: playerOfTheWeek.dateRange || 'Current Week',
    matchHighlight: playerOfTheWeek.matchHighlight || '',
    coachQuote: playerOfTheWeek.coachQuote || '',
    badgeText: playerOfTheWeek.badgeText || 'PLAYER OF THE WEEK'
  });

  // Club Settings Form
  const [settingsForm, setSettingsForm] = useState({
    coachName: clubSettings.coachName || 'Coach Adekunle',
    coachWhatsapp: clubSettings.coachWhatsapp || '+2347037143782',
    trainingGround: clubSettings.trainingGround || 'ALL Stars Sports Complex',
    trainingDays: clubSettings.trainingDays || 'Tuesdays & Saturdays',
    heroSlideIntervalSec: clubSettings.heroSlideIntervalSec || 15,
    imgbbApiKey: clubSettings.imgbbApiKey || ''
  });

  // Firebase Config Form
  const [firebaseConfigText, setFirebaseConfigText] = useState(() => {
    return localStorage.getItem('allstars_firebase_config') || '';
  });

  if (!isOpen) return null;

  // ---------------- PLAYER ACTIONS ----------------
  const handleOpenAddPlayer = () => {
    setEditingPlayerId(null);
    setPlayerForm({
      name: '',
      jerseyNumber: Math.max(...players.map(p => Number(p.jerseyNumber) || 0), 0) + 1,
      position: 'Forward',
      subPosition: 'Winger / Striker',
      age: 18,
      height: "5'11\" (180cm)",
      preferredFoot: 'Right',
      photoUrl: '',
      stamina: 85,
      dribbling: 88,
      agility: 87,
      pace: 89,
      passing: 80,
      shooting: 82,
      bio: '',
      appearances: 0,
      goals: 0,
      assists: 0,
      isStartingXI: false,
      startingSlot: null
    });
    setUploadError('');
    setPlayerModalOpen(true);
  };

  const handleOpenEditPlayer = (p) => {
    setEditingPlayerId(p.id);
    setPlayerForm({
      name: p.name || '',
      jerseyNumber: p.jerseyNumber || 10,
      position: p.position || 'Forward',
      subPosition: p.subPosition || '',
      age: p.age || 18,
      height: p.height || "5'11\"",
      preferredFoot: p.preferredFoot || 'Right',
      photoUrl: p.photoUrl || '',
      stamina: p.stamina || 80,
      dribbling: p.dribbling || 80,
      agility: p.agility || 80,
      pace: p.pace || 80,
      passing: p.passing || 80,
      shooting: p.shooting || 80,
      bio: p.bio || '',
      appearances: p.appearances || 0,
      goals: p.goals || 0,
      assists: p.assists || 0,
      isStartingXI: p.isStartingXI || false,
      startingSlot: p.startingSlot || null
    });
    setUploadError('');
    setPlayerModalOpen(true);
  };

  const handleSavePlayer = async (e) => {
    e.preventDefault();
    if (!playerForm.name.trim()) {
      alert('Please enter a player name');
      return;
    }

    if (editingPlayerId) {
      await updatePlayer(editingPlayerId, playerForm);
    } else {
      await addPlayer(playerForm);
    }
    setPlayerModalOpen(false);
  };

  const handleDeletePlayer = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently remove ${name} from ALL Stars Academy?`)) {
      await deletePlayer(id);
    }
  };

  // ImgBB Upload Handler
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError('');

    try {
      const res = await uploadToImgBB(file, clubSettings.imgbbApiKey);
      setPlayerForm(prev => ({ ...prev, photoUrl: res.url }));
      showToast(res.isFallback ? 'Photo loaded locally! (Enter ImgBB API key in settings for permanent cloud link)' : 'Photo uploaded to ImgBB!');
    } catch (err) {
      setUploadError(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // ---------------- POTW ACTIONS ----------------
  const handleSavePOTW = async (e) => {
    e.preventDefault();
    await updatePOTW(potwForm);
  };

  // ---------------- ACHIEVEMENTS ACTIONS ----------------
  const handleOpenAddAch = () => {
    setEditingAchId(null);
    setAchForm({
      title: '',
      year: new Date().getFullYear().toString(),
      category: 'Tournament Gold',
      description: '',
      badgeIcon: 'Trophy'
    });
    setAchModalOpen(true);
  };

  const handleOpenEditAch = (ach) => {
    setEditingAchId(ach.id);
    setAchForm({
      title: ach.title || '',
      year: ach.year || '2026',
      category: ach.category || 'Tournament Gold',
      description: ach.description || '',
      badgeIcon: ach.badgeIcon || 'Trophy'
    });
    setAchModalOpen(true);
  };

  const handleSaveAchievement = async (e) => {
    e.preventDefault();
    if (editingAchId) {
      await updateAchievement(editingAchId, achForm);
    } else {
      await addAchievement(achForm);
    }
    setAchModalOpen(false);
  };

  // ---------------- SETTINGS ACTIONS ----------------
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await updateClubSettings(settingsForm);

    if (firebaseConfigText.trim()) {
      try {
        JSON.parse(firebaseConfigText);
        localStorage.setItem('allstars_firebase_config', firebaseConfigText);
        showToast('Firebase config updated! Reload to initialize.');
      } catch {
        alert('Invalid Firebase Config JSON');
      }
    }
  };

  const handleLogout = async () => {
    await logOutAdmin();
    showToast('Signed out of Administrator session');
    onClose();
  };

  const startingSlots = ['GK', 'LB', 'CB1', 'CB2', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'ST', 'RW'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-slide-in">
      
      {/* Container */}
      <div className="relative w-full max-w-6xl bg-[#0d1017] border border-[#262f44] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b212f] bg-[#07090e]/95 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#cba358] to-[#8e6d2b] text-[#07090e] flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-white uppercase tracking-wider">
                  ALL Stars <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3df9b] to-[#cba358]">Admin Control</span>
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Full CRUD Active
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Administrator: <strong className="text-[#f3df9b]">{currentUser?.displayName || currentUser?.email || 'Authorized Staff'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#131722] hover:bg-rose-950/80 hover:text-rose-400 text-slate-300 border border-[#232b3d] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#1b212f] bg-[#07090e]/60 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('players')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'players'
                ? 'border-[#cba358] text-[#f3df9b] bg-[#0d1017]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Players Roster ({players.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('startingXI')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'startingXI'
                ? 'border-emerald-400 text-emerald-400 bg-[#0d1017]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>First Eleven Squad</span>
          </button>

          <button
            onClick={() => setActiveTab('potw')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'potw'
                ? 'border-[#cba358] text-[#f3df9b] bg-[#0d1017]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>Player of the Week</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'achievements'
                ? 'border-[#f3df9b] text-[#f3df9b] bg-[#0d1017]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Achievements ({achievements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-cyan-400 text-cyan-400 bg-[#0d1017]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Club & ImgBB Settings</span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ================= TAB 1: PLAYERS CRUD ================= */}
          {activeTab === 'players' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-extrabold text-base text-white">Player Database Management</h4>
                  <p className="text-xs text-slate-400">
                    Add new players, edit stamina/dribbling/agility stats, upload player images via ImgBB, or delete.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddPlayer}
                  className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Player</span>
                </button>
              </div>

              {/* Players Table / List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="relative shrink-0">
                        <img
                          src={p.photoUrl}
                          alt={p.name}
                          className="w-16 h-20 rounded-xl object-cover object-top border border-slate-800 bg-slate-900"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-amber-500 text-slate-950 font-black font-mono text-[10px] rounded">
                          #{p.jerseyNumber}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-sm text-white truncate">{p.name}</h5>
                          <span className="text-xs font-black font-mono text-amber-400">{p.overall} OVR</span>
                        </div>
                        <p className="text-xs text-slate-400">{p.position} • {p.age} yrs</p>

                        <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] text-center">
                          <div className="bg-slate-900 p-1 rounded">
                            <span className="text-slate-400 block">Stamina</span>
                            <span className="font-bold text-emerald-400">{p.stamina}%</span>
                          </div>
                          <div className="bg-slate-900 p-1 rounded">
                            <span className="text-slate-400 block">Dribble</span>
                            <span className="font-bold text-amber-400">{p.dribbling}%</span>
                          </div>
                          <div className="bg-slate-900 p-1 rounded">
                            <span className="text-slate-400 block">Agility</span>
                            <span className="font-bold text-cyan-400">{p.agility}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-800/80">
                      {p.isStartingXI && (
                        <span className="mr-auto text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                          Starting XI ({p.startingSlot || 'XI'})
                        </span>
                      )}
                      <button
                        onClick={() => handleOpenEditPlayer(p)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        title="Edit Player & Skills"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeletePlayer(p.id, p.name)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/80 text-rose-400 border border-slate-800 hover:border-rose-500/40 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        title="Delete Player"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 2: STARTING XI SQUAD BUILDER ================= */}
          {activeTab === 'startingXI' && (
            <div className="space-y-6">
              
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-base text-white">First Eleven Tactical Assignment</h4>
                  <p className="text-xs text-slate-400">
                    Assign which player starts in each pitch position. Current formation: <strong className="text-emerald-400 font-mono">{formation}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Formation:</span>
                  {['4-3-3', '4-4-2', '3-5-2'].map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setFormation(fmt)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                        formation === fmt ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 11 Starter Position Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {startingSlots.map((slot) => {
                  const assignedPlayer = players.find(p => p.isStartingXI && p.startingSlot === slot);

                  return (
                    <div key={slot} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-xs font-black font-mono">
                          Slot: {slot}
                        </span>
                        {assignedPlayer && (
                          <span className="text-xs text-amber-400 font-mono font-bold">
                            {assignedPlayer.overall} OVR
                          </span>
                        )}
                      </div>

                      {assignedPlayer ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={assignedPlayer.photoUrl}
                            alt={assignedPlayer.name}
                            className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-xs text-white truncate">{assignedPlayer.name}</p>
                            <p className="text-[10px] text-slate-400">#{assignedPlayer.jerseyNumber} • {assignedPlayer.position}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 italic py-2">
                          Unassigned slot
                        </div>
                      )}

                      {/* Dropdown to assign or reassign player */}
                      <select
                        value={assignedPlayer ? assignedPlayer.id : ''}
                        onChange={(e) => {
                          const newPlayerId = e.target.value;
                          if (!newPlayerId) {
                            if (assignedPlayer) updateStartingXI(assignedPlayer.id, slot, false);
                          } else {
                            updateStartingXI(newPlayerId, slot, true);
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-400"
                      >
                        <option value="">-- Choose Starter for {slot} --</option>
                        {players.map(p => (
                          <option key={p.id} value={p.id}>
                            #{p.jerseyNumber} {p.name} ({p.position}) {p.isStartingXI && p.startingSlot !== slot ? `[Currently in ${p.startingSlot}]` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ================= TAB 3: PLAYER OF THE WEEK ================= */}
          {activeTab === 'potw' && (
            <div className="space-y-6 max-w-2xl">
              
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <h4 className="font-black text-base text-white">Player of the Week Spotlight Setup</h4>
                <p className="text-xs text-slate-400">
                  Select this week's standout performer and publish coach commendations to reward their effort.
                </p>
              </div>

              <form onSubmit={handleSavePOTW} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Select Honored Player *
                  </label>
                  <select
                    value={potwForm.playerId}
                    onChange={(e) => setPotwForm(prev => ({ ...prev, playerId: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    {players.map(p => (
                      <option key={p.id} value={p.id}>
                        #{p.jerseyNumber} - {p.name} ({p.position} • {p.overall} OVR)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Gameweek Headline
                    </label>
                    <input
                      type="text"
                      value={potwForm.weekTitle}
                      onChange={(e) => setPotwForm(prev => ({ ...prev, weekTitle: e.target.value }))}
                      placeholder="e.g. Gameweek 12 • Outstanding Performance"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Date Range
                    </label>
                    <input
                      type="text"
                      value={potwForm.dateRange}
                      onChange={(e) => setPotwForm(prev => ({ ...prev, dateRange: e.target.value }))}
                      placeholder="e.g. Nov 17 - Nov 24, 2026"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Match Performance Highlight
                  </label>
                  <textarea
                    rows={2}
                    value={potwForm.matchHighlight}
                    onChange={(e) => setPotwForm(prev => ({ ...prev, matchHighlight: e.target.value }))}
                    placeholder="e.g. Scored a hat-trick and led the midfield press in the 4-1 victory..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Coach's Commendation Quote
                  </label>
                  <textarea
                    rows={3}
                    value={potwForm.coachQuote}
                    onChange={(e) => setPotwForm(prev => ({ ...prev, coachQuote: e.target.value }))}
                    placeholder="Coach Adekunle's words on the player's dedication, discipline, and training ethic..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-slate-950" />
                  <span>Update Player of the Week</span>
                </button>
              </form>

            </div>
          )}

          {/* ================= TAB 4: ACHIEVEMENTS CRUD ================= */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="font-extrabold text-base text-white">Trophy & Achievements Cabinet</h4>
                  <p className="text-xs text-slate-400">
                    Add new tournament trophies, edit achievements, or remove honors.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddAch}
                  className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Achievement</span>
                </button>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          {ach.year}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400">
                          {ach.category}
                        </span>
                      </div>

                      <h5 className="font-black text-sm text-white">{ach.title}</h5>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ach.description}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-800/80">
                      <button
                        onClick={() => handleOpenEditAch(ach)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete honor "${ach.title}"?`)) {
                            deleteAchievement(ach.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/80 text-rose-400 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 5: CLUB & IMGBB SETTINGS ================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              
              <form onSubmit={handleSaveSettings} className="space-y-6">
                
                {/* WhatsApp & Contact Settings */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="font-extrabold text-sm text-white">Coach Contact & WhatsApp Setup</h4>
                      <p className="text-[11px] text-slate-400">Incoming stranger messages and trial applications go to this phone number.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Coach WhatsApp Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.coachWhatsapp}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, coachWhatsapp: e.target.value }))}
                        placeholder="+2347037143782"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">Include country code with plus sign, e.g. +234...</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Head Coach Name
                      </label>
                      <input
                        type="text"
                        value={settingsForm.coachName}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, coachName: e.target.value }))}
                        placeholder="Coach Adekunle"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Training Complex Ground
                      </label>
                      <input
                        type="text"
                        value={settingsForm.trainingGround}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, trainingGround: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Slide Rotation Speed (Seconds)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="120"
                        value={settingsForm.heroSlideIntervalSec}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, heroSlideIntervalSec: Number(e.target.value) }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-slate-600"
                      />
                    </div>
                  </div>
                </div>

                {/* ImgBB Storage Configuration */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <UploadCloud className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="font-extrabold text-sm text-white">ImgBB Free Image Storage API</h4>
                      <p className="text-[11px] text-slate-400">Host player photos permanently without credit card.</p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl text-xs text-amber-300 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> How to get a 100% Free ImgBB API Key:
                    </p>
                    <ol className="list-decimal list-inside text-[11px] text-slate-300 space-y-1">
                      <li>Go to <a href="https://api.imgbb.com/" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold">api.imgbb.com</a></li>
                      <li>Click "Get API Key" (Sign up free with just email, no card required)</li>
                      <li>Paste the API key below and click "Save All Settings"</li>
                    </ol>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      ImgBB API Key
                    </label>
                    <input
                      type="text"
                      value={settingsForm.imgbbApiKey}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, imgbbApiKey: e.target.value }))}
                      placeholder="e.g. 4d7f8a9b2c3e1f0..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      * If left blank, image uploads work locally through Base64 data URLs.
                    </span>
                  </div>
                </div>

                {/* Firebase Connection Config */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <div>
                      <h4 className="font-extrabold text-sm text-white">Firebase Project Credentials (Optional)</h4>
                      <p className="text-[11px] text-slate-400">Paste your Firebase Project Configuration JSON here for live cloud Firestore sync.</p>
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      value={firebaseConfigText}
                      onChange={(e) => setFirebaseConfigText(e.target.value)}
                      placeholder='{ "apiKey": "...", "authDomain": "...", "projectId": "..." }'
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Save Settings Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-slate-950" />
                  <span>Save All Settings</span>
                </button>

              </form>

              {/* Reset to Sample Data */}
              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset ALL Stars Academy back to default demo players and achievements?')) {
                      resetToSampleData();
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-400 hover:bg-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Factory Sample Data</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* ================= MODAL: ADD / EDIT PLAYER ================= */}
      {playerModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h4 className="font-black text-lg text-white">
                {editingPlayerId ? `Edit Player: ${playerForm.name}` : 'Add New Academy Player'}
              </h4>
              <button
                onClick={() => setPlayerModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlayer} className="space-y-4">
              
              {/* Photo Upload via ImgBB */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Player Photo (ImgBB Storage)
                </label>

                <div className="flex items-center gap-4">
                  {playerForm.photoUrl ? (
                    <img
                      src={playerForm.photoUrl}
                      alt="Player Preview"
                      className="w-16 h-20 rounded-xl object-cover border border-amber-500/40 bg-slate-900"
                    />
                  ) : (
                    <div className="w-16 h-20 rounded-xl bg-slate-900 border border-dashed border-slate-700 flex items-center justify-center text-slate-600">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer flex items-center gap-1.5 shadow">
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>{uploadingImage ? 'Uploading to ImgBB...' : 'Upload Image File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <input
                      type="url"
                      value={playerForm.photoUrl}
                      onChange={(e) => setPlayerForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                      placeholder="Or enter direct Image URL (e.g. https://...)"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />

                    {uploadError && (
                      <p className="text-[10px] text-rose-400">{uploadError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Name & Jersey Number */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={playerForm.name}
                    onChange={(e) => setPlayerForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Tunde Adekunle"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Jersey Number *</label>
                  <input
                    type="number"
                    required
                    value={playerForm.jerseyNumber}
                    onChange={(e) => setPlayerForm(prev => ({ ...prev, jerseyNumber: Number(e.target.value) }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Position & SubPosition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Position Group *</label>
                  <select
                    value={playerForm.position}
                    onChange={(e) => setPlayerForm(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Forward">Forward</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Defender">Defender</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Role / Sub-Position</label>
                  <input
                    type="text"
                    value={playerForm.subPosition}
                    onChange={(e) => setPlayerForm(prev => ({ ...prev, subPosition: e.target.value }))}
                    placeholder="e.g. Striker / Left Wing"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Physical Profile: Age, Height, Foot */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Age</label>
                  <input
                    type="number"
                    value={playerForm.age}
                    onChange={(e) => setPlayerForm(prev => ({ ...prev, age: Number(e.target.value) }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Height</label>
                  <input
                    type="text"
                    value={playerForm.height}
                    onChange={(e) => setPlayerForm(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Preferred Foot</label>
                  <select
                    value={playerForm.preferredFoot}
                    onChange={(e) => setPlayerForm(prev => ({ ...prev, preferredFoot: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Right">Right</option>
                    <option value="Left">Left</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              {/* Technical Skill Sliders (Stamina, Dribble, Agility, Pace, Pass, Shoot) */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Technical Attributes & Skill Percentages
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    Estimated OVR: {Math.round((Number(playerForm.stamina) + Number(playerForm.dribbling) + Number(playerForm.agility) + Number(playerForm.pace) + Number(playerForm.passing) + Number(playerForm.shooting)) / 6)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  
                  {/* Stamina Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Stamina Rating:</span>
                      <span className="font-mono font-bold text-emerald-400">{playerForm.stamina}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="99"
                      value={playerForm.stamina}
                      onChange={(e) => setPlayerForm(prev => ({ ...prev, stamina: Number(e.target.value) }))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  {/* Dribbling Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Dribbling Rating:</span>
                      <span className="font-mono font-bold text-amber-400">{playerForm.dribbling}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="99"
                      value={playerForm.dribbling}
                      onChange={(e) => setPlayerForm(prev => ({ ...prev, dribbling: Number(e.target.value) }))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  {/* Agility Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Agility Rating:</span>
                      <span className="font-mono font-bold text-cyan-400">{playerForm.agility}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="99"
                      value={playerForm.agility}
                      onChange={(e) => setPlayerForm(prev => ({ ...prev, agility: Number(e.target.value) }))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  {/* Pace Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Pace / Sprint:</span>
                      <span className="font-mono font-bold text-rose-400">{playerForm.pace}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="99"
                      value={playerForm.pace}
                      onChange={(e) => setPlayerForm(prev => ({ ...prev, pace: Number(e.target.value) }))}
                      className="w-full accent-rose-400 cursor-pointer"
                    />
                  </div>

                  {/* Passing Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Passing:</span>
                      <span className="font-mono font-bold text-indigo-400">{playerForm.passing}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="99"
                      value={playerForm.passing}
                      onChange={(e) => setPlayerForm(prev => ({ ...prev, passing: Number(e.target.value) }))}
                      className="w-full accent-indigo-400 cursor-pointer"
                    />
                  </div>

                  {/* Shooting Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Shooting / Finishing:</span>
                      <span className="font-mono font-bold text-amber-300">{playerForm.shooting}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="99"
                      value={playerForm.shooting}
                      onChange={(e) => setPlayerForm(prev => ({ ...prev, shooting: Number(e.target.value) }))}
                      className="w-full accent-amber-300 cursor-pointer"
                    />
                  </div>

                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Scouting Bio</label>
                <textarea
                  rows={2}
                  value={playerForm.bio}
                  onChange={(e) => setPlayerForm(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Key tactical notes, play style, strengths..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none"
                />
              </div>

              {/* Starting XI toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isStartingXI"
                  checked={playerForm.isStartingXI}
                  onChange={(e) => setPlayerForm(prev => ({ ...prev, isStartingXI: e.target.checked }))}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
                <label htmlFor="isStartingXI" className="text-xs font-bold text-white cursor-pointer">
                  Assign this player to First Eleven Matchday Squad
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setPlayerModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg cursor-pointer"
                >
                  {editingPlayerId ? 'Save Changes' : 'Create Player'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT ACHIEVEMENT ================= */}
      {achModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-black text-base text-white">
                {editingAchId ? 'Edit Achievement' : 'Add Club Achievement'}
              </h4>
              <button
                onClick={() => setAchModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAchievement} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Trophy / Honor Title *</label>
                <input
                  type="text"
                  required
                  value={achForm.title}
                  onChange={(e) => setAchForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. State Youth Champions Cup"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Year</label>
                  <input
                    type="text"
                    value={achForm.year}
                    onChange={(e) => setAchForm(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                  <select
                    value={achForm.category}
                    onChange={(e) => setAchForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Tournament Gold">Tournament Gold</option>
                    <option value="National Finalist">National Finalist</option>
                    <option value="Individual Honor">Individual Honor</option>
                    <option value="Excellence Award">Excellence Award</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Badge Icon</label>
                <select
                  value={achForm.badgeIcon}
                  onChange={(e) => setAchForm(prev => ({ ...prev, badgeIcon: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Trophy">Trophy (Gold Cup)</option>
                  <option value="Medal">Medal (Silver Honor)</option>
                  <option value="Award">Award Ribbon</option>
                  <option value="ShieldCheck">Shield (Fair Play)</option>
                  <option value="Flame">Flame (Scoring / MVP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={achForm.description}
                  onChange={(e) => setAchForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Summary of tournament victory or match performance..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAchModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black uppercase bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow"
                >
                  Save Achievement
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
