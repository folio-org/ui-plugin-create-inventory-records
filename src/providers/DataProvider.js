import keyBy from 'lodash/keyBy';
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';

import { DataContext } from '../contexts';

const DataProvider = ({
  children,
  resources,
}) => {
  const { manifest } = DataProvider;

  const isLoading = useCallback(() => {
    for (const key in manifest) {
      if (manifest[key].type === 'okapi' && !(resources?.[key]?.hasLoaded)) {
        return true;
      }
    }

    return false;
  }, [resources, manifest]);

  const data = useMemo(() => {
    const loadedData = {};

    Object.keys(manifest).forEach(key => {
      loadedData[key] = resources?.[key]?.records ?? [];
    });

    const { instanceStatuses, configs } = loadedData;
    const fastAddValue = configs?.find(c => c.module === 'FAST_ADD')?.value || '{}';
    const inventoryValue = configs?.find(c => c.module === 'INVENTORY')?.value || '{}';
    let settings;

    try {
      // Fast add settings
      const { instanceStatusCode, defaultDiscoverySuppress = '{}' } = JSON.parse(fastAddValue);
      const discoverySuppress = JSON.parse(defaultDiscoverySuppress);
      const statusId = (instanceStatuses.find(status => status.code === instanceStatusCode) || {}).id || '';

      // Inventory settings
      const numberGeneratorSettings = JSON.parse(inventoryValue);

      settings = {
        discoverySuppress,
        numberGeneratorSettings,
        statusId,
      };
    } catch (error) {
      settings = {};
    }
    loadedData.settings = settings;
    loadedData.identifierTypesByName = keyBy(loadedData.identifierTypes, 'name');
    loadedData.holdingsSourcesByName = keyBy(loadedData.holdingsSources, 'name');

    return loadedData;
  }, [resources, manifest]);

  return (
    <DataContext.Provider value={{ data, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  resources: PropTypes.object.isRequired,
  children: PropTypes.object,
};

DataProvider.manifest = Object.freeze({
  contributorNameTypes: {
    type: 'okapi',
    records: 'contributorNameTypes',
    path: 'contributor-name-types?limit=1000&query=cql.allRecords=1 sortby ordering',
  },
  instanceTypes: {
    type: 'okapi',
    records: 'instanceTypes',
    path: 'instance-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
  instanceStatuses: {
    type: 'okapi',
    records: 'instanceStatuses',
    path: 'instance-statuses?limit=1000&query=cql.allRecords=1 sortby name',
  },
  configs: {
    type: 'okapi',
    records: 'configs',
    path: 'configurations/entries?query=((module==FAST_ADD and configName==fastAddSettings) or (module==INVENTORY and configName==number_generator))',
  },
  identifierTypes: {
    type: 'okapi',
    records: 'identifierTypes',
    path: 'identifier-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
  callNumberTypes: {
    type: 'okapi',
    path: 'call-number-types?limit=1000&query=cql.allRecords=1 sortby name',
    records: 'callNumberTypes',
  },
  materialTypes: {
    type: 'okapi',
    path: 'material-types',
    params: {
      query: 'cql.allRecords=1 sortby name',
      limit: '1000',
    },
    records: 'mtypes',
  },
  loanTypes: {
    type: 'okapi',
    path: 'loan-types',
    params: {
      query: 'cql.allRecords=1 sortby name',
      limit: '1000',
    },
    records: 'loantypes',
  },
  electronicAccessRelationships: {
    type: 'okapi',
    records: 'electronicAccessRelationships',
    path: 'electronic-access-relationships?limit=1000&query=cql.allRecords=1 sortby name',
  },
  holdingsSources: {
    type: 'okapi',
    path: 'holdings-sources',
    params: {
      query: 'cql.allRecords=1 sortby name',
      limit: '1000',
    },
    records: 'holdingsRecordsSources',
  }
});

export default stripesConnect(DataProvider);
