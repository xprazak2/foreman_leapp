import React from 'react';
import { ListView } from 'patternfly-react';
import PropTypes from 'prop-types';

import { additionalInfo } from './helpers';
import { entryFixable } from '../../PreupgradeReports/PreupgradeReportsHelpers';

const PreupgradeReportEntry = ({ entry, isEntrySelected, toggleSelected }) => (
  <ListView.Item
    key={entry.id}
    stacked
    checkboxInput={<input type="checkbox" value={isEntrySelected} disabled={!entryFixable(entry)} onChange={() => toggleSelected(entry, isEntrySelected)}/>}
    additionalInfo={additionalInfo(entry)}
  />
);

PreupgradeReportEntry.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default PreupgradeReportEntry;
