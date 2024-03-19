import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'

const cardVariants = cva(
  'rounded-md border border-b border-zinc-300/50 bg-card text-card-foreground shadow bg-white max-w-5xl',
  {
    variants: {
      variant: {
        destructive: 'border-red-300/20',
      },
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={clsx(cardVariants({ variant, className }))} {...props} />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex flex-col p-6 border-b border-zinc-300/50', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={clsx('font-semibold leading-none tracking-tight text-xl', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={clsx('text-sm text-muted-foreground', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const cardContentVariants = cva('p-6', {
  variants: {
    variant: {
      destructive: 'bg-red-500/10 rounded-b-md',
    },
  },
})
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={clsx(cardContentVariants({ variant, className }))} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const cardFooterVariants = cva(
  'flex items-center p-6 border-t border-zinc-300/50 rounded-b-md bg-accent',
  {
    variants: {
      variant: {
        destructive: 'bg-red-500/10',
      },
    },
  }
)

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={clsx(cardFooterVariants({ className, variant }))} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
