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
              <h1>Schema Explorer</h1>
              <p>
                This is the schema of the app. You can navigate through the schema to see the
                different properties and their descriptions.
              </p>
              <JSONSchemaViewer schema={Schema} />
              <p>
                The JSON Schema source is available at{' '}
                <a
                  href="/schema/app.schema.json"
                  target="_blank"
                >
                  /schema/app.schema.json
                </a>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
