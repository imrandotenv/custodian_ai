'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { 
  Palette, 
  ShieldCheck, 
  Eye, 
  Lock, 
  Unlock, 
  ArrowLeft 
} from 'lucide-react';


interface RoleGateBannerProps {
  requiredRole: 'custodian' | 'admin' | 'local';
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function RoleGateBanner({ 
  requiredRole, 
  title, 
  description, 
  children 
}: RoleGateBannerProps) {
  const { role, setRole, roleInfo } = useRole();
  const router = useRouter();

  // Custodian pages can be accessed by 'custodian' (Artisan) or 'admin'
  // Admin pages can only be accessed by 'admin'
  const isAuthorized = (requiredRole === 'custodian' || requiredRole === 'local')
    ? (role === 'custodian' || role === 'admin')
    : (role === 'admin');

  // If user is authorized, display active persona banner and the protected children
  if (isAuthorized) {
    return (
      <div className="space-y-6">
        {/* Active Session Status Strip */}
        <div className="p-3.5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#EBF3ED] text-[#193225] flex items-center justify-center flex-shrink-0">
              {role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Palette className="w-3.5 h-3.5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#193225]">
                  {role === 'admin' ? 'Superintendent (Admin) Active' : 'Master Artisan Custodian Active'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#193225] animate-pulse" />
                <span className="text-[#736B63]">
                  {role === 'admin' ? 'Cooperative Compliance Node' : 'Somra Hembrom Atelier (Ramgarh Cantt)'}
                </span>
              </div>
              <p className="text-[11px] text-[#5C554E]">
                {role === 'admin'
                  ? 'Autonomous AI crawler intercept logs & GI cryptographic SHA-256 validation active'
                  : '90% direct bank remuneration ledger bound to UPI: somra.hembrom@sbi'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setRole('tourist');
              router.push('/explore');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] border border-[#E5E0D6] font-medium text-xs transition"
            title="Switch back to Tourist view"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Switch to Tourist View</span>
          </button>
        </div>

        {/* Protected Page Children */}
        {children}
      </div>
    );
  }

  // ACCESS RESTRICTED SCREEN (RBAC ENFORCED)
  return (
    <div className="py-8 sm:py-12">
      <div className="bg-white rounded-2xl border-2 border-[#193225]/20 p-6 sm:p-12 shadow-sm text-center max-w-2xl mx-auto space-y-6">
        {/* Lock Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F5] text-[#193225] flex items-center justify-center border border-[#E5E0D6] shadow-2xs">
          <Lock className="w-7 h-7" />
        </div>

        {/* Gated Badge & Headings */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E5E0D6] text-[#193225] text-[11px] font-display uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>RBAC Protected • Access Restricted</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917] font-medium">
            {title || ((requiredRole === 'custodian' || requiredRole === 'local') ? 'Custodian Studio Console Restricted' : 'Superintendent Auditor Console Restricted')}
          </h2>

          <p className="text-xs sm:text-sm text-[#5C554E] max-w-lg mx-auto leading-relaxed">
            {description || ((requiredRole === 'custodian' || requiredRole === 'local')
              ? 'You are currently browsing as a Tourist / Collector. This private studio workspace is restricted to registered indigenous custodians of Ramgarh Cantt to manage catalog inventory, mint GI provenance certificates, and audit 90% direct bank remittances.'
              : 'You are currently browsing without administrative clearance. Platform Superintendent credentials are required to inspect autonomous AI scraping blockades, Ol Chiki corpus citations, and cryptographic GI Tag verification.')}
          </p>
        </div>

        {/* Role Comparison Plaque */}
        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5E0D6] text-xs text-left max-w-md mx-auto space-y-2.5">
          <div className="flex justify-between items-center text-[#5C554E]">
            <span className="font-sans">Your Current Role:</span>
            <span className="font-semibold text-[#1C1917] bg-white px-2.5 py-0.5 rounded border border-[#E5E0D6]">
              {roleInfo.roleName} ({role})
            </span>
          </div>
          <div className="flex justify-between items-center text-[#5C554E]">
            <span className="font-sans">Required Role:</span>
            <span className="font-semibold text-[#193225] bg-[#EBF3ED] px-2.5 py-0.5 rounded border border-[#D5E4D8]">
              {(requiredRole === 'custodian' || requiredRole === 'local') ? 'Custodian (or Admin)' : 'Admin'}
            </span>
          </div>
          <div className="flex justify-between items-center text-[#5C554E]">
            <span className="font-sans">Governance Protocol:</span>
            <span className="font-mono text-[10px] text-[#736B63]">CC-TRIBAL-1.0-RBAC-STRICT</span>
          </div>
        </div>

        {/* 1-Click Role Switcher Actions for Demo */}
        <div className="pt-2 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                const targetRole = requiredRole === 'admin' ? 'admin' : 'custodian';
                setRole(targetRole);
                if (targetRole === 'admin') router.push('/admin');
                else router.push('/dashboard');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium tracking-wide shadow-2xs transition flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock as {requiredRole === 'admin' ? 'Admin' : 'Custodian'} (1-Click)</span>
            </button>

            <Link
              href="/explore"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#FAF8F5] hover:bg-stone-200 text-[#1C1917] text-xs font-medium border border-[#E5E0D6] transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Explore Public Works</span>
            </Link>
          </div>

          <p className="text-[11px] text-[#736B63]">
            Mitti RBAC dynamically restricts routes and UI permissions based on your verified role cookie.
          </p>
        </div>
      </div>
    </div>
  );
}
