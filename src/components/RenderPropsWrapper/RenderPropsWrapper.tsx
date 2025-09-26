import { RenderPropsChildren } from '@/types';
import React, { ReactNode } from 'react';

export interface ReactPropsWrapperProps<T> {
  /**
   * The props to be passed to the render props function provided
   */
  props: T;
  /**
   * One of Function<T> | JSX. Overrides default implementation
   */
  override?: RenderPropsChildren<T>;
  /**
   * The default implementation to be nested within the wrapper
   */
  children: ReactNode;
}

export default function RenderPropsWrapper<T>({
  override,
  children,
  props,
}: ReactPropsWrapperProps<T>) {
  const isRenderProps = typeof override === 'function';
  const isJSX = typeof override === 'object';

  return (
    <>
      {isRenderProps
        ? override(props)
        : isJSX
          ? override
          : // Default implementation
            children}
    </>
  );
}
