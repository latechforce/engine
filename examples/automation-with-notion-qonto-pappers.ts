import type { Config } from '@latechforce/engine'
import App from '@latechforce/engine/bun'

const config: Config = {
  name: 'Create Qonto client from Notion with Pappers',
  version: '1.0.0',
  engine: 'latest',
  automations: [
    {
      name: 'createQontoClientFromNotionWithPappers',
      trigger: {
        integration: 'Notion',
        event: 'TablePageCreated',
        table: '{{env.NOTION_TABLE_CLIENTS_ID}}',
        account: 'notion-account',
      },
      actions: [
        {
          name: 'getCompanyFromPappers',
          integration: 'Pappers',
          action: 'GetCompany',
          account: 'pappers-account',
          siret: '{{lookup trigger.properties "SIRET"}}',
        },
        {
          name: 'createClientInQonto',
          integration: 'Qonto',
          action: 'CreateClient',
          account: 'qonto-account',
          client: {
            name: '{{getCompanyFromPappers.denomination}}',
            type: 'company',
            email: '{{lookup trigger.properties "Email de facturation"}}',
            vat_number: '{{getCompanyFromPappers.numero_tva_intracommunautaire}}',
            tax_identification_number: '{{lookup trigger.properties "SIRET"}}',
            currency: 'EUR',
            locale: 'FR',
            address: '{{getCompanyFromPappers.siege.adresse_ligne_1}}',
            city: '{{getCompanyFromPappers.siege.ville}}',
            zip_code: '{{getCompanyFromPappers.siege.code_postal}}',
            country_code: '{{getCompanyFromPappers.siege.code_pays}}',
          },
        },
        {
          name: 'updateClientInNotion',
          integration: 'Notion',
          action: 'UpdatePage',
          account: 'notion-account',
          id: '{{trigger.id}}',
          table: '{{env.NOTION_TABLE_CLIENTS_ID}}',
          page: {
            'ID Qonto': '{{createClientInQonto.id}}',
            '[Pappers] Employés': '{{getCompanyFromPappers.effectif}}',
            '[Pappers] Année des employés': '{{getCompanyFromPappers.annee_effectif}}',
            '[Pappers] Code NAF': '{{getCompanyFromPappers.code_naf}}',
            '[Pappers] Libellé NAF': '{{getCompanyFromPappers.libelle_code_naf}}',
            '[Pappers] Catégorie juridique': '{{getCompanyFromPappers.categorie_juridique}}',
            '[Pappers] Forme juridique': '{{getCompanyFromPappers.forme_juridique}}',
            "[Pappers] Libellé de l'activité": '{{getCompanyFromPappers.objet_social}}',
            '[Pappers] Capital': '{{getCompanyFromPappers.capital}}',
            '[Pappers] Date de création': '{{getCompanyFromPappers.date_creation}}',
            '[Pappers] Entité légale': '{{getCompanyFromPappers.personne_morale}}',
            '[Pappers] Entreprise à mission': '{{getCompanyFromPappers.societe_a_mission}}',
            '[Pappers] ESS': '{{getCompanyFromPappers.economie_sociale_solidaire}}',
          },
        },
      ],
    },
  ],
  integrations: {
    notion: [
      {
        account: 'notion-account',
        token: '{{env.NOTION_API_TOKEN}}',
        pollingInterval: 5,
      },
    ],
    pappers: [
      {
        account: 'pappers-account',
        apiKey: '{{env.PAPPERS_API_KEY}}',
      },
    ],
    qonto: [
      {
        account: 'qonto-account',
        secretKey: '{{env.QONTO_SECRET_KEY}}',
        organisationSlug: '{{env.QONTO_ORGANISATION_SLUG}}',
      },
    ],
  },
}

await new App().start(config)
