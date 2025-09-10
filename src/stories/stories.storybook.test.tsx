import { describe, it, expect } from 'vitest';
import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';

// Import all story files
import * as InputStories from './components/Input/Input.stories';
import React from 'react';

const { Default, CustomPlaceholder, NoPlaceholder, Disabled } = composeStories(InputStories);

describe('Input Stories', () => {
  it('renders Default story', async () => {
    const { container } = render(<Default />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders CustomPlaceholder story', async () => {
    const { container } = render(<CustomPlaceholder />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders NoPlaceholder story', async () => {
    const { container } = render(<NoPlaceholder />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders Disabled story', async () => {
    const { container } = render(<Disabled />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
