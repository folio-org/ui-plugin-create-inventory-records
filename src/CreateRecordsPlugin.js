import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';

import CreateRecordsModal from './CreateRecordsModal';

const CreateRecordsPlugin = () => {
  const [isModalOpen, toggleModal] = useState(false);
  const openModal = useCallback(() => toggleModal(true), []);
  const closeModal = useCallback(() => toggleModal(false), []);

  return (
    <>
      <Button
        data-test-add-inventory-records
        marginBottom0
        onClick={openModal}
      >
        <FormattedMessage id="ui-plugin-create-inventory-records.fastAddLabel" />
      </Button>
      {isModalOpen && <CreateRecordsModal onClose={closeModal} />}
    </> //
  );
};

export default CreateRecordsPlugin;
