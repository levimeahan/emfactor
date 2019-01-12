// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each';

// add some helpful assertions
import 'jest-dom/extend-expect';

import * as Aphrodite from 'aphrodite';
import * as AphroditeNoImportant from 'aphrodite/no-important';

Aphrodite.StyleSheetTestUtils.suppressStyleInjection();
AphroditeNoImportant.StyleSheetTestUtils.suppressStyleInjection();
