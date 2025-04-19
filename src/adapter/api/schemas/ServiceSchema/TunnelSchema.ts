import type { TunnelConfig } from '/domain/services'

/**
 * @title Tunnel
 * @description Configuration for tunnel service
 */
export interface TunnelServiceSchema {
  /**
   * @title Type
   * @description The type of tunnel integration to use
   */
  integration: TunnelConfig['integration']
  /**
   * @title Authentication token
   * @description The authentication token for the tunnel service
   */
  authToken: TunnelConfig['authToken']
  /**
   * @title Account name
   * @description The account name for the tunnel service
   */
  account: TunnelConfig['account']
}
