'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Loader2, 
  X, 
  Building2, 
  Landmark, 
  ArrowRight,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface EscrowCheckoutProps {
  artworkName: string;
  price: number;
  onClose?: () => void;
  isModal?: boolean;
  className?: string;
}

export default function EscrowCheckout({
  artworkName,
  price,
  onClose,
  isModal = true,
  className = '',
}: EscrowCheckoutProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Exact math logic breakdown
  const basePrice = Math.max(0, price);
  const artisanPayout = Math.round(basePrice * 0.9);
  const escrowFee = Math.round(basePrice * 0.1);

  const handleProcessEscrow = async () => {
    if (status === 'loading') return;
    setStatus('loading');

    // 1-second simulated escrow smart contract processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#193225', '#C25934', '#15803d', '#FAF8F5'],
      });
    } catch {
      // safe fallback if confetti is unavailable
    }
  };

  const handleReset = () => {
    setStatus('idle');
  };

  const content = (
    <div className={`relative w-full max-w-lg bg-white rounded-2xl border border-[#E5E0D6] shadow-2xl overflow-hidden text-[#1C1917] ${className}`}>
      {/* Header Plaque */}
      <div className="bg-[#FAF8F5] p-6 border-b border-[#E5E0D6]">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-display text-[9px] uppercase tracking-[0.2em] text-[#193225] bg-[#EBF3ED] px-2.5 py-0.5 border border-[#D5E4D8] rounded-xs font-semibold">
                <ShieldCheck className="w-3 h-3 text-[#193225]" />
                Smart Escrow Protocol
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C8379] bg-stone-100 px-2 py-0.5 rounded border border-[#EAE5DC]">
                90/10 Split
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#1C1917] pt-1">
              Escrow Checkout
            </h2>
            <p className="text-xs text-[#5C554E] line-clamp-1">
              Securing acquisition for: <span className="font-medium text-[#1C1917]">{artworkName}</span>
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white hover:bg-stone-100 text-[#5C554E] hover:text-[#1C1917] border border-[#E5E0D6] transition cursor-pointer"
              aria-label="Close Checkout"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body Area */}
      <div className="p-6 space-y-5">
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="ledger-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Transparent Fee Ledger Card */}
              <div className="bg-[#FAF8F5] rounded-xl p-4 sm:p-5 border border-[#E5E0D6] space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE5DC] text-[11px] font-display uppercase tracking-wider text-[#8C8379]">
                  <span>Fee Component</span>
                  <span>Allocation</span>
                </div>

                {/* 1. Base Price */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#4A433D]">
                  <span className="font-serif">Base Price:</span>
                  <span className="font-medium font-sans text-[#1C1917]">
                    ₹{basePrice.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* 2. Artisan Direct Payout (90%) - Highlighted in Green */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#EBF3ED] border border-[#B8D8C0] text-[#193225] shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#193225] animate-pulse" />
                    <div>
                      <span className="font-semibold text-xs sm:text-sm block">
                        Artisan Direct Payout (90%):
                      </span>
                      <span className="text-[10px] text-[#2E7D32] block font-mono">
                        Disbursed directly via UPI / NEFT
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-sm sm:text-base text-[#193225] font-sans">
                    ₹{artisanPayout.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* 3. Mitti Platform Escrow Fee (10%) */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-[#5C554E] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#8C8379]" />
                    <span className="font-serif">Mitti Platform Escrow Fee (10%):</span>
                  </div>
                  <span className="font-medium font-sans text-[#5C554E]">
                    ₹{escrowFee.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Total Line */}
                <div className="pt-3 border-t border-[#E5E0D6] flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-display font-medium text-[#8C8379] block">
                      Total Payable
                    </span>
                    <span className="text-[10px] text-[#193225] font-serif italic">
                      Zero hidden processing charges
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-bold font-sans text-[#1C1917]">
                      ₹{basePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust & Guarantee Banner */}
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#EAE5DC] text-[11px] text-[#5C554E]">
                <Lock className="w-4 h-4 text-[#193225] flex-shrink-0" />
                <p className="leading-snug">
                  Funds remain locked in decentralized escrow until the physical Geographical Indication (GI) physical dispatch tag is verified at arrival.
                </p>
              </div>

              {/* Framer Motion Animated Action Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={handleProcessEscrow}
                disabled={status === 'loading'}
                className={`w-full py-3.5 px-6 rounded-xl font-medium text-xs sm:text-sm text-white shadow-md flex items-center justify-center gap-2.5 transition-colors cursor-pointer disabled:cursor-not-allowed ${
                  status === 'loading'
                    ? 'bg-[#193225]/85'
                    : 'bg-[#193225] hover:bg-[#12241A] active:bg-[#0E1B13]'
                }`}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span className="tracking-wide">Locking Escrow Smart Contract (1s)...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#8CD19D]" />
                    <span className="tracking-wide">Process Secure Escrow Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-center py-4 space-y-4"
            >
              {/* Success Badge */}
              <div className="relative w-16 h-16 mx-auto rounded-full bg-[#EBF3ED] border-2 border-[#193225] flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-9 h-9 text-[#193225]" />
                <motion.div
                  className="absolute inset-0 rounded-full border border-[#193225]"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>

              {/* Exact required success message */}
              <div className="space-y-2">
                <span className="inline-block font-display text-[9px] uppercase tracking-[0.2em] text-[#193225] bg-[#EBF3ED] px-3 py-1 rounded-full border border-[#D5E4D8] font-bold">
                  Escrow Contract Locked
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-medium text-[#1C1917] px-2 leading-snug">
                  Payment Escrowed. 90% routed directly to Artisan&apos;s verified bank account.
                </h3>
                <p className="text-xs text-[#5C554E] max-w-sm mx-auto leading-relaxed pt-1">
                  ₹{artisanPayout.toLocaleString('en-IN')} has been earmarked and guaranteed for instant release upon delivery of <span className="italic font-medium text-[#1C1917]">&ldquo;{artworkName}&rdquo;</span>.
                </p>
              </div>

              {/* Escrow Transaction Summary Card */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#E5E0D6] text-xs space-y-2 text-left">
                <div className="flex justify-between items-center text-[#5C554E]">
                  <span className="font-serif">Settlement Route:</span>
                  <span className="font-medium text-[#193225]">RBI Direct Custodian Gateway</span>
                </div>
                <div className="flex justify-between items-center text-[#5C554E]">
                  <span className="font-serif">Disbursal Ratio:</span>
                  <span className="font-mono text-[#193225] font-semibold">90% Artisan / 10% Studio</span>
                </div>
                <div className="flex justify-between items-center text-[#5C554E]">
                  <span className="font-serif">Escrow Reference:</span>
                  <span className="font-mono text-[11px] text-[#1C1917]">ESC-{Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-stone-50 border border-[#E5E0D6] text-xs font-medium text-[#5C554E] hover:text-[#1C1917] transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Test Again</span>
                </button>

                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium transition cursor-pointer shadow-2xs"
                  >
                    <span>Done</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (!isModal) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      {content}
    </div>
  );
}
