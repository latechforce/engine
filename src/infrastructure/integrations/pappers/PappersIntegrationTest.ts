import type { IPappersIntegration } from '@adapter/spi/integrations/PappersSpi'
import { describe, it, expect } from 'bun:test'

export function testPappersIntegration(integration: IPappersIntegration) {
  describe('getCompany', () => {
    it('should return an existing company from a siret', async () => {
      // GIVEN
      const siret = '44306184100047'

      // WHEN
      const company = await integration.getCompany(siret)

      // THEN
      expect(company?.denomination).toBe('GOOGLE FRANCE')
    })
  })
}
