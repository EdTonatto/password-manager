export default {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/**/*.dataprovider.ts',
    '!<rootDir>/src/**/*.resource.ts',
    '!<rootDir>/src/**/*.restmodel.ts',
    '!<rootDir>/src/**/*.model.ts',
    '!<rootDir>/src/**/*.repository.ts',
    '!<rootDir>/src/shared/**/*.ts',
    '!<rootDir>/src/main.ts',
  ],
  coveragePathIgnorePatterns: ['src/index.ts'],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
};
