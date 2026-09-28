'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Droplets, Mountain, Check } from 'lucide-react';

interface PigmentInfo {
  id: string;
  name: string;
  hindiName: string;
  colorHex: string;
  source: string;
  ritualSignificance: string;
  traditionalBinder: string;
  artForms: string;
  image: string;
}

export default function SoilPigmentAlchemy() {
  const pigments: PigmentInfo[] = [
    {
      id: 'dudhimati',
      name: 'Dudhimati (White Kaolin Clay)',
      hindiName: 'दूधीमाटी (श्वेत मृत्तिका)',
      colorHex: '#FDFBF7',
      source: 'Chano & Parasnath hill fissures (extracted before harvest season)',
      ritualSignificance: 'Represents ancestral purity, mother’s milk, and the protective river path of ancestors.',
      traditionalBinder: 'Crushed rice flour water (Atap chaawal maadh) & babul tree resin',
      artForms: 'Khovar Bridal Art & Sohrai Wall Borders',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'lalgeru',
      name: 'Lal Geru (Red Hematite Ochre)',
      hindiName: 'लाल गेरू (रक्त मृतिका)',
      colorHex: '#7A2E1D',
      source: 'Damodar river valley gorges & iron-rich hill ravines',
      ritualSignificance: 'Consecrates the horns of cattle during Sohrai; wards off predatory wild forest spirits.',
      traditionalBinder: 'Mahua flower sap & wood-apple (Bael) gum',
      artForms: 'Sohrai Cattle Harvest Murals & Terracotta Pottery',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'kalamati',
      name: 'Kala Mati (Black Manganese)',
      hindiName: 'काला माटी (मैंगनीज पाषाण)',
      colorHex: '#1E1A17',
      source: 'Stream-bed manganese sedimentary shelves across Hazaribagh',
      ritualSignificance: 'Forms the sacred darkness inside the Khovar bridal chamber before comb-cut revelation.',
      traditionalBinder: 'Tamarind seed decoction & charred sal wood soot',
      artForms: 'Comb-Cut Khovar Cave Murals & Jadopatia Scrolls',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'pilamati',
      name: 'Pila Mati (Yellow Ochre)',
      hindiName: 'पीला माटी (पीत मृदा)',
      colorHex: '#B8860B',
      source: 'Limestone river silt formations along Chota Nagpur plateau',
      ritualSignificance: 'Symbolizes ripening winter paddy crop, fertility of the womb, and golden sunshine.',
      traditionalBinder: 'Pomegranate rind extract & raw river silt clay',
      artForms: 'Paitkar Narrative Scrolls & Sohrai Wildlife Murals',
      image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const [activePigment, setActivePigment] = useState<PigmentInfo>(pigments[0]);
  const [grindingAnim, setGrindingAnim] = useState<boolean>(false);

  const handleSelectPigment = (pigment: PigmentInfo) => {
    setGrindingAnim(true);
    setActivePigment(pigment);
    setTimeout(() => setGrindingAnim(false), 700);
  };

  return (
    <section className="py-20 bg-[#FAF8F5] text-[#1C1917] border-t border-[#E5E0D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#193225]/30" />
            <span className="font-display text-[11px] text-[#193225] tracking-[0.24em] uppercase">
              Earth Mineral Alchemy • Zero Synthetic Paints
            </span>
            <div className="w-8 h-px bg-[#193225]/30" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1C1917] tracking-tight font-normal">
            The 4 Sacred Earth Clays of Jharkhand
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
            Tribal women artisans harvest natural clays from hill fissures and river ravines, grinding them by hand on stone <em>sil-batta</em> with native tree gums and mahua sap.
          </p>
        </div>

        {/* 4 Clay Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {pigments.map((p) => {
            const isSelected = activePigment.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPigment(p)}
                className={`p-4 rounded-xl border text-left transition duration-200 flex flex-col justify-between space-y-3 bg-white ${
                  isSelected
                    ? 'border-[#193225] shadow-xs ring-1 ring-[#193225]'
                    : 'border-[#E5E0D6] hover:border-[#193225]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-5 h-5 rounded-full border border-[#E5E0D6] flex items-center justify-center text-xs shadow-2xs"
                    style={{ backgroundColor: p.colorHex }}
                  >
                    {isSelected && <Check className={`w-3 h-3 ${p.id === 'dudhimati' ? 'text-[#1C1917]' : 'text-white'}`} />}
                  </span>
                  <span className="font-display text-[9px] uppercase tracking-[0.18em] text-[#8C8379]">
                    {p.id}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-base font-medium text-[#1C1917] leading-snug">
                    {p.name.split('(')[0]}
                  </h4>
                  <p className="font-serif italic text-xs text-[#193225] mt-0.5">
                    {p.hindiName}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Card */}
        <div className="bg-white rounded-xl border border-[#E5E0D6] shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
          {/* Left: Pigment Art Canvas */}
          <div className="lg:col-span-5 relative aspect-4/3 sm:aspect-square rounded-lg overflow-hidden border border-[#E5E0D6] bg-[#FAF8F5] p-2">
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image
                src={activePigment.image}
                alt={activePigment.name}
                fill
                className={`object-cover transition-opacity duration-500 ${grindingAnim ? 'opacity-40 scale-98' : 'opacity-100 scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="font-display text-[9px] uppercase tracking-[0.2em] text-white/80">
                  Forest Mineral Clay
                </span>
                <h3 className="text-xl font-serif text-white font-medium mt-0.5">
                  {activePigment.name}
                </h3>
                <p className="font-serif italic text-xs text-emerald-200">
                  {activePigment.hindiName}
                </p>
              </div>

              {grindingAnim && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                  <div className="flex flex-col items-center gap-2 text-white">
                    <Sparkles className="w-6 h-6 text-emerald-300 animate-spin" />
                    <span className="font-display text-xs tracking-wider uppercase">
                      Grinding on Stone Sil-Batta...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Alchemy Specs & Lore */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#D5CEBF]" style={{ backgroundColor: activePigment.colorHex }} />
                <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] font-medium">
                  Mineral Tone: {activePigment.colorHex} • 100% Forest Ore
                </span>
              </div>
              <h3 className="text-2xl font-serif text-[#1C1917] font-normal">
                Geological & Cultural Provenance
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-1">
                <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium block flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5" /> Geological Harvest Site
                </span>
                <p className="text-[#5C554E] leading-relaxed pt-1">
                  {activePigment.source}
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-1">
                <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium block flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5" /> Traditional Organic Binder
                </span>
                <p className="text-[#5C554E] leading-relaxed pt-1">
                  {activePigment.traditionalBinder}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border-l-2 border-[#193225]">
              <span className="font-display text-[10px] uppercase tracking-[0.18em] text-[#193225] font-medium block mb-1">
                Sacred Cultural Significance
              </span>
              <p className="text-xs text-[#4A433D] font-serif italic leading-relaxed">
                &ldquo;{activePigment.ritualSignificance}&rdquo;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#F2ECE3]">
              <span className="text-xs text-[#5C554E]">
                Traditional Discipline: <strong className="text-[#1C1917] font-medium">{activePigment.artForms}</strong>
              </span>

              <button
                onClick={() => handleSelectPigment(activePigment)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs shadow-2xs transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Stone Grinding</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
