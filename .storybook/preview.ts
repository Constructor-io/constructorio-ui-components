import type { Preview } from '@storybook/react-vite'
import StorybookAutodocs from './StorybookAutodocs';
import './storybook-styles.css';

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
      page: StorybookAutodocs
    }
  },
};

export default preview;
