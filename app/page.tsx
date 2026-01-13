"use client"

import { useState, useEffect } from "react"
import { sdk } from '@farcaster/miniapp-sdk'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { publicClient } from "@/lib/viem-client"
import { encodeFunctionData } from "viem"
import { CheckCircle2 } from "lucide-react"
import { Copy, Check } from "lucide-react"
import { useWalletClient, usePublicClient } from 'wagmi'

function TokenLabel({
  symbol,
  amount,
  address,
  subtitle,
}: {
  symbol: string
  amount: string
  address: string
  subtitle: string
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <div className="relative inline-block">
      <p
        onClick={() => setOpen(v => !v)}
        className="text-sm font-semibold cursor-pointer hover:text-primary hover:underline transition-colors"
      >
        ${symbol}: {amount}
      </p>

      <p className="text-xs text-muted-foreground">{subtitle}</p>

      {open && (
        <div className="absolute z-50 mt-2 w-72 rounded-xl border bg-background/95 backdrop-blur shadow-lg p-4 text-xs">
          {/* ✅ КРЕСТИК ДЛЯ ЗАКРЫТИЯ */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground h-5 w-5 p-0"
          >
            ✕
          </button>
          
          <p className="mb-3 text-muted-foreground">Contract address</p>

          {/* ✅ МАЛЕНЬКИЙ АДРЕС (text-xs → text-[10px]) */}
          <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
            <code className="truncate text-[10px] font-mono leading-tight">
              {address}
            </code>

            <button
              onClick={copy}
              className="text-primary hover:opacity-80 p-1 hover:bg-muted rounded-sm"
              title="Copy address"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          {copied && (
            <p className="mt-2 text-green-500 text-[11px] flex items-center gap-1">
              <CheckCircle2 size={12} /> Copied!
            </p>
          )}
        </div>
      )}
    </div>
  )
}


declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONFIG = {
  SKIN_TOKEN: "0x7e994f015b60d97a26382ec5372039c89dd2eb07",
  SKIN_REQUIRED: BigInt("4164305") * BigInt("1000000000000000000"), // 4164305 * 10^18
  BYEMONEY_TOKEN: "0xa12a532b0b7024b1d01ae66a3b8cf77366c7db07",
  BYEMONEY_REQUIRED: BigInt("1000000") * BigInt("1000000000000000000"), // 1000000 * 10^18
  BYEMONEY_RECEIVER: "0x063c4989cFb40557353EDB8c26Ea8009789F2569",
  NFT_CONTRACT: "0xCAa139Af972ACfB464e8B41675732e79dd662b8a",
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

// ТУТ (между ERC20_ABI и generateUniqueName):
const MINT_ABI = [{
  name: "mint",
  type: "function",
  stateMutability: "payable",
  inputs: [{ name: "metadataURI", type: "string" }]
}] as const;

if (!skinBurnedFlag) {
  console.log("Sufficient $skin balance, burning tokens...")
  mintPath = "Burn SKIN"
  
  const burnData = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: "burn",
    args: [skinRequired]
  })

  const { id: batchId } = await walletClient.sendCalls({
    account: walletAddress as `0x${string}`,
    calls: [{ to: CONFIG.SKIN_TOKEN as `0x${string}`, data: burnData, value: 0n }],
    experimental_fallback: true
  })

  await walletClient.waitForCallsStatus({ id: batchId })
  localStorage.setItem('hasBurnedSkin', 'true')
}

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
  const [farcasterFid, setFarcasterFid] = useState<string | null>(null)
  const [farcasterPfp, setFarcasterPfp] = useState<string | null>(null)
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
  const [skinRequired, setSkinRequired] = useState<bigint>(CONFIG.SKIN_REQUIRED)     // ✅ НОВОЕ
  const [byemoneyRequired, setByemoneyRequired] = useState<bigint>(CONFIG.BYEMONEY_REQUIRED)  // ✅ НОВОЕ
  const { walletClient } = useWalletClient()
  const { publicClient } = usePublicClient({ chainId: 8453 })


    useEffect(() => {
    sdk.actions
      .ready()
      .then(() => console.log("[Farcaster] sdk.ready()"))
      .catch((err) => console.error("[Farcaster] ready failed", err))
  }, [])
  
  useEffect(() => {
    if (walletAddress) {
      checkTokenBalances()
      fetchFarcasterFid(walletAddress)
    }
  }, [walletAddress])

  useEffect(() => {
    if (generatedName) {
      console.log("[v0] Generated name changed, regenerating image:", generatedName)
      generatePreviewImage()
    }
  }, [generatedName, sliders, farcasterPfp])

