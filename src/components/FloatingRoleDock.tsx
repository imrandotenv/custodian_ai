'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types';
import { ShieldCheck, Palette, Compass, ChevronUp, Check, X } from 'lucide-react';

export default function FloatingRoleDock() {
  const { role, setRole, roleInfo } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setIsOpen(false);

    if (newRole === 'custodian') {
      router.push('/dashboard');
    } else if (newRole === 'admin') {
      router.push('/admin');
    } else if (newRole === 'tourist') {
      router.push('/explore');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="mb-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E5E0D6] p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE3]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#193225] animate-pulse" />
              <span className="font-display text-[10px] tracking-wider uppercase text-[#193225] font-semibold">
                Simulate Persona
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-[#736B63] hover:text-[#1C1917] hover:bg-[#FAF8F5]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#5C554E] leading-relaxed">
            Test how Mitti’s sovereign permissions dynamically gate and adapt for each stakeholder:
          </p>

          <div className="space-y-2">
            {/* Tourist Option */}
            <button
              onClick={() => handleRoleSelect('tourist')}
              className={`w-full text-left p-2.5 rounded-xl border transition flex items-start gap-3 ${
                role === 'tourist'
                  ? 'bg-[#193225] text-white border-[#193225] shadow-2xs'
                  : 'bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#1C1917] border-[#E5E0D6]'
              }`}
            >
              <div className={`p-1.5 rounded-lg mt-0.5 ${role === 'tourist' ? 'bg-white/20 text-white' : 'bg-white text-[#193225] border border-[#E5E0D6]'}`}>
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs">Tourist</span>
                  {role === 'tourist' && <Check className="w-3.5 h-3.5" />}
                </div>
                <p className={`text-[10px] mt-0.5 leading-snug ${role === 'tourist' ? 'text-[#D5E4D8]' : 'text-[#736B63]'}`}>
                  Curated storefront, oral lores, WhatsApp & UPI acquisitions
                </p>
              </div>
            </button>

            {/* Custodian Option */}
            <button
              onClick={() => handleRoleSelect('custodian')}
              className={`w-full text-left p-2.5 rounded-xl border transition flex items-start gap-3 ${
                role === 'custodian'
                  ? 'bg-[#193225] text-white border-[#193225] shadow-2xs'
                  : 'bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#1C1917] border-[#E5E0D6]'
              }`}
            >
              <div className={`p-1.5 rounded-lg mt-0.5 ${role === 'custodian' ? 'bg-white/20 text-white' : 'bg-white text-[#193225] border border-[#E5E0D6]'}`}>
                <Palette className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs">Custodian</span>
                  {role === 'custodian' && <Check className="w-3.5 h-3.5" />}
                </div>
                <p className={`text-[10px] mt-0.5 leading-snug ${role === 'custodian' ? 'text-[#D5E4D8]' : 'text-[#736B63]'}`}>
                  Ramgarh atelier console, artwork intake & 90% payout ledger
                </p>
              </div>
            </button>

            {/* Admin Option */}
            <button
              onClick={() => handleRoleSelect('admin')}
              className={`w-full text-left p-2.5 rounded-xl border transition flex items-start gap-3 ${
                role === 'admin'
                  ? 'bg-[#193225] text-white border-[#193225] shadow-2xs'
                  : 'bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#1C1917] border-[#E5E0D6]'
              }`}
            >
              <div className={`p-1.5 rounded-lg mt-0.5 ${role === 'admin' ? 'bg-white/20 text-white' : 'bg-white text-[#193225] border border-[#E5E0D6]'}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs">Admin</span>
                  {role === 'admin' && <Check className="w-3.5 h-3.5" />}
                </div>
                <p className={`text-[10px] mt-0.5 leading-snug ${role === 'admin' ? 'text-[#D5E4D8]' : 'text-[#736B63]'}`}>
                  Verify artisans, AI scraping firewall intercepts, and GI registry
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Collapsed Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white text-[#1C1917] border border-[#E5E0D6] shadow-md hover:border-[#193225]/40 transition text-xs font-medium group"
        title="Antigravity RBAC Switcher"
      >
        <span className="w-2 h-2 rounded-full bg-[#193225] animate-pulse" />
        <span className="text-[11px] text-[#736B63]">Role:</span>
        <span className="font-semibold text-[#193225]">{roleInfo.roleName}</span>
        <ChevronUp className={`w-3.5 h-3.5 text-[#736B63] group-hover:text-[#193225] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
