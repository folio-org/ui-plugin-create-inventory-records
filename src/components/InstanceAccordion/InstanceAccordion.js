
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Row,
  Col,
  Checkbox,
  Select,
  TextField,
} from '@folio/stripes/components';

import ContributorFields from '../ContributorFields';
import {
  useData,
  useOptions,
} from '../../hooks';

const InstanceAccordion = () => {
  const {
    instanceTypes,
    instanceStatuses,
  } = useData();
  const { formatMessage } = useIntl();
  const resourceTypeOptions = useOptions(instanceTypes, 'id', 'name');
  const instanceStatusOptions = useOptions(instanceStatuses, 'id', 'name');

  return (
    <Accordion
      id="instance"
      label={<FormattedMessage id="ui-plugin-create-inventory-records.instanceRecord" />}
    >
      <Row>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.discoverySuppress" />}
            name="instance.discoverySuppress"
            id="input_discovery_suppress"
            component={Checkbox}
            type="checkbox"
          />
        </Col>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.instanceStatusTerm" />}
            name="instance.statusId"
            id="select_instance_status_term"
            component={Select}
            placeholder={formatMessage({ id: 'ui-plugin-create-inventory-records.selectInstanceStatus' })}
            dataOptions={instanceStatusOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.resourceTitle" />}
            name="instance.title"
            id="input_instance_title"
            component={TextField}
            fullWidth
            required
          />
        </Col>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.publicationDate" />}
            name="instance.dateOfPublication"
            id="input_publication_date"
            fullWidth
            component={TextField}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.isbn" />}
            name="instance.isbn"
            id="isbn"
            component={TextField}
            fullWidth
          />
        </Col>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.issn" />}
            name="instance.issn"
            id="issn"
            component={TextField}
            fullWidth
          />
        </Col>
        <Col sm={4}>
          <Field
            label={<FormattedMessage id="ui-plugin-create-inventory-records.resourceType" />}
            name="instance.instanceTypeId"
            id="select_instance_type"
            type="text"
            required
            component={Select}
            placeholder={formatMessage({ id: 'ui-plugin-create-inventory-records.selectResourceType' })}
            dataOptions={resourceTypeOptions}
          />
        </Col>
      </Row>
      <ContributorFields />
    </Accordion>
  );
};

export default InstanceAccordion;
