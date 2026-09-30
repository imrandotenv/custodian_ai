'use client';

import React from 'react';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause, X } from 'lucide-react';


export default function FloatingAudioBar() {
  const { currentTrack, isPlaying, progress, pauseTrack, resumeTrack, stopTrack } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-5 inset-x-4 max-w-xl mx-auto z-50 bg-white/95 text-[#1C1917] rounded-xl shadow-lg border border-[#E5E0D6] p-3.5 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={isPlaying ? pauseTrack : resumeTrack}
          className="w-9 h-9 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white flex items-center justify-center flex-shrink-0 transition shadow-2xs"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-[9px] uppercase tracking-[0.2em] text-[#193225] font-medium">
              Artisan Lore & Bamboo Flute
            </span>
            <span className="font-display text-[9px] uppercase tracking-wider text-[#8C8379]">
              Live Procedural Drone
            </span>
          </div>

          <h4 className="font-serif text-sm font-medium text-[#1C1917] truncate mt-0.5">
            {currentTrack.artisanName} • {currentTrack.village}
          </h4>
          <p className="text-[11px] text-[#5C554E] italic font-serif truncate">
            &ldquo;{currentTrack.loreText}&rdquo;
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-[#E5E0D6] h-1 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-[#193225] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={stopTrack}
          className="p-1.5 text-[#5C554E] hover:text-[#1C1917] hover:bg-[#FAF8F5] rounded transition"
          aria-label="Stop audio"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
