import { useContext } from 'react';
import { CalloutContext } from '@folio/stripes/core';

const useCallout = () => useContext(CalloutContext);

export default useCallout;
