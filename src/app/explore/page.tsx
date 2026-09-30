'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ARTWORKS } from '@/data/artworks';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import ProductQuickViewModal from '@/components/ProductQuickViewModal';
import SmartConsentCard from '@/components/SmartConsentCard';
import { Search, Compass, Sparkles, ShieldCheck, Lock } from 'lucide-react';

export default function ExplorePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPigment, setSelectedPigment] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'payout'>('featured');
  const [maxPrice] = useState<number>(100000);


  const categories = [
    'All',
    'Sohrai Murals',
    'Khovar Bridal Art',
    'Paitkar Scroll Art',
    'Jadopatia Folklore',
    'Dokra Bell Metal',
    'Hand-Painted Home Decor',
  ];

  const pigments = [
    'All',
    'Dudhimati (White Kaolin Clay)',
    'Lal Geru (Red Hematite Ochre)',
    'Kala Mati / Manganese (Black Forest Clay)',
    'Pila Mati (Yellow Ochre)',
    'Charak Mati (Cream Alkaline Clay)',
    'Dokra Bell Metal Brass (Lost Wax)',
  ];

  const filteredProducts = useMemo(() => {
    return ARTWORKS.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.artisanVillage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.giTagNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.culturalLore.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesPigment =
        selectedPigment === 'All' ||
        product.pigmentsUsed.some((p) => p.toLowerCase().includes(selectedPigment.toLowerCase()));

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPigment && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'payout') return b.artisanPayout - a.artisanPayout;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedPigment, sortBy, maxPrice]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Tourist Explore Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#193225] font-display text-[10px] uppercase tracking-widest border border-[#D5E4D8]">
              <Compass className="w-3.5 h-3.5" />
              Tourist & Collector Discovery Portal
            </span>
            <div className="h-px flex-1 bg-[#E5E0D6]" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-serif text-[#1C1917] tracking-tight font-normal">
                Explore Sovereign Crafts
              </h1>
              <p className="text-xs sm:text-sm text-[#5C554E] mt-1 max-w-2xl leading-relaxed">
                Browse museum-grade tribal canvases, GI-certified earth murals, and lost-wax dokra castings with direct 90% payout to indigenous artisans.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/verify"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#E5E0D6] text-xs font-medium text-[#193225] hover:bg-[#FAF8F5] transition shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verify GI Certificate</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Smart Consent Engine Spotlight Showcase */}
        <section className="bg-gradient-to-br from-[#FAF8F5] via-white to-[#F2ECE3]/60 rounded-2xl p-6 sm:p-8 border border-[#E5E0D6] shadow-2xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E0D6] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C25934] animate-pulse" />
                <span className="font-display text-[10px] uppercase tracking-wider text-[#C25934] font-semibold">
                  Interactive Smart Consent Engine
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#1C1917] font-medium mt-1">
                Protected Cultural Heritage Profile
              </h2>
              <p className="text-xs text-[#5C554E] max-w-xl mt-0.5">
                Indigenous communities protect their sacred soil symbols against autonomous AI scraping. Take the Digital Pledge below to unlock Master Artisan Muni Devi&apos;s authenticated lineage and comb-cut murals.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#736B63]">
              <Lock className="w-3.5 h-3.5 text-[#C25934]" />
              <span>Section 4(a) Customary Custodian Protocol</span>
            </div>
          </div>

          <SmartConsentCard />
        </section>

        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#8C8379] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by artwork title, artist, village (e.g. Muni Devi, Sohrai, Ramgarh)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
              />
            </div>

            {/* Pigment Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedPigment}
                onChange={(e) => setSelectedPigment(e.target.value)}
                className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
              >
                <option value="All">All Soil Minerals</option>
                {pigments.slice(1).map((pigment) => (
                  <option key={pigment} value={pigment}>
                    {pigment}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-low' | 'price-high' | 'payout')}
                className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"

              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="payout">Highest Direct Artisan Payout</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition font-medium ${
                  selectedCategory === cat
                    ? 'bg-[#193225] text-white shadow-2xs'
                    : 'bg-[#FAF8F5] text-[#5C554E] hover:text-[#193225] hover:bg-[#F2ECE3] border border-[#E5E0D6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-display text-[11px] uppercase tracking-wider text-[#736B63]">
              Showing {filteredProducts.length} Authenticated Artworks
            </span>
            <span className="text-xs text-[#193225] font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              90% Direct Remuneration Guaranteed
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-[#E5E0D6] space-y-3">
              <p className="text-sm text-[#736B63]">
                No artworks matched your active filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedPigment('All');
                  setSortBy('featured');
                }}
                className="px-4 py-2 rounded-lg bg-[#193225] text-white text-xs font-medium"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Quick View Modal */}
        {selectedProduct && (
          <ProductQuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
}
