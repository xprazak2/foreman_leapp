import React from 'react';
import { DropdownButton, MenuItem, Form, Col, Row } from 'patternfly-react';
import PropTypes from 'prop-types';

import { translate as __ } from 'foremanReact/common/I18n';

import './EntriesFilter.scss';

const EntriesFilter = ({
  filterType,
  filterValue,
  onFilterValueChange,
  onFilterTypeChange,
}) => {
  let filterValueField;

  const filterTypes = [
    { value: 'title', label: __('Title') },
    { value: 'severity', label: __('Severity') },
    { value: 'hostname', label: __('Host') },
    { value: 'fix', label: __('Fix Type') },
  ];

  const severityTypes = [
    { value: '', label: __('All') },
    { value: 'low', label: __('Low') },
    { value: 'medium', label: __('Medium') },
    { value: 'high', label: __('High') },
    { value: 'info', label: __('Info') },
  ];

  const fixTypes = [
    { value: '', label: __('All') },
    { value: 'hint', label: __('Hint') },
    { value: 'command', label: __('Command') },
  ];

  const selectOptionMapping = {
    severity: severityTypes,
    fix: fixTypes,
  };

  const findLabel = (selectOptions, currentValue) =>
    selectOptions.find(opt => opt.value === currentValue).label;

  if (['title', 'hostname'].includes(filterType)) {
    filterValueField = (
      <Form.FormControl
        className="entries-filter-reset-height"
        type="text"
        onChange={event => onFilterValueChange(event.target.value)}
      />
    );
  }

  if (['severity', 'fix'].includes(filterType)) {
    const options = selectOptionMapping[filterType];

    filterValueField = (
      <DropdownButton
        id="entry-value-filter"
        title={findLabel(options, filterValue)}
      >
        {options.map(type => (
          <MenuItem
            key={type.value}
            active={filterValue === type.value}
            onClick={() => onFilterValueChange(type.value)}
          >
            {type.label}
          </MenuItem>
        ))}
      </DropdownButton>
    );
  }

  return (
    <Form>
      <Row>
        <Col md={4}>
          <Form.FormGroup>
            <Form.InputGroup>
              <DropdownButton
                id="entry-filter"
                title={findLabel(filterTypes, filterType)}
                componentClass={Form.InputGroup.Button}
              >
                {filterTypes.map(type => (
                  <MenuItem
                    key={type.value}
                    active={filterType === type.value}
                    onClick={() => onFilterTypeChange(type.value)}
                  >
                    {type.label}
                  </MenuItem>
                ))}
              </DropdownButton>
              {filterValueField}
            </Form.InputGroup>
          </Form.FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

EntriesFilter.propTypes = {
  filterType: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
  onFilterTypeChange: PropTypes.func.isRequired,
  onFilterValueChange: PropTypes.func.isRequired,
};

export default EntriesFilter;
