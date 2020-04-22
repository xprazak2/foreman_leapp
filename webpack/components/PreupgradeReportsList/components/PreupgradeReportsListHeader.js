import React from 'react';
import { ListView } from 'patternfly-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import InfoItem from './InfoItem';
import SortableHeaderItem from './SortableHeaderItem';

const PreupgradeReportsListHeader = ({ sort, changeSort, toggleSelectAll }) => {
  const additionalInfoColumns = [
    { label: 'Host', value: 'hostname' },
    { label: 'Severity', value: 'severity' },
    { label: 'Has Remediation?', value: 'fix' },
  ];

  const additionalInfo = additionalInfoColumns.map((col, idx) => (
    <InfoItem itemId={`${idx}`} key={idx}>
      <strong>
        <SortableHeaderItem
          title={col.label}
          sort={sort}
          value={col.value}
          changeSort={changeSort}
        />
      </strong>
    </InfoItem>
  ));

  return (
    <ListView.Item
      additionalInfo={additionalInfo}
      className={classNames(
        'listViewItem--listItemVariants',
        'list-view-header'
      )}
      checkboxInput={<input type="checkbox" onClick={toggleSelectAll} />}
      description={
        <SortableHeaderItem
          title="Title"
          sort={sort}
          value="title"
          changeSort={changeSort}
        />
      }
      hideCloseIcon
      stacked
    />
  );
};

PreupgradeReportsListHeader.propTypes = {
  sort: PropTypes.object.isRequired,
  changeSort: PropTypes.func.isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
};

export default PreupgradeReportsListHeader;
