import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/client/lib/utils.lib'
import { Label } from '@/client/ui/label.ui'

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('grid gap-2', className)}
      {...props}
    />
  )
}

function FormLabel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  if (!children) {
    return null
  }
  return (
    <Label
      className={cn('data-[error=true]:text-destructive', className)}
      {...props}
    >
      {children}
    </Label>
  )
}

function FormDescription({ className, children, ...props }: React.ComponentProps<'p'>) {
  if (!children) {
    return null
  }
  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    >
      {children}
    </p>
  )
}

function FormMessage({ className, children, ...props }: React.ComponentProps<'p'>) {
  if (!children) {
    return null
  }
  return (
    <p
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export { FormItem, FormLabel, FormDescription, FormMessage }
