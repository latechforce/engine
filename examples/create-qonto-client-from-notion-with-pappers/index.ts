import type { Config } from '@latechforce/engine'
import App from '@latechforce/engine/bun'

const {
  NOTION_TABLE_CLIENTS_ID,
  NOTION_API_TOKEN,
  PAPPERS_API_KEY,
  QONTO_SECRET_KEY,
  QONTO_ORGANISATION_SLUG,
} = process.env

const config: Config = {
  name: 'Create Qonto client from Notion with Pappers',
  version: '1.0.0',
  automations: [
    {
      name: 'createQontoClientFromNotionWithPappers',
      trigger: {
        integration: 'Notion',
        event: 'TablePageCreated',
        table: NOTION_TABLE_CLIENTS_ID!,
      },
      actions: [
        {
          name: 'getCompanyFromPappers',
          integration: 'Pappers',
          action: 'GetCompany',
          siret: '{{lookup trigger.properties "SIRET"}}',
        },
        {
          name: 'createClientInQonto',
          integration: 'Qonto',
          action: 'CreateClient',
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
          id: '{{trigger.id}}',
          table: NOTION_TABLE_CLIENTS_ID!,
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
    notion: {
      token: NOTION_API_TOKEN!,
      pollingInterval: 5,
    },
    pappers: {
      apiKey: PAPPERS_API_KEY!,
    },
    qonto: {
      environment: 'production',
      secretKey: QONTO_SECRET_KEY!,
      organisationSlug: QONTO_ORGANISATION_SLUG!,
    },
  },
}

await new App().start(config)
