# Market Mood Today

[![Deployed on Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=v0-mymarketmood)](https://v0-mymarketmood.vercel.app)

Generate your **market mood today** as a unique pixel monster NFT.  
Mint for **0.00002 ETH** on Base — either burn 4,164,305 $SKIN or hold 1,000,000 $BYEMONEY.

- Works as a **Farcaster Mini App** and **Base App**
- Fully on-chain identity + market sentiment
- Unique name generated from sliders: Order ↔ Chaos, Calm ↔ Aggressive, Focused ↔ Distracted, Light ↔ Dark
- Monster drawn on canvas → saved as NFT

## How It Works

1. Connect your wallet (MetaMask / Coinbase Wallet / Farcaster)
2. Adjust 4 sliders → click **Generate today's state**
3. Get a unique name and monster
4. If eligible → click **Mint NFT (0.00002 ETH)**
   - Burns 4,164,305 $SKIN (if you have it and haven't burned yet)
   - Or just hold 1,000,000 $BYEMONEY
5. NFT minted to contract `0xCAa139Af972ACfB464e8B41675732e79dd662b8a`

## Mint Requirements

| Token       | Amount              | Action              | Contract                                      |
|-------------|---------------------|---------------------|-----------------------------------------------|
| $SKIN       | 4,164,305           | Burn                | `0x7e994f015b60d97a26382ec5372039c89dd2eb07` |
| $BYEMONEY   | 1,000,000           | Hold                | `0xa12a532b0b7024b1d01ae66a3b8cf77366c7db07` |

## Demo

https://v0-mymarketmood.vercel.app

## Add to Farcaster / Base App

1. Open **Warpcast** or **Base App**
2. Mini Apps → Add Mini App / Custom App
3. Paste: `https://v0-mymarketmood.vercel.app/`
4. Confirm (sign with wallet if prompted)

Manifest available at:  
https://v0-mymarketmood.vercel.app/.well-known/farcaster.json

## Tech Stack

- Next.js 16 (App Router + Turbopack)
- Viem + Wagmi (Base chain)
- @farcaster/miniapp-sdk
- Canvas for monster generation
- IPFS for NFT metadata & image (via /api/upload-*)
- Tailwind + shadcn/ui + lucide-react

## With love for the market, chaos, and pixel monsters 🟦
<img width="1500" height="630" alt="opengraph-image" src="https://github.com/user-attachments/assets/487d7292-c0d0-402e-8dfb-395a0dd59611" />

## Local Development

```bash
git clone https://github.com/al-DYOR/my-market-mood.git
cd my-market-mood
npm install
npm run dev
