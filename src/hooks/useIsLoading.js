import { useContext } from 'react';
import { DataContext } from '../contexts';

const useIsLoading = () => {
  const { isLoading } = useContext(DataContext);

  return isLoading();
};

export default useIsLoading;
