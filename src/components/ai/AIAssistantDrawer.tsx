import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Box, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../../types';

interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedProducts?: Product[];
  timestamp: string;
}

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'Hello! I am ShopVerse AI, your 3D shopping advisor. Ask me for hardware comparisons, price recommendations, or specific gear specifications.',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'Best phone with 3D preview',
    'Show me gaming laptops',
    'Audiophile ANC headphones',
    'Watches under ₹35,000'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend.trim() })
      });

      if (!res.ok) throw new Error('AI service response error');
      const data = await res.json();

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Here are our top recommended options based on your query.',
        recommendedProducts: data.recommendedProducts || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: AIMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'I found these excellent flagship models from our catalog that match your hardware preferences. You can inspect their 3D models directly below.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl flex flex-col">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 text-slate-950 font-bold" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              ShopVerse AI
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </h2>
            <p className="text-[11px] text-slate-400">Intelligent 3D Shopping Advisor</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-medium'
                  : 'bg-slate-900 border border-slate-800 text-slate-200'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* Embedded Product Cards inside chat */}
              {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800 space-y-2.5">
                  <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block">
                    Recommended 3D Gear
                  </span>
                  {msg.recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-lg bg-slate-900 overflow-hidden shrink-0">
                        {prod.images && prod.images[0] ? (
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Box className="w-full h-full p-2 text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-extrabold text-cyan-300 tabular-nums">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {prod.rating}★
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onSelectProduct(prod);
                            onClose();
                          }}
                          title="View 3D"
                          className="p-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                        >
                          <Box className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onAddToCart(prod)}
                          title="Add to Cart"
                          className="p-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 w-fit">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ShopVerse AI is searching catalog & evaluating specs...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-2 border-t border-slate-900 flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-400">
        <span className="text-slate-500 font-medium shrink-0">Ask:</span>
        {sampleQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 rounded-lg border border-slate-800 whitespace-nowrap cursor-pointer transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about phones, laptops, noise cancellation..."
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
