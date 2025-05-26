import fs from 'fs'
import { join } from 'path'

const websiteStaticPath = join(__dirname, '../..', 'website', 'static')

function updatePlaywrightReportHtml() {
  const reportPath = join(websiteStaticPath, 'playwright-report', 'index.html')
  let html = fs.readFileSync(reportPath, 'utf-8')
  const snipet = `<script>
    function postHeight(height) {
      window.parent.postMessage(
        {
          type: 'iframeHeight',
          height,
        },
        '*'
      )
    }

    const root = document.getElementById('root')
    if (root) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          postHeight(entry.contentRect.height)
        }
      })

      observer.observe(root)

      // Initial height
      postHeight(root.scrollHeight)
    }
    </script>`
  // To adapt the iframe height to the content
  html = html.replace('</body>', snipet + '</body>')
  // To display the report in full width
  html = html.replace(
    'body{overflow:auto;max-width:1024px;margin:0 auto;width:100%}',
    'body{overflow:hidden;margin:0 auto;width:100%;padding-top:8px}'
  )
  fs.writeFileSync(reportPath, html)
}

updatePlaywrightReportHtml()
