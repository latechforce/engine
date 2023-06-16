import Image from 'next/image'
import Link from 'next/link'
import AppClient from '../src/client'

export default function NextAppClient({ path, config }) {
  return <AppClient customComponents={{ Image, Link }} path={path} config={config} />
}
