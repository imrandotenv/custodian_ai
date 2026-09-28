'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'Custom Wall Mural Commission',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiryUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Namaste Mitti!\n\nI am contacting from the website:\n- Name: ${formData.name || 'Art Patron'}\n- Phone: ${formData.phone || 'N/A'}\n- Purpose: ${formData.purpose}\n- Query: ${formData.message || 'I would like to connect with the atelier.'}`
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#193225]/30" />
            <span className="font-display text-[11px] text-[#193225] tracking-[0.24em] uppercase">
              Direct Contact • Sovereign Atelier Hub
            </span>
            <div className="w-8 h-px bg-[#193225]/30" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#1C1917] tracking-tight font-normal">
            Connect with Mitti
          </h1>
          <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
            Visit our central atelier, commission bespoke murals for your architectural project, or communicate directly with our master artisan guild.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Physical Details & Direct WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-lg bg-[#193225] text-[#FAF8F5] flex items-center justify-center font-display text-sm tracking-widest shadow-2xs">
                  MI
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                    Mitti Central Atelier
                  </h3>
                  <p className="font-display text-[10px] tracking-[0.16em] uppercase text-[#193225]/80">
                    Sovereign Arts Collective
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-[#4A433D]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1C1917]">Physical Atelier Address:</strong>
                    <span>Gola Road, Bazar Tand, Ramgarh Cantt, Jharkhand – 829122, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1C1917]">Telephone & WhatsApp Dispatch:</strong>
                    <span className="font-semibold text-[#193225] text-sm">+91 98765 43210</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1C1917]">Official Inquiries:</strong>
                    <span>contact@mitti.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#193225] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1C1917]">Visiting Hours:</strong>
                    <span>Monday to Saturday: 9:30 AM – 6:30 PM (Prior notice requested)</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919876543210?text=Namaste%20Mitti!%20I%20am%20interested%20in%20visiting%20the%20atelier%20or%20purchasing%20handicrafts."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] border border-[#E5E0D6] font-medium text-xs flex items-center justify-center gap-2 shadow-2xs transition"
                >
                  <MessageCircle className="w-4 h-4 text-[#193225]" />
                  <span>Chat on WhatsApp (+91 98765 43210)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E5E0D6] shadow-2xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-normal text-[#1C1917]">
                  Send a Direct Commission Request
                </h3>
                <p className="text-xs text-[#5C554E]">
                  For bespoke wall murals, collector inquiries, or corporate cultural gifting.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433D] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433D] mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A433D] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="patron@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A433D] mb-1">
                      Inquiry Purpose
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225] font-medium"
                    >
                      <option>Custom Wall Mural Commission</option>
                      <option>Original Painting Purchase</option>
                      <option>Corporate Gifting / Bulk Decor</option>
                      <option>Living Atelier Village Residency</option>
                      <option>Artisan Partnership / Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A433D] mb-1">
                    Your Message / Wall Dimensions / Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your wall size, room type, or specific tribal craft you'd like to commission..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6] text-xs text-[#1C1917] focus:outline-none focus:border-[#193225]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-lg bg-[#193225] hover:bg-[#12241A] text-white font-medium text-xs transition shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-lg bg-[#FAF8F5] hover:bg-[#EBF3ED] text-[#193225] border border-[#E5E0D6] font-medium text-xs flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#193225]" />
                    <span>Send directly on WhatsApp</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-[#193225] mx-auto" />
                <h3 className="font-serif text-2xl font-normal text-[#1C1917]">
                  Inquiry Received
                </h3>
                <p className="text-xs text-[#5C554E] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our atelier team will review your inquiry and reach out via WhatsApp / telephone shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#193225] hover:underline font-semibold"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
