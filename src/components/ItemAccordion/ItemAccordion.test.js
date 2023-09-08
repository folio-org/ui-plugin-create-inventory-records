import PropTypes from 'prop-types';
import { screen } from '@folio/jest-config-stripes/testing-library/react';

import '../../../test/jest/__mock__';
import stripesFinalForm from '@folio/stripes/final-form';
import {
    renderWithIntl,
    renderWithRouter,
    translationsProperties,
} from '../../../test/jest/helpers';

import ItemAccordion from './ItemAccordion';

jest.mock('../../hooks', () => ({
    ...jest.requireActual('../../hooks'),
    useData: jest.fn(() => ({ materialTypes: [], loanTypes: [] })),
    useOptions: jest.fn(),
}));

const onSubmit = jest.fn();

const Form = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <ItemAccordion />
    </form>
);

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

const WrappedForm = stripesFinalForm({
    navigationCheck: true,
    enableReinitialize: false,
})(Form);

const renderItemAccordion = () => {
    return renderWithIntl(
        renderWithRouter(<WrappedForm onSubmit={onSubmit} initialValues={{}} />),
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
});
