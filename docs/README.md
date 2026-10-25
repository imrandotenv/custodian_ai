# 📚 Mitti Documentation Index & Hackathon Submission Guide

Welcome to the **Mitti Documentation Suite**. This directory contains the authoritative technical, architectural, and submission deliverables for **Mitti — Digital Sovereignty for Tribal Artisans**, submitted under **Hackathon Problem Statement P07**.

---

## 🧭 Master Navigation & Deliverables Index

| File | Primary Purpose | Intended Audience | Recommended Action |
| :--- | :--- | :--- | :--- |
| **[`SUBMISSION_PACKAGE.md`](./SUBMISSION_PACKAGE.md)** | **Master Consolidated Dossier**: Complete, unified compilation containing executive summary, Devfolio pitch text, YouTube description, Mermaid architecture diagrams, and verification commands. | Hackathon Judges, Evaluators, Reviewers, Team Leads | **Read first for a comprehensive single-document overview of the entire project.** |
| **[`DEVFOLIO_SUBMISSION.md`](./DEVFOLIO_SUBMISSION.md)** | **Devfolio Submission Markdown**: The 5 standard Devfolio pitch sections (*Inspiration, What it does, How we built it, Challenges, Accomplishments*) + Team Member Credits. | Hackathon Organizers, Devfolio Platform | Copy-paste sections 1–6 directly into the official Devfolio submission portal. |
| **[`YOUTUBE_DESCRIPTION.md`](./YOUTUBE_DESCRIPTION.md)** | **YouTube Video Metadata & Pitch Script**: High-converting YouTube description, exact 5-minute video chapters/timestamps, judging cheat sheet, and SEO tags. | Social Media Lead, Video Editors, Judges | Copy-paste the raw text code block directly into YouTube Studio's description field. |
| **[`ARCHITECTURE_FLOWCHART.md`](./ARCHITECTURE_FLOWCHART.md)** | **Technical Architecture & Flowcharts**: Complete Mermaid.js diagrams (System Flowchart, State Machine, Sequence Diagrams), 6-tier architectural deep dive, and CLI audit matrix. | System Architects, DevOps, Technical Judges | View in GitHub/VSCode markdown preview to inspect rendered Mermaid diagrams. |

---

## 🚀 How to Use These Deliverables

### 1. For Submitting to Devfolio
1. Open **[`DEVFOLIO_SUBMISSION.md`](./DEVFOLIO_SUBMISSION.md)** (or Part II of **[`SUBMISSION_PACKAGE.md`](./SUBMISSION_PACKAGE.md)**).
2. Copy each markdown section into the corresponding Devfolio portal fields:
   - **Inspiration**: Section 1
   - **What it does**: Section 2 (includes ASCII architectural diagram)
   - **How we built it**: Section 3 (tech stack matrix + 5 deep dives)
   - **Challenges we ran into**: Section 4 (4 core technical hurdles resolved)
   - **Accomplishments that we're proud of**: Section 5 (5 key milestones)
   - **Team Members & Credits**: Section 6 (credit table with technical roles)
3. Set GitHub URL to `https://github.com/imrandotenv/custodian_ai.git`.
4. Set Live Demo URL to `https://mitti-art.vercel.app`.

### 2. For Publishing the 5-Minute YouTube Pitch Video
1. Open **[`YOUTUBE_DESCRIPTION.md`](./YOUTUBE_DESCRIPTION.md)** (or Part III of **[`SUBMISSION_PACKAGE.md`](./SUBMISSION_PACKAGE.md)**).
2. Copy the entire raw text block inside Section 1.
3. Paste into the YouTube Studio video description editor.
4. Verify that the chapters appear as clickable links:
   - `0:00` — The Hook (The Crisis in Tribal Art)
   - `0:40` — UI & Smart Consent Demo (Blur-to-Unblur in Action)
   - `1:45` — Backend & Adi Karmayogi API (Edge Middleware & RBAC)
   - `3:00` — AI Correction Rights (Preserving Ol Chiki Dialects)
   - `4:00` — Business Impact & 90% Direct Escrow
5. Apply suggested metadata:
   - Title: `Mitti — Digital Sovereignty for Tribal Artisans | 5-Minute Hackathon Demo (P07)`
   - Category: `Science & Technology` / `Nonprofits & Activism`

### 3. For Technical Judging & Architecture Evaluation
1. Open **[`ARCHITECTURE_FLOWCHART.md`](./ARCHITECTURE_FLOWCHART.md)** (or Part IV of **[`SUBMISSION_PACKAGE.md`](./SUBMISSION_PACKAGE.md)**).
2. Render in GitHub Markdown or any Mermaid-compatible viewer to inspect:
   - **End-to-End System Flowchart**: 6 interconnected functional tiers with color-coded boundaries.
   - **Smart Consent State Machine**: Deterministic transitions between `LOCKED` (blur-22px), `PLEDGE_MODAL`, and `UNLOCKED` (blur-0px).
   - **Adi Karmayogi Sequence Flow**: Prefix evaluation (`MT-`/`NO-` vs `ST-`), encrypted cookie issuance, and Next.js Edge Middleware route guarding.
   - **90% Escrow Sequence Flow**: Transparent 90/10 math, simulated smart contract execution, UPI dispatch, and `canvas-confetti` receipt.

---

## 🧪 Quick Independent Verification Guide

To quickly verify that the application endpoints and edge security are active and functioning correctly:

```bash
# 1. Ping Adi Karmayogi Schema Specification (GET)
curl -s https://mitti-art.vercel.app/api/verify-karmayogi | jq .

# 2. Test Master Trainer ID Elevated Promotion (POST)
curl -s -X POST https://mitti-art.vercel.app/api/verify-karmayogi \
  -H "Content-Type: application/json" \
  -d '{"adiKarmayogiId":"MT-JH-2026-8812"}' | jq .

# 3. Test Invalid ID Rejection (POST)
curl -s -X POST https://mitti-art.vercel.app/api/verify-karmayogi \
  -H "Content-Type: application/json" \
  -d '{"adiKarmayogiId":"INVALID-FORMAT-999"}' | jq .

# 4. Test Edge Middleware Interception on /dashboard
curl -I https://mitti-art.vercel.app/dashboard --cookie "user_role=tourist"
# Expected: HTTP 307 Redirect to /explore
```

---

## 👥 Team Mitti Credits

| Member | Technical Role | Focus Area |
| :--- | :--- | :--- |
| **Imran** | **Lead Full-Stack** | Next.js 16 App Router, RBAC Edge Middleware, API Routes, Vercel CI/CD |
| **Waquar** | **AI/ML & Backend** | Hugging Face NLLB-200 Neural Pipeline, PostgreSQL, Prisma ORM 6.19 |
| **Binit** | **Product Strategy & Domain** | Problem Statement P07 Alignment, Pitch Strategy, 90% Escrow Model |
| **Abhinav** | **Frontend & UI/UX** | Smart Consent Framer Motion Blur Engine, Tailwind CSS v4, Web Audio API |
| **Satyam** | **Cloud DevOps & QA** | Vercel Build Hardening, Turbopack QA Validation, Device Responsiveness |

---

*Document generated by Submission Package Synthesizer (Agent 4) — Team Mitti 2026.*
