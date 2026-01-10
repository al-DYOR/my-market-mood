"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { publicClient } from "@/lib/viem-client"
import { CheckCircle2 } from "lucide-react"

declare global {
  interface Window {
    ethereum?: any
  }
}

const CONFIG = {
  SKIN_TOKEN: "0x7e994f015b60d97a26382ec5372039c89dd2eb07",
  SKIN_REQUIRED: BigInt("4164305") * BigInt("1000000000000000000"), // 4164305 * 10^18
  BYEMONEY_TOKEN: "0xa12a532b0b7024b1d01ae66a3b8cf77366c7db07",
  BYEMONEY_REQUIRED: BigInt("1000000") * BigInt("1000000000000000000"), // 1000000 * 10^18
  BYEMONEY_RECEIVER: "0x063c4989cFb40557353EDB8c26Ea8009789F2569",
  NFT_CONTRACT: "0x50e0da320e5b03045279F23A3C4115b5405D3b24",
}

const ERC20_ABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]

const traits = [
  { id: "order", left: "Order", right: "Chaos" },
  { id: "calm", left: "Calm", right: "Aggressive" },
  { id: "focused", left: "Focused", right: "Distracted" },
  { id: "light", left: "Light", right: "Dark" },
]

const generateUniqueName = (
  sliders: { order: number; calm: number; focused: number; light: number },
  usedNames: string[],
): string => {
  // Expanded word pools for different combinations of states
  const orderedCalmLight = [
    "Horizon",
    "Serenity",
    "Crystal",
    "Haven",
    "Clarity",
    "Oasis",
    "Dawn",
    "Zenith",
    "Pearl",
    "Lotus",
    "Prism",
    "Aurora",
    "Tranquil",
    "Serene",
    "Placid",
    "Harmony",
  ]
  const orderedCalmDark = [
    "Depths",
    "Eclipse",
    "Crypt",
    "Silence",
    "Vault",
    "Abyss",
    "Midnight",
    "Sanctum",
    "Obsidian",
    "Onyx",
    "Raven",
    "Nocturne",
    "Shadow",
    "Void",
    "Somber",
    "Grave",
  ]
  const orderedAnxiousLight = [
    "Flare",
    "Spark",
    "Prism",
    "Surge",
    "Blaze",
    "Radiance",
    "Ignite",
    "Pulse",
    "Flicker",
    "Shimmer",
    "Dazzle",
    "Glint",
    "Luminous",
    "Vibrant",
    "Bright",
    "Flash",
  ]
  const orderedAnxiousDark = [
    "Ember",
    "Shadow",
    "Specter",
    "Wraith",
    "Vortex",
    "Phantom",
    "Obsidian",
    "Torment",
    "Dire",
    "Grim",
    "Dread",
    "Haunt",
    "Sinister",
    "Omen",
    "Gloom",
    "Menace",
  ]
  const chaoticCalmLight = [
    "Drift",
    "Breeze",
    "Mist",
    "Float",
    "Whisper",
    "Wander",
    "Shimmer",
    "Ripple",
    "Gentle",
    "Soft",
    "Wisp",
    "Murmur",
    "Lull",
    "Soothe",
    "Calm",
    "Peace",
  ]
  const chaoticCalmDark = [
    "Haze",
    "Gloom",
    "Shroud",
    "Dusk",
    "Murk",
    "Twilight",
    "Shade",
    "Mire",
    "Dim",
    "Fog",
    "Blur",
    "Smog",
    "Overcast",
    "Gray",
    "Dusky",
    "Misty",
  ]
  const chaoticAnxiousLight = [
    "Storm",
    "Flash",
    "Burst",
    "Shatter",
    "Crackle",
    "Lightning",
    "Thunder",
    "Tempest",
    "Chaos",
    "Wild",
    "Fierce",
    "Rage",
    "Fury",
    "Blast",
    "Crash",
    "Strike",
  ]
  const chaoticAnxiousDark = [
    "Chaos",
    "Void",
    "Rupture",
    "Ruin",
    "Inferno",
    "Maelstrom",
    "Apocalypse",
    "Cataclysm",
    "Carnage",
    "Havoc",
    "Mayhem",
    "Turmoil",
    "Bedlam",
    "Frenzy",
    "Pandemonium",
    "Anarchy",
  ]

  const focusedWords = [
    "Anchor",
    "Focus",
    "Beacon",
    "Core",
    "Truth",
    "Pillar",
    "Foundation",
    "Compass",
    "Center",
    "Balance",
    "Steady",
    "Grounded",
    "Stable",
    "Fixed",
    "Firm",
    "Solid",
  ]
  const distractedWords = [
    "Scatter",
    "Ripple",
    "Fragment",
    "Flux",
    "Wander",
    "Nebula",
    "Cascade",
    "Divide",
    "Drift",
    "Disperse",
    "Diverge",
    "Split",
    "Branch",
    "Spread",
    "Diffuse",
    "Stray",
  ]

  // Extended fallback pools that grow dynamically
  const fallbackWords = [
    "Essence",
    "Nexus",
    "Ethos",
    "Cipher",
    "Omen",
    "Enigma",
    "Relic",
    "Primal",
    "Vestige",
    "Genesis",
    "Axiom",
    "Synthesis",
    "Quantum",
    "Catalyst",
    "Paradox",
    "Vertex",
    "Zenon",
    "Apex",
    "Epoch",
    "Matrix",
    "Spiral",
    "Helix",
    "Cortex",
    "Nexus",
    "Zephyr",
    "Vortex",
    "Cipher",
    "Oracle",
    "Astral",
    "Cosmic",
    "Stellar",
    "Lunar",
    "Solar",
    "Nova",
    "Nebula",
    "Comet",
    "Meteor",
    "Galaxy",
    "Pulsar",
    "Quasar",
    "Photon",
    "Proton",
    "Neutron",
    "Electron",
    "Atom",
    "Molecule",
    "Particle",
    "Wave",
    "Field",
    "Force",
    "Vector",
    "Scalar",
    "Tensor",
    "Fractal",
    "Mandala",
    "Sigil",
    "Rune",
    "Glyph",
    "Symbol",
    "Emblem",
  ]

  // Additional extended word pools for when all primary pools are exhausted
  const extendedPool = [
    "Praxis",
    "Logos",
    "Mythos",
    "Cosmos",
    "Chronos",
    "Kairos",
    "Ethos",
    "Pathos",
    "Telos",
    "Arete",
    "Psyche",
    "Soma",
    "Pneuma",
    "Karma",
    "Dharma",
    "Nirvana",
    "Samsara",
    "Moksha",
    "Atman",
    "Brahman",
    "Tao",
    "Qi",
    "Yin",
    "Yang",
    "Zen",
    "Koan",
    "Satori",
    "Bodhi",
    "Metta",
    "Karuna",
    "Aura",
    "Chakra",
    "Mantra",
    "Yantra",
    "Tantra",
    "Mudra",
    "Asana",
    "Prana",
    "Kundalini",
    "Shakti",
    "Shiva",
    "Vishnu",
    "Brahma",
    "Maya",
    "Lila",
    "Leela",
    "Rasa",
    "Bhava",
    "Ananda",
    "Sat",
  ]

  // Determine dominant states
  const isOrdered = sliders.order < 50
  const isCalm = sliders.calm < 50
  const isLight = sliders.light < 50
  const isFocused = sliders.focused < 50

  // Select word pool based on primary states
  let wordPool: string[]
  if (isOrdered && isCalm && isLight) wordPool = orderedCalmLight
  else if (isOrdered && isCalm && !isLight) wordPool = orderedCalmDark
  else if (isOrdered && !isCalm && isLight) wordPool = orderedAnxiousLight
  else if (isOrdered && !isCalm && !isLight) wordPool = orderedAnxiousDark
  else if (!isOrdered && isCalm && isLight) wordPool = chaoticCalmLight
  else if (!isOrdered && isCalm && !isLight) wordPool = chaoticCalmDark
  else if (!isOrdered && !isCalm && isLight) wordPool = chaoticAnxiousLight
  else wordPool = chaoticAnxiousDark

  // Add focus/distracted words to pool for more variation
  if (isFocused) {
    wordPool = [...wordPool, ...focusedWords]
  } else {
    wordPool = [...wordPool, ...distractedWords]
  }

  let availableWords = wordPool.filter((word) => !usedNames.includes(word))

  // If primary pool exhausted, try fallback pool
  if (availableWords.length === 0) {
    availableWords = fallbackWords.filter((word) => !usedNames.includes(word))
  }

  // If fallback pool also exhausted, try extended pool
  if (availableWords.length === 0) {
    availableWords = extendedPool.filter((word) => !usedNames.includes(word))
  }

  if (availableWords.length === 0) {
    // Generate a truly unique name using timestamp and random hash
    const timestamp = Date.now()
    const randomSeed = Math.floor(Math.random() * 10000)
    const hash = (timestamp + randomSeed).toString(36).toUpperCase()

    // Create compound words or prefixed variations
    const prefixes = ["Neo", "Proto", "Meta", "Ultra", "Hyper", "Mega", "Giga", "Tera", "Omni", "Poly"]
    const suffixes = ["Prime", "Core", "Edge", "Flux", "Wave", "Shift", "Peak", "Node", "Link", "Mesh"]

    const allBaseWords = [...wordPool, ...fallbackWords, ...extendedPool]
    const baseWord = allBaseWords[Math.floor(Math.random() * allBaseWords.length)]

    // Try different naming strategies until we find an unused one
    const strategies = [
      `${prefixes[randomSeed % prefixes.length]}${baseWord}`,
      `${baseWord}${suffixes[randomSeed % suffixes.length]}`,
      `${baseWord}${hash.slice(0, 3)}`,
      `Unique${hash}`,
    ]

    for (const candidate of strategies) {
      if (!usedNames.includes(candidate)) {
        return candidate
      }
    }

    // Ultimate fallback: guaranteed unique with full hash
    return `State${hash}`
  }

  const seed = sliders.order + sliders.calm * 100 + sliders.focused * 10000 + sliders.light * 1000000
  const index = seed % availableWords.length

  return availableWords[index]
}

