import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./spec/setupTests.ts'],
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/*.storybook.test.{js,jsx,ts,tsx}', 'node_modules/**'],
  },
});