import React, { useState } from 'react';
import {
  Smartphone, Download, ShieldCheck, Zap, WifiOff, Check, X,
  ExternalLink, Copy, CheckCheck, QrCode, Sparkles, Layers, Box
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidAppModal: React.FC<AndroidAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://supermart3d.app';

  const handleInstallClick = async () => {
    setInstalling(true);
    const success = await install();
    setInstalling(false);
    if (success) {
      setInstalledSuccess(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/50 text-white my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Android Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 p-2.5">
            <Smartphone className="w-full h-full text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Official Android App
              </span>
              <span className="text-xs text-slate-400">v2.4 PWA Ready</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">SuperMart 3D for Android</h2>
          </div>
        </div>

        {/* Primary Action Button based on state */}
        <div className="bg-emerald-950/40 border border-emerald-500/25 rounded-2xl p-4 mb-6">
          {isInstalled || installedSuccess ? (
            <div className="flex items-center gap-3 text-emerald-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-white">App is Installed on this Device!</p>
                <p className="text-xs text-emerald-400/80">
                  Launch SuperMart 3D from your home screen or app drawer for the full 3D shopping experience.
                </p>
              </div>
            </div>
          ) : isInstallable ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white">1-Click Quick Android Install</p>
                <p className="text-xs text-slate-300">Instant setup with offline groceries & fullscreen 3D view.</p>
              </div>
              <button
                onClick={handleInstallClick}
                disabled={installing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition transform active:scale-95"
              >
                <Download className="w-5 h-5" />
                {installing ? 'Installing...' : 'Install Android App'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-white">Install on Android Device</p>
                <span className="text-xs text-emerald-400">Chrome / Edge / Samsung Browser</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <li>Open this link in <strong className="text-white">Google Chrome</strong> on your Android phone.</li>
                <li>Tap the <strong className="text-white">Three Dots (⋮)</strong> menu in the top right.</li>
                <li>Tap <strong className="text-emerald-400">"Install app"</strong> or <strong className="text-emerald-400">"Add to Home Screen"</strong>.</li>
                <li>SuperMart 3D will appear as a native Android app with its own icon!</li>
              </ol>
            </div>
          )}
        </div>

        {/* Native App Capabilities Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold text-white">60 FPS 3D Aisles</span>
            </div>
            <p className="text-[11px] text-slate-400">Hardware-accelerated WebGL rendering optimized for Android GPUs.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-teal-400 mb-1">
              <WifiOff className="w-4 h-4" />
              <span className="text-xs font-semibold text-white">Offline Cache</span>
            </div>
            <p className="text-[11px] text-slate-400">Browse saved cart and product catalog even without stable internet.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold text-white">Zero URL Bar</span>
            </div>
            <p className="text-[11px] text-slate-400">Immersive edge-to-edge native display without browser navigation clutter.</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-semibold text-white">TWA / APK Ready</span>
            </div>
            <p className="text-[11px] text-slate-400">W3C compliant manifest ready for Google Play Store packaging.</p>
          </div>
        </div>

        {/* Share / Open on Phone Section */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">Open on Your Android Phone:</span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 overflow-x-auto select-all">
            <span>{currentUrl}</span>
          </div>

          {/* Developer / Play Store APK Note */}
          <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Package name: <code className="text-emerald-400">com.supermart3d.app</code></span>
            <span className="bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
              Trusted Web Activity
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
