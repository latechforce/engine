export interface INgrokIntegration {
  start: (port: number) => Promise<string>
  stop: () => Promise<void>
}
