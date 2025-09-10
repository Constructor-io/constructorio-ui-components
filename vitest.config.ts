import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      name: 'chromium',
    },
    include: ['**/*.storybook.test.@(js|jsx|mjs|ts|tsx)'],
    setupFiles: ['./.storybook/vitest.setup.ts'],
  },
});
