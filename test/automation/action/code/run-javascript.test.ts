import App from '@/app'
import syntaxErrorRunJavascriptCodeAction from '@/example/automation/action/code/run-javascript/syntax-error'
import { test, expect } from 'bun:test'

test('should return an error when the javascript code has a syntax error', async () => {
  // GIVEN
  const call = () => new App().start(syntaxErrorRunJavascriptCodeAction)

  // WHEN/THEN
  expect(call()).rejects.toThrow('Invalid Javascript code')
})
