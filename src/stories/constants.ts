/**
 * Shared constants for Storybook stories
 */

export const DEMO_IMAGE_URL =
  'https://constructorio-integrations.s3.amazonaws.com/tikus-threads/2022-06-29/PANT_ACTIVE-PANT_GWB00623SBL770_1_category.jpg';

export const COUNT_BADGE_STYLE = {
  marginLeft: 8,
  padding: '1px 8px',
  borderRadius: 10,
  background: '#f0f0f0',
  fontSize: 12,
} as const;

export const OVERRIDE_NAME_STYLE = {
  flexGrow: 1,
  fontWeight: 700,
} as const;

export const OVERRIDE_SWATCH_STYLE = {
  marginRight: 8,
  width: 24,
  height: 24,
  flexShrink: 0,
  borderRadius: 4,
  border: '1px solid #ccc',
} as const;

export const END_CONTENT_PILL_STYLE = {
  marginLeft: 8,
  padding: '1px 6px',
  borderRadius: 10,
  background: '#e7fdd8',
  color: '#66bf3c',
  fontSize: 11,
  fontWeight: 700,
} as const;

export const END_CONTENT_CHEVRON_STYLE = { marginLeft: 8, color: '#999' } as const;
