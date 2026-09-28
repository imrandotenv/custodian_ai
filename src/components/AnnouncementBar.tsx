'use client';

import React from 'react';
import Link from 'next/link';
import { useAudio } from '@/context/AudioContext';
import { ShieldCheck, MessageCircle, Volume2, VolumeX } from 'lucide-react';

export default function AnnouncementBar() {
  const { toggleAmbientSound, isAmbientPlaying } = useAudio();

  return (
    <div className="bg-[#193225] text-[#F4F1EA] text-[11px] py-2 px-4 border-b border-[#14281E]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="bg-[#264A38] text-white text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide">
            Ramgarh Cantt
          </span>
          <p className="text-[#D8D2C5]">
            Authentic Tribal Handicrafts of Jharkhand • <span className="font-semibold text-white">90% direct payout</span> to indigenous women artisans
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          {/* Ambient Bamboo Flute */}
          <button
            onClick={() => toggleAmbientSound()}
            className="text-[#D8D2C5] hover:text-white flex items-center gap-1.5 transition"
            title="Procedural Indian bamboo flute & tanpura drone"
          >
            {isAmbientPlaying ? <Volume2 className="w-3.5 h-3.5 text-emerald-300" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isAmbientPlaying ? 'Flute: Playing' : 'Ambient Music'}</span>
          </button>

          <span className="text-white/20 hidden md:inline">•</span>

          <Link href="/verify" className="hidden md:inline-flex items-center gap-1 text-[#D8D2C5] hover:text-white transition">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>GI Tag Provenance</span>
          </Link>

          <span className="text-white/20 hidden md:inline">•</span>

          <a
            href="https://wa.me/919876543210?text=Namaste%20Mitti!%20I%20am%20interested%20in%20authentic%20indigenous%20handicrafts."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white font-medium hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp: +91 98765 43210</span>
          </a>
        </div>
      </div>
    </div>
  );
}
