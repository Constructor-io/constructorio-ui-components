import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
