module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '../../../generated/prisma/client': '<rootDir>/src/tests/mocks/prisma.mock.ts',
    '../../generated/prisma/client': '<rootDir>/src/tests/mocks/prisma.mock.ts',
    '../generated/prisma/client': '<rootDir>/src/tests/mocks/prisma.mock.ts',
  }
}