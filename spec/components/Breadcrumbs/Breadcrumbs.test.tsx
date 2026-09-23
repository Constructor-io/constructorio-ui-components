import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, test, expect, afterEach, vi } from 'vitest';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/breadcrumbs';

// Mirrors PLP's deepest fixture: 6 ancestors, so the default { start: 2, end: 2 } collapses 2.
const deepItems: BreadcrumbItem[] = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'coffee-tools', label: 'Coffee Tools' },
  { id: 'coffee-grinders', label: 'Coffee Grinders' },
  { id: 'manual-grinders', label: 'Manual Grinders' },
  { id: 'manual-espresso', label: 'Manual Espresso Grinders' },
];

const shortItems: BreadcrumbItem[] = deepItems.slice(0, 4);

describe('Breadcrumbs component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    test('renders nothing without items or a current page', () => {
      const { container } = render(<Breadcrumbs />);
      expect(container).toBeEmptyDOMElement();
    });

    test('renders only the current page when there are no ancestors', () => {
      render(<Breadcrumbs currentItem='All' />);
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    test('accepts the current page as an item as well as a string', () => {
      render(<Breadcrumbs currentItem={{ id: 'boots', label: 'Boots' }} />);
      expect(screen.getByText('Boots')).toBeInTheDocument();
    });

    test('marks the current page with aria-current and keeps it non-interactive', () => {
      render(<Breadcrumbs items={shortItems} currentItem='Boots' />);
      const page = screen.getByText('Boots');
      expect(page).toHaveAttribute('aria-current', 'page');
      expect(page.tagName).toBe('SPAN');
    });

    test('renders an anchor for items with an href and a button for those without', () => {
      render(
        <Breadcrumbs
          items={[
            { id: 'all', label: 'All', href: '/all' },
            { id: 'coffee', label: 'Coffee' },
          ]}
          currentItem='Beans'
        />,
      );
      expect(screen.getByRole('link', { name: 'All' })).toHaveAttribute('href', '/all');
      expect(screen.getByRole('button', { name: 'Coffee' })).toBeInTheDocument();
    });

    test('places separators inside the list, hidden from the accessibility tree', () => {
      const { container } = render(<Breadcrumbs items={shortItems} currentItem='Boots' />);
      const separators = container.querySelectorAll('[data-slot="breadcrumbs-separator"]');
      // One between each item and the current page, none trailing.
      expect(separators).toHaveLength(shortItems.length);
      separators.forEach((separator) => {
        expect(separator.tagName).toBe('LI');
        expect(separator.parentElement?.tagName).toBe('OL');
        expect(separator).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('puts a separator between items but never after the last one', () => {
      const { container } = render(<Breadcrumbs items={shortItems} />);
      const children = Array.from(
        container.querySelector('[data-slot="breadcrumbs-list"]')?.children ?? [],
      );
      expect(children).toHaveLength(shortItems.length * 2 - 1);
      expect(children[children.length - 1]).toHaveAttribute('data-slot', 'breadcrumbs-item');
    });

    test('makes interactive items take their font from the list, not the UA', () => {
      render(<Breadcrumbs items={shortItems} currentItem='Boots' />);
      // An ancestor without an `href` is a `<button>`, and the library ships no preflight - so
      // without these it keeps the UA's ~13.33px system font and renders visibly smaller than
      // the current page. Verified in Chromium: all three resolve to 16px / Inter.
      const link = screen.getByRole('button', { name: 'Coffee' });
      expect(link.classList.contains('cio:font-[inherit]')).toBeTruthy();
      expect(link.classList.contains('cio:text-[length:inherit]')).toBeTruthy();
    });

    test('gives two trails on one page non-colliding ids', () => {
      // The menu needs one id to wire `aria-controls` to its panel. The original guarantee was
      // that nothing collides when a page renders more than one trail - which hard-coded ids
      // broke in PLP - so that is what this asserts, rather than the absence of ids.
      const { container } = render(
        <>
          <Breadcrumbs items={deepItems} currentItem='Boots' />
          <Breadcrumbs items={deepItems} currentItem='Sandals' />
        </>,
      );
      const triggers = screen.getAllByRole('button', { name: 'Show hidden breadcrumbs' });
      triggers.forEach((trigger) => fireEvent.click(trigger));

      const ids = Array.from(container.querySelectorAll('[id]')).map((el) => el.id);
      expect(ids).toHaveLength(2);
      expect(new Set(ids).size).toBe(2);
      // Each trigger controls its own panel.
      triggers.forEach((trigger) => {
        const controlled = trigger.getAttribute('aria-controls');
        expect(controlled).toBeTruthy();
        expect(container.querySelector(`#${controlled}`)).toBeInTheDocument();
      });
    });
  });

  describe('collapsing', () => {
    test('collapses the middle items behind the more menu by default', () => {
      render(<Breadcrumbs items={deepItems} currentItem='Ceramic' />);
      // First 2 + last 2 stay visible
      ['All', 'Coffee', 'Manual Grinders', 'Manual Espresso Grinders'].forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
      expect(screen.queryByText('Coffee Tools')).not.toBeInTheDocument();
      expect(screen.queryByText('Coffee Grinders')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Show hidden breadcrumbs' })).toBeInTheDocument();
    });

    test('shows every item when the trail fits within the visible ends', () => {
      render(<Breadcrumbs items={shortItems} currentItem='Ceramic' />);
      shortItems.forEach((item) => expect(screen.getByText(item.label)).toBeInTheDocument());
      expect(screen.queryByRole('button', { name: 'Show hidden breadcrumbs' })).toBeNull();
    });

    test.each([
      [4, false, 0],
      [5, false, 0],
      [6, true, 2],
      [7, true, 3],
    ])('%i ancestors: more menu shown = %s, hiding %i', (count, expectsMenu, expectedHidden) => {
      const items: BreadcrumbItem[] = Array.from({ length: count }, (_, i) => ({
        id: `i${i}`,
        label: `Level ${i + 1}`,
      }));
      render(<Breadcrumbs items={items} currentItem='Current' />);

      const menu = screen.queryByRole('button', { name: 'Show hidden breadcrumbs' });
      expect(!!menu).toBe(expectsMenu);

      const shown = items.filter((item) => screen.queryByText(item.label)).length;
      expect(count - shown).toBe(expectedHidden);
    });

    test('never hides just one item behind the ellipsis', () => {
      // At exactly `start + end + 1` the ellipsis would occupy the slot the crumb would have, so
      // the trail is no shorter while a label becomes an opaque control - information lost for a
      // click gained. The menu appears only once it stands in for two or more.
      const items: BreadcrumbItem[] = Array.from({ length: 5 }, (_, i) => ({
        id: `i${i}`,
        label: `Level ${i + 1}`,
      }));
      const { container } = render(<Breadcrumbs items={items} currentItem='Current' />);
      const chips = Array.from(
        container.querySelector('[data-slot="breadcrumbs-list"]')?.children ?? [],
      ).filter((child) => child.getAttribute('data-slot') !== 'breadcrumbs-separator');
      // Every position the eye lands on carries a label.
      expect(chips).toHaveLength(6);
      chips.forEach((chip) => expect(chip.textContent?.trim()).not.toBe(''));
    });

    test('honors a custom collapse configuration', () => {
      render(
        <Breadcrumbs items={deepItems} currentItem='Ceramic' collapse={{ start: 1, end: 1 }} />,
      );
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Manual Espresso Grinders')).toBeInTheDocument();
      expect(screen.queryByText('Coffee')).not.toBeInTheDocument();
    });

    test('keeps an anchor visible at each end when collapse is zero', () => {
      // `0` reads as "reserve nothing", which would put every ancestor behind the ellipsis and
      // leave the user no visible context. Both ends clamp to one item instead.
      render(
        <Breadcrumbs items={deepItems} currentItem='Ceramic' collapse={{ start: 0, end: 0 }} />,
      );
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Manual Espresso Grinders')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Show hidden breadcrumbs' })).toBeInTheDocument();
      // The four items between the clamped ends are the ones that collapse.
      expect(screen.queryByText('Coffee')).not.toBeInTheDocument();
    });

    test('renders the full trail when collapsing is disabled', () => {
      render(<Breadcrumbs items={deepItems} currentItem='Ceramic' collapse={false} />);
      deepItems.forEach((item) => expect(screen.getByText(item.label)).toBeInTheDocument());
      expect(screen.queryByRole('button', { name: 'Show hidden breadcrumbs' })).toBeNull();
    });
  });

  describe('more menu', () => {
    const openMenu = () => {
      render(<Breadcrumbs items={deepItems} currentItem='Ceramic' />);
      const trigger = screen.getByRole('button', { name: 'Show hidden breadcrumbs' });
      fireEvent.click(trigger);
      return trigger;
    };

    test('announces itself as a popup, wired to its panel', () => {
      render(<Breadcrumbs items={deepItems} currentItem='Ceramic' />);
      const trigger = screen.getByRole('button', { name: 'Show hidden breadcrumbs' });
      // Without `aria-haspopup` a screen reader hears a plain button - and while closed,
      // `aria-expanded` alone is not announced.
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      // Nothing to control until the panel mounts.
      expect(trigger).not.toHaveAttribute('aria-controls');
    });

    test('exposes the revealed items as a menu', () => {
      const trigger = openMenu();
      const menu = screen.getByRole('menu', { name: 'Show hidden breadcrumbs' });
      expect(trigger).toHaveAttribute('aria-controls', menu.id);
      // A bare `<ul>` has no accessibility node, so the rows need explicit roles to be exposed.
      expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    });

    test('reveals the collapsed items when opened', () => {
      const trigger = openMenu();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Coffee Tools')).toBeInTheDocument();
      expect(screen.getByText('Coffee Grinders')).toBeInTheDocument();
    });

    test('closes on a second click of the trigger', () => {
      const trigger = openMenu();
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Coffee Tools')).not.toBeInTheDocument();
    });

    test('closes on a click outside', () => {
      openMenu();
      fireEvent.mouseDown(document.body);
      expect(screen.queryByText('Coffee Tools')).not.toBeInTheDocument();
    });

    test('closes on Escape and returns focus to the trigger', () => {
      const trigger = openMenu();
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByText('Coffee Tools')).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });

    test('closes when focus moves out of the menu', () => {
      openMenu();
      fireEvent.focusIn(document.body);
      expect(screen.queryByText('Coffee Tools')).not.toBeInTheDocument();
    });

    test('closes when a collapsed item is selected', () => {
      const trigger = openMenu();
      fireEvent.click(screen.getByText('Coffee Tools'));
      // Nothing else would dismiss it: the click is inside the container, so the outside-click
      // handler ignores it, and an item without an `href` is a button, so the page never
      // navigates. Left open, the stale panel hangs over the re-rendered trail.
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Coffee Grinders')).not.toBeInTheDocument();
    });

    test('returns focus to the trigger when an item is selected', () => {
      const trigger = openMenu();
      const item = screen.getByText('Coffee Tools');
      item.focus();
      fireEvent.click(item);
      // The row unmounts with the menu, so focus would otherwise drop to the body.
      expect(trigger).toHaveFocus();
    });

    test('closes for items with an href too', () => {
      const linkedItems = deepItems.map((item) => ({ ...item, href: `/c/${item.id}` }));
      render(
        <Breadcrumbs
          items={linkedItems}
          currentItem='Ceramic'
          onItemClick={(_item, event) => event.preventDefault()}
        />,
      );
      const trigger = screen.getByRole('button', { name: 'Show hidden breadcrumbs' });
      fireEvent.click(trigger);
      fireEvent.click(screen.getByText('Coffee Tools'));
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    test('hands the consumer an event it can still act on', () => {
      // Read inside the handler: React nulls `currentTarget` once dispatch finishes, so the
      // assertion can't be made against the recorded call afterwards.
      const seen: Array<{ defaultPrevented: boolean; href: string | null }> = [];
      const linkedItems = deepItems.map((item) => ({ ...item, href: `/c/${item.id}` }));
      render(
        <Breadcrumbs
          items={linkedItems}
          currentItem='Ceramic'
          onItemClick={(_item, event) => {
            seen.push({
              defaultPrevented: event.defaultPrevented,
              href: (event.currentTarget as HTMLAnchorElement).getAttribute('href'),
            });
            event.preventDefault();
          }}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Show hidden breadcrumbs' }));
      fireEvent.click(screen.getByText('Coffee Tools'));
      // Closing the menu must not consume the event - a consumer routing client-side needs to
      // call `preventDefault` itself, and `currentTarget` must still be the anchor.
      expect(seen).toEqual([{ defaultPrevented: false, href: '/c/coffee-tools' }]);
    });

    test('keeps working when the consumer passes its own ref', () => {
      // `MoreMenu` is wrapped in `forwardRef`, so the consumer's ref is composed with the internal
      // `containerRef` onto the same `<li>` rather than replacing it. If the internal one were lost,
      // `isInside` would report false for every target, so the menu would treat its own items as
      // outside clicks and close on mousedown, before the click could ever land.
      //
      // A plain function component reading `ref` out of props would satisfy this on React 19 only -
      // 16 through 18 strip it, and this library supports `react >=16.12.0`.
      const onItemClick = vi.fn();
      const consumerRef = React.createRef<HTMLLIElement>();
      render(
        <Breadcrumbs>
          <Breadcrumbs.List>
            <Breadcrumbs.MoreMenu
              ref={consumerRef}
              items={deepItems.slice(2, 4)}
              onItemClick={onItemClick}
            />
          </Breadcrumbs.List>
        </Breadcrumbs>,
      );

      // Both refs point at the same node.
      expect(consumerRef.current).toBe(
        document.querySelector('[data-slot="breadcrumbs-more-menu"]'),
      );

      const trigger = screen.getByRole('button', { name: 'Show hidden breadcrumbs' });
      fireEvent.click(trigger);
      const item = screen.getByText('Coffee Tools');
      // A real press starts with mousedown - the event the document listener sees.
      fireEvent.mouseDown(item);
      expect(item).toBeInTheDocument();
      fireEvent.click(item);
      expect(onItemClick).toHaveBeenCalledTimes(1);
    });

    test('forwards a ref from every compound part to its DOM node', () => {
      // Each part is a `forwardRef`, so a consumer measuring or focusing a node reaches the real
      // element on React 16 through 19 alike.
      const listRef = React.createRef<HTMLOListElement>();
      const itemRef = React.createRef<HTMLLIElement>();
      const linkRef = React.createRef<HTMLAnchorElement>();
      const pageRef = React.createRef<HTMLSpanElement>();
      const separatorRef = React.createRef<HTMLLIElement>();
      const ellipsisRef = React.createRef<HTMLSpanElement>();

      render(
        <Breadcrumbs>
          <Breadcrumbs.List ref={listRef}>
            <Breadcrumbs.Item ref={itemRef}>
              <Breadcrumbs.Link ref={linkRef} href='/all'>
                All
              </Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator ref={separatorRef} />
            <Breadcrumbs.Item>
              <Breadcrumbs.Ellipsis ref={ellipsisRef} />
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Page ref={pageRef}>Ceramic</Breadcrumbs.Page>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs>,
      );

      expect(listRef.current?.tagName).toBe('OL');
      expect(itemRef.current?.tagName).toBe('LI');
      expect(linkRef.current?.tagName).toBe('A');
      expect(pageRef.current?.tagName).toBe('SPAN');
      expect(separatorRef.current).toHaveAttribute('data-slot', 'breadcrumbs-separator');
      expect(ellipsisRef.current).toHaveAttribute('data-slot', 'breadcrumbs-ellipsis');
    });

    test('routes collapsed items through onItemClick rather than a pseudo path', () => {
      const onItemClick = vi.fn();
      render(<Breadcrumbs items={deepItems} currentItem='Ceramic' onItemClick={onItemClick} />);
      fireEvent.click(screen.getByRole('button', { name: 'Show hidden breadcrumbs' }));
      fireEvent.click(screen.getByText('Coffee Tools'));
      expect(onItemClick).toHaveBeenCalledWith(
        deepItems[2],
        expect.objectContaining({ type: 'click' }),
      );
    });
  });

  describe('click payloads', () => {
    test('passes the item the consumer supplied, not a copy', () => {
      const onItemClick = vi.fn();
      render(<Breadcrumbs items={shortItems} currentItem='Ceramic' onItemClick={onItemClick} />);
      fireEvent.click(screen.getByText('Coffee'));
      expect(onItemClick.mock.calls[0][0]).toBe(shortItems[1]);
    });

    test('fires for items with an href too, so consumers can route client-side', () => {
      // Prevented so jsdom doesn't attempt the navigation - the assertion is on the callback.
      const onItemClick = vi.fn((_item, event: React.MouseEvent) => event.preventDefault());
      render(
        <Breadcrumbs
          items={[{ id: 'all', label: 'All', href: '/all' }]}
          currentItem='Coffee'
          onItemClick={onItemClick}
        />,
      );
      fireEvent.click(screen.getByRole('link', { name: 'All' }));
      expect(onItemClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('compact variant', () => {
    test("the base variant keeps PLP's padding and base font size", () => {
      const { container } = render(<Breadcrumbs items={shortItems} currentItem='Boots' />);
      const list = container.querySelector('[data-slot="breadcrumbs-list"]');
      expect(list?.classList.contains('cio:p-2')).toBeTruthy();
      expect(list?.classList.contains('cio:text-base')).toBeTruthy();
    });

    test('renders a denser list', () => {
      const { container } = render(
        <Breadcrumbs items={shortItems} currentItem='Boots' variant='compact' />,
      );
      const list = container.querySelector('[data-slot="breadcrumbs-list"]');
      expect(list?.classList.contains('cio:text-sm')).toBeTruthy();
      expect(list?.classList.contains('cio:p-0')).toBeTruthy();
      expect(list?.classList.contains('cio:p-2')).toBeFalsy();
    });

    test('gives items the tighter pill geometry', () => {
      render(<Breadcrumbs items={shortItems} currentItem='Boots' variant='compact' />);
      const link = screen.getByRole('button', { name: 'Coffee' });
      expect(link.classList.contains('cio:px-1')).toBeTruthy();
      expect(link.classList.contains('cio:rounded-[4px]')).toBeTruthy();
      expect(link.classList.contains('cio:min-w-7')).toBeFalsy();
    });
  });

  describe('composition', () => {
    test('renders hand-composed children in place of the data-driven trail', () => {
      render(
        <Breadcrumbs items={deepItems}>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href='/all'>All</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
              <Breadcrumbs.Page>Coffee</Breadcrumbs.Page>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs>,
      );
      expect(screen.getByRole('link', { name: 'All' })).toBeInTheDocument();
      expect(screen.getByText('Coffee')).toHaveAttribute('aria-current', 'page');
      // `items` is ignored once children are supplied.
      expect(screen.queryByText('Coffee Tools')).not.toBeInTheDocument();
    });

    test.each([
      ['Separator', 'breadcrumbs-separator'],
      ['Ellipsis', 'breadcrumbs-ellipsis'],
    ] as const)('%s renders its default glyph, or children when given', (part, slot) => {
      const Part = Breadcrumbs[part];
      const { container, rerender } = render(
        <Breadcrumbs>
          <Breadcrumbs.List>
            <Part />
          </Breadcrumbs.List>
        </Breadcrumbs>,
      );
      expect(container.querySelector(`[data-slot="${slot}"] svg`)).toBeInTheDocument();

      rerender(
        <Breadcrumbs>
          <Breadcrumbs.List>
            <Part>/</Part>
          </Breadcrumbs.List>
        </Breadcrumbs>,
      );
      // Children replace the glyph rather than being silently dropped - both parts behave alike.
      const el = container.querySelector(`[data-slot="${slot}"]`);
      expect(el?.textContent).toBe('/');
      expect(el?.querySelector('svg')).toBeNull();
    });

    test('composes a valid list: every li is a direct child, none nested', () => {
      const { container } = render(
        <Breadcrumbs>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href='/all'>All</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.MoreMenu items={deepItems.slice(2, 4)} />
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>
              <Breadcrumbs.Page>Beans</Breadcrumbs.Page>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs>,
      );
      // `Separator` and `MoreMenu` are `<li>`s in their own right. Nesting one inside an `Item`
      // is invalid HTML: the parser closes the outer `<li>`, so server-rendered markup parses to
      // a different tree than React built and hydration mismatches.
      expect(container.querySelectorAll('li li')).toHaveLength(0);
      const list = container.querySelector('[data-slot="breadcrumbs-list"]');
      expect(list?.querySelector('[data-slot="breadcrumbs-more-menu"]')?.parentElement).toBe(list);
    });

    test('the data-driven trail nests no list items either', () => {
      const { container } = render(<Breadcrumbs items={deepItems} currentItem='Ceramic' />);
      expect(container.querySelectorAll('li li')).toHaveLength(0);
    });

    test('Link asChild forwards its props onto the child element', () => {
      render(
        <Breadcrumbs>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link asChild>
                <a href='/routed' data-testid='router-link'>
                  All
                </a>
              </Breadcrumbs.Link>
            </Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs>,
      );
      const link = screen.getByTestId('router-link');
      expect(link.className).toContain('cio-breadcrumbs-link');
      expect(link).toHaveAttribute('href', '/routed');
    });

    test('compound parts throw outside a Breadcrumbs root', () => {
      expect(() => render(<Breadcrumbs.Item>All</Breadcrumbs.Item>)).toThrow(
        /must be used within a Breadcrumbs component/,
      );
    });
  });

  describe('overrides', () => {
    test('replaces the whole trail with a root reactNode', () => {
      render(
        <Breadcrumbs
          items={shortItems}
          currentItem='Boots'
          componentOverrides={{ reactNode: <div>custom trail</div> }}
        />,
      );
      expect(screen.getByText('custom trail')).toBeInTheDocument();
      expect(screen.queryByText('All')).not.toBeInTheDocument();
    });

    test('passes every public prop to the root render function', () => {
      // A consumer replacing the root rebuilds the whole trail from these, so anything missing is
      // unreproducible - `moreMenuLabel` arriving undefined means their trigger ships unlabeled.
      let seen: Record<string, unknown> = {};
      render(
        <Breadcrumbs
          items={deepItems}
          currentItem='Ceramic'
          moreMenuLabel='Show more categories'
          collapse={{ start: 1, end: 1 }}
          variant='compact'
          componentOverrides={{
            reactNode: (props) => {
              seen = (props ?? {}) as Record<string, unknown>;
              return <div>custom</div>;
            },
          }}
        />,
      );
      expect(seen).toMatchObject({
        items: deepItems,
        currentItem: 'Ceramic',
        moreMenuLabel: 'Show more categories',
        collapse: { start: 1, end: 1 },
        variant: 'compact',
      });
    });

    test('passes the root render props to a function override', () => {
      render(
        <Breadcrumbs
          items={shortItems}
          currentItem='Boots'
          componentOverrides={{ reactNode: (props) => <div>{props?.items?.length} ancestors</div> }}
        />,
      );
      expect(screen.getByText('4 ancestors')).toBeInTheDocument();
    });

    test.each([
      ['list', 'All'],
      ['separator', 'All'],
      ['page', 'Boots'],
    ] as const)('overrides the %s slot', (slot, hiddenLabel) => {
      render(
        <Breadcrumbs
          items={shortItems}
          currentItem='Boots'
          componentOverrides={{ [slot]: { reactNode: <span>{slot} override</span> } }}
        />,
      );
      expect(screen.getAllByText(`${slot} override`).length).toBeGreaterThan(0);
      if (slot !== 'separator') {
        expect(screen.queryByText(hiddenLabel)).not.toBeInTheDocument();
      }
    });

    test('overrides each item with its own render props', () => {
      render(
        <Breadcrumbs
          items={shortItems}
          currentItem='Boots'
          componentOverrides={{ link: { reactNode: (props) => <em>{props?.children}</em> } }}
        />,
      );
      expect(screen.getByText('Coffee').tagName).toBe('EM');
    });

    test('overrides the more menu', () => {
      render(
        <Breadcrumbs
          items={deepItems}
          currentItem='Ceramic'
          componentOverrides={{
            moreMenu: { reactNode: (props) => <li>+{props?.items?.length}</li> },
          }}
        />,
      );
      expect(screen.getByText('+2')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Show hidden breadcrumbs' })).toBeNull();
    });
  });

  describe('server rendering', () => {
    test('server markup parses to the same shape it was rendered as', () => {
      const html = renderToString(
        <Breadcrumbs>
          <Breadcrumbs.List>
            <Breadcrumbs.Item>
              <Breadcrumbs.Link href='/all'>All</Breadcrumbs.Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.MoreMenu items={deepItems.slice(2, 4)} />
          </Breadcrumbs.List>
        </Breadcrumbs>,
      );
      const host = document.createElement('div');
      host.innerHTML = html;
      // Nested `<li>`s survive `renderToString` but not the parser, which closes the outer one -
      // so this is the assertion that catches an invalid composition before hydration does.
      const list = host.querySelector('[data-slot="breadcrumbs-list"]');
      expect(host.querySelectorAll('li li')).toHaveLength(0);
      expect(list?.children).toHaveLength(3);
    });

    test('renders to a string without touching the DOM', () => {
      const html = renderToString(
        <Breadcrumbs items={deepItems} currentItem='Ceramic' onItemClick={() => {}} />,
      );
      expect(html).toContain('aria-label="Breadcrumb"');
      expect(html).toContain('aria-current="page"');
      expect(html).toContain('Show hidden breadcrumbs');
      // The menu stays closed until the client interacts with it.
      expect(html).not.toContain('Coffee Tools');
    });
  });
});
