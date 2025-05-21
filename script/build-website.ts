import { appValidator } from '@/infrastructure/validator/app.validator'
import fs from 'fs'
import { join } from 'path'
import { z } from 'zod/v4'

const websiteStaticPath = join(__dirname, '..', 'website', 'static')

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
  html = html.replace('max-width: 1024px;', '')
  fs.writeFileSync(reportPath, html)
}

function createAppJsonSchema() {
  const schemaPath = join(websiteStaticPath, 'schema', 'app.schema.json')
  const schema = z.toJSONSchema(appValidator)
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2))
}

updatePlaywrightReportHtml()
createAppJsonSchema()
