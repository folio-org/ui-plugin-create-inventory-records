import { fireEvent } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  translationsProperties,
} from '../../../test/jest/helpers';

import PrimaryToggleButton from "./PrimaryToggleButton";

const onChangeMock = jest.fn();

const mockFields = {
  forEach: callback => {
    for (let index = 0; index < mockFields.value.length; index++) {
      callback(undefined, index);
    }
  },
  update: jest.fn(),
  value: [{
    index: 0,
    name: 'testName',
    value: 'testValue',
    primary: false,
  }],
};

const defaultProps = {
  label: 'test label',
  input: {
    value: true,
    onChange: jest.fn(),
  },
  fields: mockFields,
};

const renderPrimaryToggleButton = props => {
  const component = <PrimaryToggleButton {...defaultProps} {...props} />;

  return renderWithIntl(component, translationsProperties);
};

describe('PrimaryToggleButton component', () => {
  it('should be rendered with the label', () => {
    const {
      getByText,
      getByRole,
    } = renderPrimaryToggleButton();

    expect(getByText('test label')).toBeInTheDocument();
    expect(getByRole('button', { name: /primary/i })).toBeInTheDocument();
  });

  describe('when the value is empty', () => {
    it('should be rendered as a default button', () => {
      const { getByRole } = renderPrimaryToggleButton({ input: { value: null } });
  
      expect(getByRole('button', { name: /make primary/i })).toBeInTheDocument();
    });
  });

  describe('when click the primary button', () => {
    it('should not call the function to set primary flag for current field', () => {
      const { getByRole } = renderPrimaryToggleButton();
  
      const button = getByRole('button', { name: /primary/i });
      fireEvent.click(button);

      expect(defaultProps.input.onChange).not.toHaveBeenCalled();
    });
  });

  describe('when click the default button', () => {
    it('should call the function to set primary flag for current field', () => {
      const { getByRole } = renderPrimaryToggleButton({
        input: {
          value: null,
          onChange: onChangeMock,
        },
      });
  
      const button = getByRole('button', { name: /make primary/i });
      fireEvent.click(button);

      expect(mockFields.update).toHaveBeenCalledWith(mockFields.value[0].index, mockFields.value[0]);
      expect(onChangeMock).toHaveBeenCalled();
    });
  });
});
