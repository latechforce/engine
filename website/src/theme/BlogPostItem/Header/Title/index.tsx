import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import type { Props } from '@theme/BlogPostItem/Header/Title'

import styles from './styles.module.css'

export default function BlogPostItemHeaderTitle({ className }: Props): ReactNode {
  const { metadata, isBlogPostPage } = useBlogPost()
  const { title } = metadata
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2'
  return (
    <TitleHeading className={clsx(!isBlogPostPage ? styles.title : '', className)}>
      {isBlogPostPage ? title : <span style={{ color: 'var(--ifm-link-color)' }}>{title}</span>}
    </TitleHeading>
  )
}
