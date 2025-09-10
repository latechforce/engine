export default {
  name: 'Qonto Create Client Demo',
  connections: [
    {
      id: 1,
      name: 'Qonto',
      service: 'qonto',
      clientId: '{{{env "QONTO_CLIENT_ID" "client_id"}}}',
      clientSecret: '{{{env "QONTO_CLIENT_SECRET" "client_secret"}}}',
    },
  ],
  automations: [
    {
      id: 1,
      name: 'create-qonto-client',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/create-client',
        },
      },
      actions: [
        {
          name: 'create-client-in-qonto',
          service: 'qonto',
          action: 'create-client',
          account: 1,
          params: {
            name: '{{body.name}}',
            email: '{{body.email}}',
            phone: '{{body.phone}}',
            address: {
              street: '{{body.address.street}}',
              city: '{{body.address.city}}',
              postal_code: '{{body.address.postal_code}}',
              country: '{{body.address.country}}',
            },
            vat_number: '{{body.vat_number}}',
          },
        },
      ],
    },
  ],
}
