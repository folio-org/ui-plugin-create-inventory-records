import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  TextField,
  Select,
  RepeatableField,
  Row,
  Col,
} from '@folio/stripes/components';

import {
  useData,
  useOptions,
} from '../../hooks';

const ElectronicAccessFields = () => {
  const { formatMessage } = useIntl();
  const { electronicAccessRelationships } = useData();
  const eaOptions = useOptions(electronicAccessRelationships, 'id', 'name');

  return (
    <FieldArray
      id="clickable-add-electronic-access"
      component={RepeatableField}
      name="item.electronicAccess"
      legend={<FormattedMessage id="ui-plugin-create-inventory-records.electronicAccess" />}
      addLabel={<FormattedMessage id="ui-plugin-create-inventory-records.addElectronicAccess" />}
      renderField={(_, index) => (
        <Row>
          <Col sm={4}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.electronicAccess.relationship" />}
              name={`item.electronicAccess[${index}].relationshipId`}
              placeholder={formatMessage({ id: 'ui-plugin-create-inventory-records.selectType' })}
              component={Select}
              dataOptions={eaOptions}
            />
          </Col>
          <Col sm={2}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.electronicAccess.uri" />}
              name={`item.electronicAccess[${index}].uri`}
              component={TextField}
            />
          </Col>
          <Col sm={2}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.electronicAccess.linkText" />}
              name={`item.electronicAccess[${index}].linkText`}
              component={TextField}
            />
          </Col>
          <Col sm={2}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.electronicAccess.materialsSpecification" />}
              name={`item.electronicAccess[${index}].materialsSpecification`}
              component={TextField}
            />
          </Col>
          <Col sm={2}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.electronicAccess.publicNote" />}
              name={`item.electronicAccess[${index}].publicNote`}
              component={TextField}
            />
          </Col>
        </Row>
      )}
    />
  );
};

export default ElectronicAccessFields;
