import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceSearchQuery: (query: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onVoiceSearchQuery
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const sampleVoicePrompts = [
    'Show laptops under fifty thousand rupees',
    'Show black running shoes',
    'Find smartphones with 256GB storage',
    'Audiophile ANC wireless headphones'
  ];

  useEffect(() => {
    if (!isOpen) {
      stopListening();
      setTranscript('');
      setRecognitionError(null);
      return;
    }

    startListening();

    return () => {
      stopListening();
    };
  }, [isOpen]);

  const startListening = () => {
    setRecognitionError(null);
    setTranscript('');

    const windowObj = window as any;
    const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setRecognitionError('Speech recognition is not supported in this browser. Try our sample voice prompts below.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setRecognitionError('Microphone permission was denied. You can click any sample voice query below.');
        } else {
          setRecognitionError('Could not capture audio. Please speak clearly or choose a sample prompt.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.warn('Speech recognition start failed:', err);
      setRecognitionError('Speech recognition unavailable. Try sample voice prompts below.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const handleApplyVoiceQuery = (textToSearch: string) => {
    stopListening();
    onVoiceSearchQuery(textToSearch);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mic Circle with Sound Wave Animation */}
        <div className="relative inline-flex items-center justify-center my-6">
          {isListening && (
            <>
              <span className="absolute w-28 h-28 rounded-full bg-cyan-500/20 animate-ping pointer-events-none" />
              <span className="absolute w-24 h-24 rounded-full bg-cyan-500/30 animate-pulse pointer-events-none" />
            </>
          )}

          <button
            onClick={() => (isListening ? stopListening() : startListening())}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer relative z-10 shadow-xl ${
              isListening
                ? 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-slate-950 scale-105 shadow-cyan-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isListening ? <Mic className="w-9 h-9" /> : <MicOff className="w-8 h-8" />}
          </button>
        </div>

        {/* Listening Status */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isListening ? 'Listening for speech...' : 'Microphone Paused'}</span>
          </div>

          <h3 className="text-base font-bold text-white">
            {transcript ? `"${transcript}"` : 'Say what hardware you want to find'}
          </h3>
        </div>

        {/* Audio Waveform Bars */}
        {isListening && (
          <div className="flex items-center justify-center gap-1.5 my-4 h-8">
            {[40, 75, 100, 60, 90, 45, 80, 50, 70, 30].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                className="w-1 bg-cyan-400 rounded-full animate-bounce"
              />
            ))}
          </div>
        )}

        {/* Submit Captured Speech */}
        {transcript && (
          <div className="mt-4">
            <button
              onClick={() => handleApplyVoiceQuery(transcript)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25 transition-all"
            >
              <span>Search for "{transcript}"</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Microphone Error Note */}
        {recognitionError && (
          <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 mt-3">
            {recognitionError}
          </p>
        )}

        {/* Quick Sample Voice Prompts */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-left">
          <span className="text-[11px] font-semibold text-slate-400 block mb-2 text-center">
            Tap a quick sample command:
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {sampleVoicePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleApplyVoiceQuery(prompt)}
                className="p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/30 text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>"{prompt}"</span>
                </span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
