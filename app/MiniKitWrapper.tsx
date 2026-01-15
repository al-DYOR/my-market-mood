"use client"
import { useEffect } from "react"
import { sdk } from "@farcaster/miniapp-sdk"  // ← для Farcaster
import { useMiniKit } from "@coinbase/onchainkit/minikit"  // ← для Base app!

export default function MiniKitWrapper() {
  const { setFrameReady, isFrameReady } = useMiniKit()

  useEffect(() => {
    // Farcaster / Warpcast — оригинал
    if (typeof sdk !== 'undefined') {
      sdk.actions
        .ready()
        .then(() => {
          console.log("[Farcaster] Mini App ready")
        })
        .catch((err) => {
          console.error("[Farcaster] sdk.ready() failed", err)
        })
    }

    // Base App + общая готовность
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  return null
}
