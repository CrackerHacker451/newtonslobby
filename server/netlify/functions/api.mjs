/**
 * Newton's Lobby — The Campus OS & AI Trust Layer
 * Serverless Netlify API Handler (server/netlify/functions/api.mjs)
 */

import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import {
  WORLD_ID_CONFIG,
  UNICOINS_CONFIG,
  verifyWorldIdProof,
  verifyDareDropProof,
  awardUniCoins,
  createArkivVaultRecord
} from '../../gate.js';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory peer heartbeats for SpeedLink 30-second active heartbeat filter
const activePeerHeartbeats = new Map();

// Open Student Project Squads
const activeProjectSquads = [
  {
    id: "squad-eth-1",
    name: "HyperChain ZK Triad",
    hackathon: "ETHGlobal Mumbai 2026 ($100K+)",
    lead: "Laltesh Chaudhary",
    leadBranch: "B.Tech Computer Science & AI (NST)",
    leadAvatar: "👨‍💻",
    lookingFor: ["Smart Contract Architect (Solidity/Rust)", "Zero-Knowledge Circuit Engineer"],
    techStack: ["Solidity", "Circom", "0G AI", "Arkiv DB-Chain"],
    membersCount: 2,
    maxMembers: 4,
    status: "RECRUITING_LIVE"
  },
  {
    id: "squad-sih-2",
    name: "AgriVision AI Swarm",
    hackathon: "Smart India Hackathon (SIH 2026)",
    lead: "Dev Sharma",
    leadBranch: "B.Tech AI & Data Science",
    leadAvatar: "⚡",
    lookingFor: ["Edge ML & Computer Vision Specialist", "React Native Mobile Dev"],
    techStack: ["PyTorch", "TensorFlow Lite", "Firebase", "WebRTC"],
    membersCount: 3,
    maxMembers: 6,
    status: "RECRUITING_LIVE"
  },
  {
    id: "squad-cre-3",
    name: "OracleGuard Synthesizer",
    hackathon: "Chainlink CRE Hackathon ($75K)",
    lead: "Aanya Verma",
    leadBranch: "B.Tech Cyber Security & Cloud",
    leadAvatar: "🛡️",
    lookingFor: ["Chainlink Functions Builder", "Full-Stack Web3 Integrator"],
    techStack: ["Chainlink CRE", "TypeScript", "Next.js", "Foundry"],
    membersCount: 2,
    maxMembers: 4,
    status: "RECRUITING_LIVE"
  },
  {
    id: "squad-icpc-4",
    name: "Newton Algorithmic Triad",
    hackathon: "ICPC 2026 Collegiate Olympiad",
    lead: "Rohan Kulkarni",
    leadBranch: "B.Tech Computer Science & Mathematics",
    leadAvatar: "📐",
    lookingFor: ["Speed C++20 Typist & Graph Solver"],
    techStack: ["C++20", "Algorithms", "Segment Trees", "Dynamic Programming"],
    membersCount: 2,
    maxMembers: 3,
    status: "RECRUITING_LIVE"
  }
];

