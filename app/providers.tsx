'use client'

import { WagmiConfig, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { http } from 'viem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  // опционально: если нужно несколько транспортов или fallback
  // transports: {
  //   [base.id]: http('https://base-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'),
  // },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  )
}
