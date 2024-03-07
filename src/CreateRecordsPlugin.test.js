import { fireEvent } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  translationsProperties,
} from '../test/jest/helpers';

import CreateRecordsWrapper from './CreateRecordsWrapper';
import CreateRecordsPlugin from './CreateRecordsPlugin';

jest.mock('./providers/DataProvider', () => jest.fn(({ children }) => <div id='data-provider'>{children}</div>));
jest.mock('./CreateRecordsWrapper', () => jest.fn().mockReturnValue('CreateRecordsWrapper'));

const renderCustomButton = () => <button>Custom button</button>;
const defaultProps = {
  onOpen: jest.fn(),
  onClose: jest.fn(),
};

const renderCreateRecordsPlugin = props => {
  const component = <CreateRecordsPlugin {...defaultProps} {...props} />;

  return renderWithIntl(component, translationsProperties);
};

describe('CreateRecordsPlugin component', () => {
  it('should render the button to add the record', () => {
    const { getByText } = renderCreateRecordsPlugin();

    expect(getByText('New fast add record')).toBeInTheDocument();
  });

  describe('when click the button', () => {
    it('should render the modal', () => {
      const { getByText } = renderCreateRecordsPlugin();

      fireEvent.click(getByText('New fast add record'));
  
      expect(getByText('CreateRecordsWrapper')).toBeInTheDocument();
    });
  });

  describe('when close the modal', () => {
    it('should call the function to close the modal', () => {
      const { getByText } = renderCreateRecordsPlugin();

      fireEvent.click(getByText('New fast add record'));

      CreateRecordsWrapper.mock.calls[0][0].onClose();
  
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  describe('when renderTrigger prop is provided', () => {
    it('should render the custom button', () => {
      const { getByText } = renderCreateRecordsPlugin({ renderTrigger: renderCustomButton });
  
      expect(getByText('Custom button')).toBeInTheDocument();
    });
  });
});
