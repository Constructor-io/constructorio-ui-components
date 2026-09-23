import React from 'react';

let idCounter = 0;

/** `React.useId` exists from React 18 on; the post-mount counter below covers 16 and 17. */
const useReactId = (React as { useId?: () => string }).useId;

/**
 * A unique, render-stable DOM id, for wiring ARIA relationships (`aria-controls`,
 * `aria-labelledby`, `<label htmlFor>`) to an element the component owns.
 *
 * Each mounted component gets its own id, so rendering the same component twice on a page cannot
 * produce a collision - which is what breaks those relationships, silently and only for assistive
 * tech.
 *
 * Returns `undefined` on the first render under React 16 and 17, and on every server render there.
 * Callers must therefore tolerate a missing id: omit the attribute, and omit whatever references it
 * (`aria-controls`, `htmlFor`) for that render. React 18 and up have a real id from the first
 * render, server included.
 *
 * @param prefix Prepended to the generated value, to keep the id readable in devtools.
 */
export function useStableId(prefix: string): string | undefined {
  const reactId = useReactId?.();
  const [fallbackId, setFallbackId] = React.useState<string>();

  React.useEffect(() => {
    // React 18+ already has an id, so this never schedules a render there.
    if (reactId) return;
    setFallbackId((current) => current ?? String((idCounter += 1)));
  }, [reactId]);

  const id = reactId ?? fallbackId;
  if (!id) return undefined;

  // React's own ids carry delimiters (`:R1:` in 18, `«R1»` in 19). They are legal in an `id` but
  // awkward in a hand-written CSS selector. Collapsing them to `-` rather than deleting them keeps
  // two ids that differ only in delimiter placement distinct.
  return `${prefix}-${id.replace(/\W+/g, '-').replace(/^-+|-+$/g, '')}`;
}

export default useStableId;
