import tester, { it, expect } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(tester)

mock.app(({ app }) => {
  it('should throw an error if config has no name', async () => {
    // GIVEN
    const emptyConfig = {} as Config

    // WHEN
    const call = () => app.start(emptyConfig)

    // THEN
    expect(call()).rejects.toThrowError("must have required property 'name'")
  })
})
