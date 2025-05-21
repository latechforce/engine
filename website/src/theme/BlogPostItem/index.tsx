import React, { type ReactNode } from 'react'
import BlogPostItemContainer from '@theme/BlogPostItem/Container'
import BlogPostItemHeader from '@theme/BlogPostItem/Header'
import BlogPostItemContent from '@theme/BlogPostItem/Content'
import type { Props } from '@theme/BlogPostItem'

export default function BlogPostItem({ children, className }: Props): ReactNode {
  return (
    <BlogPostItemContainer className={className}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
    </BlogPostItemContainer>
  )
}
