import React from 'react';
import { ListView } from 'patternfly-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PreupgradeReportEntry from './components/PreupgradeReportEntry';

const PreupgradeReportsList = ({ allEntries, fixAllWorking }) => (
  <ListView className={classNames({ working: fixAllWorking })}>
    {allEntries.map((entry, idx) => (
      <PreupgradeReportEntry entry={entry} key={idx} />
    ))}
  </ListView>
);

PreupgradeReportsList.propTypes = {
  allEntries: PropTypes.array.isRequired,
  fixAllWorking: PropTypes.bool.isRequired,
};

export default PreupgradeReportsList;
