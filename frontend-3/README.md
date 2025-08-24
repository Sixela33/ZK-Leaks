# Zk-Leaks Frontend App

## Roadmap

### Pages
- **Home (`/`)**
    * **Purpose**: A static landing page to build trust and educate visitors on the ZK-Leaks mission.
    * **Workflow**: Explains the *why* and *how* of the platform, covering security guarantees and risks. The primary call-to-action will direct users to "Submit a Leak."
    * **Implementation**: Adapt the existing `src/pages/home/index.tsx` to focus on this narrative.

- **Submit Leak (`/post`)**
    * **Purpose**: A single-purpose, distraction-free application for the whistleblower to securely submit their information. This page is the core interactive component.
    * **Workflow**: Guides the user through a linear, multi-step process:
        1.  **Security Checklist**: A mandatory confirmation of safety precautions (using Tor, a clean wallet, etc.).
        2.  **File Upload**: User uploads the leak document via the `PinataFileUpload` component to get a decentralized content identifier (CID).
        3.  **Origin Proof**: The user generates a ZK-SNARK proof in-browser to verify their affiliation without revealing their identity.
        4.  **On-Chain Submission**: The proof and CID are sent to the smart contract. The UI will display transaction status updates.
    * **Implementation**: Use `src/pages/counter/index.tsx` as the foundation, refactoring it into this guided workflow and removing the leak display section.

- **Leaks (`/leaks`)**
    * **Purpose**: A read-only repository for the public, journalists, and researchers to view verified leaks.
    * **Workflow**: Displays a list of all successful on-chain submissions. Each entry will show the leak ID, the verified origin (e.g., hash of the organization's domain), and a link to the document URI.
    * **Implementation**: Create a new page by extracting the leak-listing logic from the current `src/pages/counter/index.tsx` component.

- **About (`/about`)**
    * **Purpose**: To provide radical transparency and answer detailed questions about the technology, security, and threat model.
    * **Workflow**: Serves as a detailed FAQ and security guide. Content will cover the ZK technology, operational security (OpSec) best practices for users, and the project's limitations.
    * **Implementation**: A new static page with detailed, carefully worded explanations.
