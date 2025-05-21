import React, { type ReactNode } from 'react'
import type { Props } from '@theme/BlogPostItem/Container'
import { useBlogPost } from '@docusaurus/plugin-content-blog/client'
import clsx from 'clsx'

import styles from './styles.module.css'
import Link from '@docusaurus/Link'

export default function BlogPostItemContainer({ children, className }: Props): ReactNode {
  const { isBlogPostPage, metadata } = useBlogPost()
  const { permalink } = metadata
  const style: React.CSSProperties = {
    marginBottom: '2rem',
  }
  let classes = className
  if (!isBlogPostPage) {
    classes = clsx(styles.card, className)
  }
  return (
    <Link
      to={permalink}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <article
        className={classes}
        style={style}
      >
        {children}
      </article>
    </Link>
  )
}
