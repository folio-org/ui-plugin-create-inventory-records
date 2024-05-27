import { screen } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  renderWithRouter,
  translationsProperties,
  renderWithFinalForm,
} from '../../../test/jest/helpers';

import {
  LocationSelection,
  LocationLookup,
} from '@folio/stripes/smart-components';

import HoldingAccordion from './HoldingAccordion';

jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
  LocationSelection: jest.fn(() => <span>LocationSelection</span>),
  LocationLookup: jest.fn(() => <span>LocationLookup</span>),
}));
jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useData: jest.fn(() => ({ callNumberTypes: [] })),
  useOptions: jest.fn(),
}));

const onChangeMock = jest.fn();

const renderHoldingAccordion = () => renderWithIntl(
  renderWithRouter(renderWithFinalForm(<HoldingAccordion change={onChangeMock} />)),
  translationsProperties,
);

describe('HoldingAccordion', () => {
  afterEach(() => {
    onChangeMock.mockClear();
    LocationLookup.mockClear();
    LocationSelection.mockClear();
  });

  it('should render holding accordion', () => {
    renderHoldingAccordion();

    expect(screen.getByRole('button', { name: /holdings/i })).toBeInTheDocument();
  });

  it('should render correct fields', () => {
    renderHoldingAccordion();

    expect(screen.getByRole('combobox', { name: 'Call number type' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Call number prefix' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Call number' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Call number suffix' })).toBeInTheDocument();
  });

  describe('when select permanent location', () => {
    describe('and location is without id', () => {
      it('should set the location as an empty string', () => {
        renderHoldingAccordion();

        LocationSelection.mock.calls[0][0].onSelect();

        expect(onChangeMock).toHaveBeenCalledWith('holding.permanentLocationId', '');
      });
    });
  
    describe('and location is with id', () => {
      it('should set the location', () => {
        renderHoldingAccordion();

        LocationLookup.mock.calls[0][0].onLocationSelected({ id: 'testId' });

        expect(onChangeMock).toHaveBeenCalledWith('holding.permanentLocationId', 'testId');
      });
    });
  });

  describe('when select temporary location', () => {
    describe('and location is without id', () => {
      it('should set the location as an empty string', () => {
        renderHoldingAccordion();

        LocationSelection.mock.calls[1][0].onSelect();

        expect(onChangeMock).toHaveBeenCalledWith('holding.temporaryLocationId', '');
      });
    });
  
    describe('and location is with id', () => {
      it('should set the location', () => {
        renderHoldingAccordion();

        LocationLookup.mock.calls[1][0].onLocationSelected({ id: 'testId' });

        expect(onChangeMock).toHaveBeenCalledWith('holding.temporaryLocationId', 'testId');
      });
    });
  });
});
