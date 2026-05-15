import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { Slot } from '@/utils';

describe('Slot', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // 1. Renders the single child element with no wrapper
  test('renders the single child element with no extra wrapper DOM', () => {
    const { container } = render(
      <Slot>
        <a href='/'>link</a>
      </Slot>,
    );
    expect(container.firstChild).not.toBeNull();
    expect((container.firstChild as HTMLElement).tagName).toBe('A');
    expect(container.firstChild?.parentElement).toBe(container);
  });

  // 2. Forwards an object ref to the child DOM node
  test('forwards an object ref to the child DOM node', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Slot ref={ref as React.Ref<HTMLElement>}>
        <a href='/'>link</a>
      </Slot>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  // 3. Forwards a callback ref to the child DOM node
  test('forwards a callback ref to the child DOM node', () => {
    let received: HTMLElement | null = null;
    render(
      <Slot ref={(node) => { received = node; }}>
        <a href='/'>link</a>
      </Slot>,
    );
    expect(received).toBeInstanceOf(HTMLAnchorElement);
  });

  // 4. Composes slot's ref with child element's own ref
  test('composes slot ref with child own ref so both resolve to the same DOM node', () => {
    const slotRef = React.createRef<HTMLAnchorElement>();
    const childRef = React.createRef<HTMLAnchorElement>();
    render(
      <Slot ref={slotRef as React.Ref<HTMLElement>}>
        <a href='/' ref={childRef}>
          link
        </a>
      </Slot>,
    );
    expect(slotRef.current).toBeInstanceOf(HTMLAnchorElement);
    expect(childRef.current).toBeInstanceOf(HTMLAnchorElement);
    expect(slotRef.current).toBe(childRef.current);
  });

  // 5. Concatenates className from slot and child
  test('concatenates className from slot and child', () => {
    const { container } = render(
      <Slot className='slot-class'>
        <a href='/' className='child-class'>
          link
        </a>
      </Slot>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('slot-class');
    expect(el.className).toContain('child-class');
  });

  // 6. Shallow-merges style; child overrides slot on conflict
  test('shallow-merges style with child winning on conflict', () => {
    const { container } = render(
      <Slot style={{ color: 'red', margin: '4px' }}>
        <a href='/' style={{ color: 'blue', padding: '2px' }}>
          link
        </a>
      </Slot>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.color).toBe('blue');
    expect(el.style.margin).toBe('4px');
    expect(el.style.padding).toBe('2px');
  });

  // 7. Composes event handlers: child runs first, then slot
  test('composes event handlers: child handler runs before slot handler', () => {
    const order: string[] = [];
    const { container } = render(
      <Slot onClick={() => { order.push('slot'); }}>
        <button onClick={() => { order.push('child'); }} type='button'>
          click me
        </button>
      </Slot>,
    );
    const button = container.firstChild as HTMLButtonElement;
    fireEvent.click(button);
    expect(order).toEqual(['child', 'slot']);
  });

  // 8. Slot's handler fires when child has no handler of the same name
  test("slot's handler fires when child has no handler for that event", () => {
    const slotClick = vi.fn();
    const { container } = render(
      <Slot onClick={slotClick}>
        <button type='button'>click me</button>
      </Slot>,
    );
    const button = container.firstChild as HTMLButtonElement;
    fireEvent.click(button);
    expect(slotClick).toHaveBeenCalledTimes(1);
  });

  // 9. Child non-handler prop wins over slot's
  test('child non-handler props win over slot props', () => {
    const { container } = render(
      <Slot id='slot-id' aria-label='slot label'>
        <a href='/' id='child-id' aria-label='child label'>
          link
        </a>
      </Slot>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.id).toBe('child-id');
    expect(el.getAttribute('aria-label')).toBe('child label');
  });

  // 10. Throws when given multiple children
  test('throws when given multiple children', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <Slot>
          <span>one</span>
          <span>two</span>
        </Slot>,
      ),
    ).toThrow(/React.Children.only/);
  });

  // 11. Returns null when given no valid React element child
  test('returns null when given a non-element child (plain string)', () => {
    const { container } = render(<Slot>{'plain string'}</Slot>);
    expect(container.firstChild).toBeNull();
  });

  // 12. Forwards ref correctly when child is a forwardRef component
  test('forwards ref when child is a forwardRef component', () => {
    const Inner = React.forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>((props, ref) => (
      <a ref={ref} {...props} />
    ));
    Inner.displayName = 'Inner';

    const slotRef = React.createRef<HTMLAnchorElement>();
    render(
      <Slot ref={slotRef as React.Ref<HTMLElement>}>
        <Inner href='/x'>link</Inner>
      </Slot>,
    );
    expect(slotRef.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
