import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Modal,
  ModalFooter,
  Button,
} from '@folio/stripes/components';

import DataProvider from './providers/DataProvider';
import CreateRecordsWrapper from './CreateRecordsWrapper';

const CreateRecordsModal = ({ onClose }) => (
  <Modal
    id="create-records-modal"
    size="large"
    data-test-create-records-modal
    dismissible
    open
    label={<FormattedMessage id="ui-plugin-create-inventory-records.fastAddLabel" />}
    enforceFocus={false}
    onClose={onClose}
    footer={
      <ModalFooter>
        <Button
          buttonStyle="primary"
          id="save-records"
          onClick={() => {
            // trigger submit outside of the form
            // https://final-form.org/docs/react-final-form/faq
            document
              .getElementById('create-records-form')
              .dispatchEvent(new Event('submit', { cancelable: true }));
          }}
        >
          <FormattedMessage id="ui-plugin-create-inventory-records.saveAndClose" />
        </Button>
        <Button id="cancel" onClick={onClose}>
          <FormattedMessage id="ui-plugin-create-inventory-records.cancel" />
        </Button>
      </ModalFooter>
      }
  >
    <DataProvider>
      <CreateRecordsWrapper onCreate={onClose} />
    </DataProvider>
  </Modal>
);

CreateRecordsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateRecordsModal;
