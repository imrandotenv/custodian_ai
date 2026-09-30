'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ARTISANS } from '@/data/artisans';
import { 
  Bot, 
  Lock, 
  CheckCircle, 
  ArrowLeft, 
  UserCheck, 
  Search,
  Award
} from 'lucide-react';
import RoleGateBanner from '@/components/RoleGateBanner';


export default function AdminPage() {
  const [artisansList, setArtisansList] = useState(
    ARTISANS.map((a, i) => ({
      ...a,
      adiKarmayogiId: `AK-GOV-JH-${202400 + i * 47}`,
      status: i === 0 ? 'Pending Verification' : 'Verified & Authenticated',
      verificationDate: i === 0 ? 'Pending Review' : '14 Jan 2024',
    }))
  );

  const [filterSearch, setFilterSearch] = useState('');
  const [verifiedSuccessMessage, setVerifiedSuccessMessage] = useState<string | null>(null);

  const handleVerifyArtisan = (id: string, name: string) => {
    setArtisansList((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'Verified & Authenticated',
              verificationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            }
          : a
      )
    );
    setVerifiedSuccessMessage(`Artisan ${name} successfully authenticated via Adi Karmayogi Portal & GI Registry.`);
    setTimeout(() => setVerifiedSuccessMessage(null), 4000);
  };

  const filteredArtisans = artisansList.filter(
    (a) =>
      a.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
      a.village.toLowerCase().includes(filterSearch.toLowerCase()) ||
      a.adiKarmayogiId.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#193225] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#193225] text-white font-medium text-xs border border-[#193225]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Admin Superintendent Clearance Active
          </span>
        </div>

        {/* RBAC Role Gate Banner */}
        <RoleGateBanner 
          requiredRole="admin" 
          title="Platform Superintendent Console Restricted"
          description="Superintendent clearance is required to inspect real-time autonomous AI scraping defense intercepts, cryptographic GI audit logs, and artisan identity verification."
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D6]">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#193225]/30" />
                <span className="font-display text-[10px] text-[#193225] tracking-[0.24em] uppercase">
                  Central Governance Node
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif text-[#1C1917] font-normal tracking-tight mt-1">
                Admin Superintendent Console
              </h1>
              <p className="text-xs sm:text-sm text-[#5C554E] mt-1">
                Platform oversight: Verify artisan credentials, monitor AI scraper blocking firewalls, and audit the 90% direct payout ledger.
              </p>
            </div>
          </div>

          {/* Verification Notification Toast */}
          {verifiedSuccessMessage && (
            <div className="p-4 rounded-xl bg-[#EBF3ED] border border-[#D5E4D8] text-[#193225] text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200 shadow-2xs">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{verifiedSuccessMessage}</span>
            </div>
          )}

          {/* Section: Verify Artisans */}
          <section id="verify" className="bg-white rounded-xl border border-[#E5E0D6] shadow-2xs p-6 space-y-6 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2ECE3] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#193225]" />
                  <h2 className="text-lg font-serif font-medium text-[#1C1917]">
                    Verify Artisans & Lineage Credentials
                  </h2>
                </div>
                <p className="text-xs text-[#5C554E] mt-0.5">
                  Review applicant profiles, authenticate Government Adi Karmayogi IDs, and certify tribal lineage badges.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#8C8379] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by name or Govt ID..."
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                />
              </div>
            </div>

            {/* Artisans Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E0D6] text-[#736B63] font-display text-[10px] uppercase tracking-wider bg-[#FAF8F5]">
                    <th className="py-3 px-4">Artisan & Village</th>
                    <th className="py-3 px-4">Craft Discipline</th>
                    <th className="py-3 px-4">Adi Karmayogi Govt ID</th>
                    <th className="py-3 px-4">GI Tag Status</th>
                    <th className="py-3 px-4">Verification State</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE3]">
                  {filteredArtisans.map((artisan) => (
                    <tr key={artisan.id} className="hover:bg-[#FAF8F5]/80 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#1C1917]">{artisan.name}</div>
                        <div className="text-[11px] text-[#736B63]">{artisan.village}, {artisan.district}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#4A433D]">
                        {artisan.craftSpecialty}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[11px] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E5E0D6] text-[#193225] font-semibold">
                          {artisan.adiKarmayogiId}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#193225] font-medium">
                          <Award className="w-3.5 h-3.5 text-[#193225]" />
                          {artisan.giCertNumber}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                            artisan.status === 'Verified & Authenticated'
                              ? 'bg-[#EBF3ED] text-[#193225] border-[#D5E4D8]'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${artisan.status === 'Verified & Authenticated' ? 'bg-[#193225]' : 'bg-amber-500'}`} />
                          {artisan.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {artisan.status === 'Verified & Authenticated' ? (
                          <span className="text-[11px] text-[#736B63] font-medium">
                            Authenticated
                          </span>
                        ) : (
                          <button
                            onClick={() => handleVerifyArtisan(artisan.id, artisan.name)}
                            className="px-3 py-1.5 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium transition shadow-2xs"
                          >
                            Verify & Authenticate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Autonomous AI Defense Intercepts */}
          <section className="bg-white rounded-xl border border-[#E5E0D6] shadow-2xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#193225]" />
                <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                  Autonomous AI Scraper Defense Logs (CC-TRIBAL-1.0)
                </h3>
              </div>
              <span className="text-xs text-[#193225] font-mono font-medium">
                FIREWALL: ACTIVE (0% LEAKAGE)
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { bot: 'OpenAI-ImageBot/v4.2', ip: '198.51.100.44', target: 'Comb-Cut Khovar High-Res Matrix', action: 'BLOCKED (HTTP 451)', time: '2 mins ago' },
                { bot: 'Midjourney-Crawler/3.1', ip: '203.0.113.19', target: 'Pashupati Sacred Soil Canvas', action: 'BLOCKED (HTTP 451)', time: '14 mins ago' },
                { bot: 'AnthropicClaudeScraper/1.0', ip: '192.0.2.88', target: 'Ol Chiki Folklore Audio Metadata', action: 'BLOCKED (HTTP 451)', time: '38 mins ago' },
                { bot: 'StableDiffusion-LAION-Harvester', ip: '198.51.100.12', target: 'Dokra Lost-Wax 3D Geometry', action: 'BLOCKED (HTTP 451)', time: '1 hour ago' },
              ].map((log, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D6] text-xs gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                    <div>
                      <span className="font-mono font-semibold text-[#1C1917]">{log.bot}</span>
                      <span className="text-[#736B63] ml-2 text-[11px]">[{log.ip}]</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-[#5C554E] italic">{log.target}</span>
                    <span className="font-mono text-red-700 font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {log.action}
                    </span>
                    <span className="text-[#736B63]">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RoleGateBanner>
      </div>
    </div>
  );
}
