import type { ServerConfig } from '/domain/services'

/**
 * Server configuration interface
 * @title Server
 * @description Configuration for the server service, excluding app metadata
 */
export interface ServerServiceSchema {
  /**
   * API keys
   * @title API Keys
   * @description List of API keys for authentication
   */
  apiKeys?: ServerConfig['apiKeys']
  /**
   * Server port
   * @title Port
   * @description The port number the server listens on
   */
  port?: ServerConfig['port']
  /**
   * Idle timeout
   * @title Idle Timeout
   * @description The time in milliseconds before an idle connection is closed
   */
  idleTimeout?: ServerConfig['idleTimeout']
  /**
   * Base URL
   * @title Base URL
   * @description The base URL of the server
   */
  baseUrl?: ServerConfig['baseUrl']
  /**
   * SSL certificate
   * @title SSL Certificate
   * @description The SSL certificate file path
   */
  sslCert?: ServerConfig['sslCert']
  /**
   * SSL key
   * @title SSL Key
   * @description The SSL key file path
   */
  sslKey?: ServerConfig['sslKey']
  /**
   * Monitor drivers
   * @title Monitor Drivers
   * @description The monitor drivers to use
   */
  monitors?: ServerConfig['monitors']
}
