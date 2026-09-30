'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, CheckCircle, Copy, Check } from 'lucide-react';

export default function UpiPaymentModal() {
  const { isUpiModalOpen, setIsUpiModalOpen, subtotal, clearCart } = useCart();

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  if (!isUpiModalOpen) return null;

  const sampleUpiId = 'mitti.artisans@sbi';
  const artisanPayoutTotal = Math.round(subtotal * 0.9);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(sampleUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSimulatePayment = () => {
    const mockTxn = 'UPI' + Math.floor(100000000000 + Math.random() * 900000000000);
    setTransactionRef(mockTxn);
    setPaymentSuccess(true);
    clearCart();
  };

  const handleClose = () => {
    setIsUpiModalOpen(false);
    setPaymentSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white text-[#1C1917] rounded-xl shadow-xl overflow-hidden border border-[#E5E0D6] my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-[#FAF8F5] text-[#5C554E] hover:text-[#1C1917] transition border border-[#E5E0D6]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!paymentSuccess ? (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-px bg-[#193225]/30" />
                <span className="font-display text-[10px] text-[#193225] tracking-[0.2em] uppercase font-medium">
                  Direct Settlement Protocol
                </span>
                <div className="w-6 h-px bg-[#193225]/30" />
              </div>
              <h3 className="text-2xl font-serif text-[#1C1917] font-medium mt-1">
                Scan & Pay via any UPI App
              </h3>
              <p className="text-xs text-[#5C554E]">
                90% direct payout straight into tribal artisan accounts
              </p>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-6 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6]">
              <div className="w-44 h-44 bg-white p-3 rounded-xl shadow-2xs border border-[#E5E0D6] flex flex-col items-center justify-center relative">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-stone-50 rounded-lg">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-2xs ${
                        i % 2 === 0 || i % 7 === 0 || i % 5 === 0
                          ? 'bg-[#193225]'
                          : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-lg bg-[#193225] text-white flex items-center justify-center font-bold text-xs tracking-wider font-display shadow-md">
                    MG
                  </div>
                </div>
              </div>

              {/* Amount Display */}
              <div className="mt-4 text-center">
                <span className="text-3xl font-serif text-[#1C1917] font-semibold">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
                <p className="text-xs text-[#193225] font-medium mt-0.5">
                  ₹{artisanPayoutTotal.toLocaleString('en-IN')} (90%) directly routed to artisan pool
                </p>
              </div>
            </div>

            {/* Copy UPI ID */}
            <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs">
              <div>
                <span className="font-display text-[9px] uppercase tracking-wider text-[#8C8379] block">Official UPI ID</span>
                <span className="font-mono font-medium text-[#1C1917]">{sampleUpiId}</span>
              </div>
              <button
                onClick={handleCopyUpi}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white border border-[#E5E0D6] text-[#1C1917] font-medium transition hover:bg-stone-50 text-[11px]"
              >
                {copiedUpi ? <Check className="w-3.5 h-3.5 text-[#193225]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Simulate Instant Payment for Demo */}
            <button
              onClick={handleSimulatePayment}
              className="w-full py-3 px-4 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-2xs transition"
            >
              <CheckCircle className="w-4 h-4" />
              <span>[Demo] Simulate Instant Payment Verification</span>
            </button>
          </div>
        ) : (
          /* Payment Success State */
          <div className="p-6 sm:p-8 space-y-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EBF3ED] text-[#193225] flex items-center justify-center text-3xl border border-[#D5E4D8]">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="font-display text-[9px] uppercase tracking-[0.2em] bg-[#EBF3ED] text-[#193225] font-medium px-2.5 py-0.5 rounded border border-[#D5E4D8]">
                Payment Settled & Verified
              </span>
              <h3 className="text-2xl font-serif text-[#1C1917] font-medium mt-2">
                Dhanyawad! Payment Received.
              </h3>
              <p className="text-xs text-[#5C554E] mt-1 max-w-sm mx-auto">
                Your direct contribution of <strong className="text-[#193225]">₹{artisanPayoutTotal.toLocaleString('en-IN')}</strong> has been earmarked for the master artisans in Ramgarh Cantt.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-left text-xs space-y-1.5">
              <div className="flex justify-between text-[#5C554E]">
                <span>Transaction Ref:</span>
                <span className="font-mono text-[#1C1917] font-medium">{transactionRef}</span>
              </div>
              <div className="flex justify-between text-[#5C554E]">
                <span>Total Settled:</span>
                <span className="font-medium text-[#1C1917]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#193225] font-medium">
                <span>Artisan Direct Split (90%):</span>
                <span>₹{artisanPayoutTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#5C554E]">
                <span>Dispatched From:</span>
                <span className="text-[#1C1917]">Mitti Central Atelier, Ramgarh Cantt</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={`https://wa.me/919876543210?text=Namaste!%20I%20have%20completed%20UPI%20payment%20(Ref:%20${transactionRef})%20for%20my%20Mitti%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Notify Atelier on WhatsApp</span>
              </a>
              <button
                onClick={handleClose}
                className="py-2.5 px-5 rounded-lg bg-[#FAF8F5] hover:bg-stone-200 text-[#1C1917] font-medium text-xs transition border border-[#E5E0D6]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
