import React, { type ReactNode } from 'react'
import type { Props } from '@theme/BlogPostItem/Container'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'

export default function BlogPostItemContainer({ children, className }: Props): ReactNode {
  const { isBlogPostPage } = useBlogPost()
  const style: React.CSSProperties = {
    marginBottom: '2rem',
  }
  if (!isBlogPostPage) {
    style.border = '1px solid var(--ifm-color-emphasis-300)'
    style.borderRadius = '10px'
    style.padding = '1rem'
    style.backgroundColor = 'var(--ifm-color-emphasis-0)'
  }
  return (
    <article
      className={className}
      style={style}
    >
      {children}
    </article>
  )
}
