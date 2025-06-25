import { BASE_URL } from './src/env.config';
import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const STORAGE_STATE = path.join(__dirname, 'tmp/session.json');

export default defineConfig({
  testDir: './tests',
  globalSetup: 'src/global-setup.ts',
  timeout: 30_000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  retries: 0,
  workers: 2,
  reporter: 'html',
  use: {
    baseURL: BASE_URL,
    // baseURL: process.env.BASE_URL,
    actionTimeout: 0,
    trace: 'on',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      grepInvert: /@logged/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'setup',
      testMatch: '**.setup.ts',
    },
    {
      name: 'logged',
      grep: /@logged/,
      dependencies: ['setup'],
      use: {
        storageState: STORAGE_STATE,
      },
    },
  ],
});
