import { describe, it, expect, beforeEach } from 'bun:test'
import { AirtableAntiCorruptionLayer } from '../../../../src/shared/domain/anti-corruption/airtable-anti-corruption-layer'
import { ExternalWebhook } from '../../../../src/shared/domain/entity/external-webhook.entity'
import { Id } from '../../../../src/shared/domain/value-object/id.value-object'
import { Url } from '../../../../src/shared/domain/value-object/url.value-object'
import type { LoggerService } from '../../../../src/shared/infrastructure/service/logger.service'

// Mock logger
const mockLogger = {
  error: () => {},
  info: () => {},
  debug: () => {},
  child: () => mockLogger,
} as unknown as LoggerService

describe('AirtableAntiCorruptionLayer', () => {
  let layer: AirtableAntiCorruptionLayer

  beforeEach(() => {
    layer = new AirtableAntiCorruptionLayer(mockLogger)
  })

  describe('toDomain', () => {
    it('should transform Airtable webhook to domain webhook', () => {
      const airtableWebhook = {
        areNotificationsEnabled: true,
        cursorForNextPayload: 123,
        expirationTime: '2024-12-31T23:59:59.000Z',
        id: '12345',
        isHookEnabled: true,
        lastNotificationResult: null,
        lastSuccessfulNotificationTime: '2024-01-01T00:00:00.000Z',
        notificationUrl: 'https://example.com/webhook',
        specification: {
          options: {
            filters: {
              dataTypes: ['tableData', 'tableFields'],
              recordChangeScope: 'all',
            },
          },
        },
      }

      const domainWebhook = layer.toDomain(airtableWebhook)

      expect(domainWebhook).toBeInstanceOf(ExternalWebhook)
      expect(domainWebhook.id.getValue()).toBe(12345)
      expect(domainWebhook.notificationUrl?.getValue()).toBe('https://example.com/webhook')
      expect(domainWebhook.isEnabled).toBe(true)
      expect(domainWebhook.filters.dataTypes).toEqual(['tableData', 'tableFields'])
      expect(domainWebhook.filters.sources).toEqual(['all'])
      expect(domainWebhook.metadata.isNotificationsEnabled).toBe(true)
      expect(domainWebhook.metadata.source).toBe('airtable')
      expect(domainWebhook.metadata.version).toBe('1.0')
    })

    it('should handle webhook without notification URL', () => {
      const airtableWebhook = {
        areNotificationsEnabled: false,
        cursorForNextPayload: 0,
        expirationTime: '',
        id: '67890',
        isHookEnabled: false,
        lastNotificationResult: null,
        lastSuccessfulNotificationTime: null,
        notificationUrl: null,
        specification: {
          options: {
            filters: {
              dataTypes: ['tableMetadata'],
              recordChangeScope: 'created',
            },
          },
        },
      }

      const domainWebhook = layer.toDomain(airtableWebhook)

      expect(domainWebhook.notificationUrl).toBeNull()
      expect(domainWebhook.isEnabled).toBe(false)
      expect(domainWebhook.metadata.isNotificationsEnabled).toBe(false)
    })
  })

  describe('toExternal', () => {
    it('should transform domain webhook to Airtable format', () => {
      const domainWebhook = new ExternalWebhook(
        new Id(12345),
        new Url('https://example.com/webhook'),
        true,
        {
          dataTypes: ['tableData'],
          changeTypes: [],
          sources: ['api'],
        },
        {
          expirationTime: new Date('2024-12-31T23:59:59.000Z'),
          lastNotificationTime: new Date('2024-01-01T00:00:00.000Z'),
          isNotificationsEnabled: true,
          source: 'airtable',
          version: '1.0',
        }
      )

      const airtableWebhook = layer.toExternal(domainWebhook)

      expect(airtableWebhook.id).toBe('12345')
      expect(airtableWebhook.notificationUrl).toBe('https://example.com/webhook')
      expect(airtableWebhook.isHookEnabled).toBe(true)
      expect(airtableWebhook.areNotificationsEnabled).toBe(true)
      expect(airtableWebhook.specification.options.filters.dataTypes).toEqual(['tableData'])
      expect(airtableWebhook.specification.options.filters.recordChangeScope).toBe('api')
    })
  })

  describe('validateExternal', () => {
    it('should validate correct Airtable webhook structure', () => {
      const validWebhook = {
        id: '12345',
        isHookEnabled: true,
        areNotificationsEnabled: true,
        specification: {
          options: {
            filters: {
              dataTypes: ['tableData'],
            },
          },
        },
      }

      expect(layer.validateExternal(validWebhook)).toBe(true)
    })

    it('should reject invalid webhook structure', () => {
      const invalidWebhook = {
        id: '12345',
        // Missing required fields
      }

      expect(layer.validateExternal(invalidWebhook)).toBe(false)
      expect(layer.validateExternal(null)).toBe(false)
      expect(layer.validateExternal('string')).toBe(false)
    })
  })

  describe('transformWebhookPayloads', () => {
    it('should transform Airtable webhook payloads to domain format', () => {
      const airtablePayloads = {
        cursor: 123,
        mightHaveMore: true,
        payloads: [
          {
            actionMetadata: {
              source: 'publicApi',
              sourceMetadata: {
                user: {
                  email: 'test@example.com',
                  id: 'user123',
                  permissionLevel: 'update' as const,
                },
              },
            },
            baseTransactionNumber: 456,
            payloadFormat: 'v0',
            timestamp: '2024-01-01T12:00:00.000Z',
          },
        ],
      }

      const domainPayloads = layer.transformWebhookPayloads(airtablePayloads)

      expect(domainPayloads.cursor).toBe(123)
      expect(domainPayloads.hasMore).toBe(true)
      expect(domainPayloads.events).toHaveLength(1)
      expect(domainPayloads.events[0]?.source).toBe('publicApi')
      expect(domainPayloads.events[0]?.user.email).toBe('test@example.com')
      expect(domainPayloads.events[0]?.transactionNumber).toBe(456)
      expect(domainPayloads.events[0]?.timestamp).toBeInstanceOf(Date)
    })
  })

  describe('transformCreateWebhookRequest', () => {
    it('should transform domain webhook request to Airtable format', () => {
      const domainRequest = {
        notificationUrl: 'https://example.com/webhook',
        dataTypes: ['tableData', 'tableFields'],
        sources: ['publicApi'],
      }

      const airtableRequest = layer.transformCreateWebhookRequest(domainRequest)

      expect(airtableRequest.notificationUrl).toBe('https://example.com/webhook')
      expect(airtableRequest.specification.options.filters.dataTypes).toEqual([
        'tableData',
        'tableFields',
      ])
      expect(airtableRequest.specification.options.filters.recordChangeScope).toBe('publicApi')
    })
  })

  describe('getServiceInfo', () => {
    it('should return correct service information', () => {
      const serviceInfo = layer.getServiceInfo()

      expect(serviceInfo.name).toBe('Airtable')
      expect(serviceInfo.version).toBe('v1.0')
    })
  })

  describe('safeToDomain', () => {
    it('should return null for invalid data and log error', () => {
      const invalidData = { invalid: 'data' }

      const result = layer.safeToDomain(invalidData)

      expect(result).toBeNull()
    })

    it('should return domain object for valid data', () => {
      const validData = {
        areNotificationsEnabled: true,
        cursorForNextPayload: 0,
        expirationTime: '2024-12-31T23:59:59.000Z',
        id: '12345',
        isHookEnabled: true,
        lastNotificationResult: null,
        lastSuccessfulNotificationTime: null,
        notificationUrl: null,
        specification: {
          options: {
            filters: {
              dataTypes: ['tableData'],
            },
          },
        },
      }

      const result = layer.safeToDomain(validData)

      expect(result).toBeInstanceOf(ExternalWebhook)
    })
  })
})
