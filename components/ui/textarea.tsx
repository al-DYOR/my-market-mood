import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const textareaVariants = {
  default: 'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]',
}

function Textarea({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'textarea'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'textarea'
  
  return (
    <Comp
      data-slot="textarea"
      className={cn(textareaVariants.default, className)}
      {...props}
    />
  )
}

export { Textarea }
