module.exports = {
  moduleNameMapper: {
    '^@Assets/(.*)$': '<rootDir>/generated/Assets/$1',
    '^@Components/(.*)$': '<rootDir>/src/Components/$1',
    '^@Events/(.*)$': '<rootDir>/src/Events/$1',
    '^@Globals/(.*)$': '<rootDir>/src/Globals/$1',
    '^@Layouts/(.*)$': '<rootDir>/src/Layouts/$1',
    '^@Protos/(.*)$': '<rootDir>/generated/protos/$1',
    '^@Server/(.*)$': '<rootDir>/server/$1',
  },
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
}
