import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import { NumberGeneratorModalButton } from '@folio/service-interaction';
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
import {
  BARCODE_SETTING,
  NUMBER_GENERATOR_OPTIONS_ON_EDITABLE,
  NUMBER_GENERATOR_OPTIONS_ON_NOT_EDITABLE,
} from '../../consts';

import { validateBarcode } from '../../util';

const ItemAccordion = ({ change }) => {
  const {
    materialTypes,
    loanTypes,
    numberGeneratorSettings,
  } = useData();

  const materialTypeOptions = useOptions(materialTypes, 'id', 'name');
  const permanentLoanTypeOptions = useOptions(loanTypes, 'id', 'name');
  const { formatMessage } = useIntl();
  const { okapi } = useStripes();

  const isBarcodeDisabled = numberGeneratorSettings?.[BARCODE_SETTING] === NUMBER_GENERATOR_OPTIONS_ON_NOT_EDITABLE;
  const showNumberGeneratorForBarcode = isBarcodeDisabled || numberGeneratorSettings?.[BARCODE_SETTING] === NUMBER_GENERATOR_OPTIONS_ON_EDITABLE;

  return (
    <Accordion
      id="item"
      label={<FormattedMessage id="ui-plugin-create-inventory-records.itemRecord" />}
    >
      <Row>
        <Col sm={4}>
          <Field
            disabled={isBarcodeDisabled}
            label={<FormattedMessage id="ui-plugin-create-inventory-records.barcode" />}
            name="item.barcode"
            id="barcode"
            component={TextField}
            validate={validateBarcode(okapi)}
            fullWidth
          />
          <Row>
            {showNumberGeneratorForBarcode &&
              <Col xs={12}>
                <NumberGeneratorModalButton
                  buttonLabel={<FormattedMessage id="ui-plugin-create-inventory-records.numberGenerator.generateBarcode" />}
                  callback={(generated) => change('item.barcode', generated)}
                  id="inventoryItemBarcode"
                  generateButtonLabel={<FormattedMessage id="ui-plugin-create-inventory-records.numberGenerator.generateBarcode" />}
                  generator="inventory_itemBarcode"
                  modalProps={{
                    label: <FormattedMessage id="ui-plugin-create-inventory-records.numberGenerator.generateBarcode" />
                  }}
                />
              </Col>
            }
          </Row>
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

ItemAccordion.propTypes = {
  change: PropTypes.func.isRequired,
};

export default ItemAccordion;
