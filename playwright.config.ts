import { BASE_URL } from '@_config/env.config';
import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const STORAGE_STATE = path.join(__dirname, 'tmp/session.json');

export default defineConfig({
  testDir: './tests',
  globalSetup: 'config/global.setup.ts',
  timeout: 30_000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  retries: 0,
  workers: 6,
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
    // {
    //   name: 'chromium-non-logged',
    //   grepInvert: /@logged/,
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'chromium-non-logged',

      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'setup',
      testMatch: '*.setup.ts',
    },
    {
      name: 'chromium-logged',
      grep: /@logged/,
      dependencies: ['setup'],
      use: {
        storageState: STORAGE_STATE,
      },
    },
  ],
});
