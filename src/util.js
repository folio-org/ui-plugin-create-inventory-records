import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * Provide validation of an optional form field consisting of one or more
 * textfields and one or more select fields used for type id selection,
 * where both parts (text and identifier type) are required.
 *
 * @param optionalField the field description object, consisting of
 *  listName: list name (string)
 *  textFields: array of text field names
 *  selectFields: array of select field names
 * @param values array of field values passed in to caller validate function
 *
 * @return nested array of errors for optionalField
 */
export const validateOptionalField = (optionalField, values) => {
  const {
    textFields,
    selectFields,
    listName,
  } = optionalField;
  const errorList = [];

  if (!values?.[listName]?.length) {
    return errorList;
  }

  values[listName].forEach((item, i) => {
    const entryErrors = {};

    textFields.forEach((field) => {
      if (!item?.[field]) {
        entryErrors[field] = <FormattedMessage id="ui-plugin-create-inventory-records.fillIn" />;
        errorList[i] = entryErrors;
      }
    });

    selectFields.forEach((field) => {
      if (!item?.[field]) {
        entryErrors[field] = <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />;
        errorList[i] = entryErrors;
      }
    });
  });

  return errorList;
};

export const validateInstance = (instance = {}) => {
  const errors = {};

  if (!instance.title) {
    errors.title = <FormattedMessage id="ui-plugin-create-inventory-records.fillIn" />;
  }

  if (!instance.instanceTypeId) {
    errors.instanceTypeId = <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />;
  }

  const contributors = {
    listName: 'contributors',
    textFields: ['name'],
    selectFields: ['contributorNameTypeId'],
  };

  const contributorErrors = validateOptionalField(contributors, instance);

  if (contributorErrors.length) {
    errors.contributors = contributorErrors;
  }

  return errors;
};

export const validateHolding = (holding = {}) => {
  const errors = {};

  if (!holding.permanentLocationId) {
    errors.permanentLocationId = <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />;
  }

  return errors;
};

export const validateItem = (item = {}) => {
  const errors = {};

  if (!item?.materialType?.id) {
    errors.materialType = {
      id: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />
    };
  }

  if (!item?.permanentLoanType?.id) {
    errors.permanentLoanType = {
      id: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />
    };
  }

  const validationList = [
    {
      listName: 'circulationNotes',
      textFields: ['note'],
      selectFields: ['noteType'],
    },
    {
      listName: 'electronicAccess',
      textFields: ['uri'],
      selectFields: ['relationshipId'],
    }
  ];

  validationList.forEach(field => {
    const error = validateOptionalField(field, item);

    if (error.length) {
      errors[field.listName] = error;
    }
  });

  return errors;
};

export const parseIdentifiers = (instance, identifierTypesByName) => {
  const identifiers = [];
  const {
    isbn,
    issn,
  } = instance;

  if (isbn) {
    identifiers.push({
      identifierTypeId: identifierTypesByName.ISBN.id,
      value: isbn,
    });

    delete instance.isbn;
  }

  if (issn) {
    identifiers.push({
      identifierTypeId: identifierTypesByName.ISSN.id,
      value: issn,
    });

    delete instance.issn;
  }

  return identifiers;
};

export const parseInstance = (instance, identifierTypesByName) => {
  const identifiers = parseIdentifiers(instance, identifierTypesByName);

  if (identifiers.length) {
    instance.identifiers = identifiers;
  }

  if (!instance.contributors.length) {
    delete instance.contributors;
  }

  instance.staffSuppress = false;
  instance.source = 'FOLIO';

  return instance;
};

export const parseHolding = (holding, instance) => {
  holding.instanceId = instance.id;

  return holding;
};

export const parseItem = (item, holding) => {
  item.holdingsRecordId = holding.id;
  item.status = { name: 'Available' };

  const electronicAccess = item.electronicAccess.filter(ea => !isEmpty(ea));

  if (!electronicAccess.length) {
    delete item.electronicAccess;
  }

  return item;
};

export default {};
