import { describe, test, expect } from 'vitest';
import { isHexColor } from '@/utils/styleHelpers';

describe('isHexColor', () => {
  test('accepts valid hex colors of all lengths', () => {
    expect(isHexColor('#f00')).toBe(true);
    expect(isHexColor('#f00a')).toBe(true);
    expect(isHexColor('#e04062')).toBe(true);
    expect(isHexColor('#e04062ff')).toBe(true);
  });

  test('rejects invalid values', () => {
    expect(isHexColor(undefined)).toBe(false);
    expect(isHexColor('')).toBe(false);
    expect(isHexColor('ffffff')).toBe(false);
    expect(isHexColor('#ff')).toBe(false);
    expect(isHexColor('#gggggg')).toBe(false);
  });
});
