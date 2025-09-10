export default {
  id: 1,
  name: 'Qonto',
  service: 'qonto',
  clientId: '{{{env "QONTO_CLIENT_ID" "client_id"}}}',
  clientSecret: '{{{env "QONTO_CLIENT_SECRET" "client_secret"}}}',
}
