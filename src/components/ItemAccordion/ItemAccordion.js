
import React from 'react';
import PropTypes from 'prop-types';

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

import { NumberGeneratorModalButton } from '@folio/service-interaction';

import CirculationNoteFields from '../CirculationNoteFields';
import ElectronicAccessFields from '../ElectronicAccessFields';
import {
  useData,
  useOptions,
} from '../../hooks';

import { validateBarcode } from '../../util';

const ItemAccordion = ({ change }) => {
  const {
    materialTypes,
    loanTypes,
    settings: {
      numberGeneratorSettings: {
        barcodeGeneratorSettingItems
      } = {}
    } = {}
  } = useData();

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
          <Row>
            <Field
              disabled={barcodeGeneratorSettingItems === 'useGenerator'}
              label={<FormattedMessage id="ui-plugin-create-inventory-records.barcode" />}
              name="item.barcode"
              id="barcode"
              component={TextField}
              validate={validateBarcode(okapi)}
              fullWidth
            />
          </Row>
          <Row>
            {(
              barcodeGeneratorSettingItems === 'useGenerator' ||
              barcodeGeneratorSettingItems === 'useBoth'
            ) &&
              <Col xs={12}>
                <NumberGeneratorModalButton
                  buttonLabel={<FormattedMessage id="ui-inventory.numberGenerator.generateItemBarcode" />}
                  callback={(generated) => change('item.barcode', generated)}
                  id="inventoryItemBarcode"
                  generateButtonLabel={<FormattedMessage id="ui-inventory.numberGenerator.generateItemBarcode" />}
                  generator="inventory_itemBarcode"
                  modalProps={{
                    label: <FormattedMessage id="ui-inventory.numberGenerator.itemBarcodeGenerator" />
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
