import React from 'react';
import { FormattedMessage } from 'react-intl';

import '../test/jest/__mock__';

import * as utils from './util';

describe('utils', () => {
  describe('validateOptionalField', () => {
    it('should return empty error list when there is no listName values', () => {
      const optionalField = {
        textFields: ['textField1'],
        selectFields: ['selectField1'],
        listName: 'listName',
      };

      const values = { listName: [] };

      expect(utils.validateOptionalField(optionalField, values)).toEqual([]);
    });

    it('should return empty error list when validation passed for textFields and selectFields', () => {
      const optionalField = {
        textFields: ['textField1'],
        selectFields: ['selectField1'],
        listName: 'listName',
      };

      const values = {
        listName: [{
          textField1: 'value',
          selectField1: 'value',
        }],
      };

      expect(utils.validateOptionalField(optionalField, values)).toEqual([]);
    });

    it('should return correct error list', () => {
      const optionalField = {
        textFields: ['textField1'],
        selectFields: ['selectField1'],
        listName: 'listName',
      };

      const values = {
        listName: [{
          textField1: '',
          selectField1: '',
        }],
      };

      const expectedErrorList = [{
        textField1: <FormattedMessage id="ui-plugin-create-inventory-records.fillIn" />,
        selectField1: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />,
      }];

      expect(utils.validateOptionalField(optionalField, values)).toEqual(expectedErrorList);
    });
  });

  describe('validateInstance', () => {
    it('should return empty result when validation passed', () => {
      const instance = {
        title: 'title',
        instanceTypeId: 'instanceTypeId',
        contributors: [{ name: 'value', contributorNameTypeId: 'value' }],
      };

      expect(utils.validateInstance(instance)).toEqual({});
    });

    it('should return correct errors', () => {
      const instance = { contributors: [{}] };
      const expectedResult = {
        title: <FormattedMessage id="ui-plugin-create-inventory-records.fillIn" />,
        instanceTypeId: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />,
        contributors: [{
          name: <FormattedMessage id="ui-plugin-create-inventory-records.fillIn" />,
          contributorNameTypeId: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />
        }]
      }

      expect(utils.validateInstance(instance)).toEqual(expectedResult);
    });
  });

  describe('validateHolding', () => {
    it('should return empty result when validation passed', () => {
      const holding = { permanentLocationId: 'permanentLocationId' };

      expect(utils.validateHolding(holding)).toEqual({});
    });

    it('should return correct errors', () => {
      const holding = {};
      const expectedResult = {
        permanentLocationId: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />,
      };

      expect(utils.validateHolding(holding)).toEqual(expectedResult);
    });
  });

  describe('validateItem', () => {
    it('should return empty result when validation passed', () => {
      const item = {
        materialType: { id: 'materialTypeId' },
        permanentLoanType: { id: 'permanentLoanType' },
        circulationNotes: [{ note: 'value', noteType: 'value' }],
        electronicAccess: [{ uri: 'value', relationshipId: 'value' }],
      };

      expect(utils.validateItem(item)).toEqual({});
    });

    it('should return correct errors', () => {
      const item = {
        circulationNotes: [{}],
        electronicAccess: [{}],
      };
      const expectedResult = {
        materialType: {
          id: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />
        },
        permanentLoanType: {
          id: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />
        },
        circulationNotes: [{
          note: <FormattedMessage id="ui-plugin-create-inventory-records.fillIn" />,
          noteType: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />,
        }],
        electronicAccess: [{
          uri: <FormattedMessage id="ui-plugin-create-inventory-records.fillIn" />,
          relationshipId: <FormattedMessage id="ui-plugin-create-inventory-records.selectToContinue" />,
        }],
      };

      expect(utils.validateItem(item)).toEqual(expectedResult);
    });
  });

  describe('parseIdentifiers', () => {
    it('should return empty identifiers when instance does not have isbn/issn', () => {
      const instance = {};
      const identifierTypesByName = {};

      expect(utils.parseIdentifiers(instance, identifierTypesByName)).toEqual([]);
    });

    it('should return correct list of identifiers', () => {
      const instance = {
        isbn: 'isbn',
        issn: 'issn',
      };
      const identifierTypesByName = {
        ISBN: { id: 'ISBN_id' },
        ISSN: { id: 'ISSN_id' },
      };
      const identifiers = [{
        identifierTypeId: 'ISBN_id',
        value: 'isbn',
      }, {
        identifierTypeId: 'ISSN_id',
        value: 'issn',
      }];

      expect(utils.parseIdentifiers(instance, identifierTypesByName)).toEqual(identifiers);
    });
  });

  describe('parseInstance', () => {
    it('should correctly parse instance 1', () => {
      const instance = {
        contributors: [{}],
      };
      const identifierTypesByName = {};
      const parsedInstance = {
        contributors: [{}],
        staffSuppress: false,
        source: 'FOLIO',
      };

      expect(utils.parseInstance(instance, identifierTypesByName)).toEqual(parsedInstance);
    });

    it('should correctly parse instance 2', () => {
      const instance = {
        isbn: 'isbn',
        issn: 'issn',
        dateOfPublication: '2024-03-14',
        contributors: [],
      };
      const identifierTypesByName = {
        ISBN: { id: 'ISBN_id' },
        ISSN: { id: 'ISSN_id' },
      };
      const identifiers = [{
        identifierTypeId: 'ISBN_id',
        value: 'isbn',
      }, {
        identifierTypeId: 'ISSN_id',
        value: 'issn',
      }];
      const parsedInstance = {
        identifiers,
        publication: [{ dateOfPublication: instance.dateOfPublication }],
        staffSuppress: false,
        source: 'FOLIO',
      };

      expect(utils.parseInstance(instance, identifierTypesByName)).toEqual(parsedInstance);
    });
  });

  describe('parseHolding', () => {
    it('should correctly parse holdings', () => {
      const holding = {};
      const instance = {
        id: 'instanceId',
      };
      const holdingsSourcesByName = {
        FOLIO: { id: 'FOLIO_id' },
      };
      const parsedHolding = {
        instanceId: 'instanceId',
        sourceId: 'FOLIO_id'
      };

      expect(utils.parseHolding(holding, instance, holdingsSourcesByName)).toEqual(parsedHolding);
    });
  });

  describe('parseItem', () => {
    it('should correctly parse item 1', () => {
      const item = {
        electronicAccess: [{}],
      };
      const holding = { id: 'holdingsRecordId' };
      const parsedItem = {
        holdingsRecordId: 'holdingsRecordId',
        status: { name: 'Available' },
      };

      expect(utils.parseItem(item, holding)).toEqual(parsedItem);
    });

    it('should correctly parse item 2', () => {
      const item = {
        electronicAccess: [{ name: 'electronicAccess' }],
      };
      const holding = { id: 'holdingsRecordId' };
      const parsedItem = {
        electronicAccess: [{ name: 'electronicAccess' }],
        holdingsRecordId: 'holdingsRecordId',
        status: { name: 'Available' },
      };

      expect(utils.parseItem(item, holding)).toEqual(parsedItem);
    });
  });

  describe('mutators', () => {
    it('should return function to updateValue', () => {
      const state = {};
      const utilsArg = { changeValue: jest.fn() };
      utils.mutators.updateValue(['name', 'newValue'], state, utilsArg);

      expect(utilsArg.changeValue).toHaveBeenCalledWith(state, 'name', expect.any(Function));
    });
  });

  describe('memoize', () => {
    it('should return last function`s result', () => {
      const fn = (arg) => { return arg };

      expect(utils.memoize(fn)('lastResult')).toEqual('lastResult');
    });
  });
});
