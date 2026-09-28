'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { ARTWORKS } from '@/data/artworks';
import { ARTISANS } from '@/data/artisans';
import { 
  BarChart3, 
  ShieldCheck, 
  PlusCircle, 
  Wallet, 
  Eye, 
  Bot, 
  Lock, 
  ToggleLeft,
  ToggleRight,
  Palette,
  UserCheck,
  CheckCircle2,
  Award,
  Sparkles,
  Globe,
  Smartphone,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import RoleGateBanner from '@/components/RoleGateBanner';
import CustodianRegistrationModal from '@/components/CustodianRegistrationModal';
import { GovtVerifiedBadge } from '@/components/ArtisanCard';

export default function CustodianDashboard() {
  const { role, setRole } = useRole();
  const currentArtisan = ARTISANS[1]; // Somra Hembrom (Ramgarh Cantt)
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [artworksState, setArtworksState] = useState(
    ARTWORKS.filter((a) => a.artisanId === 'artisan-2' || a.artisanId === 'artisan-1')
  );

  const toggleAvailability = (id: string) => {
    setArtworksState((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isReserved: !item.isReserved } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* RBAC Role Gate Banner */}
        <RoleGateBanner requiredRole="custodian">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E5E0D6]">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#E5E0D6] shadow-2xs flex-shrink-0 bg-white">
                <Image
                  src={currentArtisan.avatar}
                  alt={currentArtisan.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-[9px] uppercase tracking-[0.2em] text-[#193225] bg-[#EBF3ED] px-2.5 py-0.5 border border-[#D5E4D8] rounded-xs font-medium">
                    Verified Master Artisan
                  </span>
                  <GovtVerifiedBadge color="terracotta" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif text-[#1C1917] font-medium mt-1">
                  {currentArtisan.name}’s Studio Console
                </h1>
                <p className="text-xs text-[#5C554E]">
                  {currentArtisan.village}, {currentArtisan.district} • GI Tag: <span className="font-mono text-[#193225]">{currentArtisan.giCertNumber}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsOnboardingModalOpen(true)}
                className="px-3.5 py-2.5 rounded-lg bg-white hover:bg-[#FAF8F5] border border-[#E5E0D6] text-[#193225] text-xs font-medium transition flex items-center gap-1.5 shadow-2xs"
                title="Open Custodian Registration & Onboarding"
              >
                <UserCheck className="w-4 h-4 text-[#193225]" />
                <span className="hidden sm:inline">Custodian Onboarding</span>
              </button>
              <Link
                href="/add-art"
                className="px-4 py-2.5 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium tracking-wide transition shadow-2xs flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Intake New Artwork</span>
              </Link>
              <Link
                href="/earnings"
                className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAF8F5] border border-[#E5E0D6] text-[#1C1917] text-xs font-medium transition flex items-center gap-1.5 shadow-2xs"
              >
                <Wallet className="w-4 h-4 text-[#193225]" />
                <span>90% Payout Ledger</span>
              </Link>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-[#5C554E]">
                <span className="font-display text-[10px] tracking-[0.18em] uppercase">Lifetime 90% Payout</span>
                <Wallet className="w-4 h-4 text-[#193225]" />
              </div>
              <div className="text-2xl font-serif font-medium text-[#1C1917]">
                ₹{currentArtisan.totalEarnings.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#193225] font-medium">
                Direct to {currentArtisan.upiId}
              </div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-[#5C554E]">
                <span className="font-display text-[10px] tracking-[0.18em] uppercase">Catalog Works</span>
                <Palette className="w-4 h-4 text-[#193225]" />
              </div>
              <div className="text-2xl font-serif font-medium text-[#1C1917]">{artworksState.length} Creations</div>
              <div className="text-[11px] text-[#5C554E]">
                {artworksState.filter((a) => !a.isReserved).length} Active for Acquisition
              </div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-[#5C554E]">
                <span className="font-display text-[10px] tracking-[0.18em] uppercase">AI Scraping Blocked</span>
                <Bot className="w-4 h-4 text-[#193225]" />
              </div>
              <div className="text-2xl font-serif font-medium text-[#1C1917]">142 Attempts</div>
              <div className="text-[11px] text-[#193225] font-medium">
                Protected by CC-TRIBAL-1.0
              </div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-[#5C554E]">
                <span className="font-display text-[10px] tracking-[0.18em] uppercase">Heritage GI Compliance</span>
                <ShieldCheck className="w-4 h-4 text-[#193225]" />
              </div>
              <div className="text-2xl font-serif font-medium text-[#1C1917]">100% Certified</div>
              <div className="text-[11px] text-[#5C554E]">
                Natural Forest Soils Only
              </div>
            </div>
          </div>

          {/* AI Defense Log */}
          <div className="p-6 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2 text-[#1C1917] font-serif font-medium text-base">
                <Lock className="w-4 h-4 text-[#193225]" />
                <span>Smart Consent Engine Protocol Logs</span>
              </div>
              <span className="font-display text-[9px] uppercase tracking-wider bg-[#EBF3ED] text-[#193225] font-medium px-2.5 py-0.5 rounded border border-[#D5E4D8]">
                ● Protocol Enforcing
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] flex items-center justify-between">
                <div>
                  <span className="text-red-700 font-medium font-mono text-[11px]">[INTERCEPTED]</span>{' '}
                  <span className="text-[#4A433D]">Commercial Web Scraper (User-Agent: ImageDiffusionBot/4.2)</span>
                </div>
                <span className="text-[#736B63] font-mono text-[11px]">Blocked (HTTP 451)</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] flex items-center justify-between">
                <div>
                  <span className="text-[#193225] font-medium font-mono text-[11px]">[VERIFIED]</span>{' '}
                  <span className="text-[#4A433D]">GI Hash Provenance Audit (Ref: #JH-SOHRAI-2020-0089)</span>
                </div>
                <span className="text-[#736B63] font-mono text-[11px]">Cryptographic Match</span>
              </div>
            </div>
          </div>

          {/* Manage Listed Artworks (My Listings) */}
          <div id="listings" className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-5 scroll-mt-24">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-serif text-[#1C1917] font-medium">
                  Your Listed Artworks & Murals
                </h2>
                <p className="text-xs text-[#5C554E]">
                  Control piece reservation status and monitor GI tag certificates.
                </p>
              </div>
              <Link
                href="/add-art"
                className="font-display text-[11px] tracking-wider uppercase text-[#193225] hover:underline font-medium"
              >
                + Upload Another Creation
              </Link>
            </div>

            <div className="space-y-3">
              {artworksState.map((art) => (
                <div
                  key={art.id}
                  className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white border border-[#E5E0D6] flex-shrink-0">
                      <Image src={art.image} alt={art.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-medium text-[#1C1917]">{art.title}</h4>
                      <p className="text-xs text-[#5C554E]">
                        GI Tag: <span className="font-mono text-[#193225]">{art.giTagNumber}</span>
                      </p>
                      <p className="text-xs text-[#193225] font-medium mt-0.5">
                        Your 90% direct payout: ₹{art.artisanPayout.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span
                      className={`font-display text-[9px] uppercase tracking-wider px-2.5 py-1 rounded border ${
                        art.isReserved
                          ? 'bg-[#F5F2EB] text-[#5C5346] border-[#D9D1C3]'
                          : 'bg-[#EBF3ED] text-[#193225] border-[#D5E4D8]'
                      }`}
                    >
                      {art.isReserved ? 'Reserved for Collector' : 'Available for Acquisition'}
                    </span>

                    <button
                      onClick={() => toggleAvailability(art.id)}
                      className="p-1 text-[#5C554E] hover:text-[#193225] transition"
                      title="Toggle Availability"
                    >
                      {art.isReserved ? (
                        <ToggleRight className="w-7 h-7 text-[#193225]" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-[#5C554E]" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 1. SKILL PROGRESSION SECTION: 'My Digital Skills' */}
          <div className="bg-[#F9F6F0] p-6 sm:p-8 rounded-2xl border border-[#1A1A1A]/10 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A1A1A]/8 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C25934]" />
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[#C25934] font-semibold">
                    Adi Karmayogi Skill Progression
                  </span>
                </div>
                <h2 className="text-2xl font-serif text-[#1A1A1A] font-normal tracking-tight mt-1">
                  My Digital Skills
                </h2>
                <p className="text-xs text-[#1A1A1A]/70 mt-0.5">
                  Verified competencies recognized under the National Tribal Capacity Building Framework.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#193225] text-[11px] font-medium border border-[#D5E4D8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#193225]" />
                  <span>2 of 3 Modules Certified</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Digital Literacy */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-white p-5 rounded-xl border border-[#1A1A1A]/10 shadow-2xs space-y-3 cursor-default"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#C25934]/10 border border-[#C25934]/20 flex items-center justify-center text-[#C25934]">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#EBF3ED] text-[#193225] border border-[#D5E4D8]">
                    <CheckCircle2 className="w-3 h-3 text-[#193225]" />
                    <span>Completed (Verified via Adi Karmayogi)</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                    Digital Literacy
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                    Smartphone operations, direct UPI payment reconciliations, and digital receipt generation for local atelier sales.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1A1A1A]/6 flex items-center justify-between text-[11px] text-[#1A1A1A]/60">
                  <span>Certification ID: <span className="font-mono text-[#1A1A1A] font-medium">AK-LIT-2024</span></span>
                  <span className="text-[#193225] font-medium">100% Score</span>
                </div>
              </motion.div>

              {/* Card 2: E-Commerce Basics */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-white p-5 rounded-xl border border-[#1A1A1A]/10 shadow-2xs space-y-3 cursor-default"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#C25934]/10 border border-[#C25934]/20 flex items-center justify-center text-[#C25934]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#EBF3ED] text-[#193225] border border-[#D5E4D8]">
                    <CheckCircle2 className="w-3 h-3 text-[#193225]" />
                    <span>Completed (Verified via Adi Karmayogi)</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                    E-Commerce Basics
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed">
                    Online inventory cataloging, high-resolution artwork photography, price calculations with 90% direct payout transparency.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1A1A1A]/6 flex items-center justify-between text-[11px] text-[#1A1A1A]/60">
                  <span>Certification ID: <span className="font-mono text-[#1A1A1A] font-medium">AK-ECOM-2024</span></span>
                  <span className="text-[#193225] font-medium">100% Score</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 2. LOCKED/UNLOCKED FEATURES: 'Platform Privileges' */}
          <div className="bg-[#F9F6F0] p-6 sm:p-8 rounded-2xl border border-[#1A1A1A]/10 shadow-2xs space-y-6">
            <div className="border-b border-[#1A1A1A]/8 pb-4">
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[#193225] font-semibold block">
                Sovereign Tier Access
              </span>
              <h2 className="text-2xl font-serif text-[#1A1A1A] font-normal tracking-tight mt-1">
                Platform Privileges
              </h2>
              <p className="text-xs text-[#1A1A1A]/70 mt-0.5">
                Privileges unlock progressively as you verify skilling courses on the Adi Karmayogi portal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Privilege 1: Priority Tourist Placement (UNLOCKED) */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-white p-5 rounded-xl border border-[#849A89]/40 shadow-2xs space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#849A89]/20 border border-[#849A89]/30 flex items-center justify-center text-[#193225]">
                    <Sparkles className="w-5 h-5 text-[#193225]" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF3ED] text-[#193225] border border-[#D5E4D8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#193225] animate-pulse" />
                    UNLOCKED
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                    Priority Tourist Placement
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/75 leading-relaxed">
                    Your atelier works receive premium placement across the Collector Discovery Portal and prominent placement in search results.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1A1A1A]/6">
                  <span className="text-[11px] font-medium text-[#193225]">
                    ✓ Granted due to completed Digital Literacy & E-Commerce modules
                  </span>
                </div>
              </motion.div>

              {/* Privilege 2: International Shipping (LOCKED) */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-[#FAF8F5]/80 p-5 rounded-xl border border-dashed border-[#1A1A1A]/20 shadow-none space-y-3 opacity-80"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]/50">
                    <Lock className="w-5 h-5 text-[#C25934]" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1A1A1A]/5 text-[#1A1A1A]/60 border border-[#1A1A1A]/10">
                    <Lock className="w-3 h-3 text-[#C25934]" />
                    LOCKED
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-medium text-[#1A1A1A]/70">
                    International Shipping
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/60 leading-relaxed">
                    Export original mud canvases and dokra sculptures to overseas collectors with customs clearance and international logistics.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1A1A1A]/6">
                  <p className="text-[11px] text-[#C25934] font-medium leading-tight">
                    Complete the Financial Literacy module on Adi Karmayogi to unlock
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 3. Upskilling & Govt Schemes Minimalist Widget */}
          <div className="p-6 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE3] pb-3">
              <div>
                <span className="font-display text-[9px] uppercase tracking-[0.2em] text-[#736B63] block">
                  Ministry of Tribal Affairs • National Portal
                </span>
                <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                  Upskilling & Govt Schemes
                </h3>
              </div>
              <span className="text-[11px] text-[#5C554E]">
                Direct Benefit Transfer (DBT) & Capacity Skilling
              </span>
            </div>

            <p className="text-xs text-[#5C554E] leading-relaxed max-w-2xl">
              Access certified capacity building modules, Geographical Indication enhancement grants, and sovereign digital welfare schemes administered through the Central Tribal Directorate.
            </p>

            <div className="pt-1">
              <motion.a
                href="https://adiprasaran.tribal.gov.in/adikarmayogi/User_Theme/Dashboardp.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-[#1C1917] transition-colors cursor-pointer"
                whileHover={{ 
                  x: 4, 
                  color: '#C25934' 
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                Access Adi Karmayogi Portal ↗
              </motion.a>
            </div>
          </div>
        </RoleGateBanner>
      </div>

      <CustodianRegistrationModal 
        isOpen={isOnboardingModalOpen} 
        onClose={() => setIsOnboardingModalOpen(false)} 
      />
    </div>
  );
}
