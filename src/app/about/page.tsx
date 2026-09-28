'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARTISANS } from '@/data/artisans';
import { ShieldCheck, Award, Lock, Sparkles, Users, ArrowRight } from 'lucide-react';
import ArtisanCard from '@/components/ArtisanCard';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#193225]/30" />
            <span className="font-display text-[11px] text-[#193225] tracking-[0.24em] uppercase">
              The Genesis • Digital Sovereignty
            </span>
            <div className="w-8 h-px bg-[#193225]/30" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1C1917] tracking-tight font-normal leading-tight">
            Preserving Sacred Soils & Indigenous Sovereignty
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-2xl mx-auto leading-relaxed">
            The foundation of <strong>Mitti</strong>: empowering indigenous Santhal, Dokra, and Khovar custodians through the <strong>Smart Consent Engine</strong>.
          </p>
        </div>

        {/* Section 1: The Mission & Digital Sovereignty */}
        <div className="bg-white rounded-xl p-6 sm:p-12 border border-[#E5E0D6] shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] font-medium">
                Chapter I • Cultural Integrity & Economic Justice
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1C1917] leading-snug font-normal">
              Why We Engineered Mitti
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#4A433D] leading-relaxed">
              <p>
                For centuries, indigenous communities across Jharkhand—the Santhal, Munda, Oraon, and Malhar clans—have expressed their cosmology through natural soil murals, scroll paintings, and lost-wax metal craft. Yet in the digital era, sacred motifs have faced unbridled extraction:
              </p>
              <blockquote className="p-5 bg-[#FAF8F5] rounded-lg border-l-2 border-[#193225] text-[#1C1917] font-serif italic text-base leading-relaxed">
                &ldquo;Metropolitan marketplaces and commercial AI models harvest tribal motifs and sell reproductions for thousands of rupees, while the rural artisans who gather raw mitti and mineral pigments from hill ravines receive pennies with zero intellectual attribution.&rdquo;
              </blockquote>
              <p>
                <strong>Mitti</strong> was created to dismantle this extractive model. By combining decentralized verification with authentic artisan collective governance, Mitti restores cultural ownership directly to the hands that shape the clay.
              </p>
              <p>
                Through the <strong>Smart Consent Engine</strong>, every creation is paired with customary consent protections, GI tag provenance (<span className="font-mono text-xs font-semibold text-[#193225]">#JH-SOHRAI-2020</span> and <span className="font-mono text-xs font-semibold text-[#193225]">#JH-KHOVAR-2020</span>), and direct 90% bank remuneration without predatory intermediaries.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs border-t border-[#F2ECE3]">
              <div className="flex items-center gap-2 text-[#193225]">
                <ShieldCheck className="w-4 h-4 text-[#193225]" />
                <span className="font-medium">100% Direct Payout to Artisans</span>
              </div>
              <div className="flex items-center gap-2 text-[#193225]">
                <Award className="w-4 h-4 text-[#193225]" />
                <span className="font-medium">GI Certified Heritage Lineage</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="relative aspect-4/3 rounded-lg overflow-hidden shadow-2xs border border-[#E5E0D6] bg-[#FAF8F5] p-2">
              <div className="relative w-full h-full rounded border border-[#EAE5DC] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                  alt="Tribal master artisan crafting sacred murals"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="font-serif italic text-xs text-[#5C554E] text-center">
              Indigenous master artisans crafting natural comb-cut Khovar murals with sacred kaolin earth.
            </p>
          </div>
        </div>

        {/* Section 2: Why Smart Consent Engine? */}
        <div className="p-6 sm:p-12 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#193225]/30" />
              <span className="font-display text-[10px] text-[#193225] tracking-[0.24em] uppercase">
                Ethical Safeguard • Cultural Sovereignty
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#1C1917] font-normal">
              The Smart Consent Engine
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
              Commercial generative image models systematically scrape digital photographs of indigenous tribal murals across India—training multi-billion dollar AI models without customary consent, giving zero cultural attribution, and paying ₹0 to indigenous communities. Mitti protects cultural assets with strict cryptographic safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E0D6] flex items-center justify-center text-[#193225]">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1C1917]">Customary AI Consent License</h4>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Artworks carry machine-readable <code className="font-mono text-[11px] font-semibold text-[#193225]">CC-TRIBAL-1.0</code> metadata blocking autonomous web scrapers and unauthorized model training.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E0D6] flex items-center justify-center text-[#193225]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1C1917]">90% Direct Remuneration</h4>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Every patron transaction automatically routes 90% straight to the artisan family bank account, retaining 10% strictly for collective studio logistics, archival materials, and physical dispatch.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E0D6] flex items-center justify-center text-[#193225]">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#1C1917]">Oral Folklore Audio Archiving</h4>
              <p className="text-xs text-[#5C554E] leading-relaxed">
                Elder artists record chants and stories in Santhali Ol Chiki and regional dialects so the living oral history behind every mural remains immortalized alongside the visual craft.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Sovereign Artisans Directory */}
        <div id="artisans" className="space-y-8 pt-2">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-px bg-[#193225]/30" />
              <span className="font-display text-[10px] text-[#193225] tracking-[0.24em] uppercase">
                Living Guild
              </span>
              <div className="w-6 h-px bg-[#193225]/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917] font-normal">
              The Master Artisans of Jharkhand
            </h2>
            <p className="text-xs text-[#5C554E]">
              Custodians of GI-certified Sohrai, Khovar, Paitkar, Jadopatia, and Dokra crafts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTISANS.map((artisan) => (
              <ArtisanCard
                key={artisan.id}
                artisan={artisan}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
