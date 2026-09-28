'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Palette, MessageCircle, Sun, Sunset, Flame } from 'lucide-react';

interface MuralStyle {
  id: string;
  name: string;
  hindiName: string;
  ratePerSqFt: number;
  bgImageUrl: string;
  description: string;
  pigments: string[];
}

export default function WallMuralSimulator() {
  const muralStyles: MuralStyle[] = [
    {
      id: 'sohrai',
      name: 'Sohrai Cattle Harvest & Floral Antlers',
      hindiName: 'सोहराय गो-वर्धन एवं पशुपति भित्ति चित्र',
      ratePerSqFt: 380,
      bgImageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      description: 'Hand-painted with Lal Geru, Dudhimati, and river silt. Traditional blessing for vitality and harvest abundance.',
      pigments: ['Lal Geru (Red Ochre)', 'Dudhimati (White Kaolin)', 'Kala Mati (Black Manganese)', 'Pila Mati (Yellow)'],
    },
    {
      id: 'khovar',
      name: 'Comb-Cut Khovar Cave Bridal Murals',
      hindiName: 'खोवर कंघी-कटाव कोहबर कक्ष भित्ति चित्र',
      ratePerSqFt: 460,
      bgImageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
      description: 'Carved through wet Dudhimati with neem-wood combs to unveil black manganese. Womb fertility & tree of progeny.',
      pigments: ['Black Manganese', 'White Kaolin Clay', 'Charak Alkaline Clay'],
    },
    {
      id: 'paitkar',
      name: 'Paitkar Ancient Epic Narrative Wall',
      hindiName: 'पैटकर आदिम गाथा एवं अरण्य चित्र',
      ratePerSqFt: 420,
      bgImageUrl: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=80',
      description: 'Continuous narrative panels painted with wood-apple resin binder. Celebrates Pilchu Haram creation legend.',
      pigments: ['Lamp Black Soot', 'Bael Tree Gum', 'Yellow Ochre', 'Red Ochre'],
    },
  ];

  const [activeStyle, setActiveStyle] = useState<MuralStyle>(muralStyles[0]);
  const [lighting, setLighting] = useState<'day' | 'sunset' | 'candle'>('day');
  const [widthFt, setWidthFt] = useState<number>(12);
  const [heightFt, setHeightFt] = useState<number>(9);
  const [roomType, setRoomType] = useState<string>('Living Room');

  const sqFt = widthFt * heightFt;
  const totalCost = sqFt * activeStyle.ratePerSqFt;
  const artisanShare = Math.round(totalCost * 0.9);
  const logisticsShare = totalCost - artisanShare;

  const lightingFilters = {
    day: 'brightness-100 contrast-100',
    sunset: 'sepia-25 hue-rotate-[-10deg] brightness-95 contrast-105',
    candle: 'sepia-50 brightness-85 contrast-110 hue-rotate-[-20deg]',
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste Mitti! 🌿\n\nI want to commission a custom *${activeStyle.name}* for my ${roomType}:\n- Wall Size: ${widthFt} ft × ${heightFt} ft (${sqFt} sq. ft.)\n- Surface Lighting: ${lighting} mood\n- Estimated Budget: ₹${totalCost.toLocaleString('en-IN')} (with 90% direct artisan share: ₹${artisanShare.toLocaleString('en-IN')})\n\nPlease connect me with the master artisan team to discuss wall preparation and schedule.`
  );

  return (
    <section id="murals" className="py-20 bg-[#FAF8F5] text-[#1C1917] border-t border-[#E5E0D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#193225]/30" />
            <span className="font-display text-[11px] text-[#193225] tracking-[0.24em] uppercase">
              Architectural Commissions • Ramgarh Atelier
            </span>
            <div className="w-8 h-px bg-[#193225]/30" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1C1917] tracking-tight font-normal">
            Wall Mural Visualizer & Estimate
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
            Preview how authentic earth murals transform living spaces, villas, and cultural institutions before master artisans travel to hand-paint your walls.
          </p>
        </div>

        {/* Room Simulator Stage */}
        <div className="bg-white rounded-xl border border-[#E5E0D6] shadow-2xs p-6 sm:p-10 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#F2ECE3]">
            {/* Mural Style Switcher */}
            <div className="flex items-center gap-3">
              <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium">
                Craft Discipline:
              </span>
              <div className="flex flex-wrap gap-2">
                {muralStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setActiveStyle(style)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
                      activeStyle.id === style.id
                        ? 'bg-[#193225] text-white border-[#193225] shadow-2xs'
                        : 'bg-white text-[#4A433D] border-[#E5E0D6] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {style.name.split(' ')[0]} Art
                  </button>
                ))}
              </div>
            </div>

            {/* Room Lighting Mood */}
            <div className="flex items-center gap-3">
              <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E] font-medium hidden sm:inline">
                Lighting Atmosphere:
              </span>
              <div className="flex gap-1 p-1 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
                <button
                  onClick={() => setLighting('day')}
                  className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 font-medium transition ${
                    lighting === 'day' ? 'bg-white shadow-2xs text-[#193225] font-semibold' : 'text-[#5C554E]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Daylight</span>
                </button>
                <button
                  onClick={() => setLighting('sunset')}
                  className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 font-medium transition ${
                    lighting === 'sunset' ? 'bg-white shadow-2xs text-[#193225] font-semibold' : 'text-[#5C554E]'
                  }`}
                >
                  <Sunset className="w-3.5 h-3.5" />
                  <span>Golden Hour</span>
                </button>
                <button
                  onClick={() => setLighting('candle')}
                  className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 font-medium transition ${
                    lighting === 'candle' ? 'bg-white shadow-2xs text-[#193225] font-semibold' : 'text-[#5C554E]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Warm Earthen</span>
                </button>
              </div>
            </div>
          </div>

          {/* Virtual Wall Preview Stage */}
          <div className="relative aspect-16/9 sm:aspect-21/9 rounded-lg overflow-hidden border border-[#E5E0D6] shadow-2xs bg-stone-100 flex items-center justify-center">
            <Image
              src={activeStyle.bgImageUrl}
              alt={activeStyle.name}
              fill
              className={`object-cover transition-all duration-500 ${lightingFilters[lighting]}`}
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Dimension Hallmark */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded border border-[#E5E0D6] text-xs font-medium text-[#1C1917] shadow-2xs font-sans">
              Wall Surface: <strong className="font-semibold text-[#193225]">{widthFt} ft × {heightFt} ft</strong> ({sqFt} sq. ft.)
            </div>

            {/* Remuneration callout */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-xs p-3.5 rounded-lg border border-[#E5E0D6] text-xs shadow-sm">
              <span className="font-serif text-sm font-medium text-[#1C1917] block">
                {activeStyle.name}
              </span>
              <span className="text-[#193225] font-sans font-medium text-[11px] flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#193225]" />
                ₹{artisanShare.toLocaleString('en-IN')} (90%) directly to artisan guild
              </span>
            </div>
          </div>

          {/* Parameters & Commission Estimator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#4A433D] mb-1">
                  <span>Wall Width: {widthFt} feet</span>
                  <span className="text-[#8C8379] font-normal">Scale: 6ft – 40ft</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={40}
                  value={widthFt}
                  onChange={(e) => setWidthFt(Number(e.target.value))}
                  className="w-full accent-[#193225]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#4A433D] mb-1">
                  <span>Wall Height: {heightFt} feet</span>
                  <span className="text-[#8C8379] font-normal">Scale: 6ft – 20ft</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={20}
                  value={heightFt}
                  onChange={(e) => setHeightFt(Number(e.target.value))}
                  className="w-full accent-[#193225]"
                />
              </div>

              {/* Natural Pigments Used */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
                <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium block mb-1.5">
                  Natural Mineral Clays Specified:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {activeStyle.pigments.map((p, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-white border border-[#E5E0D6] text-[#4A433D] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#193225]" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Summary & Direct WhatsApp Commission */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-5 rounded-lg border border-[#E5E0D6] flex flex-col justify-between space-y-4">
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] font-medium">
                  Transparent 90/10 Quotation
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-serif text-[#1C1917] font-medium">
                    ₹{totalCost.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#5C554E]">
                    (@ ₹{activeStyle.ratePerSqFt}/sq.ft)
                  </span>
                </div>

                <div className="mt-3 p-3 bg-white rounded border border-[#E5E0D6] text-xs space-y-1.5">
                  <div className="flex justify-between text-[#193225] font-medium">
                    <span>90% Direct to Artisan:</span>
                    <span className="font-semibold">₹{artisanShare.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#5C554E] text-[11px]">
                    <span>10% Soil Sourcing & Logistics:</span>
                    <span>₹{logisticsShare.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-2xs transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commission Mural on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
