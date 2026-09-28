'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useAudio } from '@/context/AudioContext';
import { 
  X, 
  ShieldCheck, 
  ShoppingBag, 
  MessageCircle, 
  Volume2, 
  Copy, 
  Check, 
  Award,
  ArrowRight
} from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({ product, onClose }: ProductQuickViewModalProps) {
  const { addToCart } = useCart();
  const { playTrack } = useAudio();
  const [copiedHash, setCopiedHash] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imgMap, setImgMap] = useState<Record<number, string>>({});

  if (!product) return null;

  const images = [product.image, ...(product.secondaryImages || [])];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(product.provenanceHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handlePlayLore = () => {
    playTrack({
      id: product.id,
      title: product.title,
      artisanName: product.artisanName,
      village: product.artisanVillage,
      loreText: product.culturalLore,
      duration: '2m 14s',
    });
  };

  const directWhatsAppUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Namaste Mitti! I want to purchase: "${product.title}"\nGI Tag: ${product.giTagNumber}\nPrice: ₹${product.price}\nArtisan: ${product.artisanName} (${product.artisanVillage})\nPlease confirm piece reservation and shipping.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white text-[#1C1917] rounded-xl shadow-xl overflow-hidden border border-[#E5E0D6] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#5C554E] hover:text-[#1C1917] transition border border-[#E5E0D6] shadow-2xs"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Gallery & Soil Pigments */}
          <div className="p-6 bg-[#FAF8F5] border-b md:border-b-0 md:border-r border-[#E5E0D6] flex flex-col justify-between">
            <div>
              {/* Main Image in Passe-Partout Matting */}
              <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#E5E0D6] shadow-2xs bg-white p-2">
                <div className="relative w-full h-full rounded overflow-hidden">
                  <Image
                    src={imgMap[activeImageIndex] || images[activeImageIndex] || product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    onError={() => setImgMap(prev => ({ ...prev, [activeImageIndex]: '/images/placeholder-art.jpg' }))}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#193225] font-display text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-0.5 rounded-xs shadow-2xs border border-[#E5E0D6] flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-[#193225]" />
                    {product.giTagNumber}
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-12 rounded overflow-hidden border-2 transition ${
                        activeImageIndex === idx ? 'border-[#193225]' : 'border-[#E5E0D6] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={imgMap[idx] || img}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                        onError={() => setImgMap(prev => ({ ...prev, [idx]: '/images/placeholder-art.jpg' }))}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Natural Soil Pigments */}
              <div className="mt-5">
                <h4 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E] font-medium mb-2">
                  100% Natural Soil Clays Formulated:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.pigmentsUsed.map((pigment, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white text-[#4A433D] px-2.5 py-1 rounded border border-[#E5E0D6] font-medium"
                    >
                      {pigment}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SHA-256 Provenance Bar */}
            <div className="mt-6 pt-4 border-t border-[#E5E0D6]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[#5C554E] font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#193225]" />
                  <span className="font-display text-[10px] tracking-wider uppercase text-[#193225]">SHA-256 Ledger Hash:</span>
                </span>
                <button
                  onClick={handleCopyHash}
                  className="font-display text-[10px] tracking-wider uppercase text-[#193225] hover:underline flex items-center gap-1 font-medium"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-[#193225]" /> : <Copy className="w-3 h-3" />}
                  {copiedHash ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="font-mono text-[10px] text-[#5C554E] bg-white p-2 rounded border border-[#E5E0D6] truncate">
                {product.provenanceHash}
              </p>
            </div>
          </div>

          {/* Right Column: Information, Remuneration & Purchasing */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225]/80 font-medium">
                  {product.category} • {product.dimensions}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] font-medium mt-1 leading-snug">
                  {product.title}
                </h2>
                {product.hindiTitle && (
                  <p className="font-serif italic text-xs text-[#5C554E] mt-0.5">
                    {product.hindiTitle}
                  </p>
                )}
              </div>

              {/* Master Artisan Details */}
              <div className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-[#E5E0D6]">
                  <Image
                    src={product.artisanAvatar}
                    alt={product.artisanName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif italic text-xs text-[#5C554E]">Master Artisan</p>
                  <p className="text-sm font-semibold text-[#1C1917] truncate">
                    {product.artisanName}
                  </p>
                  <p className="text-[11px] text-[#5C554E]">
                    {product.artisanVillage}
                  </p>
                </div>
                <button
                  onClick={handlePlayLore}
                  className="px-2.5 py-1.5 rounded bg-white hover:bg-[#EBF3ED] border border-[#E5E0D6] text-xs font-medium text-[#193225] flex items-center gap-1.5 transition shadow-2xs"
                  title="Listen to Artisan Voice Lore"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Voice Lore</span>
                </button>
              </div>

              {/* Cultural Lore Story */}
              <div>
                <h4 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E] font-medium mb-1">
                  Sacred Tribal Context:
                </h4>
                <p className="text-xs text-[#4A433D] font-serif italic leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border-l-2 border-[#193225]">
                  &ldquo;{product.culturalLore}&rdquo;
                </p>
              </div>

              {/* 90% Direct Remuneration Breakdown */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium">
                    90% Direct Remuneration:
                  </span>
                  <span className="font-semibold text-[#193225] text-sm font-sans">
                    ₹{product.artisanPayout.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-full bg-[#E5E0D6] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#193225] h-full rounded-full w-[90%]" />
                </div>
                <p className="text-[11px] text-[#5C554E] mt-1.5 leading-normal">
                  Transferred directly into {product.artisanName}’s cooperative account. Only 10% supports Ramgarh atelier operations and framing.
                </p>
              </div>
            </div>

            {/* Pricing & Actions */}
            <div className="pt-5 mt-4 border-t border-[#F2ECE3]">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-2xl font-semibold text-[#1C1917]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#8C8379] ml-2">
                    (Includes GST & Wooden Framing)
                  </span>
                </div>
                <span className="font-display text-[9px] uppercase tracking-wider text-[#193225] bg-[#EBF3ED] px-2 py-0.5 rounded border border-[#D5E4D8]">
                  Available • Dispatch in 24h
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs py-3 px-4 rounded-lg transition shadow-2xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] border border-[#E5E0D6] font-medium text-xs py-3 px-4 rounded-lg transition shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Buy on WhatsApp</span>
                </a>
              </div>

              <div className="mt-3 text-center">
                <Link
                  href={`/verify?tag=${encodeURIComponent(product.giTagNumber)}`}
                  onClick={onClose}
                  className="text-xs text-[#5C554E] hover:text-[#193225] underline inline-flex items-center gap-1"
                >
                  Audit GI Certificate in Public Ledger <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
