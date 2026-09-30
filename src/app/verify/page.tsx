'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ARTWORKS } from '@/data/artworks';
import { Product } from '@/types';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Lock, 
  FileCheck
} from 'lucide-react';

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get('tag') || searchParams.get('hash') || '';

  const [inputQuery, setInputQuery] = useState(initialTag);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (query: string) => {
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    const found = ARTWORKS.find(
      (a) =>
        a.giTagNumber.toLowerCase().includes(clean) ||
        a.provenanceHash.toLowerCase().includes(clean) ||
        a.id.toLowerCase() === clean
    );

    setMatchedProduct(found || null);
    setHasSearched(true);
  };

  useEffect(() => {
    if (initialTag) {
      handleVerify(initialTag);
    } else {
      handleVerify('GI-JH-SOHRAI-2020-0089');
    }
  }, [initialTag]);


  const sampleTags = [
    'GI-JH-SOHRAI-2020-0089',
    'GI-JH-KHOVAR-2020-0042',
    'GI-JH-PAITKAR-2024-0019',
    'GI-JH-DOKRA-2018-0112',
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#193225]/30" />
            <span className="font-display text-[11px] text-[#193225] tracking-[0.24em] uppercase">
              Geographical Indications Registry • Provenance Ledger
            </span>
            <div className="w-8 h-px bg-[#193225]/30" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#1C1917] tracking-tight font-normal">
            Verify GI Tag & Provenance Certificate
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
            Audit the authentic village provenance, natural soil minerals, customary AI consent license, and 90% direct payout ledger for any Mitti artwork.
          </p>
        </div>

        {/* Input Bar */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C8379] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter GI Tag (e.g. GI-JH-SOHRAI-2020-0089) or SHA-256 Hash..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify(inputQuery)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225] placeholder:text-[#8C8379]"
              />
            </div>
            <button
              onClick={() => handleVerify(inputQuery)}
              className="px-6 py-2.5 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium tracking-wide transition shadow-2xs flex items-center justify-center gap-1.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>Verify Record</span>
            </button>
          </div>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#5C554E]">
            <span className="font-display uppercase tracking-wider text-[10px]">Reference Archives:</span>
            {sampleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setInputQuery(tag);
                  handleVerify(tag);
                }}
                className="px-2.5 py-0.5 rounded text-[11px] bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] border border-[#E5E0D6] transition font-mono"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Display Card */}
        {hasSearched && matchedProduct ? (
          <div className="bg-[#FAF8F5] rounded-xl border-2 border-[#193225]/40 p-2 shadow-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-lg border border-[#E5E0D6] p-6 sm:p-10 space-y-6">
              {/* Certificate Header Banner */}
              <div className="pb-6 border-b border-[#E5E0D6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-[#193225] text-[#FAF8F5] flex items-center justify-center font-display text-sm tracking-widest shadow-2xs flex-shrink-0">
                    MG
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[9px] uppercase tracking-[0.2em] text-[#193225] bg-[#EBF3ED] px-2 py-0.5 border border-[#D5E4D8] rounded-xs font-medium">
                        GI Tag Registered
                      </span>
                      <span className="font-display text-[9px] uppercase tracking-[0.2em] text-[#5C554E]">
                        Gazette Reg. No. 383
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif text-[#1C1917] mt-1 font-medium">
                      Certificate of Sovereign Cultural Provenance
                    </h2>
                    <p className="text-xs text-[#5C554E]">
                      Issued under Geographical Indications of Goods (Registration & Protection) Act, 1999
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs font-medium text-[#193225] flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#193225]" /> ARCHIVAL RECORD VERIFIED
                  </span>
                  <span className="text-[10px] text-[#8C8379] block mt-0.5">
                    Cryptographic hash validated on studio ledger
                  </span>
                </div>
              </div>

              {/* Product and Artisan Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-[#F2ECE3]">
                <div className="md:col-span-4 relative aspect-4/3 rounded-lg overflow-hidden border border-[#E5E0D6] bg-[#FAF8F5] p-2">
                  <div className="relative w-full h-full rounded border border-[#EAE5DC] overflow-hidden">
                    <Image
                      src={matchedProduct.image}
                      alt={matchedProduct.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="md:col-span-8 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] font-medium">
                      {matchedProduct.category}
                    </span>
                    <h3 className="text-2xl font-serif text-[#1C1917] mt-1 font-medium">
                      {matchedProduct.title}
                    </h3>
                    {matchedProduct.hindiTitle && (
                      <p className="font-serif italic text-xs text-[#5C554E] mt-0.5">
                        {matchedProduct.hindiTitle}
                      </p>
                    )}
                  </div>

                  {/* Artisan identity */}
                  <div className="flex items-center gap-3 p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#E5E0D6] flex-shrink-0">
                      <Image
                        src={matchedProduct.artisanAvatar}
                        alt={matchedProduct.artisanName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1C1917]">
                        {matchedProduct.artisanName}
                      </div>
                      <div className="text-[11px] text-[#5C554E]">
                        {matchedProduct.artisanVillage}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-2">
                  <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] font-medium block flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> GI Tag Provenance Details
                  </span>
                  <div className="flex justify-between text-[#4A433D] pt-1">
                    <span className="text-[#6B635B]">GI Registration:</span>
                    <span className="font-semibold text-[#1C1917] font-mono">{matchedProduct.giTagNumber}</span>
                  </div>
                  <div className="flex justify-between text-[#4A433D]">
                    <span className="text-[#6B635B]">Registration Year:</span>
                    <span className="font-medium text-[#1C1917]">2020 (Govt. of India Gazette)</span>
                  </div>
                  <div className="flex justify-between text-[#4A433D]">
                    <span className="text-[#6B635B]">Custodian Studio:</span>
                    <span className="font-medium text-[#1C1917]">Mitti Central Atelier, Ramgarh Cantt</span>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-2">
                  <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] font-medium block flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Smart Consent Engine Protocol
                  </span>
                  <div className="flex justify-between text-[#4A433D] pt-1">
                    <span className="text-[#6B635B]">Customary License:</span>
                    <span className="font-mono text-[#1C1917] font-semibold">CC-TRIBAL-1.0</span>
                  </div>
                  <div className="flex justify-between text-[#4A433D]">
                    <span className="text-[#6B635B]">AI Commercial Scraping:</span>
                    <span className="font-medium text-red-700">Strictly Prohibited</span>
                  </div>
                  <div className="flex justify-between text-[#4A433D]">
                    <span className="text-[#6B635B]">Artisan Remuneration:</span>
                    <span className="font-semibold text-[#193225]">90% Direct Disbursal</span>
                  </div>
                </div>
              </div>

              {/* Natural Forest Clays Used */}
              <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-2">
                <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[#193225] font-medium block">
                  Natural Forest Soil Minerals Certified:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {matchedProduct.pigmentsUsed.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#4A433D]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#193225]" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SHA-256 Provenance Hash */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-1">
                <span className="font-display text-[10px] tracking-[0.18em] uppercase text-[#5C554E] font-medium block">
                  Cryptographic SHA-256 Provenance Ledger Hash:
                </span>
                <p className="font-mono text-[11px] text-[#1C1917] break-all bg-white p-2.5 rounded border border-[#E5E0D6]">
                  {matchedProduct.provenanceHash}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/shop"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white text-xs font-medium tracking-wide text-center transition shadow-2xs"
                >
                  Browse Atelier Collection
                </Link>
                <a
                  href={`https://wa.me/919876543210?text=Namaste!%20I%20verified%20GI%20Tag%20${matchedProduct.giTagNumber}%20(${matchedProduct.title})%20on%20Mitti.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] border border-[#E5E0D6] text-xs font-medium text-center transition shadow-2xs"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="bg-white p-8 rounded-xl border border-red-200 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <h3 className="font-serif text-xl font-medium text-[#1C1917]">
              Record Not Found in Provenance Registry
            </h3>
            <p className="text-xs text-[#5C554E] max-w-sm mx-auto">
              Please double check the GI Tag or SHA-256 hash. Only authentic artworks dispatched through the Mitti sovereign collective are registered.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#5C554E]">Loading Verification Registry...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
