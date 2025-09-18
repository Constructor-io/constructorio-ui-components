import { ReactNode } from 'react';

export type RenderPropsChildren<RenderProps> = ((props: RenderProps) => ReactNode) | ReactNode;

// --- Type Helpers

// Abstract Type
export interface ComponentOverrideProps<T> {
  htmlRender?: (props?: T) => HTMLElement; // Unimplemented
  reactNode?: RenderPropsChildren<T>;
}

/**
 * Includes a `children` property of type:
 * - ReactNode or,
 * - (renderProps) => ReactNode
 *
 * Abstract type to be extended from
 */
export type IncludeRenderProps<ChildrenFunctionProps> = {
  children?: RenderPropsChildren<ChildrenFunctionProps>;
};

/**
 * Includes a `children` property of type:
 * - ReactNode or,
 * - (renderProps) => ReactNode
 *
 * Abstract type to be extended from
 */
export type IncludeComponentOverrides<T> = {
  /**
   * ReactNode/RenderProps function overrides for current and sub-components down the tree
   */
  componentOverrides?: T;
};
