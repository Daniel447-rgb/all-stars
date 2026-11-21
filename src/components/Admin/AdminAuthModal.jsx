import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  signInWithGoogle, 
  signInAdminEmail, 
  logOutAdmin,
  checkIsAdmin,
  auth 
} from '../../services/firebase';
import { 
  Lock, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  KeyRound, 
  Mail, 
  Sparkles,
  Info
} from 'lucide-react';

export default function AdminAuthModal({ isOpen, onClose, onAuthSuccess }) {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // 1. Google Sign-In with Firebase Auth
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      if (checkIsAdmin(res.user)) {
        showToast(`Welcome Administrator!`);
        onAuthSuccess();
        onClose();
      } else {
        await logOutAdmin();
        setErrorMsg('Access Denied: The signed-in Google account is not an authorized administrator.');
      }
    } catch (err) {
      console.warn('Google sign-in error:', err);
      setErrorMsg(err.message || 'Firebase Google Sign-In failed. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Email / Password Sign-In with Firebase Auth
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both your administrator email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await signInAdminEmail(email.trim(), password);
      if (checkIsAdmin(res.user)) {
        showToast('Authentication successful. Welcome to Admin Control!');
        onAuthSuccess();
        onClose();
      } else {
        await logOutAdmin();
        setErrorMsg('Access Denied: This account does not possess administrator privileges.');
      }
    } catch (err) {
      console.warn('Firebase Email sign-in:', err);
      setErrorMsg(
        err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
          ? 'Invalid administrator email or password.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-slide-in">
      
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#0d1017] border border-[#262f44] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#cba358] via-[#e5c07b] to-[#8e6d2b] text-[#07090e] flex items-center justify-center mx-auto shadow-xl shadow-[#cba358]/20">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black uppercase text-white tracking-wide">
            Staff <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3df9b] to-[#cba358]">Portal</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Authorized club management login. Authenticate via Firebase to access squad and match controls.
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-tight">{errorMsg}</span>
          </div>
        )}

        {/* Google Sign In with Firebase */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3.5 rounded-2xl text-xs font-bold bg-[#07090e] hover:bg-[#131722] text-white border border-[#1b212f] hover:border-[#cba358]/40 transition-all flex items-center justify-center gap-3 shadow cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#1b212f] w-full" />
          <span className="bg-[#0d1017] px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Or Email & Password
          </span>
          <div className="border-t border-[#1b212f] w-full" />
        </div>

        {/* Firebase Email / Password Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@allstarsacademy.com"
                className="w-full bg-[#07090e] border border-[#1b212f] focus:border-[#cba358] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#07090e] border border-[#1b212f] focus:border-[#cba358] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#cba358] via-[#e5c07b] to-[#a88238] hover:from-[#d8b368] hover:to-[#b79044] text-[#07090e] shadow-xl shadow-[#cba358]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Verifying with Firebase...' : 'Sign In as Administrator'}
          </button>
        </form>

        <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          <span>Secured with Firebase Authentication</span>
        </div>

      </div>
    </div>
  );
}
