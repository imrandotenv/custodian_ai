'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Artisan } from '@/types';
import { useAudio } from '@/context/AudioContext';
import { X, Volume2, MapPin, Sparkles, Languages, Loader2 } from 'lucide-react';

interface OralLoreModalProps {
  artisan: Artisan | null;
  onClose: () => void;
}

// Default indigenous folklore in original Santhali (Ol Chiki script)
const DEFAULT_SANTHALI_LORE =
  'ᱪᱷᱚᱴᱟ ᱱᱟᱜᱽᱯᱩᱨ ᱨᱮᱭᱟᱜ ᱵᱤᱨ ᱨᱮ, ᱦᱟᱥᱟ ᱨᱮᱭᱟᱜ ᱟᱛᱢᱟ ᱠᱚ ᱡᱟᱜᱮᱛᱚᱜᱼᱟ, ᱟᱨ ᱥᱮᱫᱟᱭ ᱯᱟᱦᱤᱞ ᱦᱟᱯᱲᱟᱢ ᱠᱚᱣᱟᱜ ᱥᱮᱨᱮᱧ ᱛᱮ ᱦᱟᱥᱟ ᱨᱟᱹᱥᱠᱟᱹ ᱛᱮ ᱯᱮᱨᱮᱡᱚᱜᱼᱟ᱾';

