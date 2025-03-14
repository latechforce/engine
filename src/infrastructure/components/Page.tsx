import type { PageProps } from '/domain/entities/Page'

export const Page = ({ title, description, children }: PageProps) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
      </head>
      <body>{children}</body>
    </html>
  )
}
