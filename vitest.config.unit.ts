import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./spec/setupTests.ts'],
    include: ['**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/*.storybook.test.{js,jsx,ts,tsx}', 'node_modules/**'],
    typecheck: {
      tsconfig: './tsconfig.json',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
