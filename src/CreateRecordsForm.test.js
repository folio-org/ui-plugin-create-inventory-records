import { noop } from 'lodash';
import {
  fireEvent,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  renderWithRouter,
  translationsProperties,
  renderWithFinalForm,
} from '../test/jest/helpers';

import { HoldingAccordion } from './components';
import CreateRecordsForm from './CreateRecordsForm';

jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  InstanceAccordion: jest.fn().mockReturnValue('InstanceAccordion'),
  HoldingAccordion: jest.fn().mockReturnValue('HoldingAccordion'),
  ItemAccordion: jest.fn().mockReturnValue('ItemAccordion'),
}));

jest.mock('./util', () => ({
  ...jest.requireActual('./util'),
  validateInstance: () => {},
  validateHolding: () => {},
  validateItem: () => {},
}));

const defaultProps = {
  onClose: jest.fn(),
  handleSubmit: noop,
  onSubmit: jest.fn(),
  form: { change: noop },
  pristine: true,
  submitting: false,
};

const renderCreateRecordsForm = props => {
  const component = <CreateRecordsForm {...defaultProps} {...props} />;

  return renderWithIntl(
    renderWithRouter(renderWithFinalForm(component, { initialValues: { testField: '' } }),
    translationsProperties,
  ));
};

describe('CreateRecordsForm component', () => {
  it('should render the form', () => {
    const { getByText } = renderCreateRecordsForm();

    expect(getByText('New fast add record')).toBeInTheDocument();
  });

  describe('when close the form', () => {
    it('should call the function to close the form', () => {
      const { getByText } = renderCreateRecordsForm();
      
      fireEvent.click(getByText('Cancel'));
      
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  describe('when submit the changes', () => {
    it('should call the function to save the data', async () => {
      const { container } = renderCreateRecordsForm();

      HoldingAccordion.mock.calls[0][0].change('testField', 'testValue');

      const form = container.querySelector('#create-records-form');
      fireEvent.submit(form);
        
      await waitFor(() => expect(defaultProps.onSubmit).toHaveBeenCalled());
    });
  });
});