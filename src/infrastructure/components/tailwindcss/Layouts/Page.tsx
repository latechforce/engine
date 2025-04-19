import type { PageProps } from '../../../../domain/components/Layouts/Page'

export const Page = ({ title, description, children, timestamp }: PageProps) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
        <link href={`/style.css?ts=${timestamp}`} rel="stylesheet" />
        <script src={`/style.js?ts=${timestamp}`}></script>
        <script src={`/script.js?ts=${timestamp}`}></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
