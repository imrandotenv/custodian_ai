'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTISANS } from '@/data/artisans';
import { 
  Lock, 
  CheckCircle, 
  ArrowLeft, 
  Cpu
} from 'lucide-react';
import RoleGateBanner from '@/components/RoleGateBanner';


export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#193225] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storefront</span>
        </Link>

        {/* RBAC Role Gate Banner */}
        <RoleGateBanner 
          requiredRole="admin" 
          title="Platform Superintendent Console Restricted"
          description="Superintendent clearance is required to inspect real-time autonomous AI scraping defense intercepts, cryptographic GI audit logs, and Ol Chiki corpus citations."
        >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D6]">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#193225]/30" />
              <span className="font-display text-[10px] text-[#193225] tracking-[0.24em] uppercase">
                Cooperative Audit & Compliance Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#1C1917] font-medium tracking-tight mt-1">
              Custodian AI Sovereign Audit & Compliance
            </h1>
            <p className="text-xs text-[#5C554E]">
              Cooperative oversight: GI Tag compliance, autonomous AI scraper blocking, and 90% direct payout distribution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#EBF3ED] text-[#193225] font-medium text-xs border border-[#D5E4D8]">
              <span className="w-2 h-2 rounded-full bg-[#193225]" />
              Protocol Active & Enforcing
            </span>
          </div>
        </div>

        {/* Core KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
            <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E]">
              Onboarded Guilds
            </span>
            <div className="text-2xl font-serif font-medium text-[#1C1917]">15 Master Artisans</div>
            <p className="text-[11px] text-[#193225]">
              100% Aadhaar & GI tag verified
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
            <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E]">
              Total Direct 90% Payouts
            </span>
            <div className="text-2xl font-serif font-medium text-[#193225]">₹4,82,500</div>
            <p className="text-[11px] text-[#5C554E]">
              Disbursed straight to rural families
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
            <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E]">
              AI Scrape Requests Blocked
            </span>
            <div className="text-2xl font-serif font-medium text-[#1C1917]">1,480 Bots</div>
            <p className="text-[11px] text-[#193225]">
              Zero unauthorized diffusion training
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
            <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E]">
              GI Tag Compliance
            </span>
            <div className="text-2xl font-serif font-medium text-[#1C1917]">100.0%</div>
            <p className="text-[11px] text-[#5C554E]">
              Certified by Ramgarh Atelier
            </p>
          </div>
        </div>

        {/* Section 1: AI Scraping Threat Analysis vs Protection */}
        <div className="p-6 bg-white text-[#1C1917] rounded-xl border border-[#E5E0D6] space-y-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-lg font-serif text-[#1C1917] font-medium flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#193225]" />
                Autonomous AI Scraper Interception Feed
              </h2>
              <p className="text-xs text-[#5C554E]">
                Incoming automated requests from large image generation crawling clusters filtered at the edge.
              </p>
            </div>
            <span className="font-display text-[10px] tracking-wider uppercase bg-[#EBF3ED] text-[#193225] px-3 py-1 rounded border border-[#D5E4D8] font-medium">
              Edge Filter: CC-TRIBAL-1.0
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-1.5">
              <span className="font-display text-[10px] tracking-wider uppercase text-red-700 block font-medium">
                Commercial Crawlers Blocked
              </span>
              <div className="text-2xl font-serif font-medium text-[#1C1917]">1,124</div>
              <p className="text-xs text-[#5C554E]">
                Blocked from accessing high-res canvas pigment layers without community consent.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-1.5">
              <span className="font-display text-[10px] tracking-wider uppercase text-[#193225] block font-medium">
                Fine-Tuning LoRA Attempts
              </span>
              <div className="text-2xl font-serif font-medium text-[#1C1917]">356</div>
              <p className="text-xs text-[#5C554E]">
                Interception of attempts to replicate the Sohrai horned-bull motif for stock AI art generation.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-1.5">
              <span className="font-display text-[10px] tracking-wider uppercase text-[#193225] block font-medium">
                Linguistic Exemptions
              </span>
              <div className="text-2xl font-serif font-medium text-[#1C1917]">22 Approved</div>
              <p className="text-xs text-[#5C554E]">
                Granted to non-profit Santhali Ol Chiki preservation linguistic datasets with full citation.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Rural Artisans KYC & GI Registry Audit */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-5">
          <div>
            <h2 className="text-xl font-serif text-[#1C1917] font-medium">
              Artisan KYC & Geographical Indication Registry
            </h2>
            <p className="text-xs text-[#5C554E]">
              Audit log of 15 registered master custodians across Jharkhand and West Bengal border districts.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-[#E5E0D6] text-[#5C554E] uppercase tracking-wider text-[10px] font-display">
                <tr>
                  <th className="py-3 px-4">Artisan Name & Cluster</th>
                  <th className="py-3 px-4">Craft Specialty</th>
                  <th className="py-3 px-4">GI Tag Number</th>
                  <th className="py-3 px-4 text-right">Lifetime Earnings</th>
                  <th className="py-3 px-4 text-center">KYC Audit</th>
                  <th className="py-3 px-4 text-center">AI Protection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE3]">
                {ARTISANS.map((artisan) => (
                  <tr key={artisan.id} className="hover:bg-[#FAF8F5] transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E5E0D6] flex-shrink-0">
                          <Image src={artisan.avatar} alt={artisan.name} fill className="object-cover" />
                        </div>
                        <div>
                          <strong className="block text-[#1C1917]">{artisan.name}</strong>
                          <span className="text-[11px] text-[#5C554E]">{artisan.village}, {artisan.district}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#4A433D]">
                      {artisan.craftSpecialty}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-[#193225]">
                      {artisan.giCertNumber}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#193225]">
                      ₹{artisan.totalEarnings.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[9px] font-display uppercase tracking-wider text-[#193225] bg-[#EBF3ED] px-2 py-0.5 rounded border border-[#D5E4D8]">
                        <CheckCircle className="w-3 h-3" /> VERIFIED
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[9px] font-display uppercase tracking-wider text-[#193225] bg-[#EBF3ED] px-2 py-0.5 rounded border border-[#D5E4D8]">
                        <Lock className="w-3 h-3" /> SHIELDED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </RoleGateBanner>
      </div>
    </div>
  );
}
