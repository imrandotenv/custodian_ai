'use client';

import React, { useState, useMemo } from 'react';
import { ARTWORKS } from '@/data/artworks';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import ProductQuickViewModal from '@/components/ProductQuickViewModal';
import { Search, RefreshCw, Sparkles } from 'lucide-react';

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPigment, setSelectedPigment] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'payout'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const categories = [
    'All',
    'Sohrai Murals',
    'Khovar Bridal Art',
    'Paitkar Scroll Art',
    'Jadopatia Folklore',
    'Dokra Bell Metal',
    'Hand-Painted Home Decor',
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

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPigment('All');
    setSortBy('featured');
    setMaxPrice(10000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#193225]/30" />
            <span className="font-display text-[11px] text-[#193225] tracking-[0.24em] uppercase">
              Curated Atelier Archive • Ramgarh Cantt
            </span>
            <div className="w-8 h-px bg-[#193225]/30" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#1C1917] tracking-tight font-normal">
            Original Indigenous Handicrafts of Jharkhand
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-xl mx-auto leading-relaxed">
            GI Certified (<span className="font-display tracking-wider text-[#193225]">#JH-SOHRAI-2020</span>). 90% direct payout straight into the indigenous women artisans’ bank accounts.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#8C8379] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by craft, artisan name, village, or GI tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225] placeholder:text-[#8C8379]"
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs focus:outline-none focus:border-[#193225] text-[#1C1917] font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Traditional Crafts' : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Soil Pigment Select */}
            <div className="md:col-span-2">
              <select
                value={selectedPigment}
                onChange={(e) => setSelectedPigment(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs focus:outline-none focus:border-[#193225] text-[#1C1917] font-medium"
              >
                <option value="All">All Soil Clays</option>
                <option value="Dudhimati">Dudhimati (White)</option>
                <option value="Geru">Lal Geru (Red)</option>
                <option value="Manganese">Manganese (Black)</option>
                <option value="Pila">Pila Mati (Yellow)</option>
                <option value="Dokra">Dokra Brass</option>
              </select>
            </div>

            {/* Sort Select */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-low' | 'price-high' | 'payout')}
                className="w-full py-2.5 px-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs focus:outline-none focus:border-[#193225] text-[#1C1917] font-medium"
              >

                <option value="featured">Featured Pieces</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="payout">Highest Artisan Payout</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Row: Price Slider & Reset */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#F2ECE3] text-xs">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-[#5C554E] font-medium text-xs">Max Budget:</span>
              <input
                type="range"
                min={800}
                max={10000}
                step={200}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-[#193225] w-36 sm:w-48"
              />
              <span className="font-semibold text-[#193225] text-xs">
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center gap-4 self-end sm:self-auto text-xs">
              <span className="text-[#5C554E]">
                Displaying <strong className="text-[#1C1917]">{filteredProducts.length}</strong> archived creations
              </span>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[#193225] hover:underline font-semibold transition"
              >
                <RefreshCw className="w-3 h-3" /> Reset Filter
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-[#E5E0D6] space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF8F5] border border-[#E5E0D6] flex items-center justify-center text-[#193225]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1C1917]">
              No matching artworks found
            </h3>
            <p className="text-xs text-[#5C554E] max-w-sm mx-auto">
              Try adjusting your search terms or reset the filters to browse our full collection.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