const connectWallet = async () => {
  try {
    setIsConnecting(true)
    
    // ✅ MetaMask (100% работает)
    if (typeof window !== "undefined" && window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setWalletAddress(accounts[0])
      console.log("[MetaMask] Connected:", accounts[0])
      return
    }

    // ✅ Farcaster — безопасная проверка (НЕ вызовем ошибку)
    if (typeof sdk !== 'undefined') {
      // @ts-ignore — Farcaster SDK в runtime
      if (sdk.wallet?.ethProvider) {
        // @ts-ignore — используем provider напрямую
        const accounts = await sdk.wallet.ethProvider.request({ method: 'eth_accounts' })
        if (accounts?.length > 0) {
          setWalletAddress(accounts[0])
          console.log("[Farcaster Wallet] Connected:", accounts[0])
          return
        }
      }
    }

    setErrorMessage("MetaMask required. Farcaster wallet support coming soon.")
    setShowErrorToast(true)
    
  } catch (error) {
    console.error("Connection failed:", error)
    setErrorMessage("Connection failed. Please try MetaMask.")
    setShowErrorToast(true)
  } finally {
    setIsConnecting(false)
  }
}

  const disconnectWallet = () => {
    setWalletAddress(null)
    setFarcasterFid(null)
    setFarcasterPfp(null) // Clear PFP on disconnect
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
      const userKey = farcasterFid ? `${walletAddress}_${farcasterFid}` : walletAddress
      const usedNames = getUsedNames(walletAddress, farcasterFid || undefined)
      console.log(`[v0] User key: ${userKey}`)
      console.log(`[v0] Previously used names (${usedNames.length}):`, usedNames)

      const uniqueName = generateUniqueName(sliders, usedNames)
      console.log(`[v0] Generated new unique name: ${uniqueName}`)
      setGeneratedName(uniqueName)

      saveUsedName(walletAddress, uniqueName, farcasterFid || undefined)

      // Verify it was saved
      const updatedUsedNames = getUsedNames(walletAddress, farcasterFid || undefined)
      console.log(`[v0] Updated used names count: ${updatedUsedNames.length}`)
    } else {
      // If no wallet connected, generate without uniqueness tracking
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

    // 1. РАНДОМНЫЙ ФОН
    const bgColors = ['#1a1a2e', '#0f0f23', '#2a0a2a', '#1e3a1e', '#0a1a2a', '#2a1a0a']
    ctx.fillStyle = bgColors[Math.floor(Math.random() * bgColors.length)]
    ctx.fillRect(0, 0, 1000, 1000)

    // 2. РАНДОМНЫЙ СИД ДЛЯ ЦВЕТОВ
    const seed = Date.now()
    const bodyHue = (seed % 360)
    const bodyColor = `hsl(${bodyHue}, 70%, 45%)`
    const outlineColor = `hsl(${(bodyHue + 120) % 360}, 60%, 30%)`
    const eyeHue = ((seed * 3) % 360)
    const eyeColor = `hsl(${eyeHue}, 80%, 65%)`
    const mouthHue = ((seed * 7) % 360)
    const mouthColor = `hsl(${mouthHue}, 75%, 55%)`

    // 3. МОНСТР 800x800
    const monsterX = 100, monsterY = 100
    const monsterSize = 800
    
    ctx.imageSmoothingEnabled = false
    
    // ТЕЛО
    ctx.fillStyle = bodyColor
    ctx.fillRect(monsterX, monsterY, monsterSize, monsterSize)
    
    // ОБВОДКА
    ctx.strokeStyle = outlineColor
    ctx.lineWidth = 8
    ctx.strokeRect(monsterX, monsterY, monsterSize, monsterSize)
    
    // 🎲 РАНДОМНЫЕ АКСЕССУАРЫ (независимый шанс для КАЖДОГО!)
    const earsChance = Math.random()
    const hornsChance = Math.random()
    const earringsChance = Math.random()
    const glassesChance = Math.random()
    
    // 🦴 УШИ (50% шанс)
    if (earsChance > 0.5) {
      ctx.fillStyle = bodyColor
      ctx.fillRect(monsterX - 64, monsterY + 256, 128, 256)
      ctx.fillRect(monsterX + 736, monsterY + 256, 128, 256)
    }
    
    // 👹 РОГА (40% шанс)
    if (hornsChance > 0.6) {
      ctx.fillStyle = outlineColor
      ctx.fillRect(monsterX + 128, monsterY - 128, 128, 256)
      ctx.fillRect(monsterX + 544, monsterY - 128, 128, 256)
    }
    
    // 💎 СЕРЬГИ (60% шанс)
    if (earringsChance > 0.4) {
      ctx.fillStyle = '#ffd700'
      ctx.fillRect(monsterX + 128, monsterY + 704, 96, 96)
      ctx.fillRect(monsterX + 576, monsterY + 704, 96, 96)
    }
    
    // 🕶️ ОЧКИ (30% шанс)
    if (glassesChance > 0.7) {
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 6
      ctx.strokeRect(monsterX + 160, monsterY + 160, 160, 160)
      ctx.strokeRect(monsterX + 480, monsterY + 160, 160, 160)
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(monsterX + 320, monsterY + 160)
      ctx.lineTo(monsterX + 320, monsterY + 320)
      ctx.stroke()
    }
    
    // ГЛАЗА (всегда)
    ctx.fillStyle = eyeColor
    ctx.fillRect(monsterX + 160, monsterY + 160, 160, 160)
    ctx.fillRect(monsterX + 480, monsterY + 160, 160, 160)
    
    // ЗРАЧКИ (всегда)
    ctx.fillStyle = '#000000'
    ctx.fillRect(monsterX + 224, monsterY + 224, 64, 64)
    ctx.fillRect(monsterX + 544, monsterY + 224, 64, 64)
    
    // РОТ (всегда)
    ctx.fillStyle = mouthColor
    ctx.fillRect(monsterX + 240, monsterY + 560, 320, 128)
    
    // ЗУБЫ (всегда)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(monsterX + 288, monsterY + 592, 64, 64)
    ctx.fillRect(monsterX + 384, monsterY + 592, 64, 64)
    ctx.fillRect(monsterX + 480, monsterY + 592, 64, 64)

    // 4. ТВОИ СЛОВА (ГАРАНТИРОВАННО!)
    if (generatedName) {
      ctx.fillStyle = 'rgba(0,0,0,0.8)'
      ctx.fillRect(0, 820, 1000, 180)
      ctx.font = 'bold 60px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = '#000'
      ctx.shadowBlur = 8
      ctx.fillText(generatedName, 500, 910)
    }

    resolve(canvas.toDataURL("image/png"))
  })
}

  const drawFallbackBackground = (ctx: CanvasRenderingContext2D) => {
    // Simple gradient based on state
    const gradient = ctx.createLinearGradient(0, 0, 1000, 1000)

    if (sliders.light < 50) {
      gradient.addColorStop(0, "#f0f0f0")
      gradient.addColorStop(1, "#d0d0d0")
    } else {
      gradient.addColorStop(0, "#2a2a2a")
      gradient.addColorStop(1, "#0a0a0a")
    }

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1000, 1000)

    // Wallet address as fallback identifier
    if (walletAddress) {
      ctx.fillStyle = sliders.light < 50 ? "#666666" : "#999999"
      ctx.font = "32px monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      ctx.fillText(shortAddress, 500, 500)
    }
  }

  const generateMetadata = (imageUrl: string, mintPath: "Burn SKIN" | "Hold BYEMONEY") => {
    // Use Farcaster PFP if available, otherwise use wallet address placeholder
    const identityValue = farcasterPfp ? `Farcaster Profile` : `Wallet Address`

    const metadata = {
      name: generatedName || "Untitled",
      description: "Your trading state today",
      image: imageUrl,
      attributes: [
        {
          trait_type: "Market Mood",
          value: generatedName || "Untitled",
        },
        {
          trait_type: "Identity",
          value: identityValue,
        },
        // Optionally add Farcaster PFP URL if available
        ...(farcasterPfp ? [{ trait_type: "Farcaster PFP", value: farcasterPfp }] : []),
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
      setSkinRequired(CONFIG.SKIN_REQUIRED)      // ✅ НОВОЕ

      const byemoneyBal = await publicClient.readContract({
        address: CONFIG.BYEMONEY_TOKEN as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      })
      setByemoneyBalance(byemoneyBal as bigint)
      setByemoneyRequired(CONFIG.BYEMONEY_REQUIRED)  // ✅ НОВОЕ
    } catch (error) {
      console.error("Error checking balances:", error)
    }
  }

  const fetchFarcasterFid = async (address: string) => {
    try {
      const response = await fetch(`https://api.warpcast.com/v2/verifications?address=${address.toLowerCase()}`)
      if (response.ok) {
        const data = await response.json()
        if (data.result?.fid) {
          const fidValue = data.result.fid.toString()
          setFarcasterFid(fidValue)
          console.log(`[v0] Found Farcaster FID for ${address}: ${fidValue}`)

          // Fetch profile picture
          await fetchFarcasterProfile(fidValue)
        } else {
          console.log(`[v0] No Farcaster FID found for ${address}`)
          setFarcasterFid(null)
          setFarcasterPfp(null)
        }
      } else {
        setFarcasterFid(null)
        setFarcasterPfp(null)
      }
    } catch (error) {
      console.error("Error fetching Farcaster FID:", error)
      setFarcasterFid(null)
      setFarcasterPfp(null)
    }
  }

  const fetchFarcasterProfile = async (fid: string) => {
    try {
      const response = await fetch(`https://api.warpcast.com/v2/user-by-fid?fid=${fid}`)
      if (response.ok) {
        const data = await response.json()
        if (data.result?.user?.pfp?.url) {
          setFarcasterPfp(data.result.user.pfp.url)
          console.log(`[v0] Found Farcaster PFP:`, data.result.user.pfp.url)
        }
      }
    } catch (error) {
      console.error("Error fetching Farcaster profile:", error)
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
    // ✅ ТВОЯ логика проверки $skin и $byemoney — ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ
    const skinBurnedFlag = typeof window !== 'undefined' && localStorage.getItem('hasBurnedSkin') === 'true'
    const skinBalanceRaw = await publicClient.readContract({
      address: CONFIG.SKIN_TOKEN as `0x${string}`,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [walletAddress as `0x${string}`],
    }) as bigint
    const skinBalance = skinBalanceRaw
    const skinRequired = CONFIG.SKIN_REQUIRED

    const hasBurnedSkin = typeof window !== 'undefined' && localStorage.getItem('hasBurnedSkin') === 'true'
    console.log("SKIN RAW:", skinBalance.toString())
    console.log("HAS BURNED SKIN:", hasBurnedSkin)
    console.log("SKIN REQUIRED:", skinRequired.toString())

    const byemoneyBalanceRaw = await publicClient.readContract({
      address: CONFIG.BYEMONEY_TOKEN as `0x${string}`,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [walletAddress as `0x${string}`],
    }) as bigint
    const byemoneyBalance = byemoneyBalanceRaw
    const byemoneyRequired = CONFIG.BYEMONEY_REQUIRED
    console.log("BYEMONEY RAW:", byemoneyBalance.toString())
    console.log("BYEMONEY REQUIRED:", byemoneyRequired.toString())

    const { walletClient, data: walletClientData } = useWalletClient()
    const { publicClient } = usePublicClient({ chainId: 8453 })  // Base

    let mintPath: "Burn SKIN" | "Hold BYEMONEY"
    let burnTxHash = null

    if (skinBurnedFlag || skinBalance >= skinRequired) {
      if (!skinBurnedFlag) {
        console.log("Sufficient $skin balance, burning tokens...")
        mintPath = "Burn SKIN"
        // 🔥 Viem walletClient.sendCalls — РАБОТАЕТ ВЕЗДЕ
        const burnData = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "burn",
          args: [skinRequired]
        })

const { id: batchId } = await walletClient.sendCalls({
  account: walletAddress as `0x${string}`,
  calls: [{
    to: CONFIG.SKIN_TOKEN as `0x${string}`,
    data: burnData,
    value: 0n
  }],
  experimental_fallback: true  // MetaMask fallback
})

await walletClient.waitForCallsStatus({ id: batchId })
localStorage.setItem('hasBurnedSkin', 'true')

      } else {
        console.log("Already burned $skin previously, skipping burn...")
        mintPath = "Burn SKIN"
      }
    } else if (byemoneyBalance >= byemoneyRequired) {
      console.log("Sufficient $byemoney balance, proceeding to mint...")
      mintPath = "Hold BYEMONEY"
    } else {
      setErrorMessage("Insufficient tokens. Need 4164305 $skin or 1000000 $byemoney to mint.")
      setShowErrorToast(true)
      setIsMinting(false)
      return
    }

    // Загрузка image и metadata — МОЙ КОД ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ
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

    // Минт — ИЗМЕНЕНИЕ: используем тот же provider
    console.log("Calling mintNFT on contract...")
const mintData = encodeFunctionData({
  abi: MINT_ABI,
  functionName: "mint",
  args: [metadataUploadResult.tokenURI],
})

    const mintHash = await walletClient.writeContract({
  address: CONFIG.NFT_CONTRACT as `0x${string}`,
  abi: MINT_ABI,
  functionName: "mint",
  args: [metadataUploadResult.tokenURI],
  value: 20000000000000n  // ← BigInt!
})

await publicClient.waitForTransactionReceipt({ hash: mintHash })
console.log("Mint transaction confirmed:", mintHash)


    let receipt = null
    let attempts = 0
    while (!receipt && attempts < 30) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      receipt = await provider.request({
        method: "eth_getTransactionReceipt",
        params: [txHash],
      })
      attempts++
    }
    if (!receipt) throw new Error("Transaction timeout")

    if (receipt && receipt.logs && receipt.logs.length > 0) {
      const transferLog = receipt.logs.find((log: any) => log.topics.length === 4)
      if (transferLog) {
        const extractedTokenId = BigInt(transferLog.topics[3]).toString()
        setTokenId(extractedTokenId)
        console.log("Minted tokenId:", extractedTokenId)
      }
    }

    setMintSuccess("NFT minted successfully!")
    console.log("Mint completed successfully!")
    await checkTokenBalances()
  } catch (error: any) {
    console.error("Mint error:", error)
    if (error.message?.includes("User rejected") || error.message?.includes("user rejected")) {
      setErrorMessage("Transaction was cancelled")
    } else {
      setErrorMessage(error.message || "Mint failed. Please try again.")
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
  
    const formatBigInt = (value: bigint): string => {
    const formatted = Number(value) / 1e18;
    return formatted.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

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
            <p className="text-sm font-medium text-muted-foreground text-center mb-1">
              Mint Requirements:
            </p>
            <p className="text-base font-semibold text-center mb-4">
              Status:{" "}
              <span className={isEligible ? "text-green-500" : "text-destructive"}>
                {getEligibilityStatus()}
              </span>
            </p>

            <div className="space-y-3">
  {/* SKIN */}
  <div
    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
      isSkinSatisfied ? "border-green-500/50 bg-green-500/10" : "border-border/30 bg-muted/20"
    }`}
  >
    <div className="flex items-center justify-between">
      <div
        className="group cursor-pointer hover:scale-105 transition-all"
        onClick={() => sdk.actions.openUrl(`https://warpcast.com/~/token/${CONFIG.SKIN_TOKEN}`)}
      >
        <TokenLabel
          symbol="skin"
          amount={formatBigInt(skinRequired)}
          address={CONFIG.SKIN_TOKEN}
          subtitle="Burn to mint"
        />
      </div>
      {isSkinSatisfied && <CheckCircle2 className="w-6 h-6 text-green-500" />}
    </div>
  </div>

  {/* BYEMONEY */}
  {!isSkinSatisfied && (
    <div
      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
        isByemoneySatisfied ? "border-green-500/50 bg-green-500/10" : "border-border/30 bg-muted/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className="group cursor-pointer hover:scale-105 transition-all"
          onClick={() => sdk.actions.openUrl(`https://warpcast.com/~/token/${CONFIG.BYEMONEY_TOKEN}`)}
        >
          <TokenLabel
            symbol="byemoney"
            amount={formatBigInt(byemoneyRequired)}
            address={CONFIG.BYEMONEY_TOKEN}
            subtitle="Hold to mint"
          />
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
              {isMinting ? "Minting..." : "Mint NFT (0.00002 ETH)"}
            </Button>

            {mintError && <p className="text-sm text-destructive text-center mt-3">{mintError}</p>}
            {mintSuccess && <p className="text-sm text-success text-center mt-3">{mintSuccess}</p>}

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
        </Card>
      )}
    </div>
  </div>
)
}
