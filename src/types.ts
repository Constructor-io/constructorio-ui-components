import { ReactNode } from 'react';
export * from '@/types/product-card-types';

export type RenderPropsChildren<RenderProps> = ((props: RenderProps) => ReactNode) | ReactNode;

// --- Type Helpers

/**
 * Renames a single field in a Type
 * E.g. type MyNewType = Rename<MyOldType, 'oldFieldName', 'newFieldName'>
 */
export type Rename<T, OldFieldName extends keyof T, NewFieldName extends string> = Pick<
  T,
  Exclude<keyof T, OldFieldName>
> & {
  [P in NewFieldName]: T[OldFieldName];
};

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
 * Abstract type to be extended
 */
export type IncludeRenderProps<ChildrenFunctionProps> = {
  children?: RenderPropsChildren<ChildrenFunctionProps>;
};

/**
 * Includes the `componentOverrides` property of type:
 * - ComponentOverrideProps<T>
 * - Other sub-components J overrides of types `IncludeComponentOverrides<J>`
 *
 * Abstract type to be extended
 */
export type IncludeComponentOverrides<T> = {
  /**
   * ReactNode/RenderProps function overrides for current and sub-components down the tree
   */
  componentOverrides?: T;
};
