export interface CalendlyError {
  title: string
  message: string
  details?: Array<{
    parameter: string
    message: string
  }>
}
