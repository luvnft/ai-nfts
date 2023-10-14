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

## App Images / ScreenShots

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

- You can create art from text and scribbles. Enter prompt and click on "Generate Art"
- Add NFT details such as name, description and click on "Mint NFT"
- This uploads the image to Arweave and creates an NFT using Mintbase SDK

### 2. Marketplace

- This Marketplace is inspired from Mintbase Simple Marketplace Template and Official docs. It has been modified to suit AI NFT marketplace needs
- You can view all the NFTs minted by owners
- Click on an NFT to view its details and buy directly from the marketplace if it is listed for saleby owner.

### 3. Contract

- `nftaiartistry.mintspace2.testnet` is the contract deployed on Near Testnet using Mintbase interface.
- It allows allowed minters to mint AI NFTs and list them for sale on the marketplace.

## Team

### Github

[Harsh Tyagi](https://github.com/mr-harshtyagi)
[Yashasvi Chaudhary](https://github.com/0xyshv)

### Twitter / X

[Harsh Tyagi](https://twitter.com/mr_harshtyagi)
[Yashasvi Chaudhary](https://twitter.com/0xyshv)

## Thanks

Feel free to contribute and add new features to the protocol :)
