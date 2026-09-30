'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download
} from 'lucide-react';
import RoleGateBanner from '@/components/RoleGateBanner';


interface SettlementItem {
  id: string;
  date: string;
  artwork: string;
  giTag: string;
  buyerCity: string;
  orderTotal: number;
  artisanPayout: number; // 90%
  atelierFee: number; // 10%
  status: 'SETTLED' | 'PROCESSING';
  utrRef: string;
}

export default function EarningsPage() {
  const transactions: SettlementItem[] = [
    {
      id: 'TXN-9021',
      date: '24 Sep 2026',
      artwork: 'Pashupati & Sacred Cattle Harvest Mural',
      giTag: 'GI-JH-SOHRAI-2020-0089',
      buyerCity: 'Bengaluru, Karnataka',
      orderTotal: 4800,
      artisanPayout: 4320,
      atelierFee: 480,
      status: 'SETTLED',
      utrRef: 'UPI/382910482910',
    },
    {
      id: 'TXN-9020',
      date: '21 Sep 2026',
      artwork: 'Artisan Terracotta Chai Kullhad Set (Pack of 6)',
      giTag: 'GI-JH-POTTERY-2023-0012',
      buyerCity: 'Mumbai, Maharashtra',
      orderTotal: 1250,
      artisanPayout: 1125,
      atelierFee: 125,
      status: 'SETTLED',
      utrRef: 'UPI/382019481928',
    },
    {
      id: 'TXN-9019',
      date: '18 Sep 2026',
      artwork: 'Dancing Peacocks of Parasnath Valley',
      giTag: 'GI-JH-SOHRAI-2020-0156',
      buyerCity: 'New Delhi, NCR',
      orderTotal: 3600,
      artisanPayout: 3240,
      atelierFee: 360,
      status: 'SETTLED',
      utrRef: 'UPI/381920391029',
    },
    {
      id: 'TXN-9018',
      date: '14 Sep 2026',
      artwork: 'Custom 12x8 ft Mud Mural Commission (Villa Courtyard)',
      giTag: 'GI-JH-SOHRAI-2020-MURAL',
      buyerCity: 'Ranchi, Jharkhand',
      orderTotal: 36480,
      artisanPayout: 32832,
      atelierFee: 3648,
      status: 'SETTLED',
      utrRef: 'RTGS/HDFC92019281',
    },
    {
      id: 'TXN-9017',
      date: '26 Sep 2026',
      artwork: 'Birsa Forest Natural Lac Painted Coasters',
      giTag: 'GI-JH-LAC-2023-0099',
      buyerCity: 'Hyderabad, Telangana',
      orderTotal: 950,
      artisanPayout: 855,
      atelierFee: 95,
      status: 'PROCESSING',
      utrRef: 'PENDING_DISPATCH',
    },
  ];

  const totalEarnings = 445000;
  const pendingAmount = 855;
  const settledAmount = totalEarnings - pendingAmount;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#193225] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Studio Console</span>
        </Link>

        {/* RBAC Role Gate Banner */}
        <RoleGateBanner 
          requiredRole="local"
          title="Artisan Direct Payout Ledger Restricted"
          description="Confidential direct bank settlement records and UPI UTR disbursement logs are restricted to verified indigenous artisans."
        >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D6]">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#193225]/30" />
              <span className="font-display text-[10px] text-[#193225] tracking-[0.24em] uppercase">
                90% Fair-Trade Direct Remuneration Protocol
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#1C1917] font-medium tracking-tight mt-1">
              Artisan Direct Disbursal Ledger
            </h1>
            <p className="text-xs text-[#5C554E]">
              Transparent accounting for Somra Hembrom • Linked UPI: <code className="text-[#193225] font-semibold font-mono">somra.hembrom@sbi</code>
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#FAF8F5] border border-[#E5E0D6] text-[#1C1917] text-xs font-medium transition flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-4 h-4 text-[#193225]" />
            <span>Download Statement (PDF)</span>
          </button>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
            <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E]">
              Total Lifetime 90% Earnings
            </span>
            <div className="text-2xl font-serif font-medium text-[#193225]">
              ₹{totalEarnings.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-[#5C554E]">
              Zero middlemen commissions deducted.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
            <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E]">
              Settled to Bank Account
            </span>
            <div className="text-2xl font-serif font-medium text-[#1C1917]">
              ₹{settledAmount.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-[#193225]">
              Direct UPI/NEFT transfers validated
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs space-y-1">
            <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E]">
              Pending Clearance (In Transit)
            </span>
            <div className="text-2xl font-serif font-medium text-[#193225]">
              ₹{pendingAmount.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-[#5C554E]">
              Disburses upon delivery confirmation
            </p>
          </div>
        </div>

        {/* 90/10 Split Formula Card */}
        <div className="p-5 bg-white rounded-xl border border-[#E5E0D6] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-0.5">
            <h4 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium">
              The 90/10 Cooperative Math:
            </h4>
            <p className="text-[#5C554E]">
              When a buyer purchases a ₹4,800 mural, <strong>₹4,320 (90%)</strong> is transferred directly to your bank account. The remaining <strong>₹480 (10%)</strong> pays for packaging, GI tags, and courier logistics by the Ramgarh team.
            </p>
          </div>
          <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs font-semibold text-[#1C1917] whitespace-nowrap">
            100% Price = 90% Artisan + 10% Studio
          </div>
        </div>

        {/* Disbursals Table */}
        <div className="bg-white rounded-xl border border-[#E5E0D6] shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-[#F2ECE3] flex justify-between items-center">
            <h3 className="font-serif text-lg font-medium text-[#1C1917]">
              Recent Disbursal Transactions
            </h3>
            <span className="text-xs text-[#5C554E]">
              Showing 5 recent orders
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-[#E5E0D6] text-[#5C554E] uppercase tracking-wider text-[10px] font-display">
                <tr>
                  <th className="py-3 px-4">Date & ID</th>
                  <th className="py-3 px-4">Artwork & GI Tag</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4 text-right">Order Price</th>
                  <th className="py-3 px-4 text-right text-[#193225] font-semibold">90% Payout</th>
                  <th className="py-3 px-4 text-right">10% Studio</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4">UTR Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE3]">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#FAF8F5] transition">
                    <td className="py-3 px-4">
                      <span className="font-semibold text-[#1C1917] block">{tx.date}</span>
                      <span className="text-[11px] text-[#8C8379]">{tx.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#1C1917] block">{tx.artwork}</span>
                      <span className="text-[11px] text-[#193225] font-mono">{tx.giTag}</span>
                    </td>
                    <td className="py-3 px-4 text-[#5C554E]">
                      {tx.buyerCity}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#1C1917]">
                      ₹{tx.orderTotal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-[#193225]">
                      ₹{tx.artisanPayout.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right text-[#5C554E]">
                      ₹{tx.atelierFee.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-display uppercase tracking-wider ${
                          tx.status === 'SETTLED'
                            ? 'bg-[#EBF3ED] text-[#193225] border border-[#D5E4D8]'
                            : 'bg-[#F5F2EB] text-[#5C5346] border border-[#D9D1C3]'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#5C554E] text-[11px] font-mono">
                      {tx.utrRef}
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
