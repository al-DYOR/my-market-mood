Create a new file app/MiniKitWrapper.tsx as a client component with "use client" at the top.
Import OnchainKitProvider from '@coinbase/onchainkit'
Import { useMiniKit } from '@coinbase/onchainkit/minikit'
Import { base } from 'viem/chains'
Import useEffect from 'react'
Import '@coinbase/onchainkit/styles.css'  // for any necessary styles, but it won't break UI

Make the component export function MiniKitWrapper({ children }: { children: React.ReactNode }) {
  const miniKit = useMiniKit()

  useEffect(() => {
    if (miniKit && !miniKit.isFrameReady) {
      miniKit.setFrameReady()
    }
  }, [miniKit])

  return (
    <OnchainKitProvider
      chain={base}
      rpcUrl="https://mainnet.base.org"  // public free RPC, no api key needed
      miniKit={{ enabled: true }}
    >
      {children}
    </OnchainKitProvider>
  )
}
