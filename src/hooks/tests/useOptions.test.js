import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

import useOptions from '../useOptions';

const testData = [{
  id: 'testId',
  name: 'testName',
}];

const expectedData = [{
  value: 'testId',
  label: 'testName',
}];

describe('useOptions hook', () => {
  it('should return formatted options', () => {
    const { result } = renderHook(() => useOptions(testData, 'id', 'name'));

    expect(result.current).toMatchObject(expectedData);
  });

  describe('when there is no data', () => {
    it('should return an empty array', () => {
      const { result } = renderHook(() => useOptions(undefined));

      expect(result.current).toEqual([]);
    });
  });
});
