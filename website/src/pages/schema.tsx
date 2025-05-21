import Schema from '@site/static/schema/app.schema.json'
// @ts-expect-error JSONSchemaViewer is not typed
import JSONSchemaViewer from '@theme/JSONSchemaViewer'
import Layout from '@theme/Layout'

export default function AppSchemaPage() {
  return (
    <Layout title="Schema">
      <div className="main-wrapper">
        <main className="margin-vert--lg container">
          <div className="row">
            <div className="col">
              <h1>Schema</h1>
              <p>
                Source :{' '}
                <a
                  href="/schema/app.schema.json"
                  target="_blank"
                >
                  app.schema.json
                </a>
              </p>
              <JSONSchemaViewer schema={Schema} />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
