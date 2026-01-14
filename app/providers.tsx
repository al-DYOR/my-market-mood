'use client'

import { WagmiConfig, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { http } from 'viem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const config = createConfig({
  // chains убрали — Wagmi берёт их из transports
  transports: {
    [base.id]: http(),  // ← только это обязательно
  },
  // опционально: если нужно явно указать цепочки для автодетекта
  // chains: [base],
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
