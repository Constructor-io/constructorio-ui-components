import { create } from 'storybook/theming';
import { getPreferredColorScheme } from '../src/utils'

export default create({
  brandTitle: 'Constructor',
  brandUrl: 'https://github.com/Constructor-io/constructorio-ui-components',
  brandImage: getPreferredColorScheme() === 'light' ? 'https://constructor.com/hubfs/Website%20-%202024/Logos/Logo-black.svg' : 'https://constructor.com/hubfs/Website%20-%202024/Logos/Logo-white.svg',
  brandTarget: '_blank',
});
