
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Row,
  Col,
  Select,
  TextField,
} from '@folio/stripes/components';

import CirculationNoteFields from '../CirculationNoteFields';
import ElectronicAccessFields from '../ElectronicAccessFields';
import {
  useData,
  useOptions,
} from '../../hooks';

const ItemAccordion = () => {
  const { materialTypes, loanTypes } = useData();
  const materialTypeOptions = useOptions(materialTypes, 'id', 'name');
  const permanentLoanTypeOptions = useOptions(loanTypes, 'id', 'name');

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
            fullWidth
          />
        </Col>
        <Col sm={4}>
          <FormattedMessage id="ui-plugin-create-inventory-records.selectMaterialType">
            {placeholder => (
              <Field
                label={<FormattedMessage id="ui-plugin-create-inventory-records.materialType" />}
                placeholder={placeholder}
                name="item.materialType.id"
                id="material_type"
                component={Select}
                fullWidth
                required
                dataOptions={materialTypeOptions}
              />
            )}
          </FormattedMessage>
        </Col>
        <Col sm={4}>
          <FormattedMessage id="ui-plugin-create-inventory-records.selectLoanType">
            {placeholder => (
              <Field
                label={<FormattedMessage id="ui-plugin-create-inventory-records.permanentLoanType" />}
                placeholder={placeholder}
                name="item.permanentLoanType.id"
                id="permanent_loan_type"
                component={Select}
                fullWidth
                required
                dataOptions={permanentLoanTypeOptions}
              />
            )}
          </FormattedMessage>
        </Col>
      </Row>
      <CirculationNoteFields />
      <ElectronicAccessFields />
    </Accordion>
  );
};

export default ItemAccordion;
