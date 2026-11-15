import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, WifiOff, Check } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallBannerProps {
  onOpenAppModal: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ onOpenAppModal }) => {
  const { isInstallable, isInstalled, isOnline, install } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // If running standalone, don't show
    if (isInstalled) {
      setIsVisible(false);
      return;
    }

    const dismissed = sessionStorage.getItem('supermart_pwa_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [isInstalled]);

  const handleInstall = async () => {
    if (isInstallable) {
      setInstalling(true);
      await install();
      setInstalling(false);
      setIsVisible(false);
    } else {
      onOpenAppModal();
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('supermart_pwa_dismissed', 'true');
  };

  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-slate-950 font-bold px-4 py-2 text-xs flex items-center justify-center gap-2 shadow-lg">
        <WifiOff className="w-4 h-4" />
        <span>Offline Mode: Browsing cached supermarket catalog & cart</span>
      </div>
    );
  }

  if (!isVisible || isInstalled) return null;

  return (
    <div className="fixed bottom-20 md:bottom-5 left-3 sm:left-5 z-40 max-w-sm w-[calc(100%-24px)] sm:w-full bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-4 shadow-2xl shadow-emerald-950/60 animate-slideUp">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30 font-black">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                Android & Mobile
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mt-0.5">Install SuperMart 3D App</h4>
            <p className="text-[11px] text-slate-300">
              Instant load, 60fps 3D aisles, and offline grocery access.
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1 transition"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleInstall}
          disabled={installing}
          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{installing ? 'Installing...' : isInstallable ? 'Install Now' : 'Install Android App'}</span>
        </button>
        <button
          onClick={onOpenAppModal}
          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
        >
          Details
        </button>
      </div>
    </div>
  );
};
