import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const inputVariants = {
  default: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
}

function Input({
  className,
  asChild = false,
  variant = 'default',
  size = 'default',
  ...props
}: React.ComponentProps<'input'> & {
  asChild?: boolean
  variant?: keyof typeof inputVariants
  size?: keyof typeof inputVariants
}) {
  const Comp = asChild ? Slot : 'input'
  const inputClass = typeof inputVariants[variant] === 'string' 
    ? inputVariants[variant] 
    : inputVariants.default

  return (
    <Comp
      data-slot="input"
      className={cn(inputClass, inputVariants[size], className)}
      {...props}
    />
  )
}

export { Input }
