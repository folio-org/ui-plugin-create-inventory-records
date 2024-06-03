import {
  fireEvent,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  renderWithRouter,
  translationsProperties,
  renderWithFinalForm,
} from '../../../test/jest/helpers';

import ElectronicAccessFields from './ElectronicAccessFields';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useData: jest.fn(() => ({ electronicAccessRelationships: [] })),
  useOptions: jest.fn(),
}));

const renderElecronicAccessFields = () => {
  return renderWithIntl(
    renderWithRouter(renderWithFinalForm(<ElectronicAccessFields />)),
    translationsProperties,
  );
};

describe('ElectronicAccessFields component', () => {
  it('should render "Add electronic access" button', () => {
    renderElecronicAccessFields();

    expect(screen.getByRole('button', { name: /add electronic access/i })).toBeInTheDocument();
  });

  describe('when click "Add electronic access" button', () => {
    it('should render correct fields', () => {
      renderElecronicAccessFields();

      fireEvent.click(screen.getByRole('button', { name: /add electronic access/i }));

      expect(screen.getByRole('combobox', { name: /relationship/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /uri/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /link text/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /materials specified/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /url public note/i })).toBeInTheDocument();
    });
  });
});
