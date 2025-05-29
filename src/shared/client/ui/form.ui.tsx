import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/shared/client/lib/utils.lib'
import { Label } from '@/shared/client/ui/label.ui'
import { Skeleton } from './skeleton.ui'

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

function FormSkeleton({ fields = 3, className }: { fields?: number; className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div
          key={i}
          className="grid gap-2"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      ))}
    </div>
  )
}

export { FormItem, FormLabel, FormDescription, FormMessage, FormSkeleton }
