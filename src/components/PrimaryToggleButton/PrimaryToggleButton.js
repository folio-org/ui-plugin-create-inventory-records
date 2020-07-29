import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button, Label } from '@folio/stripes/components';

const PrimaryToggleButton = ({
  label,
  input: {
    value,
    onChange,
  },
  fields,
}) => {
  const isPrimary = value === true;
  const handleClick = useCallback(() => {
    if (isPrimary) {
      return;
    }

    // Reset other primary fields
    fields.forEach((_, index) => {
      fields.update(index, { ...fields.value[index], primary: false });
    });

    // Set primary flag for current field
    onChange(true);
  }, [isPrimary, fields, onChange]);

  return (
    <>
      { label && <Label>{label}</Label>}
      <Button
        data-test-primary-toggle-button
        buttonStyle={isPrimary ? 'primary' : 'default'}
        onClick={handleClick}
        type="button"
        fullWidth
      >
        <FormattedMessage
          id={`ui-plugin-create-inventory-records.contributors.${isPrimary ? 'primary' : 'makePrimary'}`}
        />
      </Button>
    </> //
  );
};

PrimaryToggleButton.propTypes = {
  fields: PropTypes.object.isRequired,
  label: PropTypes.node,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.any,
  }).isRequired,
};

export default PrimaryToggleButton;
