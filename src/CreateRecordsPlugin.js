import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';

import DataProvider from './providers/DataProvider';
import CreateRecordsWrapper from './CreateRecordsWrapper';

const CreateRecordsPlugin = ({
  buttonStyle,
  open,
  onOpen,
  onClose,
  buttonVisible,
}) => {
  const [isModalOpen, toggleModal] = useState(false);

  const openModal = useCallback(() => {
    toggleModal(true);

    if (onOpen) {
      onOpen();
    }
  }, [onOpen]);

  const closeModal = useCallback(() => {
    toggleModal(false);

    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => toggleModal(open), [open]);

  return (
    <>
      {
        !isModalOpen && buttonVisible &&
        <Button
          data-test-add-inventory-records
          buttonStyle={buttonStyle}
          marginBottom0
          onClick={openModal}
        >
          <FormattedMessage id="ui-plugin-create-inventory-records.fastAddLabel" />
        </Button>
      }
      {isModalOpen &&
        <DataProvider>
          <CreateRecordsWrapper onClose={closeModal} />
        </DataProvider>
      }
    </>
  );
};

CreateRecordsPlugin.defaultProps = {
  buttonVisible: true,
  open: false,
};

CreateRecordsPlugin.propTypes = {
  buttonStyle: PropTypes.string,
  buttonVisible: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default CreateRecordsPlugin;
