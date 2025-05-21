import fs from 'fs'
import { join } from 'path'

function updatePlaywrightReportHtml() {
  const reportPath = join(__dirname, '..', 'website', 'static', 'playwright-report', 'index.html')
  const html = fs.readFileSync(reportPath, 'utf-8')
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
  fs.writeFileSync(reportPath, html.replace('</body>', snipet + '</body>'))
}

updatePlaywrightReportHtml()
