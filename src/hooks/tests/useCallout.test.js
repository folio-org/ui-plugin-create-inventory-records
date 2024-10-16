import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

import '../../../test/jest/__mock__';

import { CalloutContext } from '@folio/stripes/core';
import useCallout from '../useCallout';

const wrapper = ({ children }) => (
  <CalloutContext.Provider value={{ sendCallout: new Function() }}>
    {children}
  </CalloutContext.Provider>
);

describe('useCallout hook', () => {
  it('should return callout', () => {
    const { result } = renderHook(() => useCallout(), { wrapper });

    expect(result.current).toMatchObject({ sendCallout: expect.any(Function) });
  });
});
