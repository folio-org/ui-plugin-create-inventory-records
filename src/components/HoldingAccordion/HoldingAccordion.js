
import React, { useCallback } from 'react';
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
import {
  LocationSelection,
  LocationLookup,
} from '@folio/stripes/smart-components';

import { NumberGeneratorModalButton } from '@folio/service-interaction';

import {
  useData,
  useOptions,
} from '../../hooks';

const HoldingAccordion = ({ change }) => {
  const { callNumberTypes, settings: { callNumberGeneratorSettingHoldings } } = useData();
  const callNumberTypeOptions = useOptions(callNumberTypes, 'id', 'name');
  const { formatMessage } = useIntl();

  const selectLocation = useCallback((name, loc) => {
    if (!loc) {
      change(`holding.${name}`, '');
      return;
    }

    change(`holding.${name}`, loc.id);
  }, [change]);

  return (
    <Accordion
      id="holding"
      label={<FormattedMessage id="ui-plugin-create-inventory-records.holdingsRecord" />}
    >
      <Row>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.permanentLocation" />}
            placeholder={formatMessage({ id: 'ui-plugin-create-inventory-records.selectLocation' })}
            name="holding.permanentLocationId"
            id="select_permanent_location"
            component={LocationSelection}
            fullWidth
            marginBottom0
            onSelect={loc => selectLocation('permanentLocationId', loc)}
            required
          />
          <LocationLookup onLocationSelected={loc => selectLocation('permanentLocationId', loc)} />
        </Col>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.temporaryLocation" />}
            placeholder={formatMessage({ id: 'ui-plugin-create-inventory-records.selectLocation' })}
            name="holding.temporaryLocationId"
            id="select_temporary_location"
            component={LocationSelection}
            fullWidth
            marginBottom0
            onSelect={loc => selectLocation('temporaryLocationId', loc)}
          />
          <LocationLookup onLocationSelected={loc => selectLocation('temporaryLocationId', loc)} />
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.callNumberType" />}
            name="holding.callNumberTypeId"
            id="select_call_number_type"
            component={Select}
            placeholder={formatMessage({ id: 'ui-plugin-create-inventory-records.selectType' })}
            dataOptions={callNumberTypeOptions}
          />
        </Col>
        <Col sm={3}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.callNumberPrefix" />}
            name="holding.callNumberPrefix"
            id="call_number_prefix"
            component={TextField}
            fullWidth
          />
        </Col>
        <Col sm={3}>
          <Row>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.callNumber" />}
              name="holding.callNumber"
              id="call_number"
              component={TextField}
              fullWidth
            />
          </Row>
          <Row>
            {(
              callNumberGeneratorSettingHoldings === 'useGenerator' ||
              callNumberGeneratorSettingHoldings === 'useBoth'
            ) &&
              <Col xs={12}>
                <NumberGeneratorModalButton
                  buttonLabel={<FormattedMessage id="ui-inventory.numberGenerator.generateCallNumber" />}
                  callback={(generated) => change('holding.callNumber', generated)}
                  fullWidth
                  id="inventoryCallNumber"
                  generateButtonLabel={<FormattedMessage id="ui-inventory.numberGenerator.generateCallNumber" />}
                  generator="inventory_callNumber"
                  modalProps={{
                    label: <FormattedMessage id="ui-inventory.numberGenerator.callNumberGenerator" />
                  }}
                />
              </Col>
            }
          </Row>
        </Col>
        <Col sm={3}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.callNumberSuffix" />}
            name="holding.callNumberSuffix"
            id="call_number_suffix"
            component={TextField}
            fullWidth
          />
        </Col>
      </Row>
    </Accordion>
  );
};

HoldingAccordion.propTypes = {
  change: PropTypes.func.isRequired,
};

export default HoldingAccordion;
