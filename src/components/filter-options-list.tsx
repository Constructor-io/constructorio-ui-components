import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import FilterOption, {
  type FilterOptionProps,
  type FilterOptionOverrides,
} from '@/components/filter-option';

const baseClasses =
  'cio-components cio-filter-options-list cio:list-none cio:p-0 cio:m-0 cio:flex cio:flex-col';

/**
 * A single option in a {@link FilterOptionsList}. Self-similar: an option can nest
 * child options under `hierarchies`, which are rendered nested and indented. The shape
 * is intentionally data-agnostic.
 *
 * Note: `id`s must be unique across the entire tree — `FilterOption` uses `id` for its
 * `<input id>` / `<label htmlFor>` pair, so duplicate ids across branches break label
 * association.
 */
export interface FilterOptionData
  extends Pick<
    FilterOptionProps,
    'id' | 'optionValue' | 'displayValue' | 'displayCountValue' | 'isChecked' | 'startContent'
  > {
  /** Child options — rendered nested and indented. Omit (or leave empty) for a leaf row. */
  hierarchies?: FilterOptionData[];
}

export interface FilterOptionsListProps
  extends Omit<React.ComponentProps<'ul'>, 'onChange' | 'children'>,
    IncludeComponentOverrides<FilterOptionsListOverrides> {
  /**
   * Options to render. Each option's `hierarchies` are recursed into, nesting + indenting
   * each level; hierarchy is driven entirely by the data, so options without `hierarchies`
   * render as a flat list.
   */
  options: FilterOptionData[];
  /** Callback when any option's selection changes; receives the option's `optionValue` */
  onChange: (value: string) => void;
  /** Position of each option's checkbox. Forwarded to every `FilterOption`. */
  checkboxPosition?: FilterOptionProps['checkboxPosition'];
}

/**
 * Row-level override for a {@link FilterOptionsList}. Either:
 * - an object applied to **every** `FilterOption` row at every depth, or
 * - a function called per option, returning the overrides for that specific row (or
 *   `undefined`/no `reactNode` to leave the row at its default). Use this to target a
 *   single option — e.g. `(option) => option.id === 'x' ? {...} : undefined`.
 *
 * Note: a `filterOption.reactNode` render-prop function receives `props.children` — the
 * row's nested list — so hierarchical rows can be overridden without dropping their
 * `hierarchies`; re-emit `{props.children}` to keep nesting. A **static** `reactNode`
 * (fixed JSX) has nowhere to receive children and so renders without them.
 */
export type FilterOptionOverride =
  | FilterOptionOverrides
  | ((option: FilterOptionData) => FilterOptionOverrides | undefined);

export type FilterOptionsListOverrides = ComponentOverrideProps<FilterOptionsListProps> & {
  filterOption?: FilterOptionOverride;
};

/**
 * Presentational, recursive hierarchical filter list. Renders an `options` array as
 * `FilterOption` rows, recursing into each option's `hierarchies` and reusing
 * `FilterOption`'s `children` slot for nesting — so a flat list is just options with no
 * `hierarchies`. Fully controlled: selection state comes in via each option's `isChecked`,
 * and changes flow out via `onChange`.
 */
export default function FilterOptionsList(props: FilterOptionsListProps) {
  return <FilterOptionsListInner {...props} nested={false} />;
}

/**
 * Internal recursive renderer. The private `nested` flag (root vs. descendant) is kept
 * off the public component so it never surfaces in the prop surface / autodocs; indentation
 * compounds automatically via DOM nesting, so a boolean is all that's needed.
 */
function FilterOptionsListInner({
  options,
  onChange,
  checkboxPosition,
  componentOverrides,
  className,
  nested,
  ...props
}: FilterOptionsListProps & { nested: boolean }) {
  const renderProps = React.useMemo(
    () => ({
      ...props,
      options,
      onChange,
      checkboxPosition,
      className,
    }),
    [props, options, onChange, checkboxPosition, className],
  );

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <ul
        data-slot='filter-options-list'
        className={cn(baseClasses, nested && 'cio:pl-4', className)}
        {...props}>
        {options.map((option) => {
          const { hierarchies, ...optionProps } = option;
          const hasChildren = !!hierarchies?.length;
          const filterOption = componentOverrides?.filterOption;
          const rowOverride =
            typeof filterOption === 'function' ? filterOption(option) : filterOption;

          return (
            <FilterOption
              key={option.id}
              {...optionProps}
              onChange={onChange}
              checkboxPosition={checkboxPosition}
              componentOverrides={rowOverride}
              className={hasChildren ? 'cio:flex-col' : undefined}>
              {hasChildren && (
                <FilterOptionsListInner
                  nested
                  options={hierarchies}
                  onChange={onChange}
                  checkboxPosition={checkboxPosition}
                  // Propagate only the row-level override — NOT the list-level `reactNode`,
                  // which would replace each nested list wholesale and break recursion.
                  componentOverrides={{ filterOption }}
                />
              )}
            </FilterOption>
          );
        })}
      </ul>
    </RenderPropsWrapper>
  );
}
