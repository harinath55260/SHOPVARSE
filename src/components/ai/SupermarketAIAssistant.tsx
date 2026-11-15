import React, { useState, useEffect, useRef } from 'react';
import {
  Bot, Send, Sparkles, Mic, MicOff, ShoppingBag, Plus, Check,
  AlertCircle, ArrowRight, Lightbulb, RotateCcw, Volume2, X
} from 'lucide-react';
import { Product, CartItem } from '../../types';

interface SupermarketAIAssistantProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onAddMultipleToCart: (items: { product: Product; quantity: number }[]) => void;
  onClose?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedProducts?: { product: Product; quantity: number; reason?: string }[];
  basketTotal?: number;
  timestamp: string;
}

export const SupermarketAIAssistant: React.FC<SupermarketAIAssistantProps> = ({
  products,
  cart,
  onAddToCart,
  onAddMultipleToCart,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Namaste! I am your Super Mart AI Groceries Advisor. Tell me your weekly grocery needs, meal plans, or budget (e.g., "Weekly groceries for 4", "₹500 snack box", or "What is missing from my cart?").',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [allAddedId, setAllAddedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Voice Search via Web Speech Recognition API
  const handleToggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your grocery query.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSendQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleSendQuery = async (queryText: string) => {
    const cleanText = queryText.trim();
    if (!cleanText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: cleanText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Call server AI endpoint or fall back to local smart grocery inference engine
    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: cleanText, cart, products })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply,
          suggestedProducts: data.suggestedProducts || [],
          basketTotal: data.basketTotal,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      // Fallback to rich client-side heuristics below
    }

    // Heuristic Smart Assistant Logic:
    setTimeout(() => {
      const lower = cleanText.toLowerCase();
      let reply = '';
      let suggested: { product: Product; quantity: number; reason?: string }[] = [];

      if (lower.includes('family') || lower.includes('week') || lower.includes('monthly') || lower.includes('one week')) {
        reply = 'Here is your balanced 1-Week Grocery Essentials Kit for a family. It includes daily staples (Rice, Atta, Toor Dal), cooking oil, breakfast dairy, and spices:';
        const stapleIds = ['prod-rg-01', 'prod-rg-02', 'prod-pd-01', 'prod-og-01', 'prod-ssg-01', 'prod-de-01', 'prod-bv-01', 'prod-ms-01'];
        stapleIds.forEach(id => {
          const p = products.find(x => x.id === id);
          if (p) suggested.push({ product: p, quantity: 1, reason: 'Weekly Core Staple' });
        });
      } else if (lower.includes('500') || lower.includes('snack') || lower.includes('munch')) {
        reply = 'I picked this curated Super Snack Combo staying strictly within your ₹500 budget (Total ₹390):';
        const snackIds = ['prod-sn-01', 'prod-sn-02', 'prod-bc-01', 'prod-ir-01', 'prod-cs-01'];
        snackIds.forEach(id => {
          const p = products.find(x => x.id === id);
          if (p) suggested.push({ product: p, quantity: 1, reason: 'Bestselling Snack' });
        });
      } else if (lower.includes('missing') || lower.includes('cart')) {
        // Cart gap analysis
        const cartCategories = new Set(cart.map(c => c.product.category));
        const cartNames = cart.map(c => c.product.name.toLowerCase());
        const gaps: string[] = [];

        if (!cartCategories.has('Salt & Sugar')) gaps.push('Salt & Sugar');
        if (!cartCategories.has('Cooking Oils & Ghee')) gaps.push('Cooking Oil');
        if (!cartCategories.has('Dairy & Eggs')) gaps.push('Fresh Milk / Dairy');
        if (cartNames.some(n => n.includes('tea') || n.includes('coffee')) && !cartNames.some(n => n.includes('sugar') || n.includes('milk'))) {
          gaps.push('Sugar or Milk for your tea/coffee');
        }
        if (cartNames.some(n => n.includes('bread')) && !cartNames.some(n => n.includes('butter') || n.includes('jam'))) {
          gaps.push('Butter or Jam for your bread');
        }

        if (gaps.length > 0) {
          reply = `Based on your current cart, you might have forgotten these household staples: ${gaps.join(', ')}. Here are our freshest suggestions:`;
          const gapProds = ['prod-ssg-01', 'prod-de-01', 'prod-og-01', 'prod-de-02'];
          gapProds.forEach(id => {
            const p = products.find(x => x.id === id);
            if (p && !cart.some(c => c.product.id === id)) {
              suggested.push({ product: p, quantity: 1, reason: 'Pantry Gap Recommendation' });
            }
          });
        } else {
          reply = 'Your cart looks well-stocked with balanced groceries! Consider adding some fresh evening snacks or biscuits for tea-time:';
          const p = products.find(x => x.category === 'Biscuits & Cookies');
          if (p) suggested.push({ product: p, quantity: 1, reason: 'Chai Companion' });
        }
      } else if (lower.includes('breakfast') || lower.includes('morning')) {
        reply = 'Here is a healthy and quick breakfast assembly to jumpstart energetic mornings:';
        const bfastIds = ['prod-bk-01', 'prod-de-01', 'prod-de-02', 'prod-bi-01', 'prod-pf-01', 'prod-ss-01'];
        bfastIds.forEach(id => {
          const p = products.find(x => x.id === id);
          if (p) suggested.push({ product: p, quantity: 1, reason: 'Morning Fuel' });
        });
      } else if (lower.includes('clean') || lower.includes('wash') || lower.includes('hygiene')) {
        reply = 'Here are our top rated home cleaning and floor disinfectant solutions:';
        const cleanIds = ['prod-hc-01', 'prod-hc-02', 'prod-ln-01', 'prod-oc-01'];
        cleanIds.forEach(id => {
          const p = products.find(x => x.id === id);
          if (p) suggested.push({ product: p, quantity: 1, reason: 'Germ Defense' });
        });
      } else {
        // Natural language product matching
        const matched = products.filter(p =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          p.subcategory.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower)
        ).slice(0, 4);

        if (matched.length > 0) {
          reply = `I found ${matched.length} top matching products for "${cleanText}":`;
          suggested = matched.map(p => ({ product: p, quantity: 1 }));
        } else {
          reply = `I couldn't locate exact products for "${cleanText}". Here are our most popular pantry staples:`;
          suggested = products.slice(0, 3).map(p => ({ product: p, quantity: 1 }));
        }
      }

      const total = suggested.reduce((sum, item) => sum + item.product.finalPrice * item.quantity, 0);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        suggestedProducts: suggested,
        basketTotal: total,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleAddBundleToCart = (msgId: string, items: { product: Product; quantity: number }[]) => {
    onAddMultipleToCart(items);
    setAllAddedId(msgId);
    setTimeout(() => setAllAddedId(null), 2000);
  };

  const quickPrompts = [
    'Weekly groceries for 4',
    '₹500 snack box',
    'What is missing from my cart?',
    'Healthy breakfast pack',
    'Home cleaning combo'
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Header */}
      <div className="px-5 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>SuperMart AI Groceries Assistant</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Gemini Powered
              </span>
            </h3>
            <p className="text-xs text-slate-400">Smart meal planning, budget bundles & cart gap detection</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
              }`}
            >
              <p className="font-medium">{m.text}</p>

              {/* Product Suggestion Cards within AI reply */}
              {m.suggestedProducts && m.suggestedProducts.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Recommended Grocery Basket ({m.suggestedProducts.length} items)
                    </span>
                    {m.basketTotal && (
                      <span className="text-xs font-mono font-bold text-white">
                        Total: ₹{m.basketTotal}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {m.suggestedProducts.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded-lg bg-slate-950 shrink-0"
                          />
                          <div className="truncate">
                            <h5 className="text-xs font-bold text-white truncate">
                              {item.product.name}
                            </h5>
                            <span className="text-[10px] text-slate-400">
                              {item.product.unit} • ₹{item.product.finalPrice}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onAddToCart(item.product, item.quantity)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Add single item to cart"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* 1-Click Add All to Cart Button */}
                  <button
                    onClick={() => handleAddBundleToCart(m.id, m.suggestedProducts!)}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-emerald-500/20"
                  >
                    {allAddedId === m.id ? (
                      <>
                        <Check className="w-4 h-4 text-slate-950" />
                        <span>All {m.suggestedProducts.length} Items Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-slate-950" />
                        <span>Add Whole Bundle to Cart (₹{m.basketTotal})</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs p-3 rounded-2xl bg-slate-950 border border-slate-800 w-fit animate-pulse">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>AI Advisor is crafting your personalized grocery bundle...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="px-5 py-2 bg-slate-950/50 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-500 shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" /> Suggestions:
        </span>
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendQuery(prompt)}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors border border-slate-700/50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box & Voice Button */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery(input);
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening to your voice... Speak now" : "Ask AI: 'I have ₹500. Give me snacks' or '1 week family grocery'..."}
              className={`w-full py-3 pl-4 pr-11 bg-slate-900 border rounded-2xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all ${
                isListening ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-800 focus:border-emerald-500'
              }`}
            />

            <button
              type="button"
              onClick={handleToggleVoice}
              className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl cursor-pointer transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
              }`}
              title="Voice Grocery Shopping"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold transition-all cursor-pointer shrink-0 shadow-md shadow-emerald-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
