import isEmpty from 'lodash/isEmpty';
import React, {
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  PaneFooter,
  Button,
  Pane,
  AccordionSet,
  AccordionStatus,
  Col,
  ExpandAllButton,
  Row,
  ConfirmationModal
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import {
  InstanceAccordion,
  HoldingAccordion,
  ItemAccordion,
} from './components';
import {
  validateInstance,
  validateHolding,
  validateItem,
} from './util';

const initialStatus = {
  instance: true,
  holding: true,
  item: true,
};

const validate = (values) => {
  const instance = validateInstance(values.instance);
  const holding = validateHolding(values.holding);
  const item = validateItem(values.item);

  if (isEmpty(instance) &&
    isEmpty(holding) &&
    isEmpty(item)) {
    return {};
  }

  return {
    instance,
    holding,
    item,
  };
};

const CreateRecordsForm = ({
  onClose,
  handleSubmit,
  form,
  pristine,
  submitting,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const confirmClose = useCallback(() => {
    if (!pristine) {
      setIsModalOpen(true);
    } else {
      onClose();
    }
  }, [pristine, onClose]);

  return (
    <form
      onSubmit={handleSubmit}
      id="create-records-form"
      data-test-create-records-form
    >
      <Pane
        dismissible
        onClose={confirmClose}
        paneTitle={<FormattedMessage id="ui-plugin-create-inventory-records.fastAddLabel" />}
        defaultWidth="fill"
        footer={
          <PaneFooter
            renderStart={
              <Button
                id="cancel"
                buttonStyle="default mega"
                onClick={confirmClose}
              >
                <FormattedMessage id="ui-plugin-create-inventory-records.cancel" />
              </Button>
            }
            renderEnd={
              <Button
                buttonStyle="primary mega"
                id="save-records"
                type="submit"
                disabled={pristine || submitting}
                onClick={handleSubmit}
              >
                <FormattedMessage id="ui-plugin-create-inventory-records.saveAndClose" />
              </Button>
            }
          />
        }
      >
        <AccordionStatus>
          <Row end="xs">
            <Col data-test-expand-all xs>
              <ExpandAllButton />
            </Col>
          </Row>
          <AccordionSet initialStatus={initialStatus}>
            <InstanceAccordion />
            <HoldingAccordion change={form.change} />
            <ItemAccordion />
          </AccordionSet>
        </AccordionStatus>
      </Pane>
      <ConfirmationModal
        id="cancel-editing-confirmation"
        open={isModalOpen}
        message={<FormattedMessage id="stripes-form.unsavedChanges" />}
        heading={<FormattedMessage id="stripes-form.areYouSure" />}
        onConfirm={closeModal}
        onCancel={onClose}
        confirmLabel={<FormattedMessage id="stripes-form.keepEditing" />}
        cancelLabel={<FormattedMessage id="stripes-form.closeWithoutSaving" />}
      />
    </form>
  );
};

CreateRecordsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default stripesFinalForm({
  validate,
  navigationCheck: true,
})(CreateRecordsForm);
