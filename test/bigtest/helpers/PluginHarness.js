import React from 'react';
import { Pluggable } from '@folio/stripes/core';

const PluginHarness = (props) => (
  <Pluggable
    aria-haspopup="true"
    type="create-inventory-records"
    id="clickable-add-inventory-records"
    onOpen={() => {}}
    onClose={() => {}}
    {...props}
  >
    <span data-test-no-plugin-available>No plugin available!</span>
  </Pluggable>
);

export default PluginHarness;
