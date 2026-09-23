import React from 'react';

function setRef<T>(ref: React.Ref<T> | undefined | null, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    (ref as React.RefObject<T | null>).current = value;
  }
}

/**
 * Points several refs at one node, so a component's own ref and a consumer's can coexist.
 *
 * Needed wherever a component both measures its own DOM node and accepts a forwarded ref: assigning
 * one to the element would drop the other.
 */
export function composeRefs<T>(...refs: (React.Ref<T> | undefined | null)[]): React.RefCallback<T> {
  return (node: T | null) => {
    refs.forEach((ref) => setRef(ref, node));
  };
}

export default composeRefs;
