import { screen } from '@folio/jest-config-stripes/testing-library/react';

import '../../../test/jest/__mock__';
import {
  renderWithIntl,
  renderWithRouter,
  translationsProperties,
  renderWithFinalForm,
} from '../../../test/jest/helpers';

import InstanceAccordion from './InstanceAccordion';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useData: jest.fn(() => ({ materialTypes: [], loanTypes: [] })),
  useOptions: jest.fn(),
}));

const renderInstanceAccordion = () => {
  return renderWithIntl(
    renderWithRouter(renderWithFinalForm(<InstanceAccordion />)),
    translationsProperties,
  );
};

describe('InstanceAccordion', () => {
  it('should render accordion', () => {
    renderInstanceAccordion();

    expect(screen.getByRole('button', { name: /instance/i })).toBeInTheDocument();
  });

  it('should render correct fields', () => {
    renderInstanceAccordion();

    expect(screen.getByRole('checkbox', { name: /suppress from discovery/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /instance status term/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /resource title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /publication date/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /isbn/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /issn/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /resource type/i })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /contributors/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add contributor/i })).toBeInTheDocument();
  });
});
