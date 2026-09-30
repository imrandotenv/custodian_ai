'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  Sparkles, 
  MapPin, 
  RotateCcw,
  CheckCircle2,
  Award
} from 'lucide-react';
import { GovtVerifiedBadge } from '@/components/ArtisanCard';

export interface SmartConsentCardProps {
  artistName?: string;
  nativeName?: string;
  heritage?: string;
  artType?: string;
  location?: string;
  giTag?: string;
  imageUrl?: string;
  bio?: string;
  experienceYears?: number;
  onConsentAgreed?: () => void;
  className?: string;
}

export default function SmartConsentCard({
  artistName = 'Muni Devi',
  nativeName = 'ᱢᱩᱱᱤ ᱫᱮᱵᱤ / मुनि देवी',
  heritage = 'Santhal Clan & Khovar Matriarch Lineage',
  artType = 'Comb-Cut White Kaolin Murals & Bridal Iconography',
  location = 'Barkagaon Hamlet, Hazaribagh, Jharkhand',
  giTag = 'GI-JH-KHOVAR-2020-0089',
  imageUrl = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
  bio = 'Custodian of ancient non-verbal kaolin symbols. Muni Devi extracts sacred white dudhimati and manganese clays from deep geological fissures, preparing canvases with ancestral cow-dung wash.',
  experienceYears = 34,
  onConsentAgreed,
  className = '',
}: SmartConsentCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);


  const handleAgree = () => {
    setIsUnlocked(true);
    if (onConsentAgreed) {
      onConsentAgreed();
    }
  };

  const handleRelock = () => {
    setIsUnlocked(false);
  };

  // Framer Motion stagger container for details
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' as const },
    },
  };

  return (
    <div
      className={`w-full max-w-xl mx-auto bg-[#F9F6F0] rounded-2xl border border-[#1A1A1A]/10 shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${className}`}
      style={{ backgroundColor: '#F9F6F0' }}
    >
      {/* Top Header Strip */}
      <div className="px-5 py-3 border-b border-[#1A1A1A]/8 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C25934] animate-pulse" />
          <span className="font-mono text-[10px] tracking-wider uppercase text-[#1A1A1A]/70 font-medium">
            Smart Consent Engine • Protocol 4(a)
          </span>
        </div>

        {isUnlocked ? (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#193225] bg-[#849A89]/20 px-2 py-0.5 rounded-full border border-[#849A89]/30">
              <CheckCircle2 className="w-3 h-3 text-[#193225]" />
              <span>Pledge Accepted</span>
            </span>
            <button
              onClick={handleRelock}
              className="text-[#1A1A1A]/40 hover:text-[#C25934] transition p-1"
              title="Re-lock profile to test interaction again"
              aria-label="Re-lock asset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#C25934] bg-[#C25934]/10 px-2 py-0.5 rounded-full border border-[#C25934]/20">
            <Lock className="w-3 h-3" />
            <span>Consent Locked</span>
          </span>
        )}
      </div>

      {/* Media Canvas Container */}
      <div className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden bg-[#24211E]">
        {/* Underlying High-Quality Artwork / Artist Image */}
        <motion.div
          className="relative w-full h-full"
          animate={{
            filter: isUnlocked ? 'blur(0px)' : 'blur(22px)',
            scale: isUnlocked ? 1 : 1.08,
          }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Image
            src={imageUrl}
            alt={artistName}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Ambient Warm Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* CONSENT OVERLAY (Locked State) */}
        <AnimatePresence>
          {!isUnlocked && (
            <motion.div
              key="consent-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-black/35 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full max-w-sm bg-[#F9F6F0]/95 backdrop-blur-md text-[#1A1A1A] p-6 sm:p-7 rounded-xl border border-white/60 shadow-xl text-center space-y-4"
              >
                {/* Minimalist Lock Badge in Terracotta */}
                <div className="w-12 h-12 mx-auto rounded-full bg-[#C25934]/15 border border-[#C25934]/30 flex items-center justify-center text-[#C25934] shadow-2xs">
                  <Lock className="w-5 h-5" />
                </div>

                {/* Headings in Serif */}
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] font-normal tracking-tight">
                    Protected Cultural Asset
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/75 leading-relaxed font-sans px-1">
                    This community requires visitors to take the Digital Pledge before viewing their sacred art and profiles.
                  </p>
                </div>

                {/* The Interactive Agreement CTA */}
                <div className="pt-1">
                  <motion.button
                    onClick={handleAgree}
                    onMouseEnter={() => setIsHoveredButton(true)}
                    onMouseLeave={() => setIsHoveredButton(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-5 rounded-lg bg-[#C25934] hover:bg-[#A94827] text-white text-xs font-medium tracking-wide shadow-md transition-colors duration-200 flex items-center justify-center gap-2 group"
                  >
                    <Unlock className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                    <span>I Agree to the Protocols</span>
                  </motion.button>
                </div>

                {/* Micro Protocol Footnote */}
                <p className="text-[10px] text-[#1A1A1A]/55 font-mono">
                  License: CC-TRIBAL-1.0 • No AI Scraping
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Badge on Image when Unlocked */}
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute top-3.5 left-3.5 z-10 bg-[#F9F6F0]/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-2xs flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-[#C25934]" />
            <span>{giTag}</span>
          </motion.div>
        )}
      </div>

      {/* Details Container: Staggered reveal upon unlocking */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5 text-[#1A1A1A]">
        <AnimatePresence mode="wait">
          {isUnlocked ? (
            /* UNLOCKED DETAILS (Stagger Animation) */
            <motion.div
              key="unlocked-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {/* Name & Micro-Badge */}
              <motion.div variants={itemVariants} className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] font-normal tracking-tight">
                    {artistName}
                  </h2>
                  <GovtVerifiedBadge color="terracotta" />
                </div>
                {nativeName && (
                  <p className="font-serif italic text-xs text-[#1A1A1A]/60">
                    {nativeName}
                  </p>
                )}
              </motion.div>

              {/* Heritage & Discipline Badges */}
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/85">
                  <Sparkles className="w-3.5 h-3.5 text-[#C25934] flex-shrink-0" />
                  <span className="font-medium text-[#1A1A1A]">{heritage}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C25934] flex-shrink-0" />
                  <span>{artType}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/65">
                  <MapPin className="w-3.5 h-3.5 text-[#1A1A1A]/50 flex-shrink-0" />
                  <span>{location} • {experienceYears} Years Lineage</span>
                </div>
              </motion.div>

              {/* Cultural Lore Bio */}
              <motion.p
                variants={itemVariants}
                className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans pt-1 border-t border-[#1A1A1A]/8"
              >
                {bio}
              </motion.p>

              {/* Economic Justice Strip */}
              <motion.div
                variants={itemVariants}
                className="p-3 bg-white/70 rounded-xl border border-[#1A1A1A]/8 flex items-center justify-between text-xs"
              >
                <span className="text-[#1A1A1A]/70 text-[11px]">Sovereign Payout Guarantee:</span>
                <span className="font-semibold text-[#193225] bg-[#849A89]/20 px-2 py-0.5 rounded border border-[#849A89]/30 text-[11px]">
                  90% Direct Remuneration
                </span>
              </motion.div>
            </motion.div>
          ) : (
            /* LOCKED PLACEHOLDER HINT (Clean minimalist teaser) */
            <motion.div
              key="locked-placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-4 space-y-3"
            >
              <div className="space-y-1.5">
                <div className="h-6 w-44 bg-[#1A1A1A]/10 rounded-md animate-pulse" />
                <div className="h-3.5 w-64 bg-[#1A1A1A]/8 rounded animate-pulse" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-[#1A1A1A]/6 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-[#1A1A1A]/6 rounded animate-pulse" />
              </div>
              <p className="text-xs text-[#1A1A1A]/50 italic pt-1">
                Click &ldquo;I Agree to the Protocols&rdquo; above to unlock lineage credentials and oral lore.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REQUIRED PRIVACY NOTE MICRO-COPY (opacity 60%) */}
        <div className="pt-3 border-t border-[#1A1A1A]/8">
          <p className="text-[10px] text-[#1A1A1A]/60 leading-normal tracking-tight font-sans">
            Protected by Section 4(a) of local custodian rights. Powered by Mitti Smart Consent.
          </p>
        </div>
      </div>
    </div>
  );
}
