'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Palette, 
  UserCheck, 
  Info, 
  Building2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useRole } from '@/context/RoleContext';

interface CustodianRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CustodianRegistrationModal({
  isOpen,
  onClose,
  onSuccess,
}: CustodianRegistrationModalProps) {
  const { setRole } = useRole();
  const [artisanName, setArtisanName] = useState('');
  const [nativeName, setNativeName] = useState('');
  const [village, setVillage] = useState('Gola Road Atelier, Ramgarh Cantt');
  const [craftSpecialty, setCraftSpecialty] = useState('Sohrai Murals');
  const [upiId, setUpiId] = useState('');
  const [adiKarmayogiId, setAdiKarmayogiId] = useState('');
  const [aiConsentPolicy, setAiConsentPolicy] = useState('CC-TRIBAL-1.0-STRICT');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedCustodianId, setGeneratedCustodianId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const mockId = 'CUST-JH-RM-' + Math.floor(1000 + Math.random() * 9000);
      setGeneratedCustodianId(mockId);
      setIsSuccess(true);
      setRole('custodian'); // automatically elevate to Master Artisan Custodian
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-[#1C1917] rounded-2xl shadow-2xl overflow-hidden border border-[#E5E0D6] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-[#FAF8F5] text-[#5C554E] hover:text-[#1C1917] transition border border-[#E5E0D6]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="space-y-2 border-b border-[#F2ECE3] pb-4 pr-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#193225]" />
                <span className="font-display text-[10px] text-[#193225] tracking-[0.24em] uppercase font-semibold">
                  Sovereign Guild Onboarding • Ramgarh Cantt
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] font-medium leading-snug">
                Custodian Artisan Registration
              </h2>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Join the sovereign registry of indigenous master craft custodians. Unlock 90% direct bank remuneration, mint verified GI certificates, and protect ancestral motifs under customary AI consent.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-xs">
              {/* Row 1: Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-[#4A433D] block mb-1">
                    Master Artisan Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muni Devi"
                    value={artisanName}
                    onChange={(e) => setArtisanName(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-[#4A433D] block mb-1">
                    Ol Chiki / Devanagari Native Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ᱢᱩᱱᱤ ᱫᱮᱵᱤ / मुनि देवी"
                    value={nativeName}
                    onChange={(e) => setNativeName(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>
              </div>

              {/* Row 2: Atelier Location & Craft Specialty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-[#4A433D] block mb-1">
                    Atelier Hamlet / District *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gola Road Atelier, Ramgarh Cantt"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-[#4A433D] block mb-1">
                    Heritage Craft Specialty *
                  </label>
                  <select
                    value={craftSpecialty}
                    onChange={(e) => setCraftSpecialty(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225] font-medium"
                  >
                    <option value="Sohrai Murals">Sohrai Cattle Harvest Murals</option>
                    <option value="Khovar Bridal Art">Khovar Bridal Comb-Cut Murals</option>
                    <option value="Paitkar Scroll Art">Paitkar Folk Scroll Painting</option>
                    <option value="Jadopatia Folklore">Jadopatia Santhal Scrolls</option>
                    <option value="Dokra Bell Metal">Dokra Bell Metal Casting</option>
                    <option value="Hand-Painted Home Decor">Hand-Painted Terracotta & Decor</option>
                  </select>
                </div>
              </div>

              {/* Row 3: UPI ID for 90% Direct Disbursal */}
              <div>
                <label className="text-[11px] font-medium text-[#4A433D] block mb-1">
                  Bank / Post Office UPI ID (for 90% Direct Remuneration) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. artisan.ramgarh@sbi or postbank@ippb"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs font-mono text-[#1C1917] focus:outline-none focus:border-[#193225]"
                />
                <span className="text-[10px] text-[#736B63] mt-1 block">
                  All customer payments route 90% immediately to this linked VPA with zero platform deductions.
                </span>
              </div>

              {/* MINIMALIST ADI KARMAYOGI GOVT. ID FIELD - STRICT DESIGN SYSTEM */}
              <div className="pt-2">
                <label 
                  htmlFor="adi-karmayogi-id" 
                  className="text-[11px] font-medium text-[#4A433D] block mb-1.5 font-['Inter',sans-serif]"
                >
                  Adi Karmayogi Govt. ID (Optional)
                </label>
                <input
                  id="adi-karmayogi-id"
                  type="text"
                  placeholder="Enter 12-digit Adi Karmayogi or Tribal Welfare Portal ID"
                  value={adiKarmayogiId}
                  onChange={(e) => setAdiKarmayogiId(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#F9F6F0] border-0 border-b border-black/20 rounded-none text-xs text-[#1C1917] outline-none focus:outline-none focus:ring-0 focus:border-black placeholder:font-['Inter',sans-serif] font-['Inter',sans-serif] placeholder:text-stone-400 transition-colors"
                />
                <p className="text-[11px] text-[#736B63] mt-1.5 flex items-center gap-1.5 font-['Inter',sans-serif]">
                  <Info className="w-3.5 h-3.5 text-[#193225] flex-shrink-0" />
                  <span>Linking your Govt. ID fast-tracks platform verification and unlocks direct scheme benefits</span>
                </p>
              </div>

              {/* Customary AI Consent Protocol */}
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6] space-y-1.5 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] uppercase tracking-wider text-[#193225] font-semibold">
                    Customary AI Consent Covenant (CC-TRIBAL-1.0)
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#193225]" />
                </div>
                <p className="text-[11px] text-[#5C554E]">
                  Your registered works are cryptographically signed. Commercial diffusion models are autonomously blocked from unauthorized training on your ancestral motifs.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#F2ECE3] flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#FAF8F5] hover:bg-stone-200 text-[#1C1917] font-medium text-xs transition border border-[#E5E0D6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs tracking-wide shadow-2xs transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Registering Custodian...</span>
                ) : (
                  <>
                    <span>Complete Custodian Onboarding</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 sm:p-10 space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#EBF3ED] text-[#193225] flex items-center justify-center border border-[#D5E4D8]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="font-display text-[9px] uppercase tracking-[0.2em] bg-[#EBF3ED] text-[#193225] font-semibold px-2.5 py-0.5 rounded border border-[#D5E4D8]">
                Sovereign Custodian Enrolled
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] font-medium mt-2">
                Namaste, {artisanName || 'Master Artisan'}!
              </h2>
              <p className="text-xs text-[#5C554E] max-w-md mx-auto leading-relaxed">
                Your atelier has been successfully enrolled into the Mitti sovereign guild powered by the Smart Consent Engine.
              </p>
            </div>

            {/* Credentials Card */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6] text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between items-center text-[#5C554E]">
                <span>Custodian Ref:</span>
                <span className="font-mono font-semibold text-[#193225]">{generatedCustodianId}</span>
              </div>
              <div className="flex justify-between items-center text-[#5C554E]">
                <span>Atelier Location:</span>
                <span className="font-medium text-[#1C1917]">{village}</span>
              </div>
              <div className="flex justify-between items-center text-[#5C554E]">
                <span>Direct Payout UPI:</span>
                <span className="font-mono font-medium text-[#1C1917]">{upiId}</span>
              </div>
              {adiKarmayogiId && (
                <div className="flex justify-between items-center text-[#5C554E]">
                  <span>Adi Karmayogi ID:</span>
                  <span className="font-mono font-medium text-[#193225]">{adiKarmayogiId}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-[#5C554E]">
                <span>Customary AI Defense:</span>
                <span className="font-semibold text-[#193225]">CC-TRIBAL-1.0 Enforcing</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs shadow-2xs transition"
              >
                Enter Studio Console
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
