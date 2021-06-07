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

import PrimaryToggleButton from '../PrimaryToggleButton';
import {
  useData,
  useOptions,
} from '../../hooks';

const ContributorFields = () => {
  const { contributorNameTypes } = useData();
  const { formatMessage } = useIntl();
  const contributorNameTypeOptions = useOptions(contributorNameTypes, 'id', 'name');

  return (
    <FieldArray
      id="clickable-add-contributor"
      component={RepeatableField}
      name="instance.contributors"
      legend={<FormattedMessage id="ui-plugin-create-inventory-records.contributors" />}
      addLabel={<FormattedMessage id="ui-plugin-create-inventory-records.addContributor" />}
      renderField={(_, index, fields) => (
        <Row>
          <Col sm={4}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.contributors.name" />}
              name={`instance.contributors[${index}].name`}
              required
              component={TextField}
            />
          </Col>
          <Col sm={4}>
            <Field
              label={<FormattedMessage id="ui-plugin-create-inventory-records.contributors.nameType" />}
              name={`instance.contributors[${index}].contributorNameTypeId`}
              required
              placeholder={formatMessage({ id: 'ui-plugin-create-inventory-records.contributors.selectType' })}
              component={Select}
              dataOptions={contributorNameTypeOptions}
            />
          </Col>
          <Col sm={4}>
            <Field
              fields={fields}
              label={<FormattedMessage id="ui-plugin-create-inventory-records.contributors.primary" />}
              name={`instance.contributors[${index}].primary`}
              component={PrimaryToggleButton}
            />
          </Col>
        </Row>
      )}
    />
  );
};

export default ContributorFields;