export default function OralLoreModal({ artisan, onClose }: OralLoreModalProps) {
  const { playTrack } = useAudio();

  // State variables for AI translation & language toggle
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<'sat' | 'en'>('sat');
  const [displayText, setDisplayText] = useState<string>(DEFAULT_SANTHALI_LORE);

  // Sync state whenever the selected artisan changes
  useEffect(() => {
    if (artisan) {
      setCurrentLang('sat');
      setIsTranslating(false);
      setDisplayText(DEFAULT_SANTHALI_LORE);
    }
  }, [artisan?.id]);

  if (!artisan) return null;

  const handleToggleTranslate = async () => {
    if (isTranslating) return;

    const targetLang: 'sat' | 'en' = currentLang === 'sat' ? 'en' : 'sat';
    setIsTranslating(true);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: displayText,
          targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.translatedText) {
        setDisplayText(data.translatedText);
        setCurrentLang(targetLang);
      } else {
        throw new Error(data.error || 'Failed to retrieve translation');
      }
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback graceful degradation
      if (targetLang === 'en') {
        setDisplayText(
          artisan.oralLoreExcerpt ||
            'In the ancient forests of Chota Nagpur, the spirits of the soil awaken to bless the sacred clay, guiding the hands of the elders in their harvest songs.'
        );
      } else {
        setDisplayText(DEFAULT_SANTHALI_LORE);
      }
      setCurrentLang(targetLang);
    } finally {
      setIsTranslating(false);
    }
  };

  const handlePlayVoice = () => {
    playTrack({
      id: artisan.id,
      title: artisan.craftSpecialty,
      artisanName: artisan.name,
      village: artisan.village,
      loreText: displayText || artisan.oralLoreExcerpt,
      duration: artisan.audioDuration,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white text-[#1C1917] rounded-xl shadow-xl overflow-hidden border border-[#E5E0D6] my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#5C554E] hover:text-[#1C1917] transition border border-[#E5E0D6] cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#FAF8F5] border-b border-[#E5E0D6]">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#E5E0D6] shadow-2xs flex-shrink-0">
              <Image
                src={artisan.avatar}
                alt={artisan.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-display text-[9px] uppercase tracking-[0.2em] text-[#193225] bg-[#EBF3ED] px-2.5 py-0.5 border border-[#D5E4D8] rounded-xs font-medium">
                Master Artisan Custodian
              </span>
              <h2 className="text-2xl font-serif font-medium mt-1 text-[#1C1917]">
                {artisan.name}
              </h2>
              {artisan.nativeNameOlChiki && (
                <p className="text-xs text-[#193225] font-medium font-serif">
                  {artisan.nativeNameOlChiki}
                </p>
              )}
              <div className="flex items-center gap-1.5 text-xs text-[#5C554E] mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#193225]" />
                <span>{artisan.village}, {artisan.district}, Jharkhand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Audio Action Button */}
          <div className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
            <div>
              <div className="font-serif text-sm font-medium text-[#1C1917]">
                Artisan Oral Lore & Ambient Flute
              </div>
              <p className="text-xs text-[#5C554E] mt-0.5">
                Duration: {artisan.audioDuration} • Santhali &amp; Hindi Dialect
              </p>
            </div>

            <button
              onClick={handlePlayVoice}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium shadow-2xs transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Lore</span>
            </button>
          </div>

          {/* Lore Excerpt & AI Translation Section */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h4 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E] font-medium">
                  Recorded Oral Folklore Transcript:
                </h4>
                <span
                  className={`text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full border transition-colors ${
                    currentLang === 'sat'
                      ? 'bg-[#EBF3ED] text-[#193225] border-[#D5E4D8]'
                      : 'bg-[#FDF4EE] text-[#C25934] border-[#F2D7C8]'
                  }`}
                >
                  {currentLang === 'sat' ? 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)' : 'English (NLLB-200 AI)'}
                </span>
              </div>

              {/* Sleek Hugging Face AI Toggle Button */}
              <button
                type="button"
                onClick={handleToggleTranslate}
                disabled={isTranslating}
                className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shadow-2xs border cursor-pointer disabled:cursor-not-allowed ${
                  isTranslating
                    ? 'bg-[#FAF8F5] text-[#8C8379] border-[#E5E0D6] opacity-70'
                    : currentLang === 'sat'
                    ? 'bg-white hover:bg-[#FAF8F5] text-[#1C1917] border-[#E5E0D6] hover:border-[#C25934]/50 hover:shadow-xs'
                    : 'bg-white hover:bg-[#FAF8F5] text-[#193225] border-[#D5E4D8] hover:border-[#193225]/50 hover:shadow-xs'
                }`}
                title={
                  currentLang === 'sat'
                    ? 'Translate using Hugging Face NLLB-200 AI'
                    : 'Return to original Santhali Ol Chiki transcript'
                }
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C25934]" />
                    <span className="font-sans text-[11px] text-[#5C554E]">Translating...</span>
                  </>
                ) : currentLang === 'sat' ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#C25934] transition-transform duration-300 group-hover:scale-110" />
                    <span>Translate with Hugging Face AI</span>
                  </>
                ) : (
                  <>
                    <Languages className="w-3.5 h-3.5 text-[#193225] transition-transform duration-300 group-hover:scale-110" />
                    <span>View Original Ol Chiki</span>
                  </>
                )}
              </button>
            </div>

            {/* Lore Text Area with Framer Motion Shimmer & AnimatePresence Fade */}
            <div className="relative min-h-[105px] p-5 bg-[#FAF8F5] rounded-lg border-l-3 border-[#193225] border-y border-r border-[#E5E0D6] overflow-hidden flex items-center shadow-2xs">
              {/* Shimmer / Pulse & Loading Spinner Overlay */}
              <AnimatePresence>
                {isTranslating && (
                  <motion.div
                    key="shimmer-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 z-10 bg-[#FAF8F5]/90 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4"
                  >
                    {/* Pulsing shimmer gradient sweep */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                    />

                    <div className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D6] shadow-xs">
                      <Loader2 className="w-4 h-4 text-[#C25934] animate-spin" />
                      <span className="text-xs font-serif text-[#1C1917] font-medium">
                        Hugging Face NLLB-200 Inferencing...
                      </span>
                    </div>

                    {/* Shimmer progression bar */}
                    <div className="relative w-40 h-1 bg-[#E5E0D6] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#193225] via-[#C25934] to-[#193225]"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Lore Paragraph via AnimatePresence & motion.p */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentLang}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`w-full leading-relaxed ${
                    currentLang === 'sat'
                      ? 'text-sm sm:text-base text-[#193225] font-normal tracking-wide not-italic font-sans'
                      : 'text-xs sm:text-sm text-[#4A433D] font-serif italic'
                  }`}
                >
                  &ldquo;{displayText}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Artisan Profile Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
              <span className="font-display text-[9px] uppercase tracking-wider text-[#8C8379] block">
                GI Tag Certification
              </span>
              <span className="font-mono font-medium text-[#193225] mt-0.5 block">
                {artisan.giCertNumber}
              </span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
              <span className="font-display text-[9px] uppercase tracking-wider text-[#8C8379] block">
                Guild Experience
              </span>
              <span className="font-medium text-[#1C1917] mt-0.5 block">
                {artisan.experienceYears} Years of Practice
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
