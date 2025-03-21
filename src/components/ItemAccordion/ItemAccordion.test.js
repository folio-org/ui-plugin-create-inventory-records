import { screen } from '@folio/jest-config-stripes/testing-library/react';

import '../../../test/jest/__mock__';
import {
  renderWithIntl,
  renderWithRouter,
  translationsProperties,
  renderWithFinalForm,
} from '../../../test/jest/helpers';

import ItemAccordion from './ItemAccordion';
import { useData } from '../../hooks';
import {
  BARCODE_SETTING,
  NUMBER_GENERATOR_OPTIONS_OFF,
  NUMBER_GENERATOR_OPTIONS_ON_EDITABLE,
  NUMBER_GENERATOR_OPTIONS_ON_NOT_EDITABLE,
} from '../../consts';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useData: jest.fn(() => ({ materialTypes: [], loanTypes: [], numberGeneratorSettings: {} })),
  useOptions: jest.fn(),
}));

const renderItemAccordion = () => {
  return renderWithIntl(
    renderWithRouter(renderWithFinalForm(<ItemAccordion change={ jest.fn() } />)),
    translationsProperties,
  );
};

describe('ItemAccordion', () => {
  it('should render accordion', () => {
    renderItemAccordion();

    expect(screen.getByRole('button', { name: /item/i })).toBeInTheDocument();
  });

  it('should render correct fields', () => {
    renderItemAccordion();

    expect(screen.getByRole('textbox', { name: /barcode/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /material type/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /permanent loan type/i })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /item notes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add check in \/ check out note/i })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /electronic access/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add electronic access/i })).toBeInTheDocument();
  });

  it('should not render generate barcode button and enable barcode field when settings=off', () => {
    useData.mockReturnValue({
      numberGeneratorSettings: { [BARCODE_SETTING]: NUMBER_GENERATOR_OPTIONS_OFF }
    });

    renderItemAccordion();

    expect(screen.queryByRole('button', { name: 'Generate barcode' })).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Barcode' })).toBeEnabled();
  });

  it('should render generate barcode button and disable barcode field when settings=onNotEditable', () => {
    useData.mockReturnValue({
      numberGeneratorSettings: { [BARCODE_SETTING]: NUMBER_GENERATOR_OPTIONS_ON_NOT_EDITABLE }
    });

    renderItemAccordion();

    expect(screen.getByRole('button', { name: 'Generate barcode' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Barcode' })).toBeDisabled();
  });

  it('should render generate barcode button and enable barcode field when settings=onEditable', () => {
    useData.mockReturnValue({
      numberGeneratorSettings: { [BARCODE_SETTING]: NUMBER_GENERATOR_OPTIONS_ON_EDITABLE }
    });

    renderItemAccordion();

    expect(screen.getByRole('button', { name: 'Generate barcode' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Barcode' })).toBeEnabled();
  });
});
