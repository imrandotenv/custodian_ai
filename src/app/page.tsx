'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARTWORKS } from '@/data/artworks';
import { ARTISANS } from '@/data/artisans';
import { Product, Artisan } from '@/types';
import { useAudio } from '@/context/AudioContext';
import ProductCard from '@/components/ProductCard';
import ProductQuickViewModal from '@/components/ProductQuickViewModal';
import OralLoreModal from '@/components/OralLoreModal';
import SoilPigmentAlchemy from '@/components/SoilPigmentAlchemy';
import WallMuralSimulator from '@/components/WallMuralSimulator';
import LivingAteliersMap from '@/components/LivingAteliersMap';
import ArtisanCard from '@/components/ArtisanCard';
import { useRole } from '@/context/RoleContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Check, 
  MessageCircle,
  MapPin,
  Palette
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { setRole } = useRole();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [selectedArtisanForLore, setSelectedArtisanForLore] = useState<Artisan | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { toggleAmbientSound, isAmbientPlaying } = useAudio();

  const categories = [
    'All',
    'Sohrai Murals',
    'Khovar Bridal Art',
    'Paitkar Scroll Art',
    'Jadopatia Folklore',
    'Dokra Bell Metal',
    'Hand-Painted Home Decor',
  ];

  // Specific filtered subsets for curated work highlights
  const sohraiKhovarWorks = ARTWORKS.filter(
    (art) => art.category === 'Sohrai Murals' || art.category === 'Khovar Bridal Art'
  );

  const scrollWorks = ARTWORKS.filter(
    (art) => art.category === 'Paitkar Scroll Art' || art.category === 'Jadopatia Folklore'
  );

  const dokraDecorWorks = ARTWORKS.filter(
    (art) => art.category === 'Dokra Bell Metal' || art.category === 'Hand-Painted Home Decor'
  );

  const filteredCatalog = selectedCategory === 'All'
    ? ARTWORKS
    : ARTWORKS.filter((art) => art.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      {/* 1. HERO BANNER - Authentic Artisanal Heritage Aesthetic */}
      <section className="relative pt-14 pb-18 md:pt-22 md:pb-26 border-b border-[#E5E0D6] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <span className="w-6 h-px bg-[#193225]/40" />
                <span className="text-[11px] font-display uppercase tracking-[0.22em] text-[#193225] font-normal">
                  Ramgarh Cantt Atelier • Natural Earth Minerals
                </span>
                <span className="w-6 h-px bg-[#193225]/40" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-semibold text-[#1C1917] tracking-tight leading-[1.14]">
                Authentic Tribal Arts of Jharkhand,{' '}
                <span className="italic font-normal text-[#193225]">
                  Rooted in Sacred Earth
                </span>
              </h1>

              <p className="text-base sm:text-[17px] text-[#5C554E] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Direct from the mud homes of Ramgarh, Hazaribagh, and Amadubi. Handcrafted by 15 master indigenous women artisans using wild kaolin, red hematite, and black manganese clays. Governed by our <strong>90% direct remuneration model</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/shop"
                  className="px-6 py-3.5 rounded-xl bg-[#193225] hover:bg-[#12281D] text-white text-xs font-medium tracking-wider uppercase transition shadow-xs flex items-center gap-2"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#murals"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#F2ECE3] border border-[#E5E0D6] text-[#1C1917] text-xs font-medium tracking-wide transition shadow-2xs flex items-center gap-2"
                >
                  <Palette className="w-4 h-4 text-[#193225]" />
                  <span>Wall Mural Estimator</span>
                </a>

                <button
                  onClick={() => toggleAmbientSound()}
                  className={`px-4 py-3.5 rounded-xl border text-xs font-medium transition flex items-center gap-2 ${
                    isAmbientPlaying
                      ? 'bg-[#EBF3ED] text-[#193225] border-[#D5E4D8]'
                      : 'bg-white text-[#5C554E] border-[#E5E0D6] hover:bg-stone-50'
                  }`}
                >
                  {isAmbientPlaying ? <Volume2 className="w-4 h-4 text-[#193225]" /> : <VolumeX className="w-4 h-4" />}
                  <span>{isAmbientPlaying ? 'Flute Drone: On' : 'Ambient Flute'}</span>
                </button>
              </div>

              {/* Editorial Hallmarks Strip */}
              <div className="pt-6 border-t border-[#E5E0D6] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div className="border-l-2 border-[#193225]/30 pl-3">
                  <div className="text-[11px] font-display tracking-[0.16em] uppercase text-[#193225] font-semibold">
                    GI Certified
                  </div>
                  <div className="text-[12px] text-[#5C554E] mt-0.5">
                    #JH-SOHRAI-2020
                  </div>
                </div>
                <div className="border-l-2 border-[#193225]/30 pl-3">
                  <div className="text-[11px] font-display tracking-[0.16em] uppercase text-[#193225] font-semibold">
                    90% Disbursal
                  </div>
                  <div className="text-[12px] text-[#5C554E] mt-0.5">
                    Direct to Artisan Bank
                  </div>
                </div>
                <div className="border-l-2 border-[#193225]/30 pl-3">
                  <div className="text-[11px] font-display tracking-[0.16em] uppercase text-[#193225] font-semibold">
                    Forest Soils
                  </div>
                  <div className="text-[12px] text-[#5C554E] mt-0.5">
                    Zero Synthetic Paint
                  </div>
                </div>
                <div className="border-l-2 border-[#193225]/30 pl-3">
                  <div className="text-[11px] font-display tracking-[0.16em] uppercase text-[#193225] font-semibold">
                    Atelier Hub
                  </div>
                  <div className="text-[12px] text-[#5C554E] mt-0.5">
                    Ramgarh Cantt
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero: Gallery Exhibition Frame */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E0D6] shadow-sm space-y-4">
                {/* Museum Matting Wrapper */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#F7F4EE] border border-[#EBE6DC] shadow-inner">
                  <Image
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
                    alt="Master Artisan creating Sohrai Wall Painting in Ramgarh"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#193225] text-[10px] font-display uppercase tracking-[0.16em] px-2.5 py-1 rounded shadow-2xs border border-[#E5E0D6]">
                    GI Registry No. 383
                  </div>
                </div>

                {/* Artwork Title & Provenance Plaque */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="font-serif-title font-bold text-lg text-[#1C1917] leading-snug">
                        Pashupati & Sacred Cattle Harvest
                      </h3>
                      <p className="text-xs text-[#736B63] mt-0.5">
                        Somra Hembrom • Gola Road, Ramgarh Cantt
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-[#1C1917]">
                        ₹4,800
                      </span>
                      <span className="text-[10px] text-[#736B63] block">
                        Framed Canvas
                      </span>
                    </div>
                  </div>

                  {/* Mineral Swatches */}
                  <div className="pt-2 border-t border-[#F2ECE3] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-3">
                      <span className="text-[#736B63]">Natural Clays:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E8E2D5] border border-[#C5BBAA]" title="Dudhimati White" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8E3B24]" title="Lal Geru Ochre" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2A2624]" title="Manganese Black" />
                      </div>
                    </div>
                    <span className="text-[#193225] font-semibold bg-[#EBF3ED] px-2 py-0.5 rounded">
                      ₹4,320 (90%) directly to artisan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 DUAL-ENGINE PERSPECTIVE PORTAL: FOR PATRONS & VISITORS × FOR MASTER ARTISANS */}
      <section className="py-16 bg-[#FCFBF9] border-b border-[#E5E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-[#193225]/30" />
              <span className="font-display text-[10px] text-[#193225] tracking-[0.24em] uppercase font-medium">
                Dual-Engine Social Enterprise • Ramgarh Model
              </span>
              <div className="w-8 h-px bg-[#193225]/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917] font-normal">
              Two Perspectives, One Sacred Covenant
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
              Whether you are an art collector acquiring museum-grade indigenous canvases or a tribal artisan safeguarding your intellectual heritage, Mitti guarantees sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Visitors & Art Patrons */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E0D6] shadow-2xs space-y-5 flex flex-col justify-between hover:border-[#193225]/40 transition group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] bg-[#EBF3ED] px-3 py-1 rounded border border-[#D5E4D8] font-medium">
                    Perspective 01: Art Patron & Visitor
                  </span>
                  <span className="text-xs text-[#736B63] font-serif italic">Curated Storefront</span>
                </div>

                <h3 className="text-2xl font-serif text-[#1C1917] font-medium leading-snug">
                  Collect Living Tribal Heritage with 100% Ethical Integrity
                </h3>

                <ul className="space-y-2.5 text-xs text-[#5C554E]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                    <span><strong>Govt. GI Tag Certified:</strong> Every original piece authenticated under Geographical Indications Registry (#JH-SOHRAI-2020).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                    <span><strong>90% Fair-Trade Disbursal:</strong> Zero middlemen. 90% of your acquisition price is transferred directly into the artisan family bank account.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                    <span><strong>Zero Synthetic Paint:</strong> 100% natural kaolin, red hematite ochre, and manganese earth minerals harvested by hand.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                    <span><strong>Living Mud Residencies:</strong> Travel into Ramgarh and Hazaribagh hamlets to learn comb-cut murals first-hand.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#F2ECE3] flex items-center justify-between">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium tracking-wide transition shadow-2xs"
                >
                  <span>Explore Artworks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/verify" className="text-xs text-[#193225] hover:underline font-medium">
                  Verify Provenance Tag →
                </Link>
              </div>
            </div>

            {/* For Indigenous Tribal Artists */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E5E0D6] shadow-2xs space-y-5 flex flex-col justify-between hover:border-[#193225]/40 transition group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] bg-[#FAF8F5] px-3 py-1 rounded border border-[#E5E0D6] font-medium">
                    Perspective 02: Master Artisan Guild
                  </span>
                  <span className="text-xs text-[#736B63] font-serif italic">Ramgarh Cantt Atelier</span>
                </div>

                <h3 className="text-2xl font-serif text-[#1C1917] font-medium leading-snug">
                  Sovereign Digital Registry & Direct Remuneration
                </h3>

                <ul className="space-y-2.5 text-xs text-[#5C554E]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                    <span><strong>Studio Console:</strong> Manage piece availability, reserve originals for buyers, and track dispatch status.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                    <span><strong>Instant Artwork Intake:</strong> Declare sacred soil pigments, record spoken oral folklore in Santhali/Hindi, and mint SHA-256 hash.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                    <span><strong>Live 90% UPI Disbursal Ledger:</strong> Transparent real-time accounting showing exact net earnings and UTR settlements.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                    <span><strong>Customary AI Firewall (CC-TRIBAL-1.0):</strong> Active machine-readable shield stopping generative diffusion scrapers.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#F2ECE3] flex items-center justify-between">
                <button
                  onClick={() => {
                    setRole('custodian');
                    router.push('/dashboard');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] border border-[#E5E0D6] text-xs font-medium tracking-wide transition shadow-2xs"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Launch Artisan Console</span>
                </button>
                <Link href="/earnings" className="text-xs text-[#193225] hover:underline font-medium">
                  View 90% Payout Ledger →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRADITIONAL CRAFT DISCIPLINES - HIGHLIGHTING THE DIVERSITY */}
      <section className="py-18 bg-white border-b border-[#E5E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-6 h-px bg-[#193225]/30" />
              <span className="text-[11px] font-display uppercase tracking-[0.24em] text-[#193225] font-normal">
                Indigenous Disciplines
              </span>
              <span className="w-6 h-px bg-[#193225]/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-semibold text-[#1C1917]">
              The 5 Living Crafts of Jharkhand
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554E] max-w-md mx-auto">
              Ancient tribal traditions preserved across generations on the Chota Nagpur plateau.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: 'Sohrai Harvest Art',
                hindi: 'सोहराय कला',
                region: 'Hazaribagh & Ramgarh',
                desc: 'Celebration of cattle, peacocks and harvest abundance using white Dudhimati and red hematite.',
                category: 'Sohrai Murals',
                image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'Khovar Bridal Murals',
                hindi: 'खोवर कला',
                region: 'Barkagaon Caves',
                desc: 'Comb-cut mud art where white kaolin is carved with combs to reveal black manganese beneath.',
                category: 'Khovar Bridal Art',
                image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'Paitkar Scroll Art',
                hindi: 'पैटकर चित्र',
                region: 'Amadubi Village',
                desc: 'India’s oldest scroll painting tradition narrating Santhali creation hymns on bark cloth.',
                category: 'Paitkar Scroll Art',
                image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'Dokra Bell Metal',
                hindi: 'ढोकरा शिल्प',
                region: 'Dumka & Ramgarh',
                desc: '4,000-year-old lost-wax non-ferrous metal casting creating figurines of forest spirits.',
                category: 'Dokra Bell Metal',
                image: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'Terracotta Decor',
                hindi: 'मिट्टी शिल्प',
                region: 'Ramgarh Potteries',
                desc: 'Hand-thrown earthen chai sets, tea lights, wall plates, and natural planters.',
                category: 'Hand-Painted Home Decor',
                image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80',
              },
            ].map((craft, i) => (
              <div
                key={i}
                onClick={() => setSelectedCategory(craft.category)}
                className="group cursor-pointer bg-[#FAF8F5] rounded-xl border border-[#E5E0D6] hover:border-[#193225] hover:shadow-xs transition duration-200 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <Image
                    src={craft.image}
                    alt={craft.title}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs text-[10px] font-medium text-[#1C1917] px-2 py-0.5 rounded shadow-2xs">
                    {craft.region.split('&')[0]}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-title font-bold text-base text-[#1C1917] group-hover:text-[#193225] transition">
                      {craft.title}
                    </h3>
                    <p className="text-[11px] text-[#193225] font-serif italic mt-0.5">
                      {craft.hindi}
                    </p>
                    <p className="text-[11px] text-[#5C554E] mt-2 line-clamp-2 leading-relaxed font-normal">
                      {craft.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#E5E0D6] flex items-center justify-between text-[11px] font-display uppercase tracking-wider text-[#193225]">
                    <span>Explore Craft</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHT WORK SET 1: SOHRAI & KHOVAR WALL MURALS */}
      <section className="py-18 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-display uppercase tracking-[0.2em] text-[#193225] font-semibold">
                  GI Tag #JH-SOHRAI-2020
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#193225]/30" />
                <span className="text-[11px] font-display uppercase tracking-[0.2em] text-[#736B63]">
                  Hazaribagh & Ramgarh
                </span>
              </div>
              <h2 className="text-3xl font-serif-title font-semibold text-[#1C1917]">
                Sohrai & Khovar Masterpieces
              </h2>
              <p className="text-xs sm:text-sm text-[#5C554E] mt-1 max-w-xl">
                The world-renowned ceremonial wall art of Jharkhand, carved with comb-cut techniques using wild kaolin, red hematite, and black manganese.
              </p>
            </div>
            <Link
              href="/shop?category=Sohrai+Murals"
              className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-wider text-[#193225] hover:underline font-semibold"
            >
              <span>View All Sohrai & Khovar ({sohraiKhovarWorks.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sohraiKhovarWorks.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HIGHLIGHT WORK SET 2: ANCIENT SCROLLS (PAITKAR & JADOPATIA) */}
      <section className="py-18 bg-white border-t border-b border-[#E5E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-display uppercase tracking-[0.2em] text-[#193225] font-semibold">
                  Ancient Narrative Scrolls
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#193225]/30" />
                <span className="text-[11px] font-display uppercase tracking-[0.2em] text-[#736B63]">
                  Amadubi & Dumka
                </span>
              </div>
              <h2 className="text-3xl font-serif-title font-semibold text-[#1C1917]">
                Paitkar & Jadopatia Folklore Scrolls
              </h2>
              <p className="text-xs sm:text-sm text-[#5C554E] mt-1 max-w-xl">
                Painted on natural bark cloth and raw jute using wood-apple gum resin, singing Santhali creation hymns.
              </p>
            </div>
            <Link
              href="/shop?category=Paitkar+Scroll+Art"
              className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-wider text-[#193225] hover:underline font-semibold"
            >
              <span>View All Scroll Paintings ({scrollWorks.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scrollWorks.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. HIGHLIGHT WORK SET 3: DOKRA BELL METAL & HOME LIVING */}
      <section className="py-18 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-display uppercase tracking-[0.2em] text-[#193225] font-semibold">
                  4,000-Year Lost-Wax Metal & Clay
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#193225]/30" />
                <span className="text-[11px] font-display uppercase tracking-[0.2em] text-[#736B63]">
                  Ramgarh Cantt
                </span>
              </div>
              <h2 className="text-3xl font-serif-title font-semibold text-[#1C1917]">
                Dokra Bell Metal & Hand-Painted Home Decor
              </h2>
              <p className="text-xs sm:text-sm text-[#5C554E] mt-1 max-w-xl">
                Sculpted brass figurines, hand-painted terracotta chai sets, coasters, and wall plates for modern living spaces.
              </p>
            </div>
            <Link
              href="/shop?category=Dokra+Bell+Metal"
              className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-wider text-[#193225] hover:underline font-semibold"
            >
              <span>View All Metal & Decor ({dokraDecorWorks.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dokraDecorWorks.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 INTERACTIVE FULL COLLECTION EXPLORER */}
      <section id="catalog" className="py-18 bg-white border-t border-[#E5E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-6 h-px bg-[#193225]/30" />
              <span className="text-[11px] font-display uppercase tracking-[0.24em] text-[#193225] font-normal">
                Complete Atelier Catalog
              </span>
              <span className="w-6 h-px bg-[#193225]/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-semibold text-[#1C1917]">
              Explore Every Creation by Discipline
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554E] max-w-md mx-auto">
              Every piece comes with a GI certificate, SHA-256 provenance hash, and 90% direct artisan remuneration.
            </p>

            {/* Smart Consent Protocol Indicator */}
            <div className="pt-2 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E5E0D6] text-xs text-[#5C554E] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#C25934] animate-pulse" />
                <span className="font-display uppercase tracking-wider text-[#1C1917] font-semibold text-[10px]">
                  Smart Consent Engine Active
                </span>
                <span className="text-[#8C8379] hidden sm:inline">•</span>
                <span className="text-[11px] hidden sm:inline">Protected indigenous assets require visitor pledge to reveal sacred motifs</span>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-[#193225] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5C554E] hover:text-[#1C1917] hover:bg-stone-200 border border-[#E5E0D6]'
                  }`}
                >
                  {cat === 'All' ? 'All Pieces' : cat}
                  <span className="ml-1.5 opacity-70 text-[10px]">
                    ({cat === 'All' ? ARTWORKS.length : ARTWORKS.filter(a => a.category === cat).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCatalog.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#193225] hover:bg-[#12281D] text-white text-xs font-medium tracking-wider uppercase shadow-xs transition"
            >
              <span>Open Storefront with Soil Pigment & Price Filters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER'S LETTER / RAMGARH COOPERATIVE STORY */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#E5E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story text */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-display uppercase tracking-[0.22em] text-[#193225] font-semibold">
                  The Social Enterprise
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#193225]/30" />
                <span className="text-[11px] font-display uppercase tracking-[0.22em] text-[#736B63]">
                  Ramgarh Cantt
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif-title font-semibold text-[#1C1917] tracking-tight leading-snug">
                &ldquo;Our Soil is Our Identity, Not a Commodity for Exploitation.&rdquo;
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#4A433D] leading-relaxed">
                <p>
                  Commercial art galleries and generative AI models frequently harvest sacred tribal motifs without consent, community attribution, or fair compensation—leaving the indigenous custodians economically marginalized.
                </p>
                <p>
                  <strong>Mitti</strong> was built to secure cultural sovereignty. Working directly with master artisan clans across Ramgarh, Hazaribagh, and Dumka, every single artwork guarantees a <strong>mathematical 90% direct payout</strong> straight into the artisan’s bank account.
                </p>
                <p>
                  Through our <strong>Smart Consent Engine</strong>, we safeguard sacred tribal symbols from unauthorized commercial AI model scraping through customary digital licenses (<code className="font-mono text-[11px] font-semibold text-[#193225]">CC-TRIBAL-1.0</code>), cryptographically verifying authentic provenance.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6]">
                  <span className="text-2xl font-serif-title font-bold text-[#193225]">150+</span>
                  <span className="text-[11px] text-[#736B63] block mt-0.5">Artisans Supported</span>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6]">
                  <span className="text-2xl font-serif-title font-bold text-[#193225]">90%</span>
                  <span className="text-[11px] text-[#736B63] block mt-0.5">Direct Payout</span>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6]">
                  <span className="text-2xl font-serif-title font-bold text-[#193225]">GI-383</span>
                  <span className="text-[11px] text-[#736B63] block mt-0.5">Govt. Certified</span>
                </div>
              </div>
            </div>

            {/* Atelier details card */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E5E0D6] shadow-xs space-y-4">
                <h3 className="text-lg font-serif-title font-bold text-[#1C1917]">
                  Visit the Ramgarh Cantt Atelier Hub
                </h3>
                <p className="text-xs text-[#5C554E] leading-relaxed">
                  Open to architects, art collectors, and cultural travelers wishing to observe natural clay preparation and meet master artisan elders.
                </p>
                <div className="space-y-2 text-xs text-[#4A433D]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                    <span>Gola Road, Bazar Tand, Ramgarh Cantt, Jharkhand – 829122</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#193225] flex-shrink-0" />
                    <span>WhatsApp: +91 98765 43210</span>
                  </div>
                </div>
                <div className="pt-1">
                  <a
                    href="https://wa.me/919876543210?text=Namaste%20Mitti!%20I%20would%20like%20to%20learn%20more%20about%20indigenous%20artworks%20and%20the%20Smart%20Consent%20Engine."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#193225] hover:bg-[#12281D] text-white text-xs font-semibold shadow-xs transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire with Atelier</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SACRED SOIL CLAYS (THE MUD CHEMISTRY) */}
      <SoilPigmentAlchemy />

      {/* 8. WALL MURAL VISUALIZER & COMMISSION */}
      <WallMuralSimulator />

      {/* 9. MEET OUR 15 MASTER ARTISANS */}
      <section className="py-20 bg-white border-t border-[#E5E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-6 h-px bg-[#193225]/30" />
              <span className="text-[11px] font-display uppercase tracking-[0.24em] text-[#193225] font-normal">
                Indigenous Custodians
              </span>
              <span className="w-6 h-px bg-[#193225]/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-semibold text-[#1C1917]">
              Meet the 15 Master Women Artisans
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554E] max-w-md mx-auto">
              Listen to authentic oral lore recorded in native Santhali and Chotanagpuri dialects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTISANS.slice(0, 6).map((artisan) => (
              <ArtisanCard
                key={artisan.id}
                artisan={artisan}
                onPlayLore={setSelectedArtisanForLore}
                variant="full"
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/about#artisans"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#193225] hover:underline"
            >
              <span>Read Full Profiles of All 15 Guild Elders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. LIVING ATELIERS & RESIDENCIES */}
      <LivingAteliersMap />

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Oral Lore Modal */}
      {selectedArtisanForLore && (
        <OralLoreModal
          artisan={selectedArtisanForLore}
          onClose={() => setSelectedArtisanForLore(null)}
        />
      )}
    </div>
  );
}
