import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X, Check, ShieldCheck, MapPin, Truck, CreditCard,
  QrCode, Smartphone, Building2, Banknote, Wallet, ArrowRight,
  Download, Printer, CheckCircle2, Package, Sparkles
} from 'lucide-react';
import { CartItem, Order, PaymentMethod, Coupon } from '../../types';

interface CheckoutModalProps {
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  deliverySlot: string;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  cart,
  appliedCoupon,
  deliverySlot,
  onClose,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'address' | 'delivery' | 'payment' | 'confirmation'>('address');

  // Address State
  const [address, setAddress] = useState({
    fullName: 'Hari Hari Nath',
    phone: '+91 98765 43210',
    street: 'Flat 402, Green Glen Layout, Bellandur',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    addressType: 'HOME'
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('hari@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 8900 1234 5678');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('892');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Financials
  const subtotal = cart.reduce((sum, item) => sum + item.product.finalPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 499 ? 0 : 40;
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'flat') couponDiscount = appliedCoupon.discount;
    else couponDiscount = Math.min(appliedCoupon.maxDiscount, Math.round((subtotal * appliedCoupon.discount) / 100));
  }
  const tax = Math.round(subtotal * 0.05); // 5% GST on packaged grocery items
  const totalAmount = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      const token = localStorage.getItem('sm3d_auth_token');
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          items: cart.map(i => ({
            productId: i.product.id,
            quantity: i.quantity
          })),
          shippingAddress: {
            street: address.street,
            city: address.city,
            state: address.state,
            pincode: address.pincode
          },
          deliverySlot,
          paymentMethod,
          couponCode: appliedCoupon?.code,
          customerName: address.fullName,
          customerPhone: address.phone
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order. Server rejected transaction.');
      }

      const verifiedOrder: Order = data.order;
      setConfirmedOrder(verifiedOrder);
      setIsProcessing(false);
      setStep('confirmation');
      onOrderSuccess(verifiedOrder);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } catch (err: any) {
      setIsProcessing(false);
      alert(err.message || 'Error communicating with secure payment gateway. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[94vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>SuperMart 3D Secure Checkout</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  256-Bit Encrypted
                </span>
              </h3>
              <p className="text-xs text-slate-400">FSSAI Certified Fresh & Express Doorstep Delivery</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Bar (Hidden on confirmation) */}
        {step !== 'confirmation' && (
          <div className="px-6 py-3 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step === 'address' ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                1
              </span>
              <span className={step === 'address' ? 'text-white' : 'text-slate-400'}>Delivery Address</span>
            </div>

            <div className="h-px w-12 bg-slate-800" />

            <div className="flex items-center gap-2 font-bold">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step === 'delivery' ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                2
              </span>
              <span className={step === 'delivery' ? 'text-white' : 'text-slate-400'}>Delivery Slot</span>
            </div>

            <div className="h-px w-12 bg-slate-800" />

            <div className="flex items-center gap-2 font-bold">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step === 'payment' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                3
              </span>
              <span className={step === 'payment' ? 'text-white' : 'text-slate-400'}>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Main Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: ADDRESS */}
          {step === 'address' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Confirm Delivery Location</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-medium font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-slate-400 block mb-1">Street Address / House No / Apartment</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Pincode (Instant Serviceable)</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-medium font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep('delivery')}
                  className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <span>Continue to Delivery Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY SLOT */}
          {step === 'delivery' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Selected Delivery Speed & Slot</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-300">{deliverySlot}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    Confirmed Slot
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your groceries will be hand-picked from the local temperature-controlled warehouse and delivered in eco-friendly tamper-proof bags.
                </p>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep('address')}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('payment')}
                  className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Choose Payment Method</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-400 font-mono">
                  To Pay: ₹{totalAmount}
                </span>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
                {(['UPI', 'Card', 'NetBanking', 'COD', 'Wallet'] as PaymentMethod[]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === method
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {method === 'UPI' && <Smartphone className="w-4 h-4" />}
                    {method === 'Card' && <CreditCard className="w-4 h-4" />}
                    {method === 'NetBanking' && <Building2 className="w-4 h-4" />}
                    {method === 'COD' && <Banknote className="w-4 h-4" />}
                    {method === 'Wallet' && <Wallet className="w-4 h-4" />}
                    <span>{method}</span>
                  </button>
                ))}
              </div>

              {/* Method Specific UI */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                {paymentMethod === 'UPI' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-bold">UPI ID / VPA</span>
                      <span className="text-emerald-400 font-medium">Instant Verification</span>
                    </div>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] pt-1">
                      <QrCode className="w-4 h-4 text-cyan-400" />
                      <span>QR Code will also be displayed on screen for 1-click payment</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-slate-400 block mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          maxLength={3}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="space-y-2">
                    <p className="text-slate-300 font-medium">
                      Pay with cash or UPI QR scanner upon delivery handover at your door.
                    </p>
                    <span className="text-[11px] text-emerald-400 font-bold block">
                      Zero additional cash collection fee.
                    </span>
                  </div>
                )}

                {paymentMethod === 'NetBanking' && (
                  <p className="text-slate-400">
                    Supports HDFC, State Bank of India, ICICI, Axis, Kotak and all major Indian banks.
                  </p>
                )}

                {paymentMethod === 'Wallet' && (
                  <p className="text-slate-400">
                    Pay using SuperMart Wallet balance (₹1,500 available).
                  </p>
                )}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setStep('delivery')}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="py-3 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isProcessing ? 'Authorizing Payment...' : `Place Order (₹${totalAmount})`}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMATION & INVOICE */}
          {step === 'confirmation' && confirmedOrder && (
            <div className="space-y-6 max-w-2xl mx-auto text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-white">Order Successfully Placed!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Order ID: <strong className="font-mono text-emerald-400">{confirmedOrder.id}</strong> • Tracking #{confirmedOrder.trackingNumber}
                </p>
              </div>

              {/* Order Tracking Timeline */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3 text-xs">
                <h5 className="font-bold text-white flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-emerald-400" />
                  <span>Real-Time Milestone Timeline</span>
                </h5>

                <div className="space-y-3 pt-2">
                  {confirmedOrder.timeline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center text-[9px] font-bold ${
                        item.completed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {item.completed ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className={`font-bold ${item.completed ? 'text-white' : 'text-slate-400'}`}>
                            {item.status}
                          </span>
                          <span className="text-slate-500 text-[10px]">{item.date}</span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Tax Invoice</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-2.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-emerald-500/20"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