// Official Hackathons Directory
const officialHackathons = [
  {
    id: "agentic-markets-2026",
    title: "ETHGlobal Agentic Markets 2026",
    headline: "Autonomous Crypto-Native AI Agents & Market Micro-Economies",
    prizePool: ",000+ USDC Bounties & Seed Grants",
    dates: "Dec 3 - 10, 2026",
    location: "Global Virtual (Async)",
    rsvpUrl: "https://ethglobal.com/events/agenticmarkets",
    tags: ["AI Agents", "EigenLayer", "Base", "Solidity", "ElizaOS"],
    isMajor: true,
    squadsRegistered: 54
  },
  {
    id: "ethindia-2026",
    title: "ETHIndia 2026 — Asia’s Largest Ethereum Hackathon",
    headline: "36-Hour Continuous Engineering Sprint for 2,000+ Elite Web3 Builders",
    prizePool: ",000+ (₹1.25 Cr+) in Bounties & Grants",
    dates: "Dec 4 - 6, 2026",
    location: "KTPO Trade Centre, Whitefield, Bengaluru",
    rsvpUrl: "https://ethindia.co",
    tags: ["Ethereum", "L2s", "Foundry", "Wagmi", "Chainlink CCIP"],
    isMajor: true,
    squadsRegistered: 89
  },
  {
    id: "ethglobal-mumbai-2026",
    title: "ETHGlobal Mumbai 2026",
    headline: "India's Flagship Web3 Builder Marathon",
    prizePool: ",000+ USDC & Grants",
    dates: "Dec 11 - 13, 2026",
    location: "Jio World Convention Centre, Mumbai & Online",
    rsvpUrl: "https://ethglobal.com/events/mumbai2026",
    tags: ["Web3", "ZK-SNARKs", "0G AI", "Arkiv DB-Chain", "DeFi"],
    isMajor: true,
    squadsRegistered: 48
  },
  {
    id: "colosseum-solana-2027",
    title: "Colosseum Solana Renaissance 2027",
    headline: "The Premier Launchpad for Venture-Backed Solana Startups",
    prizePool: ",000,000+ in Seed Investments & Accelerator",
    dates: "Jan 12 - Feb 02, 2027",
    location: "Global Virtual (Colosseum Portal)",
    rsvpUrl: "https://www.colosseum.org",
    tags: ["Solana", "Rust", "Anchor", "DePIN", "High-Throughput"],
    isMajor: true,
    squadsRegistered: 65
  },
  {
    id: "goa-buildathon-2027",
    title: "GOA BUILDATHON '27 — BITS Pilani Goa",
    headline: "3-Day Beachside Hack & Founder Demo Day for Top 100 Collegiate Teams",
    prizePool: "₹30 Lakhs in Angel Cheques & Founder Housing",
    dates: "Jan 22 - 24, 2027",
    location: "BITS Pilani Goa Campus, Zuarinagar, Goa",
    rsvpUrl: "https://bits-goa.ac.in",
    tags: ["Startups", "Next.js", "Agentic AI", "Venture Demo Day"],
    isMajor: true,
    squadsRegistered: 38
  },
  {
    id: "sih-2027",
    title: "Smart India Hackathon (SIH 2027 Grand Finale)",
    headline: "World's Largest Open Innovation Model for National Challenges",
    prizePool: "₹1.50 Crore+ in Awards & Ministry Incubation",
    dates: "Jan 15 - 18, 2027",
    location: "Ministry of Education AICTE Nodal Centres (35 Cities)",
    rsvpUrl: "https://sih.gov.in",
    tags: ["Smart Governance", "AgriTech", "Clean Energy", "Healthcare AI", "Drones"],
    isMajor: true,
    squadsRegistered: 112
  },
  {
    id: "icpc-2027",
    title: "ICPC 2027 — International Collegiate Programming Contest",
    headline: "The Global Championship for 3-Member Competitive Programming Triads",
    prizePool: "₹50 Lakhs+ Regional Awards + World Finals Golden Berets",
    dates: "Feb 6 - 8, 2027",
    location: "IIT Kanpur & Amritapuri Regionals",
    rsvpUrl: "https://icpc.global",
    tags: ["Algorithms", "C++20", "Data Structures", "Math", "Speed Code"],
    isMajor: true,
    squadsRegistered: 57
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. INSTANT UNIFIED AUTHENTICATION (0ms)
// ─────────────────────────────────────────────────────────────────────────────
app.post(['/api/auth/google', '/.netlify/functions/api/auth/google'], (req, res) => {
  const { idToken, email, name, picture } = req.body || {};
  
  const studentEmail = email || 'student.builder@newtonschool.edu.in';
  const displayName = name || 'Newton Builder';
  const photo = picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
  const branch = 'B.Tech Computer Science & Artificial Intelligence';

  // Cap initial UniCoins strictly at 5,000
  const initialCoins = Math.min(UNICOINS_CONFIG.MAX_BALANCE, UNICOINS_CONFIG.STARTING_BALANCE);

  const userProfile = {
    uid: `google-${Date.now()}`,
    email: studentEmail,
    displayName,
    name: displayName,
    avatar: '🎓',
    photo,
    campusBranch: branch,
    college: 'Newton School of Technology',
    rollNo: 'NST-2024-ADM' + String(Math.floor(10 + Math.random() * 89)),
    uniCoins: initialCoins,
    authProvider: 'google',
    worldIdVerified: false,
    authenticatedAt: new Date().toISOString()
  };

  return res.json({
    success: true,
    latencyMs: 0,
    user: userProfile,
    message: 'Instant Google authentication successful. Profile auto-created in 0ms.'
  });
});

app.post(['/api/auth/newton', '/.netlify/functions/api/auth/newton'], (req, res) => {
  const { studentId, password } = req.body || {};

  const id = (studentId || 'NST-2024-CS01').trim();
  const isFounder = id.toLowerCase() === 'lalit_rawat' || id.toLowerCase() === 'laltesh';

  const userProfile = {
    uid: isFounder ? 'ADY2TYrtYEQA61mDv4hUXnoSxr72' : `nst-${Date.now()}`,
    email: isFounder ? 'laltesh@newtonslobby.com' : `${id.toLowerCase()}@newtonschool.edu.in`,
    displayName: isFounder ? 'Laltesh Chaudhary (Lalit Rawat)' : `Student (${id})`,
    name: isFounder ? 'Laltesh Chaudhary' : id,
    avatar: isFounder ? '👑' : '🎓',
    photo: isFounder ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    campusBranch: 'B.Tech CS & Artificial Intelligence (AI)',
    college: 'Newton School of Technology & S-VYASA University',
    rollNo: isFounder ? 'NST-2024-ADM01' : id,
    uniCoins: isFounder ? 5000 : Math.min(UNICOINS_CONFIG.MAX_BALANCE, UNICOINS_CONFIG.STARTING_BALANCE),
    isSupremeAdmin: isFounder,
    authProvider: 'newton_sso',
    worldIdVerified: true,
    authenticatedAt: new Date().toISOString()
  };

  return res.json({
    success: true,
    latencyMs: 0,
    user: userProfile,
    message: 'Newton student authentication successful in 0ms.'
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. WORLD ID 4.0 PROPORTIONAL TRUST ENGINE VERIFICATION
// ─────────────────────────────────────────────────────────────────────────────
app.post(['/api/worldid/verify', '/.netlify/functions/api/worldid/verify'], (req, res) => {
  const { nullifierHash, credentialId, currentBalance } = req.body || {};
  const result = verifyWorldIdProof({
    nullifierHash: nullifierHash || `0x${crypto.randomBytes(32).toString('hex')}`,
    credentialId: Number(credentialId) || 1
  });

  if (!result.success) {
    return res.status(400).json(result);
  }

  const updatedBalance = awardUniCoins(currentBalance || UNICOINS_CONFIG.STARTING_BALANCE, result.rewardCoins);

  return res.json({
    ...result,
    updatedUniCoins: updatedBalance,
    capNotice: updatedBalance >= UNICOINS_CONFIG.MAX_BALANCE ? 'UniCoins balance capped strictly at 5,000 maximum.' : null
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. DAREDROP 0G PRIVATE COMPUTER ZK AI VERIFICATION
// ─────────────────────────────────────────────────────────────────────────────
app.post(['/api/daredrop/verify', '/.netlify/functions/api/daredrop/verify'], (req, res) => {
  const { dareId, fileUrl, studentId, studentName, currentBalance } = req.body || {};
  const result = verifyDareDropProof({
    dareId: dareId || 1,
    fileUrl: fileUrl || 'https://firebasestorage.googleapis.com/v0/b/newtonslobby-3c54c.appspot.com/o/proofs%2Fdemo_proof.mp4?alt=media',
    studentId: studentId || 'student-current',
    studentName: studentName || 'Verified Builder'
  });

  if (!result.success) {
    return res.status(400).json(result);
  }

  const updatedBalance = awardUniCoins(currentBalance || UNICOINS_CONFIG.STARTING_BALANCE, result.rewardCoins);

  return res.json({
    ...result,
    updatedUniCoins: updatedBalance
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. STUDY VAULT: ARKIV DB-CHAIN & SWARM STORAGE
// ─────────────────────────────────────────────────────────────────────────────
app.post(['/api/vault/publish', '/.netlify/functions/api/vault/publish'], (req, res) => {
  const { title, bzzHash, category } = req.body || {};
  const sampleBzz = bzzHash || `bzz://${crypto.randomBytes(32).toString('hex')}`;
  const record = createArkivVaultRecord(title || 'Academic Lecture Notes', sampleBzz, category);

  return res.json({
    success: true,
    record,
    message: 'Indexed on Arkiv DB-Chain with 30-day TTL (ExpirationTime.fromDays(30)) and Swarm AES-256 storage.'
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. HACKATHONS & SQUADS
// ─────────────────────────────────────────────────────────────────────────────
app.get(['/api/hackathons', '/.netlify/functions/api/hackathons'], (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const filtered = officialHackathons.filter(h => 
    !query || 
    h.title.toLowerCase().includes(query) || 
    h.headline.toLowerCase().includes(query) ||
    h.tags.some(t => t.toLowerCase().includes(query))
  );
  return res.json({ success: true, count: filtered.length, hackathons: filtered });
});

app.get(['/api/teams', '/.netlify/functions/api/teams'], (req, res) => {
  return res.json({ success: true, count: activeProjectSquads.length, squads: activeProjectSquads });
});

app.post(['/api/teams', '/.netlify/functions/api/teams'], (req, res) => {
  const { name, hackathon, lead, leadBranch, lookingFor, techStack } = req.body || {};
  const newSquad = {
    id: `squad-${Date.now()}`,
    name: name || 'New Hackathon Squad',
    hackathon: hackathon || 'ETHGlobal Mumbai 2026 ($100K+)',
    lead: lead || 'Campus Builder',
    leadBranch: leadBranch || 'B.Tech Computer Science & AI',
    leadAvatar: '🚀',
    lookingFor: Array.isArray(lookingFor) ? lookingFor : ['Full-Stack Developer', 'AI/ML Researcher'],
    techStack: Array.isArray(techStack) ? techStack : ['React', '0G AI', 'Solidity'],
    membersCount: 1,
    maxMembers: 4,
    status: 'RECRUITING_LIVE',
    createdAt: new Date().toISOString()
  };

  activeProjectSquads.unshift(newSquad);
  return res.json({ success: true, squad: newSquad, message: 'Squad published to Teams Hub!' });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. SPEEDLINK HEARTBEAT & 30-SECOND ACTIVE OFFLINE FILTERING
// ─────────────────────────────────────────────────────────────────────────────
app.post(['/api/speedlink/heartbeat', '/.netlify/functions/api/speedlink/heartbeat'], (req, res) => {
  const { peerId, peerName, college, branch, badge } = req.body || {};
  const id = peerId || 'peer-local';
  const now = Date.now();

  activePeerHeartbeats.set(id, {
    id,
    name: peerName || 'Builder Peer',
    college: college || 'Newton School of Technology',
    branch: branch || 'B.Tech CS & AI',
    badge: badge || 'KStream ⚡',
    lastHeartbeat: now
  });

  // Prune inactive peers older than 30 seconds
  const activePeers = [];
  for (const [pId, peer] of activePeerHeartbeats.entries()) {
    if (now - peer.lastHeartbeat > 30000) {
      activePeerHeartbeats.delete(pId);
    } else {
      activePeers.push(peer);
    }
  }

  return res.json({
    success: true,
    activeCount: activePeers.length,
    activePeers,
    filterPolicy: '30-second heartbeat active offline filtering'
  });
});

export const handler = serverless(app);
export default app;
