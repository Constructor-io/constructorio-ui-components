import { beforeAll, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setProjectAnnotations } from '@storybook/react';
import * as projectAnnotations from './preview';

expect.extend(matchers);

beforeAll(async () => {
  setProjectAnnotations([projectAnnotations]);
});
