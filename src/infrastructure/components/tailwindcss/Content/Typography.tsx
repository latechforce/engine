import type { TypographyProps } from '/domain/components/Content/Typography'

export function Typography({ variant, children }: TypographyProps) {
  switch (variant) {
    case 'h1':
      return <h1 className="p-6 text-4xl dark:text-white">{children}</h1>
    case 'h2':
      return <h2 className="p-6 text-3xl dark:text-white">{children}</h2>
    case 'h3':
      return <h3 className="p-6 text-2xl dark:text-white">{children}</h3>
  }
}
