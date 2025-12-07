<div align="center">

# 🔐 SkillVault

### Privacy-Preserving Professional Credentials on Midnight Network


**Prove your qualifications without revealing your secrets.**

</div>

---

## 🎯 The Problem

**830 million LinkedIn users** have zero privacy. Traditional platforms expose:

| What's Exposed | The Risk |
|----------------|----------|
| 🏢 **Current Employer** | Boss finds out you're job hunting |
| 💰 **Salary History** | Weakens negotiation power |
| 📅 **Exact Experience** | Age discrimination |
| 🎓 **Education Details** | Prestige bias |
| 📍 **Location** | Unwanted solicitations |

---

## 💡 The Solution

SkillVault is a **Confidential Job Board** that uses **Zero-Knowledge Proofs** on Midnight Network:

| Feature | How It Works |
|---------|--------------|
| ✅ **Prove without revealing** | "I have 5+ years experience" — not "7 years at Google" |
| ✅ **Apply privately** | Employers see "Qualified ✓" — not your current company |
| ✅ **Control per-application** | Different proofs for different opportunities |
| ✅ **Know when you don't qualify** | ZK proof fails gracefully |

---

## 🎯 ZK Use Cases

Beyond job applications, SkillVault enables privacy for:

| Use Case | Traditional (Privacy Exposed) | SkillVault (Privacy Preserved) |
|----------|-------------------------------|--------------------------------|
| 🎓 **Education** | Share full transcript with GPA | Prove "I have a CS degree" |
| 💰 **Salary** | Show pay stubs | Prove "Salary is $120k-$150k range" |
| 🏆 **Certifications** | Share certificate ID & dates | Prove "I hold valid AWS cert" |
| 👥 **References** | Give manager's contact (risky!) | Prove "Worked at Fortune 500 for 3+ years" |
| 🌍 **Work Auth** | Show visa/passport | Prove "Authorized to work in US" |
| 📊 **Skills** | Share full test scores | Prove "Top 10% in React skills" |

---

## 🔮 How ZK Proofs Work

```
┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│   YOUR PRIVATE       │     │    ZK CIRCUIT        │     │   EMPLOYER SEES      │
│   CREDENTIALS        │────▶│    (Compact)         │────▶│   ONLY THIS          │
├──────────────────────┤     ├──────────────────────┤     ├──────────────────────┤
│ Employer: Google     │     │ Computes:            │     │ ✓ Meets requirements │
│ Years: 7             │     │ • years >= 5? TRUE   │     │ ✓ Verified on-chain  │
│ Skill Level: 9/10    │     │ • level >= 7? TRUE   │     │ ✓ Proof timestamp    │
│ Salary: $185,000     │     │                      │     │                      │
└──────────────────────┘     └──────────────────────┘     └──────────────────────┘
       🔒 PRIVATE                 🔐 ZK MAGIC                 📢 PUBLIC OUTPUT
```

**The employer verifies the proof on-chain. They see "Qualified ✓" but NEVER see your private data.**

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Smart Contract** | Compact Language | ZK circuit for credential proofs |
| **SDK** | @meshsdk/midnight-setup | Official React SDK for Midnight |
| **Wallet** | Lace Beta Wallet | User authentication & signing |
| **Frontend** | React 18 + TypeScript | Type-safe UI components |
| **Animations** | Framer Motion | Smooth transitions & effects |
| **Styling** | Pure CSS | Custom glassmorphic design system |

---

## 🔧 Technical Implementation

### Smart Contract (Compact Language)

**File:** `contract/src/skillvault.compact`

```compact
@circuit
export function generateSkillProof(
    witnesses: Witnesses<{
        credentialIndex: UInt32;
        requiredSkillLevel: UInt8;
        requiredYears: UInt8;
        requiredSalary: UInt32;
    }>,
): ProofResult {
    // Get credential (private)
    const cred = this.credentials.at(witnesses.credentialIndex);
    
    // ZK comparisons (private inputs, public output)
    const meetsSkillLevel = cred.skillLevel >= witnesses.requiredSkillLevel;
    const meetsYears = cred.yearsExperience >= witnesses.requiredYears;
    const meetsSalary = cred.salaryRangeUpper >= witnesses.requiredSalary;

    return {
        meetsRequirements: meetsSkillLevel && meetsYears && meetsSalary,
        timestamp: ledger.timestamp,
    };
}
```

### MidnightJS Integration