const getUsedNames = (walletAddress: string, farcasterFid?: string): string[] => {
  if (typeof window === "undefined") return []

  try {
    // Create unique user key combining wallet and Farcaster FID
    const userKey = farcasterFid ? `${walletAddress.toLowerCase()}_${farcasterFid}` : walletAddress.toLowerCase()
    const key = `usedNames_${userKey}`
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error reading used names:", error)
    return []
  }
}

const saveUsedName = (walletAddress: string, name: string, farcasterFid?: string) => {
  if (typeof window === "undefined") return

  try {
    // Create unique user key combining wallet and Farcaster FID
    const userKey = farcasterFid ? `${walletAddress.toLowerCase()}_${farcasterFid}` : walletAddress.toLowerCase()
    const key = `usedNames_${userKey}`
    const usedNames = getUsedNames(walletAddress, farcasterFid || undefined)

    // Only add if not already present
    if (!usedNames.includes(name)) {
      usedNames.push(name)
      localStorage.setItem(key, JSON.stringify(usedNames))
      console.log(`[v0] Saved used name "${name}" for user key: ${userKey}`)
    }
  } catch (error) {
    console.error("Error saving used name:", error)
  }
}

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintError, setMintError] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [nftMetadata, setNftMetadata] = useState<any>(null)
  const [tokenURI, setTokenURI] = useState<string | null>(null)
  const [tokenId, setTokenId] = useState<string | null>(null)
  const [sliders, setSliders] = useState({ order: 50, calm: 50, focused: 50, light: 50 })
  const [result, setResult] = useState<string | null>(null)
  const [generatedName, setGeneratedName] = useState<string | null>(null)
  const [mintSuccess, setMintSuccess] = useState<string | null>(null)
  const [skinBalance, setSkinBalance] = useState<bigint>(BigInt(0))
  const [byemoneyBalance, setByemoneyBalance] = useState<bigint>(BigInt(0))
  const [showErrorToast, setShowErrorToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    if (walletAddress) {
      checkTokenBalances()
    }
  }, [walletAddress])

  useEffect(() => {
    if (generatedName && generatedImage === null) {
      generatePreviewImage()
    }
  }, [generatedName])

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask to connect your wallet")
      return
    }

    try {
      setIsConnecting(true)
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setWalletAddress(accounts[0])
      console.log("[v0] CONNECTED ADDRESS:", accounts[0])
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
  }

  const handleSliderChange = (id: string, value: number[]) => {
    setSliders((prev) => ({ ...prev, [id]: value[0] }))
  }

  const generateState = () => {
    const orderState = sliders.order < 50 ? "Ordered" : "Chaotic"
    const calmState = sliders.calm < 50 ? "Calm" : "Anxious"
    const focusState = sliders.focused < 50 ? "Focused" : "Distracted"
    const lightState = sliders.light < 50 ? "Light" : "Heavy"

    const state = `${orderState} • ${calmState} • ${focusState} • ${lightState}`
    setResult(state)

    if (walletAddress) {
      const usedNames = getUsedNames(walletAddress, undefined)
      console.log(`[v0] Previously used names (${usedNames.length}):`, usedNames)

      const uniqueName = generateUniqueName(sliders, usedNames)
      console.log(`[v0] Generated new unique name: ${uniqueName}`)
      setGeneratedName(uniqueName)

      saveUsedName(walletAddress, uniqueName, undefined)

      generatePreviewImage()
    } else {
      const uniqueName = generateUniqueName(sliders, [])
      setGeneratedName(uniqueName)
    }
  }

  const generatePreviewImage = async () => {
    const imageDataUrl = await generateNFTImage()
    setGeneratedImage(imageDataUrl)
  }

  const generateNFTImage = async (): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      canvas.width = 1000
      canvas.height = 1000
      const ctx = canvas.getContext("2d")!

      // Background gradient based on Light/Heavy slider
      const gradient = ctx.createLinearGradient(0, 0, 0, 1000)
      if (sliders.light < 50) {
        gradient.addColorStop(0, "#f5f5f7")
        gradient.addColorStop(1, "#e8e8eb")
      } else {
        gradient.addColorStop(0, "#1a1a1f")
        gradient.addColorStop(1, "#0a0a0f")
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1000, 1000)

      // Chaos pattern
      if (sliders.order >= 50) {
        ctx.strokeStyle = sliders.light < 50 ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"
        ctx.lineWidth = 2
        for (let i = 0; i < 20; i++) {
          ctx.beginPath()
          ctx.moveTo(Math.random() * 1000, Math.random() * 1000)
          ctx.lineTo(Math.random() * 1000, Math.random() * 1000)
          ctx.stroke()
        }
      }

      // Colored ring for Calm/Anxious
      const anxietyLevel = sliders.calm / 100
      const hue = 200 + anxietyLevel * 60
      ctx.strokeStyle = `hsla(${hue}, 60%, 50%, 0.3)`
      ctx.lineWidth = 20
      ctx.beginPath()
      ctx.arc(500, 500, 300, 0, Math.PI * 2)
      ctx.stroke()

      // Blur effect for Distracted
      if (sliders.focused >= 50) {
        ctx.filter = `blur(${((sliders.focused - 50) / 50) * 5}px)`
        ctx.fillStyle = sliders.light < 50 ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"
        ctx.fillRect(0, 0, 1000, 1000)
        ctx.filter = "none"
      }

      // Wallet address
      if (walletAddress) {
        ctx.fillStyle = sliders.light < 50 ? "#333333" : "#cccccc"
        ctx.font = "32px monospace"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        ctx.fillText(shortAddress, 500, 500)
      }

      // Generated name
      if (generatedName) {
        ctx.fillStyle = sliders.light < 50 ? "#000000" : "#ffffff"
        ctx.font = "bold 80px -apple-system, BlinkMacSystemFont, sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(generatedName, 500, 850)
      }

      const dataUrl = canvas.toDataURL("image/png")
      resolve(dataUrl)
    })
  }

  const generateMetadata = (imageUrl: string, mintPath: "Burn SKIN" | "Hold BYEMONEY") => {
    const metadata = {
      name: generatedName || "Unknown",
      description: "Your trading state today",
      image: imageUrl,
      attributes: [
        {
          trait_type: "Market Mood",
          value: generatedName || "Unknown",
        },
        {
          trait_type: "Identity",
          value: "Wallet",
        },
        {
          trait_type: "State",
          value: result || "",
        },
        {
          trait_type: "Mint Path",
          value: mintPath,
        },
      ],
    }
    return metadata
  }

  const checkTokenBalances = async () => {
    if (!walletAddress) return

    try {
      const skinBal = await publicClient.readContract({
        address: CONFIG.SKIN_TOKEN as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      })
      setSkinBalance(skinBal as bigint)

      const byemoneyBal = await publicClient.readContract({
        address: CONFIG.BYEMONEY_TOKEN as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      })
      setByemoneyBalance(byemoneyBal as bigint)
    } catch (error) {
      console.error("Error checking balances:", error)
    }
  }

  const isSkinSatisfied = skinBalance >= CONFIG.SKIN_REQUIRED
  const isByemoneySatisfied = !isSkinSatisfied && byemoneyBalance >= CONFIG.BYEMONEY_REQUIRED
  const isEligible = isSkinSatisfied || isByemoneySatisfied

  const getEligibilityStatus = () => {
    if (isSkinSatisfied) return "Eligible (Burn SKIN)"
    if (isByemoneySatisfied) return "Eligible (Hold BYEMONEY)"
    return "Not eligible"
  }

  const mintNFT = async () => {
    if (!walletAddress) {
      setErrorMessage("Please connect your wallet first")
      setShowErrorToast(true)
      return
    }

    if (!generatedImage) {
      setErrorMessage("Please generate today's state first")
      setShowErrorToast(true)
      return
    }

    setIsMinting(true)
    setMintError(null)
    setMintSuccess(null)

    try {
      const skinBalance = await publicClient.readContract({
        address: CONFIG.SKIN_TOKEN as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      })

      const skinRequired = CONFIG.SKIN_REQUIRED

      console.log("SKIN RAW:", skinBalance.toString())
      console.log("SKIN REQUIRED:", skinRequired.toString())

      const byemoneyBalance = await publicClient.readContract({
        address: CONFIG.BYEMONEY_TOKEN as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      })

      const byemoneyRequired = CONFIG.BYEMONEY_REQUIRED

      console.log("BYEMONEY RAW:", byemoneyBalance.toString())
      console.log("BYEMONEY REQUIRED:", byemoneyRequired.toString())

      let mintPath: "Burn SKIN" | "Hold BYEMONEY"

      if (skinBalance >= skinRequired) {
        console.log("Sufficient $skin balance, burning tokens...")
        mintPath = "Burn SKIN"

        const burnData =
          "0x42966c68" + // burn(uint256)
          skinRequired.toString(16).padStart(64, "0")

        const burnTxHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: walletAddress,
              to: CONFIG.SKIN_TOKEN,
              data: burnData,
            },
          ],
        })

        console.log("$skin burn transaction sent:", burnTxHash)

        let burnReceipt = null
        let attempts = 0
        while (!burnReceipt && attempts < 30) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          burnReceipt = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [burnTxHash],
          })
          attempts++
        }

        if (!burnReceipt || burnReceipt.status !== "0x1") {
          throw new Error("$skin burn transaction failed")
        }

        console.log("$skin burned successfully, proceeding to mint...")
      } else if (byemoneyBalance >= byemoneyRequired) {
        console.log("Sufficient $byemoney balance, proceeding to mint...")
        mintPath = "Hold BYEMONEY"
      } else {
        setErrorMessage("Insufficient tokens. Need 4164305 $skin or 1000000 $byemoney to mint.")
        setShowErrorToast(true)
        setIsMinting(false)
        return
      }

      console.log("Uploading NFT metadata...")

      console.log("Using pre-generated image:", generatedImage.substring(0, 50) + "...")

      console.log("Uploading image to IPFS...")
      const imageUploadResponse = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl: generatedImage }),
      })

      const imageUploadResult = await imageUploadResponse.json()

      if (!imageUploadResult.success) {
        throw new Error("Failed to upload image to IPFS")
      }

      console.log("Image uploaded:", imageUploadResult.imageUrl)

      const metadata = generateMetadata(imageUploadResult.imageUrl, mintPath)
      setNftMetadata(metadata)
      console.log("Metadata prepared:", metadata)

      console.log("Uploading metadata to IPFS...")
      const metadataUploadResponse = await fetch("/api/upload-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metadata),
      })
      const metadataUploadResult = await metadataUploadResponse.json()

      if (!metadataUploadResult.success) {
        throw new Error("Failed to upload metadata to IPFS")
      }

      console.log("Metadata uploaded - TokenURI:", metadataUploadResult.tokenURI)
      setTokenURI(metadataUploadResult.tokenURI)

      console.log("Calling mintNFT on contract...")

      const tokenURIHex = Buffer.from(metadataUploadResult.tokenURI).toString("hex")
      const tokenURILength = (tokenURIHex.length / 2).toString(16).padStart(64, "0")
      const tokenURIPadded = tokenURIHex.padEnd(Math.ceil(tokenURIHex.length / 64) * 64, "0")

      const mintData =
        "0xd204c45e" + // mintNFT(string) function selector
        "0000000000000000000000000000000000000000000000000000000000000020" + // offset to string data
        tokenURILength + // length of string
        tokenURIPadded // actual string data

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: walletAddress,
            to: CONFIG.NFT_CONTRACT,
            data: mintData,
            value: "0x0", // Not payable
          },
        ],
      })

      console.log("Mint transaction sent:", txHash)

      let receipt = null
      let attempts = 0
      while (!receipt && attempts < 30) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        receipt = await window.ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [txHash],
        })
        attempts++
      }

      if (receipt && receipt.logs && receipt.logs.length > 0) {
        const transferLog = receipt.logs.find((log: any) => log.topics.length === 4)
        if (transferLog) {
          const extractedTokenId = BigInt(transferLog.topics[3]).toString()
          setTokenId(extractedTokenId)
          console.log("Minted tokenId:", extractedTokenId)
        }
      }

      setMintError(null)
      setMintSuccess("NFT minted successfully!")
      console.log("Mint completed successfully!")
      await checkTokenBalances()
    } catch (error: any) {
      console.error("Mint error:", error)
      if (error.message?.includes("User rejected") || error.message?.includes("user rejected")) {
        setErrorMessage("Transaction was cancelled")
      } else {
        setErrorMessage("Mint failed. Please try again.")
      }
      setShowErrorToast(true)
    } finally {
      setIsMinting(false)
    }
  }

  const getDynamicTypographyStyle = () => {
    if (!result) return {}

    const isCalm = sliders.calm < 50
    const isChaotic = sliders.order >= 50
    const isHeavy = sliders.light >= 50
    const isLight = sliders.light < 50

    return {
      fontWeight: isHeavy ? 700 : isLight ? 400 : 600,
      letterSpacing: isChaotic ? `${Math.sin(Date.now() / 1000) * 0.5 + 1}px` : isCalm ? "0.02em" : "0.05em",
      animation: isChaotic ? "subtleJitter 3s ease-in-out infinite" : "none",
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.04] mix-blend-overlay">
        <div
          className="w-full h-full animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {showErrorToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <Card className="p-4 shadow-xl border-2 border-destructive/50 bg-destructive/10 backdrop-blur-xl max-w-sm">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-destructive">{errorMessage}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowErrorToast(false)}
                className="h-6 w-6 p-0 hover:bg-destructive/20"
              >
                ✕
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="w-full max-w-lg space-y-6">
        <div className="flex justify-end">
          {walletAddress ? (
            <Button
              onClick={disconnectWallet}
              variant="outline"
              className="rounded-2xl border-border/50 backdrop-blur-sm bg-card/50 hover:bg-card/80 transition-all"
            >
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Button>
          ) : (
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              className="rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>

        <Card className="p-8 sm:p-10 shadow-2xl border border-border/30 backdrop-blur-xl bg-gradient-to-br from-card via-card to-card/95 rounded-3xl">
          <div className="text-center mb-10 space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent leading-tight px-2">
              Market mood today
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground text-pretty leading-relaxed max-w-md mx-auto px-4">
              Your current state based on today's market and your on-chain identity
            </p>
          </div>

          <div className="space-y-8">
            {traits.map((trait) => (
              <div key={trait.id} className="space-y-3">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                  <span className={sliders[trait.id as keyof typeof sliders] < 50 ? "text-foreground" : ""}>
                    {trait.left}
                  </span>
                  <span className={sliders[trait.id as keyof typeof sliders] >= 50 ? "text-foreground" : ""}>
                    {trait.right}
                  </span>
                </div>
                <Slider
                  value={[sliders[trait.id as keyof typeof sliders]]}
                  onValueChange={(value) => handleSliderChange(trait.id, value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <Button
            onClick={generateState}
            className="w-full mt-10 h-14 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-2xl"
            size="lg"
          >
            Generate today's state
          </Button>
        </Card>

        {result && (
          <Card className="relative p-6 text-center backdrop-blur-xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border border-primary/20 shadow-xl shadow-primary/10 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay">
              <div
                className="w-full h-full animate-grain-slow"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "200px 200px",
                }}
              />
            </div>

            {generatedName && (
              <h2
                className="relative text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent leading-tight break-words hyphens-auto px-2 transition-all duration-300"
                style={getDynamicTypographyStyle()}
              >
                {generatedName}
              </h2>
            )}
            <p className="relative text-base sm:text-lg text-muted-foreground font-medium text-pretty leading-relaxed px-2">
              {result}
            </p>
          </Card>
        )}

        {result && (
          <Card className="relative p-6 shadow-2xl border border-border/30 backdrop-blur-xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay rounded-3xl">
              <div
                className="w-full h-full animate-grain-slow"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "200px 200px",
                }}
              />
            </div>

            <p className="relative text-sm font-medium text-muted-foreground text-center mb-4">NFT Preview:</p>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-border/20">
              {generatedImage ? (
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt="NFT Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Generating preview...</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {walletAddress && (
          <Card className="p-6 shadow-2xl border border-border/30 backdrop-blur-xl bg-gradient-to-br from-card via-card to-card/95 rounded-3xl">
            <div className="mb-6 space-y-3">
              <p className="text-sm font-medium text-muted-foreground text-center mb-1">Mint Requirements:</p>
              <p className="text-base font-semibold text-center mb-4">
                Status:{" "}
                <span className={isEligible ? "text-green-500" : "text-destructive"}>{getEligibilityStatus()}</span>
              </p>

              <div
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  isSkinSatisfied ? "border-green-500/50 bg-green-500/10" : "border-border/30 bg-muted/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">$skin: 4,164,305</p>
                    <p className="text-xs text-muted-foreground">Burn to mint</p>
                  </div>
                  {isSkinSatisfied && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                </div>
              </div>

              {!isSkinSatisfied && (
                <div
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isByemoneySatisfied ? "border-green-500/50 bg-green-500/10" : "border-border/30 bg-muted/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">$byemoney: 1,000,000</p>
                      <p className="text-xs text-muted-foreground">Hold to mint</p>
                    </div>
                    {isByemoneySatisfied && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={mintNFT}
              disabled={isMinting || !isEligible}
              className="w-full h-14 text-base font-semibold shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {isMinting ? "Minting..." : "Mint NFT"}
            </Button>
            {mintError && <p className="text-sm text-destructive text-center mt-3">{mintError}</p>}
            {mintSuccess && <p className="text-sm text-success text-center mt-3">{mintSuccess}</p>}
          </Card>
        )}

        {tokenURI && (
          <Card className="p-6 shadow-2xl border border-accent/30 bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-3xl">
            <p className="text-sm font-medium text-muted-foreground text-center mb-4">
              {tokenId ? "Minting Successful!" : "Token URI Generated:"}
            </p>
            {tokenId && <p className="text-lg font-semibold text-foreground text-center mb-3">Token ID: {tokenId}</p>}
            <p className="text-xs font-medium text-muted-foreground text-center mb-2">Token URI:</p>
            <p className="text-sm font-mono text-foreground bg-card/50 p-4 rounded-lg break-all text-center">
              {tokenURI}
            </p>
          </Card>
        )}

        {nftMetadata && (
          <Card className="p-6 shadow-2xl border border-accent/30 bg-gradient-to-br from-card via-card to-card/95 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-3xl">
            <p className="text-sm font-medium text-muted-foreground text-center mb-4">NFT Metadata:</p>
            <pre className="text-sm font-mono text-muted-foreground bg-card/50 p-4 rounded-lg overflow-auto">
              {JSON.stringify(nftMetadata, null, 2)}
            </pre>
          </Card>
        )}
      </div>
    </div>
  )
}
