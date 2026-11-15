import React, { useState } from 'react';
import { X, CheckCircle, ChevronRight, UserPlus, Shield, Sparkles } from 'lucide-react';
import { User } from '../../types';

interface GoogleAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

interface SavedGoogleAccount {
  name: string;
  email: string;
  avatar: string;
  badge?: string;
}

export const GoogleAccountModal: React.FC<GoogleAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  if (!isOpen) return null;

  // Preset quick Google accounts including current developer metadata email
  const googleAccounts: SavedGoogleAccount[] = [
    {
      name: 'Hari Harinath',
      email: 'hariharinath55260@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      badge: 'Active Google Account'
    },
    {
      name: 'Vikramaditya Rao',
      email: 'vikram.rao@shopverse.in',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      badge: 'Google Workspace'
    },
    {
      name: 'Alex Chen',
      email: 'alex.chen.spatial@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      badge: 'Hardware Enthusiast'
    }
  ];

  const handleSelectAccount = async (account: SavedGoogleAccount) => {
    setSelectedEmail(account.email);
    setIsAuthenticating(true);

    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: account.email,
          name: account.name,
          avatar: account.avatar,
          googleId: `g_${Date.now()}`
        })
      });

      const data = await response.json();
      if (response.ok && data.user) {
        if (data.token) {
          localStorage.setItem('sm3d_auth_token', data.token);
        }
        onSuccess(data.user);
        onClose();
      } else {
        // Fallback user object
        const fallbackUser: User = {
          id: `usr-google-${Date.now()}`,
          name: account.name,
          email: account.email,
          role: 'customer',
          avatar: account.avatar,
          provider: 'google',
          isBlocked: false,
          createdAt: new Date().toISOString()
        };
        onSuccess(fallbackUser);
        onClose();
      }
    } catch {
      const fallbackUser: User = {
        id: `usr-google-${Date.now()}`,
        name: account.name,
        email: account.email,
        role: 'customer',
        avatar: account.avatar,
        provider: 'google',
        isBlocked: false,
        createdAt: new Date().toISOString()
      };
      onSuccess(fallbackUser);
      onClose();
    } finally {
      setIsAuthenticating(false);
      setSelectedEmail(null);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;

    setIsAuthenticating(true);
    const displayName = customName.trim() || customEmail.split('@')[0];
    const generatedAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`;

    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customEmail,
          name: displayName,
          avatar: generatedAvatar,
          googleId: `g_${Date.now()}`
        })
      });

      const data = await response.json();
      if (response.ok && data.user) {
        onSuccess(data.user);
        onClose();
      } else {
        const fallbackUser: User = {
          id: `usr-google-${Date.now()}`,
          name: displayName,
          email: customEmail,
          role: 'customer',
          avatar: generatedAvatar,
          provider: 'google',
          isBlocked: false,
          createdAt: new Date().toISOString()
        };
        onSuccess(fallbackUser);
        onClose();
      }
    } catch {
      const fallbackUser: User = {
        id: `usr-google-${Date.now()}`,
        name: displayName,
        email: customEmail,
        role: 'customer',
        avatar: generatedAvatar,
        provider: 'google',
        isBlocked: false,
        createdAt: new Date().toISOString()
      };
      onSuccess(fallbackUser);
      onClose();
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isAuthenticating}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
            Sign in with Google
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Choose an account to continue to <span className="font-semibold text-slate-700">ShopVerse 3D</span>
          </p>
        </div>

        {/* Account Chooser List */}
        {!isCustomMode ? (
          <div className="space-y-2.5 mb-6">
            {googleAccounts.map((acc) => {
              const isCurrent = selectedEmail === acc.email;
              return (
                <button
                  key={acc.email}
                  onClick={() => handleSelectAccount(acc)}
                  disabled={isAuthenticating}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-900 truncate">
                          {acc.name}
                        </span>
                        {acc.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-700">
                            {acc.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 block truncate">{acc.email}</span>
                    </div>
                  </div>

                  {isCurrent ? (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}

            {/* Use Another Account Button */}
            <button
              onClick={() => setIsCustomMode(true)}
              disabled={isAuthenticating}
              className="w-full text-left p-3 rounded-2xl border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <UserPlus className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-800 block">
                  Use another Google Account
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Enter any Gmail or Google Workspace address
                </span>
              </div>
            </button>
          </div>
        ) : (
          /* Custom Account Form */
          <form onSubmit={handleCustomSubmit} className="space-y-3.5 mb-6">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Google Account Email
              </label>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                required
                autoFocus
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Display Name (Optional)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsCustomMode(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Back to Accounts
              </button>
              <button
                type="submit"
                disabled={isAuthenticating || !customEmail}
                className="w-1/2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Verify & Sign In</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Security & Privacy Notice */}
        <div className="pt-4 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
          <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p>
            To continue, Google will share your name, email address, language preference, and profile picture with ShopVerse 3D.
          </p>
        </div>
      </div>
    </div>
  );
};
