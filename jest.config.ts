import type { Config } from 'jest';

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/spec/setupTests.ts'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
};

export default config;
