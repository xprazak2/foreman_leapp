import React from 'react';
import { ListView, Grid, Icon } from 'patternfly-react';
import PropTypes from 'prop-types';
import './foreman_leapp.scss';

import {
  itemIteratorId,
  presentSeverity,
  hasRemediations,
  getExternals,
  getRemediations,
  getTitle,
  getSeverity,
  getSummary,
  getTags,
} from './helpers';
import { additionalInfo } from './helpers';
import { entryFixable } from '../../PreupgradeReports/PreupgradeReportsHelpers';

const PreupgradeReportEntry = ({ entry, isEntrySelected, toggleSelected }) => (
  <ListView.Item
    key={entry.id}
    stacked
    checkboxInput={
      entryFixable(entry) ? (
        <input
          type="checkbox"
          value={isEntrySelected}
          disabled={!entryFixable(entry)}
          onChange={() => toggleSelected(entry, isEntrySelected)}
        />
      ) : (
        <div className="empty-checkbox" />
      )
    }
    description={entry.title}
    additionalInfo={[
      <ListView.InfoItem key={itemIteratorId(entry, entry.hostname)}>
        <Icon type="pf" name="cluster" /> {entry.hostname}
      </ListView.InfoItem>,
      <ListView.InfoItem key={itemIteratorId(entry, entry.severity)}>
        <Icon
          type="pf"
          name="resources-full"
          style={{ color: presentSeverity(entry.severity) }}
        />
        {entry.severity}
      </ListView.InfoItem>,
      hasRemediations(entry),
    ]}
  >
    <Grid fluid>
      {getTitle(entry)}
      {getSeverity(entry)}
      {getSummary(entry)}
      {getTags(entry)}
      {getExternals(entry)}
      {getRemediations(entry)}
    </Grid>
  </ListView.Item>
);

PreupgradeReportEntry.propTypes = {
  entry: PropTypes.object.isRequired,
  isEntrySelected: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired,
};

export default PreupgradeReportEntry;
