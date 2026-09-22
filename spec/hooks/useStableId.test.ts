import { renderHook } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useStableId } from '@/hooks/useStableId';

describe('useStableId', () => {
  test('prefixes the generated value', () => {
    const { result } = renderHook(() => useStableId('cio-panel'));
    expect(result.current?.startsWith('cio-panel-')).toBe(true);
  });

  test('stays the same across re-renders', () => {
    const { result, rerender } = renderHook(() => useStableId('cio-panel'));
    const first = result.current;
    rerender();
    rerender();
    expect(result.current).toBe(first);
  });

  test('gives separate instances separate ids', () => {
    // The point of the hook: two of the same component on one page must not claim the same id,
    // which is what silently breaks `aria-controls` / `htmlFor` for assistive tech.
    const a = renderHook(() => useStableId('cio-panel'));
    const b = renderHook(() => useStableId('cio-panel'));
    expect(a.result.current).not.toBe(b.result.current);
  });

  test('emits only characters that are safe in a CSS selector', () => {
    // React's own ids contain delimiters (`:R1:`, `«R1»`) that are legal in an `id` attribute but
    // need escaping in `querySelector`, so they are reduced to word characters.
    const { result } = renderHook(() => useStableId('cio-panel'));
    expect(result.current).toMatch(/^[\w-]+$/);
  });

  test('the generated id resolves as a plain selector', () => {
    const { result } = renderHook(() => useStableId('cio-panel'));
    const el = document.createElement('div');
    el.id = result.current!;
    document.body.appendChild(el);
    expect(document.querySelector(`#${result.current}`)).toBe(el);
    el.remove();
  });

  test('keeps ids distinct when the delimiters are all that separate them', () => {
    // Deleting non-word characters would flatten `:R1:2:` and `:R12:` onto the same value. They are
    // replaced rather than removed so that cannot happen.
    const collapse = (id: string) => id.replace(/\W+/g, '-').replace(/^-+|-+$/g, '');
    expect(collapse(':R1:2:')).not.toBe(collapse(':R12:'));
  });
});
