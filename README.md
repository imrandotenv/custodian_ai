# 🌿 Mitti

> ### **A Digitally Sovereign Ecosystem for Indigenous Art**
> *Bridging ancient Chota Nagpur tribal heritage with modern digital sovereignty, cryptographic provenance, and fair remuneration.*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6_(Turbopack)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Hugging Face](https://img.shields.io/badge/Hugging_Face-NLLB--200_(Simulated)-FFD21E?style=for-the-badge&logo=huggingface)](https://huggingface.co/)

---

## 📌 Problem Statement: P07 (Digital Sovereignty for Tribal Artisans)

Indigenous communities across India—especially the Santhal, Oraon, and Birhor clans of Jharkhand—hold ancient artistic traditions like **Sohrai harvest murals**, **Khovar bridal comb-cut art**, and **Dokra lost-wax metal casting**. However, modern digital commerce and generative AI have accelerated severe systemic challenges:

1. **Middleman Financial Exploitation**: Traditional aggregators and luxury marketplaces take upwards of **70–85%** of the retail artwork value, leaving master elders with meager daily wages.
2. **Unauthorized Generative AI Scraping**: Commercial AI crawlers scrape sacred motifs, ritual murals, and indigenous iconography without consent, cultural attribution, or community royalties.
3. **Absence of Provenance & False Authenticity**: Machine-printed factory replicas pass as genuine tribal art, diluting officially registered Geographical Indication (GI) certifications (`GI-JH-SOHRAI-2020`, `GI-JH-KHOVAR-2020`).
4. **Linguistic Marginalization**: Indigenous scripts like **Santhali Ol Chiki (`ᱚᱞ ᱪᱤᱠᱤ`)** and oral dialects are excluded from mainstream e-commerce interfaces and automated translation pipelines.

---

## 💡 Our Solution: The Mitti Ecosystem

**Mitti** is an end-to-end sovereign ecosystem that combines ethical e-commerce, cultural protection protocols, government-backed upskilling, and indigenous AI translation rights.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MITTI SOVEREIGN ARCHITECTURE                    │
├──────────────────────────────────┬─────────────────────────────────────┤
│      VISUAL & DISCOVERY LAYER    │      PROTOCOL & SOVEREIGNTY LAYER   │
│  • Authentic Earth Soil Palette  │  • Smart Consent Engine (Blur-Lock) │
│  • GI Certified Storefront       │  • Role-Based Access Control (RBAC) │
│  • Procedural Oral Lore Player   │  • 90% Direct Escrow Smart Checkout │
│  • Living Residencies (/trips)   │  • Adi Karmayogi Verification API   │
│  • Architectural Wall Estimator  │  • Hugging Face NLLB-200 AI Route   │
│  • Multi-Channel Disbursal       │  • Prisma PostgreSQL Seed Ledger    │
└──────────────────────────────────┴─────────────────────────────────────┘
```

---

## ✨ Core Features & Key Innovations

### 🛡️ 1. Smart Consent Engine (Blur-to-Unblur Protection)
- **Default Asset Shielding**: All sacred tribal artworks render with heavy backdrop blur (`blur-xl` / `backdrop-blur-md`) in the Complete Atelier Catalog.
- **Cultural Pledge Protocol**: Visitors must actively agree to customary protocols ("Take Digital Pledge") before viewing sacred ritual motifs and elder profiles.
- **Fluid Framer Motion Animation**: Unlocks smoothly with an animated fade-out of the blur barrier and staggered entrance of provenance details.
- **Anti-Scraping Defense**: Emits `CC-TRIBAL-1.0-STRICT` customary licenses to block autonomous AI image scrapers.

---

### 🇮🇳 2. Adi Karmayogi Mock API Integration (RBAC & Super-Custodians)
Integrated directly via Next.js App Router at `POST /api/verify-karmayogi`:
- **Master Trainers (`MT-`) & Nodal Officers (`NO-`)**: Automatically granted `SUPER_CUSTODIAN` platform status with privileged **AI Correction Rights** and institutional audit access.
- **Students (`ST-`)**: Authenticated as verified `CUSTODIAN` with access to listing tools and atelier dispatch.
- **Global RBAC Middleware**: Next.js Edge Middleware (`middleware.ts`) enforces strict route access based on persisted `user_role` cookies:
  - 🧭 **Tourist** (`/explore`) – Curated discovery, audio folklore, escrow purchasing.
  - 🎨 **Custodian** (`/dashboard`) – Artisan studio, upskilling progression, direct payouts.
  - 🛡️ **Admin** (`/admin`) – AI bot intercept monitoring, GI registry audit logs.

---

### 💰 3. 90% Direct Payout Escrow Model
Visualized transparently via the interactive [`EscrowCheckout.tsx`](file:///src/components/EscrowCheckout.tsx) component:
- **Transparent Mathematical Ledger**:
  - **Base Price**: `₹[price]`
  - **Artisan Direct Payout (90%)**: `₹[price * 0.9]` *(prominently highlighted in emerald green with direct bank/UPI routing)*.
  - **Mitti Platform Escrow Fee (10%)**: `₹[price * 0.1]` *(covers insured transit, framing, and GI verification)*.
- **Framer Motion Escrow Animation**:
  - Clicking **`Process Secure Escrow Payment`** triggers a 1-second simulated smart contract state.
  - Resolves into a verified success state confirming:
    > *"Payment Escrowed. 90% routed directly to Artisan's verified bank account."*

---

### 🤖 4. AI Translation & Indigenous Correction Rights
Simulated Hugging Face **NLLB-200 (*No Language Left Behind*)** endpoint at `POST /api/translate`:
- **Bidirectional Dialect Translation**: Seamlessly translates between **English** and indigenous **Santhali in Ol Chiki script (`ᱚᱞ ᱪᱤᱠᱤ`)**.
- **Interactive UI Integration**: Located in [`OralLoreModal.tsx`](file:///src/components/OralLoreModal.tsx) with a sleek `"Translate with Hugging Face AI"` toggle button, Framer Motion shimmer overlay, progress indicators, and smooth `<AnimatePresence>` text transitions.
- **Correction Rights**: Master Custodians retain sovereign editorial authority over AI-generated translations to prevent distortion of sacred oral traditions.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | **Next.js 16.3.6** (App Router, Turbopack, React 19 Server/Client Components) |
| **Styling & Design System** | **Tailwind CSS v4**, Awwwards-inspired Warm Sand (`#FAF8F5`) & Deep Charcoal palette |
| **Motion & Interactivity** | **Framer Motion 13**, Canvas Confetti |
| **Icons & Media** | **Lucide React**, Web Audio Context API (Authentic Flute & Voice Recordings) |
| **Database & ORM** | **PostgreSQL**, **Prisma ORM 6.19** with custom seeder (`prisma/seed.ts`) |
| **AI Translation Engine** | **Hugging Face NLLB-200** (Simulated Endpoint at `/api/translate`) |
| **Deployment & CI/CD** | **Vercel** with custom build bypass optimizations (`next.config.mjs`) |

---

## 🗺️ Application Route Map

| Path | Interface | Purpose |
| :--- | :--- | :--- |
| `/` | **Landing Showcase** | Smart Consent Catalog, 6 Craft Disciplines, 15 Master Elders, Mural Visualizer |
| `/explore` | **Tourist Portal** | Curated collections, audio lore player, and direct artisan acquisition |
| `/shop` | **Atelier Catalog** | Natural soil pigment filters (Dudhimati, Lal Geru, Kala Mati), price slider, quick view |
| `/dashboard` | **Custodian Console** | Reservation management, Adi Karmayogi upskilling modules & platform privileges |
| `/admin` | **Superintendent Console** | AI scraper firewall intercepts, GI registry queue, SHA-256 audit logs |
| `/verify` | **Provenance Engine** | Real-time GI Tag lookup (`#JH-SOHRAI-2020`) and cryptographic SHA-256 validation |
| `/trips` | **Living Residencies** | Mud mural workshops and cultural homestays across Hazaribagh & Amadubi |
| `/add-art` | **Artwork Intake** | Soil pigment declaration, voice lore recorder, and customary license builder |
| `/earnings` | **90% Payout Ledger** | Direct bank disbursal records, UTR tracking, and financial statements |
| `/api/verify-karmayogi` | **Route Handler** | Adi Karmayogi government ID authentication (`MT-`, `NO-`, `ST-`) |
| `/api/translate` | **Route Handler** | Hugging Face NLLB-200 Santhali Ol Chiki ↔ English translation |

---

## 💻 Local Setup & Development

Follow these steps to run the complete Mitti platform on your local machine:

### 1. Clone Repository
```bash
git clone https://github.com/imrandotenv/custodian_ai.git
cd custodian_ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a local `.env` file from our template:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mitti_db?schema=public"
NODE_ENV="development"
```

### 4. Setup Prisma Database & Seed Mock Data
Generate the Prisma Client and seed the database with RBAC users and Smart Consent protected cultural assets:
```bash
# Generate Prisma Client
npx prisma generate

# Seed Database (or run in mock dry-run mode if PostgreSQL is offline)
npm run db:seed
```

### 5. Launch Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 6. Production Build Check
```bash
npm run build
npm run start
```

---

## 👥 The Mitti Team

| Member | Hackathon Role | Primary Contributions |
| :--- | :--- | :--- |
| **Imran** | **Lead Full-Stack & System Engineer** | Next.js 16 App Router architecture, RBAC middleware, API Route Handlers (`/verify-karmayogi`, `/translate`), Git & Vercel deployment pipeline. |
| **Waquar** | **AI/ML & Backend Architect** | Hugging Face NLLB-200 model translation contract, Prisma PostgreSQL schema design, and mock database seeder. |
| **Binit** | **Product Strategy & Domain Lead** | Pitch lead, Adi Karmayogi framework alignment, P07 problem statement, and 90% direct escrow economic model. |
| **Abhinav** | **Frontend & Creative UI/UX Engineer** | Smart Consent Engine animations, Framer Motion transitions, Awwwards aesthetic design system, and audio lore integration. |
| **Satyam** | **Cloud DevOps & QA Engineer** | Vercel build bypass configurations, test suite validation, cross-browser responsive testing, and performance optimization. |

---

## 📜 Cultural Licensing & Ethical Attribution

- **Software Code**: Licensed under the [MIT License](LICENSE).
- **Indigenous Intellectual Property**: All cultural motifs, oral folklore excerpts, and tribal symbols are protected under the **Customary Sovereign Protocol (`CC-TRIBAL-1.0-STRICT`)**. Commercial AI web scraping, model training, and unauthorized image mining are strictly prohibited without explicit community custodian consent.

---

<div align="center">
  <sub>Built with pride for indigenous cultural sovereignty • Mitti © 2026</sub>
</div>
