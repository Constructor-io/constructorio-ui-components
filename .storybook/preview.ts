import type { Preview } from '@storybook/react-vite'
import StorybookAutodocs from './StorybookAutodocs';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'General',
          ['Introduction'],
          'Components',
          'Hooks',
        ]
      }
    },
    docs: {
      page: StorybookAutodocs,
      canvas: {
        // This will remove the "show code" button
        // https://storybook.js.org/docs/api/doc-blocks/doc-block-canvas#sourcestate
        sourceState: 'none',
      },
    }
  },
};

export default preview;
