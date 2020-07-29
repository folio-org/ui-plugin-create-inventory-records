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

import { InstanceAccordion } from './components';
import { validateInstance } from './util';

const initialStatus = {
  instance: true,
  holding: false,
  item: false,
};

const validate = (values) => {
  const instance = validateInstance(values.instance);

  return {
    instance,
  };
};

const CreateRecordsForm = ({ handleSubmit }) => (
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
      </AccordionSet>
    </AccordionStatus>
  </form>
);

CreateRecordsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default stripesFinalForm({
  validate,
  navigationCheck: true,
})(CreateRecordsForm);
