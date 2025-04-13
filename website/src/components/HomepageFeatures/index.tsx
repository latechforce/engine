import type { ReactNode } from 'react'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  description: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    description: (
      <>
        Engine was designed from the ground up to be easily installed and used to get your app up
        and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    description: <>Engine lets you focus on your domain logic, not the infrastructure. </>,
  },
  {
    title: 'Powered by Bun',
    description: (
      <>Run your app with Bun. Engine is built with Bun and uses Bun for the build process.</>
    ),
  },
]

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
