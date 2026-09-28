'use client';

import React, { useState } from 'react';
import { Palette, Ruler, MessageCircle, Sparkles, ShieldCheck, Check } from 'lucide-react';

export default function WallMuralCalculator() {
  const [widthFt, setWidthFt] = useState<number>(10);
  const [heightFt, setHeightFt] = useState<number>(8);
  const [artForm, setArtForm] = useState<'Sohrai' | 'Khovar' | 'Paitkar'>('Sohrai');
  const [wallType, setWallType] = useState<'Raw Mud Plaster' | 'Interior Gypsum/Cement' | 'Exterior Courtyard'>('Interior Gypsum/Cement');
  const [selectedPigments, setSelectedPigments] = useState<string[]>([
    'Dudhimati (White Kaolin)',
    'Lal Geru (Red Ochre)',
  ]);

  const sqFt = widthFt * heightFt;
  const ratePerSqFt = artForm === 'Khovar' ? 450 : artForm === 'Sohrai' ? 380 : 420;
  const estimatedCost = sqFt * ratePerSqFt;
  const artisanShare = Math.round(estimatedCost * 0.9);

  const togglePigment = (pigment: string) => {
    setSelectedPigments((prev) =>
      prev.includes(pigment)
        ? prev.filter((p) => p !== pigment)
        : [...prev, pigment]
    );
  };

  const allPigments = [
    'Dudhimati (White Kaolin)',
    'Lal Geru (Red Ochre)',
    'Kala Mati (Manganese Charcoal)',
    'Pila Mati (Yellow Ochre)',
    'Charak Mati (Alkaline Mud)',
  ];

  const whatsappMessage = encodeURIComponent(
    `Namaste Mitti (+91 98765 43210)! 🌿\n\nI want to commission a custom *${artForm} Wall Mural* for my space:\n- Wall Dimensions: ${widthFt} ft × ${heightFt} ft (${sqFt} sq. ft.)\n- Surface Type: ${wallType}\n- Natural Soil Pigments: ${selectedPigments.join(', ')}\n- Estimated Budget: ₹${estimatedCost.toLocaleString('en-IN')}\n\nPlease connect me with the Master Artisan guild for site assessment and design sketches.`
  );

  return (
    <section id="murals-calc" className="py-20 bg-[#FAF8F5] border-t border-[#E5E0D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#193225]/30" />
            <span className="font-display text-[10px] text-[#193225] tracking-[0.24em] uppercase font-medium">
              Architectural & Interior Commissions
            </span>
            <div className="w-8 h-px bg-[#193225]/30" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#1C1917] tracking-tight font-normal">
            Commission a Living Mud Mural for Your Space
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
            Bring ancient Sohrai and Khovar murals into luxury villas, boutique hotels, cafes, and executive spaces. Hand-painted on site by sovereign women artisans using 100% natural forest clays.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xs border border-[#E5E0D6] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Form: Parameters */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
            {/* Art Form Choice */}
            <div>
              <label className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium block mb-2">
                1. Select Heritage Art Form
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Sohrai', 'Khovar', 'Paitkar'] as const).map((form) => (
                  <button
                    key={form}
                    type="button"
                    onClick={() => setArtForm(form)}
                    className={`py-3 px-4 rounded-lg border text-center transition ${
                      artForm === form
                        ? 'bg-[#193225] text-white border-[#193225] shadow-2xs'
                        : 'bg-[#FAF8F5] text-[#4A433D] border-[#E5E0D6] hover:bg-stone-100'
                    }`}
                  >
                    <span className="font-serif text-base font-medium block">{form}</span>
                    <span className="text-[10px] opacity-80 block">
                      {form === 'Khovar' ? '₹450/sq.ft' : form === 'Sohrai' ? '₹380/sq.ft' : '₹420/sq.ft'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions Sliders */}
            <div className="space-y-4">
              <label className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium block">
                2. Specify Wall Dimensions
              </label>
              <div>
                <div className="flex justify-between text-xs font-medium text-[#4A433D] mb-1">
                  <span>Width: {widthFt} ft</span>
                  <span className="text-[#8C8379]">Total Area: {sqFt} sq. ft.</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={40}
                  value={widthFt}
                  onChange={(e) => setWidthFt(Number(e.target.value))}
                  className="w-full accent-[#193225]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-[#4A433D] mb-1">
                  <span>Height: {heightFt} ft</span>
                  <span className="text-[#8C8379]">Max 20 ft</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={20}
                  value={heightFt}
                  onChange={(e) => setHeightFt(Number(e.target.value))}
                  className="w-full accent-[#193225]"
                />
              </div>
            </div>

            {/* Natural Pigments */}
            <div>
              <label className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium block mb-2">
                3. Choose Natural Earth Clays
              </label>
              <div className="flex flex-wrap gap-2">
                {allPigments.map((p) => {
                  const isChecked = selectedPigments.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePigment(p)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-[#EBF3ED] text-[#193225] border-[#193225] font-medium'
                          : 'bg-[#FAF8F5] text-[#5C554E] border-[#E5E0D6]'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 text-[#193225]" />}
                      <span>{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-[#E5E0D6] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[#193225] text-xs font-medium uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Estimate Summary</span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#1C1917]">
                {artForm} Earth Mural
              </h3>
              <p className="text-xs text-[#5C554E] mt-1">
                {widthFt} × {heightFt} ft ({sqFt} sq. ft.) • On {wallType}
              </p>

              <div className="mt-6 p-4 bg-white rounded-lg border border-[#E5E0D6] space-y-2">
                <div className="flex justify-between text-xs text-[#5C554E]">
                  <span>Total Estimated Cost:</span>
                  <span className="font-semibold text-[#1C1917] text-base">₹{estimatedCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-[#193225] font-medium pt-2 border-t border-[#F2ECE3]">
                  <span>Artisan Direct Share (90%):</span>
                  <span className="font-semibold">₹{artisanShare.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-[#5C554E] pt-1 leading-normal">
                  Transferred directly to the women artisan collective in Ramgarh Cantt.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-2xs transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Commission via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
