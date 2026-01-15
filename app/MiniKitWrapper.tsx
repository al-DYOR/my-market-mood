"use client"
import { useEffect } from "react"
import { sdk } from "@farcaster/miniapp-sdk"  // ← остаётся!
import { useMiniKit } from "@coinbase/onchainkit"  // ← правильный путь

export default function MiniKitWrapper() {
  const { setFrameReady, isFrameReady } = useMiniKit()

  useEffect(() => {
    // Farcaster / Warpcast — оригинальный вызов, не меняем
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

    // Base App + общая готовность (OnchainKit должен понять контекст)
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  return null
}