**File:** `skillvault-ui/src/services/MidnightService.ts`

**Dual-Mode Architecture:**
- **🔗 Lace Mode** - Real wallet when Lace Beta is detected
- **🎮 Demo Mode** - Simulated for presentation when wallet unavailable

```typescript
class MidnightService {
    async connectWallet(): Promise<WalletState> {
        if (isLaceWalletAvailable()) {
            // REAL: Connect via Lace wallet
            await setupProviders();
            return { mode: 'real', ... };
        }
        // DEMO: Simulate for presentation
        return { mode: 'demo', ... };
    }
}
```

### Lace Wallet Providers

**File:** `skillvault-ui/src/services/providers.ts`

```typescript
export async function setupProviders() {
    const wallet = window.midnight?.mnLace;
    const walletAPI = await wallet.enable();
    const walletState = await walletAPI.state();
    
    return {
        walletProvider: {
            coinPublicKey: walletState.coinPublicKey,
            balanceTx: (tx, coins) => walletAPI.balanceAndProveTransaction(tx, coins),
        },
    };
}
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/himanshu-sugha/SkillVault.git

cd skillvault

# Install dependencies
cd skillvault-ui
npm install

# Start development server
npm run dev
```

**Open http://localhost:5173**

---

## 📁 Project Structure

```
skillvault/
├── contract/
│   └── src/
│       └── skillvault.compact       # ZK smart contract (285 lines)
│
├── skillvault-ui/
│   └── src/
│       ├── components/
│       │   ├── Navbar.tsx           # Navigation + wallet connection
│       │   ├── ZKCircuitVisualizer.tsx  # Animated proof visualization
│       │   ├── ZKTooltip.tsx        # "What is ZK?" explainer
│       │   └── Toast.tsx            # Notification system
│       │
│       ├── pages/
│       │   ├── Landing.tsx          # Home with Midnight branding
│       │   ├── Demo.tsx             # 5-step interactive demo
│       │   ├── UseCases.tsx         # 6 ZK use cases showcase
│       │   ├── Vault.tsx            # Credential storage & proofs
│       │   └── JobMarketplace.tsx   # Apply with ZK (success/fail)
│       │
│       ├── services/
│       │   ├── MidnightService.ts   # MidnightJS SDK integration
│       │   └── providers.ts         # Lace wallet provider setup
│       │
│       └── types/
│           └── midnight.d.ts        # TypeScript types for Midnight
│
├── README.md
└── LICENSE                           # Apache 2.0
```

---

## ✅ Hackathon Requirements Compliance

### Track: Protect That Data

| Requirement | Status | Evidence |
|-------------|--------|----------|
| **Compact language for ZK proofs** | ✅ | `contract/src/skillvault.compact` (285 lines) |
| **MidnightJS integration** | ✅ | 6 packages installed, dual-mode service |
| **UI showcasing privacy mechanism** | ✅ | Demo page, ZK visualizer, tooltips |
| **One specific functionality** | ✅ | **Confidential Job Board** |
| **Mocked transactions (no real value)** | ✅ | Demo mode with simulated proofs |
| **Open-source Apache 2.0** | ✅ | LICENSE file |

### Judging Criteria

| Criteria | How We Address It |
|----------|-------------------|
| **Use of Technology** | Full Compact contract with @circuit decorators, MidnightJS SDK, Lace wallet integration |
| **Usability & UX** | Glassmorphic design, Framer Motion animations, clear loading states, toast notifications |
| **Accessibility** | ARIA labels, keyboard navigation, "What is ZK?" tooltip for non-technical users |
| **Creativity** | Animated ZK circuit visualizer, success/rejection demos, confetti celebrations |

---

## 📊 Installed MidnightJS Packages

```json
{
    "@meshsdk/midnight-setup": "^1.9.0-beta.87",
    "@midnight-ntwrk/dapp-connector-api": "^3.0.0",
    "@midnight-ntwrk/midnight-js-fetch-zk-config-provider": "^2.1.0",
    "@midnight-ntwrk/midnight-js-http-client-proof-provider": "^2.1.0",
    "@midnight-ntwrk/midnight-js-indexer-public-data-provider": "^2.1.0",
    "@midnight-ntwrk/midnight-js-level-private-state-provider": "^2.1.0",
    "@midnight-ntwrk/midnight-js-network-id": "^2.1.0"
}
```

---

## 📄 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">


🔐 Your Skills. Your Privacy. Your Control.

</div>
