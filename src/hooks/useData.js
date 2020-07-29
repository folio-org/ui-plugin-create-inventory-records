import { useContext } from 'react';
import { DataContext } from '../contexts';

const useData = () => {
  const { data } = useContext(DataContext);

  return data;
};

export default useData;
