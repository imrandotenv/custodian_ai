'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LIVING_ATELIERS } from '@/data/trips';
import { MapPin, Calendar, Clock, ArrowRight, MessageCircle } from 'lucide-react';

export default function LivingAteliersMap() {
  const [selectedAtelier, setSelectedAtelier] = useState(LIVING_ATELIERS[0]);

  const directWhatsAppUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Namaste Mitti! I am interested in joining the Living Atelier workshop: "${selectedAtelier.name}" in ${selectedAtelier.district} (₹${selectedAtelier.pricePerParticipant}/person). Please share upcoming dates and registration details.`
  )}`;

  return (
    <section className="py-20 bg-white text-[#1C1917] border-t border-[#E5E0D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#193225]/30" />
              <span className="font-display text-[10px] text-[#193225] tracking-[0.24em] uppercase">
                Field Residencies • Chota Nagpur Plateau
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#1C1917] mt-2 tracking-tight font-normal">
              Living Ateliers & Mud Residencies
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554E] mt-1.5 max-w-2xl leading-relaxed">
              Visit traditional mud homes in Ramgarh, Hazaribagh & Amadubi. Learn ancient comb-cut clay techniques directly from indigenous women masters.
            </p>
          </div>
          <Link
            href="/trips"
            className="inline-flex items-center gap-1.5 font-display text-[11px] tracking-wider uppercase text-[#193225] hover:underline"
          >
            <span>View All Residencies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Map & Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Node Selector */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-5 rounded-xl border border-[#E5E0D6] space-y-3">
            <h3 className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] font-medium mb-2">
              Select Cultural Node (Jharkhand):
            </h3>

            <div className="space-y-2.5">
              {LIVING_ATELIERS.map((atelier) => (
                <button
                  key={atelier.id}
                  onClick={() => setSelectedAtelier(atelier)}
                  className={`w-full p-3.5 rounded-lg border text-left transition flex items-start gap-3 bg-white ${
                    selectedAtelier.id === atelier.id
                      ? 'border-[#193225] shadow-2xs ring-1 ring-[#193225]'
                      : 'border-[#E5E0D6] hover:border-[#193225]/30'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      selectedAtelier.id === atelier.id
                        ? 'bg-[#193225] text-[#FAF8F5]'
                        : 'bg-[#FAF8F5] text-[#5C554E] border border-[#E5E0D6]'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-medium text-[#1C1917] truncate">
                        {atelier.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#193225]">
                        ₹{atelier.pricePerParticipant}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5C554E] mt-0.5">
                      {atelier.hamlet}, {atelier.district}
                    </p>
                    <p className="font-display text-[9px] tracking-wider uppercase text-[#193225] font-medium mt-0.5 truncate">
                      {atelier.craftType}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Mud architecture note */}
            <div className="p-3.5 bg-white rounded-lg border border-[#E5E0D6] text-xs text-[#5C554E] space-y-1">
              <span className="font-serif font-medium text-[#1C1917] block">
                The Mud Architecture of Chota Nagpur:
              </span>
              <p className="text-[11px] leading-relaxed">
                Villages like Bhelwara and Amadubi feature traditional earthen houses coated in white Dudhimati and charcoal clays that act as natural cooling barriers during summer.
              </p>
            </div>
          </div>

          {/* Right Column: Selected Atelier Detailed Card */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6] shadow-2xs overflow-hidden">
            <div className="relative aspect-16/9 bg-stone-100 p-2">
              <div className="relative w-full h-full rounded overflow-hidden">
                <Image
                  src={selectedAtelier.image}
                  alt={selectedAtelier.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#193225] font-display text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-xs shadow-2xs border border-[#E5E0D6]">
                  {selectedAtelier.district} Atelier
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium">
                  {selectedAtelier.craftType}
                </span>
                <h3 className="text-2xl font-serif text-[#1C1917] font-medium mt-0.5">
                  {selectedAtelier.name}
                </h3>
                <p className="text-xs text-[#5C554E] mt-1 leading-relaxed">
                  {selectedAtelier.description}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-[#E5E0D6]">
                  <span className="font-display text-[9px] tracking-wider uppercase text-[#8C8379] block">Duration</span>
                  <span className="font-medium text-[#1C1917] flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#193225]" /> {selectedAtelier.duration}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E5E0D6]">
                  <span className="font-display text-[9px] tracking-wider uppercase text-[#8C8379] block">Next Intake</span>
                  <span className="font-medium text-[#1C1917] flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#193225]" /> {selectedAtelier.nextBatch}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E5E0D6] col-span-2 sm:col-span-1">
                  <span className="font-display text-[9px] tracking-wider uppercase text-[#8C8379] block">Contribution</span>
                  <span className="font-semibold text-[#193225] text-sm mt-0.5 block">
                    ₹{selectedAtelier.pricePerParticipant} / guest
                  </span>
                </div>
              </div>

              {/* Master Mentor */}
              <div className="p-3.5 bg-white rounded-lg border border-[#E5E0D6] flex items-center justify-between">
                <div>
                  <span className="font-display text-[9px] tracking-wider uppercase text-[#8C8379] block">Curator / Master Mentor</span>
                  <span className="text-xs font-serif font-medium text-[#1C1917]">{selectedAtelier.curator}</span>
                </div>
                <span className="font-display text-[9px] tracking-wider uppercase bg-[#EBF3ED] text-[#193225] font-medium px-2 py-0.5 rounded border border-[#D5E4D8]">
                  4 spots left
                </span>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs py-2.5 px-4 rounded-lg shadow-2xs transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Register for Residency on WhatsApp (+91 98765 43210)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
