import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import FilterOption, {
  type FilterOptionProps,
  type FilterOptionOverrides,
} from '@/components/filter-option';
import FilterOptionVisual, {
  type FilterOptionVisualProps,
} from '@/components/filter-option--visual';

const baseClasses =
  'cio-components cio-filter-options-list cio:list-none cio:p-0 cio:m-0 cio:flex cio:flex-col';

/**
 * ClassName for hierarchy toggle. Shared with the spacer used in rows without hierarchy for visual consistency
 */
const toggleFootprintClasses = 'cio:w-6 cio:ml-1 cio:shrink-0';

/* Makes nested lists wrap to a new flex line without contributing to the parent’s intrinsic width. */
const nestedListClasses = 'cio:basis-full cio:w-0 cio:min-w-full';

/** Indentation for a row inside a nested list. Compounds with depth via DOM nesting. */
const nestedRowClasses = 'cio:pl-4';

/**
 * The swatch shown on a visual (`FilterOptionVisual`) row. `type` and `value` travel together
 * because neither means anything alone - a row is a swatch row exactly when it carries a
 * complete `visual`.
 */
export interface FilterOptionVisualData {
  /** `'color'` for a hex color swatch, `'image'` for an image swatch */
  type: FilterOptionVisualProps['visualType'];
  /** Hex color code or image URL, matching `type` */
  value: FilterOptionVisualProps['visualValue'];
}

/**
 * A single option in a {@link FilterOptionsList}. An option can nest child options under
 * `options` - the same key the list itself takes - which are rendered nested and indented.
 *
 * An option renders as a `FilterOptionVisual` (swatch row) when it carries a `visual`, and as a
 * plain `FilterOption` otherwise. Visual and plain options can be mixed freely, at any depth.
 *
 * `id`s must be unique across the entire document
 * `FilterOption` uses `id` for its `<input id>` / `<label htmlFor>` pair, and a row with nested
 * `options` also derives `<id>-hierarchy` for the `aria-controls` target of its nested list.
 * Duplicate ids break label association, so a page rendering several lists is responsible for
 * namespacing them, and the `-hierarchy` suffix is reserved.
 */
export interface FilterOptionData
  extends Pick<
    FilterOptionProps,
    'id' | 'optionValue' | 'displayValue' | 'displayCountValue' | 'isChecked' | 'startContent'
  > {
  /** Child options - rendered nested and indented. Omit (or leave empty) for a leaf row. */
  options?: FilterOptionData[];
  /** Swatch to render in place of the row's `startContent`, making this a visual row. */
  visual?: FilterOptionVisualData;
  /**
   * Whether **this** row's nested `options` get a collapse toggle. Overrides the list's
   * `collapsible` for this row only - e.g. to keep one short branch always open while long ones
   * collapse. Ignored on rows without nested `options`.
   */
  collapsible?: boolean;
  /**
   * Whether **this** row's nested `options` start collapsed. Overrides both the list's
   * `defaultCollapsed` and the auto-expand rule (see
   * {@link FilterOptionsListProps.defaultCollapsed}). Initial state only - the component owns
   * expansion after the first render, so changing this later has no effect on a branch the user
   * has already toggled.
   */
  defaultCollapsed?: boolean;
}

export interface FilterOptionsListProps
  extends Omit<React.ComponentProps<'ul'>, 'onChange' | 'children'>,
    IncludeComponentOverrides<FilterOptionsListOverrides> {
  /**
   * Options to render. Each option's nested `options` are recursed into, nesting + indenting
   * each level; options without nested `options` render as a flat list.
   */
  options: FilterOptionData[];
  /**
   * Callback when any option's selection changes, at any depth. Receives the option's
   * `optionValue` and the option itself - the same object from `options`, so `===` and `id`
   * both identify it. Two options in different branches can share an `optionValue`, so use the
   * second argument when the value alone is ambiguous.
   */
  onChange: (value: string, option: FilterOptionData) => void;
  /**
   * Position of each option's checkbox. Forwarded to every row. When omitted, each row keeps
   * its own component default - `left` for plain options, `right` for visual (swatch) ones.
   */
  checkboxPosition?: FilterOptionProps['checkboxPosition'];
  /**
   * Whether rows that have nested `options` get a toggle that collapses their nested list. This
   * collapses branches **within** the list. Rows without nested `options` are unaffected.
   * Per-row `collapsible` wins over this. Defaults to `true`.
   */
  collapsible?: boolean;
  /**
   * Whether every branch starts collapsed rather than expanded. Initial state only - the
   * component owns expansion from then on. Defaults to `false`.
   *
   * A branch holding a checked option auto-expands even when this is `true`, so an applied
   * filter is never hidden; per-row `defaultCollapsed` overrides both.
   */
  defaultCollapsed?: boolean;
}

