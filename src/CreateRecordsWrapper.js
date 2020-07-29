import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';

import CreateRecordsForm from './CreateRecordsForm';
import { parseInstance } from './util';
import {
  useData,
  useCallout,
  useIsLoading,
} from './hooks';

const CreateRecordsWrapper = ({ onCreate, mutator }) => {
  const { identifierTypesByName } = useData();
  const callout = useCallout();
  const isLoading = useIsLoading();

  const handleSubmit = useCallback(async (formData) => {
    const { instance } = formData;

    try {
      await mutator.instance.POST(parseInstance(instance, identifierTypesByName));

      callout.sendCallout({
        message: <FormattedMessage id="ui-plugin-create-inventory-records.onSave.success" />,
      });

      onCreate();
    } catch (error) {
      callout.sendCallout({
        message: <FormattedMessage id="ui-plugin-create-inventory-records.onSave.error" />,
        type: 'error',
      });
    }
  }, [onCreate, callout, mutator, identifierTypesByName]);

  if (isLoading) return null;

  return (
    <CreateRecordsForm
      onSubmit={handleSubmit}
      initialValues={{
        instance: {
          discoverySuppress: true,
          contributors: [],
        },
        holding: {},
        item: {},
      }}
    />
  );
};

CreateRecordsWrapper.propTypes = {
  onCreate: PropTypes.func.isRequired,
  mutator: PropTypes.object.isRequired,
};

CreateRecordsWrapper.manifest = Object.freeze({
  instance: {
    type: 'okapi',
    records: 'instances',
    throwErrors: false,
    path: 'inventory/instances',
    fetch: false,
  },
});

export default stripesConnect(CreateRecordsWrapper);
