import Layout from '@theme/Layout'
import React, { useEffect, useRef, useState } from 'react'

export const PlaywrightReport = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState(800)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'iframeHeight') {
        setIframeHeight(event.data.height)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src="/playwright-report/index.html"
      title="Playwright Report"
      style={{ width: '100%', height: `${iframeHeight}px`, border: 'none' }}
    />
  )
}

export default function PlaywrightReportPage() {
  return (
    <Layout title="Test Report">
      <PlaywrightReport />
    </Layout>
  )
}
