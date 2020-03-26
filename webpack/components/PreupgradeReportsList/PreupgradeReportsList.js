import React from 'react';
import { ListView } from 'patternfly-react';

import PreupgradeReportEntry from './components/PreupgradeReportEntry'

const PreupgradeReportsList = props => {
  console.log(props);
  const flatEntries = props.preupgradeReports.reduce((memo, report) => [...memo, ...report.entries], [])

  return(
    <ListView>
      {flatEntries.map((entry, idx) => (
        <PreupgradeReportEntry
          entry={entry}
          key={idx}
        />
      ))}
    </ListView>
  );
}

export default PreupgradeReportsList;
