<div align="center">

# 🔒 zk-leaks 📰

**Permanent Truth. Anonymous Support.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Midnight Network](https://img.shields.io/badge/Powered%20by-Midnight-blue.svg)](https://www.midnight.network/)
[![OpenZeppelin](https://img.shields.io/badge/Built%20with-OpenZeppelin-lightgrey.svg)](https://www.openzeppelin.com/)

</div>

> **zk-leaks** is a decentralized whistleblowing platform built for the Midnight Network ACE Freedom Hackathon. It leverages Zero-Knowledge technology to solve the whistleblower's dilemma, creating a sanctuary where sources can share critical information with cryptographic certainty of their anonymity, while also receiving private financial support.

---

## The Problem: The Asymmetric Risk of Truth

Whistleblowers face an impossible choice: stay silent or risk their career, safety, and livelihood. Existing platforms rely on promises of anonymity, trusting a central intermediary that can be compromised, coerced, or shut down. This creates a chilling effect that prevents critical information from reaching the public.

We believe the solution isn't a better promise; it's a better protocol. We need a system where anonymity is not a policy, but a mathematical guarantee.

---

## The Solution: Three Pillars of Trustless Integrity

**zk-leaks** is built on a foundation of three core principles, enabled by the Midnight Network:

- **Verifiable Anonymity:** Sources can cryptographically prove they are part of a specific group (e.g., an employee of a certain company) without revealing their specific identity. This gives their leak credibility without compromising their anonymity. For the hackathon, this is achieved via a trusted oracle model.

- **Permanent & Decentralized Storage:** Leaks, including documents and media, are stored on IPFS. This makes the content itself censorship-resistant and permanent. The Midnight blockchain does not store the sensitive data, only an immutable pointer (the IPFS `CID`) to it.

- **Anonymous Support:** Every leak published on the platform is automatically linked to a shielded donation address on Midnight. This allows the public to provide financial support directly and privately to the source. Thanks to Midnight's ZK technology, only the original anonymous source can access these funds.

---

## User Workflow

The process is designed for maximum security and simplicity for the source.

1.  **Attestation (Off-Chain):** A user first proves they have a credential (e.g., an institutional email) to an off-chain oracle. This is a one-time process. The oracle then calls the smart contract to add the user’s anonymous identifier to a private list of verified users.

2.  **Submission (Frontend):** The user composes their leak (title, message, files) in the DApp's frontend. The frontend then uploads the content to IPFS, which returns a unique `CID`.

3.  **Proof & Publication (On-Chain):** The user submits an anonymous transaction to the Midnight smart contract. This transaction includes:
    - The public metadata (title, IPFS `CID`).
    - A ZK proof of their verified credential.
    - This on-chain action publishes the leak to the public registry and atomically creates the associated shielded donation address.

---

## Hackathon Challenge Alignment: ACE Freedom Track

**zk-leaks** is specifically designed to meet the criteria of the ACE Freedom Track/Challenge.

- **ACE Freedoms Fulfilled**:
  - **Expression:** The core function of the DApp is to enable anonymous content sharing, protected by ZK proofs, directly fulfilling the Freedom of Expression.
  - **Commerce:** The platform integrates privacy-preserving transactions via shielded donations, a key feature that protects the financial privacy of both the source and their supporters, thus upholding the Freedom of Commerce.
  - **Association:** The attestation system allows sources to prove they are part of a group (e.g., an organization) without revealing their identity, enabling a form of private group interaction and validation, which aligns with the Freedom of Association.

- **Key Component Integration**:
  - **OpenZeppelin Integration:** The smart contract is built using OpenZeppelin's Compact contracts library, leveraging `Ownable` for secure management of the attestation oracle, thereby ensuring a foundation of security and reusability.
  - **Secure Data Sharing:** The entire architecture is a form of secure, controlled data sharing. It employs a "selective disclosure" mechanism where the leak's data is made public, while the most critical data—the source's identity—remains completely private and protected.
  - **Zero-Knowledge Verification:** The platform's core security model relies on ZK verification elements, specifically an anonymous credential checking system that validates a source's credibility without revealing their identity.

---

## Future Roadmap

The immediate goal for this hackathon is to deliver a functional MVP using a trusted oracle for email attestation. The post-hackathon roadmap is focused on achieving full decentralization and trustlessness by replacing the oracle with a client-side ZK-Email implementation. This will eliminate the final point of trust, creating a true public good where users do not need to trust anyone to protect their identity.

```bash
+-------------+      +-----------------+      +------------------------+
|   Source    |----->|  Frontend DApp  |----->|  Off-Chain Oracle      |
| (Anonymous) |      | (React/Next.js) |      | (Email Attestation)    |
+-------------+      +-----------------+      +------------------------+
       ^                      |                          | (Calls Contract)
       | (Signs Tx)           | (Uploads to IPFS)        |
       |                      v                          v
+-------------+      +-----------------+      +------------------------+
| Midnight    |<-----| IPFS Network    |      | zk-leaks Smart Contract|
| (ZK Proofs) |      | (Permanent Data)|      | (Anonymous Registry)   |
+-------------+      +-----------------+      +------------------------+
       |
       v
+-------------+
| The Public  |
| (Readers &  |
|  Supporters)|
+-------------+
```

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18+) & [npm](https://www.npmjs.com/) (v9+)
- [Docker](https://docs.docker.com/get-docker/)
- [Git LFS](https://git-lfs.com/) (for large files)
- [Compact](https://docs.midnight.network/relnotes/compact-tools) (Midnight developer tools)

## 🛠️ Setup

### 1️⃣ Install Compact Tools

```bash
# Install the latest Compact tools
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
```

```bash
# Install the latest compiler
compact update
```

### 3️⃣ Install Node.js and docker

- [Node.js](https://nodejs.org/) (v18+) & [npm](https://www.npmjs.com/) (v9+)
- [Docker](https://docs.docker.com/get-docker/)

### 4️⃣ Verify Installation

```bash
# Check versions
node -v  # v18+
npm -v   # v9+
docker -v
git lfs version
compact check  # Should show latest version
```

## 📁 Project Structure

```
├── cli/                 # CLI tools
├── contract/            # Smart contracts
└── frontend/            # React front-end application
```

## 🔗 HOW TO RUN

### Testnet Network

1. **Set Network ID**
   - Open `frontend/src/App.tsx`
   - Ensure `setNetworkId(NetworkId.TestNet)` is set

2. **Configure Contract Address**
   - In the same file, locate the `contractAddress` constant

3. **Start Development**

   ```bash
   # In one terminal (from project root)
   npm i
   npm run build
   npm run start-app-testnet

   # In another terminal (from project root)
   cd cli
   npm run run-proof-server-testnet
   ```

<div align="center">
Made with ❤️ for the Midnight Hackathon.
</div>
