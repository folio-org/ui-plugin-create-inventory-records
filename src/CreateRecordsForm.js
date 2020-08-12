import isEmpty from 'lodash/isEmpty';
import React from 'react';
import PropTypes from 'prop-types';

import {
  AccordionSet,
  AccordionStatus,
  Col,
  ExpandAllButton,
  Row,
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

const CreateRecordsForm = ({ handleSubmit, form }) => (
  <form
    id="create-records-form"
    data-test-create-records-form
    onSubmit={handleSubmit}
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
  </form>
);

CreateRecordsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default stripesFinalForm({
  validate,
  navigationCheck: true,
})(CreateRecordsForm);
