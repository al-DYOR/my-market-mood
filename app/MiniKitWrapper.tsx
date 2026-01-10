"use client"

import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base } from 'viem/chains'
import { useEffect } from 'react'
import '@coinbase/onchainkit/styles.css'

export function MiniKitWrapper({ children }: { children: React.ReactNode }) {
  const miniKit = useMiniKit()

 useEffect(() => {
  console.log("MiniKit useEffect triggered, isFrameReady:", miniKit?.isFrameReady)
  if (miniKit && !miniKit.isFrameReady) {
    console.log("Calling setFrameReady()")
    miniKit.setFrameReady()
  }
}, [miniKit])

  return (
    <OnchainKitProvider
      chain={base}
      rpcUrl="https://mainnet.base.org"
      miniKit={{ enabled: true }}
    >
      {children}
    </OnchainKitProvider>
  )
}
