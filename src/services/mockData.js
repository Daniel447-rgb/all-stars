/**
 * Initial Seed Data for ALL Stars Academy
 * Can be synced with Firestore or stored in localStorage
 */

export const INITIAL_PLAYERS = [];

export const INITIAL_PLAYER_OF_THE_WEEK = {
  playerId: '',
  weekTitle: 'Gameweek MVP',
  dateRange: 'Current Matchweek',
  matchHighlight: '',
  coachQuote: '',
  badgeText: 'PLAYER OF THE WEEK'
};

export const INITIAL_ACHIEVEMENTS = [
  {
    id: 'ach-1',
    title: 'State Youth Champions Cup',
    year: '2025',
    category: 'Tournament Gold',
    description: 'Undefeated campaign throughout 8 tournament matches, conceding only 2 goals and scoring 26.',
    badgeIcon: 'Trophy',
    accentColor: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'ach-2',
    title: 'National Elite Academy Cup Runners-Up',
    year: '2025',
    category: 'National Finalist',
    description: 'Reached the national championship final at the National Stadium against top professional academies.',
    badgeIcon: 'Medal',
    accentColor: 'from-slate-300 to-slate-500'
  },
  {
    id: 'ach-3',
    title: 'Regional League Golden Boot Winner',
    year: '2024',
    category: 'Individual Honor',
    description: 'ALL Stars Academy forward secured the regional top scorer award with 28 goals in 22 matches.',
    badgeIcon: 'Award',
    accentColor: 'from-amber-500 to-amber-700'
  },
  {
    id: 'ach-4',
    title: 'Fair Play & Best Disciplined Club',
    year: '2024',
    category: 'Excellence Award',
    description: 'Awarded by the State Football Association for sportsmanship, coaching integrity, and academy character.',
    badgeIcon: 'ShieldCheck',
    accentColor: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'ach-5',
    title: 'Under-17 Summer Invitational Champions',
    year: '2023',
    category: 'Championship',
    description: 'Triumphant 3-0 victory in the tournament final featuring scouts from 6 international professional clubs.',
    badgeIcon: 'Flame',
    accentColor: 'from-orange-400 to-red-600'
  }
];

export const INITIAL_SETTINGS = {
  academyName: 'ALL Stars Academy',
  tagline: 'Forging The Next Generation of Football Royalty',
  coachName: 'Taiwo Johnson',
  coachWhatsapp: '+2347037143782', // Editable in admin
  coachEmail: 'coach@allstarsacademy.com',
  trainingGround: 'ALL Stars Sports Complex, Starway Arena',
  trainingDays: 'Tuesdays, Thursdays & Saturday Mornings',
  heroSlideIntervalSec: 15, // 15 seconds interval as requested
  imgbbApiKey: '3104766d51a3de55e0f8474bd0c409e0', // Free API key for ImgBB uploads
};
