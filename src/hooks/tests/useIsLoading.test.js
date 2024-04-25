import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

import { DataContext  } from '../../contexts';
import useIsLoading from '../useIsLoading';

const wrapper = ({ children }) => (
  <DataContext.Provider value={{ isLoading: () => false }}>{children}</DataContext.Provider>
);

describe('useIsLoading hook', () => {
  it('should return value of isLoading method from the context', () => {
    const { result } = renderHook(() => useIsLoading(), { wrapper });

    expect(result.current).toEqual(false);
  });
});
