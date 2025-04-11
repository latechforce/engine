const {
  TEST_SENTRY_DSN,
  TEST_NOTION_TOKEN,
  TEST_NOTION_TABLE_1_ID,
  TEST_NOTION_TABLE_2_ID,
  TEST_NOTION_TABLE_3_ID,
  TEST_NOTION_TABLE_FILES_ID,
  TEST_PAPPERS_API_KEY,
  TEST_QONTO_BASE_URL,
  TEST_QONTO_ORGANISATION_SLUG,
  TEST_QONTO_SECRET_KEY,
  TEST_QONTO_STAGING_TOKEN,
  TEST_QONTO_IBAN,
  TEST_NGROK_AUTH_TOKEN,
  TEST_AIRTABLE_API_KEY,
  TEST_AIRTABLE_BASE_ID,
  TEST_AIRTABLE_TABLE_1_ID,
  TEST_AIRTABLE_TABLE_2_ID,
  TEST_GOOGLE_MAIL_USER,
  TEST_GOOGLE_MAIL_PASSWORD,
  TEST_GOCARDLESS_BASE_URL,
  TEST_GOCARDLESS_ACCESS_TOKEN,
  TEST_PHANTOMBUSTER_API_KEY,
  TEST_PHANTOMBUSTER_AGENT_ID,
  TEST_CALENDLY_USER_ACCESS_TOKEN,
  TEST_CALENDLY_CLIENT_ID,
  TEST_CALENDLY_CLIENT_SECRET,
  TEST_CALENDLY_BASE_URL,
  TEST_YOUCANBOOKME_BASE_URL,
  TEST_YOUCANBOOKME_USERNAME,
  TEST_YOUCANBOOKME_PASSWORD,
} = process.env

if (!TEST_SENTRY_DSN) throw new Error('TEST_SENTRY_DSN env var is not defined')
if (!TEST_NOTION_TOKEN) throw new Error('TEST_NOTION_TOKEN env var is not defined')
if (!TEST_NOTION_TABLE_1_ID) throw new Error('TEST_NOTION_TABLE_1_ID env var is not defined')
if (!TEST_NOTION_TABLE_2_ID) throw new Error('TEST_NOTION_TABLE_2_ID env var is not defined')
if (!TEST_NOTION_TABLE_3_ID) throw new Error('TEST_NOTION_TABLE_3_ID env var is not defined')
if (!TEST_NOTION_TABLE_FILES_ID)
  throw new Error('TEST_NOTION_TABLE_FILES_ID env var is not defined')
if (!TEST_PAPPERS_API_KEY) throw new Error('TEST_PAPPERS_API_KEY env var is not defined')
if (!TEST_QONTO_ORGANISATION_SLUG)
  throw new Error('TEST_QONTO_ORGANISATION_SLUG env var is not defined')
if (!TEST_QONTO_BASE_URL) throw new Error('TEST_QONTO_BASE_URL env var is not defined')
if (!TEST_QONTO_SECRET_KEY) throw new Error('TEST_QONTO_SECRET_KEY env var is not defined')
if (!TEST_QONTO_STAGING_TOKEN) throw new Error('TEST_QONTO_STAGING_TOKEN env var is not defined')
if (!TEST_QONTO_IBAN) throw new Error('TEST_QONTO_IBAN env var is not defined')
if (!TEST_NGROK_AUTH_TOKEN) throw new Error('TEST_NGROK_AUTH_TOKEN env var is not defined')
if (!TEST_AIRTABLE_API_KEY) throw new Error('TEST_AIRTABLE_API_KEY env var is not defined')
if (!TEST_AIRTABLE_BASE_ID) throw new Error('TEST_AIRTABLE_BASE_ID env var is not defined')
if (!TEST_AIRTABLE_TABLE_1_ID) throw new Error('TEST_AIRTABLE_TABLE_1 env var is not defined')
if (!TEST_AIRTABLE_TABLE_2_ID) throw new Error('TEST_AIRTABLE_TABLE_2 env var is not defined')
if (!TEST_GOOGLE_MAIL_USER) throw new Error('TEST_GOOGLE_MAIL_USER env var is not defined')
if (!TEST_GOOGLE_MAIL_PASSWORD) throw new Error('TEST_GOOGLE_MAIL_PASSWORD env var is not defined')
if (!TEST_GOCARDLESS_BASE_URL) throw new Error('TEST_GOCARDLESS_BASE_URL env var is not defined')
if (!TEST_GOCARDLESS_ACCESS_TOKEN)
  throw new Error('TEST_GOCARDLESS_ACCESS_TOKEN env var is not defined')
if (!TEST_PHANTOMBUSTER_API_KEY)
  throw new Error('TEST_PHANTOMBUSTER_API_KEY env var is not defined')
if (!TEST_PHANTOMBUSTER_AGENT_ID)
  throw new Error('TEST_PHANTOMBUSTER_AGENT_ID env var is not defined')
if (!TEST_CALENDLY_BASE_URL) throw new Error('TEST_CALENDLY_BASE_URL env var is not defined')
if (!TEST_CALENDLY_CLIENT_ID) throw new Error('TEST_CALENDLY_CLIENT_ID env var is not defined')
if (!TEST_CALENDLY_CLIENT_SECRET)
  throw new Error('TEST_CALENDLY_CLIENT_SECRET env var is not defined')
if (!TEST_CALENDLY_USER_ACCESS_TOKEN)
  throw new Error('TEST_CALENDLY_USER_ACCESS_TOKEN env var is not defined')
if (!TEST_YOUCANBOOKME_BASE_URL)
  throw new Error('TEST_YOUCANBOOKME_BASE_URL env var is not defined')
if (!TEST_YOUCANBOOKME_USERNAME)
  throw new Error('TEST_YOUCANBOOKME_USERNAME env var is not defined')
if (!TEST_YOUCANBOOKME_PASSWORD)
  throw new Error('TEST_YOUCANBOOKME_PASSWORD env var is not defined')

const env = {
  TEST_SENTRY_DSN,
  TEST_NOTION_TOKEN,
  TEST_NOTION_TABLE_1_ID,
  TEST_NOTION_TABLE_2_ID,
  TEST_NOTION_TABLE_3_ID,
  TEST_NOTION_TABLE_FILES_ID,
  TEST_PAPPERS_API_KEY,
  TEST_QONTO_BASE_URL,
  TEST_QONTO_ORGANISATION_SLUG,
  TEST_QONTO_SECRET_KEY,
  TEST_QONTO_STAGING_TOKEN,
  TEST_QONTO_IBAN,
  TEST_NGROK_AUTH_TOKEN,
  TEST_AIRTABLE_API_KEY,
  TEST_AIRTABLE_BASE_ID,
  TEST_AIRTABLE_TABLE_1_ID,
  TEST_AIRTABLE_TABLE_2_ID,
  TEST_GOOGLE_MAIL_USER,
  TEST_GOOGLE_MAIL_PASSWORD,
  TEST_GOCARDLESS_BASE_URL,
  TEST_GOCARDLESS_ACCESS_TOKEN,
  TEST_PHANTOMBUSTER_API_KEY,
  TEST_PHANTOMBUSTER_AGENT_ID,
  TEST_CALENDLY_USER_ACCESS_TOKEN,
  TEST_CALENDLY_CLIENT_ID,
  TEST_CALENDLY_CLIENT_SECRET,
  TEST_CALENDLY_BASE_URL,
  TEST_YOUCANBOOKME_BASE_URL,
  TEST_YOUCANBOOKME_USERNAME,
  TEST_YOUCANBOOKME_PASSWORD,
}

export default env
