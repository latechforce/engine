import { test } from '@japa/runner'
import { TestUtils } from '@adonisjs/core/testing'

test('first test with ENV A', async ({ assert }) => {
  const testUtils = await TestUtils.createApp({
    env: {
      MY_VARIABLE: 'value_a',
    },
  })
  await testUtils.start()

  const Env = testUtils.app.container.make('Adonis/Core/Env')
  const value = Env.get('MY_VARIABLE')

  assert.equal(value, 'value_a')

  await testUtils.stop()
})

test('second test with ENV B', async ({ assert }) => {
  const testUtils = await TestUtils.createApp({
    env: {
      MY_VARIABLE: 'value_b',
    },
  })
  await testUtils.start()

  const Env = testUtils.app.container.make('Adonis/Core/Env')
  const value = Env.get('MY_VARIABLE')

  assert.equal(value, 'value_b')

  await testUtils.stop()
})
