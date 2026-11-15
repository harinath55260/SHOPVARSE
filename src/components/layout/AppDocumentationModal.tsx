import React, { useState } from 'react';
import {
  X, BookOpen, Layers, Database, KeyRound, Store, Shield,
  Box, Terminal, Search, Copy, Check, ExternalLink, Code2, Sparkles, CheckCircle2
} from 'lucide-react';

interface AppDocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppDocumentationModal: React.FC<AppDocumentationModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [activeSection, setActiveSection] = useState<
    'overview' | 'schema' | 'auth' | 'seller' | 'admin' | '3d' | 'api' | 'deploy'
  >('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const sections = [
    { id: 'overview', title: 'System Overview', icon: Layers, badge: 'React 19 + Three.js' },
    { id: 'schema', title: 'Database & Prisma', icon: Database, badge: 'PostgreSQL' },
    { id: 'auth', title: 'Google OAuth & Auth', icon: KeyRound, badge: 'OAuth 2.0' },
    { id: 'seller', title: 'Seller Owner Controls', icon: Store, badge: 'Merchant Hub' },
    { id: 'admin', title: 'Admin Master Controls', icon: Shield, badge: 'Governance' },
    { id: '3d', title: '3D WebGL Engine', icon: Box, badge: 'Three.js' },
    { id: 'api', title: 'REST API Specs', icon: Code2, badge: 'Express 4' },
    { id: 'deploy', title: 'Run & Deploy Guide', icon: Terminal, badge: 'Production' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200 font-sans">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-display">
                  ShopVerse 3D Complete Documentation
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  v2.0.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full-Stack Architecture, Database Schemas, Owner Controls & API Reference
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body with Sidebar Navigation */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/40 p-3 space-y-1 overflow-y-auto shrink-0">
            <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Documentation Modules
            </div>
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="truncate">{s.title}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0 font-mono">
                    {s.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content Pane */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-300">
            
            {/* SECTION 1: SYSTEM OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">1. System Overview & Tech Stack</h3>
                  <p className="text-slate-400 text-xs">
                    Next-Generation 3D Spatial E-Commerce Platform built with React 19, Three.js WebGL, Tailwind CSS v4, Express server, and PostgreSQL Prisma schema.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white text-sm block">Frontend Engine</span>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      <li><strong className="text-slate-200">React 19 & TypeScript:</strong> Reactive modern functional architecture</li>
                      <li><strong className="text-slate-200">Three.js WebGL:</strong> Real-time 3D spatial interactive canvas</li>
                      <li><strong className="text-slate-200">Tailwind CSS v4:</strong> Cybernetic dark UI with Zero-Pill discipline</li>
                      <li><strong className="text-slate-200">Lucide React:</strong> Consistent high-contrast iconography</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white text-sm block">Backend & Database</span>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      <li><strong className="text-slate-200">Express 4 on Node.js:</strong> Full-stack server with Vite middlewares</li>
                      <li><strong className="text-slate-200">PostgreSQL + Prisma:</strong> Scalable relational schema and migrations</li>
                      <li><strong className="text-slate-200">Google OAuth 2.0:</strong> Official Google Identity Services integration</li>
                      <li><strong className="text-slate-200">Google Gemini API:</strong> Spatial shopping AI concierge</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="font-bold text-white block mb-2">Core Value Propositions</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="font-bold text-cyan-400 block mb-1">Interactive 3D WebGL</span>
                      <p className="text-slate-400 text-[11px]">Orbit, zoom, examine PBR materials, and test procedural color swatches in 3D.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="font-bold text-emerald-400 block mb-1">Dual Owner Controls</span>
                      <p className="text-slate-400 text-[11px]">Separate Store Owner (Seller Hub) and Master Governance (Admin Console) tiers.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="font-bold text-amber-400 block mb-1">Complete Checkout Flow</span>
                      <p className="text-slate-400 text-[11px]">4-step checkout with UPI, Cards, NetBanking, COD, EMI, and printable packing manifests.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: DATABASE & PRISMA */}
            {activeSection === 'schema' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">2. Database Architecture & Prisma Schema</h3>
                    <p className="text-slate-400 text-xs">
                      PostgreSQL relational definitions located in <code className="text-cyan-400">/database/schema.prisma</code> and <code className="text-cyan-400">/database/migrations/0_init/migration.sql</code>.
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`// Prisma Schema Snippet
model User {
  id         String   @id @default(cuid())
  email      String   @unique
  name       String
  role       Role     @default(CUSTOMER)
  provider   String   @default("email")
  providerId String?
  isBlocked  Boolean  @default(false)
  createdAt  DateTime @default(now())
}`, 'schema')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs cursor-pointer"
                  >
                    {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'schema' ? 'Copied' : 'Copy Schema'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] overflow-x-auto text-slate-300">
                    <pre className="text-emerald-400 mb-2">// Key PostgreSQL Models in Prisma:</pre>
                    <p className="text-cyan-300 font-bold">User</p>
                    <p className="text-slate-400 ml-4">id, email, password, name, role (CUSTOMER, SELLER, ADMIN), provider, providerId, isBlocked</p>
                    
                    <p className="text-cyan-300 font-bold mt-2">Product</p>
                    <p className="text-slate-400 ml-4">id, name, brand, category, price, originalPrice, stock, lowStockThreshold, model3D, colorVariants (JSON), isPaused, isFeatured, isTrending, sellerId</p>

                    <p className="text-cyan-300 font-bold mt-2">Order & OrderItem</p>
                    <p className="text-slate-400 ml-4">id, userId, customerName, totalAmount, orderStatus, paymentStatus, courierPartner, trackingNumber, timeline (JSON), items (OrderItem[])</p>

                    <p className="text-cyan-300 font-bold mt-2">PayoutRequest & SellerProfile</p>
                    <p className="text-slate-400 ml-4">sellerId, storeName, commissionRate, amount, status (pending, approved, processed), bankAccount, ifscOrUpi, transactionRef</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="font-bold text-white block mb-1">Direct Google Provider Fields</span>
                      <p className="text-slate-400 text-[11px]">
                        The <code className="text-cyan-400">provider</code> and <code className="text-cyan-400">providerId</code> columns persist Google federated identities cleanly without requiring passwords.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="font-bold text-white block mb-1">JSON Geometry & Colors</span>
                      <p className="text-slate-400 text-[11px]">
                        Color swatches and specs are stored as JSON arrays for zero-friction schema evolution across diverse 3D device categories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: AUTH & GOOGLE OAUTH */}
            {activeSection === 'auth' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">3. Direct Google OAuth & Authentication System</h3>
                  <p className="text-slate-400 text-xs">
                    Dual-authentication pipeline supporting official Google OAuth 2.0 direct login and email/password with strength validation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-blue-400 text-sm flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4" /> Direct Google Account Integration
                    </span>
                    <p className="text-slate-400 text-[11px]">
                      Opens <code className="text-cyan-400">GoogleAccountModal.tsx</code>. Users choose an active Google profile (e.g. Hari Harinath), which dispatches to <code className="text-cyan-400">POST /api/auth/google</code>. The profile receives an official Google badge in the navbar and profile view.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                      <Shield className="w-4 h-4" /> Password Auth & Role Selection
                    </span>
                    <p className="text-slate-400 text-[11px]">
                      Features real-time password strength progress bar (Length, Numbers, Uppercase). Users can register as Customer, Store Owner / Seller, or Platform Admin.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="font-bold text-white block mb-2">Role-Based Access Control (RBAC)</span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead className="text-slate-500 border-b border-slate-800 font-bold uppercase">
                        <tr>
                          <th className="py-2">Role</th>
                          <th className="py-2">Marketplace</th>
                          <th className="py-2">Seller Hub</th>
                          <th className="py-2">Admin Console</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        <tr>
                          <td className="py-2 font-bold text-cyan-400">Customer</td>
                          <td className="py-2 text-emerald-400">Full Access</td>
                          <td className="py-2 text-slate-500">Restricted</td>
                          <td className="py-2 text-slate-500">Restricted</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold text-amber-400">Seller</td>
                          <td className="py-2 text-emerald-400">Full Access</td>
                          <td className="py-2 text-emerald-400">Full Access</td>
                          <td className="py-2 text-slate-500">Restricted</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold text-rose-400">Admin</td>
                          <td className="py-2 text-emerald-400">Full Access</td>
                          <td className="py-2 text-emerald-400">Full Access</td>
                          <td className="py-2 text-emerald-400">Full Master Governance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: SELLER OWNER CONTROLS */}
            {activeSection === 'seller' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">4. Product Selling System & Store Owner Controls</h3>
                  <p className="text-slate-400 text-xs">
                    Empowers verified merchants to publish 3D hardware, manage stock thresholds, assign courier carriers, generate tax-compliant packing slips, and withdraw sales revenue.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-cyan-400 text-sm">Product & Inventory Controls</span>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      <li><strong>Live / Pause Switch:</strong> Soft-pause sales without losing reviews or rankings</li>
                      <li><strong>Edit Product Modal:</strong> Update Price, MRP, Stock, Low-stock limit, 3D mesh</li>
                      <li><strong>1-Click Restock:</strong> Rapid +10 and +25 unit replenishment buttons</li>
                      <li><strong>Color Swatch Builder:</strong> Dynamic HTML5 color pickers for PBR shaders</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-emerald-400 text-sm">Dispatch & Payout Suite</span>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                      <li><strong>Printable Packing Slip Modal:</strong> Ready for print with GSTIN, AWB, Barcode</li>
                      <li><strong>Logistics Assignment:</strong> Delhivery, BlueDart, FedEx tracking numbers</li>
                      <li><strong>Payout Modal:</strong> Withdraw earnings via direct IMPS or UPI VPA</li>
                      <li><strong>Vacation Mode:</strong> Mark storefront on break while keeping catalog visible</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5: ADMIN MASTER CONTROLS */}
            {activeSection === 'admin' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">5. Master Owner Governance (Admin Console)</h3>
                  <p className="text-slate-400 text-xs">
                    Platform owner master controls for managing economics, merchant audits, catalog curation, payout settlement releases, and account security.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">
                      1
                    </span>
                    <div>
                      <strong className="text-white block text-sm">Global Commission Take-Rate Slider (0–25%)</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Platform owner can dynamically alter the percentage fee deducted from all orders, set minimum payout limits, and broadcast announcement banners.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">
                      2
                    </span>
                    <div>
                      <strong className="text-white block text-sm">Merchant Verification & Suspension</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Grant or revoke the Verified 3D Merchant badge, set custom vendor commission overrides (e.g. VIP 7.0%), or suspend fraudulent storefronts.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold shrink-0">
                      3
                    </span>
                    <div>
                      <strong className="text-white block text-sm">Payout Auditing & Release Queue</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Review pending merchant withdrawal requests and approve/release funds with generated bank UTR reference numbers or reject with audit notes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 6: 3D WEBGL ENGINE */}
            {activeSection === '3d' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">6. Interactive 3D WebGL Canvas Engine</h3>
                  <p className="text-slate-400 text-xs">
                    Real-time hardware visualization with procedural Three.js meshes, lighting environments, and physical materials.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Smartphone 3D', desc: 'Chamfered alloy bezel, triple-lens camera bump, glossy glass front' },
                    { name: 'Ultrabook Laptop 3D', desc: 'Hinged display deck, ergonomic keyboard base, trackpad' },
                    { name: 'Studio Headphones 3D', desc: 'Padded acoustic earcups, adjustable metallic headband torus' },
                    { name: 'Smartwatch 3D', desc: 'Cylindrical watch body, digital crown button, dual silicone straps' },
                    { name: 'Sneaker 3D', desc: 'Aerodynamic running sole, cushioned midsole, multi-layered mesh' },
                    { name: 'Gaming Controller 3D', desc: 'Twin analog thumbsticks, ergonomic palm grips, shoulder triggers' }
                  ].map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="font-bold text-cyan-400 block mb-0.5">{m.name}</span>
                      <p className="text-slate-400 text-[10px]">{m.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="font-bold text-white block mb-1">Scene Lighting & Controls</span>
                  <p className="text-slate-400 text-[11px]">
                    Includes soft shadow ambient lighting, directional sun light (position: [5, 10, 7]), and dual cybernetic rim accent lights. Shoppers can toggle turntable auto-rotation, wireframe topology, or exploded parts mode.
                  </p>
                </div>
              </div>
            )}

            {/* SECTION 7: REST API SPECS */}
            {activeSection === 'api' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">7. REST API Endpoints Specification</h3>
                  <p className="text-slate-400 text-xs">
                    Full-stack endpoints served by Express 4 on port 3000.
                  </p>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-emerald-400 font-bold mr-2">POST</span>
                      <span className="text-white">/api/auth/google</span>
                    </div>
                    <span className="text-slate-400">Direct Google OAuth Identity Verification</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-blue-400 font-bold mr-2">GET</span>
                      <span className="text-white">/api/products</span>
                    </div>
                    <span className="text-slate-400">Query catalog with search & category filters</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-emerald-400 font-bold mr-2">POST</span>
                      <span className="text-white">/api/products</span>
                    </div>
                    <span className="text-slate-400">Publish new 3D device listing (Merchant)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-amber-400 font-bold mr-2">PUT</span>
                      <span className="text-white">/api/products/:id</span>
                    </div>
                    <span className="text-slate-400">Update pricing, stock & pause status</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-rose-400 font-bold mr-2">DELETE</span>
                      <span className="text-white">/api/products/:id</span>
                    </div>
                    <span className="text-slate-400">Delete listing from 3D mall</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-amber-400 font-bold mr-2">PUT</span>
                      <span className="text-white">/api/orders/:id</span>
                    </div>
                    <span className="text-slate-400">Update order status & courier partner</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-rose-400 font-bold mr-2">DELETE</span>
                      <span className="text-white">/api/coupons/:code</span>
                    </div>
                    <span className="text-slate-400">Revoke platform promotional voucher</span>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 8: RUN & DEPLOY */}
            {activeSection === 'deploy' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">8. Run, Build & Deployment Guide</h3>
                  <p className="text-slate-400 text-xs">
                    Instructions for local development, TypeScript linting, and production deployment.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-400 block font-sans font-bold">1. Development Environment (Port 3000)</span>
                    <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-300 font-mono flex items-center justify-between">
                      <span>npm run dev</span>
                      <button
                        onClick={() => copyToClipboard('npm run dev', 'cmd1')}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        {copiedKey === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-400 block font-sans font-bold">2. Type Validation & Build</span>
                    <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-300 font-mono flex items-center justify-between">
                      <span>npm run lint && npm run build</span>
                      <button
                        onClick={() => copyToClipboard('npm run lint && npm run build', 'cmd2')}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        {copiedKey === 'cmd2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-400 block font-sans font-bold">3. Launch Production Server</span>
                    <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-300 font-mono flex items-center justify-between">
                      <span>npm start</span>
                      <button
                        onClick={() => copyToClipboard('npm start', 'cmd3')}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        {copiedKey === 'cmd3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ShopVerse 3D Engine · Production Ready</span>
          </div>
          <span>Comprehensive Technical Documentation</span>
        </div>
      </div>
    </div>
  );
};
