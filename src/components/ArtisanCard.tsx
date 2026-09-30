'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Artisan } from '@/types';
import { ShieldCheck, Volume2 } from 'lucide-react';


interface GovtVerifiedBadgeProps {
  color?: 'sage' | 'terracotta';
  className?: string;
}

export function GovtVerifiedBadge({ color = 'sage', className = '' }: GovtVerifiedBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Sage Green #849A89, Terracotta #C25934
  const iconColor = color === 'sage' ? '#849A89' : '#C25934';
  const bgColor = color === 'sage' ? 'bg-[#849A89]/15' : 'bg-[#C25934]/15';

  return (
    <span 
      className={`relative inline-flex items-center align-middle cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Government Verified Artisan via Adi Karmayogi Portal"
    >
      {/* Hyper-minimal elegant micro-badge circle with shield icon */}
      <span 
        className={`w-4 h-4 rounded-full ${bgColor} flex items-center justify-center transition-transform duration-200 hover:scale-115 border border-[#849A89]/30`}
        style={{ color: iconColor }}
        title="Government Verified"
      >
        <ShieldCheck className="w-2.5 h-2.5" />
      </span>

      {/* Smooth Framer Motion Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none whitespace-nowrap"
          >
            <div className="bg-white/95 backdrop-blur-xs text-[#2C2724] px-2.5 py-1 rounded-md border border-[#E5E0D6] shadow-md flex items-center gap-1.5 text-[10px] tracking-normal font-sans">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: iconColor }} />
              <span className="font-medium text-[#1C1917]">
                Identity & Lineage authenticated via Govt. of India Adi Karmayogi Portal
              </span>
            </div>
            {/* Subtle hairline carat */}
            <div className="w-1.5 h-1.5 bg-white border-r border-b border-[#E5E0D6] rotate-45 mx-auto -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

interface ArtisanCardProps {
  artisan: Artisan;
  onPlayLore?: (artisan: Artisan) => void;
  variant?: 'compact' | 'full';
}

export default function ArtisanCard({ artisan, onPlayLore, variant = 'full' }: ArtisanCardProps) {
  const [avatarSrc, setAvatarSrc] = useState(artisan.avatar);

  React.useEffect(() => {
    setAvatarSrc(artisan.avatar);
  }, [artisan.avatar]);

  return (
    <div className="bg-[#FAF8F5] rounded-2xl border border-[#E5E0D6] p-5 hover:border-[#193225]/40 hover:shadow-xs transition duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3.5 mb-3">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#E5E0D6] flex-shrink-0 bg-white">
            <Image
              src={avatarSrc}
              alt={artisan.name}
              fill
              sizes="56px"
              className="object-cover"
              onError={() => setAvatarSrc('/images/placeholder-art.jpg')}
            />
          </div>
          <div>
            {/* Artisan Name with Government Verified Micro-Badge */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-serif text-lg font-medium text-[#1C1917] leading-snug">
                {artisan.name}
              </h3>
              <GovtVerifiedBadge color="sage" />
            </div>

            {artisan.nativeNameOlChiki && (
              <p className="text-xs text-[#193225] font-medium mt-0.5">
                {artisan.nativeNameOlChiki}
              </p>
            )}
            <p className="text-xs text-[#736B63] mt-0.5">
              {artisan.village}, {artisan.district}
            </p>
          </div>
        </div>

        {variant === 'full' && artisan.oralLoreExcerpt && (
          <p className="text-xs text-[#4A433D] line-clamp-3 leading-relaxed italic bg-white p-3 rounded-xl border border-[#E5E0D6]">
            &ldquo;{artisan.oralLoreExcerpt}&rdquo;
          </p>
        )}

        {variant === 'compact' && (
          <p className="text-xs text-[#5C554E] line-clamp-3 leading-relaxed">
            {artisan.bio}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#E5E0D6] flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#193225] block">
            {artisan.craftSpecialty}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 font-display text-[8.5px] uppercase tracking-wider text-[#14422B] font-semibold bg-[#EAF5EE] px-2 py-0.5 rounded-xs border border-[#6FA47E]/40">
              <ShieldCheck className="w-2.5 h-2.5 text-[#1E743F]" />
              <span>Govt Verified (Adi Karmayogi)</span>
            </span>
            <span className="font-mono text-[10px] text-[#736B63]">
              {artisan.giCertNumber}
            </span>
          </div>
        </div>

        {onPlayLore && (
          <button
            onClick={() => onPlayLore(artisan)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#193225] hover:bg-[#12281D] text-white text-xs font-medium transition shadow-2xs"
            title="Listen to master artisan lore"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Listen Lore</span>
          </button>
        )}
      </div>
    </div>
  );
}
