import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import type { Props } from '@theme/BlogLayout'

export default function BlogLayout(props: Props): ReactNode {
  const { sidebar, toc, children, ...layoutProps } = props

  return (
    <Layout {...layoutProps}>
      <div className="container--fluid margin-vert--lg container">
        <div className="row">
          <main className={clsx('col', toc ? 'col--8 col--offset-1' : 'col--10 col--offset-1')}>
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  )
}
