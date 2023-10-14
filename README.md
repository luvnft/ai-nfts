# AI NFTs

EncodeXNear Horizon 2023 Hackathon / Build Templates out of Mintbase SDK Bounty.
Team [AlphaDevs](https://alphadevs.dev)

## Links

- [Deployed URL](https://ai-nfts-sooty.vercel.app/)
- [Presentation PDF](https://arweave.net/i45V9gaYHpt69tTSMH1ip1F--y2X8q7344G1dqa9ETY)
- [AI NFT Store Contract](https://testnet.mintbase.xyz/contract/nftaiartistry.mintspace2.testnet)
- [Git Repo with README](https://github.com/0xAlphaDevs/ai-nfts-mintbase)

## Protocol Specs

- Near Testnet (NFT Contract)
- Mintbase SDK (Minting NFTs, Marketplace & Wallet Connect features etc)
- Replicate (Running machine learning models in the cloud)
- ControlNet (An open-source machine learning model that generates images from text and scribbles)
- Vercel & Next JS (Front-end & Deployment)

## Libraries / APIs Used

### Frontend

- Next JS
- Tailwind CSS
- Mintbase UI
- React Spinners
- React Query
- React Hook Form
- React Sketch Canvas

### Other

- Prisma
- Replicate
- Next JS serverless API routes
- PlanetScale MySQL DB
- Near Wallet Selector & Near-api-js

## Our Solution (Architecture)

### 1. Minter

- Backend node server
- Tag generation feature hosted locally to avoid extra server costs and API abuse :P
- Extra : Used to generate Image buffers as Web browser lack access to low level system APIs (there can be better way to solve it in client side as well , open to ideas)

### 2. Marketplace

- Wallet connection with ArConnect and arweave web wallet
- Display of tags and image content in marketplace
- Easy query with asset tags and find creators and their work with their address
- Generate Tags and Upload .png images
- References and Codebases Used : Arweave Cookbook, Public Square App tutorial by DanMacDonald, Improved Code (created PR) and added fixes, >80% new code and features added

### 3. Contract

- Add License Fee
- Add Payment Address
- Create and edit content custom tags for your content
- Displays a License tag under licensed assets with their License-Fee

## Team

### Github

[Harsh Tyagi](https://github.com/mr-harshtyagi)
[Yashasvi Chaudhary](https://github.com/0xyshv)

### Twitter / X

[Harsh Tyagi](https://twitter.com/mr_harshtyagi)
[Yashasvi Chaudhary](https://twitter.com/0xyshv)

## Thanks

Feel free to contribute and add new features to the protocol :)
