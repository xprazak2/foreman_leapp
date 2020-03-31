import React from 'react';
import { ListView } from 'patternfly-react';
import PropTypes from 'prop-types';

import PreupgradeReportEntry from './components/PreupgradeReportEntry';

const PreupgradeReportsList = ({ allEntries }) => {
  return (
    <ListView>
      {allEntries.map((entry, idx) => (
        <PreupgradeReportEntry entry={entry} key={idx} />
      ))}
    </ListView>
  );
};

PreupgradeReportsList.propTypes = {
  allEntries: PropTypes.array.isRequired,
};

export default PreupgradeReportsList;
