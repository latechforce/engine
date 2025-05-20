import App from '@/app'
import { syntaxErrorRunTypescriptCodeAction } from '@/example/automation/action/code/run-typescript/syntax-error'
import { test, expect } from 'bun:test'

test('should return an error when the typescript code has a syntax error', async () => {
  // GIVEN
  const call = () => new App().start(syntaxErrorRunTypescriptCodeAction)

  // WHEN/THEN
  expect(call()).rejects.toThrow('Invalid Typescript code')
})
