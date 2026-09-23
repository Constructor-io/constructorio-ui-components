import React, { ReactNode, createContext, useContext } from 'react';
import { cn, composeRefs, RenderPropsWrapper, Slot } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { useStableId } from '@/hooks/useStableId';
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon';
import EllipsisIcon from '@/assets/icons/EllipsisIcon';

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
}

export interface CollapseConfig {
  /** How many items to keep visible at the start of the trail. Clamped to at least 1. */
  start: number;
  /** How many items to keep visible at the end, before the current page. Clamped to at least 1. */
  end: number;
}

export type BreadcrumbsVariant = 'default' | 'compact';

export interface BreadcrumbsProps
  extends Omit<React.ComponentProps<'nav'>, 'children'>,
    IncludeComponentOverrides<BreadcrumbsOverrides> {
  /** Ancestor items, ordered root-first. The current page is passed separately. */
  items?: BreadcrumbItem[];
  /** The page the trail leads to. Rendered non-interactive; a string is shorthand for its label. */
  currentItem?: BreadcrumbItem | string;
  /**
   * Called when a visible or collapsed item is activated, including items carrying an `href`.
   *
   * The event is passed through untouched, so an item with an `href` still navigates: to route
   * client-side instead, call `event.preventDefault()` in the handler. Items without an `href`
   * render as buttons and have nothing to prevent.
   *
   * ```tsx
   * onItemClick={(item, event) => {
   *   event.preventDefault();
   *   router.push(item.href);
   * }}
   * ```
   */
  onItemClick?: (item: BreadcrumbItem, event: React.MouseEvent) => void;
  /**
   * How many items stay visible at each end before the rest collapse into a "more" menu.
   * `false` renders every item. Defaults to `{ start: 2, end: 2 }`.
   *
   * The menu only appears once it would hide at least two items, since replacing a single crumb
   * with an ellipsis results in a bad user experience.
   */
  collapse?: CollapseConfig | false;
  /** `compact` renders a denser inline trail. Defaults to `default`. */
  variant?: BreadcrumbsVariant;
  /** Label for the collapsed items trigger. Defaults to `Show hidden breadcrumbs`. */
  moreMenuLabel?: string;
  /**
   * Compose the trail by hand out of `Breadcrumbs.List`, `.Item`, `.Link`, `.Page` and
   * `.Separator` instead of passing `items`. Takes precedence over `items`.
   */
  children?: ReactNode;
}

export interface BreadcrumbsListProps extends React.ComponentProps<'ol'> {
  children?: ReactNode;
}

export interface BreadcrumbsItemProps extends React.ComponentProps<'li'> {
  children?: ReactNode;
}

export interface BreadcrumbsLinkProps extends React.ComponentProps<'a'> {
  /** True to render `children` as is, forwarding link props onto it. */
  asChild?: boolean;
  children?: ReactNode;
}

export interface BreadcrumbsPageProps extends React.ComponentProps<'span'> {
  children?: ReactNode;
}

export interface BreadcrumbsSeparatorProps extends React.ComponentProps<'li'> {
  children?: ReactNode;
}

/** The collapsed-items glyph. `children` replaces the default dots. */
export type BreadcrumbsEllipsisProps = React.ComponentProps<'span'>;

export interface BreadcrumbsMoreMenuProps extends Omit<React.ComponentProps<'li'>, 'children'> {
  /** The collapsed items, shown in the popover. */
  items: BreadcrumbItem[];
  onItemClick?: BreadcrumbsProps['onItemClick'];
  /** Accessible label for the trigger. */
  label?: string;
}

export type BreadcrumbsListOverrides = ComponentOverrideProps<BreadcrumbsListProps>;
export type BreadcrumbsItemOverrides = ComponentOverrideProps<BreadcrumbsItemProps>;
export type BreadcrumbsLinkOverrides = ComponentOverrideProps<BreadcrumbsLinkProps>;
export type BreadcrumbsPageOverrides = ComponentOverrideProps<BreadcrumbsPageProps>;
export type BreadcrumbsSeparatorOverrides = ComponentOverrideProps<BreadcrumbsSeparatorProps>;
export type BreadcrumbsEllipsisOverrides = ComponentOverrideProps<BreadcrumbsEllipsisProps>;
export type BreadcrumbsMoreMenuOverrides = ComponentOverrideProps<BreadcrumbsMoreMenuProps>;

