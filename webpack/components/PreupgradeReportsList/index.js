import React from 'react';
import { ListView } from 'patternfly-react';
import PropTypes from 'prop-types';

import PreupgradeReportEntry from './components/PreupgradeReportEntry';

const PreupgradeReportsList = ({ preupgradeReports }) => {
  const flatEntries = preupgradeReports.reduce(
    (memo, report) => [...memo, ...report.entries],
    []
  );

  return (
    <ListView>
      {flatEntries.map((entry, idx) => (
        <PreupgradeReportEntry entry={entry} key={idx} />
      ))}
    </ListView>
  );
};

PreupgradeReportsList.propTypes = {
  preupgradeReports: PropTypes.array.isRequired,
};

export default PreupgradeReportsList;
