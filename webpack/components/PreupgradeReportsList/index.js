import React, { useState } from 'react';
import { ListView } from 'patternfly-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Pagination from 'foremanReact/components/Pagination/PaginationWrapper';

import { useForemanSettings } from 'foremanReact/Root/Context/ForemanContext';

import PreupgradeReportEntry from './components/PreupgradeReportEntry';

const entriesPage = (entries, pagination) => {
  const offset = (pagination.page - 1) * pagination.perPage;

  return entries.slice(offset, offset + pagination.perPage);
};

const PreupgradeReportsList = ({ allEntries, fixAllWorking }) => {
  const { perPage, perPageOptions } = useForemanSettings();
  const [pagination, setPagination] = useState({ page: 1, perPage, perPageOptions });

  return (
    <ListView className={classNames({ working: fixAllWorking })}>
      {entriesPage(allEntries, pagination).map((entry, idx) => (
        <PreupgradeReportEntry entry={entry} key={idx} />
      ))}
      <Pagination
        viewType="list"
        itemCount={allEntries.length}
        pagination={pagination}
        onChange={newPage => setPagination({ ...pagination, ...newPage })}
        dropdownButtonId='preupgrade-report-entries-pagination-dropdown'
      />
    </ListView>
  )
};

PreupgradeReportsList.propTypes = {
  allEntries: PropTypes.array.isRequired,
  fixAllWorking: PropTypes.bool.isRequired,
};

export default PreupgradeReportsList;
