import React, { useState } from 'react';
import { ListView } from 'patternfly-react';
import PropTypes from 'prop-types';

import Pagination from 'foremanReact/components/Pagination/PaginationWrapper';
import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';

import PreupgradeReportEntry from './components/PreupgradeReportEntry';
import { entriesPage } from '../PreupgradeReports/PreupgradeReportsHelpers';

const PreupgradeReportsList = ({ allEntries }) => {
  const { perPage, perPageOptions } = useForemanSettings();
  const [pagination, setPagination] = useState({
    page: 1,
    perPage,
    perPageOptions,
  });

  return (
    <ListView>
      {entriesPage(allEntries, pagination).map((entry, idx) => (
        <PreupgradeReportEntry entry={entry} key={idx} />
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
};

export default PreupgradeReportsList;