export type BreadcrumbsOverrides = ComponentOverrideProps<BreadcrumbsProps> & {
  list?: BreadcrumbsListOverrides;
  item?: BreadcrumbsItemOverrides;
  link?: BreadcrumbsLinkOverrides;
  page?: BreadcrumbsPageOverrides;
  separator?: BreadcrumbsSeparatorOverrides;
  /**
   * Replaces the ellipsis wrapper `<span>` wholesale (icon, classes and all). To keep the wrapper
   * and swap only the glyph inside it, pass `children` to `Breadcrumbs.Ellipsis` instead.
   */
  ellipsis?: BreadcrumbsEllipsisOverrides;
  moreMenu?: BreadcrumbsMoreMenuOverrides;
};

const DEFAULT_COLLAPSE: CollapseConfig = { start: 2, end: 2 };

interface BreadcrumbsContextValue {
  variant: BreadcrumbsVariant;
  componentOverrides?: BreadcrumbsOverrides;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextValue | null>(null);

function useBreadcrumbsContext(): BreadcrumbsContextValue {
  const context = useContext(BreadcrumbsContext);
  if (!context) {
    throw new Error('Breadcrumbs compound components must be used within a Breadcrumbs component');
  }
  return context;
}

/** Keeps a `collapse` end at a whole number of items, at least 1, for any value a JS caller passes. */
function clampVisibleEnd(value: number): number {
  return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1;
}

/**
 * Splits the trail into the visible ends and the middle that collapses behind the "more" menu.
 *
 * Collapsing needs at least two items to hide, since replacing a single crumb with an ellipsis
 * results in a bad user experience.
 *
 * `start` and `end` are clamped to at least 1: a `0` would collapse that whole end of the trail
 * into the ellipsis, leaving the user no visible ancestor to orient by. Pass `collapse={false}` to
 * disable collapsing instead.
 */
function splitBreadcrumbItems(items: BreadcrumbItem[], collapse: CollapseConfig | false) {
  if (!collapse) {
    return { leading: items, collapsed: [] as BreadcrumbItem[], trailing: [] as BreadcrumbItem[] };
  }

  const start = clampVisibleEnd(collapse.start);
  const end = clampVisibleEnd(collapse.end);

  if (items.length <= start + end + 1) {
    return { leading: items, collapsed: [] as BreadcrumbItem[], trailing: [] as BreadcrumbItem[] };
  }

  return {
    leading: items.slice(0, start),
    collapsed: items.slice(start, items.length - end),
    trailing: items.slice(items.length - end),
  };
}

const BreadcrumbsList = React.forwardRef<HTMLOListElement, BreadcrumbsListProps>(
  function BreadcrumbsList({ children, className, ...props }, forwardedRef) {
    const { variant, componentOverrides } = useBreadcrumbsContext();
    const renderProps = React.useMemo(
      () => ({ ...props, children, className }),
      [props, children, className],
    );

    return (
      <RenderPropsWrapper props={renderProps} override={componentOverrides?.list?.reactNode}>
        <ol
          ref={forwardedRef}
          data-slot='breadcrumbs-list'
          className={cn(
            'cio-breadcrumbs-list cio:flex cio:flex-wrap cio:items-center cio:list-none cio:m-0 cio:gap-1 cio:text-foreground/85',
            variant === 'compact' ? 'cio:p-0 cio:text-sm' : 'cio:p-2 cio:text-base',
            'cio:leading-[normal]',
            className,
          )}
          {...props}>
          {children}
        </ol>
      </RenderPropsWrapper>
    );
  },
);

const BreadcrumbsItem = React.forwardRef<HTMLLIElement, BreadcrumbsItemProps>(
  function BreadcrumbsItem({ children, className, ...props }, forwardedRef) {
    const { componentOverrides } = useBreadcrumbsContext();
    const renderProps = React.useMemo(
      () => ({ ...props, children, className }),
      [props, children, className],
    );

    return (
      <RenderPropsWrapper props={renderProps} override={componentOverrides?.item?.reactNode}>
        <li
          ref={forwardedRef}
          data-slot='breadcrumbs-item'
          className={cn('cio-breadcrumbs-item cio:inline-flex cio:items-center', className)}
          {...props}>
          {children}
        </li>
      </RenderPropsWrapper>
    );
  },
);

const linkClasses =
  'cio-breadcrumbs-link cio:inline-flex cio:items-center cio:justify-center cio:m-0 cio:bg-transparent cio:border-0 cio:font-medium cio:font-[inherit] cio:text-[length:inherit] cio:text-inherit cio:no-underline cio:cursor-pointer cio:transition-colors cio:duration-200 cio:hover:bg-accent cio:hover:text-accent-foreground cio:outline-none cio:focus-visible:ring-ring/50 cio:focus-visible:ring-[3px]';

const linkVariantClasses: Record<BreadcrumbsVariant, string> = {
  // `min-width: 28px`, `border-radius: 5px`
  default: 'cio:min-w-7 cio:px-2 cio:py-1 cio:rounded-[5px]',
  // `padding: 2px 4px`, `border-radius: 4px`, and no minimum width
  compact: 'cio:px-1 cio:py-0.5 cio:rounded-[4px]',
};

const BreadcrumbsLink = React.forwardRef<HTMLElement, BreadcrumbsLinkProps>(
  function BreadcrumbsLink({ children, className, asChild = false, ...props }, forwardedRef) {
    const { variant, componentOverrides } = useBreadcrumbsContext();
    const renderProps = React.useMemo(
      () => ({ ...props, children, className, asChild }),
      [props, children, className, asChild],
    );

    // An item without a destination is an action, not a link - PLP routes clicks through a handler.
    const hasHref = props.href !== undefined;
    const Element: React.ElementType = asChild ? Slot : hasHref ? 'a' : 'button';

    return (
      <RenderPropsWrapper props={renderProps} override={componentOverrides?.link?.reactNode}>
        <Element
          ref={forwardedRef}
          data-slot='breadcrumbs-link'
          type={!asChild && !hasHref ? 'button' : undefined}
          className={cn(linkClasses, linkVariantClasses[variant], className)}
          {...props}>
          {children}
        </Element>
      </RenderPropsWrapper>
    );
  },
);

const BreadcrumbsPage = React.forwardRef<HTMLSpanElement, BreadcrumbsPageProps>(
  function BreadcrumbsPage({ children, className, ...props }, forwardedRef) {
    const { variant, componentOverrides } = useBreadcrumbsContext();
    const renderProps = React.useMemo(
      () => ({ ...props, children, className }),
      [props, children, className],
    );

    return (
      <RenderPropsWrapper props={renderProps} override={componentOverrides?.page?.reactNode}>
        <span
          ref={forwardedRef}
          data-slot='breadcrumbs-page'
          aria-current='page'
          className={cn(
            'cio-breadcrumbs-page cio:font-medium cio:text-foreground',
            variant === 'compact' ? 'cio:px-1 cio:py-0.5' : 'cio:px-2 cio:py-1',
            className,
          )}
          {...props}>
          {children}
        </span>
      </RenderPropsWrapper>
    );
  },
);

const BreadcrumbsSeparator = React.forwardRef<HTMLLIElement, BreadcrumbsSeparatorProps>(
  function BreadcrumbsSeparator({ children, className, ...props }, forwardedRef) {
    const { componentOverrides } = useBreadcrumbsContext();
    const renderProps = React.useMemo(
      () => ({ ...props, children, className }),
      [props, children, className],
    );

    return (
      <RenderPropsWrapper props={renderProps} override={componentOverrides?.separator?.reactNode}>
        {/* Lives inside the list so the trail stays a valid `ol`, and is hidden from the
          accessibility tree so it isn't announced between items. */}
        <li
          ref={forwardedRef}
          data-slot='breadcrumbs-separator'
          role='presentation'
          aria-hidden='true'
          className={cn(
            'cio-breadcrumbs-separator cio:inline-flex cio:items-center cio:text-muted-foreground/80',
            className,
          )}
          {...props}>
          {children ?? <ChevronRightIcon />}
        </li>
      </RenderPropsWrapper>
    );
  },
);

const BreadcrumbsEllipsis = React.forwardRef<HTMLSpanElement, BreadcrumbsEllipsisProps>(
  function BreadcrumbsEllipsis({ children, className, ...props }, forwardedRef) {
    const { componentOverrides } = useBreadcrumbsContext();
    const renderProps = React.useMemo(
      () => ({ ...props, children, className }),
      [props, children, className],
    );

    return (
      <RenderPropsWrapper props={renderProps} override={componentOverrides?.ellipsis?.reactNode}>
        <span
          ref={forwardedRef}
          data-slot='breadcrumbs-ellipsis'
          className={cn(
            'cio-breadcrumbs-ellipsis cio:inline-flex cio:items-center cio:justify-center',
            className,
          )}
          {...props}>
          {children ?? <EllipsisIcon />}
        </span>
      </RenderPropsWrapper>
    );
  },
);

const BreadcrumbsMoreMenu = React.forwardRef<HTMLLIElement, BreadcrumbsMoreMenuProps>(
  function BreadcrumbsMoreMenu(
    { items, onItemClick, label = 'Show hidden breadcrumbs', className, ...props },
    forwardedRef,
  ) {
    const { variant, componentOverrides } = useBreadcrumbsContext();
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLLIElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const panelId = useStableId('cio-breadcrumbs-more-menu');

    const renderProps = React.useMemo(
      () => ({ ...props, items, onItemClick, label, className }),
      [props, items, onItemClick, label, className],
    );

    React.useEffect(() => {
      if (!isOpen) return undefined;

      const isInside = (target: EventTarget | null) =>
        !!containerRef.current?.contains(target as Node);

      const handleMouseDown = (event: MouseEvent) => {
        if (!isInside(event.target)) setIsOpen(false);
      };

      const handleFocusIn = (event: FocusEvent) => {
        if (!isInside(event.target)) setIsOpen(false);
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return;
        setIsOpen(false);
        triggerRef.current?.focus();
      };

      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('focusin', handleFocusIn);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('focusin', handleFocusIn);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen]);

    return (
      <RenderPropsWrapper props={renderProps} override={componentOverrides?.moreMenu?.reactNode}>
        <li
          ref={composeRefs(containerRef, forwardedRef)}
          data-slot='breadcrumbs-more-menu'
          className={cn(
            'cio-breadcrumbs-more-menu cio:relative cio:inline-flex cio:items-center',
            className,
          )}
          {...props}>
          <button
            ref={triggerRef}
            type='button'
            data-slot='breadcrumbs-more-menu-trigger'
            aria-haspopup='menu'
            aria-expanded={isOpen}
            aria-controls={isOpen ? panelId : undefined}
            aria-label={label}
            className={cn(linkClasses, linkVariantClasses[variant])}
            onClick={() => setIsOpen((previous) => !previous)}>
            <BreadcrumbsEllipsis />
          </button>
          {isOpen && (
            <ul
              id={panelId}
              role='menu'
              aria-label={label}
              data-slot='breadcrumbs-more-menu-list'
              className={cn(
                'cio-breadcrumbs-more-menu-list cio:absolute cio:top-full cio:left-1/2 cio:z-50 cio:mt-1 cio:-translate-x-1/2 cio:min-w-max cio:list-none cio:flex cio:flex-col cio:gap-1 cio:py-4 cio:px-0 cio:rounded-[5px] cio:shadow-lg',
                'cio:bg-primary/95 cio:text-primary-foreground',
                'cio:dark:bg-popover cio:dark:text-popover-foreground cio:dark:border cio:dark:border-white/20',
              )}>
              {items.map((item) => (
                <li key={item.id} role='none'>
                  <BreadcrumbsLink
                    role='menuitem'
                    href={item.href}
                    className={cn(
                      'cio:w-full cio:min-w-0 cio:justify-start cio:whitespace-nowrap cio:rounded-none cio:px-4 cio:py-1 cio:text-sm',
                      'cio:hover:bg-white/10 cio:hover:text-primary-foreground',
                      'cio:dark:hover:bg-accent cio:dark:hover:text-accent-foreground',
                    )}
                    onClick={(event) => {
                      setIsOpen(false);
                      triggerRef.current?.focus();
                      onItemClick?.(item, event);
                    }}>
                    {item.label}
                  </BreadcrumbsLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      </RenderPropsWrapper>
    );
  },
);

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  {
    items = [],
    currentItem,
    onItemClick,
    collapse = DEFAULT_COLLAPSE,
    variant = 'default',
    moreMenuLabel,
    componentOverrides,
    children,
    className,
    ...props
  },
  forwardedRef,
) {
  const contextValue = React.useMemo(
    () => ({ variant, componentOverrides }),
    [variant, componentOverrides],
  );

  const renderProps = React.useMemo(
    () => ({
      ...props,
      items,
      currentItem,
      onItemClick,
      collapse,
      variant,
      moreMenuLabel,
      className,
    }),
    [props, items, currentItem, onItemClick, collapse, variant, moreMenuLabel, className],
  );

  const currentLabel = typeof currentItem === 'string' ? currentItem : currentItem?.label;
  if (!currentLabel && items.length === 0 && !children) return null;

  const { leading, collapsed, trailing } = splitBreadcrumbItems(items, collapse);

  const renderItem = (item: BreadcrumbItem) => (
    <BreadcrumbsItem key={item.id}>
      <BreadcrumbsLink href={item.href} onClick={(event) => onItemClick?.(item, event)}>
        {item.label}
      </BreadcrumbsLink>
    </BreadcrumbsItem>
  );

  const entries: React.ReactElement[] = [
    ...leading.map(renderItem),
    collapsed.length > 0 && (
      <BreadcrumbsMoreMenu
        key='more-menu'
        items={collapsed}
        onItemClick={onItemClick}
        label={moreMenuLabel}
      />
    ),
    ...trailing.map(renderItem),
    currentLabel && (
      <BreadcrumbsItem key='current-page'>
        <BreadcrumbsPage>{currentLabel}</BreadcrumbsPage>
      </BreadcrumbsItem>
    ),
  ].filter((entry): entry is React.ReactElement => Boolean(entry));

  return (
    <BreadcrumbsContext.Provider value={contextValue}>
      <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
        <nav
          ref={forwardedRef}
          data-slot='breadcrumbs'
          aria-label='Breadcrumb'
          className={cn('cio-components cio-breadcrumbs', className)}
          {...props}>
          {children ?? (
            <BreadcrumbsList>
              {entries.map((entry, index) => (
                <React.Fragment key={entry.key}>
                  {index > 0 && <BreadcrumbsSeparator />}
                  {entry}
                </React.Fragment>
              ))}
            </BreadcrumbsList>
          )}
        </nav>
      </RenderPropsWrapper>
    </BreadcrumbsContext.Provider>
  );
}) as React.ForwardRefExoticComponent<BreadcrumbsProps & React.RefAttributes<HTMLElement>> & {
  List: typeof BreadcrumbsList;
  Item: typeof BreadcrumbsItem;
  Link: typeof BreadcrumbsLink;
  Page: typeof BreadcrumbsPage;
  Separator: typeof BreadcrumbsSeparator;
  Ellipsis: typeof BreadcrumbsEllipsis;
  MoreMenu: typeof BreadcrumbsMoreMenu;
};

Breadcrumbs.List = BreadcrumbsList;
Breadcrumbs.Item = BreadcrumbsItem;
Breadcrumbs.Link = BreadcrumbsLink;
Breadcrumbs.Page = BreadcrumbsPage;
Breadcrumbs.Separator = BreadcrumbsSeparator;
Breadcrumbs.Ellipsis = BreadcrumbsEllipsis;
Breadcrumbs.MoreMenu = BreadcrumbsMoreMenu;

export default Breadcrumbs;
export {
  BreadcrumbsList,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
  BreadcrumbsEllipsis,
  BreadcrumbsMoreMenu,
};
