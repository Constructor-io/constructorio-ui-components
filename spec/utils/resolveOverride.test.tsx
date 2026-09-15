import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { resolveOverride, RenderPropsWrapper } from '@/utils';

describe('resolveOverride', () => {
  afterEach(() => {
    cleanup();
  });

  test('returns the default when no override is passed', () => {
    render(<div>{resolveOverride(undefined, { a: 1 }, <span data-testid='default' />)}</div>);
    expect(screen.getByTestId('default')).toBeInTheDocument();
  });

  test('returns fixed JSX in place of the default', () => {
    render(
      <div>
        {resolveOverride(<span data-testid='override' />, { a: 1 }, <span data-testid='default' />)}
      </div>,
    );
    expect(screen.getByTestId('override')).toBeInTheDocument();
    expect(screen.queryByTestId('default')).not.toBeInTheDocument();
  });

  test('calls a render-prop override with the props it is given', () => {
    const override = vi.fn((props: { a: number }) => <span data-testid='override'>{props.a}</span>);
    render(<div>{resolveOverride(override, { a: 7 }, <span data-testid='default' />)}</div>);
    expect(override).toHaveBeenCalledWith({ a: 7 });
    expect(screen.getByTestId('override')).toHaveTextContent('7');
  });

  test('an explicit null override removes the part rather than falling back', () => {
    render(<div>{resolveOverride(null, { a: 1 }, <span data-testid='default' />)}</div>);
    expect(screen.queryByTestId('default')).not.toBeInTheDocument();
  });

  test('renders no wrapper element of its own', () => {
    const { container } = render(
      <ul>{resolveOverride(undefined, { a: 1 }, <li data-testid='default' />)}</ul>,
    );
    // The default lands as a direct child of the host element - nothing is interposed.
    expect(container.querySelector('ul')?.firstElementChild).toBe(screen.getByTestId('default'));
  });

  test('agrees with RenderPropsWrapper on every override shape', () => {
    const cases: Array<Parameters<typeof resolveOverride<{ a: number }>>[0]> = [
      undefined,
      <span data-testid='override' />,
      (props) => <span data-testid='override'>{props.a}</span>,
    ];

    cases.forEach((override) => {
      const viaHelper = render(
        <div>{resolveOverride(override, { a: 3 }, <span data-testid='default' />)}</div>,
      );
      const helperHtml = viaHelper.container.innerHTML;
      cleanup();

      const viaWrapper = render(
        <div>
          <RenderPropsWrapper props={{ a: 3 }} override={override}>
            <span data-testid='default' />
          </RenderPropsWrapper>
        </div>,
      );
      expect(viaWrapper.container.innerHTML).toBe(helperHtml);
      cleanup();
    });
  });
});
