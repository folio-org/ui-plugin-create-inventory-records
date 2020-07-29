
import { useMemo } from 'react';

const useOptions = (data = [], value, label) => {
  return useMemo(() => data.map(item => ({
    value: item[value],
    label: item[label],
  })), [data, label, value]);
};

export default useOptions;
