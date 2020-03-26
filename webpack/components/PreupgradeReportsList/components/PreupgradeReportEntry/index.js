import React from 'react';

import { ListView } from 'patternfly-react';
import { additionalInfo } from './helpers';

const PreupgradeReportEntry = props => {
  return (
    <ListView.Item
      key={props.entry.id}
      className="listViewItem--listItemVariants"
      stacked
      additionalInfo={additionalInfo(props.entry)}
    >

    </ListView.Item>
  )
}

export default PreupgradeReportEntry;
