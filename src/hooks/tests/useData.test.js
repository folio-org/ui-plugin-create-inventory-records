import { renderHook } from '@folio/jest-config-stripes/testing-library/react';
import { DataContext } from '../../contexts';
import useData from '../useData';

const wrapper = ({ children }) => (
  <DataContext.Provider value={{ data: 'mockData' }}>
    {children}
  </DataContext.Provider>
);

describe('useData hook', () => {
  it('should return value of data from the context', () => {
    const { result } = renderHook(() => useData(), { wrapper });

    expect(result.current).toEqual('mockData');
  });
});
