import type { PageProps } from '/domain/components/Layouts/Page'

export const Page = ({ title, description, children, cssFiles, jsFiles }: PageProps) => {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
        {cssFiles.map((cssFile, index) => (
          <link key={index} href={cssFile} rel="stylesheet" />
        ))}
        {jsFiles.map((jsFile, index) => (
          <script key={index} src={jsFile}></script>
        ))}
      </head>
      <body>
        <div className="min-h-screen bg-white dark:bg-black">{children}</div>
      </body>
    </html>
  )
}