/**
 * Row-level override for a {@link FilterOptionsList}, applied to plain and visual rows alike.
 * Either:
 * - an object applied to **every** row at every depth, or
 * - a function called per option, returning the overrides for that specific row (or
 *   `undefined`/no `reactNode` to leave the row at its default). Use this to target a
 *   single option - e.g. `(option) => option.id === 'x' ? {...} : undefined`.
 *
 * A `filterOption.reactNode` render-prop function receives `props.children` - the
 * row's nested list - so hierarchical rows can be overridden without dropping their nested
 * `options`; re-emit `{props.children}` to keep nesting. A **static** `reactNode`
 * (fixed JSX) has nowhere to receive children and so renders without them.
 */
export type FilterOptionOverride =
  | FilterOptionOverrides
  | ((option: FilterOptionData) => FilterOptionOverrides | undefined);

export type FilterOptionsListOverrides = ComponentOverrideProps<FilterOptionsListProps> & {
  filterOption?: FilterOptionOverride;
};

/** True when any option in the subtree is checked, at any depth. */
function hasCheckedDescendant(options: FilterOptionData[]): boolean {
  return options.some(
    (option) => option.isChecked || (option.options ? hasCheckedDescendant(option.options) : false),
  );
}

/**
 * Resolves whether a branch is expanded, highest precedence first:
 * 1. a toggle the user has performed on this row (`toggledIds`)
 * 2. the row's own `defaultCollapsed`
 * 3. auto-expand, when a descendant is checked and the default would otherwise hide it
 * 4. the list's `defaultCollapsed`
 *
 * Deriving this per render - rather than seeding a state entry per branch - means branches that
 * appear later (a facet reloads, options get filtered) pick up their default on first sight with
 * no bookkeeping, while `toggledIds` only ever holds rows the user actually touched.
 */
function resolveIsExpanded({
  id,
  options,
  rowDefaultCollapsed,
  toggledIds,
  listDefaultCollapsed,
}: Pick<FilterOptionData, 'id'> & {
  options: FilterOptionData[];
  rowDefaultCollapsed?: boolean;
  toggledIds: Record<string, boolean>;
  listDefaultCollapsed: boolean;
}): boolean {
  if (Object.prototype.hasOwnProperty.call(toggledIds, id)) return toggledIds[id];
  if (rowDefaultCollapsed !== undefined) return !rowDefaultCollapsed;
  if (!listDefaultCollapsed) return true;
  return hasCheckedDescendant(options);
}

/** Id of the nested list a row's toggle controls, derived from the row's own id. */
function getHierarchyId(optionId: string): string {
  return `${optionId}-hierarchy`;
}

/**
 * Presentational, recursive hierarchical filter list. Renders an `options` array as
 * `FilterOption` rows - or `FilterOptionVisual` swatch rows for options carrying a `visual` -
 * recursing into each option's nested `options` and reusing the row's `children` slot for
 * nesting, so a flat list is just options with no nested `options`. Selection is fully
 * controlled: it comes in via each option's `isChecked` and changes flow out via `onChange`.
 *
 * Branch expansion, by contrast, is uncontrolled: rows with nested `options` get a collapse
 * toggle, and this component owns the open/closed state. The data supplies only the starting
 * point (`collapsible` / `defaultCollapsed` per row, or the same two props for the whole list) -
 * expansion has no effect outside this list, so there is nothing for a parent to synchronize.
 */
export default function FilterOptionsList(props: FilterOptionsListProps) {
  const [toggledIds, setToggledIds] = React.useState<Record<string, boolean>>({});
  const onToggleHierarchy = React.useCallback((id: string, isExpanded: boolean) => {
    setToggledIds((previous) => ({ ...previous, [id]: isExpanded }));
  }, []);

  return (
    <FilterOptionsListInner
      {...props}
      nested={false}
      toggledIds={toggledIds}
      onToggleHierarchy={onToggleHierarchy}
      filterOption={props.componentOverrides?.filterOption}
    />
  );
}

interface FilterOptionHierarchyToggleProps {
  isExpanded: boolean;
  /** Id of the nested list, or `undefined` while that list is unmounted. */
  controlsId?: string;
  /** The row's label, so the toggle reads as "Collapse Shirts" rather than bare "Collapse". */
  displayValue: string;
  onToggle: () => void;
}

/**
 * Collapse toggle for one row's nested list. Lives in the row's `children` slot - a sibling of
 * the `<label>`
 */
