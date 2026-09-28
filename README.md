# 🌿 Mitti × Custodian AI
> **"Sovereign Cultural E-Commerce, Smart Consent Engine & Digital Sovereignty for Indigenous Artisans."**  
> *Ramgarh Cantt Atelier Hub • Chota Nagpur Plateau, Jharkhand*  
> Repository: [https://github.com/imrandotenv/custodian_ai](https://github.com/imrandotenv/custodian_ai)

---

## 🌍 1. Overview & Dual-Engine Architecture

**Mitti × Custodian AI** is a decentralized sovereign cultural platform designed to solve the two existential challenges facing indigenous tribal arts:
1. **Middleman Financial Exploitation** – where traditional artisans receive barely 10–15% of the artwork's retail value.
2. **Unauthorized Generative AI Scraping** – where autonomous bots and commercial models scrape sacred motifs, heritage symbols, and tribal intellectual property without consent or community royalties.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   MITTI SOVEREIGN PLATFORM ARCHITECTURE                │
├──────────────────────────────────┬─────────────────────────────────────┤
│   FRONTEND LAYER (Mitti Atelier) │ PROTOCOL & RBAC (Custodian AI)      │
│  • Authentic Soil-Based Visuals  │ • Smart Consent Engine (Blur-Lock)  │
│  • GI Certified Storefront       │ • Next.js Cookie-Backed Middleware  │
│  • Wall Mural Cost Estimator     │ • 3 Personas: Tourist/Custodian/Adm │
│  • Oral Lore Audio Player        │ • 90% Direct Disbursal Ledger       │
│  • WhatsApp & UPI Settlement     │ • Govt. Verified (Adi Karmayogi)    │
│  • Living Residencies (/trips)   │ • SHA-256 Provenance Ledger         │
└──────────────────────────────────┴─────────────────────────────────────┘
```

---

## 🔒 2. Key Innovations

### 🛡️ Smart Consent Engine (Protocol 4(a))
- **Default Visual Protection**: All sacred tribal artworks render with heavy backdrop blur (`blur-lg` / `backdrop-blur-md`) in the Complete Atelier Catalog.
- **Interactive Pledge Protocol**: Visitors must take the digital community pledge before sacred motifs are revealed.
- **Dynamic Framer Motion Animation**: Unlocks with smooth 500ms blur fade-out upon clicking "Take Pledge to View", with re-lock capability for reviewers.
- **Anti-Scraping Defense**: Emits `CC-TRIBAL-1.0-STRICT` metadata blocking autonomous AI web scrapers.

### 👥 Strict Role-Based Access Control (RBAC)
Managed globally via `RoleContext.tsx`, persisted synchronously in client-side cookies (`user_role`), and strictly enforced at the edge via `middleware.ts`:

| Role | Landing / Dedicated Path | Guarded Permissions & Capabilities |
| :--- | :--- | :--- |
| **🧭 Tourist** | `/explore` | Curated storefront, soil pigment chemistry, oral lore audio player, WhatsApp & UPI acquisitions, wall mural visualizer. Restricted from custodian studio. |
| **🎨 Custodian** | `/dashboard` | Master Artisan Console, artwork intake (`/add-art`), 90% direct payout ledger (`/earnings`), Adi Karmayogi upskilling progression & privileges. |
| **🛡️ Admin** | `/admin` | Platform Superintendent clearance, SHA-256 audit log inspection, AI scraper firewall intercepts, and GI registry verification. |

### 🇮🇳 Adi Karmayogi Government Verification
- **Verified Micro-Badges**: Artisan profiles and artwork cards display an authenticated `'Govt Verified (Adi Karmayogi)'` badge in trusted government green with interactive tooltip.
- **Upskilling & Digital Literacy**: Custodian dashboard tracks progress through Govt. of India Adi Karmayogi modules ("Digital Literacy", "E-Commerce Basics", "Financial Literacy"), unlocking privileges such as Priority Tourist Placement and International Logistics.
- **Direct Portal Link**: Fast-track integration with official tribal welfare portals.

### 💰 90% Direct Remuneration Model
- Transparent public ledger: **90%** of every transaction goes straight into the indigenous artisan's bank account.
- The remaining **10%** strictly pays for eco-packaging, GI tag provenance seals, and logistics.

### 📜 Cryptographic GI Provenance & SHA-256 Fingerprinting
- Authenticated under Geographical Indications Registry (`#JH-SOHRAI-2020`, `#JH-KHOVAR-2020`).
- Every artwork is minted with a SHA-256 cryptographic provenance hash verifiable in real-time on `/verify`.

---

## 📱 3. Application Route Map

| Route | Functionality |
| :--- | :--- |
| `/` | **Landing Page**: Smart Consent Catalog, 6 Indigenous Craft disciplines, 15 Master Elders, Living Ateliers map, Mural visualizer |
| `/explore` | **Tourist Discovery Portal**: Curated cultural collections, lore audio, and direct acquisition |
| `/shop` | **Atelier Storefront**: Natural soil pigment filters (Dudhimati, Lal Geru, Kala Mati), price slider, quick view |
| `/dashboard` | **Custodian Studio**: Piece reservations, catalog management, Adi Karmayogi upskilling & privileges |
| `/admin` | **Superintendent Console**: Live AI bot intercepts, GI verification queue, SHA-256 ledger integrity |
| `/verify` | **Provenance Engine**: Real-time GI Tag lookup and SHA-256 hash certification |
| `/trips` | **Living Residencies**: Mud mural workshops across Ramgarh, Hazaribagh, and Amadubi |
| `/add-art` | **Intake Artwork**: Soil pigment declaration, voice lore recorder, and customary license builder |
| `/earnings` | **90% Payout Ledger**: Direct bank transfer records, UTR tracking, and financial statements |
| `/about` | **Story of Mitti**: Soil pigment chemistry, community matriarchs, and sovereign philosophy |
| `/contact` | **Atelier Hub**: Gola Road, Bazar Tand, Ramgarh Cantt dispatch & WhatsApp hotline |

---

## 🎨 4. Traditional Craft Disciplines

1. **Sohrai Murals** (`GI-JH-SOHRAI-2020`): Winter harvest celebration art painted using Lal Geru (hematite), Dudhimati (kaolin), and river silt.
2. **Khovar Bridal Art** (`GI-JH-KHOVAR-2020`): Comb-cut nuptial murals scraped through white kaolin clay onto black manganese foundations.
3. **Paitkar Scroll Art**: Ancient narrative scrolls of Amadubi singing the Santhal creation myth of Pilchu Haram & Pilchu Burhi.
4. **Jadopatia Folklore**: Sacred ancestor scrolls and Chakshudana (vision-giving) ritual art from Santhal Pargana & Dumka.
5. **Dokra Bell Metal**: 4,000-year-old lost-wax (*Cire Perdue*) bronze brass casting of tribal musicians and ceremonial elephants.
6. **Hand-Painted Everyday Living**: Damodar riverbed terracotta chai kullhad sets, salvaged Sal-wood trays, and Sabai grass acoustic plates.

---

## 🛠️ 5. Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Server & Client Components)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom Awwwards-inspired palette (`#F9F6F0` Warm Sand, `#1C1917` Deep Charcoal, `#849A89` Sage, `#C25934` Terracotta)
- **Animations**: Framer Motion (staggered entrance, consent blur reveals, hover scales)
- **Icons**: Lucide React
- **Audio Engine**: Custom HTML5 Web Audio Context for procedural drone and authentic oral recordings

---

## 🚀 6. Getting Started Locally

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/imrandotenv/custodian_ai.git

# 2. Enter project folder
cd custodian_ai

# 3. Install dependencies
npm install

# 4. Start Next.js development server
npm run dev

# 5. Open in browser
http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```

---

## 📄 7. License & Cultural Attribution

- **Software Code**: Licensed under the MIT License.
- **Indigenous Cultural Assets**: Governed by the **Cultural AI Consent Protocol (`CC-TRIBAL-1.0-STRICT`)**. Commercial AI web scraping, model training, and unauthorized image mining are strictly prohibited without explicit sovereign community consent.

© 2026 Mitti. Empowering Jharkhand Indigenous Artisans & Cultural Sovereignty.
