'use client';

import React from 'react';
import Image from 'next/image';
import { LIVING_ATELIERS } from '@/data/trips';
import { MapPin, Clock, Calendar, Check, MessageCircle } from 'lucide-react';

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#193225]/30" />
            <span className="font-display text-[11px] text-[#193225] tracking-[0.24em] uppercase">
              Field Residencies • Chota Nagpur Plateau
            </span>
            <div className="w-8 h-px bg-[#193225]/30" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#1C1917] tracking-tight font-normal">
            Living Ateliers & Mud Mural Residencies
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed max-w-xl mx-auto">
            Travel into the mud hamlets of Ramgarh, Hazaribagh, and Amadubi to grind natural earth minerals on stone, eat traditional earthen-cooked meals, and learn directly from master artisans.
          </p>
        </div>

        {/* Trips List */}
        <div className="space-y-6">
          {LIVING_ATELIERS.map((atelier) => (
            <div
              key={atelier.id}
              className="bg-white rounded-xl border border-[#E5E0D6] shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:border-[#193225]/40 transition duration-300"
            >
              {/* Media */}
              <div className="lg:col-span-5 relative aspect-4/3 lg:aspect-auto lg:h-full bg-[#FAF8F5] p-3 min-h-[280px]">
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#EAE5DC]">
                  <Image
                    src={atelier.image}
                    alt={atelier.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#193225] font-display text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-xs shadow-2xs border border-[#E5E0D6]">
                    {atelier.district} Cluster
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
                <div>
                  <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225]/80 font-medium">
                    {atelier.craftType}
                  </span>
                  <h2 className="text-2xl font-serif text-[#1C1917] font-medium mt-1">
                    {atelier.name}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-[#5C554E] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#193225]" />
                    <span>{atelier.hamlet}, {atelier.district}, Jharkhand</span>
                    <span>•</span>
                    <span className="font-serif italic">Curated by <strong className="font-sans font-medium not-italic text-[#1C1917]">{atelier.curator}</strong></span>
                  </div>
                </div>

                <p className="text-xs text-[#5C554E] leading-relaxed">
                  {atelier.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-1">
                  <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium block">
                    Residency Curriculum:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A433D]">
                    {atelier.workshopHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#193225] flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics Strip */}
                <div className="pt-3 border-t border-[#F2ECE3] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-[#5C554E]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#193225]" />
                      <span>{atelier.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#193225]" />
                      <span>{atelier.nextBatch}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xl font-semibold text-[#1C1917]">
                        ₹{atelier.pricePerParticipant}
                      </span>
                      <span className="text-[10px] text-[#8C8379] block">
                        all-inclusive / participant
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        `Namaste Mitti! I would like to book a spot for "${atelier.name}" in ${atelier.district} (${atelier.nextBatch}). Please send details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs shadow-2xs transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