function FilterOptionHierarchyToggle({
  isExpanded,
  controlsId,
  displayValue,
  onToggle,
}: FilterOptionHierarchyToggleProps) {
  return (
    <button
      type='button'
      data-slot='filter-option-hierarchy-toggle'
      aria-expanded={isExpanded}
      aria-controls={controlsId}
      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${displayValue}`}
      onClick={onToggle}
      className={cn(
        'cio-filter-option-hierarchy-toggle cio:flex cio:items-center cio:justify-center cio:h-6 cio:rounded-sm cio:cursor-pointer cio:bg-transparent cio:border-0 cio:p-0 cio:text-gray-400 cio:hover:text-gray-700 cio:outline-none cio:focus-visible:ring-ring/50 cio:focus-visible:ring-[3px]',
        toggleFootprintClasses,
      )}>
      <svg
        width='12'
        height='8'
        viewBox='0 0 12 8'
        fill='none'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        className={cn(
          'cio-filter-option-hierarchy-chevron cio:transition-transform cio:duration-250',
          !isExpanded && 'cio:rotate-180',
        )}>
        <path
          d='M1 1.5L6 6.5L11 1.5'
          stroke='currentColor'
          strokeWidth='1.7'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  );
}

type FilterOptionsListInnerProps = FilterOptionsListProps & {
  nested: boolean;
  toggledIds: Record<string, boolean>;
  onToggleHierarchy: (id: string, isExpanded: boolean) => void;
  /**
   * The row-level override, threaded on its own rather than inside `componentOverrides`, so that
   * only it recurses: the list-level `reactNode` would replace each nested list wholesale and
   * break the recursion, and so stays behind at the root.
   */
  filterOption?: FilterOptionOverride;
};

/**
 * Internal recursive renderer. The private props (`nested` - root vs. descendant - and the
 * expansion state threaded down from the root) are kept off the public component so they never
 * surface in the prop surface / autodocs; indentation compounds automatically via DOM nesting,
 * so a boolean is all that's needed for depth.
 */
function FilterOptionsListInner({
  options,
  onChange,
  checkboxPosition,
  componentOverrides,
  className,
  collapsible = true,
  defaultCollapsed = false,
  nested,
  toggledIds,
  onToggleHierarchy,
  filterOption,
  ...props
}: FilterOptionsListInnerProps) {
  const renderProps = React.useMemo(
    () => ({
      ...props,
      options,
      onChange,
      checkboxPosition,
      collapsible,
      defaultCollapsed,
      className,
    }),
    [props, options, onChange, checkboxPosition, collapsible, defaultCollapsed, className],
  );

  // Whether any row at this level shows a toggle. Rows that don't get an equal-width spacer, so
  // counts line up in a column instead of stepping left on the rows that have one.
  const levelHasToggle = options.some(
    (option) => !!option.options?.length && (option.collapsible ?? collapsible),
  );

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <ul
        data-slot='filter-options-list'
        className={cn(baseClasses, nested && nestedListClasses, className)}
        {...props}>
        {options.map((option) => {
          const {
            options: nestedOptions,
            visual,
            startContent,
            collapsible: rowCollapsible,
            defaultCollapsed: rowDefaultCollapsed,
            ...optionProps
          } = option;
          const hasChildren = !!nestedOptions?.length;
          const rowOverride =
            typeof filterOption === 'function' ? filterOption(option) : filterOption;

          const isCollapsible = hasChildren && (rowCollapsible ?? collapsible);
          const isExpanded =
            !isCollapsible ||
            resolveIsExpanded({
              id: option.id,
              options: nestedOptions ?? [],
              rowDefaultCollapsed,
              toggledIds,
              listDefaultCollapsed: defaultCollapsed,
            });
          const hierarchyId = getHierarchyId(option.id);

          const rowProps = {
            ...optionProps,
            // `FilterOption` reports only the value it was given; the row it belongs to is added
            // back here, where the option is still in scope.
            onChange: (value: string) => onChange(value, option),
            checkboxPosition,
            componentOverrides: rowOverride,
            className: cn(
              nested && nestedRowClasses,
              hasChildren && 'cio:flex-wrap cio:items-center',
            ),
          };

          const nestedList = hasChildren && isExpanded && (
            <FilterOptionsListInner
              nested
              id={isCollapsible ? hierarchyId : undefined}
              options={nestedOptions}
              onChange={onChange}
              checkboxPosition={checkboxPosition}
              collapsible={collapsible}
              defaultCollapsed={defaultCollapsed}
              toggledIds={toggledIds}
              onToggleHierarchy={onToggleHierarchy}
              filterOption={filterOption}
            />
          );

          const rowChildren = (
            <>
              {isCollapsible && (
                <FilterOptionHierarchyToggle
                  isExpanded={isExpanded}
                  // Only reference the nested list while it exists - collapsing unmounts it.
                  controlsId={isExpanded ? hierarchyId : undefined}
                  displayValue={option.displayValue}
                  onToggle={() => onToggleHierarchy(option.id, !isExpanded)}
                />
              )}
              {levelHasToggle && !isCollapsible && (
                <span
                  aria-hidden='true'
                  data-slot='filter-option-hierarchy-toggle-spacer'
                  className={cn(
                    'cio-filter-option-hierarchy-toggle-spacer',
                    toggleFootprintClasses,
                  )}
                />
              )}
              {nestedList}
            </>
          );
          // A `visual` missing either half is not a swatch - JS consumers can build one, so this
          // falls back to a plain row rather than rendering an empty swatch.
          return visual?.type && visual?.value ? (
            <FilterOptionVisual
              key={option.id}
              {...rowProps}
              visualType={visual.type}
              visualValue={visual.value}>
              {rowChildren}
            </FilterOptionVisual>
          ) : (
            <FilterOption key={option.id} {...rowProps} startContent={startContent}>
              {rowChildren}
            </FilterOption>
          );
        })}
      </ul>
    </RenderPropsWrapper>
  );
}
