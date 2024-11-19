import {
  fireEvent,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import { runAxeTest } from '@folio/stripes-testing';

import {
  renderWithIntl,
  renderWithRouter,
  translationsProperties,
  renderWithFinalForm,
} from '../../../test/jest/helpers';

import CirculationNoteFields from './CirculationNoteFields';

const renderCirculationNoteFields = () => {
  return renderWithIntl(
    renderWithRouter(renderWithFinalForm(<CirculationNoteFields />)),
    translationsProperties,
  );
};

describe('CirculationNoteFields component', () => {
  it('should be rendered with no axe errors', async () => {
    const { container } = renderCirculationNoteFields();

    await runAxeTest({ rootNode: container });
  });

  it('should render correct group of fields', () => {
    renderCirculationNoteFields();

    expect(screen.getByRole('group', { name: /item notes/i })).toBeInTheDocument();
  });

  it('should render "Add check in / check out note" button', () => {
    renderCirculationNoteFields();

    expect(screen.getByRole('button', { name: /add check in \/ check out note/i })).toBeInTheDocument();
  });

  describe('when clicking "Add check in / check out note" button', () => {
    it('should render fields with no axe errors', async () => {
      const { container } = renderCirculationNoteFields();

      fireEvent.click(screen.getByRole('button', { name: /add check in \/ check out note/i }));

      await runAxeTest({ rootNode: container });
    });

    it('should render correct fields', () => {
      renderCirculationNoteFields();

      fireEvent.click(screen.getByRole('button', { name: /add check in \/ check out note/i }));

      expect(screen.getByRole('combobox', { name: /note type/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /note/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /staff only/i })).toBeInTheDocument();
    });

    it('should render correct "Note type" dropdown options', () => {
      renderCirculationNoteFields();

      fireEvent.click(screen.getByRole('button', { name: /add check in \/ check out note/i }));
      fireEvent.click(screen.getByRole('combobox', { name: /note type/i }));

      expect(screen.getByRole('option', { name: /check in note/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /check out note/i })).toBeInTheDocument();
    });
  });
});
