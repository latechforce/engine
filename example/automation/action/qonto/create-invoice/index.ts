export default {
  name: 'Qonto Create Invoice Demo',
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
      name: 'create-qonto-invoice',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/create-invoice',
        },
      },
      actions: [
        {
          name: 'create-invoice-in-qonto',
          service: 'qonto',
          action: 'create-invoice',
          account: 1,
          params: {
            client_id: '{{body.client_id}}',
            amount: '{{number body.amount}}',
            currency: '{{body.currency}}',
            due_date: '{{body.due_date}}',
            items: '{{json body.items}}',
            reference: '{{body.reference}}',
            notes: '{{body.notes}}',
          },
        },
      ],
    },
  ],
}
