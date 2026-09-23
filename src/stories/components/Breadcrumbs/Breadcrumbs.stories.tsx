import { useState } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import Breadcrumbs, {
  type BreadcrumbItem,
  type BreadcrumbsOverrides,
} from '../../../components/breadcrumbs';

const canvas = (background: string): Decorator =>
  function CanvasDecorator(Story) {
    return (
      <div style={{ background, borderRadius: 8 }}>
        <Story />
      </div>
    );
  };

const PAGE_TINT = '#F6F9FC';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  decorators: [canvas(PAGE_TINT)],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'compact'],
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ported from PLP's Breadcrumbs stories: the same category trails, mapped onto `BreadcrumbItem`.
const oneAncestor: BreadcrumbItem[] = [{ id: 'all', label: 'All' }];

const threeAncestors: BreadcrumbItem[] = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'coffee-tools', label: 'Coffee Tools' },
];

const sevenAncestors: BreadcrumbItem[] = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'coffee-tools', label: 'Coffee Tools' },
  { id: 'coffee-grinders', label: 'Coffee Grinders' },
  { id: 'manual-coffee-grinders', label: 'Manual Grinders' },
  { id: 'manual-espresso-grinders', label: 'Manual Espresso Grinders' },
  { id: 'manual-espresso-grinders-conical', label: 'Manual Conical Grinders' },
];

export const Default: Story = {
  args: {
    items: oneAncestor,
    currentItem: 'Coffee',
  },
};

// Four or fewer ancestors fit within the default `{ start: 2, end: 2 }`, so nothing collapses.
export const FourOrFewerAncestors: Story = {
  args: {
    items: threeAncestors,
    currentItem: 'Coffee Accessories',
  },
};

// Past four, the middle folds into the ellipsis menu — first two and last two stay visible.
export const CollapsedAncestors: Story = {
  args: {
    items: sevenAncestors,
    currentItem: 'Manual Ceramic Conical Grinders',
  },
};

export const CollapsingDisabled: Story = {
  args: {
    items: sevenAncestors,
    currentItem: 'Manual Ceramic Conical Grinders',
    collapse: false,
  },
};

// `collapse` controls how much of each end survives — here only the root and the immediate parent.
export const CustomCollapse: Story = {
  args: {
    items: sevenAncestors,
    currentItem: 'Manual Ceramic Conical Grinders',
    collapse: { start: 1, end: 1 },
  },
};

// The denser inline trail, for sidebars and filter panels.
export const Compact: Story = {
  args: {
    items: threeAncestors,
    currentItem: 'Coffee Accessories',
    variant: 'compact',
  },
};

// Items carrying an `href` render as anchors, so the trail works without JavaScript and still
// reports clicks through `onItemClick`. The click is left alone, so it navigates - a consumer
// routing client-side calls `event.preventDefault()` in the handler, as the story below does.
export const ItemsAsLinks: Story = {
  args: {
    items: sevenAncestors.map((item) => ({ ...item, href: `/c/${item.id}` })),
    currentItem: 'Manual Ceramic Conical Grinders',
  },
};

// Anchors for crawlers and middle-click, but clicks handled in JS: `preventDefault` suppresses the
// navigation and the handler routes instead. This is the shape a router integration takes.
export function ClientSideRouting() {
  const [current, setCurrent] = useState('Manual Ceramic Conical Grinders');
  const [routedTo, setRoutedTo] = useState<string>();
  const items = sevenAncestors.map((item) => ({ ...item, href: `/c/${item.id}` }));

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
      <Breadcrumbs
        items={items}
        currentItem={current}
        onItemClick={(item, event) => {
          event.preventDefault();
          setRoutedTo(item.href);
          setCurrent(item.label);
        }}
      />
      <small style={{ color: '#666' }}>
        {routedTo ? `Routed to ${routedTo} without a page load` : 'Click a breadcrumb'}
      </small>
    </div>
  );
}

// Clicks on visible and collapsed items alike arrive at `onItemClick` with the item that was
// activated
export function ClickHandling() {
  const [current, setCurrent] = useState('Manual Ceramic Conical Grinders');
  const [lastClicked, setLastClicked] = useState<string>();

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
      <Breadcrumbs
        items={sevenAncestors}
        currentItem={current}
        onItemClick={(item) => {
          setLastClicked(item.id);
          setCurrent(item.label);
        }}
      />
      <small style={{ color: '#666' }}>
        {lastClicked ? `Navigated to: ${lastClicked}` : 'Click a breadcrumb'}
      </small>
    </div>
  );
}

// Composition mode: pass the parts by hand instead of `items`. `Link asChild` hands the link
// props to your own element, so a router link keeps its behavior and picks up the styling.
//
// `Separator` and `MoreMenu` are themselves `<li>`s, so they go straight into `List` as siblings
// of the `Item`s - never wrapped in one. Only `Link` and `Page` sit inside an `Item`.
export function Composition() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link asChild>
            <a href='/all'>All</a>
          </Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href='/all/coffee'>Coffee</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.MoreMenu
          items={[
            { id: 'coffee-tools', label: 'Coffee Tools', href: '/all/coffee/tools' },
            { id: 'coffee-grinders', label: 'Coffee Grinders', href: '/all/coffee/grinders' },
          ]}
        />
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Manual Grinders</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}

const linkStyle = {
  background: 'none',
  border: 0,
  padding: 0,
  font: 'inherit',
  cursor: 'pointer',
} as const;

// The trail follows the theme tokens, so it inverts with the surrounding page. The collapsed
// menu is the one part that can't simply invert: on a light page it's a dark translucent panel
// (PLP's design), and in dark mode it switches to the lighter `popover` surface so it still
// reads as elevated rather than merging into the background. Open the menu in both to compare.
export const DarkMode: Story = {
  args: {
    items: sevenAncestors,
    currentItem: 'Manual Ceramic Conical Grinders',
  },
  decorators: [
    // `.dark` flips the tokens, and the canvas below it paints the themed page color - the trail
    // itself stays transparent in both themes.
    canvas('var(--cio-background)'),
    function DarkTheme(Story) {
      return (
        <div className='dark'>
          <Story />
        </div>
      );
    },
  ],
};

// Every part has an override slot. Each `reactNode` takes fixed JSX or a render-prop function
// that receives the part's own props.
const overrides: BreadcrumbsOverrides = {
  separator: {
    reactNode: (
      <li aria-hidden='true' style={{ color: '#bbb' }}>
        /
      </li>
    ),
  },
  link: {
    reactNode: (props) => (
      <button type='button' onClick={props?.onClick} style={{ ...linkStyle, color: '#6c5ce7' }}>
        {props?.children}
      </button>
    ),
  },
  page: {
    reactNode: (props) => (
      <span aria-current='page' style={{ fontWeight: 700 }}>
        {props?.children}
      </span>
    ),
  },
};

export const Overrides: Story = {
  args: {
    items: threeAncestors,
    currentItem: 'Coffee Accessories',
    componentOverrides: overrides,
  },
};
