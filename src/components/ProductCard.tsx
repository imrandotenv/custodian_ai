'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useAudio } from '@/context/AudioContext';
import { 
  ShoppingBag, 
  MessageCircle, 
  Heart, 
  Volume2, 
  Eye,
  ShieldCheck,
  Lock,
  RotateCcw
} from 'lucide-react';
import { GovtVerifiedBadge } from '@/components/ArtisanCard';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  requireConsent?: boolean;
}

export default function ProductCard({ 
  product, 
  onQuickView, 
  requireConsent = true 
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { playTrack } = useAudio();
  const [liked, setLiked] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [isUnlocked, setIsUnlocked] = useState(!requireConsent);
  const [isCardHovered, setIsCardHovered] = useState(false);

  React.useEffect(() => {
    setImgSrc(product.image);
  }, [product.image]);

  const directWhatsAppUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Namaste Mitti! I would like to inquire/order: "${product.title}" (GI Tag: ${product.giTagNumber}, Price: ₹${product.price}). Please share availability and dispatch details.`
  )}`;

  const handlePlayLore = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTrack({
      id: product.id,
      title: product.title,
      artisanName: product.artisanName,
      village: product.artisanVillage,
      loreText: product.culturalLore,
      duration: '2m 14s',
    });
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden border border-[#E5E0D6] hover:border-[#193225]/40 hover:shadow-md transition-all duration-300 flex flex-col group"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {/* Archival Passe-Partout Matting Container */}
      <div 
        className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5] p-2.5 cursor-pointer select-none"
        onClick={(e) => {
          if (!isUnlocked) {
            e.stopPropagation();
            setIsUnlocked(true);
            return;
          }
          onQuickView(product);
        }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-lg border border-[#EAE5DC]">
          {/* Artwork Image with Heavy Blur Animation (Smart Consent Engine) */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              filter: isUnlocked ? 'blur(0px)' : 'blur(16px)',
              scale: isUnlocked ? 1 : 1.06,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <Image
              src={imgSrc}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-103"
              onError={() => setImgSrc('/images/placeholder-art.jpg')}
            />
          </motion.div>

          {/* SMART CONSENT OVERLAY (Locked State) */}
          <AnimatePresence>
            {!isUnlocked && (
              <motion.div
                key="smart-consent-overlay"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' as const }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center p-3 bg-[#1C1917]/35 backdrop-blur-md select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUnlocked(true);
                }}
              >
                {/* Minimalist Plaque: Warm Sand (#F9F6F0) & Charcoal (#1C1917) */}
                <motion.div
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#F9F6F0]/95 backdrop-blur-md border border-[#E5E0D6] shadow-md max-w-[90%] text-center cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Sleek Lock Icon & Small Text 'Protected Asset' */}
                  <div className="flex items-center gap-1.5 text-[#1C1917]">
                    <div className="w-5 h-5 rounded-full bg-[#1C1917]/10 flex items-center justify-center text-[#1C1917]">
                      <Lock className="w-2.5 h-2.5" />
                    </div>
                    <span className="font-display text-[9px] uppercase tracking-[0.2em] font-semibold text-[#1C1917]">
                      Protected Asset
                    </span>
                  </div>

                  <p className="text-[9.5px] text-[#5C554E] font-sans leading-tight">
                    Customary Protocol Active
                  </p>

                  {/* Interactive 'Take Pledge to View' button */}
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUnlocked(true);
                    }}
                    className="mt-0.5 w-full py-1.5 px-3 rounded-lg bg-[#1C1917] hover:bg-[#2C2724] text-[#F9F6F0] text-[10px] font-medium tracking-wide shadow-xs flex items-center justify-center gap-1.5 transition"
                    animate={{
                      scale: isCardHovered ? [1, 1.03, 1] : 1,
                      backgroundColor: isCardHovered ? '#193225' : '#1C1917',
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <ShieldCheck className="w-3 h-3 text-[#849A89]" />
                    <span>Take Pledge to View</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Govt Verified (Adi Karmayogi) Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1 font-display text-[8.5px] uppercase tracking-wider text-[#14422B] font-semibold bg-[#EAF5EE]/95 backdrop-blur-xs px-2 py-0.5 border border-[#6FA47E]/45 rounded-xs shadow-2xs">
              <ShieldCheck className="w-2.5 h-2.5 text-[#1E743F]" />
              <span>Govt Verified (Adi Karmayogi)</span>
            </span>
          </div>

          {/* Top Right Action Icons */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            {requireConsent && isUnlocked && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUnlocked(false);
                }}
                className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#736B63] hover:text-[#193225] shadow-2xs border border-[#E5E0D6] flex items-center justify-center transition"
                title="Re-lock with Smart Consent Protocol"
                aria-label="Re-lock asset"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={handlePlayLore}
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#193225] shadow-2xs border border-[#E5E0D6] flex items-center justify-center transition"
              title="Listen to artisan voice lore"
              aria-label="Listen lore"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#736B63] hover:text-red-600 shadow-2xs border border-[#E5E0D6] flex items-center justify-center transition"
              aria-label="Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          {/* Quick View Overlay Plaque (Only active when unlocked) */}
          {isUnlocked && (
            <div className="absolute inset-0 bg-[#193225]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="inline-flex items-center gap-1.5 bg-white/95 text-[#193225] font-display text-[10px] tracking-[0.16em] uppercase px-3 py-1.5 rounded-sm shadow-xs border border-[#E5E0D6]">
                <Eye className="w-3 h-3" /> View Archive
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Museum Exhibition Plaque / Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Dimensions */}
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span className="font-display uppercase tracking-[0.2em] text-[#193225]/80 font-medium">
              {product.category}
            </span>
            <span className="text-[#8C8379] font-sans text-[11px]">{product.dimensions}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif text-lg font-medium text-[#1C1917] leading-snug line-clamp-1 group-hover:text-[#193225] transition cursor-pointer"
          >
            {product.title}
          </h3>

          {/* Master Artisan Attribution */}
          <p className="font-serif italic text-xs text-[#5C554E] mt-1 flex items-center gap-1 flex-wrap">
            <span>Handcrafted by</span> <span className="font-sans font-medium not-italic text-[#1C1917]">{product.artisanName}</span>
            <GovtVerifiedBadge color="sage" />
            <span>• {product.artisanVillage.split(',')[0]}</span>
          </p>

          {/* Direct Remuneration Micro-Ledger */}
          <div className="mt-2.5 pt-2 border-t border-[#F5EFE6] flex items-center justify-between text-[11px]">
            <span className="text-[#5C554E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#193225]" />
              Artisan Disbursal (90%)
            </span>
            <span className="font-medium text-[#193225]">
              ₹{product.artisanPayout.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Price & Acquisition Actions */}
        <div className="pt-3 mt-3 border-t border-[#F2ECE3] flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-semibold text-[#1C1917]">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-[#8C8379]">
              Insured Art Transit
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Direct Chat */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] border border-[#E5E0D6] transition shadow-2xs"
              title="Order directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            {/* Acquisition Button */}
            <button
              onClick={() => addToCart(product, 1)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium tracking-wide transition shadow-2xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
