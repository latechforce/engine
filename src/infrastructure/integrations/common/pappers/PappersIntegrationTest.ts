import type { IPappersIntegration } from '/adapter/spi/integrations/PappersSpi'
import type BunTester from 'bun:test'

export function testPappersIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IPappersIntegration
) {
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
