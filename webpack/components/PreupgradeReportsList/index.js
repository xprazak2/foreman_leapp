import React, { useState } from 'react';
import { ListView } from 'patternfly-react';
import PropTypes from 'prop-types';

import Pagination from 'foremanReact/components/Pagination/PaginationWrapper';
import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';

import PreupgradeReportEntry from './components/PreupgradeReportEntry';
import { entriesPage } from '../PreupgradeReports/PreupgradeReportsHelpers';

const PreupgradeReportsList = ({ allEntries, isSelected, toggleSelected }) => {
  const { perPage, perPageOptions } = useForemanSettings();
  const [pagination, setPagination] = useState({
    page: 1,
    perPage,
    perPageOptions,
  });

  return (
    <ListView>
      {entriesPage(allEntries, pagination).map((entry, idx) => (
        <PreupgradeReportEntry
          entry={entry}
          key={idx}
          isEntrySelected={isSelected(entry)}
          toggleSelected={toggleSelected}
         />
      ))}
      <Pagination
        viewType="list"
        itemCount={allEntries.length}
        pagination={pagination}
        onChange={newPage => setPagination({ ...pagination, ...newPage })}
        dropdownButtonId="preupgrade-report-entries-pagination-dropdown"
      />
    </ListView>
  );
};

PreupgradeReportsList.propTypes = {
  allEntries: PropTypes.array.isRequired,
  isSelected: PropTypes.func.isRequired,
  toggleSelected: PropTypes.func.isRequired,
};

export default PreupgradeReportsList;
