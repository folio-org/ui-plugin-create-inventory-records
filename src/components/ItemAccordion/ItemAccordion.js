
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Row,
  Col,
  Select,
  TextField,
} from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';

import CirculationNoteFields from '../CirculationNoteFields';
import ElectronicAccessFields from '../ElectronicAccessFields';
import {
  useData,
  useOptions,
} from '../../hooks';

import { validateBarcode } from '../../util';

const ItemAccordion = () => {
  const { materialTypes, loanTypes } = useData();
  const materialTypeOptions = useOptions(materialTypes, 'id', 'name');
  const permanentLoanTypeOptions = useOptions(loanTypes, 'id', 'name');
  const { formatMessage } = useIntl();
  const { okapi } = useStripes();

  return (
    <Accordion
      id="item"
      label={<FormattedMessage id="ui-plugin-create-inventory-records.itemRecord" />}
    >
      <Row>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.barcode" />}
            name="item.barcode"
            id="barcode"
            component={TextField}
            validate={validateBarcode(okapi)}
            fullWidth
          />
        </Col>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.materialType" />}
            placeholder={formatMessage({ id: 'ui-plugin-create-inventory-records.selectMaterialType' })}
            name="item.materialType.id"
            id="material_type"
            component={Select}
            fullWidth
            required
            dataOptions={materialTypeOptions}
          />
        </Col>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.permanentLoanType" />}
            placeholder={formatMessage({ id: 'ui-plugin-create-inventory-records.selectLoanType' })}
            name="item.permanentLoanType.id"
            id="permanent_loan_type"
            component={Select}
            fullWidth
            required
            dataOptions={permanentLoanTypeOptions}
          />
        </Col>
      </Row>
      <CirculationNoteFields />
      <ElectronicAccessFields />
    </Accordion>
  );
};

export default ItemAccordion;
