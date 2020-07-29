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

    for (const key in manifest) {
      if (manifest[key].type === 'okapi') {
        loadedData[key] = resources?.[key]?.records ?? [];
      }
    }

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
  identifierTypes: {
    type: 'okapi',
    records: 'identifierTypes',
    path: 'identifier-types?limit=1000&query=cql.allRecords=1 sortby name',
  },
});

export default stripesConnect(DataProvider);
