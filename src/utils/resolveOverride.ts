import { ReactNode } from 'react';
import { RenderPropsChildren } from '@/types';

/**
 * Resolves an override against its default, without mounting anything of its own.
 *
 * Prefer this over {@link RenderPropsWrapper} for overridable parts that are rendered once per
 * row in a long list: a wrapper component costs a fiber per part per row even when no override
 * is passed, while this is a plain call that returns the default node untouched.
 */
export function resolveOverride<T>(
  override: RenderPropsChildren<T> | undefined,
  props: T,
  children: ReactNode,
): ReactNode {
  if (typeof override === 'function') return override(props);
  // `null` lands here too, and renders nothing - an explicit way to remove a part.
  if (typeof override === 'object') return override;
  return children;
}
