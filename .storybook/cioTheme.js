import { create } from 'storybook/theming';
// Imported from the module that defines it rather than the `src/utils` barrel: the barrel also
// re-exports React components, which would pull them into Storybook's manager bundle, where the
// app's `@/` alias is not configured.
import { getPreferredColorScheme } from '../src/utils/styleHelpers'

export default create({
  brandTitle: 'Constructor',
  brandUrl: 'https://github.com/Constructor-io/constructorio-ui-components',
  brandImage: getPreferredColorScheme() === 'light' ? 'https://constructor.com/hubfs/Website%20-%202024/Logos/Logo-black.svg' : 'https://constructor.com/hubfs/Website%20-%202024/Logos/Logo-white.svg',
  brandTarget: '_blank',
});
