import BunTester, { test, expect } from 'bun:test'
import { Mock } from './Mock'

test('should instanciate Mock with Bun', async () => {
  // WHEN
  const mock = new Mock(BunTester)

  // THEN
  expect(mock).toBeDefined()
})

const mock = new Mock(BunTester)

// GIVEN
mock.request(({ app, request }) => {
  // WHEN
  test('should have a provided app', () => {
    // THEN
    expect(app).toBeDefined()
  })

  // WHEN
  test('should have a provided request', () => {
    // THEN
    expect(request.get).toBeDefined()
  })

  test('should not connect to an integration if not provided', () => {
    // THEN
    const call = async () =>
      app.start({
        name: 'App',
        automations: [
          {
            name: 'test',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'test',
            },
            actions: [
              {
                name: 'test',
                integration: 'Qonto',
                action: 'RetrieveAttachment',
                account: 'qonto',
                attachmentId: 'test',
              },
            ],
          },
        ],
        integrations: {
          qonto: [
            {
              account: 'qonto',
              baseUrl: ':memory:',
              secretKey: 'test',
              organisationSlug: 'test',
            },
          ],
        },
      })

    // THEN
    expect(call()).rejects.toThrow('Test connection failed')
  })
})

// GIVEN
mock.page(({ app, browser }) => {
  // WHEN
  test('should have a provided app', async () => {
    // THEN
    expect(app).toBeDefined()
  })

  // WHEN
  test('should have a provided headless page', async () => {
    // THEN
    expect(browser.newPage).toBeDefined()
    const page = await browser.newPage()
    expect(page.goto).toBeDefined()
  })

  // WHEN
  test('should have a provided non-headless page', async () => {
    // THEN
    const page = await browser.newPage({ headless: false })
    expect(page.goto).toBeDefined()
  })
})

const mockDatabase = new Mock(BunTester, { drivers: ['Database'] })

// GIVEN
mockDatabase.app(({ drivers }) => {
  // WHEN
  test('should have a Database driver', () => {
    // THEN
    expect(drivers.database).toBeDefined()
  })
})

const mockStorage = new Mock(BunTester, { drivers: ['Database', 'Storage'] })

// GIVEN
mockStorage.app(({ drivers }) => {
  // WHEN
  test('should have a Database and a Storage driver', () => {
    // THEN
    expect(drivers.database).toBeDefined()
    expect(drivers.storage).toBeDefined()
  })
})

const mockFetcher = new Mock(BunTester, { drivers: ['Fetcher'] })

// GIVEN
mockFetcher.app(({ drivers }) => {
  // WHEN
  test('should have a Fetcher driver', () => {
    // THEN
    expect(drivers.fetcher).toBeDefined()
  })
})

const mockAirtable = new Mock(BunTester, { integrations: ['Airtable'] })

// GIVEN
mockAirtable.app(({ integrations }) => {
  // WHEN
  test('should have a Airtable integration', () => {
    // THEN
    expect(integrations.airtable).toBeDefined()
  })
})

const mockNotion = new Mock(BunTester, { integrations: ['Notion'] })

// GIVEN
mockNotion.app(({ integrations }) => {
  // WHEN
  test('should have a Notion integration', () => {
    // THEN
    expect(integrations.notion).toBeDefined()
  })
})

const mockPappers = new Mock(BunTester, { integrations: ['Pappers'] })

// GIVEN
mockPappers.app(({ integrations }) => {
  // WHEN
  test('should have a Pappers integration', () => {
    // THEN
    expect(integrations.pappers).toBeDefined()
  })
})

const mockQonto = new Mock(BunTester, { integrations: ['Qonto'] })

// GIVEN
mockQonto.app(({ integrations }) => {
  // WHEN
  test('should have a Qonto integration', () => {
    // THEN
    expect(integrations.qonto).toBeDefined()
  })
})

const mockGoCardless = new Mock(BunTester, { integrations: ['GoCardless'] })

// GIVEN
mockGoCardless.app(({ integrations }) => {
  // WHEN
  test('should have a GoCardless integration', () => {
    // THEN
    expect(integrations.gocardless).toBeDefined()
  })
})

const mockPhantombuster = new Mock(BunTester, { integrations: ['Phantombuster'] })

// GIVEN
mockPhantombuster.app(({ integrations }) => {
  // WHEN
  test('should have a Phantombuster integration', () => {
    // THEN
    expect(integrations.phantombuster).toBeDefined()
  })
})

const mockCalendly = new Mock(BunTester, { integrations: ['Calendly'] })

// GIVEN
mockCalendly.app(({ integrations }) => {
  // WHEN
  test('should have a Calendly integration', () => {
    // THEN
    expect(integrations.calendly).toBeDefined()
  })
})

const mockYouCanBookMe = new Mock(BunTester, { integrations: ['YouCanBookMe'] })

// GIVEN
mockYouCanBookMe.app(({ integrations }) => {
  // WHEN
  test('should have a YouCanBookMe integration', () => {
    // THEN
    expect(integrations.youcanbookme).toBeDefined()
  })
})

const mockJotform = new Mock(BunTester, { integrations: ['Jotform'] })

// GIVEN
mockJotform.app(({ integrations }) => {
  // WHEN
  test('should have a Jotform integration', () => {
    // THEN
    expect(integrations.jotform).toBeDefined()
  })
})
