import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  translationsProperties,
} from '../test/jest/helpers';

import { DataContext } from './contexts';

import CreateRecordsForm from './CreateRecordsForm';
import CreateRecordsWrapper from "./CreateRecordsWrapper";

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Layer: ({ children }) => (
    <div>{children}</div>
  ),
  Paneset: ({ children }) => (
    <div>
      Paneset
      {children}
    </div>
  ),
}));

jest.mock('./util', () => ({
  ...jest.requireActual('./util'),
  parseInstance: () => {},
  parseHolding: () => {},
  parseItem: () => {},
}));

jest.mock('./CreateRecordsForm', () => jest.fn().mockReturnValue('CreateRecordsForm'));

const mockSendCallout = jest.fn();

jest.mock('./hooks', () => ({
  ...jest.requireActual('./hooks'),
  useCallout: () => ({ sendCallout: mockSendCallout }),
}));

const contextData = {
  isLoading: () => false,
  data: {
    identifierTypesByName: [],
    holdingsSourcesByName: [],
    settings: {},
  },
};

const defaultProps = {
  onClose: jest.fn(),
  mutator: {
    createInstanceRecord: {
      POST: jest.fn(),
    },
    createHoldingsRecord: {
      POST: jest.fn(),
    },
    createItemRecord: {
      POST: jest.fn(),
    },
  },
};

const renderCreateRecordsWrapper = (props, context = contextData) => {
  const component = (
    <DataContext.Provider value={context}>
      <CreateRecordsWrapper {...defaultProps} {...props} />
    </DataContext.Provider>
  );

  return renderWithIntl(component, translationsProperties);
};

describe('CreateRecordsWrapper component', () => {
  beforeEach(() => {
    mockSendCallout.mockClear();
  });

  it('should render CreateRecordsForm', () => {
    const { getByText } = renderCreateRecordsWrapper();

    expect(getByText('CreateRecordsForm')).toBeInTheDocument();
  });

  describe('when renderInPaneset flag is true', () => {
    it('should render CreateRecordsForm inside Paneset', () => {
      const { getByText } = renderCreateRecordsWrapper({ renderInPaneset: true });
  
      expect(getByText('Paneset').lastElementChild.innerHTML).toBe('CreateRecordsForm');
    });
  });

  describe('when the form is loading', () => {
    it('should render an empty container', () => {
      const { container } = renderCreateRecordsWrapper(
        { renderInPaneset: true },
        { ...contextData, isLoading: () => true },
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('when submit the form', () => {
    it('should call a successful message and a function to create Instance, Holding and Item', async () => {
      renderCreateRecordsWrapper();

      CreateRecordsForm.mock.calls[0][0].onSubmit({ instance: {} });

      await waitFor(() => {
        expect(defaultProps.mutator.createInstanceRecord.POST).toHaveBeenCalled();
        expect(defaultProps.mutator.createHoldingsRecord.POST).toHaveBeenCalled();
        expect(defaultProps.mutator.createItemRecord.POST).toHaveBeenCalled();

        expect(mockSendCallout).toHaveBeenCalled();
        expect(mockSendCallout.mock.calls[0][0].type).toBe('success');
      });
    });

    describe('when there is an error during saving profiles', () => {
      it('should call an error message', async () => {
        defaultProps.mutator.createInstanceRecord.POST.mockRejectedValueOnce({});
        renderCreateRecordsWrapper();
        
        CreateRecordsForm.mock.calls[0][0].onSubmit({ instance: {} });

        await waitFor(() => {
          expect(mockSendCallout).toHaveBeenCalled();
          expect(mockSendCallout.mock.calls[0][0].type).toBe('error');
        });
      });
    });
  });
});