/** @type {import('jest').Config} */
const jestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>'],
}

module.exports = jestConfig
