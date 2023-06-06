import '@Globals/Stylus/library-reset.styl'

import { withI18nextProvider } from './decorators/i18n'
import { withMetadataProvider } from './decorators/metadata'
import { withSearchProvider } from './decorators/search'
import {
  globalTypes as userGlobalTypes,
  withUserProvider,
} from './decorators/user'

export const globalTypes = {
  ...userGlobalTypes,
}

export const decorators = [
  withUserProvider,
  withSearchProvider,
  withMetadataProvider,
  withI18nextProvider,
]
