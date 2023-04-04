export default {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['src/index.ts'],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
};
