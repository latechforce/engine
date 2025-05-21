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
      style={{
        width: 'calc(100% + 48px)',
        height: `${iframeHeight}px`,
        border: 'none',
        margin: '0 -24px',
      }}
    />
  )
}

export default function PlaywrightReportPage() {
  return (
    <Layout title="Test Report">
      <div className="main-wrapper">
        <main className="margin-vert--lg container">
          <div className="row">
            <div className="col">
              <h1>Test Report</h1>
              <PlaywrightReport />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
