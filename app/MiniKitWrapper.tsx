"use client"

import { useEffect } from "react"
import { sdk } from "@farcaster/miniapp-sdk"

export default function MiniKitWrapper() {
  useEffect(() => {
    sdk.actions
      .ready()
      .then(() => {
        console.log("[Farcaster] Mini App ready")
      })
      .catch((err) => {
        console.error("[Farcaster] sdk.ready() failed", err)
      })
  }, [])

  return null
}
