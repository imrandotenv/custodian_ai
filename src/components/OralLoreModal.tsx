'use client';

import React from 'react';
import Image from 'next/image';
import { Artisan } from '@/types';
import { useAudio } from '@/context/AudioContext';
import { X, Volume2, MapPin, Award } from 'lucide-react';

interface OralLoreModalProps {
  artisan: Artisan | null;
  onClose: () => void;
}

export default function OralLoreModal({ artisan, onClose }: OralLoreModalProps) {
  const { playTrack } = useAudio();

  if (!artisan) return null;

  const handlePlayVoice = () => {
    playTrack({
      id: artisan.id,
      title: artisan.craftSpecialty,
      artisanName: artisan.name,
      village: artisan.village,
      loreText: artisan.oralLoreExcerpt,
      duration: artisan.audioDuration,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white text-[#1C1917] rounded-xl shadow-xl overflow-hidden border border-[#E5E0D6] my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#5C554E] hover:text-[#1C1917] transition border border-[#E5E0D6]"
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
                Duration: {artisan.audioDuration} • Santhali & Hindi Dialect
              </p>
            </div>

            <button
              onClick={handlePlayVoice}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium shadow-2xs transition"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Lore</span>
            </button>
          </div>

          {/* Lore Excerpt */}
          <div className="space-y-2">
            <h4 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E] font-medium">
              Recorded Oral Folklore Transcript:
            </h4>
            <blockquote className="p-4 bg-[#FAF8F5] rounded-lg border-l-2 border-[#193225] text-xs sm:text-sm text-[#4A433D] font-serif italic leading-relaxed">
              &ldquo;{artisan.oralLoreExcerpt}&rdquo;
            </blockquote>
          </div>

          {/* Artisan Profile Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
              <span className="font-display text-[9px] uppercase tracking-wider text-[#8C8379] block">GI Tag Certification</span>
              <span className="font-mono font-medium text-[#193225] mt-0.5 block">{artisan.giCertNumber}</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
              <span className="font-display text-[9px] uppercase tracking-wider text-[#8C8379] block">Guild Experience</span>
              <span className="font-medium text-[#1C1917] mt-0.5 block">{artisan.experienceYears} Years of Practice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
