import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
export const renderWithRouter = children => (
  <Router history={history}>
    {children}
  </Router>
);
