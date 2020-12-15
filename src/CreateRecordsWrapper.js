import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import { stripesConnect } from '@folio/stripes/core';
import {
  Layer,
  Paneset,
} from '@folio/stripes/components';

import CreateRecordsForm from './CreateRecordsForm';
import {
  parseInstance,
  parseHolding,
  parseItem,
} from './util';
import {
  useData,
  useCallout,
  useIsLoading,
} from './hooks';
import { circulationNoteTypes } from './consts';

const initialValues = {
  instance: {
    discoverySuppress: true,
    contributors: [],
  },
  holding: {},
  item: {
    electronicAccess: [],
    circulationNotes: [{
      noteType: circulationNoteTypes[0].value,
    }],
  },
};

const CreateRecordsWrapper = ({
  onClose,
  mutator: {
    createInstanceRecord,
    createHoldingsRecord,
    createItemRecord,
  },
}) => {
  const {
    identifierTypesByName,
    settings,
  } = useData();
  const callout = useCallout();
  const isLoading = useIsLoading();
  const intl = useIntl();

  const config = {
    ...initialValues,
    instance: {
      ...initialValues.instance,
      ...settings,
    },
  };

  const handleSubmit = useCallback(async (formData) => {
    const {
      instance,
      holding,
      item,
    } = formData;

    try {
      const instanceRecord = await createInstanceRecord.POST(parseInstance(instance, identifierTypesByName));
      const holdingsRecord = await createHoldingsRecord.POST(parseHolding(holding, instanceRecord));
      const itemRecord = await createItemRecord.POST(parseItem(item, holdingsRecord));

      callout.sendCallout({
        message: <FormattedMessage id="ui-plugin-create-inventory-records.onSave.success" />,
      });

      onClose({
        instanceRecord,
        holdingsRecord,
        itemRecord,
      });
    } catch (error) {
      callout.sendCallout({
        message: <FormattedMessage id="ui-plugin-create-inventory-records.onSave.error" />,
        type: 'error',
      });
    }
  }, [
    onClose,
    callout,
    createInstanceRecord,
    createHoldingsRecord,
    createItemRecord,
    identifierTypesByName,
  ]);

  if (isLoading) return null;

  return (
    <Paneset>
      <Layer
        isOpen
        inRootSet
        contentLabel={intl.formatMessage({ id: 'ui-plugin-create-inventory-records.fastAddLabel' })}
      >
        <CreateRecordsForm
          onSubmit={handleSubmit}
          onClose={onClose}
          initialValues={config}
        />
      </Layer>
    </Paneset>
  );
};

CreateRecordsWrapper.propTypes = {
  onClose: PropTypes.func.isRequired,
  mutator: PropTypes.object.isRequired,
};

CreateRecordsWrapper.manifest = Object.freeze({
  createInstanceRecord: {
    type: 'okapi',
    throwErrors: false,
    path: 'inventory/instances',
    fetch: false,
  },
  createHoldingsRecord: {
    type: 'okapi',
    path: 'holdings-storage/holdings',
    throwErrors: false,
    fetch: false,
  },
  createItemRecord: {
    type: 'okapi',
    path: 'inventory/items',
    throwErrors: false,
    fetch: false,
  },
});

export default stripesConnect(CreateRecordsWrapper);
