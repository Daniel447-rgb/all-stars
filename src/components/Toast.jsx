import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast() {
  const { notification } = useApp();

  if (!notification) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border border-amber-500/30 transition-all duration-300 animate-slide-up bg-slate-900/95 text-white">
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
      )}
      <p className="text-sm font-medium tracking-wide">{notification.message}</p>
    </div>
  );
}
