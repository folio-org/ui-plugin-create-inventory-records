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
    const value = configs[0]?.value || '';
    let config;

    try {
      const { instanceStatusCode, defaultDiscoverySuppress } = JSON.parse(value);
      const discoverySuppress = JSON.parse(defaultDiscoverySuppress);
      const statusId = (instanceStatuses.find(status => status.code === instanceStatusCode) || {}).id || '';

      config = {
        discoverySuppress,
        statusId,
      };
    } catch (error) {
      config = {};
    }
    loadedData.settings = config;
    loadedData.identifierTypesByName = keyBy(loadedData.identifierTypes, 'name');

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
    path: 'configurations/entries?query=(module==FAST_ADD and configName==fastAddSettings)',
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
});

export default stripesConnect(DataProvider);
