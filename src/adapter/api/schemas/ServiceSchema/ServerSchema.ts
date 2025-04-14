import type { ServerConfig } from '/domain/services'

/**
 * Server config
 * @title Server
 * @description The server config for the engine
 */
export type ServerServiceSchema = Omit<ServerConfig, 'appName' | 'appVersion' | 'appDescription'>
