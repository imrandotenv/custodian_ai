'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MessageCircle, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#14281E] text-[#D8D2C9] pt-16 pb-12 border-t border-[#1E3A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#234533]">
          {/* Column 1: Brand & Origin Story */}
          <div className="space-y-4">
            <div>
              <span className="font-display tracking-[0.26em] text-2xl font-normal text-white uppercase block">
                MITTI
              </span>
              <p className="font-display text-[10px] text-[#A3B899] font-medium tracking-[0.2em] uppercase mt-1">
                Indigenous Crafts • Smart Consent Engine
              </p>
            </div>
            <p className="text-xs text-[#B5C2B0] leading-relaxed">
              Mitti is a sovereign cultural platform powered by the Smart Consent Engine. We protect indigenous tribal motifs against unauthorized AI extraction while ensuring <strong>90% direct bank remuneration</strong> to Santhal, Dokra, and Khovar master artisans.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#82B38F]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>GI Tag Certified (#JH-SOHRAI-2020)</span>
            </div>
          </div>

          {/* Column 2: Indigenous Heritage Arts */}
          <div className="space-y-3">
            <h4 className="font-display text-[10px] font-medium uppercase tracking-[0.2em] text-white border-b border-[#234533] pb-2">
              Traditional Craft Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-[#B5C2B0]">
              <li>
                <Link href="/shop?category=Sohrai+Murals" className="hover:text-white transition flex items-center justify-between">
                  <span>Sohrai Harvest Murals (GI)</span>
                  <span className="text-[10px] text-[#8DA085]">Hazaribagh</span>
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Khovar+Bridal+Art" className="hover:text-white transition flex items-center justify-between">
                  <span>Khovar Comb-Cut Bridal Art (GI)</span>
                  <span className="text-[10px] text-[#8DA085]">Barkagaon</span>
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Paitkar+Scroll+Art" className="hover:text-white transition flex items-center justify-between">
                  <span>Paitkar Ancient Scroll Paintings</span>
                  <span className="text-[10px] text-[#8DA085]">Amadubi</span>
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Jadopatia+Folklore" className="hover:text-white transition flex items-center justify-between">
                  <span>Jadopatia Santhali Folklore</span>
                  <span className="text-[10px] text-[#8DA085]">Dumka</span>
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Dokra+Bell+Metal" className="hover:text-white transition flex items-center justify-between">
                  <span>Lost-Wax Dokra Bell Metal</span>
                  <span className="text-[10px] text-[#8DA085]">East Singhbhum</span>
                </Link>
              </li>
              <li>
                <Link href="/#murals" className="hover:text-white transition flex items-center justify-between">
                  <span>Custom Wall Murals</span>
                  <span className="text-[10px] text-[#8DA085]">Homes & Living Spaces</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sovereign Protocol & Fair Math */}
          <div className="space-y-3">
            <h4 className="font-display text-[10px] font-medium uppercase tracking-[0.2em] text-white border-b border-[#234533] pb-2">
              Fair-Trade Sovereign Model
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5C2B0]">
              <li className="flex items-start gap-2">
                <span className="text-[#82B38F] font-bold">90%</span>
                <span>Direct payout directly into artisan bank accounts with zero middlemen deductions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A3B899] font-bold">Smart Consent</span>
                <span>Customary AI consent license (CC-TRIBAL-1.0) protecting sacred tribal motifs from scraping.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C4D7C2] font-bold font-mono">SHA-256</span>
                <span>Cryptographic provenance certificate for every physical canvas or artifact.</span>
              </li>
              <li className="pt-1">
                <Link 
                  href="/verify" 
                  className="inline-flex items-center gap-1 text-xs text-[#A3B899] hover:text-white underline font-medium"
                >
                  Verify Artwork Certificate <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Physical Studio & Contact */}
          <div className="space-y-3">
            <h4 className="font-display text-[10px] font-medium uppercase tracking-[0.2em] text-white border-b border-[#234533] pb-2">
              Ramgarh Cantt Atelier Hub
            </h4>
            <div className="space-y-2 text-xs text-[#B5C2B0]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#82B38F] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Mitti Central Atelier</strong><br />
                  Gola Road, Bazar Tand, Ramgarh Cantt,<br />
                  Jharkhand – 829122, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#82B38F] flex-shrink-0" />
                <span>WhatsApp: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#82B38F] flex-shrink-0" />
                <span>contact@mitti.in</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919876543210?text=Namaste%20Mitti!%20I%20would%20like%20to%20inquire%20about%20indigenous%20handicrafts."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#264A38] hover:bg-[#1E3A2B] text-white font-medium text-xs py-2 px-3 rounded-lg transition shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8DA085] gap-4">
          <p>
            © 2026 Mitti. Empowering Jharkhand Indigenous Artisans & Cultural Sovereignty.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition">About Mitti</Link>
            <Link href="/verify" className="hover:text-white transition">GI Tag Provenance</Link>
            <Link href="/trips" className="hover:text-white transition">Living Residencies</Link>
            <Link href="/contact" className="hover:text-white transition">Studio Location</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
