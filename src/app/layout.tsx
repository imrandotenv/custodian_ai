import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Marcellus, Inter } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/context/RoleContext";
import { CartProvider } from "@/context/CartContext";
import { AudioProvider } from "@/context/AudioContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import UpiPaymentModal from "@/components/UpiPaymentModal";
import FloatingAudioBar from "@/components/FloatingAudioBar";
import FloatingRoleDock from "@/components/FloatingRoleDock";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mitti | Sovereign Indigenous Arts & Smart Consent Engine",
  description: "Authentic indigenous tribal arts of Jharkhand directly from master Santhal and Dokra artisans. 90% direct artisan remuneration, GI Tag certification, and customary AI consent protection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${cormorant.variable} ${plusJakarta.variable} ${marcellus.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#1C1917] font-sans antialiased">
        <RoleProvider>
          <CartProvider>
            <AudioProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <UpiPaymentModal />
              <FloatingAudioBar />
              <FloatingRoleDock />
            </AudioProvider>
          </CartProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
