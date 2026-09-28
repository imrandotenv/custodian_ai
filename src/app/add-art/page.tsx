'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  CheckCircle, 
  Mic, 
  MicOff, 
  Lock, 
  ShieldCheck, 
  Layers, 
  ArrowLeft,
  Info
} from 'lucide-react';
import RoleGateBanner from '@/components/RoleGateBanner';

export default function AddArtPage() {
  const [title, setTitle] = useState('');
  const [hindiTitle, setHindiTitle] = useState('');
  const [category, setCategory] = useState('Sohrai Murals');
  const [price, setPrice] = useState<number>(3500);
  const [dimensions, setDimensions] = useState('30" x 20"');
  const [weight, setWeight] = useState('1.1 kg');
  const [selectedPigments, setSelectedPigments] = useState<string[]>([
    'Dudhimati (White Kaolin Clay)',
    'Lal Geru (Red Hematite Ochre)',
  ]);
  const [aiConsent, setAiConsent] = useState('CC-TRIBAL-1.0-STRICT (Zero AI Training / Absolute Protection)');
  const [loreText, setLoreText] = useState('');
  const [adiKarmayogiId, setAdiKarmayogiId] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSuccess, setRecordingSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedHash, setGeneratedHash] = useState('');

  const pigmentsList = [
    'Dudhimati (White Kaolin Clay)',
    'Charak Mati (Cream Alkaline Clay)',
    'Lal Geru (Red Hematite Ochre)',
    'Kala Mati / Manganese (Black Forest Clay)',
    'Pila Mati (Yellow Ochre)',
    'Dokra Bell Metal Brass (Lost Wax)',
  ];

  const artisanPayout = Math.round(price * 0.9);
  const logisticsFee = price - artisanPayout;

  const togglePigment = (p: string) => {
    setSelectedPigments((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleSimulateRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setRecordingSuccess(true);
        if (!loreText) {
          setLoreText('“Recorded oral tradition: The sacred bull horns painted with Lal Geru bring peace to the Chotanagpur forest fringes...”');
        }
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setGeneratedHash(mockHash);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#193225] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Studio Console</span>
        </Link>

        {/* Role Gating Wrapper */}
        <RoleGateBanner 
          requiredRole="local"
          title="Artwork Intake & GI Minting Restricted"
          description="Only verified indigenous master artisans of Ramgarh Cantt can intake new original artworks, declare soil pigments, and mint cryptographic GI hashes."
        >
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#193225]/30" />
            <span className="font-display text-[11px] text-[#193225] tracking-[0.24em] uppercase">
              Artisan Intake Console • Ramgarh Atelier
            </span>
            <div className="w-8 h-px bg-[#193225]/30" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1C1917] tracking-tight font-normal">
            Register New Craft & Mint Provenance Hash
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] max-w-lg mx-auto leading-relaxed">
            Bind your physical painting with natural earth pigment declarations, an oral folklore voice record, and customary AI consent rules.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-6">
            {/* Step 1: Craft Identity */}
            <div className="space-y-3">
              <h3 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium border-b border-[#F2ECE3] pb-2">
                1. Artwork Titles & Heritage Category
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#4A433D] block mb-1">
                    English / Catalog Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Forest Peacock of Parasnath"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#4A433D] block mb-1">
                    Hindi / Devanagari Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. पारसनाथ मयूर सोहराय चित्र"
                    value={hindiTitle}
                    onChange={(e) => setHindiTitle(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#4A433D] block mb-1">
                    Craft Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs focus:outline-none focus:border-[#193225] text-[#1C1917] font-medium"
                  >
                    <option value="Sohrai Murals">Sohrai Murals</option>
                    <option value="Khovar Bridal Art">Khovar Bridal Art</option>
                    <option value="Paitkar Scroll Art">Paitkar Scroll Art</option>
                    <option value="Jadopatia Folklore">Jadopatia Folklore</option>
                    <option value="Dokra Bell Metal">Dokra Bell Metal</option>
                    <option value="Hand-Painted Home Decor">Hand-Painted Home Decor</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#4A433D] block mb-1">
                    Dimensions *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder='e.g. 36" x 24"'
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#4A433D] block mb-1">
                    Weight *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1.2 kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Pricing & 90% Direct Formula */}
            <div className="space-y-3">
              <h3 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium border-b border-[#F2ECE3] pb-2">
                2. Price & 90% Direct Remuneration Formula
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="text-xs font-medium text-[#4A433D] block mb-1">
                    Catalog Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    min={500}
                    max={50000}
                    step={100}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-sm font-semibold text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-[#193225]">Your Direct Bank Payout (90%):</span>
                    <span className="font-semibold text-[#193225]">₹{artisanPayout.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#5C554E]">
                    <span>Ramgarh Studio Packaging (10%):</span>
                    <span>₹{logisticsFee.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Natural Clays */}
            <div className="space-y-3">
              <h3 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium border-b border-[#F2ECE3] pb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> 3. Soil Minerals & Forest Clays Declared
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {pigmentsList.map((pigment) => (
                  <label
                    key={pigment}
                    className={`p-3 rounded-lg border cursor-pointer transition flex items-center gap-2.5 ${
                      selectedPigments.includes(pigment)
                        ? 'bg-[#EBF3ED] border-[#193225] text-[#193225] font-medium'
                        : 'bg-[#FAF8F5] border-[#E5E0D6] text-[#4A433D] hover:bg-stone-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedPigments.includes(pigment)}
                      onChange={() => togglePigment(pigment)}
                      className="accent-[#193225]"
                    />
                    <span>{pigment}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4: Spoken Lore Recording */}
            <div className="space-y-3">
              <h3 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium border-b border-[#F2ECE3] pb-2">
                4. Oral Lore & Voice Preservation
              </h3>

              <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C1917]">
                      Record Spoken Folk Tale
                    </h4>
                    <p className="text-[11px] text-[#5C554E]">
                      Speak in Santhali, Mundari, Kudmali or Hindi.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateRecording}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                      isRecording
                        ? 'bg-red-600 text-white animate-pulse'
                        : recordingSuccess
                        ? 'bg-[#EBF3ED] text-[#193225] border border-[#D5E4D8]'
                        : 'bg-[#193225] text-white'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isRecording ? 'Recording Lore...' : recordingSuccess ? 'Lore Captured' : 'Record Audio Lore'}</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  placeholder="Transcript of the sacred folklore or oral song..."
                  value={loreText}
                  onChange={(e) => setLoreText(e.target.value)}
                  className="w-full p-2.5 bg-white rounded border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                />
              </div>
            </div>

            {/* Step 5: Customary AI Consent Protocol */}
            <div className="space-y-3">
              <h3 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium border-b border-[#F2ECE3] pb-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> 5. Customary Tribal AI Consent Rule
              </h3>

              <div className="space-y-2 text-xs">
                {[
                  {
                    id: 'CC-TRIBAL-1.0-STRICT (Zero AI Training / Absolute Protection)',
                    title: 'CC-TRIBAL-1.0-STRICT (Zero AI Training)',
                    desc: 'Zero permission to commercial generative AI scrapers. No image checkpoint training permitted.',
                  },
                  {
                    id: 'CC-TRIBAL-1.0-RESEARCH (Ethical Non-Profit Research Only with Santhali Attribution)',
                    title: 'CC-TRIBAL-1.0-RESEARCH (Ethical Research Only)',
                    desc: 'Academic linguistic and cultural researchers may catalog with strict Ol Chiki community attribution.',
                  },
                  {
                    id: 'CC-TRIBAL-1.0-ROYALTY (Commercial Training Allowed with 25% Community Heritage Royalty)',
                    title: 'CC-TRIBAL-1.0-ROYALTY (Commercial Royalty Pool)',
                    desc: 'Commercial models must pay 25% heritage royalties into the Ramgarh village skilling fund.',
                  },
                ].map((policy) => (
                  <label
                    key={policy.id}
                    className={`p-3 rounded-lg border cursor-pointer block transition ${
                      aiConsent === policy.id
                        ? 'bg-[#EBF3ED] border-[#193225] text-[#1C1917]'
                        : 'bg-[#FAF8F5] border-[#E5E0D6] text-[#4A433D] hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <input
                        type="radio"
                        name="aiConsent"
                        checked={aiConsent === policy.id}
                        onChange={() => setAiConsent(policy.id)}
                        className="accent-[#193225]"
                      />
                      <span>{policy.title}</span>
                    </div>
                    <p className="text-[11px] text-[#5C554E] mt-0.5 ml-5">
                      {policy.desc}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 6: Custodian Verification & Adi Karmayogi Govt. ID */}
            <div className="space-y-3">
              <h3 className="font-display text-[10px] tracking-[0.18em] uppercase text-[#193225] font-medium border-b border-[#F2ECE3] pb-2">
                6. Custodian Identity & Adi Karmayogi Verification
              </h3>

              <div className="p-4 bg-white rounded-lg border border-[#E5E0D6] space-y-2">
                <label 
                  htmlFor="adi-karmayogi-id" 
                  className="text-xs font-medium text-[#4A433D] block font-['Inter',sans-serif]"
                >
                  Adi Karmayogi Govt. ID (Optional)
                </label>
                <input
                  id="adi-karmayogi-id"
                  type="text"
                  placeholder="Enter 12-digit Adi Karmayogi or Tribal Welfare Portal ID"
                  value={adiKarmayogiId}
                  onChange={(e) => setAdiKarmayogiId(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#F9F6F0] border-0 border-b border-black/20 rounded-none text-xs text-[#1C1917] outline-none focus:outline-none focus:ring-0 focus:border-black placeholder:font-['Inter',sans-serif] font-['Inter',sans-serif] placeholder:text-stone-400 transition-colors"
                />
                <p className="text-[11px] text-[#736B63] mt-1.5 flex items-center gap-1.5 font-['Inter',sans-serif]">
                  <Info className="w-3.5 h-3.5 text-[#193225] flex-shrink-0" />
                  <span>Linking your Govt. ID fast-tracks platform verification and unlocks direct scheme benefits</span>
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-3 border-t border-[#F2ECE3]">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-2xs transition"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Publish Artwork & Mint Provenance Hash</span>
              </button>
            </div>
          </form>
        ) : (
          /* Submission Confirmation Card */
          <div className="bg-white rounded-xl p-6 sm:p-10 border border-[#193225] shadow-2xs text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#EBF3ED] text-[#193225] flex items-center justify-center mx-auto text-2xl border border-[#D5E4D8]">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="font-display text-[9px] uppercase tracking-[0.2em] bg-[#EBF3ED] text-[#193225] font-medium px-2.5 py-0.5 rounded border border-[#D5E4D8]">
                Artwork Registered & Sovereign Hash Minted
              </span>
              <h2 className="text-2xl font-serif text-[#1C1917] font-medium mt-1">
                &ldquo;{title}&rdquo; Published to Catalog
              </h2>
              <p className="text-xs text-[#5C554E] max-w-md mx-auto">
                Your craft is now live on the Mitti storefront. 90% direct payout is bound to your registered bank account.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] text-[#1C1917] rounded-lg border border-[#E5E0D6] text-left text-xs space-y-1">
              <div className="flex justify-between text-[#193225] font-medium">
                <span>Cryptographic SHA-256 Provenance Hash:</span>
                <span className="font-mono text-xs">STATUS: ACTIVE</span>
              </div>
              <p className="text-[11px] font-mono break-all bg-white p-2 rounded border border-[#E5E0D6]">
                {generatedHash}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Link
                href="/shop"
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs text-center transition shadow-2xs"
              >
                View in Storefront
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="py-2.5 px-4 rounded-lg bg-[#FAF8F5] text-[#1C1917] font-medium text-xs hover:bg-stone-200 border border-[#E5E0D6]"
              >
                Add Another Piece
              </button>
            </div>
          </div>
        )}
        </RoleGateBanner>
      </div>
    </div>
  );
}
