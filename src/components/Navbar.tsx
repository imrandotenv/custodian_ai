'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  MessageCircle, 
  ShieldCheck, 
  Palette, 
  Wallet, 
  PlusCircle, 
  Eye, 
  ChevronDown, 
  Compass, 
  UserCheck, 
  Layers,
  Check
} from 'lucide-react';
import { UserRole } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, setRole, roleInfo } = useRole();
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When user switches their role, update the RoleContext (and set cookie),
  // then immediately navigate them to their dedicated home path
  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);

    if (newRole === 'tourist') {
      router.push('/explore');
    } else if (newRole === 'custodian') {
      router.push('/dashboard');
    } else if (newRole === 'admin') {
      router.push('/admin');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E0D6] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col group flex-shrink-0">
            <span className="font-display tracking-[0.24em] text-2xl font-normal text-[#193225] group-hover:text-[#28553F] transition uppercase">
              MITTI
            </span>
            <span className="font-display text-[9px] tracking-[0.28em] uppercase text-[#736B63] font-medium -mt-0.5">
              Indigenous Arts • Smart Consent Engine
            </span>
          </Link>

          {/* Dynamic Desktop Navigation: Strictly Gated by Active Role */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium">
            {role === 'admin' ? (
              /* ADMIN NAVIGATION (Only for role === 'admin') */
              <>
                <Link
                  href="/admin#verify"
                  className={`transition flex items-center gap-1.5 ${
                    pathname === '/admin' ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#193225]" />
                  <span>Verify Artisans</span>
                </Link>

                <Link
                  href="/admin"
                  className={`transition flex items-center gap-1.5 ${
                    isActive('/admin') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#193225]" />
                  <span>Admin Console</span>
                </Link>

                <Link
                  href="/analytics"
                  className={`transition flex items-center gap-1.5 ${
                    isActive('/analytics') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <span>Audit Logs</span>
                </Link>

                <Link
                  href="/verify"
                  className={`transition ${
                    isActive('/verify') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <span>GI Registry</span>
                </Link>

                <Link
                  href="/explore"
                  className="text-[#736B63] hover:text-[#193225] transition flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Storefront Preview</span>
                </Link>
              </>
            ) : role === 'custodian' ? (
              /* CUSTODIAN NAVIGATION (Only for role === 'custodian') */
              <>
                <Link
                  href="/dashboard#listings"
                  className={`transition flex items-center gap-1.5 ${
                    pathname === '/dashboard' ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#193225]" />
                  <span>My Listings</span>
                </Link>

                <Link
                  href="/dashboard"
                  className={`transition flex items-center gap-1.5 ${
                    isActive('/dashboard') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5 text-[#193225]" />
                  <span>Studio Console</span>
                </Link>

                <Link
                  href="/add-art"
                  className={`transition flex items-center gap-1.5 ${
                    isActive('/add-art') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#193225]" />
                  <span>+ Intake Artwork</span>
                </Link>

                <Link
                  href="/earnings"
                  className={`transition flex items-center gap-1.5 ${
                    isActive('/earnings') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <Wallet className="w-3.5 h-3.5 text-[#193225]" />
                  <span>90% Payout Ledger</span>
                </Link>

                <Link
                  href="/explore"
                  className="text-[#736B63] hover:text-[#193225] transition flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Public View</span>
                </Link>
              </>
            ) : (
              /* TOURIST NAVIGATION (Never renders restricted links like 'Verify Artisans' or 'My Listings') */
              <>
                <Link
                  href="/explore"
                  className={`transition flex items-center gap-1 ${
                    isActive('/explore') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#193225]" />
                  <span>Explore</span>
                </Link>

                <Link
                  href="/shop"
                  className={`transition ${
                    isActive('/shop') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <span>All Artworks</span>
                </Link>

                <Link
                  href="/shop?category=Sohrai+Murals"
                  className="text-[#4A433D] hover:text-[#193225] transition"
                >
                  <span>Sohrai & Khovar</span>
                </Link>

                <Link
                  href="/#murals"
                  className="text-[#4A433D] hover:text-[#193225] transition"
                >
                  <span>Wall Murals</span>
                </Link>

                <Link
                  href="/trips"
                  className={`transition ${
                    isActive('/trips') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <span>Residencies</span>
                </Link>

                <Link
                  href="/verify"
                  className={`transition ${
                    isActive('/verify') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <span>Verify GI Tag</span>
                </Link>

                <Link
                  href="/about"
                  className={`transition ${
                    isActive('/about') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <span>Our Story</span>
                </Link>

                <Link
                  href="/contact"
                  className={`transition ${
                    isActive('/contact') ? 'text-[#193225] font-semibold border-b-2 border-[#193225] pb-1' : 'text-[#4A433D] hover:text-[#193225]'
                  }`}
                >
                  <span>Contact</span>
                </Link>
              </>
            )}
          </nav>

          {/* Right Action Cluster: Role Dropdown, WhatsApp, Cart */}
          <div className="flex items-center gap-3">
            {/* RBAC ROLE SWITCHER DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE3] border border-[#E5E0D6] text-xs font-medium text-[#1C1917] transition shadow-2xs group"
                aria-expanded={roleDropdownOpen}
                aria-haspopup="true"
                title="Switch User Role (RBAC)"
              >
                <div className="w-5 h-5 rounded-full bg-[#193225] text-white flex items-center justify-center">
                  {role === 'admin' ? (
                    <ShieldCheck className="w-3 h-3" />
                  ) : role === 'custodian' ? (
                    <Palette className="w-3 h-3" />
                  ) : (
                    <Compass className="w-3 h-3" />
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="block text-[9px] uppercase tracking-wider text-[#736B63] font-semibold leading-none">
                    Role
                  </span>
                  <span className="block text-xs font-medium text-[#193225]">
                    {role === 'tourist' ? 'Tourist' : role === 'custodian' ? 'Custodian' : 'Admin'}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-[#736B63] group-hover:text-[#193225] transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Popover */}
              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E5E0D6] p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-[#F2ECE3]">
                    <span className="font-display text-[9px] uppercase tracking-wider text-[#736B63] font-semibold">
                      Switch Active Persona
                    </span>
                  </div>

                  {/* Option 1: Tourist */}
                  <button
                    onClick={() => handleRoleSwitch('tourist')}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 ${
                      role === 'tourist'
                        ? 'bg-[#193225] text-white shadow-2xs'
                        : 'hover:bg-[#FAF8F5] text-[#1C1917]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg mt-0.5 ${role === 'tourist' ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-[#193225] border border-[#E5E0D6]'}`}>
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs">Tourist</span>
                        {role === 'tourist' && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <p className={`text-[10px] mt-0.5 leading-snug ${role === 'tourist' ? 'text-[#D5E4D8]' : 'text-[#736B63]'}`}>
                        Browsing crafts & cultural collections (Push to /explore)
                      </p>
                    </div>
                  </button>

                  {/* Option 2: Custodian */}
                  <button
                    onClick={() => handleRoleSwitch('custodian')}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 ${
                      role === 'custodian'
                        ? 'bg-[#193225] text-white shadow-2xs'
                        : 'hover:bg-[#FAF8F5] text-[#1C1917]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg mt-0.5 ${role === 'custodian' ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-[#193225] border border-[#E5E0D6]'}`}>
                      <Palette className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs">Custodian</span>
                        {role === 'custodian' && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <p className={`text-[10px] mt-0.5 leading-snug ${role === 'custodian' ? 'text-[#D5E4D8]' : 'text-[#736B63]'}`}>
                        Manage studio & listings (Push to /dashboard)
                      </p>
                    </div>
                  </button>

                  {/* Option 3: Admin */}
                  <button
                    onClick={() => handleRoleSwitch('admin')}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 ${
                      role === 'admin'
                        ? 'bg-[#193225] text-white shadow-2xs'
                        : 'hover:bg-[#FAF8F5] text-[#1C1917]'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg mt-0.5 ${role === 'admin' ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-[#193225] border border-[#E5E0D6]'}`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs">Admin</span>
                        {role === 'admin' && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <p className={`text-[10px] mt-0.5 leading-snug ${role === 'admin' ? 'text-[#D5E4D8]' : 'text-[#736B63]'}`}>
                        Verify artisans & audit ledger (Push to /admin)
                      </p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Atelier Link */}
            <a
              href="https://wa.me/919876543210?text=Namaste%20Mitti!%20I%20am%20interested%20in%20authentic%20indigenous%20crafts."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] text-xs font-medium border border-[#E5E0D6] shadow-2xs transition"
              title="Chat directly with Mitti artisan atelier (+91 98765 43210)"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#193225]" />
              <span>WhatsApp (+91 98765 43210)</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl hover:bg-[#FAF8F5] text-[#1C1917] border border-[#E5E0D6] transition"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#193225] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#1C1917] hover:bg-[#FAF8F5] border border-[#E5E0D6]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E0D6] bg-white px-5 py-4 space-y-4 animate-in slide-in-from-top-2 duration-150">
          {/* Mobile Role Switcher */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6] space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-display text-[9px] uppercase tracking-wider text-[#736B63] block font-semibold">
                Active Role:
              </span>
              <span className="font-display text-[9px] uppercase tracking-wider text-[#193225] bg-[#EBF3ED] px-2 py-0.5 rounded border border-[#D5E4D8] font-semibold capitalize">
                {role}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => handleRoleSwitch('tourist')}
                className={`py-2 px-2 rounded-lg text-xs font-medium transition text-center ${
                  role === 'tourist'
                    ? 'bg-[#193225] text-white font-semibold shadow-2xs'
                    : 'bg-white text-[#4A433D] border border-[#E5E0D6]'
                }`}
              >
                Tourist
              </button>
              <button
                onClick={() => handleRoleSwitch('custodian')}
                className={`py-2 px-2 rounded-lg text-xs font-medium transition text-center flex items-center justify-center gap-1 ${
                  role === 'custodian'
                    ? 'bg-[#193225] text-white font-semibold shadow-2xs'
                    : 'bg-white text-[#4A433D] border border-[#E5E0D6]'
                }`}
              >
                <Palette className="w-3 h-3" />
                <span>Custodian</span>
              </button>
              <button
                onClick={() => handleRoleSwitch('admin')}
                className={`py-2 px-2 rounded-lg text-xs font-medium transition text-center flex items-center justify-center gap-1 ${
                  role === 'admin'
                    ? 'bg-[#193225] text-white font-semibold shadow-2xs'
                    : 'bg-white text-[#4A433D] border border-[#E5E0D6]'
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Links for Mobile Gated Dynamically */}
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#4A433D]">
            {role === 'admin' ? (
              <>
                <Link
                  href="/admin#verify"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5] font-semibold text-[#193225] flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-[#193225]" />
                  <span>Verify Artisans</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5] flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#193225]" />
                  <span>Admin Console</span>
                </Link>
                <Link
                  href="/analytics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  Audit Logs
                </Link>
                <Link
                  href="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5] text-[#736B63]"
                >
                  Storefront Preview
                </Link>
              </>
            ) : role === 'custodian' ? (
              <>
                <Link
                  href="/dashboard#listings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5] font-semibold text-[#193225] flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-[#193225]" />
                  <span>My Listings</span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  Studio Console
                </Link>
                <Link
                  href="/add-art"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  + Intake New Artwork
                </Link>
                <Link
                  href="/earnings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  90% Payout Ledger
                </Link>
                <Link
                  href="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5] text-[#736B63]"
                >
                  Public View
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5] font-semibold text-[#193225]"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  All Artworks
                </Link>
                <Link
                  href="/#murals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  Wall Murals
                </Link>
                <Link
                  href="/trips"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  Living Residencies
                </Link>
                <Link
                  href="/verify"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  Verify GI Tag Certificate
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  Our Story
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-[#FAF8F5]"
                >
                  Contact
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
