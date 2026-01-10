"use client"

import { OnchainKitProvider } from "@coinbase/onchainkit"
import { base } from "viem/chains"
import type { ReactNode } from "react"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { useEffect } from "react"

function ClientContent({ children }: { children: ReactNode }) {
  const { isFrameReady, setFrameReady } = useMiniKit()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [isFrameReady, setFrameReady])

  return <>{children}</>
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      chain={base}
      config={{
        appearance: {
          mode: "dark",
        },
      }}
      miniKit={{
        enabled: true,
      }}
    >
      <ClientContent>{children}</ClientContent>
    </OnchainKitProvider>
  )
}
