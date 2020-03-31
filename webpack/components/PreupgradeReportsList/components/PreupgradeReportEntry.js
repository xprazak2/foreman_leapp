import React from 'react';
import { ListView } from 'patternfly-react';
import PropTypes from 'prop-types';

import { additionalInfo } from './helpers';

const PreupgradeReportEntry = ({ entry }) => (
  <ListView.Item
    key={entry.id}
    stacked
    additionalInfo={additionalInfo(entry)}
  />
);

PreupgradeReportEntry.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default PreupgradeReportEntry;
