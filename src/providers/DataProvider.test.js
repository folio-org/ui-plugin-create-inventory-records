import React, { useContext } from 'react';
import { render } from '@folio/jest-config-stripes/testing-library/react';

import '../../test/jest/__mock__';

import { DataContext } from '../contexts';
import DataProvider from './DataProvider';

const mockResources = {
  contributorNameTypes: { hasLoaded: true, records: null },
  instanceTypes: { hasLoaded: true, records: null },
  instanceStatuses: { hasLoaded: true, records: [{ code: 'test', id: 'testId' }] },
  configs: { hasLoaded: true, records: [{ value: '{"instanceStatusCode":"test","defaultDiscoverySuppress":"true"}' }] },
  identifierTypes: { hasLoaded: true, records: [{ name: 'test' }] },
  callNumberTypes: { hasLoaded: true, records: null },
  materialTypes: { hasLoaded: true, records: [] },
  numberGeneratorSettings: { hasLoaded: true, records: [] },
  loanTypes: { hasLoaded: true, records: [] },
  electronicAccessRelationships: { hasLoaded: true, records: [] },
  holdingsSources: { hasLoaded: true, records: [{ name: 'test' }] },
};

let contextValue;

const TestComponent = () => {
  contextValue = useContext(DataContext);

  return <span>TestComponent</span>;
};

const renderDataProvider = resources =>
  render(
    <DataProvider resources={resources}>
      <TestComponent />
    </DataProvider>
  );

describe('DataProvider component', () => {
  it('should provide correct data and isLoading function when resources are loaded', () => {
    renderDataProvider(mockResources);

    expect(contextValue.isLoading()).toBeFalsy();
    expect(contextValue.data).toMatchObject({
      contributorNameTypes: [],
      instanceTypes: [],
      instanceStatuses: [{ code: 'test', id: 'testId' }],
      configs: [{ value: '{"instanceStatusCode":"test","defaultDiscoverySuppress":"true"}' }],
      identifierTypes: [{ name: 'test' }],
      callNumberTypes: [],
      materialTypes: [],
      numberGeneratorSettings: {},
      loanTypes: [],
      electronicAccessRelationships: [],
      holdingsSources: [{ name: 'test' }],
      settings: { discoverySuppress: true, statusId: 'testId' },
      identifierTypesByName: { test: { name: 'test' } },
      holdingsSourcesByName: { test: { name: 'test' } },
    });
  });

  it('should set isLoading to true when some resources are not loaded', () => {
    const notLoadedResources = {
      ...mockResources,
      instanceTypes: { hasLoaded: false, records: [] },
    };

    renderDataProvider(notLoadedResources);

    expect(contextValue.isLoading()).toBeTruthy();
  });

  it('should provide default empty settings when configs value is invalid', () => {
    const invalidConfigResources = {
      ...mockResources,
      configs: { hasLoaded: true, records: [{ value: 'invalid json' }] },
    };

    renderDataProvider(invalidConfigResources);

    expect(contextValue.data.settings).toMatchObject({});
  });
});
