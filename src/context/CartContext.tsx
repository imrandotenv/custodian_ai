'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  artisanPayoutTotal: number;
  atelierLogisticsTotal: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isUpiModalOpen: boolean;
  setIsUpiModalOpen: (open: boolean) => void;
  generateWhatsAppOrderUrl: (customerName?: string, customerCity?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('mitti_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // ignore JSON parse error
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('mitti_cart', JSON.stringify(cart));
    } catch {
      // ignore storage error
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const artisanPayoutTotal = cart.reduce(
    (sum, item) => sum + item.product.artisanPayout * item.quantity,
    0
  );

  const atelierLogisticsTotal = cart.reduce(
    (sum, item) => sum + item.product.atelierLogistics * item.quantity,
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const generateWhatsAppOrderUrl = (customerName = 'Art Connoisseur', customerCity = 'India') => {
    const phoneNumber = '919876543210';
    if (cart.length === 0) {
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        'Namaste Mitti! I am interested in authentic GI-certified handicrafts from Jharkhand.'
      )}`;
    }

    const itemsSummary = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.title}* (Qty: ${item.quantity}) - ₹${
            item.product.price * item.quantity
          } [GI Tag: ${item.product.giTagNumber}] (Artisan: ${item.product.artisanName}, ${item.product.artisanVillage})`
      )
      .join('\n');

    const message = `Namaste Mitti (+91 98765 43210)!\n\nI want to place an order via the Sovereign Cultural Store:\n\n*Customer:* ${customerName}\n*Location:* ${customerCity}\n\n*Order Details:*\n${itemsSummary}\n\n*Total Amount:* ₹${subtotal.toLocaleString('en-IN')}\n*Direct 90% Artisan Pool:* ₹${artisanPayoutTotal.toLocaleString('en-IN')}\n\nPlease confirm availability and share UPI payment QR for direct artisan settlement. Dhanyawad!`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        artisanPayoutTotal,
        atelierLogisticsTotal,
        itemCount,
        isCartOpen,
        setIsCartOpen,
        isUpiModalOpen,
        setIsUpiModalOpen,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
