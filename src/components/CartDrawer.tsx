'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  QrCode, 
  ShieldCheck, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    artisanPayoutTotal,
    atelierLogisticsTotal,
    generateWhatsAppOrderUrl,
    setIsUpiModalOpen
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');

  if (!isCartOpen) return null;

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppOrderUrl(
      customerName || 'Art Patron',
      customerCity || 'India'
    );
    window.open(url, '_blank');
  };

  const handleOpenUpi = () => {
    setIsCartOpen(false);
    setIsUpiModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-2xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white text-[#1C1917] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5E0D6]">
        {/* Drawer Header */}
        <div className="p-5 bg-[#FAF8F5] border-b border-[#E5E0D6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-serif font-medium text-[#1C1917]">Your Acquisitions</h2>
            <span className="font-display text-[9px] uppercase tracking-wider bg-[#EBF3ED] text-[#193225] px-2 py-0.5 rounded font-medium border border-[#D5E4D8]">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded hover:bg-stone-200 text-[#5C554E] hover:text-[#1C1917] transition"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF8F5] border border-[#E5E0D6] flex items-center justify-center text-[#193225]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1C1917]">Your bag is empty</h3>
              <p className="text-xs text-[#5C554E] max-w-xs mx-auto leading-relaxed">
                Explore hand-painted Sohrai, Khovar, Paitkar, and Dokra creations crafted with natural forest soils.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium shadow-2xs transition"
              >
                <span>Browse Atelier Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* 90% Direct Remuneration Banner */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#193225]">
                  <ShieldCheck className="w-4 h-4 text-[#193225] flex-shrink-0" />
                  <span className="font-display text-[10px] tracking-wider uppercase">Fair-Trade Sovereign Ledger</span>
                </div>
                <p className="text-[11px] text-[#5C554E] mt-1 leading-normal">
                  <strong className="text-[#193225]">₹{artisanPayoutTotal.toLocaleString('en-IN')} (90%)</strong> goes straight to the tribal women artisan collective bank account.
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] flex gap-3 shadow-2xs"
                  >
                    {/* Item Image */}
                    <div className="relative w-18 h-18 rounded overflow-hidden flex-shrink-0 bg-stone-100 border border-[#E5E0D6]">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-medium text-[#1C1917] line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#8C8379] hover:text-red-600 transition p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-serif italic text-[11px] text-[#5C554E]">
                          By {item.product.artisanName} ({item.product.artisanVillage})
                        </p>
                        <p className="text-[10px] text-[#193225] font-medium mt-0.5">
                          Artisan gets: ₹{(item.product.artisanPayout * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#EAE5DC]">
                        <div className="flex items-center border border-[#E5E0D6] rounded bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone-100 text-[#5C554E]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#1C1917]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-stone-100 text-[#5C554E]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-semibold text-sm text-[#1C1917]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery info for WhatsApp */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-2">
                <p className="font-display text-[10px] tracking-wider uppercase text-[#5C554E] font-medium">
                  Patron Details for Dispatch:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="p-2 text-xs bg-white rounded border border-[#E5E0D6] text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                  <input
                    type="text"
                    placeholder="City / Pincode"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="p-2 text-xs bg-white rounded border border-[#E5E0D6] text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Subtotal & CTAs */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#FAF8F5] border-t border-[#E5E0D6] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#5C554E]">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items):</span>
                <span className="font-medium text-[#1C1917]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#193225] font-medium">
                <span>Artisan Direct Remuneration (90%):</span>
                <span>₹{artisanPayoutTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#8C8379] text-[11px]">
                <span>Ramgarh Studio Packaging (10%):</span>
                <span>₹{atelierLogisticsTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#8C8379] text-[11px]">
                <span>Insured Delivery across India:</span>
                <span className="text-[#193225] font-medium">Included</span>
              </div>
              <div className="pt-2 border-t border-[#E5E0D6] flex justify-between items-baseline text-base font-semibold text-[#1C1917]">
                <span>Total Amount:</span>
                <span className="text-xl font-bold text-[#193225]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] border border-[#E5E0D6] font-medium text-xs flex items-center justify-center gap-2 shadow-2xs transition"
              >
                <MessageCircle className="w-4 h-4 text-[#193225]" />
                <span>Order on WhatsApp (+91 98765 43210)</span>
              </button>

              {/* UPI Button */}
              <button
                onClick={handleOpenUpi}
                className="w-full py-2.5 px-4 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-2xs transition"
              >
                <QrCode className="w-4 h-4" />
                <span>Instant UPI Payment QR</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
