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

import ContributorFields from './ContributorFields';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useData: jest.fn(() => ({ contributorNameTypes: [] })),
  useOptions: jest.fn(),
}));

const renderContributorFields = () => {
  return renderWithIntl(
    renderWithRouter(renderWithFinalForm(<ContributorFields />)),
    translationsProperties,
  );
};

describe('ContributorFields component', () => {
  it('should be rendered with no axe errors', async () => {
    const { container } = renderContributorFields();

    await runAxeTest({ rootNode: container });
  });

  it('should render "Add contributor" button', () => {
    renderContributorFields();

    expect(screen.getByRole('button', { name: /add contributor/i })).toBeInTheDocument();
  });

  describe('when click "Add contributor" button', () => {
    it('should render fields with no axe errors', async () => {
      const { container } = renderContributorFields();

      fireEvent.click(screen.getByRole('button', { name: /add contributor/i }));
  
      await runAxeTest({ rootNode: container });
    });

    it('should render correct fields', () => {
      renderContributorFields();

      fireEvent.click(screen.getByRole('button', { name: /add contributor/i }));

      expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: /name type/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /primary/i })).toBeInTheDocument();
    });
  });
});
