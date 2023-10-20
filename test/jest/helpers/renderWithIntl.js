import React from 'react';
import { render } from '@folio/jest-config-stripes/testing-library/react';

import { Harness } from './Harness';

export const renderWithIntl = (children, translations = [], stripes) => render(
  <Harness
    translations={translations}
    stripesCustomProps={stripes}
  >
    {children}
  </Harness>
);
