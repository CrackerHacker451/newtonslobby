# Newton's Lobby — The Campus Operating System & AI Trust Layer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-newtonslobby.web.app-06B6D4?style=for-the-badge&logo=firebase)](https://newtonslobby-3c54c.web.app)
[![Firebase](https://img.shields.io/badge/Hosting-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://uni-link-b7f2c.web.app)
[![Web3](https://img.shields.io/badge/Trust%20Layer-World%20ID%204.0%20%7C%200G%20AI-8B5CF6?style=for-the-badge)](https://newtonslobby-3c54c.web.app)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

> **Newton's Lobby** is an ultra-modern, zero-latency campus operating system and AI trust layer for university students and collegiate builders. It unifies decentralized identity, zero-knowledge peer verification, WebRTC peer networking, decaying decentralized study vaults, and an AI-powered hackathon radar into a cohesive dark glassmorphism web platform.

---

## 🌟 Live Deployments

- **Production Primary**: [https://newtonslobby-3c54c.web.app](https://newtonslobby-3c54c.web.app) / [https://www.newtonslobby.com](https://www.newtonslobby.com)
- **Production Mirror**: [https://uni-link-b7f2c.web.app](https://uni-link-b7f2c.web.app)

---

## ⚡ Core Architecture & Key Modules

### 1. Instant Unified Authentication & Micro-Economy
- **0ms Onboarding**: Sign in with Google OAuth or Newton Instant Builder Login without loading freezes.
- **UniCoins Cap**: Native campus balance strictly capped at `5,000` UniCoins max to prevent inflationary abuse.
- **Profile Synchronization**: Real-time Firestore sync of student branches, avatar, and peer reputation badges.

### 2. DareDrop Arena & 30-Minute Midnight Rotations
- **Campus Dares**: 6 auto-rotating campus challenges (NPC Challenge, Developer Reaction, $10M Raise Dance, ETHGlobal Meme, Startup Pitch, Cross-College Dev Connect).
- **0G Private Computer AI Verification**: Automated computer vision & audio verification awarding +25 UniCoins automatically upon proof inspection.
- **Public Streaming Storage**: Media stream uploads backed by Firebase Storage HTTPS pipelines.

### 3. SpeedLink 1080p WebRTC Matchmaking
- **KStream ⚡ Mesh**: 1080p 30 FPS peer-to-peer WebRTC video networking with ephemeral signaling.
- **Active Heartbeat Filtering**: 30-second stale heartbeat eviction ensuring students only connect with live campus peers.

### 4. Campus Study Vault (Arkiv DB-Chain & Swarm)
- **Decaying On-Chain Metadata**: Indexed via `@arkiv-network/sdk` with strict 30-day auto-expirations (`ExpirationTime.fromDays(30)`).
- **Client-Side PDF Compiler**: Native ISO 32000-1 (PDF-1.4) binary PDF synthesizer for one-click downloading, in-modal preview, and local printing.
- **Decentralized Blob Storage**: Heavy document attachments encrypted via AES-256 and routed to Swarm decentralized blobs (`bzz://...`).

### 5. Projects & Hackathons Hub
- **AI Scout & 4-Way Multi-Dimensional Filtering**: Search across 20 marquee upcoming hackathons (ETHGlobal, SIH, ICPC, Colosseum Solana, Google Gemini, HackTU, Hack Odisha) by Domain (`Algo`, `AI`, `Gov`, `Cyber`, `Web3`, `Space`), Region (`India`, `Global`), and Mode (`In-Person`, `Online`).
- **AI Dossiers & Rubrics**: Evaluation criteria, required archetypes, and prototype blueprints for every competition.
- **1-Click Squad Formation**: Deploy student squads directly into project teams.

### 6. UniAI Study Copilot
- 24/7 AI tutor for step-by-step calculus derivation, code debugging, and handwritten lecture note summarization with exportable PDF study briefs.

### 7. World ID 4.0 Proportional Trust Engine
- **Sybil Resistance**: Proof of Human (ID 1) for Day 7 streak claims (+150 UniCoins), Selfie Check (ID 11) for team liveness, and Passport NFC verification (ID 9303).
- **Zero-Knowledge Gate**: Backend SHA-256 nullifier verification preventing duplicate account claims.

---

## 🎨 Design System

- **Aesthetic**: Ultra-modern Dark Glassmorphism with 120Hz smooth animations.
- **Background**: `#0D1117` (Deep Space Obsidian)
- **Cards**: `rgba(22, 27, 34, 0.75)` with `backdrop-filter: blur(16px)`
- **Cyber Accents**:
  - Cyber Cyan: `#06B6D4`
  - Neon Emerald: `#10B981`
  - Purple Aura: `#8B5CF6`
  - Pink Gold: `#EC4899`
- **Borders**: `1px solid rgba(255, 255, 255, 0.12)`

---

## 📁 Repository Structure

```
.
├── index.html                  # Main dark glassmorphism SPA platform
├── app.js                      # Core Web3, WebRTC, Vault & Arena runtime
├── style.css                   # Glassmorphic cyber design system
├── netlify.toml                # Netlify deployment configuration
├── firebase.json               # Firebase Hosting & rewrite routing
├── firestore.rules             # Database security rules
├── database.rules.json         # Realtime database rules
├── real_data_constants.js      # Seed databases and curriculum constants
├── server/
│   ├── package.json            # Serverless backend dependencies
│   ├── gate.js                 # World ID 4.0 nullifier & auth verifier
│   └── netlify/functions/
│       └── api.mjs             # Express API & peer heartbeat coordinator
└── README.md
```

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CrackerHacker451/newtonslobby.git
   cd newtonslobby
   ```

2. **Serve locally**:
   ```bash
   # Using Python 3
   python3 -m http.server 8080

   # Or using Node http-server / npx serve
   npx serve .
   ```

3. **Deploy to Firebase Hosting**:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only hosting
   ```

---

## 📜 License

MIT License © 2026 Newton's Lobby Team & Contributors.
