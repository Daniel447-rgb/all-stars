import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PLAYERS, 
  INITIAL_PLAYER_OF_THE_WEEK, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_SETTINGS 
} from '../services/mockData';
import { createFormationLayout, INITIAL_FORMATIONS } from '../services/formations';
import { 
  auth, 
  db, 
  checkIsAdmin, 
  signInWithGoogle, 
  signInAdminEmail, 
  logOutAdmin,
  ADMIN_EMAIL 
} from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

const AppContext = createContext();
const DEMO_DATA_RESET_KEY = 'allstars_demo_data_removed_v1';

export const AppProvider = ({ children }) => {
  // Remove legacy demo roster and spotlight once, preserving any real admin-entered data.
  if (!localStorage.getItem(DEMO_DATA_RESET_KEY)) {
    try {
      const savedPlayers = JSON.parse(localStorage.getItem('allstars_players') || '[]');
      const hasLegacyPlayers = Array.isArray(savedPlayers) && savedPlayers.some(player =>
        player?.id?.startsWith('p') || player?.photoUrl?.includes('images.unsplash.com')
      );
      if (hasLegacyPlayers) localStorage.removeItem('allstars_players');

      const savedPotw = JSON.parse(localStorage.getItem('allstars_potw') || '{}');
      if (savedPotw?.playerId === 'p1' || savedPotw?.coachQuote?.includes('David')) {
        localStorage.removeItem('allstars_potw');
      }
    } catch {
      localStorage.removeItem('allstars_players');
      localStorage.removeItem('allstars_potw');
    }
    localStorage.setItem(DEMO_DATA_RESET_KEY, 'true');
  }

  // 1. Players State
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('allstars_players');
    return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
  });

  // 2. Player of the week
  const [playerOfTheWeek, setPlayerOfTheWeek] = useState(() => {
    const saved = localStorage.getItem('allstars_potw');
    return saved ? JSON.parse(saved) : INITIAL_PLAYER_OF_THE_WEEK;
  });

  // 3. Achievements
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('allstars_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  // 4. Club Settings
  const [clubSettings, setClubSettings] = useState(() => {
    const saved = localStorage.getItem('allstars_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure defaults are retained when saved settings are from an older app version
        const merged = { ...INITIAL_SETTINGS, ...parsed };
        if (merged.coachName === 'Coach Adekunle') {
          merged.coachName = 'Taiwo Johnson';
        }
        if (merged.heroSlideIntervalSec === 30 || !merged.heroSlideIntervalSec) {
          merged.heroSlideIntervalSec = 15;
        }
        if (!merged.coachWhatsapp || merged.coachWhatsapp === '+2348123456789') {
          merged.coachWhatsapp = '+2347037143782';
        }
        return merged;
      } catch {
        // ignore
      }
    }
    return INITIAL_SETTINGS;
  });

  // 5. Tactical Formation
  const [formations, setFormations] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('allstars_formations') || '{}');
      return { ...INITIAL_FORMATIONS, ...saved };
    } catch {
      return INITIAL_FORMATIONS;
    }
  });
  const [formation, setFormation] = useState(() =>
    localStorage.getItem('allstars_formation') || '4-3-3'
  );

  // 6. Auth State (Strictly Firebase Auth)
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedPlayerModal, setSelectedPlayerModal] = useState(null);
  const [notification, setNotification] = useState(null);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('allstars_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('allstars_potw', JSON.stringify(playerOfTheWeek));
  }, [playerOfTheWeek]);

  useEffect(() => {
    localStorage.setItem('allstars_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('allstars_settings', JSON.stringify(clubSettings));
  }, [clubSettings]);

  useEffect(() => {
    localStorage.setItem('allstars_formations', JSON.stringify(formations));
  }, [formations]);

  useEffect(() => {
    localStorage.setItem('allstars_formation', formation);
  }, [formation]);

  // Firebase Auth listener
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
      return () => unsubscribe();
    }
  }, []);

  // Compute Admin Status strictly via Firebase Auth
  const isAdmin = checkIsAdmin(currentUser);

  // Players CRUD
  const addPlayer = async (newPlayerData) => {
    const newPlayer = {
      ...newPlayerData,
      id: 'player_' + Date.now(),
      overall: Math.round(
        (Number(newPlayerData.stamina || 80) + 
         Number(newPlayerData.dribbling || 80) + 
         Number(newPlayerData.agility || 80) + 
         Number(newPlayerData.pace || 80) + 
         Number(newPlayerData.passing || 80) + 
         Number(newPlayerData.shooting || 80)) / 6
      ),
      createdAt: new Date().toISOString()
    };

    setPlayers(prev => [newPlayer, ...prev]);

    // Firestore sync if available
    if (db) {
      try {
        await setDoc(doc(db, 'players', newPlayer.id), newPlayer);
      } catch (e) {
        console.warn('Firestore sync failed, saved locally:', e);
      }
    }

    showToast(`Player ${newPlayer.name} added successfully!`);
    return newPlayer;
  };

  const updatePlayer = async (id, updatedFields) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updatedFields };
        merged.overall = Math.round(
          (Number(merged.stamina || 80) + 
           Number(merged.dribbling || 80) + 
           Number(merged.agility || 80) + 
           Number(merged.pace || 80) + 
           Number(merged.passing || 80) + 
           Number(merged.shooting || 80)) / 6
        );
        return merged;
      }
      return p;
    }));

    if (db) {
      try {
        await setDoc(doc(db, 'players', id), updatedFields, { merge: true });
      } catch (e) {
        console.warn('Firestore sync failed:', e);
      }
    }

    showToast('Player details updated successfully!');
  };

  const deletePlayer = async (id) => {
    const targetPlayer = players.find(p => p.id === id);
    setPlayers(prev => prev.filter(p => p.id !== id));

    // If this player was POTW, clear or change
    if (playerOfTheWeek.playerId === id) {
      setPlayerOfTheWeek(prev => ({
        ...prev,
        playerId: players.find(p => p.id !== id)?.id || ''
      }));
    }

    if (db) {
      try {
        await deleteDoc(doc(db, 'players', id));
      } catch (e) {
        console.warn('Firestore delete failed:', e);
      }
    }

    showToast(`Player ${targetPlayer?.name || ''} removed.`);
  };

  // Starting XI management
  const updateStartingXI = (playerId, slot, isStarting) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return {
          ...p,
          isStartingXI: isStarting,
          startingSlot: isStarting ? slot : null
        };
      }
      // If another player was in this slot, remove them from this slot
      if (isStarting && p.startingSlot === slot && p.id !== playerId) {
        return {
          ...p,
          startingSlot: null,
          isStartingXI: false
        };
      }
      return p;
    }));
    showToast('First Eleven Squad updated!');
  };

  const moveStartingXI = (playerId, targetSlot) => {
    const movingPlayer = players.find(player => player.id === playerId);
    if (!movingPlayer?.isStartingXI || movingPlayer.startingSlot === targetSlot) return;

    const targetPlayer = players.find(player =>
      player.isStartingXI && player.startingSlot === targetSlot
    );

    setPlayers(prev => prev.map(player => {
      if (player.id === playerId) {
        return { ...player, startingSlot: targetSlot };
      }
      if (targetPlayer && player.id === targetPlayer.id) {
        return { ...player, startingSlot: movingPlayer.startingSlot };
      }
      return player;
    }));
    showToast(targetPlayer ? 'First Eleven positions swapped!' : 'First Eleven position updated!');
  };

  const addFormation = (name) => {
    const normalizedName = name.trim();
    const layout = createFormationLayout(normalizedName);
    if (!layout) {
      showToast('Enter a valid formation with lines totaling 10 outfield players, such as 4-2-3-1.', 'error');
      return false;
    }
    if (Object.keys(formations).some(existing => existing.toLowerCase() === normalizedName.toLowerCase())) {
      showToast('That formation already exists.', 'error');
      return false;
    }

    setFormations(prev => ({ ...prev, [normalizedName]: layout }));
    setFormation(normalizedName);
    showToast(`${normalizedName} formation added.`);
    return true;
  };

  // Player of the Week CRUD
  const updatePOTW = async (potwData) => {
    const updated = { ...playerOfTheWeek, ...potwData };
    setPlayerOfTheWeek(updated);

    if (db) {
      try {
        await setDoc(doc(db, 'settings', 'playerOfTheWeek'), updated);
      } catch (e) {
        console.warn('Firestore update failed:', e);
      }
    }

    showToast('Player of the Week updated!');
  };

  // Achievements CRUD
  const addAchievement = async (data) => {
    const newAch = {
      ...data,
      id: 'ach_' + Date.now()
    };
    setAchievements(prev => [newAch, ...prev]);

    if (db) {
      try {
        await setDoc(doc(db, 'achievements', newAch.id), newAch);
      } catch (e) {
        console.warn('Firestore achievement add failed:', e);
      }
    }

    showToast('New club honor added to cabinet!');
  };

  const updateAchievement = async (id, data) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));

    if (db) {
      try {
        await setDoc(doc(db, 'achievements', id), data, { merge: true });
      } catch (e) {
        console.warn('Firestore achievement update failed:', e);
      }
    }

    showToast('Achievement details updated!');
  };

  const deleteAchievement = async (id) => {
    setAchievements(prev => prev.filter(a => a.id !== id));

    if (db) {
      try {
        await deleteDoc(doc(db, 'achievements', id));
      } catch (e) {
        console.warn('Firestore achievement delete failed:', e);
      }
    }

    showToast('Achievement removed.');
  };

  // Club Settings update
  const updateClubSettings = async (newSettings) => {
    setClubSettings(prev => ({ ...prev, ...newSettings }));

    if (db) {
      try {
        await setDoc(doc(db, 'settings', 'clubSettings'), newSettings, { merge: true });
      } catch (e) {
        console.warn('Firestore settings update failed:', e);
      }
    }

    showToast('Club settings saved!');
  };

  // Reset to Defaults
  const resetToSampleData = () => {
    setPlayers(INITIAL_PLAYERS);
    setPlayerOfTheWeek(INITIAL_PLAYER_OF_THE_WEEK);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setClubSettings(INITIAL_SETTINGS);
    localStorage.clear();
    showToast('Reset to default sample data.');
  };

  return (
    <AppContext.Provider
      value={{
        players,
        totalPlayers: players.length,
        addPlayer,
        updatePlayer,
        deletePlayer,
        startingXIPlayers: players.filter(p => p.isStartingXI),
        updateStartingXI,
        moveStartingXI,
        formation,
        setFormation,
        formations,
        addFormation,
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
        isAdmin,
        selectedPlayerModal,
        setSelectedPlayerModal,
        notification,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
