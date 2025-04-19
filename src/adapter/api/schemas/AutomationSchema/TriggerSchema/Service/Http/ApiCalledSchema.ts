import type { ApiCalledHttpTriggerConfig } from '/domain/entities/Trigger/services/http/ApiCalled'

/**
 * Api Called HTTP Trigger
 * @title Api Called
 * @description A trigger that fires when an API is called
 */
export interface ApiCalledHttpServiceTriggerAutomationSchema {
  /**
   * The service type for this trigger
   * @title Service
   * @description The service type for this trigger
   */
  service: 'Http'
  /**
   * The event type for this trigger
   * @title Event
   * @description The event type for this trigger
   */
  event: 'ApiCalled'
  /**
   * The API endpoint path
   * @title Path
   * @description The API endpoint path where the trigger will be activated
   */
  path: string
  /**
   * The input validation schema
   * @title Input
   * @description The JSON schema for validating the input data
   */
  input?: ApiCalledHttpTriggerConfig['input']
  /**
   * The output template
   * @title Output
   * @description The template for formatting the output response
   */
  output?: ApiCalledHttpTriggerConfig['output']
  /**
   * The authentication configuration
   * @title Auth
   * @description The authentication settings for the API endpoint
   */
  auth?: ApiCalledHttpTriggerConfig['auth']
}
